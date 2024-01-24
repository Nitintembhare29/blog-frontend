import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import MyBlog from "./pages/myBlog";
import HomePage from "./pages/HomePage";
import Users from "./pages/Users";
import Header from "./components/common/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/my-blog" element={<MyBlog />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/all-users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
