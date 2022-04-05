import mongoPosts from "../postsModel.js";

export default (req, res) => {
  const dbPost = req.body;

  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};
