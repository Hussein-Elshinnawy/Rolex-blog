import express from "express";
import bodyParser from "body-parser";

var postTitleArray = ["gold rolex"];
var postArray = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."];
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs", { blogTitle: postTitleArray, blog: postArray });
});
app.get("/post", (req, res) => {
    res.render("post.ejs", { blogTitle: postTitleArray, blog: postArray });
  });
app.post("/post", (req, res) => {
  var blogTitle = req.body["blogTitle"];
  postTitleArray.push(blogTitle);
  var blog = req.body["blog"];
  postArray.push(blog);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  postTitleArray.splice(index, 1);
  postArray.splice(index, 1);
  res.redirect("/");
});

app.get("/update", (req, res) => {
  const index = req.query.index;
  res.render("update.ejs", {
    index: index,
    blogTitle: postTitleArray[index],
    blog: postArray[index],
  });
});

app.post("/update", (req, res) => {
  const index = req.body.index;
  postTitleArray[index] = req.body.blogTitle;
  postArray[index] = req.body.blog;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
