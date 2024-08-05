import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Navbar from "./component/Navbar";
import AddProductForm from "./component/products/AddProductForm";
import Product from "./component/products/Product";
import Order from "./component/order/Order";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/" element={<Product />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/add-product" element={<AddProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;
