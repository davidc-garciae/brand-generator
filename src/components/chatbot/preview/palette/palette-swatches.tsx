import type { Palette } from '@/types'

interface PaletteSwatchesProps {
  palette: Palette
}

export const PaletteSwatches = ({ palette }: PaletteSwatchesProps) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-gray-900">Color Swatches</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-9">
        {palette.colors.map((color) => (
          <div key={color.value} className="group">
            <div
              className="mb-3 h-20 w-full rounded-lg border border-gray-200 transition-transform group-hover:scale-105"
              style={{ backgroundColor: color.color }}
            />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{color.name}</p>
              <p className="mt-1 text-xs text-gray-500">{color.color}</p>
              <p className="text-xs text-gray-400">{color.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
