require('dotenv').config()

const modeEnv = process.env.MODE
let path = ''
if (modeEnv) {
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'http://localhost'
  path = `${host}:${port}`
} else path = host

const message = 'Your server is ready'
const allMessage = `\n${message}:\n=> ${path}\n`



// LISTEN
const listen = (app, cb= ()=>null) => {
  app.listen(port, () => {
    console.log(allMessage)
    cb()
  })
}

module.exports = listen