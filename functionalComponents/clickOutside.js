const helper = {
  testSet: {},
  count: 0
}
helper.add = ({el, handler}) => {
  el.__count__ = helper.count
  helper.count++
  helper.testSet[helper.count] = {el, handler}
}
helper.remove = (el) => {
  delete helper.testSet[el.__count__]
}

const globalHandler = (e) => {
  let {testSet} = helper
  Object.values(testSet).forEach(({handler, el}) => {
    if (el.contains(e.target)) { return false }
    if (handler) { handler(e) }
  })
}

export default {
  bind: function (el, binding, vnode) {
    // TODO: move 'helper' into $store
    let handler = binding.value
    helper.add({el, handler})
    document.body.addEventListener('click', globalHandler, true)
  },
  unbind: function (el) {
    helper.remove(el)
  }
}
