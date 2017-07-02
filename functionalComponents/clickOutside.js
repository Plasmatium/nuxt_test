
const testSet = {}
const globalHandler = (e) => {
  Object.values(testSet).forEach(({handler, el}) => {
    if (el.contains(e.target)) { return false }
    if (handler) { handler(e) }
  })
}

export default {
  directives: {
    clickOutside: {
      bind: function (el, binding, vnode) {
        let handler = binding.value
        testSet[el] = {handler, el}
        document.addEventListener('click', globalHandler, true)
      }
    },
    unbind: function (el) {
      delete testSet[el]
    }
  }
}
