import './App.css'
import HomePage from './pages/HomePage'
import {Route, Routes} from 'react-router-dom'
import CardDetails from './pages/CardDetailsPage'
import Navbar from './components/Navbar'
import NewCollection from './pages/NewCollectionPage'
import CollectionsPage from './pages/CollectionsPage'
import CollectionDetails from './pages/CollectionDetailsPage'

function App() {
  return (
    <>
    <Navbar />
    <div className='ctn'>    
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cards/:cardId" element={<CardDetails />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/collections/:collectionId" element={<CollectionDetails />} />
      <Route path="/collections/new" element={<NewCollection />} />

      <Route path="*" element={<h1>404 Page</h1>} />

    </Routes>
    </div>
    </>
  )
}

export default App
