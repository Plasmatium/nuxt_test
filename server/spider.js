// --- spider.js ---
// class Spider

const axios = require('axios')
const cheerio = require('cheerio')
const {BookStruct, ChapterStruct} = require('./text/structs')

// TODO: isDev should be its real value
const isDev = true
const jqueryCDN = isDev ? (
  'https://cdn.bootcss.com/jquery/3.2.1/jquery.slim.js'
) : (
  'https://cdn.bootcss.com/jquery/3.2.1/jquery.slim.min.js'
)

// ------------------URL
const urlMap = [
  {
    name: 'Alice',
    url: 'http://www.gutenberg.org/files/11/11-h/11-h.htm'
  }, {
    name: 'test',
    url: 'http://www.gutenberg.org/files/54900/54900-h/54900-h.htm'
  }
]

// ----------------------------------------------------------------

const Spider = class {
  constructor (url) {
    this.url = url
    this.book = new BookStruct()
    this.dom = null
    this.insQueue = []
  }

  async init () {
    let {data} = await axios.get(this.url).catch(err => {
      console.error('Spider init failed, maybe the url or web is broken.')
      console.error('url is:', this.url)
      console.error(err.stack)
    })

    this.dom = cheerio.load(data)
  }

  async run (forceFetch=false) {
    if (!this.dom || forceFetch) {
      await this.init()
    }

    this.insQueue.forEach((func, step) => {
      try {
        console.time(func.name)
        func(this.dom, this.book)
      } catch (err) {
        console.error('Spider -> Error occured in step:', step)
        console.error('step name is:', String(func.name))
        console.error('book url is:', this.url)
        console.error('details:\n', err)
      }
      console.timeEnd(func.name)
    })
  }
}

const _contents = ($, book) => {
  let tryStr = ['CONTENTS', 'Contents', 'contents']
  let maybeContents = null;
  for (let str of tryStr) {
    let selected = $(`:contains(${str})`).nextUntil(':header')
    if (selected.length) {
      maybeContents = selected
      break
    }
  }
  if (!maybeContents) {
    throw Error('No contents found')
  }

  let anchors = maybeContents.find('a')
  if (!anchors.length) {
    throw Error('No anchors found in contents')
  }
  let contents = []
  contents.forEach.call(anchors, (a, idx) => {
    let title = a.children[0].data.trim()
    if (title) {
      contents.push(title)
      a.attribs.id = `para-${idx}`
    }
  })
  book.contents = contents
}

const _chapters = ($, book) => {
  debugger
  let contents = book.contents
  // last para-anchor is the end claim
  for(let i = 0; i < contents.length -1; i++) {
    let [start, end] = contents.slice(i, i+2)
    let paras = $(`:header:contains(${start})`).nextUntil(
      `:header:contains(${end})`
    )
    // expect innerText is `paras.text()`
    debugger
  }

  book.chapters = chapters
}

global.s = new Spider(urlMap[1].url)
s.insQueue = [_contents, _chapters]
s.run().then(()=>console.log('init finished'))

module.exports = Spider
