import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/Blog/blogCard";

function MyBlog() {
  let [myBlogs, setMyBlogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get(`https://blog-backend-ditf.onrender.com/blog/my-blogs`, {
          headers: {
            "x-acciojob": token,
          },
        })
        .then((res) => {
          setMyBlogs(res.data.data);
        });
    }
  }, [token]);
  return (
    <div>
      <h2 style={{ margin: "30px" }}>My Blogs</h2>
      {myBlogs.map((blog, idx) => (
        <BlogCard key={idx} blogData={blog} />
      ))}
    </div>
  );
}

export default MyBlog;
