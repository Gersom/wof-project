require('dotenv').config()

const generateServerPath = (url) => {
  if (url.startsWith("http"))  return url
  else {
      console.log("La cadena no comienza con 'xxx'");
    const modeEnv = process.env.MODE
    if (modeEnv) {
      const port = process.env.PORT || 3000
      const host = process.env.HOST || 'http://localhost'
      return `${host}:${port}${url}`
    } else return `${host}${url}`
  }
}

module.exports = generateServerPath