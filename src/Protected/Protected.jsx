import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../services/user.appwrite";
import { login as authlogin, logout as authLogout, setUserId } from "../store/userSlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {Bars, RotatingTriangles} from 'react-loader-spinner'
import getUserByEmail from "../pterodactyl/functions/getUserByEmail";

export default function Protected({ children , authentication = true}) {
  const navigate = useNavigate();
  const location = useLocation();
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
          const loggedInUser = await getUserByEmail(email);
          console.log("Ptero User: ", loggedInUser[0]);
          console.log("Ptero user id: ", loggedInUser[0].attributes.id);
          const id = loggedInUser[0].attributes.id;
          if(!id || !user) {
            console.log("User not found in ptero")
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            dispatch(setUserId(null));
            dispatch(authLogout());
            navigate("/login");
          }
          dispatch(setUserId(id))
          dispatch(authlogin(user));
          console.log('Status: ', authStatus)
          localStorage.setItem("password", password);
          localStorage.setItem("email", email);
          const redirectPath = location.state?.from || '/';
          navigate(redirectPath);
        }
      } catch (error) {
        console.error("Error during authentication", error);
      }
    }
  }

  useEffect(() => {
    (async () => {
      await checkAuth();
      setLoaded(true);
    })()
  }, []);

  return !loaded ? <div className="flex flex-row h-screen justify-center items-center"><RotatingTriangles
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="rotating-triangles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>: children;
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