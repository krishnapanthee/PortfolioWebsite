import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const AiAssistant = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! Ask me anything about Krishna.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const context = `
        You are a professional AI assistant representing Krishna Panthi, a Full-Stack Developer from Nepal.
        - Location: Nepal
        - Stack: MERN (MongoDB, Express, React, Node.js), Next.js, PostgreSQL, Prisma, TypeScript.
        - Experience: 3+ years.
        
        CRITICAL INSTRUCTIONS: 
        1. Answer in PLAIN TEXT ONLY. 
        2. DO NOT use markdown, bold text (no double asterisks), italics, or numbered lists.
        3. Keep answers concise and professional.
        If asked about something you don't know, suggest they contact Krishna directly at panthikrishna85@gmail.com.
      `;

      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) throw new Error("API Key missing");

      // SWITCH TO gemini-2.0-flash 
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: `${context}\n\nUser Question: ${input}` }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Gemini API Error details:", errorBody);
        throw new Error(`Connection failed: ${response.status}`);
      }

      if (!response.body) throw new Error("No response body available for streaming");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      // Initialize an empty assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Gemini stream returns JSON objects in a specific format
        // We need to parse each JSON chunk (it might contain multiple chunks in one value)
        try {
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.trim() === "[" || line.trim() === "," || line.trim() === "]") continue;

            // Clean the line if it has trailing commas from the JSON array
            const cleanLine = line.replace(/^\s*,/, '').trim();
            if (!cleanLine) continue;

            const json = JSON.parse(cleanLine);
            const textChunk = json.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (textChunk) {
              assistantText += textChunk;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantText;
                return newMessages;
              });
              setIsLoading(false); // Hide thinking indicator once text starts flowing
            }
          }
        } catch (e) {
          // Occasionally chunks might be partial JSON, skip and wait for the next chunk
          console.debug("Partial chunk received", chunk);
        }
      }
    } catch (error) {
      console.error("Streaming Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "The free quota for the Gemini API has been exceeded. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-subtle"
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col w-[320px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl overflow-hidden animate-fadeInScale ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"
            }`}
        >
          {/* Header */}
          <div className="bg-orange-500 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">Krishna's AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:rotate-90 transition-transform duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-orange-500" : (theme === "dark" ? "bg-gray-800" : "bg-gray-100")
                  }`}>
                  {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-orange-500" />}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                    ? "bg-orange-500 text-white rounded-br-none"
                    : (theme === "dark"
                      ? "bg-gray-800 text-gray-200 rounded-bl-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none")
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 animate-pulse">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}>
                  <Loader2 size={14} className="text-orange-500 animate-spin" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl text-sm rounded-bl-none text-gray-400">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${theme === "dark" ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"}`}>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className={`w-full pl-4 pr-12 py-3 rounded-full text-sm outline-none transition-all ${theme === "dark"
                  ? "bg-gray-800 text-white focus:ring-1 focus:ring-orange-500"
                  : "bg-gray-100 text-gray-900 focus:ring-1 focus:ring-orange-500"
                  }`}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`absolute right-2 p-2 rounded-full transition-all duration-300 ${input.trim()
                  ? "bg-orange-500 text-white hover:scale-105 active:scale-95 shadow-md"
                  : `${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} text-gray-500 opacity-50 cursor-not-allowed`
                  }`}
              >
                <Send size={16} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
