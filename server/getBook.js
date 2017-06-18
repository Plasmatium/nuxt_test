// getBook.js
// used for express route middleware

const {fetch, booklist} = require('./booklist')
const {decodeQuery} = require('./utils')

const cache = {}

const getBook = async (req, res) => {
  let {q} = req.query
  let {bookID, chptnum} = decodeQuery(q, true)

  let book = null
  if (cache[bookID]) {
    book = cache[bookID]
  } else {
    book = await fetch(bookID)
    cache[bookID] = book
  }

  let chapter = book.chapters[chptnum - 1]
  if (!chapter) {
    res.redirect('/404.html')
  }
  let {bookInfo, contents} = book
  let bookStats = book.stats
  res.send({bookInfo, bookStats, chapter, contents})
}

module.exports = getBook
