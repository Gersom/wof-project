const DB_ENGINE = process.env.DB_ENGINE

const getProperties = () => {
  switch (DB_ENGINE) {
    case "postgresql":
      return { id: 'id' }
    case "mongodb":
      return { id: '_id' }
    default:
      throw new Error("Environment variable 'DB_ENGINE' is not valid.")
  }
}

module.exports = getProperties