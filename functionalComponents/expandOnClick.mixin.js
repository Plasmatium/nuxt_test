// This mixin implement the behavior when click inside or outside of an element
// click to expand, and click outside or specified close-element to shrink
// use v-expandOnClick on the root node in .vue file
import {mapState, mapMutations} from 'vuex'

// This code is jQuery's
function addClass (elem, value) {
  let rspaces = /\s+/
  let classNames = (value || '').split(rspaces)
  let className = ' ' + elem.className + ' '
  let setClass = elem.className
  for (let c = 0, cl = classNames.length; c < cl; c++) {
    if (className.indexOf(' ' + classNames[c] + ' ') < 0) {
      setClass += ' ' + classNames[c]
    }
  }
  elem.className = setClass.replace(/^\s+|\s+$/g, '')
}

// This code is jQuery's
function removeClass (elem, value) {
  let rspaces = /\s+/
  let rclass = /[\n\t]/g
  let classNames = (value || '').split(rspaces)
  let className = (' ' + elem.className + ' ').replace(rclass, ' ')
  for (let c = 0, cl = classNames.length; c < cl; c++) {
    className = className.replace(' ' + classNames[c] + ' ', ' ')
  }
  elem.className = className.replace(/^\s+|\s+$/g, '')
}

// ----------------------------mixin------------------------------
export default {
  directives: {
    expandOnClick: {
      bind: function (el, binding, vnode) {
        let vm = vnode.context
        let {$store, exceptList, closeList} = vm
        // TODO: here, e.target maybe contained by el in closeList or exceptList
        let handle = (e) => {
          e.stopPropagation()
          if (exceptList.includes(e.target)) {
            return
          } else if (closeList.includes(e.target)) {
            $store.commit('showMenu', {menu: null})
          } else if (el.contains(e.target)) {
            $store.commit('showMenu', {menu: el})
          }
        }

        el.addEventListener('click', handle)
        el.__expandOnClickHandler__ = handle
      },
      unbind: function (el) {
        el.removeEventListener('click', el.__expandOnClickHandler__)
      }
    },

    closeExpand: {
      bind: function (el, binding, vnode) {
        let vm = vnode.context
        let {closeList} = vm
        closeList.push(el)
      }
    },

    exceptExpand: {
      bind: function (el, binding, vnode) {
        let vm = vnode.context
        let {exceptList} = vm
        exceptList.push(el)
      }
    }
  },
  data () {
    return {
      exceptList: [],
      closeList: []
    }
  },
  computed: {
    ...mapState(['currMenu'])
  },
  methods: {
    ...mapMutations(['showMenu'])
  },
  watch: {
    currMenu (val, oldVal) {
      let shouldExpand = val === this.$el
      shouldExpand ? addClass(this.$el, 'expand') : removeClass(this.$el, 'expand')
    }
  }
}
