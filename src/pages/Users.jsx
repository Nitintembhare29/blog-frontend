import { useEffect, useState } from "react";
import UserCard from "../components/Users/UserCard";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get(`https://blog-backend-ditf.onrender.com/auth/get-all-users`, {
          headers: {
            "x-acciojob": token,
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            setUsers(res.data.data);
          }
        });
    }
  }, [token]);
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Users</h1>
      <div style={{ display: "flex", padding: "20px" }}>
        {users?.map((user, idx) => (
          <UserCard key={idx} userData={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
