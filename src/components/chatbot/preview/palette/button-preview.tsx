import type { Palette } from '@/types'

interface ButtonPreviewProps {
  palette: Palette
}

export const ButtonPreview = ({ palette }: ButtonPreviewProps) => {
  const primary = palette.colors.find((c) => c.value === 600)?.color || '#3B82F6'
  // const secondary = palette.colors.find((c) => c.value === 200)?.color || '#E5E7EB'
  const accent = palette.colors.find((c) => c.value === 500)?.color || '#6366F1'

  return (
    <div className="border-border rounded-xl border bg-white p-6">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">Button Variations</h3>
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">Primary Buttons</h4>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg px-6 py-2 font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: primary }}
            >
              Get Started
            </button>
            <button
              className="rounded-lg px-6 py-2 font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Learn More
            </button>
            <button
              className="rounded-lg border px-6 py-2 font-medium transition-colors hover:opacity-80"
              style={{
                borderColor: primary,
                color: primary,
                backgroundColor: 'transparent',
              }}
            >
              Secondary
            </button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">Button States</h4>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg px-6 py-2 font-medium text-white" style={{ backgroundColor: primary }}>
              Default
            </button>
            <button
              className="rounded-lg px-6 py-2 font-medium text-white opacity-80"
              style={{ backgroundColor: primary }}
            >
              Hover
            </button>
            <button
              className="rounded-lg px-6 py-2 font-medium text-white opacity-60"
              style={{ backgroundColor: primary }}
            >
              Disabled
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
