const { ProvincesModel } = require("../../models")
const axios = require("axios")
const getProvincesController = async () => {
    const provinces = await ProvincesModel.findAllData();

    if(!provinces.length){
        const { data } = await axios("https://apis.datos.gob.ar/georef/api/provincias");
        const provinces = data.provincias.map(province => province.nombre)
        provinces.forEach(async province => {
            await ProvincesModel.findOrCreate({
                where: {name: province}
            })
        });
        return provinces;
        
    }
    return provinces.map(province => province.name)
}

module.exports = { getProvincesController }

