export const API_URL = import.meta.env.VITE_API_URL || 'https://afordin.bernabe.dev'

export const FONTS = [
  { name: 'Inter', key: 'inter', availableFor: ['heading', 'body'], fontFamily: 'InterVariable' },
  { name: 'Poppins', key: 'poppins', availableFor: ['heading'], fontFamily: 'Poppins' },
  { name: 'DMSans', key: 'dm-sans', availableFor: ['heading'], fontFamily: 'DM Sans' },
  { name: 'Geist', key: 'geist', availableFor: ['heading', 'body'], fontFamily: 'Geist' },
  { name: 'Montserrat', key: 'montserrat', availableFor: ['heading'], fontFamily: 'Montserrat' },
  { name: 'CalSans', key: 'cal-sans', availableFor: ['body'], fontFamily: 'Cal Sans' },
  { name: 'Lato', key: 'lato', availableFor: ['body'], fontFamily: 'Lato' },
  { name: 'Figtree', key: 'figtree', availableFor: ['body'], fontFamily: 'Figtree' },
] as const
