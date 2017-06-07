const Nuxt = require('nuxt')
const app = require('express')()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'

let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)
nuxt.build().then(() => {
  app.use(nuxt.render)
  app.listen(3000)
  console.log('Server is listening on http://localhost:3000')
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
