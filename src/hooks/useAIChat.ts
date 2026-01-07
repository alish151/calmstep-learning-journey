import { useState } from "react";
import { OPENAI_API_KEY, AI_MODEL, AI_MAX_TOKENS, AI_SYSTEM_PROMPT } from "@/lib/ai-config";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useAIChat = (moduleContext: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Check if API key is configured
    if (!OPENAI_API_KEY || OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
      setError("Please add your OpenAI API key in src/lib/ai-config.ts");
      return;
    }

    const newUserMessage: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [
            { role: "system", content: `${AI_SYSTEM_PROMPT}\n\nCurrent module context: ${moduleContext}` },
            ...messages,
            newUserMessage,
          ],
          max_tokens: AI_MAX_TOKENS,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || "I'm here to help! 💙";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("AI Chat Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return { messages, isLoading, error, sendMessage, clearMessages };
};
