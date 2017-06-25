<template lang="html">
  <div class="menu">
    <slot name="menu-icon">
      <i class="fa fa-plus menu-icon"></i>
    </slot>
    <div class="main-panel">
      <slot name="main-panel">Menu Contants</slot>
    </div>
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

  top: 1.618em;
  left: 10%;

  color: purple;
  background-color: rgba(0,0,0,0);

  overflow: hidden;

  border-radius: 1em;

  box-shadow: 0 0 0 0 rgba(0,0,0,0);
  // inset 0 0 0 rgba(128,110,30,0);

  .menu-icon {
    font-size: 2em;
    align-self: flex-end;
  }
  .main-panel {
    opacity: 0;
  }
}

.menu.expand {
  left: 6%;

  width: 80%;
  height: 61.8%;
  padding: 2%;

  background-color: rgba(255,255,255,.96);

  border-radius: .3em;
  box-shadow: 0.01em 0.01em 1em rgba(0,0,0,.382);
  // inset -100vw -100vw 50px rgba(128,110,30,.0);

  .menu-icon {
  }

  .main-panel {
    opacity: 1;
  }
}
</style>
