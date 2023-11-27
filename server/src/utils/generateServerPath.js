require('dotenv').config()

const generateServerPath = () => {
  const modeEnv = process.env.MODE
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'http://localhost'
  const path = modeEnv ? host : `${host}:${port}`

  return { port, host, path }
}

module.exports = generateServerPath