import { NextResponse } from "next/server";
import axios from "axios";

interface SerpResult {
  title: string;
  link: string;
  snippet: string;
}

export async function GET() {
  try {
    const query = "current date and time in GMT";
    const serpApiKey = process.env.SERP_API_KEY!;

    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: query,
        engine: "google",
        api_key: serpApiKey,
      },
    });

    const results =
      (response.data.organic_results as SerpResult[])
        ?.slice(0, 3)
        .map((r) => `Title: ${r.title}\nLink: ${r.link}\nSnippet: ${r.snippet}`)
        .join("\n\n") || "No results found.";

    return NextResponse.json({ results });
  } catch (error) {
    console.error("❌ SerpAPI debug fetch failed:", error);
    return NextResponse.json({ results: "Error fetching current date." });
  }
}
