// const helper = {
//   testSet: {},
//   count: 0
// }
// helper.add = ({el, handler}) => {
//   el.__count__ = helper.count
//   helper.count++
//   helper.testSet[helper.count] = {el, handler}
// }
// helper.remove = (el) => {
//   delete helper.testSet[el.__count__]
// }

const clickoutsideAdd = (state, {el, handler}) => {
  let count = state.count++
  state.testSet[count] = {el, handler}
  el.__count__ = count
}

const clickoutsideRemove = (state, {el}) => {
  delete state.testSet[el.__count__]
}

const moduleClickoutside = {
  state: {
    count: 0,
    testSet: {}
  },
  mutations: {
    clickoutsideAdd,
    clickoutsideRemove
  }
}

const globalHandler = (e) => {
  let {testSet} = moduleClickoutside.state
  Object.values(testSet).forEach(({handler, el}) => {
    if (el.contains(e.target)) { return false }
    if (handler) { handler(e) }
  })
}

export default {
  bind: function (el, binding, vnode) {
    // TODO: move 'helper' into $store
    let store = vnode.context.$store
    if (!store.state.moduleClickoutside) {
      store.registerModule('moduleClickoutside', moduleClickoutside)
    }

    let handler = binding.value
    store.commit('clickoutsideAdd', {el, handler})
    document.body.addEventListener('click', globalHandler, true)
  },
  unbind: function (el, binding, vnode) {
    vnode.context.$store.commit('clickoutsideRemove', {el})
  }
}
