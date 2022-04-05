export default (req, res) => {
  res.status(201).send(req.file);
};
