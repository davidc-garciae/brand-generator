import { useChatbot } from "@/hooks/use-chatbot";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function Header({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { startNewChat } = useChatbot();
  return (
    <div className="px-5 pt-5">
      <div className="flex shadow-sm bg-white px-[10px] py-[5px] rounded-md justify-between items-center gap-4">
        {!isCollapsed && (
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
        )}
        <div className="flex gap-2">
          {!isCollapsed && (
            <button
              onClick={startNewChat}
              className="bg-slate-200 w-fit hover:bg-slate-300 text-cs-black text-sm py-1.5 px-3 rounded-md transition-colors"
            >
              Nuevo Chat
            </button>
          )}

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
    </div>
  );
}
