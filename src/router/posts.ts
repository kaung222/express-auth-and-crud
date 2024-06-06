import {
  isAdmin,
  isAuthenticated,
  isAuthorized,
  isOwner,
} from "../middlewares";
import {
  AddPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getAllPostsByUserId,
} from "../controllers/PostController";
import express from "express";
export default (router: express.Router) => {
  router.post("/posts", isAuthenticated, AddPost);
  router.get("/posts", isAuthenticated, isAuthorized(["admin"]), getPosts);
  router.get("/posts/:id", isAuthorized(["admin", "user"]), getPost);
  router.put("/posts/:id", isAuthenticated, updatePost);
  router.delete("/posts/:id", isAuthenticated, deletePost);
};

// I have probllem using multiple middware her

// admin have acess to manipulate all the post ,
// user for his own post
