import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { CiCloud } from "react-icons/ci";
import { FaMemory } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";
import { FaFloppyDisk } from "react-icons/fa6";
import { AiOutlineReload } from "react-icons/ai";
import LongCard from "../components/LongCard";

import getUsersServer from "../pterodactyl/functions/getUsersServer.js";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import deleteAPI from "../pterodactyl/functions/deleteAPI.js";
function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState([]);
  const email = useSelector((state) => state.user.userData?.email);
  const userId = useSelector((state) => state.user.userId);
  useEffect(() => {
    (async () => {
      console.log("loading", isLoading);
      console.log("This email: ", email);
      const response = await getUsersServer(email);
      console.log("This res1: ", response);
      setRes(response);
      console.log("The user id: ", userId);
      setIsLoading(false);
      console.log("loading", isLoading);
    })();
  }, [email, isLoading]); // Added email as a dependency

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
  const [key, setKey] = useState(Math.random());
  useEffect(() => {
    console.log("Server rerendered," , key);
  }, [key]);

  async function handleServerOpen(id){
    const serverId = id;
    const openedServer = res[0].find(server => server.attributes.id === serverId);
    console.log("Opened server: ", openedServer.attributes.identifier)
    window.open(`https://panel.how2mc.xyz/server/${openedServer.attributes.identifier}`, "_blank")
  }

  async function handleDeleteServer(id){
    
     console.log("Delete server with id: ", id)
    
    const [deleteResponse, deleteError]  = await deleteAPI.delete(`https://panel.how2mc.xyz/api/application/servers/${id}`)
    if(deleteError){
      console.error("Error deleting server: ", deleteError)
    }
    console.log("Server deleted: ", deleteResponse)
    setKey( Math.random());
     console.log("Server rerendered," , key);
     const response = await getUsersServer(email);
      console.log("This res1: ", response);
      setRes(response);
     
  }
   // Added handleDeleteServer function
   
  
  //  const handleDeleteServer = () => {
  //    setKey(prevKey => Math.random());
  //    console.log("Server rerendered," , key);
  //    this.setState({key: Math.random()})
  //  }
  return (
    <div key={key} className="flex flex-col overflow-y-auto bg-neutral-100 rounded-sm pb-4 ">
      <div className="px-2 py-2 ">
        {(
          <img
            src="https://images.unsplash.com/photo-1580137189272-c9379f8864fd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTcxMTM2OTA1Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920"
            width={1920}
            height={180}
          />
        ) || <Skeleton height={180} width={1920} />}
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
            current={res[0] ? res[0].length : 0}
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
            max="120"
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
        {isLoading ? (
          <div>
            <SkeletonTheme
              baseColor="#ccc"
              highlightColor="#444"
              height={400}
              width={350}
            >
              <div>
                <p>
                  <Skeleton
                    baseColor="#ccc"
                    highlightColor="#444"
                    className="mr-2"
                    height={150}
                  />
                  <Skeleton
                    baseColor="#ccc"
                    highlightColor="#444"
                    className="mr-2"
                    height={60}
                  />
                  <Skeleton
                    baseColor="#ccc"
                    highlightColor="#444"
                    className="mr-2"
                    height={60}
                  />
                  <Skeleton
                    baseColor="#ccc"
                    highlightColor="#444"
                    className="mr-2"
                    height={40}
                  />
                </p>
              </div>
            </SkeletonTheme>
          </div>
        ) : res[0] && res[0].length >= 1 ? (
          res[0].map((server) => (
            <LongCard
              className="shadow-sm sgadow-neutral-200"
              img="https://i0.wp.com/news.onepercentclub.io/wp-content/uploads/2024/03/lars-kienle-IlxX7xnbRF8-unsplash.jpg?resize=1024%2C575&ssl=1"
              name={server.attributes.name}
              key={server.attributes.id}
              id={server.attributes.id}
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
              onClick={() => console.log(server.attributes.id)}
              onDelete={handleDeleteServer}
              onOpen={handleServerOpen}
            />
          ))
        ) : (
          <Skeleton
            baseColor="#ccc"
            highlightColor="#444"
            height={260}
            width={350}
          />
        )}
      </div>
      
    </div>
  );
}

export default Home;
