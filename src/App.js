import React from "react";
import "./App.css";
import CardListing from "./components/CardListing";
import logo from "./data/logo.png";

const App = () => {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <h1>Card Listing App</h1>
      <CardListing />
    </div>
  );
};

export default App;