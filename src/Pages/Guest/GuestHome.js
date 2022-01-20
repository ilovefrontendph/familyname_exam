import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { firestore } from "../../shared/contexts/FirebaseContext";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import Button from "../../components/Button";
import GuestModal from "./GuestModal";
import Modal from "../../components/Modal";

function GuestHome() {
  const [user, setUser] = useState(false);
  const [viewForm, setViewForm] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (res) => {
      if (res) {
        const q = query(collection(firestore, "Users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            if (doc.data().email === res.email) {
              setUser(doc.data());
              // alert(`Hello ${doc.data().username}!`);
            }
          });
        });
        return () => unsubscribe;
      }
      return () => user;
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-5 md:mx-5 py-14">
      <div className="self-start text-[#5DCFFF]  font-bold flex justify-center items-center space-x-5">
        <div className="rounded-full h-[61px] w-[61px] flex flex-col justify-center items-center border-4 border-[#5DCFFF]">
          <div></div>
        </div>
        <div>Home > Update account credentials</div>
      </div>
      {user ? (
        <div className="flex flex-col justify-center items-center">
          {/* Modal Area */}
          {viewForm ? (
            <Modal
              content={<GuestModal />}
              setShowModal={setViewForm}
              showModal={viewForm}
              title={"Application Form"}
            />
          ) : (
            ""
          )}
          <div>Hello {user.username}!</div>
          <div>
            <Button
              onClick={() => {
                setViewForm(!viewForm);
              }}
              text={"View Application Form"}
              bg={"light"}
            />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default GuestHome;
