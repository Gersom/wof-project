require('dotenv').config()

const generateServerPath = () => {
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'http://localhost'
  const path = `${host}:${port}`

  return { port, host, path }
}

module.exports = generateServerPath