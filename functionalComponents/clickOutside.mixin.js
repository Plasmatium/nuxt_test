export default {
  methods: {
    documentClickHandler (e) {
      let isClickOutside = !this.$el.contains(e.target)
      this.$emit('clickOutside', {isClickOutside, e})
    },
    clickOutsideHandler ({isClickOutside, e}) {
      console.warn('You should rewrite clickOutsideHandler', isClickOutside, e)
    }
  },
  mounted () {
    document.addEventListener('click', this.documentClickHandler)
    this.$on('clickOutside', this.clickOutsideHandler)
  },
  beforeDestory () {
    document.removeEventListener('click', this.documentClickHandler)
  }
}
