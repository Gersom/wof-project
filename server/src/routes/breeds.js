const {BreedsModel} = require("../models/index")

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const specieId = req.query.specie
  if (!specieId) return res.status('405').json({error: 'papi y mi especie?'})
  const breeds = await BreedsModel.findAllBySpecies(specieId)
  // const breeds = await BreedsModel.findAllData()
  if (breeds) {
    res.status('200').json(breeds)
  }
  else res.status('200').json({error: "breeds not found"})
 
});
module.exports = router