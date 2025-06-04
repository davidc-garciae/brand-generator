import { cn } from '@/helpers/cn'

const PALETTES = [
  {
    color: '#C16699',
    className:
      'z-5 w-[40%] top-1 -translate-x-[50%] scale-90 -rotate-15 opacity-80 duration-500 group-hover:z-[10] group-hover:-translate-x-[85%] group-hover:scale-100 group-hover:-rotate-6 group-hover:opacity-100 lg:w-[30%] lg:-translate-x-[80%]',
  },
  {
    color: '#496895',
    className:
      'z-5 w-[40%] translate-x-[50%] scale-90 rotate-15 opacity-80 duration-500 group-hover:z-[10] group-hover:translate-x-[85%] group-hover:scale-100 group-hover:rotate-6 group-hover:opacity-100 lg:w-[30%] lg:translate-x-[60%]',
  },
  {
    color: '#E5D9FB',
    className: 'z-10 w-1/2 <scale-100></scale-100> duration-300 group-hover:scale-95 lg:w-[40%]',
  },
]

export default function EmptyStatePalettes() {
  return (
    <div className="group relative flex min-h-[100px] w-full items-center justify-center">
      {PALETTES.map(({ className, color }) => (
        <div className={cn('absolute origin-center transform-gpu transition-all ease-out', className)}>
          <div className="size-20 rounded-t-lg" style={{ backgroundColor: color }}></div>
          <div className="w-20 rounded-b-lg bg-white px-2 py-0.5">
            <p className="text-center text-xs font-semibold">{color}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
