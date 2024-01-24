import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogObj = {
      title,
      textBody,
    };

    axios
      .post(
        `https://blog-backend-ditf.onrender.com/blog/create-blog`,
        blogObj,
        {
          headers: {
            "x-acciojob": token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 201) {
          alert(res.data.message);
          window.location.href = "/home";
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1 style={{ marginBottom: "20px" }}>Create Blog</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Text Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter Text body"
            onChange={(e) => setTextBody(e.target.value)}
          />
          <Button type="submit" style={{ marginTop: "15px" }}>
            Create Blog
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateBlog;
