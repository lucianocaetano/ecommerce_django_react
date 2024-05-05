import {Outlet, useNavigate} from "react-router-dom"
import Header from "./Header"
import { Toaster } from "react-hot-toast"
import {useAuthStore} from "../store/auth"

function Layout () {
  const {isAuth} = useAuthStore()
  const navigate = useNavigate()

  if(!isAuth)
    navigate("/login")

  return(
    <div>
      <Toaster/>
      <Header/>
      <div className="min-h-[100px] bg-white dark:bg-gray-900">
        <Outlet/>
      </div>
    </div>
  )
}
export default Layout;
