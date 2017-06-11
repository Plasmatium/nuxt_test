// random feature
let seed = 75426545

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
  if (isServer) {
    queryStr = new Buffer(b64Str, 'base64').toString()
  } else {
    queryStr = atob(b64Str)
  }
  return qs.decode(queryStr)
}

module.exports = {seed, rand, randInt, encodeQuery, decodeQuery, qs}
