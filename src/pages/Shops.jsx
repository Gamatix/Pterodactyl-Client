import { Dvr } from "@mui/icons-material";
import React from "react";
import { GoCpu } from "react-icons/go";
import Divider from "@mui/material/Divider";
function Card({ text, children, coins, resource, param }) {
  return (
    <div>
      <div className=" mt-2 flex flex-row bg-indigo-300 w-[350px] h-[85px] rounded-lg cursor-pointer hover:shadow-md hover:shadow-gray-600">
        <div className="mt-auto mb-auto ml-4 ">{children}</div>
        <div className="flex flex-col mr-auto mt-auto mb-auto ml-4">
          <div className="font-bold text-neutral-100  shadow-gray-300">
            {text}
          </div>
          <div className="flex flex-row m-auto font-bold text-neutral-700 text-lg">
            <div> {coins}💎 </div>
            <div className="text-neutral-500 -translate-y-0.5 text-[16px]">
              &nbsp; for {resource}
              {param}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaleCard({
  img = "https://i.imgur.com/dDgYD1r.png",
  coinAmout = "40000",
  economy = "Coins",
  price = 200,
  oneTime = true,
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.9",
      }}
      className="w-[300px] h-[250px] hover:skew-y-2 bg-opacity-30 bg-sky-300 mt-2 p-2 rounded-lg cursor-pointer hover:shadow hover:shadow-gray-400 hover:border-gray-500  "
    >
      <div className="container relative">
        <div className="content rounded-lg ">
          <div className="flex flex-row  p-2">
            <div className="font-bold text-neutral-100 text-2xl mt-[200px]">
              {coinAmout} {economy}
            </div>
            <div className="text-neutral-200 text-lg mt-[200px]">
              &nbsp;for {price}₹
            </div>
          </div>
        </div>
        <div className="overlay absolute top-0  right-0 bg-gray-800  p-2 rounded-lg border border-neutral-200 shadow-orange-200 text-neutral-200">
          One-time
        </div>
      </div>
    </div>
  );
}

function Shops() {
  return (
    <div className="flex flex-col ml-2 mr-2 bg-[rgb(240,240,240)] flex-1 rounded-lg mb-2 pb-6 ">
      <div>
        <p className="font-bold text-3xl ml-2 mt-2">Shops</p>
      </div>
      <div>
        <p className="text-neutral-700 ml-2 mt-2 font-bold text-xl">
          Coin items
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <Card
            text="Upgrade for CPU"
            coins="100"
            resource="100%"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Upgrade your RAM"
            coins="300"
            resource="1024MB"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Upgrade your Disk"
            coins="100"
            resource="1024MB"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Additional ports"
            coins="20"
            resource="1 port"
            children={<GoCpu fontSize={"40px"} />}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Card
            text="Additional servers"
            coins="250"
            resource="1 server slot"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Additional backups"
            coins="50"
            resource="1 backup slot"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Additional databases"
            coins="25"
            resource="1 database slot"
            children={<GoCpu fontSize={"40px"} />}
          />
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-row justify-center items-center">
            <div>
              {" "}
              <p className="mr-4 font-bold text-neutral-800 text-[30px] hover:random">
                Coins
              </p>
            </div>

            <div className="bg-slate-700 w-full flex-1 h-[2px] mr-8 hover:bg-red-700"></div>
          </div>
          <div className="flex flex-row gap-4">
            <SaleCard price={1500} />
            <SaleCard
              img="https://i.imgur.com/H5SQP2S.png"
              coinAmout="20000"
              economy="Coins"
              price={1250}
            />
            <SaleCard
              img="https://i.imgur.com/R78zZ1o.png"
              coinAmout="10000"
              economy="Coins"
              price={1000}
            />
            <SaleCard
              img="https://i.imgur.com/Hjf3thV.png"
              coinAmout="5000"
              economy="Coins"
              price={750}
            />
          </div>
          <div className="flex flex-row gap-4">
            <SaleCard
              img="https://i.imgur.com/xNEZH5Q.png"
              coinAmout="2000"
              economy="Coins"
              price={500}
            />
            <SaleCard
              img="https://i.imgur.com/xNEZH5Q.png"
              coinAmout="1000"
              economy="Coins"
              price={200}
            />
          </div>
        </div>
        <div className="flex mt-6 flex-row justify-center items-center">
          <div>
            {" "}
            <p className="mr-4 font-bold text-neutral-800 text-[30px] hover:random">
              Exclusive
            </p>
          </div>

          <div className="bg-slate-700 w-full flex-1 h-[2px] mr-8 hover:bg-red-700"></div>
        </div>
        <div className="flex flex-row gap-4">
          <SaleCard price={1500} />
          <SaleCard
            img="https://i.imgur.com/H5SQP2S.png"
            coinAmout="20000"
            economy="Coins"
            price={1250}
          />
        </div>
        <div className="flex flex-row gap-4"></div>
      </div>
    </div>
  );
}

export default Shops;
