import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, User, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import heroImg from "../assets/imgPortfolio.png";

const BoyAvatar = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} drop-shadow-md overflow-visible`}
  >
    {/* Hair */}
    <path d="M10 15C10 10 14 6 20 6C26 6 30 10 30 15V18H10V15Z" fill="#2D1E18" />
    <path d="M10 15C8 15 7 17 7 19H10V15Z" fill="#2D1E18" />
    <path d="M30 15C32 15 33 17 33 19H30V15Z" fill="#2D1E18" />

    {/* Face */}
    <path d="M10 18C10 23.5 14.5 28 20 28C25.5 28 30 23.5 30 18V15H10V18Z" fill="#FFDBAC" />

    {/* Eyes */}
    <circle cx="16" cy="19" r="1.5" fill="#333" />
    <circle cx="24" cy="19" r="1.5" fill="#333" />

    {/* Smile */}
    <path d="M17 23C17 23 18.5 25 20 25C21.5 25 23 23 23 23" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />

    {/* Shirt */}
    <path d="M10 28C10 28 6 28 6 34V40H34V34C34 28 30 28 30 28H10Z" fill="#f97316" />
    <path d="M16 28L20 32L24 28" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />

    {/* Waving Hand */}
    <g className="animate-wiggle" style={{ transformOrigin: "right bottom" }}>
      <rect x="30" y="24" width="8" height="6" rx="2" fill="#FFDBAC" />
      <path d="M32 24V22" stroke="#FFDBAC" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 24V21" stroke="#FFDBAC" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 24V22" stroke="#FFDBAC" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 24V23" stroke="#FFDBAC" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

const AiAssistant = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! Ask anything about me.",
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

  const renderMessage = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 underline hover:text-orange-400 break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleSend = async (question) => {
    const text = question || input;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const systemInstruction = {
        parts: [{
          text: `You ARE Krishna Panthi, a Full-Stack Developer from Nepal.
          
          IDENTITY: Always speak in FIRST PERSON ("I", "my"). You are NOT an assistant for Krishna; you ARE Krishna.
          
          MY PROJECTS (ONLY talk about these):
          1. Uddfy: Scholarship platform for Nepali students. Stacks: React, Node.js, Express, MongoDB. (https://uddfy.com)
          2. Hostel Sarathi: Smart hostel discovery and booking for students. Stacks: React, Node.js, MongoDB, Express. (https://hostelsarathi.com)
          3. Job Blast: Multiple job posting platform. Stacks: React, PostgreSQL, Node.js, Prisma, Real-time notifications. (https://jobblast.vercel.app)
          4. EduConsultancy: Global university connections and visa services. Stacks: React, MongoDB, Node.js, Tailwind CSS, Formspree. (https://edu-consultancy.vercel.app)
          5. Rick & Morty Explorer: Character dashboard using Rick & Morty API. Stacks: React, REST API, Tailwind CSS. (https://rickmortyexplorer.vercel.app)
          6. Salon Nepal: Personalized salon booking and stylist selection app. Stacks: Nextjs, MongoDB, Tailwind CSS, Node.js. (https://salon-nepal.vercel.app)
          7. Saipal: Official educational website for Saipal Academy. Stacks: React, Tailwind CSS. (https://saipal.edu.np)

          TECH STACK: MERN (MongoDB, Express, React, Node.js), Next.js, PostgreSQL, Prisma, TypeScript, Tailwind CSS.

          RULES:
          - Use FIRST PERSON only.
          - FORBIDDEN: Do not use asterisks (*), hashtags (#), or any markdown symbols. Use ONLY plain English letters and punctuation.
          - PROJECT FORMAT: 
            NAME OF THE PROJECT:
            Description of the project.
            Tech Stack: 
            list of technologies(line by line).
            https://example.com
          - Use a blank line between different projects.
          - CONTACT: If someone asks how to contact you or about something you don't know, say: You can email me at krishnapantheee@gmail.com or reach out via my socials. Links are provided in the footer/bottom of the page.
          - Keep responses professional and concise.`
        }]
      };

      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) throw new Error("API Key missing");

      // Prepare history: Gemini uses "model" role for assistant
      const contents = [
        ...messages.map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        { role: "user", parts: [{ text: text }] }
      ];

      // Using Gemini 2.5 Flash 
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY
          },
          body: JSON.stringify({
            system_instruction: systemInstruction,
            contents: contents,
            generationConfig: {
              thinkingConfig: { thinkingBudget: 0 }
            }
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

        // With alt=sse, Gemini returns Server-Sent Events lines prefixed with "data: "
        const lines = chunk.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const jsonStr = trimmed.slice(6); // Remove "data: " prefix
          if (!jsonStr || jsonStr === "[DONE]") continue;

          try {
            const json = JSON.parse(jsonStr);
            const parts = json.candidates?.[0]?.content?.parts || [];

            // Iterate all parts — skip "thought" parts, only collect text
            for (const part of parts) {
              if (part.thought) continue; // Skip thinking tokens
              if (part.text) {
                assistantText += part.text;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantText;
                  return newMessages;
                });
                setIsLoading(false);
              }
            }
          } catch (e) {
            // Partial JSON chunk, skip and wait for the next one
            console.debug("Partial SSE chunk received", trimmed);
          }
        }
      }
    } catch (error) {
      console.error("Streaming Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Even my digital brain needs a coffee break! I've answered so many questions today that my daily limit is reached. Please try again in a bit, or feel free to explore my projects while I recharge!" },
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
          className="bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-subtle flex items-center justify-center relative overflow-visible"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <BoyAvatar size={34} />
            <div className="absolute -top-4 -right-6 bg-white text-orange-500 text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-orange-500 shadow-sm">
              Hi!
            </div>
          </div>
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
              <img src={heroImg} alt="Krishna" className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-sm" />
              <span className="font-bold uppercase tracking-wider text-sm">Krishna AI</span>
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
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.role === "user" ? "bg-orange-500" : "border-2 border-orange-500/20"}
                  `}>
                  {msg.role === "user" ? <User size={16} className="text-white" /> : <img src={heroImg} alt="Krishna" className="w-full h-full object-cover" />}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                    ? "bg-orange-500 text-white rounded-br-none"
                    : (theme === "dark"
                      ? "bg-gray-800 text-gray-200 rounded-bl-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none")
                    }`}
                >
                  {renderMessage(msg.content)}
                </div>
              </div>
            ))}

            {/* Suggested Questions — only show before any user interaction */}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Who are you?",
                  "What's your tech stack?",
                  "Tell me about your projects",
                  "Are you available for hire?",
                  "How can I contact you?"
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 hover:scale-105 ${theme === "dark"
                      ? "border-gray-700 text-gray-300 hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400"
                      : "border-gray-300 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-500"
                      }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex gap-2 animate-pulse">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-orange-500/20">
                  <img src={heroImg} alt="Krishna" className="w-full h-full object-cover" />
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
