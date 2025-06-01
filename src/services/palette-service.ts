import { API_URL } from '@/helpers/contants'
import type { PaletteItem } from '@/types'
import type { PaginateResponse } from '@/types/paginate-response'

export type PaletteDB = {
  id: string
  name: string
  description?: string
  colors: PaletteItem[]
  createdAt: string
}

export class PaletteService {
  static async getPalettes() {
    try {
      const res = await fetch(`${API_URL}/palettes?page=1&perPage=50`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      return data as PaginateResponse<PaletteDB>
    } catch (error) {
      throw new Error(`Failed to fetch palettes: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
