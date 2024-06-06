import express from "express";
import {
  createPost,
  destoryPost,
  editPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
} from "../models/posts";
import { getUserBySessionToken } from "../models/users";

export const AddPost = async (req: express.Request, res: express.Response) => {
  const { title, content } = req.body;

  //   check empty body
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Post title and content are required" })
      .end();
  }
  const user = await getUserBySessionToken(req.cookies["JAMES_AUTH"]);
  if (!user) {
    return res.json("Please login");
  }
  const userId = user._id;
  const createdPost = await createPost({ title, content, userId });
  return res.status(200).json(createdPost).end();
};

export const getPosts = async (req: express.Request, res: express.Response) => {
  const sessionToken = req.cookies["JAMES_AUTH"];
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return res.status(401).json("you are not allowed");
  }
  const allPosts =
    user.userRole === "admin"
      ? await getAllPosts()
      : await getPostsByUserId(user._id.toString());

  // const allPosts = await getAllPosts();
  return res.json(allPosts);
};
export const getPost = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const post = await getPostById(id);
  if (!post) {
    return res.status(404).json("Post not found").end();
  }
  return res.status(202).json(post).end();
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;
  if (!title || !content) {
    return res.status(400).json("Both title and content are required").end();
  }

  const post = await editPost(id, { title, content, userId });
  if (!post) {
    return res.status(404).json("Post not found").end();
  }
  return res.status(202).json(post).end();
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const isExitPost = await getPostById(id);
  if (!isExitPost) {
    return res.status(404).json("No post found").end();
  }
  const post = await destoryPost(id);
  return res.status(200).json({ success: true, deletedPost: post }).end();
};

export const getAllPostsByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  const sessionToken = req.cookies["JAMES_AUTH"];
  const user = await getUserBySessionToken(sessionToken);
  const posts = await getPostsByUserId(user._id.toString());
  return res.json(posts);
};
