import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";

import "./assets/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Header />
    </div>
  );
}

export default App;
