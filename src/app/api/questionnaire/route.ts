// File: app/api/questionnaire/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import redis from "@/lib/redis";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { fetchUniversitySearch } from "@/lib/fetchSearchResults";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid answers format" },
        { status: 400 }
      );
    }

    const answerText = Object.entries(answers)
      .map(([key, values]) => `- ${key}: ${(values as string[]).join(", ")}`)
      .join("\n");

    const searchQuery = `Best universities for: ${Object.values(answers)
      .flat()
      .join(", ")}`;

    const searchResults = await fetchUniversitySearch(searchQuery);
    console.log("🔍 Search results:", searchResults);
    const prompt = `A student answered the following questionnaire:

${answerText}

Here are real-time search results:

${searchResults}

Based on this info, recommend 5 suitable universities. Include name, country, and a short explanation.`;

    const raw = await redis.lrange("chat:history", 0, 9);
    const parsedHistory = raw
      .map((entry) => {
        try {
          return JSON.parse(entry);
        } catch {
          return null;
        }
      })
      .filter(Boolean) as { prompt: string; response: string }[];

    const memoryMessages: ChatCompletionMessageParam[] = parsedHistory
      .reverse()
      .flatMap((entry) => [
        { role: "user", content: entry.prompt },
        { role: "assistant", content: entry.response },
      ]);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a university advisor assistant." },
        ...memoryMessages,
        { role: "user", content: prompt },
      ] as ChatCompletionMessageParam[],
      max_tokens: 700,
      stream: false,
    });

    const fullResponse = completion.choices[0].message.content ?? "No response";

    const redisEntry = JSON.stringify({
      prompt,
      response: fullResponse,
      timestamp: Date.now(),
    });

    await redis.lpush("chat:history", redisEntry);
    await redis.ltrim("chat:history", 0, 49);

    return NextResponse.json({ message: fullResponse });
  } catch (error: unknown) {
    console.error("❌ Error in questionnaire POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
