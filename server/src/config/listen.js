const generateServerPath = require("./../utils/generateServerPath")

const { port, path } = generateServerPath()
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