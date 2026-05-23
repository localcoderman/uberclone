import React, { useContext, useState , useEffect } from 'react'
import {UserDataContext} from "../context/UserContext"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {

const [isLoading, setisLoading] = useState(true)
    const{user,setuser} = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
useEffect(()=>{
    if(!token){
        navigate('/login')
    }

    //Api call to get user data

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`,{

    headers:{
        Authorization: `Bearer ${token}`
    }
}).then((response)=>{
    if(response.status === 201){
        const data = response.data
        console.log(data);
        
        setuser(data)
        setisLoading(false)
    }
}).catch((error)=>{
    console.log(error);
    localStorage.removeItem('token')
    navigate('/login')
    
})
},[token])


if(isLoading){
   return <div>Loading....</div>
}


  
  return (
    <>
    {token? children:null}
   </>
  )
}

export default UserProtectWrapper