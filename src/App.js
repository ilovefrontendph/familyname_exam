import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Header from "./components/Header";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="/about" element={<About />} />
        {/* <Route path="*" element={() => <p>404</p>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
