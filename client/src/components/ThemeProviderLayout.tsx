import React from "react"
import {useDarkMode} from "../store/theme"

export const ThemeProviderLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {darkMode} = useDarkMode() 
  return (
    <div className={darkMode? "dark": ""}>
      {children}
    </div>
  )
}
