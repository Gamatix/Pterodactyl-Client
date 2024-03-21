import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../services/user.appwrite";
import { useDispatch } from "react-redux";

export default function Protected({ children }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  const authStatus = useSelector((state) => state.user.status);
  console.log(authStatus);

  useEffect(() => {
    if (!authStatus) {
      console.log("authStatus is false");
      navigate("/login");
    }
    setLoaded(false);
  }, [authStatus]); // Dependencies for useEffect
  return loaded ? <LoadingIndicator /> : children;
}

function LoadingIndicator() {
  // Implement your custom loading indicator component or message
  return <div>Loading...</div>;
}
