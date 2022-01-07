import React, { useState, useEffect } from "react";
import Hero from "../images/hero.jpg";
function LandingPage() {
  const [dummy, setDummy] = useState([]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     //assign interval to a variaable to clear it
  //     const random = Math.floor(Math.random() * 100);
  //     setDummy((dummy) => [...dummy, random]);
  //     console.log(dummy);
  //   });
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, 500);

  return (
    <div className="w-full h-screen overflow-y-hidden overscroll-y-none">
      {/* <div className="w-10/12">
        <img className="w-full rounded-3xl " src={Hero} />
      </div> */}
      <div className="pt-40">
        <div className="text-gray-100 text-center font-thin text-xl sm:text-3xl md:text-5xl lg:text-6xl ">Its Just Better <br/> Fucking School's System</div>
      </div>
    </div>
  );
}

export default LandingPage;
