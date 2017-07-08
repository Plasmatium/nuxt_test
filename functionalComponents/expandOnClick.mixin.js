import clickOutside from '~/functionalComponents/clickOutside.mixin'
import {getUID} from '~/server/utils'
// const immutable = require('object-path-immutable')

export default {
  mixins: [clickOutside],
  methods: {
    clickOutsideHandler ({isClickOutside, e}) {
      if (isClickOutside) {
        // 点击外部，若处于打开状态，则关闭
        if (!this.isExpand) { return }
        this.elShrink()
      } else {
        // 点击内部时，点在except-expand上，不动作
        // 点在close-expand上，关闭
        // 点在其他地方，打开
        let elm = e.target
        if (elm.hasAttribute(this.exceptExpand)) {
          return false
        } else if (elm.hasAttribute(this.closeExpand)) {
          this.elShrink()
        } else {
          this.elExpand()
        }
      }
    },
    elExpand () {
      // setTimeout(() => this.$el.classList.add(this.expandClassName), 0)
      // this.$el.classList.add(this.expandClassName)
      // DO NOT MODIFY this.$el DIRECTLY
      this.isExpand = true
    },
    elShrink () {
      // setTimeout(() => this.$el.classList.remove(this.expandClassName), 0)
      // this.$el.classList.remove(this.expandClassName)
      // DO NOT MODIFY this.$el DIRECTLY
      this.isExpand = false
    }
  },
  data () {
    return {
      expandClassName: 'expand',
      isExpand: false
    }
  },
  computed: {
    exceptExpand () {
      return 'except-expand-' + getUID()
    },
    closeExpand () {
      return 'close-expand-' + getUID()
    }
  },
  directives: {
    'close-expand': {
      bind (el, binding, vnode) {
        el.setAttribute(vnode.context.closeExpand, '')
      }
    },
    'except-expand': {
      bind (el, binding, vnode) {
        el.setAttribute(vnode.context.exceptExpand, '')
      }
    }
  }
}
