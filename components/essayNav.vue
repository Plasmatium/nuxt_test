<template lang="html">
  <div id='essay-navigator' :style='calcTmpStyle' :class='cls'
    @click.stop='clk'>
    <div id='nav'>
      <label for="essayid">essayID:</label>
      <input name='essayid' v-model='essayID'/>
      <label for="chptnum">Chapter Number:</label>
      <input name='chptnum' v-model='chptnum'/>
      <nuxt-link :to='queryUrl' class='button--grey'>Go</nuxt-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import qs from 'querystring'

export default {
  data () {
    return {
      chptnum: null,
      essayID: null,
      cls: null
    }
  },
  methods: {
    clk (e) {
      this.cls = this.cls ? null : ['expand']
    }
  },
  computed: {
    ...mapGetters([
      'calcTmpStyle',
      'menuFont'
    ]),
    queryUrl () {
      let {essayID, chptnum} = this
      let query = qs.stringify({essayID, chptnum})
      let url = `/essays?${query}`
      return url
    }
  },
  mounted () {
    this.essayID = this.$store.state.currEssayID
    this.chptnum = this.$store.state.currChptnum
  }
}
</script>

<style lang="scss" scoped>
#essay-navigator {
  position: fixed;
  margin: auto;
  bottom: -3em;
  height: 6em;
  width: 90vw;
  border-radius: 0.3em;
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0.3px 0.3px 3px rgba(0, 0, 0, 0.382);
  transition: height 0.2s ease-in;
}
#essay-navigator.expand {
  height: 62vh;
}
#nav {
  position: relative;
  margin-top: 0;
}
</style>
