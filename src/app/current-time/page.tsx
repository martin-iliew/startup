"use client";

import { useEffect, useState } from "react";

export default function CurrentTimePage() {
  const [timeInfo, setTimeInfo] = useState("");

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await fetch("/api/serp-debug");
        const data = await res.json();
        setTimeInfo(data.results);
      } catch (err) {
        console.error("❌ Failed to fetch current time:", err);
        setTimeInfo("Error fetching current time.");
      }
    };

    fetchTime();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🌍 Current Time (via SerpAPI)</h1>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
        {timeInfo || "Loading..."}
      </pre>
    </div>
  );
}
