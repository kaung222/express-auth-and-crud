import { isAuthenticated } from "../middlewares";
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/UserControllers";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, deleteUser);
  router.put("/users/:id", isAuthenticated, updateUser);
  router.post("/users", isAuthenticated, addUser);
};
