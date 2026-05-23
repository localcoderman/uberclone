import React, { createContext, useState , } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {

    const [captain, setcaptain] = useState({
        
    })

  return (
    <CaptainDataContext.Provider value={{captain , setcaptain}}>
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext