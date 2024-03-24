import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import apiCall from "../pterodactyl/functions/getAPI";
import postAPI from '../pterodactyl/functions/postAPI';
import { useSelector } from "react-redux";
import { json } from "react-router-dom";

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
  async function  handleLocationClick(locationId, nodes) {

    console.log('Selected Location ID is : ', locationId);
    console.log( 'All nodes ' , nodes);
    const node = nodes.filter(node => node.attributes.location_id === locationId);
    console.log('Nodes under', locationId, ' is : ',  node);
    setNodesOfLocation(node);
    const lInfo = await apiCall.get(`https://panel.how2mc.xyz/api/application/locations/${locationId}`);
    const locationInfo = lInfo[0].data.attributes;
    setLocationDetails( locationInfo);
    setLocationId(locationId);
    
  }
  async function handleNodeDetails(node) {
    setNodeId(node.attributes.id)
    console.log('Selected Node ID is: ' , node.attributes.id)
    const nInfo = await apiCall.get(`https://panel.how2mc.xyz/api/application/nodes/${node.attributes.id}`);
    console.log('Node Info: ', nInfo[0].data.attributes)
    setNodeDetails(nInfo[0].data.attributes)
  }
 
  // Location
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [locationDetails, setLocationDetails] = useState([])


  // Node
  const [nodes, setNodes] = useState([]);
  const [nodeId, setNodeId] = useState(null);
  const [nodeDeatils, setNodeDetails] = useState([]);

  // Nodes of Location
  const[nodesOfLocation, setNodesOfLocation] = useState([]);

  // Nests
  const [nests, setNests] = useState([{attributes: {id: 1}}]);
  const [nestId, setNestId] = useState(null);
  const [nestDetails, setNestDetails] = useState([]);

  // Egg
  const [eggs, setEggs] = useState([]);
  const [eggId, setEggId] = useState(null);
  const [eggDetails, setEggDetails] = useState([]);

  //  Button Check
  const [nestButtonSelect, setNestButtonSelect] = useState(nests[0].attributes.id);
  const [eggButtonSelect, setEggButtonSelect] = useState(null);
  const [locationButtonSelect, setLocationButtonSelect] = useState(null);

  // User Id
  const userId = useSelector((state) => state.user.userId);

  //Location Details
  useEffect(() => {
    console.log('Location Details: ', locationDetails);
  }, [locationDetails]);

  //Node Details
  useEffect(() => {
    console.log('Node Details: ', nodeDeatils);
  }, [nodeDeatils]);

  //resource
  const [serverName, setServerName] = useState('Your Server Name');
  const [cpu, setCpu] = useState(100);
  const [memory, setMemory] = useState(2048);
  const [diskSpace, setDiskSpace] = useState(4096);
  const [additionalPorts, setAdditionalPorts] = useState(1);
  const [backups, setBackups] = useState(1);
  const [databases, setDatabases] = useState(1);

  // handle text change
  const handleDiskSpaceChange = (event) => {
    setDiskSpace(event.target.value);
  };



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

  async function getNests(){
    const [nestResponse, nestError] = await apiCall.get('https://panel.how2mc.xyz/api/application/nests');
    if (nestError) {
      console.error("Error while getting nests", nestError);
      return;
    }
    console.log('Nests: ', nestResponse.data.data)
    setNests(nestResponse.data.data);
  }

  async function getEggs(nestId){
    const [eggResponse, eggError] = await apiCall.get(`https://panel.how2mc.xyz/api/application/nests/${nestId}/eggs`);
    if (eggError) {
      console.error("Error while getting eggs", eggError);
      return;
    }
    console.log(`Eggs of : ${nestId}`, eggResponse.data.data)
    setEggs(eggResponse.data.data);
  }

    async function handleSubmit() {
      console.log('Server Name: ', serverName)
      console.log('CPU: ', cpu)
      console.log('Memory: ', memory)
      console.log('Disk Space: ', diskSpace)
      console.log('Additional Ports: ', additionalPorts)
      console.log('Backups: ', backups)
      console.log('Databases: ', databases)
      console.log('Location ID: ', locationId)
      console.log('Node ID: ', nodeId)
      console.log('Nest ID: ', nestId)
      console.log('Egg ID: ', eggId)

      //Egg details
      const [eggDetails , eggDetailsError] = await apiCall.get(`https://panel.how2mc.xyz/api/application/nests/${nestId}/eggs/${eggId}`);
      console.log('Egg Details: ', eggDetails.data.attributes)
      const eggInfo = eggDetails.data.attributes;
      const docker_image = eggInfo.docker_image;
      const docker_images = eggInfo.docker_images;
      const startup = eggInfo.startup;
      
     const body = {
      name: serverName,
      user: userId,
      egg: eggId,
      docker_image: docker_image,
      startup: startup,
      environment: {
        //BUILD_NUMBER: "latest",
        //"BUNGEE_VERSION": "latest",
        SERVER_JARFILE: "server.jar",
      },
      limits: {
        memory: memory,
        swap: 0,
        disk: diskSpace,
        io: 500,
        cpu: cpu,
      },
      feature_limits: {
        databases: databases,
        backups: backups,
        allocations: 1,
      },
      deploy: {
        locations: [locationId],
        dedicated_ip: false,
        port_range: [],
      },
      allocation: {
        default: 3,
        additional: [],
      },

     }
     if (eggId === 1){
        body.environment.BUNGEE_VERSION = "latest";
     }
     else if (eggId === 3){
        body.environment.PAPER_VERSION = "latest";
        body.environment.BUILD_NUMBER = "latest";
     }
     else if(eggId === 2){
      body.environment.SPONGE_VERSION = "latest";
     }
     else if(eggId === 5){
      body.environment.FORGE_VERSION = "";
      body.environment.MC_VERSION = "latest";
      body.environment.BUILD_TYPE = "recommended";
     }
     else if(eggId === 4){
      
      body.environment.VANILLA_VERSION = "latest";
     }
      console.log('Body: ', body)

      // send the request
      const [response, error] = await postAPI.post('https://panel.how2mc.xyz/api/application/servers', body , 'ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX');
      if (error) {
        console.error('Error while creating server', error.message);
        return;
      }
      console.log('Server created successfully');
      console.log('Response: ', response)

    }
  useEffect(() => {
    console.log(locationId);
  } , [locationId]
  )

  useEffect(() => {
    console.log( 'Nest Id : ', nestId);
  } , [nestId]
  )

  useEffect(() => {
    console.log( 'Egg Id : ', eggId);
  } , [eggId]
  )
  useEffect (() => {
    getLocations()
    getNodes()
    getNests()
    getEggs(nests[0].attributes.id)
  }, [])

  useEffect(() => {
    console.log('Server Name: ', serverName)
    console.log('CPU: ', cpu)
    console.log('Memory: ', memory)
    console.log('Disk Space: ', diskSpace)
    console.log('Additional Ports: ', additionalPorts)
    console.log('Backups: ', backups)
    console.log('Databases: ', databases)

  }, [serverName, cpu, memory, diskSpace, additionalPorts, backups, databases])
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
        onChange={(event) => setServerName(event.target.value)}
        value={serverName}
        htmlFor="Server Name"
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
          value={cpu}
          onChange={(event) => setCpu(event.target.value)}
          htmlFor="CPU"
            id="outlined-basic"
            label="CPU (%)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
          value={memory}
          onChange={(event) => setMemory(event.target.value)}
          htmlFor="Memory"
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Memory / RAM (MB)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
          value={diskSpace}
          onChange={handleDiskSpaceChange}
          htmlFor="Disk Space"
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
          value={additionalPorts}
          onChange={(event) => setAdditionalPorts(event.target.value)}
          htmlFor="Ports"
            id="outlined-basic"
            label="Additional Ports"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
          value={backups}
          onChange={(event) => setBackups(event.target.value)}
          htmlFor="Backups"
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Backups"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
          value={databases}
          onChange={(event) => setDatabases(event.target.value)}
          htmlFor="Databases"
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
              onClick={() => {
                handleLocationClick(location.attributes.id, nodes)
                setNodeId(null)
                setLocationButtonSelect(null)
              }}
              text= {shortname === 'IN' ? 'Premium' : 'Free'}
            />
      ) })}
        </div>
        {nodesOfLocation && nodesOfLocation.map(node => {

          return (
            <div className="ml-2"> 
              <Button
                key={node.attributes.id}
              variant="contained" onClick={() => {
                handleNodeDetails(node)
                setLocationButtonSelect(node.attributes.id)
              }}
              style={node.attributes.id === locationButtonSelect ? {backgroundColor: 'purple'} : {}}
              >
                {node.attributes.name}
              </Button>
            
            </div>
          )
        })}
        <div className="font-bold text-xl mt-2 mb-1">Server software</div>
        <div className="pl-2 ml-2  flex flex-row mt-5">
          {
            nests && nests.map(nest => {
              return (
                <div className="mr-2 ">
                <Button   variant="contained" color="secondary" key={nest.attributes.id} onClick={() => {
                  getEggs(nest.attributes.id)
                  setNestId(nest.attributes.id)
                  setNestButtonSelect(nest.attributes.id)
                  setEggId(null)
                }}
                style={nest.attributes.id === nestButtonSelect ? {backgroundColor: 'blue'} : {}}
                >
                  {nest.attributes.name}
                </Button>
                </div>
              )
            })
          }
        </div>
        <div className="pl-2 ml-2  flex flex-row mt-5">
          {
            eggs && eggs.map(egg => {
              return (
                <div className="mr-2 ">
                <Button   variant="contained" color="info" key={egg.attributes.id} onClick={() => {
                  setEggId(egg.attributes.id)
                  setEggButtonSelect(egg.attributes.id)

                }}
                style={egg.attributes.id === eggButtonSelect ? {backgroundColor: 'red'} : {}}
                >
                  {egg.attributes.name}
                </Button>
                </div>
              )
            })
          }
        </div>
        
        <div className="flex flex-row">
          <div className="mt-4 ml-auto mr-auto ">
            <Button onClick={handleSubmit} className="mt-4 ml-2" variant="contained" color="success">
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
