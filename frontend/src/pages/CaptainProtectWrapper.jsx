import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CaptainDataContext} from "../context/CaptainContext"
import axios from 'axios'


const CaptainProtectWrapper = ({children}) => {

    const {captain , setcaptain} = useContext(CaptainDataContext)
    const [IsLoading, setIsLoading] = useState(true)

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
        }
    },[token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    } ).then((response)=>{
        if(response.status === 201){
            const data = response.data
            setcaptain(data)
            setIsLoading(false)
        }
    }).catch((error)=>{
        console.log(error);
        localStorage.removeItem("token")
        navigate('/captain-login')
        
    })

    if(IsLoading){
        <div>Loading...</div>
    }

  return (
    <div>{token?children:null}</div>
  )
}

export default CaptainProtectWrapper