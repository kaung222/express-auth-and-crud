import { authentication, random } from "../helpers";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
} from "../models/users";
import express from "express";

// create user
export const addUser = async (req: express.Request, res: express.Response) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json("all fields are required").end();
  }
  const isExistUser = await getUserByEmail(email);
  if (isExistUser) {
    return res.json("This email is already register!");
  }
  const salt = random();
  const createdUser = await createUser({
    email,
    username,
    authentication: {
      salt,
      password: authentication(salt, password),
    },
  });
  return res.status(200).json({ success: true, createdUser });
};

// get all users
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  const users = await getUsers();
  if (!users) {
    return res.status(200).json("No users yet").end();
  }
  res.status(200).json(users).end();
};

// delete user
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json("No user found").end();
  }
  const deletedUser = await deleteUserById(id);
  res.clearCookie("JAMES_AUTH");
  return res.status(200).json({ success: true, deletedUser });
};

// update user
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { email, username, password } = req.body;
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json("No user found").end();
  }
  user.updatedAt = new Date();
  const updatedUser = await updateUserById(id, { email, username, password });
  return res.status(200).json({ success: true, updatedUser });
};
