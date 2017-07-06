<template lang="html">
  <div :class="classList"
  id='essay-navigator'
  :style='calcTmpStyle'>
    <label for="bookID">bookID:</label>
    <input name='bookID' v-model='bookID' class="except-expand"/>
    <label for="chptnum">Chapter Number:</label>
    <input name='chptnum' v-model='chptnum' class="except-expand"/>
    <nuxt-link :to='queryUrl' class='button--grey close-expand'>
      Go</nuxt-link>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import {encodeQuery} from '~/server/utils'
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'

export default {
  mixins: [expandOnClick],
  components: {
  },
  data () {
    return {
      bookID: null,
      chptnum: null,
      classList: {expand: false}
    }
  },
  methods: {
    ...mapMutations([]),
    shrink (e) {
      this.classList.expand = false
    },
    expand (e) {
      this.classList.expand = true
    }
  },
  computed: {
    ...mapState([
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
#essay-navigator.expand {
  height: 62vh;
}
</style>
