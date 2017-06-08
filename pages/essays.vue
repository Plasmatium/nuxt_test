<template lang="html">
  <div>
    <h1 ref='title'>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer || false}}</h3>
    <h4>Total paragraph count: {{query.essayID}}.</h4>
    <h4 :style="calcBackgroundStyle">Current Font Family is {{currFontFamily}}</h4>
    <nuxt-link :to="`/essays/20000?chptnum=${navNum}`">to chptnum: {{navNum}}</nuxt-link>
    <input v-model='navNum'>
    <!-- <essay class="essay-container" :essayChunk="essayChunk"/> -->
    <chapter-block
    :chapter='chptData'
    :chptnum='query.chptnum'
    :style="calcBackgroundStyle"/>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import chapterBlock from '~components/chapterBlock'
import axios from 'axios'
import qs from 'querystring'

export default {
  layout: 'test_layout',
  data () {
    return {
      navNum: 20
    }
  },
  asyncData: async ({isServer, query, req}) => {
    let q = qs.stringify(query)
    let {host} = req.headers
    console.log(host)
    let {data} = await axios.get(`http://${host}/api/getdemo?${q}`)
    return {isServer, query, chptData: data}
  },
  computed: {
    ...mapGetters([
      'calcBackgroundStyle'
    ]),
    ...mapState([
      'currFontFamily',
      'currFontWeight'
    ])
  },
  methods: {
    ...mapMutations([])
  },
  components: {
    'chapter-block': chapterBlock
  }
}
</script>

<style lang="scss">
* {
  padding: 1%;
}
</style>
