const Nuxt = require('nuxt')
const app = require('./server')

// confirm ip
const os = require('os')
let network = os.networkInterfaces()
let interfaces = Object.values(network)[0]
for (let itfc of interfaces) {
  if (itfc.family.toLowerCase() === 'ipv4') {
    process.env.HOST = itfc.address
  }
}

const host = process.env.HOST || 'localhost'
const port = '3000'

console.info('host on:', process.env.HOST)

let config = require('./nuxt.config.js')
process.env.NODE_ENV === 'production'
config.dev = false
config.prod = true

const nuxt = new Nuxt(config)
nuxt.build().then(() => {
  app.use(nuxt.render)
  app.listen({host, port})
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
