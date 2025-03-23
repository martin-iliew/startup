import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { buildPrompt } from "@/lib/promptBuilder";
import { saveResult } from "@/lib/redis";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

function extractUniversityNames(text: string): string[] {
  const matches = text.match(
    /\b([A-Z][a-zA-Z&.\-'\s]+(?:University|College|Institute|School|Academy))\b/g
  );
  return matches ? matches.map((s) => s.trim()) : [];
}

export async function POST(request: NextRequest) {
  try {
    const quizAnswers = await request.json();
    const prompt = buildPrompt(quizAnswers);

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert academic counselor assistant. Based on the student's profile, recommend the most suitable majors and provide reasoning. Output as JSON.",
        },
        { role: "user", content: prompt },
      ],
    });

    const content = chatResponse.choices[0]?.message?.content || "";
    let recommendations: Array<{ major: string; reason: string }> = [];

    try {
      recommendations = JSON.parse(content);
    } catch {
      recommendations = content
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => {
          const [maj, ...reasonParts] = line.split(":");
          return {
            major: maj.replace(/^\d+\.\s*/, "").trim(),
            reason: reasonParts.join(":").trim(),
          };
        });
    }

    const serpApiKey = process.env.SERP_API_KEY!;
    const resultsForMajors: Array<{
      major: string;
      reason: string;
      universities: Array<{ name: string; link: string; snippet?: string }>;
    }> = [];

    for (const rec of recommendations) {
      const query = `Top universities for studying ${rec.major} undergraduate program site:.edu`;
      const serpUrl = `https://serpapi.com/search.json?engine=google&hl=en&api_key=${serpApiKey}&q=${encodeURIComponent(
        query
      )}&num=20`;

      const serpRes = await fetch(serpUrl);
      const serpData = await serpRes.json();

      if (!serpData.organic_results || serpData.organic_results.length === 0) {
        console.warn(`⚠️ No universities found for: ${rec.major}`);
        console.log("SerpAPI raw response:", JSON.stringify(serpData, null, 2));
      }

      const universitySet = new Map<
        string,
        { name: string; link: string; snippet?: string }
      >();

      for (const item of serpData.organic_results || []) {
        const combinedText = `${item.title} ${item.snippet || ""}`;
        const names = extractUniversityNames(combinedText);

        for (const name of names) {
          if (!universitySet.has(name)) {
            universitySet.set(name, {
              name,
              link: item.link,
              snippet: item.snippet,
            });
          }
        }
      }

      resultsForMajors.push({
        major: rec.major,
        reason: rec.reason,
        universities: Array.from(universitySet.values()),
      });
    }

    const resultId = uuidv4();
    await saveResult(resultId, {
      quizAnswers,
      prompt,
      recommendations: resultsForMajors,
    });

    return NextResponse.json({ id: resultId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Error in recommendation route:", err.message);
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
