<template lang="html">
  <div class="menu">
    <slot name="menu-icon">
      <i class="fa fa-plus menu-icon"></i>
    </slot>
    <div class="main-panel">
      <slot name="main-panel">Menu Contants</slot>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import expandDirectives from '~/functionalComponents/expandOnClick.mixin'

export default {
  mixins: [expandDirectives]
}
</script>

<style lang="scss" scoped>
* {
  transition: all .3s ease-in-out;
  // border: solid 1px #17a;
}
.menu {
  display: flex;
  position: fixed;

  flex-direction: column;
  align-items: center;

  width: 2em;
  height: 2em;
  padding: 0;

  background-color: rgba(0,0,0,0);

  overflow: hidden;

  border-radius: 1em;

  box-shadow: 0 0 0 0 rgba(0,0,0,0);
}
.menu-icon {
  font-size: 2em;
  opacity: 0.382;
  align-self: flex-start;
}
.menu-icon:hover {
  opacity: 1;
}
.main-panel {
  opacity: 0;
}
.menu.expand {
  width: 80%;
  height: 61.8%;
  padding: 2%;

  opacity: 1;
  background-color: rgba(255,255,255,.96);

  border-radius: .3em;
  box-shadow: 0.01em 0.01em 1em rgba(0,0,0,.382);

  .main-panel, .menu-icon {
    opacity: 1;
  }
}
</style>
