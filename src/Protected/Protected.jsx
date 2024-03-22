import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../services/user.appwrite";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../store/userSlice";

export default function Protected({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  const authStatus = useSelector((state) => state.user.status);
  const checkUserDetails = useSelector((state) => state.user);
  console.log(authStatus);

  useEffect(() => {
    async function checkAuth() {
      const email = localStorage?.email;
      console.log(email);
      if (localStorage.password && localStorage.email) {
        const password = localStorage.password;
        const session = authService.login({
          email,
          password,
        });
        const user = await authService.getUser();
        if (session) {
          dispatch(authlogin(user));
          navigate("/");
          localStorage.setItem("password", password);
        }
      }
    }

    checkAuth();
    if (!authStatus) {
      console.log("authStatus is false");
      //localStorage.removeItem("email");
      //localStorage.removeItem("password");
      navigate("/login");
    }
    setLoaded(false);
  }, [authStatus]); // Dependencies for useEffect
  return loaded ? <div>Loading...</div> : children;
}

function LoadingIndicator() {
  // Implement your custom loading indicator component or message
  return <div>Loading...</div>;
}
