import React from "react";
import Card from "../components/Card";
import { CiCloud } from "react-icons/ci";
import { FaMemory } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";
import { FaFloppyDisk } from "react-icons/fa6";
import { AiOutlineReload } from "react-icons/ai";
import LongCard from "../components/LongCard";

function Home() {
  return (
    <div className="flex flex-col overflow-y-auto bg-neutral-100 rounded-sm pb-4 ">
      <div className="px-2 py-2 ">
        <img src="https://source.unsplash.com/1920x300?nature" />
      </div>
      <div className="mx-2 my-0.5 border border-neutral-600 h-10 bg-neutral-100 rounded-lg px-2 py-1 ">
        <div className="bg-neutral-200 py-0.5">
          Upgrade to premium now! Use code How25 for 25% off premium services.
          Don't miss out!
        </div>
      </div>
      <div className="">
        <div className="flex flex-row gap-2 w-[1600px]  ">
          <Card
            label="Servers"
            current="1"
            max="3"
            children={<CiCloud fontSize="30px" />}
          />
          <Card
            label="Memory"
            current="6144"
            max="6144"
            children={<FaMemory fontSize="30px" />}
            text={"MB"}
          />
          <Card
            label="CPU"
            current="70"
            max="100"
            children={<GoCpu fontSize="30px" />}
            text={"%"}
          />
          <Card
            label="Disk"
            current="14336"
            max="14336"
            children={<FaFloppyDisk fontSize="30px" />}
            text={"MB"}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center font-bold text-xl ml-2 mt-0  ">
        Your Servers
        <AiOutlineReload className="translate-y-0.5 cursor-pointer" />
      </div>
      <div className="ml-2 mt-1 shadow-neutral-200 broder-b border-neutral-200">
        <LongCard
          img="https://source.unsplash.com/300x300?server"
          name="How2MC Tut Server "
          description="All in One"
          price="Free"
          country="USA"
          city="New York"
          cpu="100%"
          ram="6144 MB"
          disk="14336 MB"
          databases="3"
          ports="25565"
          backups="3"
        />
      </div>
    </div>
  );
}

export default Home;
