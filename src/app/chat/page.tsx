"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, GPTIcon } from "@/components/ui/icons";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (message: string) => {
      await sendingChat(message);
    },
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  });

  const sendingChat = async (message: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.error("Failed to fetch chat response");
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullBotMessage = "";
    while (true) {
      const { done, value } = await reader!.read();

      if (done) {
        break;
      }

      const chunkText = decoder.decode(value, { stream: true });
      const lines = chunkText
        .split("\n")
        .filter((line) => line.startsWith("data: "));
      for (const line of lines) {
        const jsonString = line.replace(/^data: /, "");
        try {
          const parsedData = JSON.parse(jsonString);
          const botMessage = parsedData.message.content.parts[0];
          fullBotMessage = botMessage;

          setChat((prevChat) => {
            const updatedChat = [...prevChat];
            const lastIndex = updatedChat.length - 1;

            if (updatedChat[lastIndex]?.startsWith("Bot:")) {
              updatedChat[lastIndex] = `Bot: ${fullBotMessage}`;
            } else {
              updatedChat.push(`Bot: ${fullBotMessage}`);
            }

            return updatedChat;
          });
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChat((prevChat) => [...prevChat, `You: ${message}`]);
    setMessage("");

    sendMessage.mutate(message);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      window.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [sendMessage.isPending]);

  return (
    <>
      <main className="relative h-full w-full flex-1 overflow-auto">
        <div className="flex h-full flex-col focus-visible:outline-0">
          <div className="flex-1 mb-12">
            <div className="h-full" ref={chatContainerRef}>
              <div className="flex flex-col text-sm md:pb-8">
                {chat.map((line, index) => (
                  <article
                    key={index}
                    className="w-full focus-visible:outline-2 text-black"
                  >
                    <div className="m-auto text-base py-4 px-3 md:px-4 w-full lg:px-4 xl:px-5">
                      <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl">
                        {line.startsWith("Bot:") && (
                          <div className="flex-shrink-0 flex flex-col relative items-end">
                            <div>
                              <div className="pt-0">
                                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                                  <div className="relative flex items-center justify-center h-8 w-8 border border-gray-600 rounded-full p-2">
                                    <GPTIcon size={16} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="relative flex w-full min-w-0 flex-col">
                          <div className="flex-col gap-1 md:gap-3">
                            <div className="flex max-w-full flex-col flex-grow">
                              <div className="min-h-8 flex w-full flex-col items-end gap-2 whitespace-normal break-words">
                                <div
                                  className={
                                    line.startsWith("You:")
                                      ? "flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start"
                                      : "flex w-full flex-col gap-1 empty:hidden first:pt-1"
                                  }
                                >
                                  <div
                                    className={
                                      line.startsWith("You:")
                                        ? "relative rounded-3xl px-5 py-2.5 bg-gray-800 dark:bg-gray-700"
                                        : "prose w-full break-words dark:prose-invert"
                                    }
                                  >
                                    <p className="whitespace-pre-wrap">
                                      {line.startsWith("You:") ||
                                      line.startsWith("Bot:")
                                        ? line.slice(4)
                                        : line}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="m-auto px-3 w-full md:px-5 lg:px-4 xl:px-5 fixed bottom-0 pb-4 bg-gray-900">
              <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="relative flex h-full max-w-full flex-1 flex-col">
                    <div className="relative flex w-full items-center">
                      <div className="flex w-full flex-col gap-1.5 rounded-xl p-1.5 transition-colors dark:bg-gray-700">
                        <div className="flex items-end gap-1.5 pl-4 md:gap-2">
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="overflow-hidden">
                              <Textarea
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                  }
                                }}
                                id="inputRef"
                                ref={inputRef}
                                value={message}
                                rows={3}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Message to ChatGPT"
                                disabled={sendMessage.isPending}
                              />
                              <Button
                                type="submit"
                                disabled={
                                  message === "" || sendMessage.isPending
                                }
                                className="absolute bottom-3.5 right-4 rounded-full"
                              >
                                {sendMessage.isPending ? (
                                  <div className="animate-spin">
                                    <ArrowUp />
                                  </div>
                                ) : (
                                  <ArrowUp />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
