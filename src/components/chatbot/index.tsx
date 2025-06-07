import { cn } from '@/helpers/cn'
import { useChatbot } from '@/hooks/use-chatbot'
import { SendHorizonal } from 'lucide-react'
import { useRef, useState } from 'react'
import { Header } from './header'
import { Messages } from './messages'

export default function ChatbotUI() {
  const { messages, isLoading, error, sendMessage } = useChatbot()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = new FormData(e.target as HTMLFormElement).get('message') as string
    if (!message.trim()) return
    sendMessage(message)
    formRef.current?.reset()
  }

  return (
    <div
      className={cn(
        'bg-background sticky top-0 flex h-screen flex-col overflow-y-auto duration-200 ease-in-out',
        isCollapsed
          ? "after:bg-background w-[100px] after:absolute after:top-20 after:right-0 after:bottom-0 after:left-0 after:content-['']"
          : 'w-[700px]',
      )}
    >
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Messages messages={messages} />
      {/* Error Display */}
      {error && (
        <div className="border-t border-red-200 bg-red-100 p-3 text-center text-sm text-red-700 dark:border-red-700 dark:bg-red-800 dark:text-red-200">
          Error: {error}
        </div>
      )}
      {/* Input Area */}
      <div className="absolute right-5 bottom-5 left-5 z-50">
        <form ref={formRef} onSubmit={handleSubmit} className="relative">
          <textarea
            name="message"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                formRef.current?.requestSubmit()
              }
            }}
            placeholder="Let's build your corporate brand"
            className="border-border placeholder:text-placeholder flex field-sizing-content max-h-[175px] min-h-20 w-full flex-grow items-start rounded-md border bg-white/70 p-3 backdrop-blur-lg outline-none placeholder:text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-dark absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-[#104C6B]"
            disabled={isLoading}
          >
            <SendHorizonal color="#ffffff" width={12} height={14} />
          </button>
        </form>
      </div>
    </div>
  )
}
