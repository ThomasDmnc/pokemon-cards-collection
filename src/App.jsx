import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import {Route, Routes} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<h1>404 Page</h1>} />

    </Routes>
    </>
  )
}

export default App
