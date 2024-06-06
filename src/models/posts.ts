import mongoose from "mongoose";
import users from "router/users";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
});
export const PostModel = mongoose.model("Post", PostSchema);

export const getPostById = async (id: string) => {
  try {
    const post = await PostModel.findById(id);
    return post;
  } catch (err) {
    return null;
  }
};
export const getAllPosts = async () => await PostModel.find();
export const getPostsByUserId = async (id: String) =>
  await PostModel.find({ userId: id });
export const createPost = (values: Record<string, any>) =>
  new PostModel(values).save().then((post) => post.toObject());

export const editPost = async (id: String, values: Record<string, any>) =>
  await PostModel.findByIdAndUpdate(id, values);
export const destoryPost = async (id: String) =>
  await PostModel.findByIdAndDelete(id);
