import { FONTS } from '@/helpers/contants'
import type { FontItem } from '@/types'
import { ChevronDown, ChevronUp, Save, Shuffle } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  fonts: FontItem[]
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

export default function TypographyPreview(props: Props) {
  const { fonts, editable = false } = props
  const [isExpanded, setIsExpanded] = useState(true)

  const fontHeading = fonts.find((font) => font.type === 'heading')
  const fontBody = fonts.find((font) => font.type === 'body')

  const fontFamilyHeading = FONTS.find((font) => font.key === fontHeading?.key)?.fontFamily
  const fontFamilyBody = FONTS.find((font) => font.key === fontBody?.key)?.fontFamily

  return (
    <div className="mx-6 h-fit overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-800 transition-colors hover:text-gray-600"
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            Typography
          </button>
        </div>

        <div className="flex items-center gap-3">
          {editable && (
            <Button>
              <Shuffle size={16} />
              Create Again
            </Button>
          )}

          <Button>
            <Save size={16} />
            Save
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: fontFamilyHeading }}>
            The quick brown fox jumps over the lazy dog
          </h2>
          <p className="text-xl leading-relaxed text-gray-600" style={{ fontFamily: fontFamilyBody }}>
            Lorem ipsum dolor sit amet consectetur. Mauris leo egestas lectus amet iaculis posuere fusce maecenas felis.
            Justo ullamcorper elementum massa et nisl rhoncus.
          </p>
        </div>
      )}
    </div>
  )
}
