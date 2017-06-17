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
    // TODO: 此处应使用eq(idx).text()来获取具体title文字
    // 有时候title文字里面有换行和多余空格，此处全部正则替换为一个空格
    let title = a.children[0].data.trim().replace(/\s+/g, ' ')
    if (title) {
      contents.push(title)
    }
  })
  book.contents = contents
}

const _buildBook = ($, book) => {
  let contents = book.contents

  // 插入最后章节前的定位
  let endStr = '<1=2=3=4= THE END ====>' + new Date()
  contents.push(endStr)
  $('pre').eq(-1).before(`<h3>${endStr}</h3>`)
  // last para-anchor is the end claim
  for(let i = 0; i < contents.length -1; i++) {
    console.log(`chapter${i}`)
    console.time('chapter calc time')
    let [start, end] = contents.slice(i, i+2)
    let paras = $(`:header:contains(${start})`).nextUntil(
      `:header:contains(${end})`
    )
    // expect innerText is `paras.text()`
    let chapter = new ChapterStruct(start)
    let textList = paras.text().split(/\n\s*\n/)
    textList.forEach(para => {
      if (para) {
        chapter.push(para)
      }
    })
    chapter.seal()
    book.add(chapter)
    console.timeEnd('chapter calc time')
  }

  // 移除定位符
  delete contents[contents.length-1]
}

const _bookInfo = ($, book) => {
  let bookInfo = {}
  $('pre')[0].attribs.id = 'first-pre'
  let infoText = $('pre').eq(0).text()
  infoText.split('\n').forEach(line => {
    if (!line.includes(':')) { return }
    let [k, v] = line.split(':')
    if (k && v) {
      bookInfo[k] = v
    }
  })
  book.bookInfo = bookInfo
  debugger
}

global.s = new Spider(urlMap[0].url)
s.insQueue = [_contents, _buildBook, _bookInfo]
s.run().then(()=>console.log('init finished'))

module.exports = Spider
