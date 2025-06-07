import type { Palette } from '@/types'
import { Bell, Menu, Search, User } from 'lucide-react'

interface NavigationPreviewProps {
  palette: Palette
}

export const NavigationPreview = ({ palette }: NavigationPreviewProps) => {
  const primary = palette.colors.find((c) => c.value === 700)?.color || '#1F2937'
  const accent = palette.colors.find((c) => c.value === 500)?.color || '#6366F1'
  // const light = palette.colors.find(c => c.value === 100)?.color || '#F9FAFB'

  return (
    <div className="border-border rounded-xl border bg-white p-6">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">Navigation Components</h3>

      <div className="space-y-6">
        {/* Header Navigation */}
        <div className="rounded-lg px-6 py-4" style={{ backgroundColor: primary }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Menu className="h-5 w-5 text-white" />
                <span className="font-semibold text-white">Brand</span>
              </div>
              <nav className="hidden space-x-6 md:flex">
                <a href="#" className="text-sm text-white hover:opacity-80">
                  Home
                </a>
                <a href="#" className="text-sm text-white hover:opacity-80">
                  Products
                </a>
                <a href="#" className="text-sm text-white hover:opacity-80">
                  About
                </a>
                <a href="#" className="text-sm text-white hover:opacity-80">
                  Contact
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 cursor-pointer text-white hover:opacity-80" />
              <Bell className="h-5 w-5 cursor-pointer text-white hover:opacity-80" />
              <User className="h-5 w-5 cursor-pointer text-white hover:opacity-80" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <a
              href="#"
              className="border-b-2 px-1 py-2 text-sm font-medium"
              style={{
                borderColor: accent,
                color: accent,
              }}
            >
              Dashboard
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent px-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Analytics
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent px-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Settings
            </a>
          </nav>
        </div>

        {/* Breadcrumb */}
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:text-gray-500">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="#" style={{ color: accent }} className="text-sm hover:opacity-80">
                Category
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-sm text-gray-900">Current Page</li>
          </ol>
        </nav>
      </div>
    </div>
  )
}
