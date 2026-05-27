import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { MainLayout } from './components/layouts/main-layout'

import { HomePage } from './pages/home-page'
import { EventsPage } from './pages/events-page'
import { LoginPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'

import { ProtectedRoute } from './components/auth/protected-route'
import { useAuthStore } from './store/auth'

const Navbar = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return (

    <nav className='flex flex-wrap items-center gap-3 py-6'>

      <Link
        to='/'
        className='bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20'
      >
        Inicio
      </Link>

      <Link
        to='/eventos'
        className='bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20'
      >
        Eventos
      </Link>

      <div className='flex-1' />

      {

        isAuthenticated
          ? (
            <>
              <span className='text-white text-sm'>
                Hola, {user?.name}
              </span>

              <button
                onClick={() => clearAuth()}
                className='bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg text-white'
              >
                Cerrar sesion
              </button>
            </>
          )
          : (
            <>
              <Link
                to='/login'
                className='bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20'
              >
                Iniciar sesion
              </Link>

              <Link
                to='/register'
                className='bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white'
              >
                Registrarse
              </Link>
            </>
          )

      }

    </nav>
  )
}

function App() {

  return (

    <BrowserRouter>

      <MainLayout>

        <main className='max-w-3xl mx-auto'>

          <Navbar />

          <Routes>

            <Route
              path='/'
              element={<HomePage />}
            />

            <Route
              path='/login'
              element={<LoginPage />}
            />

            <Route
              path='/register'
              element={<RegisterPage />}
            />

            <Route
              path='/eventos'
              element={
                <ProtectedRoute>
                  <EventsPage />
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
