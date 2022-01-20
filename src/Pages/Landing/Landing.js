import React, { useState, useEffect, useContext } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import LandingModal from "./LandingModal";
import GuestHome from "../Guest/GuestHome";
import { UserContext } from "../../shared/contexts/UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Admin from "../Admin/Admin";

function Landing() {
  const { showUser, setShowUser } = useContext(UserContext);
  // No signed in user
  if (showUser === 0) {
    return <NoSignedInUser />;
  }
  // guest signed in
  if (showUser === 1) {
    return <GuestHome />;
  }
  // admin signed in
  if (showUser === 2) {
    return <Admin />;
  }
}

function NoSignedInUser() {
  const [userRegister, setUserRegister] = useState(false);
  const [guestSignIn, setGuestSignIn] = useState(false);
  const [adminSignIn, setAdminSignIn] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 top-[150px]">
      {/* Modal Area */}
      {userRegister ? (
        <Modal
          content={<LandingModal type={"register"} />}
          setShowModal={setUserRegister}
          showModal={userRegister}
          title={"Hello are you ready to get your license? Create account now!"}
        />
      ) : (
        ""
      )}
      {guestSignIn ? (
        <Modal
          content={<LandingModal type={"guest"} />}
          setShowModal={setGuestSignIn}
          showModal={guestSignIn}
          title={"Hello are you ready to get your license? Login now!"}
        />
      ) : (
        ""
      )}
      {adminSignIn ? (
        <Modal
          content={<LandingModal type={"admin"} />}
          setShowModal={setAdminSignIn}
          showModal={adminSignIn}
          title={"Accessible for Staffs and Admin Only."}
        />
      ) : (
        ""
      )}
      {/* Button Area */}
      <div className="md:flex md:justify-center md:items-center md:space-x-2">
        <Button
          size={"small"}
          onClick={() => {
            setGuestSignIn(!guestSignIn);
          }}
          text={"LOGIN as guest"}
          bg={"light"}
        />
        <Button
          size={"small"}
          onClick={() => {
            setAdminSignIn(!adminSignIn);
          }}
          text={"LOGIN as admin"}
          bg={"light"}
        />
      </div>
      <div className="border-t-2 w-full flex justify-center items-center">
        or
      </div>
      <Button
        onClick={() => {
          setUserRegister(!userRegister);
        }}
        text={"REGISTER"}
      />
    </div>
  );
}
export default Landing;
