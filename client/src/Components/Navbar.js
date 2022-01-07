/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.svg";
function Navbar({ onLogout }) {
  const [nav, setNav] = useState(null);

  useEffect(() => {
    setNav(localStorage.getItem("token"));
  });

  return (
    <div className="mx-auto w-full absolute">
      {nav === null ? (
        <nav className="nav">
          <Link to="/">
            <div className="flex items-center">
              <img className="w-12" src={Logo} />
              <div className=" hidden md:block  md:text-4xl md:font-bold md:ml-4 md:text-gray-100">
                QuizHub
              </div>
            </div>
          </Link>

          <div>
            <Link className="text-sm md:text-base px-4 text-gray-100 font-semibold " to="/register">
              Register
            </Link>

            <Link className="text-sm md:text-base px-4 text-gray-100 font-semibold border-2 border-white py-2 " to="/login">
              Login
            </Link>
          </div>
        </nav>
      ) : (
        <nav className="nav">
          <div>
            <Link className=" " to="/quiz">
              <div className="flex items-center">
                <img className="w-12" src={Logo} />
                <div className="text-4xl font-bold ml-4 text-gray-100">
                  QuizHub
                </div>
              </div>
            </Link>
          </div>
          <div>
            {/* <Link className="text-sm md:text-base px-4 text-gray-100 font-semibold" to="/profile/:id">
              Profile
            </Link> */}
            <a className="text-sm md:text-base px-4 text-gray-100 font-semibold" onClick={onLogout}>
              Log out
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
