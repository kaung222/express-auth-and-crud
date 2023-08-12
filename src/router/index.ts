import express from "express";
import authentication from "./authentication";
import users from "./users";

const router = express.Router();
export default function route() {
  authentication(router);
  users(router);
  return router;
}
