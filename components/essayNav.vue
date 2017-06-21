<template lang="html">
  <div id='essay-navigator' :style='calcTmpStyle' :class='clsList'
    @click.stop='clk'>
    <label for="bookID">bookID:</label>
    <input name='bookID' v-model='bookID'/>
    <label for="chptnum">Chapter Number:</label>
    <input name='chptnum' v-model='chptnum'/>
    <nuxt-link :to='queryUrl' class='button--grey'>Go</nuxt-link>
    <expander />
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import expander from './public/expander'
import {encodeQuery} from '~/server/utils'

export default {
  components: {
    expander
  },
  data () {
    return {
      bookID: null,
      chptnum: null
    }
  },
  methods: {
    ...mapMutations([
      'showMenu'
    ]),
    clk (e) {
      if (e.target === this.$el) {
        this.showMenu({menu: this})
      }
    }
  },
  computed: {
    ...mapState([
      'currMenu',
      'currQueryStr',
      'isServer'
    ]),
    ...mapGetters([
      'calcTmpStyle',
      'menuFont',
      'getIDnNum'
    ]),
    queryUrl () {
      let {bookID, chptnum} = this
      let query = {bookID, chptnum}
      let b64Str = encodeQuery(query, this.isServer)
      let url = `/essays?q=${b64Str}`
      return url
    },
    clsList () {
      return (this.currMenu === this) ? ['show'] : null
    }
  },
  mounted () {
    let {bookID, chptnum} = this.getIDnNum
    this.bookID = bookID
    this.chptnum = chptnum
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
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0.3px 0.3px 3px rgba(0, 0, 0, 0.382);
  transition: height 0.2s ease-in;
}
#essay-navigator.show {
  height: 62vh;
}
#nav {
  position: relative;
  margin-top: 0;
}
</style>
