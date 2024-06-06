import express from "express";
import cors from "cors";
import compression from "compression";
import http from "http";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
server.listen(8080, () => {
  console.log("App is running on http://localhost:8080");
});
app.get("/", (req, res) => {
  return res.send(req.get("User-Agent"));
});
const uri =
  "mongodb+srv://james:gv2l3njUpPju4qId@cluster0.udkivev.mongodb.net/?retryWrites=true&w=majority";
async function connectDatabase() {
  try {
    const res = await mongoose.connect(uri);
    if (res) {
      console.log("database connected");
    }
    mongoose.connection.on("error", () => {
      console.log("cannot connect to database");
    });
  } catch (err) {
    console.error(err);
  }
}
connectDatabase();
app.use("/", router());
