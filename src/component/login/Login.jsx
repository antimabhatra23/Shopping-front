import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://clothing-backend-two.vercel.app/api/login",
        { email, password }
        
      );

      if (response?.status === 200) {
        console.log({user:response.data.user});
        
        const user = response.data.user;
        if (user?.usertype === "admin") {
          toast.success(response.data.message); // Show success toast
          console.log({ data: response.data });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user);

          navigate("/");
        } else {
            toast.error("You are not autherized to access this"); // Show general error toast
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred"); // Show general error toast
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer /> {/* Add ToastContainer here */}
    </>
  );
};

export default Login;
