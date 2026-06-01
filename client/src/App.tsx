import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import { MainLayout } from './components/layouts/main-layout'

import { HomePage } from './pages/home-page'
import { EventsPage } from './pages/events-page'
import { LoginPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'
import { MyTicketsPage } from './pages/my-tickets-page'

import { ProtectedRoute } from './components/auth/protected-route'
import { useAuthStore } from './store/auth'

const Brand = () => (
  <NavLink to='/' className='group flex items-center gap-2.5'>
    <span className='relative inline-flex h-2.5 w-2.5'>
      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-40' />
      <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE]' />
    </span>
    <span className='text-sm font-semibold tracking-[0.18em] text-white uppercase'>
      EventHub
    </span>
    <span className='hidden text-[10px] font-medium tracking-[0.3em] text-[#94A3B8] uppercase sm:inline'>
      TECNM
    </span>
  </NavLink>
)

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'relative px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'text-white' : 'text-[#94A3B8] hover:text-white',
  ].join(' ')

const NavItem = ({
  to,
  label,
}: {
  to: string
  label: string
}) => (
  <NavLink to={to} className={navLinkClass} end={to === '/'}>
    {({ isActive }) => (
      <>
        <span>{label}</span>
        <span
          className={[
            'absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-200',
            isActive
              ? 'w-6 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] opacity-100'
              : 'w-0 bg-white opacity-0',
          ].join(' ')}
        />
      </>
    )}
  </NavLink>
)

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return (
    <header
      className='sticky top-0 z-50 border-b shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]'
      style={{
        background: 'rgba(8,12,24,0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6'>
        <Brand />

        <nav className='flex items-center gap-1 sm:gap-2'>
          <NavItem to='/' label='Inicio' />
          <NavItem to='/eventos' label='Eventos' />
          {isAuthenticated && <NavItem to='/mis-tickets' label='Mis Tickets' />}
        </nav>

        <div className='flex items-center gap-2'>
          {isAuthenticated ? (
            <>
              <div className='hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 sm:flex'>
                <span className='relative inline-flex h-1.5 w-1.5'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60' />
                  <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400' />
                </span>
                <span className='text-xs font-medium text-[#D1D5DB]'>
                  {user?.name}
                </span>
              </div>
              <button
                onClick={() => clearAuth()}
                className='rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
              >
                Cerrar sesion
              </button>
            </>
          ) : (
            <>
              <NavLink
                to='/login'
                className='rounded-full px-3 py-1.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:text-white sm:px-4'
              >
                Iniciar sesion
              </NavLink>
              <NavLink
                to='/register'
                className='rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_6px_20px_-6px_rgba(139,92,246,0.55),0_1px_0_0_rgba(255,255,255,0.18)_inset] transition-all hover:shadow-[0_10px_28px_-4px_rgba(139,92,246,0.75),0_1px_0_0_rgba(255,255,255,0.22)_inset] sm:px-4'
              >
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Navbar />

        <main className='mx-auto max-w-6xl px-4 sm:px-6'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route
              path='/eventos'
              element={
                <ProtectedRoute>
                  <EventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/mis-tickets'
              element={
                <ProtectedRoute>
                  <MyTicketsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
