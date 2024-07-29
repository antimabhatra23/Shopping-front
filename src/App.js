import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./component/signup/Signup";
import Login from "./component/login/Login";
import Navbar from "./component/Navbar";
import AddProductForm from "./component/products/AddProductForm";
import Product from "./component/products/Product";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Product />} />
        <Route path="/add-product" element={<AddProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;
