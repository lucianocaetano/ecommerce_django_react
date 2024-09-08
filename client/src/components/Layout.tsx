import React from "react"
import { Toaster } from "react-hot-toast"
import {Outlet} from "react-router-dom"
import Header from "./Header"

const Layout: React.FC = () => {

  return(
    <>
      <Header/>
      <div className="h-screen bg-gray-50 dark:bg-gray-900">
        <Outlet/>
      </div>
      <Toaster/>
    </>
  )
}
export default Layout;
