import Vue from 'vue'

// global vue directive
Vue.directive('expandOnClick', {
  bind: function (el, binding, vnode) {
    let $store = vnode.context.$store
    let handle = (e) => {
      if (el.contains(e.target)) {
        $store.commit('showMenu', {menu: el})
        e.stopPropagation()
      }
    }
    el.addEventListener('click', handle)
    el.__expandOnClickHandler__ = handle
  },
  unbind: function (el) {
    el.removeEventListener('click')
  }
})
