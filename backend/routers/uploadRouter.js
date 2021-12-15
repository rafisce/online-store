import multer from "multer";
import express from "express";
import { isAuth, isAdmin } from "../utils.js";

const uploadRouter = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });
uploadRouter.post("/", isAuth, isAdmin, upload.single("image"), (req, res) => {
  req.file.path.match(/[\w-]+\.(jpg|png)/g, "\\$&")[0];

  res.send(
    "/uploads/" + req.file.path.match(/[\w-]+\.(jpg|png|txt)/g, "\\$&")[0]
  );
});

export default uploadRouter;
