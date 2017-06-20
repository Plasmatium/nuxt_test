const Nuxt = require('nuxt')
const app = require('./server')

// confirm ip
const os = require('os')
let network = Object.values(os.networkInterfaces())

for(let adapter of network) {
  let host = null
  adapter.forEach(itfc => {
    if (itfc.family.toLowerCase() !== 'ipv4') { return }
    if (itfc.address === '127.0.0.1') { return }
    if (itfc.address === 'localhost') { return }
    host = itfc.address
  })
  if (host) {
    process.env.HOST = host
    break
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
