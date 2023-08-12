import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("email or password is required");
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.status(404).json("user not found");
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash.toString()) {
      return res.status(400).json("email or password wrong");
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    ).toString();
    await user.save();
    res.cookie("JAMES_AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    res.status(200).json({ success: true, user }).end();
  } catch (err) {
    console.error(err);
  }
};
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.json("email or password or username required");
    }
    const isExistUser = await getUserByEmail(email);
    if (isExistUser) {
      return res.json("user already exist");
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    res.status(200).json({ success: true, user }).end();
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};
