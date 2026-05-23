
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [userdata, setuserdata] = useState({});
  const {user, setuser}= useContext(UserDataContext);
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();

   const userdata = {
    email:email,
    password:password
   }


   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`,userdata)

  
   

   if(response.status === 201){
    const data = response.data

    
    setuser(data.user)
    localStorage.setItem("token",data.token)
    navigate('/home')
   }

    setemail("");
    setpassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <Link to="/">
          <img
            className="w-18 mb-8  object-cover"
            src="Uber-Logo.wine.png"
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
        <p className="text-center">
          New Here?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-red-500">
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login">
          {" "}
          <button className="text-lg bg-amber-700 w-full text-white font-semibold mb-7 rounded px-4 py-2  ">
            Sign In as Captain
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
