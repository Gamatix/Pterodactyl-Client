import { Button } from "@mui/material";
import React from "react";
import { WiDirectionUpRight } from "react-icons/wi";
import { useSelector } from "react-redux";
function Panel() {
  const email = useSelector((state) => state.user.userData.email);
  console.log(email);
  return (
    <div className="flex flex-col ml-2 mr-2 bg-[rgb(240,240,240)] h-[750px] p-2 rounded-lg">
      <div className="">
        <div>
          <h1 className="text-3xl font-bold">Game panel credentials</h1>
        </div>
        <div>
          <p className="mt-2 font-semibold text-neutral-700 text-lg">
            Here are your game panel credentials. You can use them to access
            your game panel.
          </p>
        </div>
        <div className="flex flex-col mt-4 justify-center items-center">
          <div className="w-[300px] ml-auto mr-auto">
            <img src="https://i.imgur.com/m9zVHCj.png" />
          </div>
          <div className="w-[400px] bg-slate-600 p-3 rounded-lg text-white  shadow-lg shadow-gray-700">
            <div className="flex flex-row gap-4 ">
              <p className="font-bold">Email: </p>
              <p className="text-neutral-200">{email}</p>
            </div>
          </div>
          <div className="mt-4 text-neutral-600 text-bolder">
            <p>
              For your password, if you forgot it or never generated it, you can
              reset it by clicking the button below.
            </p>
          </div>
          <div className="flex flex-row gap-3 mt-2 cursor-pointer">
            <div>
              <Button variant="contained">↗ &nbsp;Open game panel.</Button>
            </div>
            <div>
              <Button variant="contained" color="error">
                🗒 &nbsp;Reset password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panel;
