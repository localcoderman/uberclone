import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [Pick, setPickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [panelOpen]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="Uber-White-Logo.wine.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="w-full h-full object-cover"
          src="map location.png"
          alt=""
        />
      </div>
      <div className=" flex flex-col justify-end absolute bottom-0  w-full h-screen ">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            onClick={() => [setPanelOpen(false)]}
            className="absolute top-3 right-8 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 bg-gray-900 rounded-full top-[45%] left-10 "></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              value={Pick}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              placeholder="Add a Pick-up Location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              value={destination}
              onChange={(e) => {
                setdestination(e.target.value);
              }}
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-[0%] bg-white  ">
          <LocationSearchPanel />
        </div>
      </div>

      {/* // Ride options panel */}

      <div className=" fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-8">
        <h3 className='font-medium text-xl p-2'>Choose a ride</h3>

         <div className="flex items-center justify-between w-full p-3 gap-3 active:border-2 border-black rounded-xl mb-3 bg-gray-100">
          <img className="h-16 scale-110 object-cover shrink-0 " src="\icon\car.png" alt="load" />
          <div className=" w-1/2 ml-2">
            <h4 className="font-medium text-lg ">
              Uber-Car  <span>  <i className="ri-user-fill text-sm">4</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mints away</h5>
            <p className="font-normal text-xs text-gray-700">Affordable, Compact rides</p>
          </div>
          <h2 className="text-xl font-semibold tracking-tighter ">192 <span className="text-base">Rs</span></h2>
        </div>

        <div className="flex items-center justify-between w-full p-3 gap-3 active:border-2 border-black rounded-xl mb-3 bg-gray-100 ">
          <img className="h-19 shrink-0" src="\icon\bike.webp" alt="load" />
          <div className=" w-1/2 ml-2">
            <h4 className="font-medium text-lg ">
              Uber-Bike  <span>  <i className="ri-user-fill text-sm">1</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mints away</h5>
            <p className="font-normal text-xs text-gray-700">Affordable, motorcycle rides</p>
          </div>
           <h2 className="text-xl font-semibold tracking-tighter ">65 <span className="text-base">Rs</span></h2>
        </div>

         <div className="flex items-center justify-between w-full p-3 gap-3 active:border-2 border-black rounded-xl mb-3 bg-gray-100">
          <img className="h-12 scale-150 object-cover shrink-0" src="/icon/auto.webp" alt="load" />
          <div className=" w-1/2 ml-2">
            <h4 className="font-medium text-lg ">
              Uber-Auto  <span>  <i className="ri-user-fill text-sm">3</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">5 mints away</h5>
            <p className="font-normal text-xs text-gray-700">Affordable, auto rides</p>
          </div>
           <h2 className="text-xl font-semibold tracking-tighter ">118 <span className="text-base">Rs</span></h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
