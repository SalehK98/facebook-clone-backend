export default (req, res) => {
  console.log("post recevied");
  console.log(req.body);
  res.send("postLogin");
};
