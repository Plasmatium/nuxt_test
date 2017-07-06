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
    debugger
    // TODO: classList 不会触发render，因为他是非响应式的
    let dropdownButton = this.$slots['dropdown-button'][0]
    if ((this.$el) && (this.$el.classList.contains(this.expandClassName))) {
      dropdownButton.data.attrs['close-expand'] = ''
    } else {
      delete dropdownButton.data.attrs['close-expand']
    }
    return <div>{dropdownButton}</div>
  }
}
</script>

<style lang="scss" scoped>
</style>
