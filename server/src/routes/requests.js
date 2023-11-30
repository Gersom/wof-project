const {RequestsModel} = require("../models/index")

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const request = await RequestsModel.findAllData()
  if (request) {
    res.status(200).json(request)
  }
  else res.status(200).json({error: "request not found"})
 
});
module.exports = router