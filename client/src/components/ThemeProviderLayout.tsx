import React from "react"
import {useDarkMode} from "../store/theme"

export const ThemeProviderLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {darkMode} = useDarkMode() 

  if(darkMode){
    document.documentElement.classList.add("dark")
  }else {
    document.documentElement.classList.remove("dark")
  }

  return (
    <div>
      {children}
    </div>
  )
}
