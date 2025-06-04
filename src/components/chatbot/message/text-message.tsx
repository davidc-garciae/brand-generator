import { cn } from '@/helpers/cn'
import ReactMarkdown from 'react-markdown'

function TextMessage({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn('prose prose-sm mx-auto', className)}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  )
}

export default TextMessage
