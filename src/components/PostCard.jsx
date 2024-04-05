import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function PostCard({ title = "Title", image, slug, key }) {
  const navigate = useNavigate();
  console.log('Slug: ', slug  )
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

            <div className="mt-auto translate-y-6 text-slate-700 font-light"></div>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={
            () => navigate(`/blogs/${slug}`)
          
          }>
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
