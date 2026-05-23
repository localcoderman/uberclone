import React, { useContext } from 'react'
import {CaptainDataContext} from "../context/CaptainContext"

const CaptainHome = () => {
  const {captain} = useContext(CaptainDataContext)
  
  return (
    <div><h1>Hello captain Home Page</h1></div>
  )
}


export default CaptainHome