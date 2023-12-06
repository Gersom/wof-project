const {RequestsModel} = require("../models/index")

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const { ownerId } = req.query
  let requests
  if(ownerId){ // si recibe un ownerId muestra las solicitudes de ese owner
    requests = await RequestsModel.findRequestsByOwner(ownerId)
    return res.status(200).json(requests)
  }

  requests = await RequestsModel.findAllRequests() 

  if (requests) {
    res.status(200).json(requests)
  }
  else res.status(200).json({error: "request not found"})
 
});

router.get("/:id", async (req,res) => {
  try {
    const { id } = req.params
    const request = await RequestsModel.findDataById(id)
    if(!request) throw Error("request not found")
    res.status(200).json(request)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})

router.post("/", async (req,res) => {
  try {
    let dataFormated = req.body
    dataFormated.servicePostingId = dataFormated.postId
    const newRequest = await RequestsModel.createData(dataFormated)
    res.status(200).json(newRequest)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})

router.delete("/:id", async (req,res) => {
  try {
    const { id } = req.params
    const deleted = await RequestsModel.removeData(id)
    res.status(200).json(deleted)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})

module.exports = router