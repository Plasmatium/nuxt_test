// inject extra fonts
const axios = require('axios')
const fs = require('fs')

let fileList = fs.readdirSync('./assets/refined_fonts/scss/')
let indexjs = []
// fontList = []

fileList.forEach(fn => {
  if (!fn.endsWith('.scss')) return
  let lineStr = `import './scss/${fn}'`
  indexjs.push(lineStr)
  // fontList.push(fn.replace('.scss', ''))
})
indexjs.push('')
fs.writeFileSync('./assets/refined_fonts/index.js', indexjs.join('\n'), 'utf-8')
//
// fontList = JSON.stringify(fontList, null, '  ').replace(/\"/g, "'") + '\n'
//
// fs.writeFileSync(
//   './assets/refined_fonts/extra_fonts_list.js',
//   `export default ${fontList}`,
//   'utf-8')
//google fonts
const url = 'https://fonts.googleapis.com/css?family=Abel|Actor|Alegreya+Sans|Amiko|Antic|Archivo+Narrow|Assistant|Cabin|Cabin+Condensed|Catamaran|Chivo|Droid+Sans|Ek+Mukta|Hind|Josefin+Sans|Lato|Magra|Marvel|Maven+Pro|Molengo|Muli|Nunito|Nunito+Sans|Open+Sans|Oxygen|PT+Sans|Questrial|Quicksand|Raleway|Roboto|Source+Sans+Pro|Spinnaker:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'
axios.get(url).then(resp => {
  let data = resp.data
  fs.writeFileSync('./assets/googlefonts.scss', resp.data, 'utf-8')
})


const Nuxt = require('nuxt')
const express = require('express')
app = express()

// -- app.use middleware injection --
// demo lorem essay
const mwLoremGen = require('./server/loremGen')
app.get(/\/api\/getdemo/, mwLoremGen)

// static fonts server
app.use('/fonts', express.static('./assets/refined_fonts/target'))
// -- END INJECTION ---

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
