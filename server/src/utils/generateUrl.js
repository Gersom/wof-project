require('dotenv').config()

const generateUrl = (url) => {
  if (url.startsWith("http"))  return url
  else {
    const modeEnv = process.env.MODE
    const host = process.env.HOST || 'http://localhost'
    const port = process.env.PORT || 3000
    
    if (modeEnv) return `${host}${url}`
    else return `${host}:${port}${url}`
  }
}

module.exports = generateUrl