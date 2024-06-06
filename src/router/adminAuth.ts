import { login, logout, register } from "../controllers/AuthController";
import express from "express";

export default (router: express.Router) => {
  router.post("/admin/register", register);
  router.post(`/admin/login`, login);
  router.post(`/admin/logout`, logout);
};
