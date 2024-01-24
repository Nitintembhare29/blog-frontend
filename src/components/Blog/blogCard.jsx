import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

function BlogCard({ blogData, homepage }) {
  const token = localStorage.getItem("token");
  const [isEdit, setIsEdit] = useState();
  const [newTitle, setNewTitle] = useState("");
  const [newTextBody, setNewTextBody] = useState("");

  function handleDelete(blogId) {
    axios
      .post(
        `https://blog-backend-ditf.onrender.com/blog/delete-blog`,
        { blogId },
        {
          headers: {
            "x-acciojob": token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleSubmit(e, blogId) {
    e.preventDefault();

    const blogObj = {
      title: newTitle,
      textBody: newTextBody,
      blogId,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`, blogObj, {
        headers: {
          "x-acciojob": token,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <Card style={{ margin: "2rem" }}>
      <Card.Body>
        <Card.Title>{blogData.title}</Card.Title>
        <Card.Text>{blogData.textBody}</Card.Text>
        {homepage ? (
          <>
            <div>Created By -{blogData.username}</div>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              style={{ marginRight: "15px" }}
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(blogData._id)}>
              Delete
            </Button>
          </>
        )}

        {isEdit ? (
          <>
            <Form onSubmit={(e) => handleSubmit(e, blogData._id)}>
              <Form.Group className="mb-3" controlId="text">
                <Form.Label style={{ marginTop: "15px" }}>New Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Text"
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="textBody">
                <Form.Label>New Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter New Text"
                  onChange={(e) => setNewTextBody(e.target.value)}
                />
                <Button type="submit" style={{ marginTop: "15px" }}>
                  Edit
                </Button>
              </Form.Group>
            </Form>
          </>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
