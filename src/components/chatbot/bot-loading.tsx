import { Brain, Palette, Sparkles } from 'lucide-react'
import './bot-loading.css'

interface BotLoadingProps {
  message?: string
  variant?: 'normal' | 'compact'
}

const BotLoading = ({ message = 'Un momento, estoy pensando...', variant = 'normal' }: BotLoadingProps) => {
  const isCompact = variant === 'compact'

  return (
    <div
      className={`relative ${isCompact ? 'p-4' : 'p-8'} rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -top-4 -left-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-20"></div>
        <div className="absolute -right-4 -bottom-4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-20 delay-1000"></div>
      </div>

      <div className="relative flex items-center space-x-6">
        <div className="relative flex-shrink-0">
          <div
            className={`relative ${isCompact ? 'h-12 w-12' : 'h-16 w-16'} animate-bounce-slow flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-lg`}
          >
            <Brain className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-white`} />
            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-20"></div>
          </div>

          <div className={`absolute ${isCompact ? '-top-2 -right-2' : '-top-3 -right-3'}`}>
            <div
              className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} animate-float-1 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 shadow-md`}
            >
              <Sparkles className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'} text-white`} />
            </div>
          </div>

          <div className={`absolute ${isCompact ? '-bottom-1 -left-2' : '-bottom-2 -left-3'}`}>
            <div
              className={`${isCompact ? 'h-5 w-5' : 'h-7 w-7'} animate-float-2 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-400 shadow-md`}
            >
              <Palette className={`${isCompact ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} text-white`} />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className={`${isCompact ? 'text-sm' : 'text-lg'} mb-2 truncate font-semibold text-gray-800`}>
            {message}
          </div>

          <div className="mb-3 flex items-center space-x-1">
            <span className={`${isCompact ? 'text-xs' : 'text-sm'} mr-2 text-gray-600`}>Procesando</span>
            <div className="flex space-x-1">
              <div
                className={`${isCompact ? 'h-1.5 w-1.5' : 'h-2 w-2'} animate-bounce rounded-full bg-gradient-to-r from-purple-500 to-pink-500`}
              ></div>
              <div
                className={`${isCompact ? 'h-1.5 w-1.5' : 'h-2 w-2'} animate-bounce rounded-full bg-gradient-to-r from-pink-500 to-blue-500 [animation-delay:100ms]`}
              ></div>
              <div
                className={`${isCompact ? 'h-1.5 w-1.5' : 'h-2 w-2'} animate-bounce rounded-full bg-gradient-to-r from-blue-500 to-purple-500 [animation-delay:200ms]`}
              ></div>
            </div>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-white">
            <div className="animate-progress-bar h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-sm"></div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'} animate-pulse rounded-full bg-green-400 shadow-lg`}>
            <div className={`h-full w-full animate-ping rounded-full bg-green-300 opacity-75`}></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 h-1 w-3/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30 blur-sm"></div>
    </div>
  )
}

export default BotLoading
