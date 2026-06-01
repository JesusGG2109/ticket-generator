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
      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF7A00] opacity-40' />
      <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF4FD8]' />
    </span>
    <span className='text-sm font-semibold tracking-[0.18em] text-[#0F172A] uppercase'>
      EventHub
    </span>
    <span className='hidden text-[10px] font-medium tracking-[0.3em] text-[#64748B] uppercase sm:inline'>
      TECNM
    </span>
  </NavLink>
)

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'relative px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]',
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
              ? 'w-6 bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] opacity-100'
              : 'w-0 bg-[#0F172A] opacity-0',
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
      className='sticky top-0 z-50 border-b shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_1px_24px_-12px_rgba(15,23,42,0.12)]'
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        borderColor: 'rgba(15,23,42,0.06)',
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
              <div className='hidden items-center gap-2 rounded-full border border-[rgba(15,23,42,0.06)] bg-white/60 px-3 py-1.5 sm:flex'>
                <span className='relative inline-flex h-1.5 w-1.5'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60' />
                  <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500' />
                </span>
                <span className='text-xs font-medium text-[#0F172A]'>
                  {user?.name}
                </span>
              </div>
              <button
                onClick={() => clearAuth()}
                className='rounded-full border border-[rgba(15,23,42,0.06)] bg-white/60 px-3 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:border-[rgba(15,23,42,0.12)] hover:bg-white/80 hover:text-[#0F172A]'
              >
                Cerrar sesion
              </button>
            </>
          ) : (
            <>
              <NavLink
                to='/login'
                className='rounded-full px-3 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:text-[#0F172A] sm:px-4'
              >
                Iniciar sesion
              </NavLink>
              <NavLink
                to='/register'
                className='rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_6px_20px_-6px_rgba(255,122,0,0.55),0_1px_0_0_rgba(255,255,255,0.32)_inset] transition-all hover:shadow-[0_10px_28px_-4px_rgba(255,122,0,0.75),0_1px_0_0_rgba(255,255,255,0.4)_inset] sm:px-4'
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
