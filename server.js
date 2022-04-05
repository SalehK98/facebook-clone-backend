import express, { json, urlencoded } from "express";
// import router from "./router.js";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import gridfsStream from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";
import Grid from "gridfs-stream";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 4000;

//middlwares
app.use(cors());
app.use(json());
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

// db config mongodb not psql
import mongoPosts from "./postsModel.js";
import mongoComments from "./commentsModel.js";
Grid.mongo = mongoose.mongo;

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
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "images",
  });
  gfs = Grid(conn.db, mongoose.mongo);
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

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(201).send(req.file);
});
app.post("/upload/post", (req, res) => {
  const dbPost = req.body;

  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/upload/comments", (req, res) => {
  const dbComment = req.body;

  mongoComments.create(dbComment, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/posts", (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});

app.get("/retrieve/comments", (req, res) => {
  mongoComments.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});

app.get("/retrieve/images/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    console.log("here");
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("now are here");
      if (!file || file.length === 0) {
        res.status(400).json({ err: "file not found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.post("/postlogin", (req, res) => {
  console.log("post recevied");
  console.log(req.body);
  res.send("postLogin");
});

// app.use(router);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
