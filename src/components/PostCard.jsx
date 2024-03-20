import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function PostCard({
  title = "Title",
  image = "https://source.unsplash.com/200x80?nature",
  description = "Description",
  time = new Date(),
}) {
  const shortDescription = description.substring(0, 100) + "...";
  return (
    <div className="shadow-lg shadow-sky-300 w-[345px] cursor-pointer hover:shadow-gray-600">
      <Card className="mt-4 " sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={image}
        />
        <CardContent>
          <div className="flex flex-col">
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            {/*
        <Typography variant="body2" color="text.secondary">
          {time.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Typography>*/}
            <Typography variant="body2" color="text.secondary">
              {shortDescription}
            </Typography>
            <div className="mt-auto translate-y-6 text-slate-700 font-light">
              <p>
                {time.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
