import express from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";
import adminAuth from "./adminAuth";

const router = express.Router();
export default function route() {
  adminAuth(router);
  authentication(router);
  users(router);
  posts(router);
  return router;
}
