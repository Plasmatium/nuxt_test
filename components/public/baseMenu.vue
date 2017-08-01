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
export default {
}
</script>

<style lang="scss" scoped>
* {
  transition: all 0.3s ease-in-out;
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
  // height: 100%;
  width: 80vw;
  height: 90vh;
  padding: 2vw;
  overflow: auto;
}
.menu.expand {
  width: 80%;
  height: 90%;
  padding: 2%;

  // min-width: 10em;
  max-height: 50em;

  opacity: 1;
  background-color: rgba(255,255,255,.96);

  border-radius: .3em;
  box-shadow: 0.01em 0.01em 1em rgba(0,0,0,.382);

  .main-panel, .menu-icon {
    opacity: 1;
  }
}
</style>
