<template lang="html">
  <baseMenu v-expandOnClick id="option-menu">
    <i class="fa fa-cog menu-icon" slot="menu-icon"></i>
    <i class="fa fa-power-off close-icon" v-closeExpand></i>
    <div slot="main-panel">
      <slider>
        <i class="fa fa-file-text-o" slot="icon"></i>
        <i class="fa fa-paragraph" slot="icon"></i>
        <i class="fa fa-bars" slot="icon"></i>
        <i class="fa fa-clone" slot="icon"></i>

        <p slot="sheet" ttl="Main Text">asdf</p>
        <p slot="sheet" ttl="Title">fdsa</p>
        <div slot="sheet" ttl="Menu">
          menu fonts
        </div>
        <p slot="sheet" ttl="Board">fdsa</p>
      </slider>
    </div>
  </baseMenu>
</template>

<script>
import baseMenu from '~components/public/baseMenu.vue'
import slider from '~components/public/slider.vue'
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'
import {mapGetters} from 'vuex'

export default {
  mixins: [expandOnClick],
  components: {
    baseMenu,
    slider
  },
  computed: {
    ...mapGetters(['fontList'])
  }
}
</script>

<style lang="scss" scoped>
#option-menu {
  color: purple;
  top: 1.618em;
  right: 10%;
  .expand {
    right: 8%;
  }
}
.close-icon {
  font-size: 1.62em;
  position: absolute;
  right: 1em;
  top: 0.62em;
  color: rgba(0,0,0,0);
  text-shadow: 0 0 .4em;
}
.expand>.close-icon {
  color: red;
  top: 1.62em;
}
</style>
