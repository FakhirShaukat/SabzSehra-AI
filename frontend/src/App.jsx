
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

import TitlePage from './pages/TitlePage'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import MyGarden from './pages/MyGarden'
import Chatbot from './components/Chatbot'

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/garden" element={<MyGarden />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>

      {location.pathname !== '/' && <Chatbot />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
