// demo url
const url = 'http://www.gutenberg.org/files/11/11-0.txt'

const axios = require('axios')
const fs = require('fs')
const {ChapterStruct, BookStruct} = require('./text/structs')

const fetch = async (url) => {
  let {data} = await axios.get(url)

  // \r\n => \n
  data = data.replace(/\r\n/g, '\n')
  // Split to part, \n\n(paragraph)\n\n is the pattern
  let paraList = []
  data.split('\n\n').forEach(p => {
    if (!p) { return }
    paraList.push(p.trim())
  })
  // Find start & end index
  let startIdx, endIdx
  paraList.forEach((para, idx) => {
    if (para.includes('*** START OF THIS PROJECT GUTENBERG EBOOK')) {
      startIdx = idx
    }
    if (para.includes('End of Project Gutenberg')) {
      endIdx = idx
    }
  })
  // Refine meta
  // Meta from para3 to startIdx
  let metaList = paraList.slice(2, startIdx)
  // merge, then split, because some of paras contain more
  // then one line
  metaList = metaList.join('\n').split('\n')
  let metaInfo = metaList.map(line => {
    let [k, v] = line.split(':')
    return {[k.trim()]: v.trim()}
  })
  metaInfo = Object.assign({}, ...metaInfo)

  // Pour into main structure
  let mainParaList = paraList.slice(startIdx+1, endIdx)
  let book = new BookStruct(metaInfo.Title, metaInfo)
  let currChpt = null
  mainParaList.forEach(para => {
    if (para.includes('CHAPTER')) {
      if (currChpt) {
        currChpt.seal()
        book.add(currChpt)
      }
      currChpt = new ChapterStruct(para)
    } else {
      if (!currChpt) { return }
        currChpt.push(para)
    }
  })
  // Don't forget the last chapter
  currChpt.seal()
  book.add(currChpt)
  console.log(book.bookName)
  return book
}

urlMap = [
  {
    name: "Alice",
    url: 'http://www.gutenberg.org/files/11/11-0.txt'
  }, {
    name: "thirty-nine",
    url: 'http://www.gutenberg.org/cache/epub/558/pg558.txt'
  }, {
    name:
  }
]

module.exports = {fetch, url}
