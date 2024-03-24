import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {  set, useForm } from "react-hook-form";
import authServices from "../services/user.appwrite";
import { useDispatch } from "react-redux";
import { login as authlogin, setUserId } from "../store/userSlice";
import getUserByEmail from "../pterodactyl/functions/getUserByEmail";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const login = async (data) => {
    const { email, password } = data;
    setError("");
    try {
      const session = await authServices.login({ email, password });
      if (!!session) {
        const user = await authServices.getAccount();
        const pteroUser = await getUserByEmail(email);
        console.log("Ptero User: ", pteroUser[0]);
        console.log('Ptero user id: ',pteroUser[0].attributes.id)
        const id = pteroUser[0].attributes.id;
        if (user && pteroUser) {
          dispatch(setUserId(id)); 
          dispatch(authlogin(user));
          localStorage.setItem("password", password);
          localStorage.setItem("email", email);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[rgb(240,240,240)]">
      <div className=" w-[900px] h-[700px] flex m-auto  bg-[rgb(168,152,152)] rounded-lg  hover:shadow-md hover:shadow-red-400 flex-col  ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-1/2 h-1/2  bg-[rgb(240,240,240)] rounded-lg mt-16">
            <img
              src="https://source.unsplash.com/400x200?server"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2 h-1/2  flex flex-col justify-center items-center mt-4">
            <div className="text-4xl font-bold">Sign In</div>
            <div className="text-lg">Login to existing account</div>
            <div className="flex flex-col gap-2 mt-4">
              <form className="ml-[100px]" onSubmit={handleSubmit(login)}>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  className="w-60 h-10 rounded-md border border-gray-300 px-2 mt-2"
                />
                {errors.email && (
                  <div>
                    <span className="text-red-700">
                      Enter valid email address.
                    </span>
                    <br />
                  </div>
                )}
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                  className="w-60 h-10 rounded-md border border-gray-300 px-2 mt-2"
                />
                {errors.password && (
                  <div>
                    <span className="text-red-700">Password is required.</span>
                    <br />
                  </div>
                )}

                <button className="w-60 h-10 mt-2 bg-[rgb(240,240,240)] rounded-md border border-gray-300 cursor-pointer">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="text-sm mt-4 underline">Don't have an account?</div>
            <div className="text-sm text-indigo-100 translate-y-2   cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 mt-2">
          <Button variant="contained" className="rounded-lg mt-2">
            Continue with Discord
          </Button>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 mt-2">
          <Button color="error" variant="contained" className="rounded-lg mt-2">
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
