const FS = require('fs')

const getEachFont = (data) => {
  return data.match(/@font-face[\w\W]*?\}\s?/g)
}

const splitAttr = (font) => {
  // find font-weight
  let fw = font.match(/font-weight: (\d0+);/)[1]
  // find font-style
  let fs = font.match(/font-style: (\w*);/)[1]
  let src = font.match(/base64,(.*?)\)/)[1]
  let format = font.match(/format\(\'(\w+)\'\)/)[1]
  src = new Buffer(src, 'base64')
  return {fw, fs, format, src}
}

const reassemble = (ff, {fw, fs, format, src}) => {
  let name = `${ff}@${fs}@${fw}`
  console.log(name)
  let filename = `${name}.${format}`
  FS.writeFileSync(`./target/${filename}`, src)

  let scss = `
    @font-face {
      font-family: '${ff}';
      src: url('/fonts/${filename}') format('${format}');
      font-weight: ${fw};
      font-style: ${fs};
    }
  `
  filename = `./scss/${name}.scss`
  console.log(filename)
  FS.writeFileSync(filename, scss, 'utf-8')
}

// ------------------------------
console.time('a')
let fontList = []
let allFontsData = FS.readdirSync('./')
allFontsData.forEach(fn => {
  if (!fn.endsWith('.scss')) return
  fn = fn.replace('.scss', '')
  fontList.push(fn)

  let data = FS.readFileSync(fn+'.scss', 'utf-8')
  // fflist is font family list
  console.log(fn)
  let fflist = getEachFont(data)
  fflist.forEach(f => {
    let attrs = splitAttr(f)
    reassemble(fn, attrs)
  })
  console.log('--------------', fn, '\n')
})

fontList = JSON.stringify(fontList, null, '  ').replace(/\"/g, "'") + '\n'
FS.writeFileSync(
  './extra_fonts_list.js',
  `export default ${fontList}`,
  'utf-8')

console.timeEnd('a')

//
// let data = fs.readFileSync('./Aidos.scss', 'utf-8')
// d0 = getEachFont(data)[0]
