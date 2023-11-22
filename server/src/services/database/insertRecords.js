const insertRecords = async ({
  model, name, data
}) => {
  try {
    const message = `${name} data inserted into the database.`
    const dataExist = await model.dataExist()

    if(!dataExist){
      await model.createMany(data)
      console.log(`- ${data.length} ${message}`)
    } else {
      console.log(`- 0 ${message}`)
    }
  } catch (err) {
    console.log(`ERROR: insert data into ${name}.\n`)
    throw Error(err.message)
  }
}

module.exports = insertRecords