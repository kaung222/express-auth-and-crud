import { login, register } from "../controllers/AuthController";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post(`/auth/login`, login);
};
