import clickOutside from '~/functionalComponents/clickOutside.mixin'

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
        if (elm.hasAttribute('except-expand')) {
          return false
        } else if (elm.hasAttribute('close-expand')) {
          this.elShrink()
        } else {
          this.elExpand()
        }
      }
    },
    elExpand () {
      this.$el.classList.add(this.expandClassName)
      this.isExpand = true
      console.log(this.$el, 'expand')
    },
    elShrink () {
      this.$el.classList.remove(this.expandClassName)
      this.isExpand = false
      console.log(this.$el, 'shrink')
    }
  },
  data () {
    return {
      expandClassName: 'expand',
      isExpand: false
    }
  }
}
