import React, { useState, useEffect } from "react";
import { firestore } from "../shared/contexts/FirebaseContext";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";

function Landing() {
  const [users, setUsers] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");

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
      setVisible(true);
    });

    return () => unsubscribe;
  }, []);
  console.log(users);

  //   CREATE
  const addUser = async () => {
    let data = { count: users.length + 1, name: name };

    if (name !== "") {
      await addDoc(collection(firestore, "Users"), data).then(() => {
        alert("User added successfully");
        return setName("");
      });
    } else {
      alert("Field is empty!");
    }
  };

  //   UPDATE
  const updateUser = async (id) => {
    let userDoc = doc(firestore, "Users", id);
    let newFields = { name: newName };

    if (newName !== "") {
      await updateDoc(userDoc, newFields).then(() => {
        alert("User updated successfully");
        return setNewName("");
      });
    } else {
      alert("Field is empty!");
    }
  };

  //   DELETE
  const deleteUser = async (id) => {
    let userDoc = doc(firestore, "Users", id);

    await deleteDoc(userDoc).then(() => {
      alert("User deleted successfully");
    });
  };

  console.log(users);

  return (
    <div className="bg-white h-[1000px] pt-[200px]">
      <main className="py-16 container mx-auto px-6 md:px-0 ">
        <section className="flex flex-col justify-center align-middle">
          <div className="grid grid-cols-3 gap-4 mt-10">
            {visible
              ? users.map((item, i) => {
                  return (
                    <div className="bg-[#FDC122] p-[20px] rounded-2xl">
                      <h3 className="text-lg font-semibold text-gray-500 mt-2 ">
                        {item.count}. {item.name}
                      </h3>
                      <p className="text text-gray-400 space-x-6">
                        <input
                          key={i}
                          // value={newName}
                          type="text"
                          placeholder="New Name"
                          onChange={(e) => setNewName(e.target.value)}
                          className="py-[6px] px-[2px] rounded-lg text-black"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateUser(item.id);
                          }}
                          className="bg-[#5DCFFF] p-[6px] rounded-lg text-white"
                        >
                          Change Name
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteUser(item.id);
                          }}
                          className="bg-[#5DCFFF] p-[6px] rounded-lg text-white"
                        >
                          Delete User
                        </button>
                      </p>
                    </div>
                  );
                })
              : "Loading"}
          </div>
          <div className="bg-[#FDC122] p-[20px] self-center mt-[40px] flex justify-between w-[400px] pt-[40px]">
            <input
              value={name}
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="p-[6px] rounded-lg text-black"
            />
            <button
              type="button"
              className="bg-[#5DCFFF] p-[6px] rounded-lg text-white"
              onClick={addUser}
            >
              Submit
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
