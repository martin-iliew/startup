import axios from "axios";

type SerpResult = {
  title: string;
  link: string;
  snippet: string;
};

export async function fetchUniversitySearch(query: string) {
  const serpApiKey = process.env.SERP_API_KEY!;
  const response = await axios.get("https://serpapi.com/search.json", {
    params: {
      q: query,
      engine: "google",
      api_key: serpApiKey,
    },
  });

  const results: SerpResult[] = response.data.organic_results;

  return results
    .slice(0, 5)
    .map((r) => `Title: ${r.title}\nLink: ${r.link}\nSnippet: ${r.snippet}`)
    .join("\n\n");
}
