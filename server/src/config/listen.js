require('dotenv').config()

let path = ''
const modeEnv = process.env.MODE
const port = process.env.PORT || 3000
const host = process.env.HOST || 'http://localhost'

if (modeEnv) path = `${host}:${port}`
else path = host

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