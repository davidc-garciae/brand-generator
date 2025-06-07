import type { Palette } from '@/types'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'

interface AlertPreviewProps {
  palette: Palette
}

export const AlertPreview = ({ palette }: AlertPreviewProps) => {
  const primary = palette.colors.find((c) => c.value === 600)?.color || '#3B82F6'
  const light = palette.colors.find((c) => c.value === 100)?.color || '#F3F4F6'
  const medium = palette.colors.find((c) => c.value === 300)?.color || '#93C5FD'

  return (
    <div className="border-border rounded-xl border bg-white p-6">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">Alert Components</h3>

      <div className="space-y-4">
        <div
          className="flex items-center rounded-lg border-l-4 p-4"
          style={{
            backgroundColor: light,
            borderLeftColor: primary,
          }}
        >
          <Info className="mr-3 h-5 w-5" style={{ color: primary }} />
          <div>
            <h4 className="font-medium" style={{ color: primary }}>
              Information
            </h4>
            <p className="mt-1 text-sm text-gray-600">This is an informational message using your palette colors.</p>
          </div>
        </div>

        <div className="flex items-center rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
          <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
          <div>
            <h4 className="font-medium text-green-800">Success</h4>
            <p className="mt-1 text-sm text-green-700">Your action was completed successfully!</p>
          </div>
        </div>

        <div className="flex items-center rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
          <AlertCircle className="mr-3 h-5 w-5 text-yellow-500" />
          <div>
            <h4 className="font-medium text-yellow-800">Warning</h4>
            <p className="mt-1 text-sm text-yellow-700">Please review your input before proceeding.</p>
          </div>
        </div>

        <div className="flex items-center rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <XCircle className="mr-3 h-5 w-5 text-red-500" />
          <div>
            <h4 className="font-medium text-red-800">Error</h4>
            <p className="mt-1 text-sm text-red-700">There was an error processing your request.</p>
          </div>
        </div>

        {/* Custom palette notification */}
        <div className="flex items-center rounded-lg p-4" style={{ backgroundColor: medium + '20' }}>
          <div className="mr-3 h-2 w-2 rounded-full" style={{ backgroundColor: primary }} />
          <div>
            <h4 className="font-medium text-gray-900">Palette Notification</h4>
            <p className="mt-1 text-sm text-gray-600">
              This notification uses your custom palette colors for branding consistency.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
