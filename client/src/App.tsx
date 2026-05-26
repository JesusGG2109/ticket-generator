import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { MainLayout } from './components/layouts/main-layout'

import { HomePage } from './pages/home-page'
import { EventsPage } from './pages/events-page'

function App() {

  return (

    <BrowserRouter>

      <MainLayout>

        <main className='max-w-3xl mx-auto'>

          <nav className='flex gap-4 py-6'>

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

          </nav>

          <Routes>

            <Route
              path='/'
              element={<HomePage />}
            />

            <Route
              path='/eventos'
              element={<EventsPage />}
            />

          </Routes>

        </main>

      </MainLayout>

    </BrowserRouter>
  )
}

export default App