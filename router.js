import { Router } from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import gridfsStream from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";
import Grid from "gridfs-stream";
const router = Router();

// db config mongodb not psql
gridfsStream.mongo = mongoose.mongo;

const mongoUrI =
  "mongodb+srv://facebookclone:facebookclone@cluster0.ggrh0.mongodb.net/facebookclone?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoUrI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once("open", () => {
  console.log("DB connected");
  gfs = gridfsStream(conn.db, mongoose.mongo);
  gfs.collection("images");
});
console.log("no error");
const storage = new GridFsStorage({
  url: mongoUrI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log("no error1");
      const filename = `image-${Date.now()}${path.extname(file.originalname)}`;
      console.log("no error2");
      const fileInfo = {
        filename: filename,
        bucketName: "images",
      };
      console.log("no error 3");
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

mongoose.connect(mongoUrI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import home from "./controllers/home.js";
import login from "./controllers/login.js";
import postLogin from "./controllers/postLogin.js";
import upload_image from "./controllers/upload_image.js";
import post from "./controllers/post.js";
import postRetrieve from "./controllers/postRetrieve.js";
import imagesSingleRetrieve from "./controllers/imagesSingleRetrieve.js";

router.get("/", home);
router.post("/upload/image", upload.single("file"), upload_image);
router.post("/upload/post", post);
router.get("/retrieve/posts", postRetrieve);
router.get("retrieve/images/single", (req, res) => {
  gfs.find({ filename: req.query.name }, (err, itesms) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const readstream = gridfsBucket.openDownloadStream(itesms.filename);
      readstream.pipe(res);
    }
  });
  //   gfs.files.findOne({ filename: req.query.name }, (err, file) => {
  //   console.log("here");
  //   if (err) {
  //       res.status(500).send(err);
  //     } else {
  //         if (!file || file.length === 0) {
  //             res.status(400).json({ err: "file not found" });
  //         } else {
  //     }
  //   }
  //   });
});
router.get("/login", login);
router.post("/postlogin", postLogin);

export default router;
