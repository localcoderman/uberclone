import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import {CaptainDataContext} from "../context/CaptainContext"

const CaptainLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {captain , setcaptain} = useContext(CaptainDataContext)
  const navigate = useNavigate()


  const formSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    } ;

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/login`, captainData)

    if(response.status ===201){
      const data = response.data
      setcaptain(data)
      localStorage.setItem("token",data.token)
      navigate('/captain-home')
    }
    

    setemail("");
    setpassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <Link to="/">
          <img
            className="w-15 mb-4  object-cover"
            src="captainlogo.jpg"
            alt=""
          />
        </Link>
        <form className="flex flex-col" onSubmit={formSubmit}>
          <h3 className="text-lg font-medium mb-2">What's Your Email?</h3>
          <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="text-lg bg-[#eeeeee]  mb-7 rounded  px-4 py-2 border placeholder:text-base"
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
            className="text-lg bg-[#eeeeee]  mb-7 rounded  px-4 py-2 border placeholder:text-base"
            type="password"
            required
            placeholder="password"
          />
          <button className="text-lg bg-black text-white w-full font-semibold mb-7 rounded px-4 py-2  ">
            Login
          </button>
        </form>
        <p className="text-center ">
          Click Here ?{" "}
          <Link
            to="/captain-signup"
            className="text-blue-400 hover:text-red-500"
          >
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link to="/login">
          {" "}
          <button className="text-lg bg-blue-800 w-full text-white font-semibold mb-7 rounded px-4 py-2  ">
            Sign In as User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
