"use client";

import React, { useState } from "react";

type Props = {
  onSend?: () => void;
};

const ChatSearch: React.FC<Props> = ({ onSend }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      setQuery("");
      onSend?.();
    } catch (err) {
      console.error("❌ Error sending prompt:", err);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex gap-2 items-start">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          className="w-full p-3 border rounded-lg text-lg"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-lg"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default ChatSearch;
