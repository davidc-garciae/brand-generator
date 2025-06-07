import type { Palette } from '@/types'
import { Heart, MessageCircle, Star } from 'lucide-react'

interface CardPreviewProps {
  palette: Palette
}

export const CardPreview = ({ palette }: CardPreviewProps) => {
  const primary = palette.colors.find((c) => c.value === 600)?.color || '#3B82F6'
  const light = palette.colors.find((c) => c.value === 100)?.color || '#F3F4F6'
  const accent = palette.colors.find((c) => c.value === 500)?.color || '#6366F1'

  return (
    <div className="border-border rounded-xl border bg-white p-6">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">Card Components</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          className="rounded-lg border-l-4 p-6"
          style={{
            backgroundColor: light,
            borderLeftColor: primary,
          }}
        >
          <div className="mb-3 flex items-center">
            <Star className="mr-2 h-5 w-5" style={{ color: primary }} />
            <h4 className="font-semibold text-gray-900">Featured Product</h4>
          </div>
          <p className="mb-4 text-gray-600">
            Discover our latest collection with premium quality materials and exceptional design.
          </p>
          <button className="rounded-md px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: primary }}>
            View Details
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">User Activity</h4>
            <div className="flex space-x-2">
              <Heart className="h-4 w-4 cursor-pointer text-gray-400 hover:text-red-500" />
              <MessageCircle className="h-4 w-4" style={{ color: accent }} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: primary }} />
              <span className="text-sm text-gray-600">New order received</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: accent }} />
              <span className="text-sm text-gray-600">Payment processed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
