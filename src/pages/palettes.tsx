import PalettePreview from '@/components/chatbot/preview/palette-preview'
import { PaletteService, type PaletteDB } from '@/services/palette-service'
import type { PaginateResponse } from '@/types/paginate-response'
import { useEffect, useState } from 'react'

export default function Palettes() {
  const [palettes, setPalettes] = useState<PaginateResponse<PaletteDB>>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const palettes = await PaletteService.getPalettes()
        setPalettes(palettes)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }
    fetchPalettes()
  }, [])
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">Palettes</h1>
      <p className="text-lg text-gray-700">Explore various color palettes!</p>
      <div className="mt-8 grid grid-cols-1 gap-8">
        {palettes?.data.map((palette) => (
          <PalettePreview
            key={palette.id}
            palette={{
              name: palette.name,
              colors: palette.colors,
              description: palette.description || '',
            }}
          />
        ))}
      </div>
      {error && (
        <div className="mt-4 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
}
