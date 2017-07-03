// booklist.js
// fetch book, and cache
const fs = require('fs')
const path = require('path')
const {Spider} = require('./spider')
const {isEqTitle} = require('./utils')

// ------------------URL
const booklist = [
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
  }, {
    name: `BLACK BEAUTY`,
    url: 'http://www.gutenberg.org/files/271/271-h/271-h.htm'
  }
]

const fetch = async (id) => {
  id = id.slice(1)
  let bookItem = booklist[id]
  let book = null
  if (!bookItem.name) {
    throw Error(`Fetch book failed, book not exist. id: ${id}`)
  }

  let cacheList = null
  let cachedir = path.join(__dirname, '../cache')
  try {
    cacheList = fs.readdirSync(cachedir)
  } catch (err) {
    console.error('path of cache dir is not exist!')
    console.error('details:\n', err.stack)
    return
  }

  cacheList.forEach(filename => {
    if (isEqTitle(filename, bookItem.name)) {
      book = JSON.parse(fs.readFileSync(path.join(cachedir, filename)))
    }
  })

  if (!book) {
    let spider = new Spider(bookItem)
    await spider.run(true)
    spider.dump()
    book = spider.book
  }

  return book
}

// fetch('a2').then(book => console.log(book.chapters.length))

module.exports = {booklist, fetch}
