// --- spider.js ---
// class Spider

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const {BookStruct, ChapterStruct} = require('./text/structs')
const {isEqTitle} = require('./utils')

// ------------------URL
const urlMap = [
  {
    name: `ALICE’S ADVENTURES IN WONDERLAND`,
    url: 'http://www.gutenberg.org/files/11/11-h/11-h.htm'
  }, {
    name: `THE RETURN OF THE O'MAHONY`,
    url: 'http://www.gutenberg.org/files/54900/54900-h/54900-h.htm'
  }, {
    name: `THE THIRTY-NINE STEPS`,
    url: 'http://www.gutenberg.org/files/558/558-h/558-h.htm'
  }, {
    name: `PRIDE AND PREJUDICE`,
    url: 'http://www.gutenberg.org/files/1342/1342-h/1342-h.htm'
  }, {
    name: `SENSE AND SENSIBILITY`,
    url: 'http://www.gutenberg.org/files/161/161-h/161-h.htm'
  }, {
    name: `MANSFIELD PARK`,
    url: 'http://www.gutenberg.org/files/141/141-h/141-h.htm'
  }, {
    name: `EMMA`,
    url: 'http://www.gutenberg.org/files/158/158-h/158-h.htm'
  }
]

const _getHighestTag = (tag) => {
  let rslt = tag[0]
  while (rslt.parent.name !== 'body') {
    rslt = rslt.parent
  }
  return rslt
}

// ----------------------------------------------------------------

const Spider = class {
  constructor (item) {
    this.url = item.url
    this.bookName = item.name
    this.dom = null
    this.insQueue = []
  }

  dump (dir='../cache/') {
    dir = path.join(__dirname, dir)
    try {
      fs.readdirSync(dir)
    } catch (err) {
      console.error(`Spider dump file error, dir not exist: ${dir}`)
      console.error('details:\n', err.stack)
    }

    if (!this.book.bookName) {
      // TODO: logInfo()
      throw Error('book name not exist')
    }

    let jsonStr = JSON.stringify(this.book)
    let filepath = path.join(dir, this.book.bookName)
    fs.writeFileSync(filepath, jsonStr, 'utf-8')
  }

  async init () {
    let {data} = await axios.get(this.url).catch(err => {
      console.error('Spider init failed, maybe the url or web is broken.')
      console.error('url is:', this.url)
      console.error(err.stack)
    })

    this.book = new BookStruct()
    this.dom = cheerio.load(data)
    this.insQueue = [_bookInfo, _contents, _buildBook]
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
  $.ahrefs = []
  for (let idx=0; idx<anchors.length; idx++) {
    // 有时候title文字里面有换行和多余空格，此处全部正则替换为一个空格
    let title = anchors.eq(idx).text().trim().replace(/\s+/g, ' ')
    if (title) {
      if (isEqTitle(title, book.bookName)) { continue }
      contents.push(title)
      $.ahrefs.push(anchors[idx].attribs.href.slice(1))
    }
  }
  book.contents = contents
}

const _buildBook = ($, book) => {
  let contents = book.contents

  // 插入最后章节前的定位，this is a trick
  let endStr = '!1=2=3=4= THE END ====!' + new Date()
  $.ahrefs.push(endStr)
  $('pre').eq(-1).before(`<a name="${endStr}" id="${endStr}"></a>`)
  $(`a[name="${endStr}"]`)[0].parent = {name: 'body'}

  for (let i=0; i<$.ahrefs.length-1; i++) {
    let title = contents[i]
    let prompStr = `dealing with ${title}`
    console.time(title)

    let chapter = new ChapterStruct(title)

    let start = $.ahrefs[i]
    let end = $.ahrefs[i+1]
    let startTag = _getHighestTag($(`a[name="${start}"]`))
    let endTag = _getHighestTag($(`a[name="${end}"]`))
    let rawText = $(startTag).nextUntil(endTag)
    let textList = rawText.text().split(/\n\s*\n/)
    textList.forEach(para => {
      if (!para.trim()) { return }
      if (isEqTitle(para.trim(), title.trim())) { return }
      chapter.push(para)
    })
    chapter.seal()
    book.add(chapter)

    console.timeEnd(title)
  }
  contents.pop()
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
  book.bookName = bookInfo.Title || bookInfo.title
  book.bookInfo = bookInfo
}

// console.log('****************debugging spider*********************')
// global.s = new Spider(urlMap[3])
// s.insQueue = [_bookInfo, _contents, _buildBook]
// s.run().then(()=>console.log('init finished'))

module.exports = {Spider, urlMap}
