import React from "react"
import LoadingIcons from 'react-loading-icons'

export const Loading: React.FC = () => {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <LoadingIcons.Audio fill="#FF6140"/>
        <p className="text-orange-600 text-bold">loading...</p>

      </div>
    </div>
  )

}
