const random = function (seed) {
  return Number('0.' + Math.sin(seed).toString().substr(6))
}
let seed = 10
let essay = null

const rand = () => {
  let r = random(seed)
  seed = r - 0.1
  return r
}

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
  let r = rand() * (y - x) + x
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

const createEssay = (paraLength) => {
  seed = paraLength
  const essayStruct = []
  let currPara = []
  currPara.push(createPara())
  let currChpt = [createTitle(), currPara]
  essayStruct.push(currChpt)

  for (let i = 0; i < paraLength;) {
    if (rand() > 0.95) {
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

/** route object likes below:
{ name: 'essays-essay_id',
  meta: {},
  path: '/essays/10000',
  hash: '',
  query: { chptnum: '0' },
  params: { essay_id: '10000' },
  fullPath: '/essays/10000?chptnum=0',
  matched:
   [ { path: '/essays/:essay_id?',
       regex: /^\/essays(?:\/((?:[^\/]+?)))?(?:\/(?=$))?$/i,
       components: [Object],
       instances: {},
       name: 'essays-essay_id',
       parent: undefined,
       matchAs: undefined,
       redirect: undefined,
       beforeEnter: undefined,
       meta: {},
       props: {} } ] }
***********************************/
export default async function ({ store, isServer, route }) {
  // create essay if essay_id is new
  let {query: {chptnum}, params} = route
  if (seed !== params.essay_id) {
    seed = params.essay_id
    essay = createEssay(seed)
  }
  chptnum = Number(chptnum)

  let prevChpt = essay[chptnum - 1] || null
  let currChpt = essay[chptnum] || null
  let nextChpt = essay[chptnum + 1] || null
  store.commit('injectEssayChunk', {prevChpt, currChpt, nextChpt, chptnum})
}
