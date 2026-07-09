import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Decants from './pages/Decants'
import Brands from './pages/Brands'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Promociones from './pages/Promociones'
import { CartProvider } from './context/CartContext'
import Toast from './components/ui/Toast'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Toast />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/decants" element={<Decants />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/promociones" element={<Promociones />} />
          </Routes>
        </div>
        <Footer />
      </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
