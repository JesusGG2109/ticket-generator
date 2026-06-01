import { Starfield } from './starfield'

interface Props {
  children: React.ReactNode
}

/**
 * MainLayout — usa `isolation: isolate` (utility Tailwind `isolate`) para
 * crear un stacking context que actúa como techo del z-index negativo del
 * <Starfield />. Sin esto, el z-index -10 del Starfield se escapa al
 * stacking context raíz y queda atrapado detrás del background opaco del
 * #root definido en index.css. Confirmado vía test diagnóstico.
 */
export const MainLayout = ({ children }: Props) => {
  return (
    <div className='relative isolate min-h-screen text-white antialiased'>
      <Starfield />
      <div className='relative z-0'>{children}</div>
    </div>
  )
}
