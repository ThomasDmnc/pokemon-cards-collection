import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import {Route, Routes} from 'react-router-dom'
import CardDetails from './pages/CardDetailsPage'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className='ctn'>    
      <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="cards/:cardId" element={<CardDetails />} />
      <Route path="*" element={<h1>404 Page</h1>} />

    </Routes>
    </div>
    </>
  )
}

export default App
