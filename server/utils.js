// random feature
let seed = 75426545
let UIDCount = 0

const random = function (seed) {
  return Number('0.' + Math.sin(seed).toString().substr(6))
}

const rand = () => {
  let r = random(seed)
  seed = r - 0.1
  return r
}

const randInt = (x, y) => {
  let r = rand() * (y - x) + x
  return Math.floor(r)
}

// encode & decode between query & base64 string
const qs = require('querystring')

/**
 * 传入query对象（eg. {q1: 'v1', q2: 'v2'})
 * 传出base64的url
 * @param  {Object}  query    [description]
 * @param  {Boolean} isServer [description]
 * @return {String}           [description]
 */
const encodeQuery = (query, isServer) => {
  let queryStr = qs.encode(query)
  if (isServer) {
    return new Buffer(queryStr).toString('base64')
  } else {
    return btoa(queryStr)
  }
}

/**
 * 传入base64的url
 * 传出query对象
 * @param  {[type]}  b64String [description]
 * @param  {Boolean} isServer  [description]
 * @return {[type]}            [description]
 */
const decodeQuery = (b64Str, isServer) => {
  let queryStr
  if (isServer === undefined) {
    throw Error('in function: decodeQuery, param: isServer is not specified!')
  }
  if (isServer) {
    queryStr = new Buffer(b64Str, 'base64').toString()
  } else {
    queryStr = atob(b64Str)
  }
  return qs.decode(queryStr)
}

const isEqTitle = (title1, title2) => {
  // 排除该目录title就是书名，有些目录第一条是书名
  // 另外考虑到文章在录入时人为疏忽写错的内容，比如：
  // ’和'的区别，这部分通过regexp把所有非字母替换成
  // 短横'-'
  title1 = title1.toLowerCase().replace(/\W/g, '-')
  title2 = title2.toLowerCase().replace(/\W/g, '-')
  return title1 === title2
}

const addClass = (classStr, name) => {
  let classList = classStr.split(/\s+/)
  return classList.reduce((rslt, klass) => {
    if (klass === '' || klass === name) { return rslt }
    return rslt + ' ' + klass
  }, name)
}

const removeClass = (classStr, name) => {
  let classList = classStr.split(/\s/)
  return classList.reduce((rslt, klass) => {
    if (klass === name || klass === '') { return rslt }
    return rslt + ' ' + klass
  }, '')
}

const getUID = () => {
  return `uid-${UIDCount++}`
}

module.exports = {
  seed,
  rand,
  randInt,
  encodeQuery,
  decodeQuery,
  qs,
  isEqTitle,
  addClass,
  removeClass,
  getUID
}
