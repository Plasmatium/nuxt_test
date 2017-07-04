<template lang="html">
  <div class="dropdown" v-expandOnClick="'show'">
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
</template>

<script>
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'

export default {
  mixins: [expandOnClick],
  computed: {
    show () {
      return this.expand
    }
  },
  mounted () {
    let items = this.$slots['dropdown-items']
    items.forEach(vnode => {
      let bind = expandOnClick.directives.closeExpand.bind
      debugger
      bind(vnode.elm, null, {context: this})
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
