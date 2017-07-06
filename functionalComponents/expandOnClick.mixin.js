import clickOutside from '~/functionalComponents/clickOutside.mixin'

export default {
  mixins: [clickOutside],
  methods: {
    clickOutsideHandler ({isClickOutside, e}) {
      if (isClickOutside) {
        // 点击外部，关闭
        this.$el.shrink()
      } else {
        // 点击内部，点在except-expand上，不动作
        // 点在close-expand上，关闭
        // 点在其他地方，打开
        let elm = e.target
        if (elm.hasAttribute('except-expand')) {
          return false
        } else if (elm.hasAttribute('close-expand')) {
          this.$el.shrink()
        } else {
          this.$el.expand()
        }
      }
    }
  },
  data () {
    return {
      expandClassName: 'expand'
    }
  },
  mounted () {
    this.$el.expand = () => {
      this.$el.classList.add(this.expandClassName)
    }
    this.$el.shrink = () => {
      this.$el.classList.remove(this.expandClassName)
    }
  }
}
