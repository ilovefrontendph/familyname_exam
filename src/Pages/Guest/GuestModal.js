import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { firestore } from "../../shared/contexts/FirebaseContext";
import { UserContext } from "../../shared/contexts/UserContext";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import APLForm from "../../assets/APL-Form.pdf";
import { Link } from "react-router-dom";

function GuestModal(props) {
  const { showUser, setShowUser } = useContext(UserContext);

  return (
    <div className="p-6  flex flex-col justify-center items-center bg-white   w-full">
      <Toaster />
      <div className="flex py-[50px] flex-col  items-center space-y-4 overflow-y-auto h-[500px] w-full">
        <iframe className="w-full" src={APLForm} height="800"></iframe>
      </div>
      <div className=" border-t-2 w-full flex pb-4 justify-center items-center"></div>
      <Link to="/application">
        <Button text={"Submit an Application"} />
      </Link>
    </div>
  );
}
export default GuestModal;
