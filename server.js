const express = require("express");
const app = express();
const dotenv = require("dotenv/config");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const uuid = require("uuid").v4;
const {nanoid}= require("nanoid");

//Middleware
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
// app.use(bodyParser.json());

//Import routes
const articleRouter = require("./routes/articles");

//Routes Middleware
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});


//Connect to DB (returns a mongoose instance)
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => console.log("Connect to database")
);

//Routes Middleware
app.use("/articles", articleRouter);

//Listening
app.listen(5000, () => {
  console.log("Up and running");
});

//     const articles = [
//   {
//     title: "KLM",
//     createdAt: new Date(),
//     description: "KLM description",
//   },
//   {
//     title: "Air France",
//     createdAt: new Date(),
//     description: "AF description",
//   },
//     ];
