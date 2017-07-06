<!-- <template lang="html">
  <div class="dropdown">
    <slot name="dropdown-button">
      <button class="btn btn-secondary dropdown-toggle" type="button">
        Dropdown button
      </button>
    </slot>
    <div class="dropdown-menu">
      <slot name="dropdown-items">
      </slot>
    </div>
  </div>
</template> -->

<script>
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'

export default {
  mixins: [expandOnClick],
  data () {
    return {
      expandClassName: 'show'
    }
  },
  render (h) {
    let dropdownButton = this.$slots['dropdown-button'][0]
    let classList = dropdownButton.data.staticClass.split(/\s/)
    let idx = classList.indexOf('close-expand')
    if (idx >= 0) { classList.splice(idx, 1) }
    if (this.isExpand) {
      classList.push('close-expand')
    }
    dropdownButton.data.staticClass = classList.join(' ')
    let dropdownItems = this.$slots['dropdown-items']
    dropdownItems.forEach(item => {
      let classList = item.data.staticClass.split(/\s/)
      let idx = classList.indexOf('close-expand')
      if (idx >= 0) { classList.splice(idx, 1) }
      classList.push('close-expand')
      item.data.staticClass = classList.join(' ')
    })
    console.log(dropdownButton.data.staticClass)
    console.log(!this.$el ? 'null' : this.$el.classList)
    return (
      <div class="dropdown">
        {dropdownButton}
        <div class="dropdown-menu">{dropdownItems}</div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
</style>
