import { Starfield } from './starfield'

interface Props {
  children: React.ReactNode
}

/**
 * `isolate` crea un stacking context que actúa como techo para el z-index
 * negativo del Starfield. Sin esto, el Starfield queda atrapado detrás
 * del background del #root.
 */
export const MainLayout = ({ children }: Props) => {
  return (
    <div className='relative isolate min-h-screen text-[#0F172A] antialiased'>
      <Starfield />
      <div className='relative z-0'>{children}</div>
    </div>
  )
}
