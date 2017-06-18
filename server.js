// inject extra fonts
const axios = require('axios')
const fs = require('fs')

if (!fs.readdirSync('./assets/refined_fonts').includes('index.js')) {
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
}

const url = `http://fonts.googlefonts.net/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic|Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic|Slabo+27px|Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic|Source+Sans+Pro:400,200,200italic,300,300italic,400italic,600,600italic,700,700italic,900,900italic|Raleway:400,100,200,300,500,600,700,800,900|PT+Sans:400,400italic,700,700italic|Droid+Sans:400,700|Arimo:400,400italic,700,700italic|Noto+Sans:400,400italic,700,700italic|Alegreya+Sans:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,800,800italic,900,900italic|Dosis:400,200,300,500,600,700,800|Cabin:400,400italic,500,500italic,600,600italic,700,700italic|Oxygen:400,300,700|Inconsolata:400,700|Hind:400,300,500,600,700|Nunito:400,300,700|Muli:400,300,300italic,400italic|Josefin+Sans:400,100,100italic,300,300italic,400italic|Signika:400,300,600,700|Crimson+Text:400,400italic,600,600italic,700,700italic|Maven+Pro:400,500,700,900|Varela+Round|Quicksand:400,300,700|Fira+Sans:400,300,300italic,400italic,500,500italic,700,700italic|Questrial|Josefin+Slab:400,100,100italic,300,300italic,400italic,600,600italic,700,700italic|Pontano+Sans|Istok+Web:400,700italic,700,400italic|News+Cycle:400,700|Quattrocento+Sans:400,700italic,700,400italic&subset=latin,latin-ext`

if (!fs.readdirSync('./assets/refined_fonts/google/')) {
  axios.get(url).then(resp => {
    let data = resp.data
    fs.writeFileSync('./assets/refined_fonts/google/googlefonts.scss', resp.data, 'utf-8')
  })
}

const express = require('express')
app = express()

// -- app.use middleware injection --
// get book
const getBook = require('./server/getBook')
app.get(/\/api\/getbook/, getBook)
// demo lorem essay
const mwLoremGen = require('./server/loremGen')
app.get(/\/api\/getdemo/, mwLoremGen)

// static fonts server
app.use('/fonts', express.static('./assets/refined_fonts/target'))
// -- END INJECTION ---

module.exports = app

// const host = process.env.HOST || '127.0.0.1'
// const port = process.env.PORT || '3000'
//
// let config = require('./nuxt.config.js')
// config.dev = !(process.env.NODE_ENV === 'production')
//
// const nuxt = new Nuxt(config)
// nuxt.build().then(() => {
//   app.use(nuxt.render)
//   app.listen(3000)
//   console.log('Server is listening on http://localhost:3000')
// })
// .catch((error) => {
//   console.error(error)
//   process.exit(1)
// })
