import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userData, setuserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setuserData({
      username: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });

    console.log(userData);

    setfirstname("");
    setlastname("");
    setemail("");
    setpassword("");
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between ">
        <div>
          <Link to="/">
            <img
              className="w-18 mb-5  object-cover"
              src="Uber-Logo.wine.png"
              alt=""
            />
          </Link>
          <form className="flex flex-col" onSubmit={submitHandler}>
            <h3 className="text-lg font-medium mb-2">What's Your Name</h3>
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
            <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
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
            <button className="text-lg bg-black text-white w-full font-semibold mb-7 rounded px-4 py-2  ">
              Register
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-red-500">
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
  );
};

export default UserSignup;
