import { cn } from '@/helpers/cn'
import { useChatbot } from '@/hooks/use-chatbot'
import { FileDiffIcon, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export function Header({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { startNewChat } = useChatbot()
  return (
    <div
      className={cn(
        'border-border absolute z-50 m-5 flex min-h-14 w-[calc(100%-42px)] items-center justify-between gap-4 rounded-lg border bg-white/70 px-2 py-1 backdrop-blur-lg',
        isCollapsed && 'justify-center',
      )}
    >
      {!isCollapsed && (
        <hgroup className="flex w-9 items-center gap-2">
          <img width={36} height={36} alt="Hambot Logo" src="/imgs/Hambot.webp" className="size-9" />
          <h1 className="font-bold">Hambot</h1>
        </hgroup>
      )}
      <div className="flex gap-2">
        {!isCollapsed && (
          <button
            onClick={startNewChat}
            className="bg-primary/10 text-primary hover:bg-primary/20 flex w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-0.5 text-sm transition-colors"
          >
            <FileDiffIcon className="size-4" />
            New Chat
          </button>
        )}

        <button
          onClick={() => {
            setIsCollapsed(!isCollapsed)
          }}
          className="text-primary hover:bg-primary/10 cursor-pointer rounded-md p-2"
        >
          {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
      </div>
    </div>
  )
}
