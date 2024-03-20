import React from "react";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { CiCoins1 } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";

function ReferalCard({ text1, text2, children = <HiOutlineUserGroup /> }) {
  return (
    <div className="translate-y-[80px] shadow-md shadow-neutral-700 ring-1 ring-neutral-400 mt-2 mb-2 mr-4">
      <div className="w-[300px] h-[100px] bg-slate-600 flex flex-row rounded-lg bg-opacity-80 place-content-around">
        <div className="text-3xl text-white  mt-auto mb-auto pl-1 ml-6 mr-1  ">
          {children}
        </div>
        <div className="flex flex-col ml-6 justify-center text-neutral-200 items-center text-[20px]  w-[280px]  ">
          <div className="text-neutral-100 font-light">{text1}</div>
          <div className="font-extrabold">{text2}</div>
        </div>
      </div>
    </div>
  );
}

function RefreadlTransparentCard({
  img = "https://source.unsplash.com/80x80?face",
  username,
  email,
  className = "m-2",
}) {
  return (
    <div
      className={` ${className} cursor-pointer hover:shadow hover:shadow-blue-800 w-[350px] h-[80px] flex flex-row justify-start items-center bg-sky-700 rounded-lg`}
    >
      <div>
        <img src={img} className="rounded-full w-10 h-10 ml-2 mr-2" />
      </div>
      <div className="flex flex-col gap-1 ml-2 text-white">
        <div>{username}</div>
        <div>{email}</div>
      </div>
    </div>
  );
}

function Referrals() {
  return (
    <div className="flex flex-col ml-2 mr-2 bg-[rgb(240,240,240)] h-[750px] rounded-lg mb-auto ">
      <div className="p-4">
        <div>
          <h2 className="font-bold text-3xl">Referrals</h2>
        </div>
        <p className="text-neutral-700 shadow-sm">
          Share your referral link to earn coins every time a user registers
          using your link.
        </p>
        <div className="mt-4">
          <div className="text-black mb-1 font-semibold underline">
            Your referral link. Click to copy and earn coins!.
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-xl font-bold">
              <Link>https://ptero.how2mc.xyz/join/.how2mc</Link>
            </p>

            <FaCopy className="cursor-pointer translate-y-1 pl-1 text-neutral-800 text-[20px]" />
          </div>
          <div className="mt-1.5 ">
            <p className="text-neutral-900">
              Earned coins canbe used to excahnge for premium services and
              resources.
            </p>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col">
              <div className="mt-6 font-extrabold text-3xl">Your referrals</div>
              <div className="h-[480px] w-[1200px] bg-slate-300 mt-4 rounded-lg flex flex-row">
                <div className="flex flex-col">
                  <div className="m-4">
                    <RefreadlTransparentCard
                      username={"Subhamoy Ghosh"}
                      email={"subhamoyghosh2017@gmail.com"}
                    />
                    <RefreadlTransparentCard
                      username={"Subhamoy Ghosh"}
                      email={"subhamoyghosh2017@gmail.com"}
                    />
                    <RefreadlTransparentCard
                      username={"Subhamoy Ghosh"}
                      email={"subhamoyghosh2017@gmail.com"}
                    />
                    <RefreadlTransparentCard
                      username={"Subhamoy Ghosh"}
                      email={"subhamoyghosh2017@gmail.com"}
                    />
                    <RefreadlTransparentCard
                      className={"m-2"}
                      username={"Subhamoy Ghosh"}
                      email={"subhamoyghosh2017@gmail.com"}
                    />
                  </div>
                </div>
                <div className="flex flex-col m-4">
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    className={"m-2"}
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                </div>
                <div className="flex flex-col m-4">
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                  <RefreadlTransparentCard
                    className={"m-2"}
                    username={"Subhamoy Ghosh"}
                    email={"subhamoyghosh2017@gmail.com"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <ReferalCard text1={"Total referrals"} text2={"10"} />
              <ReferalCard
                text1={"Coins per referral"}
                text2={"10"}
                children={<CiCoins1 />}
              />
              <ReferalCard
                text1={"Earned from purchases"}
                text2={"10"}
                children={<CiMoneyBill />}
              />
              <ReferalCard
                text1={"Total"}
                text2={"130"}
                children={<CiWallet />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referrals;
