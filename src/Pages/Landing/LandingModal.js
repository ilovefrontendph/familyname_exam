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

function LandingModal(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { showUser, setShowUser } = useContext(UserContext);

  //   REGISTER
  const registerUser = (data) => {
    // Search if user already exist

    // Authenticate User
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await addDoc(collection(firestore, "Users"), data).then(() => {
          toast("User added successfully");
          setValue("username", "");
          setValue("email", "");
          setValue("password", "");
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            // console.log(`Email address ${data.email} already in use.`);
            toast(`Email address ${data.email} already in use`);
            break;
          case "auth/invalid-email":
            toast(`Email address ${data.email} is invalid.`);

            break;
          case "auth/operation-not-allowed":
            toast("Error during sign up.");
            break;
          case "auth/weak-password":
            toast(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );

            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };

  // SIGNIN
  const signInUser = (data) => {
    // guest signed in
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        if (props.type === "admin") {
          setShowUser(2);
        } else {
          setShowUser(1);
        }

        toast("User signin successfully");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            // console.log(`Email address ${data.email} already in use.`);
            toast(`Email address ${data.email} already in use`);
            break;
          case "auth/invalid-email":
            toast(`Email address ${data.email} is invalid.`);

            break;
          case "auth/operation-not-allowed":
            toast("Error during sign up.");
            break;

          case "auth/weak-password":
            toast(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            break;

          case "auth/user-not-found":
            toast("User Does not Exist!");
            break;
          case "auth/wrong-password":
            toast("Wrong Password!");
            break;
          default:
            console.log(error.code);
            break;
        }
      });
  };

  return (
    <form
      className="p-6  flex flex-col justify-center items-center bg-white   w-full"
      onSubmit={handleSubmit(
        props.type === "register" ? registerUser : signInUser
      )}
    >
      <Toaster />
      <div className="flex py-[50px] flex-col  items-center space-y-4 overflow-y-auto h-[500px] w-full">
        {/* Username */}
        {props.type === "register" ? (
          <div>
            <div className="">Username</div>
            <input
              type="text"
              className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <div className="text-[#D62B55]">Username is required.</div>
            )}
          </div>
        ) : (
          ""
        )}

        {/* Email */}
        <div>
          <div className="">Email</div>
          <input
            type="email"
            className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className="text-[#D62B55]">Email is required.</div>
          )}
        </div>
        {/* Password */}
        <div>
          <div className="">Password</div>
          <input
            type="password"
            className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" && (
            <div className="text-[#D62B55]">Password is required.</div>
          )}
          {errors.password?.type === "minLength" && (
            <div className="text-[#D62B55]">
              Please enter greater or equal than 6 characters.
            </div>
          )}
        </div>
      </div>
      <div className=" border-t-2 w-full flex pb-4 justify-center items-center"></div>
      <Button
        size={"small"}
        text={props.type === "register" ? "REGISTER" : "SIGNIN"}
      />
    </form>
  );
}
export default LandingModal;
