const { postItemController } = require("../controllers/items")

const postHandler = async (req, res) => {
    const { title, description, address, start_date, end_date } = req.body;
    try {
        const response = await postItemController(title, description, address, start_date, end_date);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {postHandler} 