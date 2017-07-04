import clickOutside from '~/functionalComponents/clickOutside'

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
        let {exceptList, closeList} = vm
        let expandClassName = binding.value || 'expand'
        let value = (e) => {
          // insert click outside handler
          // which is remove expandClassName
          removeClass(el, expandClassName)
        }
        clickOutside.bind(el, {value}, vnode)

        // add onClick to expand
        // avoid exceptList & closeList
        const expandHandler = (e) => {
          if (exceptList.includes(e.target)) { return false }
          if (closeList.includes(e.target)) { return false }
          addClass(el, expandClassName)
        }
        const closeExpandHandler = (e) => {
          removeClass(el, expandClassName)
        }

        closeList.forEach(elm => {
          elm.addEventListener('click', closeExpandHandler)
        })
        el.addEventListener('click', expandHandler)

        el.__expandHandler__ = expandHandler
        el.__closeExpandHandler__ = closeExpandHandler
      },
      unbind: function (el, binding, vnode) {
        clickOutside.unbind(el, binding, vnode)
        let vm = vnode.context
        let {closeList} = vm

        closeList.forEach(elm => {
          elm.removeEventListener('click', el.__closeExpandHandler__)
        })
        el.removeEventListener('click', el.__expandHandler__)
      }
    },

    closeExpand: {
      bind: function (el, binding, vnode) {
        let vm = vnode.context
        let {closeList} = vm
        closeList.push(el)
      },
      unbind: function (el, binding, vnode) {
        let vm = vnode.context
        let {closeList} = vm
        let idx = closeList.indexOf(el)
        if (idx !== -1) { closeList.splice(idx, 1) }
      }
    },

    exceptExpand: {
      bind: function (el, binding, vnode) {
        let vm = vnode.context
        let {exceptList} = vm
        exceptList.push(el)
      },
      unbind: function (el, binding, vnode) {
        let vm = vnode.context
        let {exceptList} = vm
        let idx = exceptList.indexOf(el)
        if (idx !== -1) { exceptList.splice(idx, 1) }
      }
    }
  },
  data () {
    return {
      exceptList: [],
      closeList: []
    }
  }
}
