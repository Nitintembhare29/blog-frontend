import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/Blog/blogCard";

function HomePage() {
  let [homeBlogs, setHomeBlogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get(`https://blog-backend-ditf.onrender.com/blog/get-blogs`, {
          headers: {
            "x-acciojob": token,
          },
        })
        .then((res) => {
          setHomeBlogs(res.data.data);
        });
    }
  }, [token]);
  return (
    <div>
      <h1 style={{ margin: "30px" }}>Homepage</h1>
      {homeBlogs.map((blog, idx) => (
        <BlogCard key={idx} blogData={blog} homepage={true} />
      ))}
    </div>
  );
}

export default HomePage;
