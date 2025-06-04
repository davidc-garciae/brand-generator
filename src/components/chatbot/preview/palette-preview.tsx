import type { Palette } from '@/types'
import { ChevronDown, ChevronUp, Copy, Save, Shuffle } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  palette: Palette
  editable?: boolean
}

const Button = ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {children}
  </button>
)

export default function PalettePreview(props: Props) {
  const {
    palette: { colors, description, name },
    editable = false,
  } = props
  const [isExpanded, setIsExpanded] = useState(true)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyAllColors = () => {
    const allHex = colors.map((color) => color.color).join(', ')
    navigator.clipboard.writeText(allHex)
  }

  return (
    <div className="border-primary/20 mx-6 h-fit overflow-hidden rounded-2xl border bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-800 transition-colors hover:text-gray-600"
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            {name || 'Palette Preview'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {editable && (
            <Button>
              <Shuffle size={16} />
              Create Again
            </Button>
          )}

          <Button onClick={copyAllColors}>
            <Copy size={16} />
            Copy all
          </Button>

          <Button>
            <Save size={16} />
            Save
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="border-border mb-6 flex overflow-hidden rounded-2xl border">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`group relative h-54 flex-1 cursor-pointer transition-transform hover:scale-105`}
                onClick={() => copyToClipboard(color.color, index)}
                style={{ backgroundColor: color.color }}
              >
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="mb-1 text-sm font-medium drop-shadow-sm">{color.name}</div>
                  <div className="text-xs opacity-90 drop-shadow-sm">{color.color}</div>
                </div>

                {copiedIndex === index && (
                  <div className="absolute top-4 right-4 rounded bg-white px-2 py-1 text-xs font-medium text-gray-800 shadow-lg">
                    Copied!
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            {description || 'No description provided for this palette.'}
          </p>
        </div>
      )}
    </div>
  )
}
