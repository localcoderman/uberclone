import React from "react";
import {Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div className="h-screen pt-8 w-full bg-[url(home.jpg)] bg-size-[150%]  bg-left  flex flex-col justify-between">
        <img className="w-25 ml-5 object-cover" src="Uber-White-Logo.wine.png" alt="" />
        <div className=" bg-white py-4 px-5 pb-5 rounded-t-2xl">
          <h2 className="text-2xl font-bold">Get Started with Uber</h2>
          <Link to="/login" className="flex items-center justify-center w-full text-xl bg-black text-white py-3 rounded mt-3">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
