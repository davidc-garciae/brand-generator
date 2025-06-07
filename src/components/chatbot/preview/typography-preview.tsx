import { FONTS } from '@/helpers/contants'
import type { FontItem, Palette } from '@/types'
import { ChevronDown, ChevronUp, Save, Shuffle } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  fonts: FontItem[]
  editable?: boolean
  palette?: Palette
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
  const { fonts, editable = false, palette } = props

  const [isExpanded, setIsExpanded] = useState(true)

  const fontHeading = fonts.find((font) => font.type === 'heading')
  const fontBody = fonts.find((font) => font.type === 'body')

  const fontFamilyHeading = FONTS.find((font) => font.key === fontHeading?.key)?.fontFamily
  const fontFamilyBody = FONTS.find((font) => font.key === fontBody?.key)?.fontFamily

  const primary = palette?.colors.find((c) => c.value === 700)?.color || '#374151'
  const secondary = palette?.colors.find((c) => c.value === 500)?.color || '#6B7280'
  const accent = palette?.colors.find((c) => c.value === 600)?.color || '#3B82F6'

  return (
    <div className="border-primary/20 mx-6 h-fit overflow-hidden rounded-2xl border bg-white">
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
        <div className="space-y-6 p-6">
          <div>
            <h1 className="mb-2 text-4xl font-bold" style={{ color: primary, fontFamily: fontFamilyHeading }}>
              Heading Level 1
            </h1>
            <h2 className="mb-2 text-3xl font-semibold" style={{ color: primary, fontFamily: fontFamilyHeading }}>
              Heading Level 2
            </h2>
            <h3 className="mb-2 text-2xl font-medium" style={{ color: secondary, fontFamily: fontFamilyHeading }}>
              Heading Level 3
            </h3>
          </div>

          <div className="prose max-w-none" style={{ fontFamily: fontFamilyBody }}>
            <p className="mb-4 leading-relaxed text-gray-700">
              This is a paragraph demonstrating how your palette works with body text. The colors maintain excellent
              readability while providing visual hierarchy and brand consistency throughout your design system.
            </p>

            <p className="mb-4 text-sm text-gray-600">
              This is smaller body text that works well for secondary information, captions, or supplementary content
              within your designs.
            </p>

            <blockquote className="border-l-4 pl-4 italic" style={{ borderColor: accent }}>
              <p style={{ color: secondary }}>
                "A well-designed color palette serves as the foundation for consistent, professional, and visually
                appealing user interfaces."
              </p>
            </blockquote>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: accent }}>
              Primary Tag
            </span>
            <span
              className="rounded-full border px-3 py-1 text-sm font-medium"
              style={{
                borderColor: secondary,
                color: secondary,
              }}
            >
              Secondary Tag
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">Neutral Tag</span>
          </div>
        </div>
      )}
    </div>
  )
}
