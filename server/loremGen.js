const {randInt, rand, decodeQuery, qs} = require('./utils')
const {BookStruct, ChapterStruct} = require('./text/structs')
const {fetch, urlMap} = require('./crawler')

const wlist = `lorem,ipsum,dolor,sit,amet,consectetur,adipisicing,elit,officiis,assumenda,illum,minima,incidunt,aut,temporibus,vitae,repellat,harum,a,commodi,rerum,nostrum,ratione,cupiditate,nemo,tenetur,reprehenderit,facere,voluptatibus,doloremque,at,obcaecati,id,praesentium,quod,explicabo,illo,ipsam,quaerat,dignissimos,iusto,ullam,odit,quae,expedita,ipsa,reiciendis,quibusdam,voluptas,atque,nihil,eos,sunt,aperiam,voluptatem,maiores,earum,totam,fuga,molestiae,quis,necessitatibus,tempore,accusamus,aliquam,possimus,perspiciatis,consequuntur,ut,laborum,repellendus,magni,sequi,officia,ex,est,animi,asperiores,beatae,provident,culpa,esse,nulla,velit,sint,numquam,sapiente,placeat,laboriosam,iste,error,omnis,cum,optio,veniam,dolores,enim,quam,doloribus,ea,deleniti,quidem,eligendi,quo,unde,aspernatur,et,similique,corrupti,tempora,debitis,excepturi,ad,ab,nobis,cumque,adipisci,molestias,hic,nam,autem,exercitationem,eius,vero,eveniet,veritatis,ducimus,modi,laudantium,soluta,maxime,rem,deserunt,repudiandae,suscipit,recusandae,natus,magnam,facilis,perferendis,corporis,quisquam,odio,voluptates,distinctio,blanditiis,saepe,mollitia,accusantium,minus,vel,porro,qui,voluptate,sed,fugiat,inventore,architecto,nisi,dolorum,voluptatum,quas,non,quasi,eaque,alias,libero,pariatur,fugit,impedit,neque,dicta,quos,nesciunt,eum,delectus,dolorem,dolore,iure,in,labore,aliquid,itaque,consequatur,quia`.split(',')

const punclist = ',,,,,,............................!!!??:'

const createSentence = (x = 3, y = 20) => {
  let r = randInt(x, y)
  let idx = []
  for (let i = 0; i < r; i++) {
    idx.push(randInt(0, 185))
  }
  let rslt = idx.map(i => {
    return wlist[i]
  }).join(' ')

  let punc = punclist[randInt(0, 40)] + ' '
  return rslt.replace(/(^\w)/g, m => m.toUpperCase()) + punc
}

const createPara = (x = 1, y = 15) => {
  let s = randInt(x, y)
  let rslt = []
  for (let i = 0; i < s; i++) {
    rslt.push(createSentence())
  }
  return rslt.join('')
}

const createTitle = () => {
  let title = createSentence(1, 7).slice(0, -2)
  return title.replace(/(\b\w?)/g, m => m.toUpperCase())
}

// --- reconstruction ---
const createChapter = (x = 1, y = 50) => {
  let title = createTitle()
  let chapter = new ChapterStruct(title)
  let s = randInt(x, y)
  for (let i = 0; i < s; i++) {
    chapter.push(createPara())
  }
  chapter.seal()
  return chapter
}

const createBook = (chptlength) => {
  let bookName = createTitle()
  let book = new BookStruct(bookName)
  for (let i = 0; i < chptlength; i++) {
    let chpt = createChapter()
    book.add(chpt)
  }
  return book
}
// --- END ---

const bookCollection = {}

module.exports = (req, res) => {
  let {q} = req.query
  let {bookID, chptnum} = decodeQuery(q, true)
  console.log({bookID, chptnum})

  // below is temporary code
  if (!isNaN(Number(bookID))) {
    let chapter
    if (isNaN(Number(bookID)) || isNaN(Number(chptnum))) {
      errStr = `bookID or chptnum is not a number
      bookID: ${bookID}, chptnum: ${chptnum}`
      console.error(errStr)
      throw TypeError(errStr)
    }

    let book
    if (!(bookID in bookCollection)) {
      console.log(`Creating essay, id: ${bookID}.`)
      book = createBook(bookID)
      bookCollection[bookID] = book
    } else {
      book = bookCollection[bookID]
      console.log('hit cache: ', bookID, book.bookName)
    }

    // assume chapter starts from chapter-one, not zero
    chapter = book.chapters[chptnum - 1]
    if (!chapter) {
      let errStr = 'chapter not exist: chapter: ' + chptnum
      console.error(errStr)
      throw TypeError(errStr)
    }
    // chapter传送时可能是通过JSON.stringify打包，所以会丢失title，
    // 因此此处重新打包显式发送，而paras可直接由chapter表示，因为丢失了
    // title，stats等，只剩下paras数组
    res.send({
      bookName: book.bookName,
      chptName: chapter.title,
      bookStats: book.stats,
      chptStats: chapter.stats,
      paras: chapter.paras
    })
  } else {
    // very urgly here !!!!!!!!!!!
    // TODO: !!!
    let b = urlMap[bookID[1]]
    let url = b.url
    if (bookCollection[b.name]) {
      let book = bookCollection[b.name]
      let chapter = book.chapters[chptnum - 1]
      res.send({
        bookName: book.bookName,
        chptName: chapter.title,
        bookStats: book.stats,
        chptStats: chapter.stats,
        paras: chapter.paras,
        pvt_data: book
      })
    } else {
      fetch(url).then(book => {
        bookCollection[b.name] = book
        console.log(book)
        let chapter = book.chapters[chptnum - 1]
        res.send({
          bookName: book.bookName,
          chptName: chapter.title,
          bookStats: book.stats,
          chptStats: chapter.stats,
          paras: chapter.paras,
          pvt_data: book
        })
      })
    }
  }
}
