import { getPostsByUserId } from "models/posts";
import { getUserBySessionToken } from "../models/users";
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
    const isExistUser = await getUserBySessionToken(sessionToken);
    if (!isExistUser) {
      return res.status(400).json("expired token").end();
    }
    return next();
  } catch (err) {
    console.error(err);
  }
};

export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const sessionToken = req.cookies["JAMES_AUTH"];
  const user = await getUserBySessionToken(sessionToken);
  if (!sessionToken || user.userRole !== "admin") {
    return res.status(401).json("You are NOT allowed.need to be admin").end();
  }
  return next();
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // const posts = await getPostsByUserId(user)
  return next();
};
// interface authProps {
//   roles: Array<string>;
// }
export const isAuthorized = (roles: Array<String>) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const sessionToken = req.cookies["JAMES_AUTH"];
    const user = await getUserBySessionToken(sessionToken);

    if (!roles.includes(user.userRole)) {
      return res.status(401).json("You are NOT allowed!");
    }
    return next();
  };
};
