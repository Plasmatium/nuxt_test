const clickOutsideAdd = (state, {el, handler}) => {
  let count = state.count++
  state.testSet[count] = {el, handler}
  el.__clickOutsideCount__ = count
}

const clickOutsideRemove = (state, {el}) => {
  delete state.testSet[el.__clickOutsideCount__]
}

const moduleclickOutside = {
  state: {
    count: 0,
    testSet: {}
  },
  mutations: {
    clickOutsideAdd,
    clickOutsideRemove
  }
}

const globalHandler = (e) => {
  let {testSet} = moduleclickOutside.state
  Object.values(testSet).forEach(({handler, el}) => {
    if (el.contains(e.target)) { return false }
    if (handler) { handler(e) }
  })
}

export default {
  bind: function (el, binding, vnode) {
    // TODO: move 'helper' into $store
    let store = vnode.context.$store
    if (!store.state.moduleclickOutside) {
      store.registerModule('moduleclickOutside', moduleclickOutside)
    }

    let handler = binding.value
    store.commit('clickOutsideAdd', {el, handler})
    document.body.addEventListener('click', globalHandler, true)
  },
  unbind: function (el, binding, vnode) {
    vnode.context.$store.commit('clickOutsideRemove', {el})
  }
}
