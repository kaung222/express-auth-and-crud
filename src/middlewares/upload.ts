import { Path } from "mongoose";
import multer from "multer";

export const upload = multer({
  dest: "storage",
  limits: { fileSize: 10 * 1024 * 1024 },
});
