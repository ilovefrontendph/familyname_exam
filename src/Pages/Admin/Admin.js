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
import fake_logo from "./../../assets/fake_logo.png";

function Admin() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState(false);
  const [usersCopy, setUsersCopy] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState(false);

  //   READ
  useEffect(() => {
    // Fetch / Reading data from the database
    const q = query(collection(firestore, "Users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
      setIsLoaded(true);
    });

    return () => unsubscribe;
  }, []);

  //   Search User
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full transform scale-75 md:scale-100 space-y-5 md:mx-5 py-14">
      {/* SEARCH NAV */}
      <div className="text-[20px]">LIST OF SUBMITTED APPLICATIONS</div>
      <div className="  w-full md:w-2/4 font-bold flex flex-col justify-center items-center space-x-5">
        <input
          type="text"
          className="px-[10px] border-2 w-[215px] md:w-full h-[45px] rounded-[9px]"
          {...register("familyname", { required: true })}
          placeholder="SEARCH USER BY FIRST NAME"
          onChange={handleSearch}
          value={searchTerm}
        />
        {/* TYPE OF APPLICATION (TOA) */}
        <div className="md:col-span-2 w-[215px] md:w-full">
          <div>FILTER BY TYPE OF APPLICATION</div>
          <div className="flex space-x-2 flex-wrap">
            <label
              className="space-x-2 flex justify-center items-center"
              htmlFor="NEW"
            >
              <input
                type="checkbox"
                name="typeofapplication"
                value="NEW"
                id="NEW"
                onClick={(e) => {
                  setFilterTerm(true);
                  setSearchTerm(e.target.value);
                }}
              />
              <div>NEW</div>
            </label>
            <label
              className="space-x-2 flex justify-center items-center"
              htmlFor="RENEWAL"
            >
              <input
                type="checkbox"
                name="typeofapplication"
                value="RENEWAL"
                id="RENEWAL"
                onClick={(e) => {
                  setFilterTerm(true);
                  setSearchTerm(e.target.value);
                }}
              />
              <div>RENEWAL</div>
            </label>
            <label
              className="space-x-2 flex justify-center items-center"
              htmlFor="DUPLICATE"
            >
              <input
                type="checkbox"
                name="typeofapplication"
                value="DUPLICATE"
                id="DUPLICATE"
                onChange={(e) => {
                  setFilterTerm(true);
                  setSearchTerm(e.target.value);
                }}
              />
              <div>DUPLICATE</div>
            </label>
          </div>
          <div
            onClick={() => {
              setSearchTerm("");
              setFilterTerm(false);
            }}
            className="mx-auto text-center hover:opacity-80 bg-[#5dcfff] cursor-pointer w-full rounded-lg p-1 text-white hover:shadow-lg"
          >
            CLEAR
          </div>

          <div className=" border-t-2 w-full flex pb-4 mt-[5px] justify-center items-center"></div>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 w-full">
          <div className="flex flex-col justify-center w-full h-full m-0 ">
            <div className="w-full h-full my-auto max-w-[1400px] mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    {/* Header */}
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">TYPE</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            DETAILS
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            STATUS
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Body */}
                    <tbody className="text-sm divide-y divide-gray-100">
                      {isLoaded ? (
                        users
                          .filter((val) => {
                            if (searchTerm === "") {
                              return val;
                            }
                            if (filterTerm) {
                              if (
                                val.typeofapplication.toLowerCase() ===
                                searchTerm.toLowerCase()
                              ) {
                                return val;
                              }
                            } else {
                              if (
                                val.firstname
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return val;
                              }
                            }
                          })
                          .map((user, y) => {
                            return (
                              <tr>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                      <img
                                        className="rounded-full"
                                        src={fake_logo}
                                        width="40"
                                        height="40"
                                        alt="Alex Shatov"
                                      />
                                    </div>
                                    <div className="font-medium text-gray-800">
                                      {user.familyname}, {user.firstname},{" "}
                                      {user.middlename}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{user.email}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  {user.typeofapplication}
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="mx-auto text-center hover:opacity-80 bg-[#5dcfff] cursor-pointer w-[50px] rounded-lg p-1 text-white hover:shadow-lg">
                                    show
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap uppercase">
                                  {user.status}
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr>Loading ... </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
