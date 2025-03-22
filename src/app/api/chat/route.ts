import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      console.warn("❌ Missing message in request body.");
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const prompt = message.trim();
    console.log("💬 Sending to OpenAI:", prompt);

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
        { role: "system", content: "You are a helpful assistant." },
        ...memoryMessages,
        { role: "user", content: prompt },
      ] as ChatCompletionMessageParam[],
      max_tokens: 200,
      stream: false,
    });

    const fullResponse = completion.choices[0].message.content ?? "No response";

    const redisEntry = JSON.stringify({
      prompt,
      response: fullResponse,
      timestamp: Date.now(),
    });

    console.log("📦 Attempting to save to Redis:", redisEntry);

    try {
      await redis.lpush("chat:history", redisEntry);
      await redis.ltrim("chat:history", 0, 49); 
      console.log("✅ Saved to Redis");
    } catch (redisError) {
      console.warn("⚠️ Failed to save to Redis:", redisError);
    }

    return NextResponse.json({ message: fullResponse });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ POST handler error:", error.message);
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    }

    console.error("❌ Unknown error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: "Unknown error" },
      { status: 500 }
    );
  }
}
