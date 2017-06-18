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
    name: `THE RETURN OF THE O'MAHONY`,
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

  let contents = [];
  for (let idx=0; idx<anchors.length; idx++) {
    // 有时候title文字里面有换行和多余空格，此处全部正则替换为一个空格
    let title = anchors.eq(idx).text().trim().replace(/\s+/g, ' ')
    if (title) {
      // 排除该目录title就是书名，有些目录第一条是书名
      // 另外考虑到文章在录入时人为疏忽写错的内容，比如：
      // ’和'的区别，这部分通过regexp把所有非字母替换成
      // 短横'-'
      let refinedTitle = title.toLowerCase().replace(/\W/g, '-')
      let refinedBookName = book.bookName.toLowerCase().replace(/\W/g, '-')
      if (refinedTitle === refinedBookName) { continue }
      contents.push(title)
    }
  }
  book.contents = contents
}

const _buildBook = ($, book) => {
  let contents = book.contents

  // 插入最后章节前的定位
  let endStr = '<1=2=3=4= THE END ====>' + new Date()
  contents.push(endStr)
  $('pre').eq(-1).before(`<h3>${endStr}</h3>`)

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
  let infoText = $('pre').eq(0).text()
  infoText.split('\n').forEach(line => {
    if (!line.includes(':')) { return }
    let [k, v] = line.split(':')
    k = k.trim()
    v = v.trim()
    if (k && v) {
      bookInfo[k] = v
    }
  })
  book.bookName = bookInfo.Title || bookInfo.titles
  book.bookInfo = bookInfo
}

global.s = new Spider(urlMap[1].url)
s.insQueue = [_bookInfo, _contents, _buildBook]
s.run().then(()=>console.log('init finished'))

module.exports = Spider
