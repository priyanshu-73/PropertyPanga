import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      const data = res.data;
      navigate("/");
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("Cannot login with google", error);
    }
  };
  return (
    <button
      className="bg-red-700 p-3 text-white rounded-lg"
      onClick={handleGoogleClick}
      type="button"
    >
      Continue With Google
    </button>
  );
};

export default OAuth;
