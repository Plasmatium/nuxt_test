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
    let buttonDom = this.$slots['dropdown-button'][0]
    let shouldCloseExpand = this.isExpand
    console.log(shouldCloseExpand)
    let attrs = buttonDom.data.attrs
    buttonDom.data.attrs = Object.assign({}, attrs, {'close-expand': shouldCloseExpand})
    console.log(buttonDom.data.attrs)
    return <div class="dropdown">{buttonDom}</div>
  }
}
</script>

<style lang="scss" scoped>
</style>
