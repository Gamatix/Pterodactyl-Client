import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Vortex } from "react-loader-spinner";
import blogService from "../services/blog.appwrite";
import blogImage from "../services/blogImage.appwrite";
function Blogs() {
  const [loadng, setLoading] = React.useState(true);
  const [posts, setPosts] = useState(null)
  const fetchDetails = async () => {
    const res = await blogService.getActiveBlogs();
    if(res) {
      setPosts(res.documents)
      console.log('Posts:' , res)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDetails()
  }
  , []);
  return (
    loadng ? (<div className="h-screen flex flex-row justify-center items-center"><Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      /></div>) :
    <div className="flex flex-col ml-2 mr-2 bg-[rgb(240,240,240)] h-[750px] p-2 rounded-lg">
      <div className="font-bold text-3xl">
        <h1>Blogs</h1>
      </div>
      <div className="mt-2 mr-2 flex flex-wrap gap-4">
        {
          posts && posts.map((post , index) => (
            <PostCard
              key={post.$id || index} 
              title={post.title}
              description={post.content}
              image={blogImage.getFilePreview(post.featuredImage)}
              slug={post.$id}
            />
          ))
        }
        
      </div>
    </div>
    
  );
}

export default Blogs;
