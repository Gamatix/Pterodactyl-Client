import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import apiCall from "../pterodactyl/functions/getAPI";

function SoftwareCard({ img1, img2, name, game, description, user, text }) {
  return (
    <button className="active:shadow-neutral-600 focus:shadow-neutral-600 hover:shadow hover:shadow-neutral-700 overflow-hidden  ml-2">
      <div className="w-[480px] h-[180px] bg-sky-700 flex flex-col text-white rounded-lg justify-center">
        <div className="font-bold"> {name}</div>
        <div className="font-bold"> {game}</div>
        <div>{description}</div>
        <div>Used by {user} servers.</div>
        {text}
      </div>
    </button>
  );
}

function LocationCard({
  img,
  Country,
  City,
  MaxSlots,
  CurrentSlot,
  Latency,
  onClick,
  text,
  
}) {
  return (
    <Button onClick={onClick}>
      <div className="w-[350px] h-[100px] bg-neutral-500 flex flex-row justify-between p-2 rounded-lg cursor-pointer hover:shadow hover:shadow-neutral-900 items-center mt-2">
        <img src={img} className="h-10 w-[40px]" />
        <div className="flex flex-col">
          <div className="text-xl text-neutral-900 font-bold">
            {Country},{City}
          </div>
          <div className="text-orange-400">
            Servers: {CurrentSlot}/{MaxSlots}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-neutral-900 font-semibold"> {Latency}</div>
          <div className="text-white"> {text}</div>
        </div>
      </div>
    </Button>
  );
}



function CreateServer() {
  function handleLocationClick(locationId, nodes) {

    console.log(locationId);
    console.log(nodes);
    const node = nodes.filter(node => node.attributes.location_id === locationId);
    console.log(node);
    setNodesOfLocation(node);
    
  }
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState(null);

  const [nodes, setNodes] = useState([]);
  const [nodeId, setNodeId] = useState(null);
  
  const[nodesOfLocation, setNodesOfLocation] = useState([]);
  async function getLocations(){
    const [locationResponse, loactionError] = await apiCall.get('https://panel.how2mc.xyz/api/application/locations');
    if (loactionError) {
      console.error("Error while getting locations", loactionError);
      return;
    }
    const locations = locationResponse.data.data;
    console.log("Locations: ", locations);
    setLocations(locations);
  }
  async function getNodes(){
    const [nodeResponse, nodeError] = await apiCall.get('https://panel.how2mc.xyz/api/application/nodes');
    if (nodeError) {
      console.error("Error while getting nodes", nodeError);
      return;
    }
    const nodes = nodeResponse.data.data;
    console.log("Nodes: ", nodes);
    setNodes(nodes);
  
  }
  useEffect(() => {
    console.log(locationId);
  } , [locationId]
  )
  useEffect (() => {
    getLocations()
    getNodes()
  }, [])
  return (
    <div className="ml-2 mt-2 bg-[rgb(240,240,240)] flex flex-col flex-1 pb-4  pl-2 pt-1 ">
      <div>
        <h2 className="font-bold text-3xl">CreateServer</h2>
      </div>
      <div>
        <h3 className="mt-2 font-semibold text-xl">Details</h3>
      </div>
      <div className="mt-4">
        <TextField
          id="outlined-basic"
          label="Server Name"
          variant="outlined"
          color="secondary"
          focused
          className="mt-2 w-[1400px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
        />
      </div>
      <div>
        <h3 className="mt-2 font-semibold text-xl">Resources</h3>
      </div>
      <div className="flex flex-row mt-4">
        <div className="flex flex-col w-[600px] mr-2 ">
          <TextField
            id="outlined-basic"
            label="CPU (%)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Memory / RAM (MB)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Disk Space (MB)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
        </div>
        <div className="flex flex-col w-[600px] mr-2 ">
          <TextField
            id="outlined-basic"
            label="Additional Ports"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Backups"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Databases"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
        </div>
      </div>
      <div>
        <h3 className="mt-6 font-semibold text-xl">Location</h3>
      </div>
      <div>
        <p className="text-neutral-600">
          Select the location according to the lowest latency and available
          slots. The latency is refreshed every 10 seconds.
        </p>
        <div className="flex flex-row">
          {locations && locations.map(location => {
            const [shortname, city] = location.attributes.long.split(" - ");
            return(
            <LocationCard
              key = {location.attributes.id}
              img=  {`https://flagsapi.com/${shortname}/shiny/64.png`} // This is a placeholder, you should replace it with the real image
              Country={location.attributes.short}
              City={city}
              MaxSlots={location.attributes.short}
              CurrentSlot={location.attributes.short}
              Latency={shortname === 'IN' ? 'Low' : 'High'}
              onClick={() => handleLocationClick(location.attributes.id, nodes)}
              text= {shortname === 'IN' ? 'Premium' : 'Free'}
            />
      ) })}
        </div>
        {nodesOfLocation && nodesOfLocation.map(node => {

          return (
            <div className="ml-2"> 
              <Button variant="contained" onClick={() => {
                setNodeId(node.attributes.id)
                console.log(node.attributes.id)
              }}>
                {node.attributes.name}
              </Button>
            
            </div>
          )
        })}
        <div className="font-bold text-xl mt-2 mb-1">Server software</div>

        <div className="pl-2 ml-2  flex flex-row mt-5">
          <SoftwareCard
            name="All in One"
            game="Minecraft"
            description="The best software for hosting Minecraft servers."
            user="100"
            text="Recommended"
          />
          <SoftwareCard
            name="All in One"
            game="Minecraft"
            description="The best software for hosting Minecraft servers."
            user="100"
            text="Recommended"
          />
          <SoftwareCard
            name="All in One"
            game="Minecraft"
            description="The best software for hosting Minecraft servers."
            user="100"
            text="Recommended"
          />
        </div>
        <div className="flex flex-row">
          <div className="mt-2 ml-auto mr-auto ">
            <Button className="mt-4 ml-2" variant="contained" color="success">
              {" "}
              Create server
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateServer;
