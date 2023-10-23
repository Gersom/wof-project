require('dotenv').config()

const port = process.env.PORT || 3000
const host = process.env.HOST || 'http://localhost'
const url = `${host}:${port}`
const message = 'Your server is ready'
const allMessage = `\n${message}:\n=> ${url}\n`

// LISTEN
const listen = (app, cb= ()=>null) => {
  app.listen(port, () => {
    console.log(allMessage)
    cb()
  })
}

module.exports = listen