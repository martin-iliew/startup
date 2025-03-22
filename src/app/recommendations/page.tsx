"use client";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[][]>([]);
  const [sortOption, setSortOption] = useState("Name A–Z");
  const [showSortMenu, setShowSortMenu] = useState(false);

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

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const nameA = a[0].toLowerCase();
    const nameB = b[0].toLowerCase();
    return sortOption === "Name A–Z"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-6 relative z-10">
          <div className="relative">
            <button
              onClick={() => setShowSortMenu((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-sm font-medium text-neutral-800 rounded-md border hover:shadow-xs transition"
            >
              Sort: {sortOption}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
                {["Name A–Z", "Name Z–A"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortOption(option);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 ${
                      sortOption === option ? "font-semibold" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {recommendations.length === 0 ? (
          <p className="text-neutral-400 text-lg text-center">
            Loading recommendations...
          </p>
        ) : (
          <div className="space-y-4">
            {sortedRecommendations.map((uni, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border-1 border-neutral-200 flex items-start justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-blue-800 pt-1 text-xl">🏛️</div>

                  <div className="space-y-2 max-w-xl">
                    <h2 className="text-lg font-bold text-neutral-950">
                      {uni[0].replace(/^\d+\.\s\*\*/, "").replace(/\*\*/g, "")}
                    </h2>
                    <p className="text-neutral-700 text-sm leading-snug">
                      {uni[2].replace("- **Explanation:**", "").trim()}
                    </p>
                  </div>
                </div>
                <ArrowRight className="min-w-8 hover:min-w-5 text-neutral-500 mt-1" />
              </div>
            ))}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="text-center mt-10">
            <p className="text-neutral-400 mb-3">
              Continue exploring close matches
            </p>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition">
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
