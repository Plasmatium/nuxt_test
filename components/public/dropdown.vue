<script>
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'
const immutable = require('object-path-immutable')

export default {
  mixins: [expandOnClick],
  data () {
    return {
      expandClassName: 'show'
    }
  },
  render (h) {
    let buttonDom = this.$slots['dropdown-button'][0]
    let itemsDom = this.$slots['dropdown-items']

    if (this.isExpand) {
      buttonDom = immutable.set(buttonDom, ['data', 'attrs', this.closeExpand], '')
    } else {
      buttonDom = immutable.del(buttonDom, ['data', 'attrs', this.closeExpand])
    }
    itemsDom = itemsDom.map(item => {
      return immutable.set(item, ['data', 'attrs', this.closeExpand], '')
    })
    return (
      <div class={'dropdown' + (this.isExpand ? (' ' + this.expandClassName) : '')}>
        {buttonDom}
        <div class="dropdown-menu">{itemsDom}</div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  height: 30vh;
  overflow: auto;
  width: inherit;
}
</style>
