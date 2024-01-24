import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserCard({ userData }) {
  const token = localStorage.getItem("token");

  function handleFollow(userId) {
    axios
      .post(
        `https://blog-backend-ditf.onrender.com/follow/follow-user`,
        {
          followingUserId: userId,
        },
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

  function handleUnFollow(userId) {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`,
        {
          followingUserId: userId,
        },
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
  return (
    <Card style={{ width: "18rem", marginRight: "20px" }}>
      <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Title>{userData.username}</Card.Title>
        {userData.follow ? (
          <Button variant="danger" onClick={() => handleUnFollow(userData._id)}>
            Unfollow
          </Button>
        ) : (
          <Button variant="primary" onClick={() => handleFollow(userData._id)}>
            Follow
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
