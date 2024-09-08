import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'
import Login from "./pages/Login.tsx"
import Admin from './pages/Admin.tsx'
import DetailProduct from './pages/DetailProduct.tsx'
import Categories from "./pages/Categories.tsx"

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:slug" element={<DetailProduct/>} />
          <Route path="login/" element={<Login />} />
          <Route path="register/" element={<Register/>} />
          <Route path="admin/" element={<Admin/>} />
          <Route path="categories/" element={<Categories/>} />
          <Route path="categories/:category" element={<Categories/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
