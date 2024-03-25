import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../services/user.appwrite";
import { login as authlogin } from "../store/userSlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Protected({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
 

  const authStatus = useSelector((state) => state.user.status);
  async function checkAuth() {
    const email = localStorage?.email;
    console.log("Email login: ", email);
    if (localStorage.password && localStorage.email) {
      const password = localStorage.password;
      console.log("Password login: ", password);
      try {
        const session = await authService.login({
          email,
          password,
        });
        console.log("Login Done");
        const user = await authService.getUser();
        console.log("User: ", user);
        if (session) {
          dispatch(authlogin(user));
          console.log('Status: ', authStatus)
          localStorage.setItem("password", password);
          localStorage.setItem("email", email);
          navigate("/");
        }
      } catch (error) {
        console.error("Error during authentication", error);
      }
    }
    
    
    // Moved the logic from the second useEffect here
    if (!authStatus) {
      console.log("authStatus is false");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      navigate("/login");
    }
    setLoaded(true);
  }
  useEffect(() => {
    

    checkAuth();
  }, []);

  return !loaded ? LoadingIndicator() : children;
}

function LoadingIndicator() {
  // Implement your custom loading indicator component or message
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={1920}
        height={300}
        animation="wave"
      />
    </div>
  );
}
