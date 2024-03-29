import { Label } from "@mui/icons-material";
import { Button, Input, TextField } from "@mui/material";
import React, { useEffect , } from "react";
import {useSelector } from "react-redux";
function Contact() {

  const [loading, setLoading] = React.useState(true)
  const email = useSelector((state) => state.user.userData?.email);
  useEffect(
    () => {
      setLoading(false)
    }, []
  )
  return loading ? <div>Loading</div> : 
    <div className=" m-4  h-auto flex flex-col overflow-y-auto bg-neutral-100 rounded-sm pb-4 ">

      <div className="w-[650px]">
      <Label  className="m-2">Email</Label>
        <Input value={email} label="Enter email" placeholder="Enter your email here" className="m-2" fullWidth color="success" />
      </div>
      <div className="w-[850px] mt-4">
      <TextField
      id="outlined-textarea"
      label="Describe your issue here"
      placeholder="I want to tell you about..."
      multiline
      fullWidth
      color="warning"
    />
      </div>
      <div className="mr-2 mt-8 w-[950px] ml-auto">
      <Button className="m-2" variant="contained" color="success">Submit</Button>
      </div>
    </div>
  ;
}

export default Contact;
