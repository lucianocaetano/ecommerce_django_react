import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
  access: string
  refresh: string
  isAuth: boolean
}

interface Actions {
  setToken: (access: string, refresh: string) => void
  logout: () => void
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      access: "",
      refresh: "",
      isAuth: false,
      setToken: (access: string, refresh: string)=>{
        set(()=>({
          access,
          refresh,
          isAuth: true,
        }))
      },
      logout: () => {
        set(()=>({
          access: "",
          refresh: "",
          isAuth: false,
        }))
      }
    }),
    {name: "auth"}
  )
)
