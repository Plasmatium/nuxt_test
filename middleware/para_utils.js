export const deDup = allwords => {
  let list = []
  allwords.forEach(word => {
    if (!list.includes(word)) {
      list.push(word)
    }
  })
  return list
}

export const pureWord = str => {
  return str.toLowerCase().replace(/[^a-zA-Z ]+/g, '')
}

const wlist = `lorem,ipsum,dolor,sit,amet,consectetur,adipisicing,elit,officiis,assumenda,illum,minima,incidunt,aut,temporibus,vitae,repellat,harum,a,commodi,rerum,nostrum,ratione,cupiditate,nemo,tenetur,reprehenderit,facere,voluptatibus,doloremque,at,obcaecati,id,praesentium,quod,explicabo,illo,ipsam,quaerat,dignissimos,iusto,ullam,odit,quae,expedita,ipsa,reiciendis,quibusdam,voluptas,atque,nihil,eos,sunt,aperiam,voluptatem,maiores,earum,totam,fuga,molestiae,quis,necessitatibus,tempore,accusamus,aliquam,possimus,perspiciatis,consequuntur,ut,laborum,repellendus,magni,sequi,officia,ex,est,animi,asperiores,beatae,provident,culpa,esse,nulla,velit,sint,numquam,sapiente,placeat,laboriosam,iste,error,omnis,cum,optio,veniam,dolores,enim,quam,doloribus,ea,deleniti,quidem,eligendi,quo,unde,aspernatur,et,similique,corrupti,tempora,debitis,excepturi,ad,ab,nobis,cumque,adipisci,molestias,hic,nam,autem,exercitationem,eius,vero,eveniet,veritatis,ducimus,modi,laudantium,soluta,maxime,rem,deserunt,repudiandae,suscipit,recusandae,natus,magnam,facilis,perferendis,corporis,quisquam,odio,voluptates,distinctio,blanditiis,saepe,mollitia,accusantium,minus,vel,porro,qui,voluptate,sed,fugiat,inventore,architecto,nisi,dolorum,voluptatum,quas,non,quasi,eaque,alias,libero,pariatur,fugit,impedit,neque,dicta,quos,nesciunt,eum,delectus,dolorem,dolore,iure,in,labore,aliquid,itaque,consequatur,quia`.split(',')

const punclist = ',,,,,,............................!!!??:'

export const randInt = (x, y) => {
  let r = Math.random() * (y - x) + x
  return Math.floor(r)
}

export const createSentence = (x = 3, y = 20) => {
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

export const createPara = (x = 1, y = 15) => {
  let s = randInt(x, y)
  let rslt = []
  for (let i = 0; i < s; i++) {
    rslt.push(createSentence())
  }

  return rslt.join('')
}

export const createTitle = () => {
  let title = createSentence(1, 7).slice(0, -2)
  return title.replace(/(\b\w?)/g, m => m.toUpperCase())
}

export const createEssay = (paraLength) => {
  const essayStruct = []
  let currPara = []
  currPara.push(createPara())
  let currChpt = [createTitle(), currPara]
  essayStruct.push(currChpt)

  for (let i = 0; i < paraLength;) {
    if (Math.random() > 0.95) {
      // this is for title
      currPara = []
      currPara.push(createPara())
      currChpt = [createTitle(), currPara]
      essayStruct.push(currChpt)
      continue
    }

    currPara.push(createPara())
    ++i
  }

  return essayStruct
}
