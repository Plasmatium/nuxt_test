<template>
  <section class="container">
    <div>
      <!-- <logo/>
      <h1 class="title">
        NUXT
      </h1>
      <h2 class="subtitle">
        Universal Vue.js Application
      </h2> -->
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
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        <br>
        <br>
        <nuxt-link class='button--grey'
          :to='startUrl'>
          Start Reading</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~components/Logo.vue'
import slider from '~components/public/slider'
import {mapGetters} from 'vuex'

export default {
  layout: 'default',
  components: {
    Logo,
    slider
  },
  computed: {
    ...mapGetters(['demoBookStartUrl']),
    startUrl () {
      let queryStr = this.demoBookStartUrl
      return `/essays?q=${queryStr}`
    }
  },
  fetch: async ({store, isServer}) => {
    store.commit('setRenderSide', {isServer})
  }
}
</script>

<style scoped>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
