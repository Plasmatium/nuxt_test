module.exports = {
  /*
  ** Headers of the page
  */
  cache: true,
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: true
  },
  css: [
    {
      src: '~/assets/googlefonts.scss',
      lang: 'scss'
    },
    {
      src: '~/assets/refined_fonts/index.js',
      lang: 'scss'
    }
  ]
}


// inject extra fonts
const axios = require('axios')
const fs = require('fs')

let fileList = fs.readdirSync('./assets/refined_fonts')
let indexjs = []
fontList = []

fileList.forEach(fn => {
  if (!fn.endsWith('.scss')) return
  let lineStr = `import './${fn}'`
  indexjs.push(lineStr)
  fontList.push(fn.replace('.scss', ''))
})
indexjs.push('')
fs.writeFileSync('./assets/refined_fonts/index.js', indexjs.join('\n'), 'utf-8')

fontList = JSON.stringify(fontList, null, '  ').replace(/\"/g, "'") + '\n'

fs.writeFileSync(
  './assets/refined_fonts/extra_fonts_list.js',
  `export default ${fontList}`,
  'utf-8')

//google fonts
const url = 'https://fonts.googleapis.com/css?family=Abel|Actor|Alegreya+Sans|Amiko|Antic|Archivo+Narrow|Assistant|Cabin|Cabin+Condensed|Catamaran|Chivo|Droid+Sans|Ek+Mukta|Hind|Josefin+Sans|Lato|Magra|Marvel|Maven+Pro|Molengo|Muli|Nunito|Nunito+Sans|Open+Sans|Oxygen|PT+Sans|Questrial|Quicksand|Raleway|Roboto|Source+Sans+Pro|Spinnaker:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'
axios.get(url).then(resp => {
  let data = resp.data
  fs.writeFileSync('./assets/googlefonts.scss', resp.data, 'utf-8')
})
