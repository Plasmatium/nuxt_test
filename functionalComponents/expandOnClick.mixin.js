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
  }
}
