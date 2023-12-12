const averageRating = async (array,modelUpdate,id) => {
    let suma = 0

    array.forEach(e => {
        suma = suma + Number(e.rating)
    });

    if(suma==0) return 0
    if(suma>0){
        const prom = suma/array.length
        await modelUpdate.update({rating:prom.toFixed(2)},{where:{id}})
    }
    return
}
module.exports = averageRating