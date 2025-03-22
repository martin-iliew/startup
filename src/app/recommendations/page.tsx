"use client";
import { useEffect, useState } from "react";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[][]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("universityRecommendations");
    if (!saved) return;

    const parsed = saved
      .split(/\n(?=\d+\.\s\*\*)/)
      .slice(1)
      .map((section) => {
        const lines = section.trim().split("\n").filter(Boolean);
        return lines;
      });

    setRecommendations(parsed);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-neutral-800">
        Recommended Universities
      </h1>

      {recommendations.length === 0 ? (
        <p className="text-neutral-500 text-lg">Loading recommendations...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((uni, idx) => (
            <div
              key={idx}
              className="w-full bg-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-neutral-200 space-y-3"
            >
              <h2 className="text-2xl font-semibold text-neutral-900">
                {uni[0].replace(/^\d+\.\s\*\*/, "").replace(/\*\*/g, "")}
              </h2>

              <p className="text-sm text-neutral-600 font-medium">
                <span className="font-semibold">Country:</span>{" "}
                {uni[1]
                  .replace("- **Country:**", "")
                  .replace(/\*\*/g, "")
                  .trim()}
              </p>

              <p className="text-neutral-700 text-sm leading-relaxed">
                {uni[2].replace("- **Explanation:**", "").trim()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
