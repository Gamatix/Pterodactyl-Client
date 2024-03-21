import { Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Cookie } from "@mui/icons-material";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const [erros, setError] = useState(null);

  const signup = (data) => {
    console.log(data);
    Cookies.set("email", data.email, { expires: 7 });
    Cookies.set("password", data.password, { expires: 7 });
    // navigate("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[rgb(240,240,240)]">
      <div className=" w-[900px] h-[800px] flex m-auto  bg-[rgb(168,152,152)] rounded-lg  hover:shadow-md hover:shadow-red-400 flex-col  ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-1/2 h-1/2  bg-[rgb(240,240,240)] rounded-lg mt-14">
            <img
              src="https://source.unsplash.com/400x200?server"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2 h-1/2  flex flex-col justify-center items-center mt-4">
            <div className="text-4xl font-bold">Sign Up</div>
            <div className="text-lg">Create an account to get started</div>
            <div className="flex flex-col gap-2 mt-4 justify-center items-center">
              <form className="ml-[100px]" onSubmit={handleSubmit(signup)}>
                <input
                  {...register("username", { required: true, unique: true })}
                  type="text"
                  placeholder="Username"
                  className="w-60 h-10 rounded-md border mt-1 border-gray-300 px-2"
                />
                {errors.username && <span>The field must be uniqe</span>}
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  className="w-60 h-10 rounded-md border mt-1 border-gray-300 px-2"
                />
                {errors.email && <span>Enter valid email address.</span>}
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                  type="password"
                  placeholder="Password"
                  className="w-60 h-10 rounded-md border mt-1 border-gray-300 px-2"
                />
                {errors.password && (
                  <div>
                    {" "}
                    <span className="text-red-600">
                      Passwords must be at least 8 characters long
                    </span>{" "}
                    <br />
                  </div>
                )}
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-60 h-10  mt-1 rounded-md border border-gray-300 px-2"
                />
                {errors.confirmPassword && (
                  <div>
                    {" "}
                    <span className="text-red-600">
                      Passwords do not match
                    </span>{" "}
                    <br />
                  </div>
                )}
                <button className="w-60 mt-1 h-10 bg-[rgb(240,240,240)] rounded-md border border-gray-300 cursor-pointer">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="text-sm mt-4 underline">
              Already have an account?
            </div>
            <div className="text-sm text-indigo-100 translate-y-2   cursor-pointer">
              <Link to="/login">&nbsp;Login here</Link>
            </div>
          </div>
        </div>
        {/* Continue with Discord */}
        <div className="flex flex-row justify-center items-center gap-2 mt-8">
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

export default Signup;
