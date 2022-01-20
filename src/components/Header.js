import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/logo.png";
import nav_icon from "../assets/nav_icon.png";
import { Link } from "react-router-dom";
import { UserContext } from "../shared/contexts/UserContext";
import { getAuth, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";

function Header() {
  const { showUser, setShowUser } = useContext(UserContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setShowUser(0);
        toast("Sign-out successful");
      })
      .catch((error) => {
        // alert("An error happened");
      });
  };
  return (
    <div className="p-6 flex justify-between items-center bg-[#5DCFFF]">
      <Toaster />
      {showSideBar ? (
        <Sidebar showModal={showSideBar} setShowModal={setShowSideBar} />
      ) : (
        ""
      )}
      <div className="flex items-center">
        <div
          onClick={() => {
            setShowSideBar(true);
          }}
          className="w-[57px] md:w-[100px] pr-6 border-r-2 cursor-pointer"
        >
          <img src={nav_icon} />
        </div>
        <div className="w-[100px] md:w-[170px] ml-6">
          <img src={logo} />
        </div>
      </div>
      {showUser === 1 || showUser === 2 ? (
        <Link
          to="/"
          className="cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
