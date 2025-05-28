import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChatbot } from "../hooks/use-chatbot";
import type { ChatMessage, FontItem, PaletteItem } from "../types";

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

type Props = {
  initMessage?: string;
};

export default function ChatbotUI({ initMessage }: Props) {
  const { messages, isLoading, error, sendMessage, startNewChat, chatId } =
    useChatbot();
  const [initMessageSent, setInitMessageSent] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    console.log("initMessageSent", initMessageSent);
    if (initMessageSent) return;

    if (initMessage) {
      setInitMessageSent(true);
      sendMessage(initMessage);
    }
  }, [initMessage]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText("");
  };

  const renderMessageContent = (message: ChatMessage) => {
    if (message.type === "text" || message.type === "error") {
      return (
        <p className="whitespace-pre-wrap">
          {typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content)}
        </p>
      );
    } else if (message.type === "palette" && Array.isArray(message.content)) {
      const palette = message.content as PaletteItem[];
      return (
        <div>
          <p className="mb-2">Aquí tienes una paleta de colores:</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {palette.map((colorItem, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 border border-gray-300 rounded-md shadow-sm"
                  style={{ backgroundColor: colorItem.color }}
                ></div>
                <small className="block text-xs mt-1 text-gray-700 dark:text-gray-300">
                  {colorItem.name}
                </small>
                <small className="block text-xs text-gray-500 dark:text-gray-400">
                  {colorItem.color}
                </small>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (message.type === "fonts" && Array.isArray(message.content)) {
      const fonts = message.content as FontItem[];
      return (
        <div>
          <p className="mb-2">Te sugiero estas fuentes:</p>
          <ul className="list-disc pl-5 space-y-1">
            {fonts.map((font, index) => (
              <li key={index} style={{ fontFamily: font.name }}>
                {font.name} ({font.type})
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <p>Contenido de tipo desconocido.</p>;
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[700px] flex flex-col bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Chatbot</h2>
          {chatId && (
            <p className="text-xs text-blue-200 dark:text-blue-300">
              ID: {chatId}
            </p>
          )}
        </div>
        <button
          onClick={startNewChat}
          className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900 text-white text-sm py-1.5 px-3 rounded-md transition-colors"
        >
          Nuevo Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-xl shadow ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : msg.type === "error"
                  ? "bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100 border border-red-300 dark:border-red-600 rounded-bl-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
              }`}
            >
              {renderMessageContent(msg)}
              <p
                className={`text-xs mt-1.5 ${
                  msg.sender === "user"
                    ? "text-blue-200 text-right"
                    : "text-gray-500 dark:text-gray-400 text-right"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 italic py-2">
            Escribiendo...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 text-sm text-center border-t border-red-200 dark:border-red-700">
          Error: {error}
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
