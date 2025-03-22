"use client";

import { useEffect, useRef, useState } from "react";
import ChatSearch from "@/components/ChatSearch";

type ChatEntry = {
  prompt: string;
  response: string;
  timestamp: number;
};

export default function ChatPage() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history", { cache: "no-store" });
      const data = await res.json();
      setHistory(data.history || []);
    } catch (err) {
      console.error("❌ Failed to load chat history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshFlag]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSent = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 sm:p-10 max-w-3xl mx-auto font-sans">
      <div className="flex-grow space-y-4 overflow-y-auto pb-32">
        {history
          .slice()
          .reverse()
          .flatMap((entry, index) => [
            <div key={`${index}-user`} className="flex justify-end">
              <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg max-w-[70%] shadow">
                {entry.prompt}
              </div>
            </div>,
            <div key={`${index}-ai`} className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg max-w-[70%] shadow">
                {entry.response}
              </div>
            </div>,
          ])}

        <div ref={bottomRef} />
      </div>
      <div className="mt-6">
        <ChatSearch onSend={handleSent} />
      </div>
    </div>
  );
}
