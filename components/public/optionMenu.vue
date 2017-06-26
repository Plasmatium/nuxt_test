<template lang="html">
  <baseMenu v-expandOnClick>
    <i class="fa fa-cog menu-icon" slot="menu-icon"></i>
    <div slot="main-panel">
      <slider>
        <i class="fa fa-font" slot="icon"></i>
        <i class="fa fa-subway" slot="icon"></i>
        <i class="fa fa-bus" slot="icon"></i>
        <i class="fa fa-train" slot="icon"></i>
        <i class="fa fa-car" slot="icon"></i>
        <i class="fa fa-plane" slot="icon"></i>

        <div slot="sheet" ttl="Font List">
          Some Fonts Here!!!
        </div>
        <p slot="sheet" ttl="Subway">asdf</p>
        <p slot="sheet" ttl="Bus">fdsa</p>
        <p slot="sheet" ttl="Train">hjkl</p>
        <p slot="sheet" ttl="Car">lkkj</p>
        <p slot="sheet" ttl="Plane">t5y6</p>
      </slider>
    </div>
  </baseMenu>
</template>

<script>
import baseMenu from '~components/public/baseMenu.vue'
import slider from '~components/public/slider.vue'
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'

export default {
  mixins: [expandOnClick],
  components: {
    baseMenu,
    slider
  }
}
</script>

<style lang="scss" scoped>
* {
  color: purple;
}
</style>
