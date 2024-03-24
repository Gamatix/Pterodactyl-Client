import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { CiCloud } from "react-icons/ci";
import { FaMemory } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";
import { FaFloppyDisk } from "react-icons/fa6";
import { AiOutlineReload } from "react-icons/ai";
import LongCard from "../components/LongCard";
import { Skeleton } from "@mui/material";
import getUsersServer from "../pterodactyl/functions/getUsersServer.js";
import { useSelector } from "react-redux";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState([]);
  const email = useSelector((state) => state.user.userData?.email); 
  const userId = useSelector((state) => state.user.userId);
  useEffect(() => {
    (async () => {
      console.log("This email: ", email);
      const response = await getUsersServer(email);
      console.log("This res1: ", response);
      setRes(response);
      console.log('The user id: ', userId)
    })();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [email]); // Added email as a dependency

  let totalMemory = 0;
  let totalCPU = 0;
  let totalDisk = 0;

  if (res[0]) {
    console.log("This res2: ", res[0]);
    console.log("This number of server: ", res.length);

    totalMemory = res[0].reduce(
      (sum, server) => sum + server.attributes.limits.memory,
      0
    );
    console.log("Total Memory: ", totalMemory);
    totalCPU = res[0].reduce(
      (sum, server) => sum + server.attributes.limits.cpu,
      0
    );
    console.log("Total CPU: ", totalCPU);
    totalDisk = res[0].reduce(
      (sum, server) => sum + server.attributes.limits.disk,
      0
    );
    console.log("Total Disk: ", totalDisk);
  }

  return (
    <div className="flex flex-col overflow-y-auto bg-neutral-100 rounded-sm pb-4 ">
      <div className="px-2 py-2 ">
        {!isLoading ? (
          <img
            src="https://source.unsplash.com/1920x300?nature"
            loading="lazy"
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={1920}
            height={300}
            animation="wave"
          />
        )}
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
            current={res[0] ? res[0].length: 0}
            max="3"
            children={<CiCloud fontSize="30px" />}
          />
          <Card
            label="Memory"
            current={totalMemory}
            max="6144"
            children={<FaMemory fontSize="30px" />}
            text={"MB"}
          />
          <Card
            label="CPU"
            current={totalCPU}
            max="100"
            children={<GoCpu fontSize="30px" />}
            text={"%"}
          />
          <Card
            label="Disk"
            current={totalDisk}
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
      <div className="ml-2 mt-1 shadow-neutral-200 broder-b border-neutral-200 flex flex-row gap-2">
        {
        res[0] && res[0].length >= 1 ?  
          res[0].map(server => (
            <LongCard
          className = "shadow-sm sgadow-neutral-200"
          img="https://source.unsplash.com/300x300?server"
          name={server.attributes.name}
          key={server.attributes.id}
          description="All in One"
          price="Free"
          country="USA"
          city="New York"
          cpu={server.attributes.limits.cpu}
          ram={server.attributes.limits.memory}
          disk={server.attributes.limits.disk}
          databases={server.attributes.feature_limits.databases}
          ports={server.attributes.feature_limits.allocations}
          backups={server.attributes.feature_limits.backups}
        />
          
          ))
         : null
        }
      </div>
    </div>
  );
}

export default Home;