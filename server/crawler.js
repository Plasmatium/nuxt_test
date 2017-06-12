// demo url
const url = 'http://www.gutenberg.org/files/11/11-0.txt'

const axios = require('axios')
const fs = require('fs')
const {ChapterStruct, BookStruct} = require('./text/structs')

const isChapterHead = (para) => {
  // 必须只有一行
  if (para.trim().includes('\n')) { return false }
  // 非字母开头不算
  if (!/^[a-zA-Z0-9]/.test(para)) { return false }
  // 包含chapter，无论大小写，都是一个标题
  if (/chapter/i.test(para)) { return true }
  // 所有字母都是大写的
  if (para.toUpperCase() === para) { return true }
  return false
}

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
    if (!line.includes(':')) { return }
    let [k, v] = line.split(':')
    return {[k.trim()]: v.trim()}
  })
  metaInfo = Object.assign({}, ...metaInfo)

  // Pour into main structure
  let mainParaList = paraList.slice(startIdx+1, endIdx)
  let book = new BookStruct(metaInfo.Title, metaInfo)
  let currChpt = null
  mainParaList.forEach(para => {
    if (isChapterHead(para)) {
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

const fetchAll = () => {
  let booksdata = urlMap.map(bookInfo => {
    console.log('\n--------\nfetching:', bookInfo.name)
    return fetch(bookInfo.url).then(data => {
      console.log(bookInfo.name, 'OK!\n')
      return data
    })
  })
}

module.exports = {fetch, url, urlMap, fetchAll}
