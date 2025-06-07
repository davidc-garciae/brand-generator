import { Input } from '@/components/ui/Input'
import type { Palette } from '@/types'
import React from 'react'

interface FormPreviewProps {
  palette: Palette
}

export const FormPreview = ({ palette }: FormPreviewProps) => {
  const primary = palette.colors.find((c) => c.value === 600)?.color || '#3B82F6'
  // const light = palette.colors.find(c => c.value === 100)?.color || '#F3F4F6'
  const accent = palette.colors.find((c) => c.value === 500)?.color || '#6366F1'

  return (
    <div className="border-border rounded-xl border bg-white p-6">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">Form Elements</h3>

      <div className="mx-auto space-y-6">
        <Input
          type="email"
          placeholder="Enter your email"
          label="Email Address"
          name="email"
          styleLabel={{ color: primary }}
          inputStyle={
            {
              '--tw-ring-color': primary + '33',
            } as React.CSSProperties
          }
        />
        <Input
          type="password"
          placeholder="Enter your password"
          label="Password"
          name="password"
          styleLabel={{ color: primary }}
          inputStyle={
            {
              '--tw-ring-color': primary + '33',
            } as React.CSSProperties
          }
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 focus:ring-2"
            style={
              {
                accentColor: primary,
                '--tw-ring-color': primary + '33',
              } as React.CSSProperties
            }
          />
          <label className="ml-2 text-sm text-gray-600">Remember me</label>
        </div>

        <button
          className="w-full rounded-lg px-4 py-3 font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: primary }}
        >
          Sign In
        </button>

        <div className="text-center">
          <a href="#" className="text-sm hover:underline" style={{ color: accent }}>
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  )
}
