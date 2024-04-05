import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blog.appwrite";
import parse from 'html-react-parser'
import blogImage from "../services/blogImage.appwrite";
const Blog = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  const fetchBlog = async () => {
    const res = await blogService.getPost(slug);
    console.log("blog Details:", res);
    setPost(res);
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return post ? (
    <div className="m-3">
      <div className="font-bold text-black text-3xl underline">
        {post.title.toUpperCase()} &nbsp;
      </div>
      <div className="w-[600px] ml-auto mr-auto">
        <img
            src={blogImage.getFilePreview(post.featuredImage)}
        />
      </div>
      <div className="mt-2 bg-neutral-400 text-xl">
        {parse(post.content)}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Blog;
