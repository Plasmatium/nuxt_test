// Stats stands for statistics

/**
 * 获取一章节的统计信息
 * @param  {[type]} paras [description]
 * @return {[type]}       [description]
 */
const _getChptStats = (paras) => {
  let rslt = {
    parasCount: paras.length,
    wordsCount: 0,
    charsCount: 0,
    freq: {}
  }
  paras.forEach(para => {
    let wordsMatch = para.match(/\b([\w\'\.]+)\b/g) || []
    rslt.wordsCount += wordsMatch.length
    rslt.charsCount += para.length

    wordsMatch.forEach(word => {
      // 如果word全大写，就是I或者术语缩写，作为key不变，否则全小写
      if (word !== word.toUpperCase()) {
        word = word.toLowerCase()
      }
      if (!(word in rslt.freq)) {
        rslt.freq[word] = 1
      } else {
        rslt.freq[word]++
      }
    })
  })
  return rslt
}

/**
 * 章节结构，由标题和多个段落组成，段落组织为原生Array
 * @type {[type]}
 */
const ChapterStruct = class {
  constructor (title) {
    this.title = title
    this.paras = []
    this.stats = null

    this.push = this.paras.push.bind(this.paras)
    this.forEach = this.paras.forEach.bind(this.paras)
  }
  seal () {
    this.stats = _getChptStats(this.paras)
  }
  statsMergeTo (totalStats) {
    if (this.stats === null) {
      throw Error(
        'stats of ChapterStruct is null, title is ' + this.title)
    }
    ['parasCount', 'wordsCount', 'charsCount'].forEach(key => {
      totalStats[key] += this.stats[key]
    })
    Object.entries(this.stats.freq).forEach(([word, count]) => {
      if (totalStats.freq[word] === undefined) {
        totalStats.freq[word] += count
      } else {
        totalStats.freq[word] = count
      }
    })
  }
}

/**
 * 书结构，由书名和多个章节（ChapterStruct）以及其他（附录，前言等）组成
 * @type {[type]}
 */
const BookStruct = class {
  constructor (bookName=null, bookInfo=null) {
    this.bookName = bookName
    this.bookInfo = bookInfo
    this.chapters = []
    this.stats = {
      chptsCount: 0,
      parasCount: 0,
      wordsCount: 0,
      charsCount: 0,
      freq: {}
    }

    this.push = this.chapters.push.bind(this.chapters)
    this.forEach = this.chapters.forEach.bind(this.chapters)
  }
  add (chapter) {
    this.push(chapter)
    this.stats.chptsCount++
    chapter.statsMergeTo(this.stats)
  }
}

module.exports = {BookStruct, ChapterStruct}
