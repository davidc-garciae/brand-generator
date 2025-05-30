import { useEffect, useRef, useState } from "react";
import { useChatbot } from "../hooks/use-chatbot";
import type { ChatMessage, FontItem, Palette } from "../types";
import { PanelLeftClose, PanelLeftOpen, SendHorizonal } from "lucide-react";

export default function ChatbotUI() {
  const { messages, isLoading, error, sendMessage, startNewChat } =
    useChatbot();
  const [inputText, setInputText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hasMessages = messages.length > 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleMessage = (message: string) => {
    sendMessage(message);
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
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-[100px] after:content-[''] after:absolute after:top-20 after:right-0 after:bottom-0 after:left-0 after:bg-background" : "w-[500px]"
      } h-screen relative flex flex-col bg-background p-5 gap-8 duration-200 ease-in-out overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex shadow-sm bg-white px-[10px] py-[5px] rounded-md justify-between items-center gap-4">
        {
          !isCollapsed && (
            <hgroup className="flex gap-2 items-center w-9">
              <img
                width={36}
                height={36}
                alt="Hambot Logo"
                src="/imgs/Hambot.webp"
                className="size-9"
              />
              <h1 className="font-bold">Hambot</h1>
            </hgroup>
          )
        }
        <div className="flex gap-2">
          {
            !isCollapsed && (
              <button
                onClick={startNewChat}
                className="bg-slate-200 w-fit hover:bg-slate-300 text-cs-black text-sm py-1.5 px-3 rounded-md transition-colors"
              >
                Nuevo Chat
              </button>
            )
          }
          <button
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            className="text-primary cursor-pointer hover:bg-slate-100 rounded-md p-2"
          >
            {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
        </div>
      </div>
      {/* Messages Area */}
      <div className="p-4 overflow-y-auto overflow-x-hidden h-full">
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
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl shadow ${
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
          </>
        )}
      </div>
      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 text-sm text-center border-t border-red-200 dark:border-red-700">
          Error: {error}
        </div>
      )}
      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputText.trim()) return;
          handleMessage(inputText);
        }}
        className="relative"
      >
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (!inputText.trim()) return;
              handleMessage(inputText);
            }
          }}
          placeholder="Let's build your corporate brand"
          className="flex-grow  max-h-[175px] field-sizing-content border border-border flex items-start bg-white outline-none placeholder:color-placeholder min-h-20 p-3 rounded-md w-full "
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute w-8 h-8 flex items-center justify-center bottom-2 right-2 cursor-pointer bg-dark hover:bg-[#104C6B] p-2 rounded-full transition-colors"
          disabled={isLoading}
        >
          <SendHorizonal color="#ffffff" width={12} height={14} />
        </button>
      </form>
    </div>
  );
}
