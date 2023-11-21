const express = require("express")
// const fs = require("fs")
const router = express.Router()

// const PATH_ROUTES = __dirname

// fs.readdirSync(PATH_ROUTES).filter((file) => {
//   // items.js => items
//   const name = file.split('.').shift()

//   if(name !== 'index') {
//     // http://localhost/api/items
//     router.use(`/${name}`, require(`./${file}`))
//   }
// })

router.use(`/users`, require(`./users`))
router.use(`/provinces`, require(`./provinces`))
router.use(`/caregivers`, require(`./caregivers`))

module.exports = router