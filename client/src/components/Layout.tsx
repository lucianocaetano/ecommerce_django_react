import {Outlet} from "react-router-dom"
import Header from "./Header"
import { Toaster } from "react-hot-toast"

function Layout () {
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
