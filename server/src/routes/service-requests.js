const {RequestsModel} = require("../models/index")

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const postId = req.query.post
  if (!postId) return res.status(405).json({error: 'papi y mi postId?'})
  const request = await RequestsModel.findRequestsByPost(postId)
  if (request) {
    const requestFormated = request.map((req) => ({
      id: req.id,
      price: req.price,
      caregiverId: req.caregiver.id,
      userId: req.caregiver.user.id,
      name: req.caregiver.user.name,
      address: req.caregiver.user.address,
      profilePicture: req.caregiver.user.profilePicture,
      rating: String((Math.random() * (5 - 2) + 2).toFixed(2)),

    }))
    res.status(200).json(requestFormated)
  }
  else res.status(200).json({error: "request not found"})
 
});
module.exports = router