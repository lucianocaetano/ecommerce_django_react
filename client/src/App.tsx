import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'
import Login from "./pages/Login.tsx"

function App () {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login/" element={<Login />} />
            <Route path="register/" element={<Register/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
