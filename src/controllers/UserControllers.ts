import { deleteUserById, getUsers } from "../db/users";
import express from "express";

// export const deleteUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   const id = req.params;
//   console.log(id);

//   //   const data = deleteUserById(id);
// };

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  const users = await getUsers();
  res.status(200).json(users).end();
};
