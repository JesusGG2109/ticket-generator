import { Starfield } from './starfield'

interface Props {
  children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className='relative min-h-screen text-white antialiased'>
      <Starfield />
      <div className='relative z-0'>{children}</div>
    </div>
  )
}
