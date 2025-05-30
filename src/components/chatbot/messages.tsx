import type { ChatMessage, FontItem, Palette } from "@/types";
import { cn } from "@/helpers/cn";
import { useChatbot } from "@/hooks/use-chatbot";
import { useEffect, useRef } from "react";

export function Messages({ messages }: { messages: ChatMessage[] }) {
  const { isLoading } = useChatbot();
  const hasMessages = messages.length > 0;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className="relative flex-grow size-full overflow-auto">
      <div className="from-background pointer-events-none absolute left-0 right-4 top-0 z-10 h-4 bg-gradient-to-b to-transparent transition-opacity opacity-100" />
      <div className="h-full overflow-y-auto overflow-x-hidden px-5 py-4 relative chat-scrollbar flex flex-col gap-2">
        {!hasMessages ? (
          <div className="flex flex-col h-full justify-center relative">
            {/* Empty State */}
            <div className="absolute z-10 flex items-center justify-center inset-0">
              <div className="h-fit max-w-xs flex flex-col gap-4 items-center p-8 rounded-lg drop-shadow-md bg-white ">
                <img
                  src="/imgs/Palettes-Chat.webp"
                  alt="Decoration Palettes"
                  width={180}
                  className="drop-shadow-md"
                />
                <p className="font-bold leading-8 max-w-[200px] text-[28px] text-center text-cs-black">
                  Let's start to see your palettes here
                </p>
                <p className="text-sm  leading-4 max-w-[200px] text-center text-description">
                  Explore the canvas to see what you could create!
                </p>
              </div>
            </div>
            <img
              src="/imgs/Cloud.webp"
              alt="Decoration Cloud"
              width={542}
              height={353}
              className="scale-[1.1]"
            />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-xl shadow",
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : msg.type === "error"
                        ? "bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100 border border-red-300 dark:border-red-600 rounded-bl-none"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none",
                  )}
                >
                  <MessageContent message={msg} />
                  <p
                    className={cn(
                      "text-xs mt-1.5",
                      msg.sender === "user"
                        ? "text-blue-200 text-right"
                        : "text-gray-500 dark:text-gray-400 text-right",
                    )}
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
          </>
        )}
      </div>
      <div className="from-background pointer-events-none absolute left-0 right-4 bottom-0 z-10 h-4 bg-gradient-to-t to-transparent transition-opacity opacity-100" />
    </div>
  )
}

function MessageContent({ message }: { message: ChatMessage }) {
if (message.type === "text" || message.type === "error") {
      return (
        <p className="whitespace-pre-wrap">
          {typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content)}
        </p>
      );
    } else if (message.type === "palette") {
      const palette = message.content as Palette;
      return (
        <div>
          <p className="mb-2 font-semibold">{palette.name}</p>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            {palette.description}
          </p>
          <p className="mb-2">Aquí tienes una paleta de colores:</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {palette.colors.map((colorItem, index) => (
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
}
