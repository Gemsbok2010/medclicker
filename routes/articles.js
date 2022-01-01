const express = require("express");
// const { uuid } = require("short-uuid");
const router = express.Router();
const Article = require("./../models/article");

const uuid = require("uuid").v4;
const {nanoid}= require("nanoid");
const generate = require("nanoid-generate");
 const {uppercase} = require('nanoid-generate');
 const myId = uppercase(3);




//CREATE NEW ARTICLE /articles/new
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

//idNumber page
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article === null) {
    res.redirect("/");
  }
  res.render("articles/show", { article: article });
});
//Post and Save POST-CREATE ARTICLE /articles/idNumber
router.post("/", async (req, res) => {
  let article = new Article({
    _id:"A"+ myId,
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
    console.log(article);
  } catch (e) {
    console.log(e);
    res.render("articles/new", { article: article });
    // res.render("articles/new");
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
