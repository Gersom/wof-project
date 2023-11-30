const {PostsModel} = require("./../models/index")

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const countries = await PostsModel.findAllData()
  if (countries) {
    res.status(200).json(countries)
  }
  else res.status(200).json({error: "Posts not found"})
});


router.post("/", async (req, res) => {
  const post = await PostsModel.create(req.body)
  if (post) {
    res.status(200).json(post)
  }
  else res.status(200).json({error: "Posts not found"})
});


router.put("/:id", async (req, res) => {
  const postId = req.params.id
  const post = await PostsModel.updateData(postId, req.body)
  if (post) {
    res.status(200).json(post)
  }
  else res.status(200).json({error: "Posts not found"})
});


module.exports = router

