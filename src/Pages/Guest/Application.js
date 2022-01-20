import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import Button from "./../../components/Button";

function Application() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(false);
  const [application, setApplication] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (res) => {
      if (res) {
        const q = query(collection(firestore, "Users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            if (doc.data().email === res.email) {
              setUser({ id: doc.id, ...doc.data() });
              if (doc.data().application) {
                setApplication(true);
              }
              // alert(`Hello ${doc.data().username}!`);
            }
          });
        });
        return () => unsubscribe;
      }
      return () => user;
    });
  }, []);

  const onSubmit = async (data) => {
    // Find User
    let userDoc = doc(firestore, "Users", user.id);

    // Insert the Application
    let newFields = {
      status: "not yet",
      application: true,
      civilstatus: data.civilstatus,
      familyname: data.familyname,
      firstname: data.firstname,
      middlename: data.middlename,
      presentaddress: data.presentaddress,
      typeofapplication: data.typeofapplication,
    };

    // Update User
    await updateDoc(userDoc, newFields).then(() => {
      toast("Application added successfully");
    });
  };

  if (application) {
    return (
      <div className="flex flex-col justify-center items-center h-screen transform scale-75 md:scale-100">
        Wait for Approval
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-full transform scale-75 md:scale-100 space-y-5 md:mx-5 py-14">
        <div className="text-[20px]">
          APPLICATION FOR STUDENT DRIVER’S PERMIS/ DRIVER’S LICENSE/ CONDUCTOR’S
          LICENSE (APL)
        </div>
        <div className="self-start text-[#5DCFFF]  font-bold flex justify-center items-center space-x-5">
          <div className="rounded-full h-[61px] w-[61px] flex flex-col justify-center items-center border-4 border-[#5DCFFF]">
            <div>1</div>
          </div>
          <div>FILL OUT THE FORM</div>
        </div>
        <form
          className="w-full flex flex-col justify-center items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" p-6  flex justify-center items-center bg-white   ">
            <Toaster />
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4  items-center space-y-5  overflow-y-auto">
              {/* TYPE OF APPLICATION (TOA) */}
              <div className="md:col-span-2 w-[215px] md:w-full">
                <div>TYPE OF APPLICATION</div>
                <div className="flex space-x-2 flex-wrap">
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="NEW"
                  >
                    <input
                      {...register("typeofapplication", { required: true })}
                      type="radio"
                      name="typeofapplication"
                      value="NEW"
                      id="NEW"
                    />
                    <div>NEW</div>
                  </label>
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="RENEWAL"
                  >
                    <input
                      {...register("typeofapplication", { required: true })}
                      type="radio"
                      name="typeofapplication"
                      value="RENEWAL"
                      id="RENEWAL"
                    />
                    <div>RENEWAL</div>
                  </label>
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="DUPLICATE"
                  >
                    <input
                      {...register("typeofapplication", { required: true })}
                      type="radio"
                      name="typeofapplication"
                      value="DUPLICATE"
                      id="DUPLICATE"
                    />
                    <div>DUPLICATE</div>
                  </label>
                </div>
                {errors.typeofapplication?.type === "required" && (
                  <div className="text-[#D62B55]">
                    TYPE OF APPLICATION is required.
                  </div>
                )}
                <div className=" border-t-2 w-full flex pb-4 mt-[5px] justify-center items-center"></div>
              </div>
              {/* FAMILY NAME */}
              <div>
                <div className="">FAMILY NAME</div>
                <input
                  type="text"
                  className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
                  {...register("familyname", { required: true })}
                />
                {errors.familyname && (
                  <div className="text-[#D62B55]">FAMILY NAME is required.</div>
                )}
              </div>
              {/* FIRST NAME */}
              <div>
                <div className="">FIRST NAME</div>
                <input
                  type="text"
                  className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <div className="text-[#D62B55]">FIRST NAME is required.</div>
                )}
              </div>
              {/* MIDDLE NAME */}
              <div>
                <div className="">MIDDLE NAME</div>
                <input
                  type="text"
                  className="px-[10px] border-2 w-[215px] md:w-[315px] h-[45px] rounded-[9px]"
                  {...register("middlename", { required: true })}
                />
                {errors.middlename && (
                  <div className="text-[#D62B55]">MIDDLE NAME is required.</div>
                )}
              </div>
              {/* PRESENT ADDRESS */}
              <div className="md:col-span-2">
                <div className="">PRESENT ADDRESS</div>
                <textarea
                  className="md:px-[10px] border-2 w-[215px] md:w-full  rounded-[9px] h-[156px]"
                  {...register("presentaddress", { required: true })}
                />
                {errors.presentaddress && (
                  <div className="text-[#D62B55]">
                    PRESENT ADDRESS is required.
                  </div>
                )}
              </div>
              {/* CIVIL STATUS */}
              <div className="md:col-span-2 w-[215px] md:w-full">
                <div>CIVIL STATUS</div>

                <div className="flex space-x-2 flex-wrap">
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="SINGLE"
                  >
                    <input
                      {...register("civilstatus", { required: true })}
                      type="radio"
                      name="civilstatus"
                      value="SINGLE"
                      id="SINGLE"
                    />
                    <div>SINGLE</div>
                  </label>
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="MARRIED"
                  >
                    <input
                      {...register("civilstatus", { required: true })}
                      type="radio"
                      name="civilstatus"
                      value="MARRIED"
                      id="MARRIED"
                    />
                    <div>MARRIED</div>
                  </label>
                  <label
                    className="space-x-2 flex justify-center items-center"
                    htmlFor="WIDOWED"
                  >
                    <input
                      {...register("civilstatus", { required: true })}
                      type="radio"
                      name="civilstatus"
                      value="WIDOWED"
                      id="WIDOWED"
                    />
                    <div>WIDOWED</div>
                  </label>
                </div>
                {errors.civilstatus?.type === "required" && (
                  <div className="text-[#D62B55]">
                    CIVIL STATUS is required.
                  </div>
                )}
                <div className=" border-t-2 w-full flex pb-4 mt-[5px] justify-center items-center"></div>
              </div>
            </div>
          </div>
          <div className=" border-t-2 w-full flex pb-4 mt-[100px] justify-center items-center"></div>
          <Button size={"small"} text={"SUBMIT"} />
        </form>
      </div>
    );
  }
}

export default Application;
