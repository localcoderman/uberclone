import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios'





const CaptainSignup = () => {

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userData, setuserData] = useState({});
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    
    const {captain , setcaptain} = useContext(CaptainDataContext);
    const navigate = useNavigate()

  



      const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate : vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType : vehicleType
      }
    };



    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/register`,newCaptain)

    if(response.status === 201){
      const data = response.data
      console.log(data);
      
      setcaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }
    

    setfirstname("");
    setlastname("");
    setemail("");
    setpassword("");
    setVehicleCapacity('')
    setVehicleColor("")
    setVehiclePlate("")
    setVehicleType("")
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between ">
        <div>
          <Link to='/'><img className="w-15 mb-4 ml-1 object-cover" src="captainlogo.jpg" alt="" /></Link>
          <form className="flex flex-col" onSubmit={submitHandler} >
            <h3 className="text-lg font-medium mb-2">What's Our Captain Name</h3>
            <div className="flex gap-2 mb-5">
              <input
                value={firstname}
                onChange={(e) => {
                  setfirstname(e.target.value);
                }}
                className="text-lg bg-[#eeeeee]  w-1/2 rounded  px-3 py-2 border placeholder:text-base"
                type="text"
                required
                placeholder="First Name"
              />
              <input
                value={lastname}
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
                className="text-lg bg-[#eeeeee] w-1/2  rounded  px-3 py-2 border placeholder:text-base"
                type="text"
                required
                placeholder="Second Name"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What's Our Captain Email</h3>
            <input
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="text-lg  bg-[#eeeeee]  mb-5 rounded  px-4 py-2 border placeholder:text-base"
              type="text"
              required
              placeholder="email@example.com"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="text-lg  bg-[#eeeeee]  mb-7 rounded  px-4 py-2 border placeholder:text-base"
              type="password"
              required
              placeholder="password"
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className='flex gap-2'>
              <input
               
              value={vehicleColor}
              onChange={(e) => {
                const onlyText = e.target.value.replace(/[^a-zA-Z ]/g, "");
                setVehicleColor(onlyText);
              }}
              className="text-lg  bg-[#eeeeee]  mb-5 rounded w-1/2 px-4 py-2 border placeholder:text-base"
              type="text"
              required
              placeholder="Vehicle Color"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              className="text-lg  bg-[#eeeeee]  mb-5 rounded w-1/2 px-4 py-2 border placeholder:text-base"
              type="text"
              required
              placeholder="Vehicle Plate"
            />
            </div>

            <div className='flex gap-2'>
              <input
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              className="text-lg  bg-[#eeeeee]  mb-5 rounded w-1/2 px-4 py-2 border placeholder:text-base"
              type="number"
              required
              placeholder="Vehicle Capacity"
            />

            
            <select
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
              className="text-lg  text-wrap bg-[#eeeeee]  mb-7 rounded w-1/2 px-4 py-2 border placeholder:text-base"
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="autoRiksha">Auto Rickshaw</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
            </div>

            <button className="text-lg bg-black text-white w-full font-semibold mb-7 rounded px-4 py-2  ">
              Create Captain Account
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-400 hover:text-red-500">
              Login Here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-center leading-tight ">
            This site is protected by reCAPTCHA and the <span className='font-bold underline'>Google Privacy Policy</span> and <span className='font-bold underline'>Terms of Service apply</span> 
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup