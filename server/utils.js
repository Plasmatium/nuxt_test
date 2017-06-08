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

module.exports = {seed, rand, randInt}
