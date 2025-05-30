import { useRef, useState } from "react";
import { useChatbot } from "@/hooks/use-chatbot";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/helpers/cn";
import { Messages } from "./messages";
import { Header } from "./header";

export default function ChatbotUI() {
  const { messages, isLoading, error, sendMessage } = useChatbot();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = new FormData(e.target as HTMLFormElement).get(
      "message",
    ) as string;
    if (!message.trim()) return;
    sendMessage(message);
    formRef.current?.reset();
  };

  return (
    <div
      className={cn(
        "h-screen relative flex flex-col bg-background duration-200 ease-in-out gap-2 overflow-y-auto",
        isCollapsed
          ? "w-[100px] after:content-[''] after:absolute after:top-20 after:right-0 after:bottom-0 after:left-0 after:bg-background"
          : "w-[500px]",
      )}
    >
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Messages messages={messages} />
      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 text-sm text-center border-t border-red-200 dark:border-red-700">
          Error: {error}
        </div>
      )}
      {/* Input Area */}
      <div className="p-5">
        <form ref={formRef} onSubmit={handleSubmit} className="relative">
          <textarea
            name="message"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                formRef.current?.requestSubmit();
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
    </div>
  );
}
