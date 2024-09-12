import React from "react";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import PostDetail from "./components/PostDetails";
import PersonalPost from "./components/PersonalPost";
import EditPost from "./components/EditPost";
function App() {
  return (
    <div className="">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<CreatePost />} />
          <Route exact path="/detail/:id" element={<PostDetail />} />
          <Route exact path="/personal" element={<PersonalPost />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
        </Routes>
    </div>
  );
}

export default App;
