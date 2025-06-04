import { cn } from '@/helpers/cn'
import { FONTS } from '@/helpers/contants'
import { useChatbot } from '@/hooks/use-chatbot'
import type { ChatMessage, FontItem, Palette } from '@/types'
import { useEffect, useRef } from 'react'
import TextMessage from './message/text-message'

export function Messages({ messages }: { messages: ChatMessage[] }) {
  const { isLoading } = useChatbot()
  const hasMessages = messages.length > 0

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])
  return (
    <div className="relative size-full flex-grow overflow-x-hidden overflow-y-auto">
      <div className="chat-scrollbar relative flex h-full flex-col gap-4 overflow-x-hidden overflow-y-auto px-5 py-4">
        {!hasMessages ? (
          <div className="relative flex h-full flex-col justify-center">
            {/* Empty State */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex h-fit max-w-xs flex-col items-center gap-4 rounded-lg bg-white p-8 drop-shadow-md">
                <img src="/imgs/Palettes-Chat.webp" alt="Decoration Palettes" width={180} className="drop-shadow-md" />
                <p className="text-cs-black max-w-[200px] text-center text-[28px] leading-8 font-bold">
                  Let's start to see your palettes here
                </p>
                <p className="text-description max-w-[200px] text-center text-sm leading-4">
                  Explore the canvas to see what you could create!
                </p>
              </div>
            </div>
            <img src="/imgs/Cloud.webp" alt="Decoration Cloud" width={542} height={353} className="scale-[1.1]" />
          </div>
        ) : (
          <>
            <div className="mt-16"></div>
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'rounded-xl border p-3',
                    msg.sender === 'user'
                      ? 'bg-primary border-border rounded-br-none text-white'
                      : msg.type === 'error'
                        ? 'rounded-bl-none border-red-300 bg-red-100 text-red-700'
                        : 'border-border rounded-bl-none bg-white text-gray-800',
                  )}
                >
                  <MessageContent message={msg} isUser={msg.sender === 'user'} />
                  <p
                    className={cn(
                      'mt-1.5 text-xs',
                      msg.sender === 'user'
                        ? 'text-right text-white/80'
                        : 'text-right text-gray-500 dark:text-gray-400',
                    )}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div className="mb-16"></div>
            {isLoading && (
              <div className="py-2 text-center text-sm text-gray-500 italic dark:text-gray-400">Escribiendo...</div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  )
}

function MessageContent({ message, isUser }: { message: ChatMessage; isUser?: boolean }) {
  function getFontFamily(key: string) {
    const font = FONTS.find((font) => font.key === key)
    return font?.fontFamily
  }
  if (message.type === 'text' || message.type === 'error') {
    return <TextMessage text={message.content as string} className={isUser ? 'text-white' : undefined} />
  } else if (message.type === 'palette') {
    const palette = message.content as Palette
    return (
      <div>
        <p className="mb-2 font-semibold">{palette.name}</p>
        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{palette.description}</p>
        <p className="mb-2">Aquí tienes una paleta de colores:</p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {palette.colors.map((colorItem, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className="border-border h-16 w-16 rounded-md border"
                style={{ backgroundColor: colorItem.color }}
              ></div>
              <small className="mt-1 block text-xs text-gray-700 dark:text-gray-300">{colorItem.name}</small>
              <small className="block text-xs text-gray-500 dark:text-gray-400">{colorItem.color}</small>
            </div>
          ))}
        </div>
      </div>
    )
  } else if (message.type === 'fonts' && Array.isArray(message.content)) {
    const fonts = message.content as FontItem[]

    return (
      <div>
        <p className="mb-2">Te sugiero estas fuentes:</p>
        <ul className="list-disc space-y-1 pl-5">
          {fonts.map((font, index) => (
            <li
              key={index}
              style={{ fontFamily: getFontFamily(font.key) }}
              className={cn(font.type === 'heading' ? 'text-xl font-bold' : 'text-base font-normal')}
            >
              {font.name} ({font.type})
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return <p>Contenido de tipo desconocido.</p>
}
