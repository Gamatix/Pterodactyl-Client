import { Button, TextField } from "@mui/material";
import React , {useEffect, useState} from "react";
import announcementDetails from "../appwrite/announcemet.appwrite";
import { AnnouncementCard } from "../components";

const AllAnnouncements = () => {
  const addAnnouncement = async (e) => {
    const res = await announcementDetails.newAnnouncement(newAnnouncement)
    console.log(res)
    fetchAllAnnouncements()
    setNewAnnouncement('')
  }

  const fetchAllAnnouncements = async() => {
    const res = await announcementDetails.fetchAllAnnouncements()
    setAnnouncement(res.documents)
  
    
  }
  const [newAnnouncement, setNewAnnouncement] = useState(null)
  const [annoucement, setAnnouncement] = useState(null)

  useEffect(()=>{
    fetchAllAnnouncements()
  },[])




  return (
    <div className="m-2 flex  flex-col">
      <div className="w-[800px]">
        <TextField
          placeholder="Enter the new announcement"
          label="Announcement"
          fullWidth
          multiline
          value={newAnnouncement}
          onChange={(e)=> setNewAnnouncement(e.target.value)}
        />
      </div>
      <div className="mt-2 h-2">
        <Button color="success" variant="contained"
          onClick={(e)=>addAnnouncement(e)}
        >
          New Announcement
        </Button>
      </div>
      
      <div className="mt-8">
      {
        annoucement && annoucement.map((announce, index) => (
            <div key={announce.$id} className="mt-4">
            <AnnouncementCard
              
            content={announce.content}
            id={announce.$id}
            count={index}
            fetchAllAnnouncements={fetchAllAnnouncements}
          />
            </div>
        ))
      }
      </div>
    </div>
  );
};

export default AllAnnouncements;
