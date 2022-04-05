import { GridFsStorage } from "multer-gridfs-storage";
import gridfsStream from "gridfs-stream";

// let gfs;

export default (req, res, gfs) => {
  //   gfs.files.findOne({ filename: req.query.name }, (err, file) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       if (!file || file.length === 0) {
  //         res.status(400).json({ err: "file not found" });
  //       } else {
  //         const readstream = gfs.creatReadStream(file.filename);
  //         readstream.pipe(res);
  //       }
  //     }
  //   });
};
