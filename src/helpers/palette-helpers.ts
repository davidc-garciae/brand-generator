import type { Palette } from '@/types'
export const generateTailwindColors = (palette: Palette) => {
  const colorVariables = palette.colors
    .map((item) => {
      const colorName = palette.name.toLowerCase().replace(/\s+/g, '-')
      return `  --color-${colorName}-${item.value}: ${item.color};`
    })
    .join('\n')

  return colorVariables
}
