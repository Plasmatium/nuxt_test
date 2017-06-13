// --- spider.js ---
// class Spider

// ------------------URL
const urlMap = [
  {
    name: 'Alice',
    url: 'http://www.gutenberg.org/files/11/11-0.txt'
  }, {
    name: 'thirty-nine',
    url: 'http://www.gutenberg.org/cache/epub/558/pg558.txt'
  }, {
    name: 'Pride and Prejudice',
    url: 'http://www.gutenberg.org/ebooks/42671.txt.utf-8'
  }, {
    name: 'Sense and Sensibility',
    url: 'http://www.gutenberg.org/cache/epub/21839/pg21839.txt'
  }, {
    name: 'Lady Susan',
    url: 'http://www.gutenberg.org/ebooks/946.txt.utf-8'
  }, {
    name: 'Love and Friendship [sic]',
    url: 'http://www.gutenberg.org/files/1212/1212-0.txt'
  }, {
    name: 'The Letter of Jane Austen',
    url: 'http://www.gutenberg.org/ebooks/42078.txt.utf-8'
  }
]

// -------------------------------------

const axios = require('axios')
const {ChapterStruct, BookStruct} = require('./text/structs')

const Spider = class {
  constructor (url) {
    this.url = url
    this.book = new BookStruct()
    this.funcQueue = []
  }

  async init () {
    let {data} = await axios.get(url).catch(err => {
      console.error('Fetching book failed, url may be broken.')
      console.error('Detials:', err)
    })

    // make data transform into paragraph list
    // \r\n => \n
    data = data.replace(/\r\n/g, '\n')
    // Split to parts, \n\n(paragraph)\n\n is the pattern
    let paraList = []
    data.split('\n\n').forEach(p => {
      if (!p) { return }
      paraList.push(p.trim())
    })
    this.raw = paraList
  }

  add (func, propName=null) {
    //assign propName
    if (!propName) {
      if (!func.name) {
        err = Error('process function must assign a name, or specify a propName')
        console.error(err.stack)
        throw err
      }
      propName = func.name
    }
    if (typeof func !== 'function') {
      throw Error(`${func} is not a Function.\nGot type ${typeof func}`)
    }
    this.funcQueue.push({func, propName})
  }

  async run () {
    await this.init()
    debugger
    this.funcQueue.forEach((processor, step) => {
      let {func, propName} = processor
      let result
      try {
        result = func(this.book, this.raw)
      } catch (err) {
        let errStr = `
          ${err.stack}

          *=*=*=*=*=*=*=*=*=*=

          Error occured in function run(),
          step: ${step}
          propName: ${propName}
          func: ${func}
          url: ${url}
          -----------------------------------------
          book name: ${this.book.bookName || 'undefined yet'}
          details: ${err}
        `
        console.error(errStr)
      }
      if (result !== undefined) {
        this.book[propName] = result
      }
    })
  }
}

const index = (book, raw) => {
  let start, end
  raw.forEach((para, idx) => {
    if (para.includes('*** START OF THIS PROJECT GUTENBERG EBOOK')) {
      start = idx
    }
    if (para.includes('End of Project Gutenberg')) {
      end = idx
    }
  })
  let body = {start, end}
  Object.assign(book, {index: {body}})
}

const info = (book, raw) => {
  // book info is ahead of the book text body
  let startIdx = book.index.body.start
  let metaList = raw.slice(0, startIdx)
  // merge, then split, because some of paras contain more
  // then one line
  metaList = metaList.join('\n').split('\n')
  let metaInfo = metaList.map(line => {
    if (!line.includes(':')) { return }
    let [k, v] = line.split(':')
    return {[k.trim()]: v.trim()}
  })
  return Object.assign({}, ...metaInfo)
}

// -------demo below

let steps = [index, info]
let url = urlMap[6].url
console.log(url)
let spider = new Spider(urlMap[6].url)
spider.init()

steps.forEach(step => {
  spider.add(step)
})

spider.run()
module.exports = spider
// ------demo end
