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
module.exports = router

