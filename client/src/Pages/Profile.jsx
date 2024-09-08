import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `/api/user/update/${currentUser.rest._id}`,
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = res.data;
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `/api/user/delete/${currentUser.rest._id}`,
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Include this if your API requires authentication
          },
        }
      );

      const data = res.data;
      if (data === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleShowListing = async () => {
    try {
      const res = await axios.get(`/api/user/listings/${currentUser.rest._id}`);
      const data = res.data;
      if (data.message === false) {
        toast.error("Something went wrong!");
        return;
      }
      setUserListings(data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      const res = await axios.get("/api/auth/signout");
      const data = res.data;
      if (data === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  const handleListingDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/listing/delete/${id}`);
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.rest.avatar}
          alt="profile"
          className="h-24 rounded-full w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Something Went Wrong while uploading image!(image must be less
              than 2mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading image ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded Successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={
            currentUser.rest && currentUser.rest.avatar
              ? currentUser.rest.username
              : ""
          }
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={
            currentUser.rest && currentUser.rest.avatar
              ? currentUser.rest.email
              : ""
          }
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "update"}
        </button>
        <Link
          className="rounded-lg bg-green-700 text-white p-3 uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer hover:opacity-95"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer hover:opacity-95"
        >
          Sign Out
        </span>
      </div>
      <button
        onClick={handleShowListing}
        className="text-green-700 w-full mt-2"
      >
        Show Listings
      </button>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="rounded-lg border p-3 flex justify-between items-center m-3 gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageURLs[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain rounded-lg"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 truncate hover:underline"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button className="text-green-700 uppercase">Edit</button>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
1;
