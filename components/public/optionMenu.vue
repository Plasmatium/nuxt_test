<template lang="html">
  <baseMenu v-expandOnClick>
    <i class="fa fa-cog menu-icon" slot="menu-icon"></i>
    <div slot="main-panel">
      <h3>Font List</h3>
    </div>
  </baseMenu>
</template>

<script>
import baseMenu from '~/components/public/baseMenu.vue'
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'

export default {
  mixins: [expandOnClick],
  components: {
    baseMenu
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.62em;
}
</style>
