import React from "react"
import { Toaster } from "react-hot-toast"
import {Outlet} from "react-router-dom"
import Header from "./Header"

const Layout: React.FC = () => {

  return(
    <>
      <Header/>
      <Outlet/>
      <Toaster/>
    </>
  )
}
export default Layout;
