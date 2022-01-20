import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { firestore } from "../../shared/contexts/FirebaseContext";
import Button from "../../components/Button";

function ChangeCredential() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (res) => {
      if (res) {
        const q = query(collection(firestore, "Users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            if (doc.data().email === res.email) {
              setUser({ id: doc.id, ...doc.data() });
            }
          });
        });
        return () => unsubscribe;
      }
      return () => user;
    });
  }, []);

  const handleChange = (text) => (e) => {
    setUser({ ...user, [text]: e.target.value });
  };
  const onSubmit = async (data) => {
    // Find User
    let userDoc = doc(firestore, "Users", user.id);

    // Update User
    const auth = getAuth();
    updateEmail(auth.currentUser, data.email)
      .then(() => {
        toast("Email updated successfully");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    let newFields = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    // Update User
    await updateDoc(userDoc, newFields).then(() => {
      toast("User updated successfully");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full transform scale-75 md:scale-100 space-y-5 md:mx-5 py-14">
      <div className="text-[20px]">What do you want to change?</div>
      <div className="self-start text-[#5DCFFF]  font-bold flex justify-center items-center space-x-5">
        <div className="rounded-full h-[61px] w-[61px] flex flex-col justify-center items-center border-4 border-[#5DCFFF]">
          <div></div>
        </div>
        <div>Home > Update account credentials</div>
      </div>
      <form
        className="p-6  flex flex-col justify-center items-center bg-white   w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Toaster />
        <div className="flex py-[50px] flex-col  items-center space-y-4 overflow-y-auto h-[500px] w-full">
          {/* Username */}

          <div>
            <div className="">Username</div>
            <input
              type="text"
              className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
              {...register("username", { required: true })}
              value={user.username}
              onChange={handleChange("username")}
            />
            {errors.username && (
              <div className="text-[#D62B55]">Username is required.</div>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="">Email</div>
            <input
              type="email"
              className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
              {...register("email", { required: true })}
              value={user.email}
              onChange={handleChange("email")}
            />
            {errors.email && (
              <div className="text-[#D62B55]">Email is required.</div>
            )}
          </div>
          {/* Password */}
          <div>
            <div className="">Password</div>
            <input
              type="text"
              className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
              {...register("password", { required: true, minLength: 6 })}
              value={user.password}
              onChange={handleChange("password")}
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
        <Button size={"small"} text={"UPDATE"} />
      </form>
    </div>
  );
}

export default ChangeCredential;
