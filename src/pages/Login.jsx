import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      loginId,
      password,
    };

    axios
      .post(`https://blog-backend-ditf.onrender.com/auth/login`, userObj)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.data.token);
          alert(res.data.message);
          window.location.href = "/create-blog";
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
      <h1 style={{ marginBottom: "20px" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>LoginId</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter LoginId"
            onChange={(e) => setLoginId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" style={{ marginTop: "15px" }}>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
