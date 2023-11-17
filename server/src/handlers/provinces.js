const { getProvincesController } = require("../controllers/provinces");


const getAllProvinces = async (req,res) => {
    try {
        const provinces = await getProvincesController();
        res.status(200).json(provinces)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports= {getAllProvinces};