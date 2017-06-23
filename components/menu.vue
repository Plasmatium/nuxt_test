<template lang="html">
  <div class="menu" v-expandOnClick>
    <div v-closeExpand><slot name="close"></slot></div>
    test menu
    <div v-exceptExpand>E</div>
    <div>others</div>
  </div>
</template>

<script>
import expandDirectives from '~/functionalComponents/expandOnClick.mixin'

export default {
  mixins: [expandDirectives]
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  width: 5em;
  height: 6em;

  background-color: rgba(255,255,255,.9);

  border: solid 1px #777;

  transition: all .2s ease-in-out;
}
div {
  border: solid 1px #777;
}
.menu.expand {
  color: red;
  width: 10em;
  height: 38.2%
}
</style>
