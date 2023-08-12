import { getUserBySessionToken } from "../db/users";
import express from "express";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["JAMES_AUTH"];
    if (!sessionToken) {
      return res.status(402).json("you are not allowed");
    }
    const isExistUser = getUserBySessionToken(sessionToken);
    if (!isExistUser) {
      return res.status(400).json("expired token").end();
    }
    return next();
  } catch (err) {
    console.error(err);
  }
};
