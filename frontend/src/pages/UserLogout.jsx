import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const UserLogout =() => {

   
    const token = localStorage.getItem('token')
     const navigate = useNavigate()
useEffect(()=>{
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{

        if(response.status === 201){
            localStorage.removeItem('token')
            navigate('/login')
        }
    }).catch((err) => {
            console.error("Logout backend error:", err)
            // Fallback: Agar API fail ho jaye tab bhi user ko logout karo aur login page par bhejo
            localStorage.removeItem('token')
            navigate('/login')
        })
},[token])

  return (
    <></>
  )
}

export default UserLogout