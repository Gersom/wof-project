const {SpeciesModel} = require("../models/index")

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const species = await SpeciesModel.findAllData()
  if (species) {
    res.status('200').json(species)
  }
  else res.status('200').json({error: "species not found"})
 
});
module.exports = router