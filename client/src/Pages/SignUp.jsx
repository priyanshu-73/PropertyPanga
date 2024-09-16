import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Axios automatically parses the response, so you can access the data directly
      const data = res.data;
      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setError(null);
      navigate("/sign-in");
      setFormData({ username: "", email: "", password: "" });
      toast.success("Signed Up Successfully");
    } catch (error) {
      console.error("Error during signup:", error);
      setIsLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          value={formData.username}
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          value={formData.email}
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          value={formData.password}
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 hover:opacity-80">Sign-in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
