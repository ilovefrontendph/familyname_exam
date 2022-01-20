import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import About from "./Pages/About";
import Header from "./components/Header";
import logo from "./logo.svg";
import "./App.css";
import { UserContext } from "./shared/contexts/UserContext";
import Error404 from "./Pages/Error404";
import Application from "./Pages/Guest/Application";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ChangeCredential from "./Pages/Guest/ChangeCredential";
import Admin from "./Pages/Admin/Admin";

function App() {
  const [showUser, setShowUser] = useState(0);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowUser(1);
      }
      if (user.email === "admin@gmail.com") {
        setShowUser(2);
      }
    });
  }, []);
  return (
    <UserContext.Provider
      value={{
        showUser,
        setShowUser,
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/application"
            element={showUser === 1 ? <Application /> : <Error404 />}
          />
          <Route
            exact
            path="/changecredentials"
            element={showUser === 1 ? <ChangeCredential /> : <Error404 />}
          />
          <Route
            exact
            path="/admin"
            element={showUser === 2 ? <Admin /> : <Error404 />}
          />

          {/* <Route path="*" element={() => <p>404</p>} /> */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
