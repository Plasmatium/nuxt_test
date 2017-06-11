const Nuxt = require('nuxt')
const app = require('./server')

const host = process.env.HOST || '192.168.1.30'
const port = '3000'

let config = require('./nuxt.config.js')
process.env.NODE_ENV === 'production'
config.dev = false
config.prod = true

const nuxt = new Nuxt(config)
nuxt.build().then(() => {
  app.use(nuxt.render)
  app.listen({host, port})
  console.log('Server is listening on http://192.168.1.30')
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
