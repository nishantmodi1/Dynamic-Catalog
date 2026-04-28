import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ItemDetail from './pages/ItemDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: '#07090f' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemSlug" element={<ItemDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
