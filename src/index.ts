import express from "express";
import cors from "cors";
import compression from "compression";
import http from "http";
import bodyParser from "body-parser";
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
server.listen(8080, () => {
  console.log("App is running on http://localhost:8080");
});

const uri =
  "mongodb+srv://james:gv2l3njUpPju4qId@cluster0.udkivev.mongodb.net/?retryWrites=true&w=majority";
async function connectDatabase() {
  try {
    mongoose.connect(uri);
    console.log("database connected");
  } catch (err) {
    console.error(err);
  }
}
connectDatabase();
app.use("/", router());
