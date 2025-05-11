import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Heading } from '@chakra-ui/react'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import Register from './pages/Register'
import { Layout } from './components/index'
import { AuthProvider } from './contexts/UseAuth'
import { PrivateRoute } from './components/index'



function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/:username' element={<Layout><PrivateRoute><UserProfile /></PrivateRoute></Layout>} />
          <Route path='/Login' element={<Layout><Login /></Layout>} />
          <Route path='/Register' element={<Layout><Register /></Layout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
   </>
  )
}

export default App
