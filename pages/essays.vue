<template lang="html">
  <div>
    <h1 ref='title'>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer || false}}</h3>
    <h4>Total chapters count: {{query.essayID}}.</h4>
    <h4 :style="calcBackgroundStyle">
      Current Font Family is {{currFontFamily}}</h4>
    <br>
    <h4>Book Name</h4>
    <h2>{{bookName}}</h2>
    <h4>Chapter {{query.chptnum}}</h4>
    <h3>{{chptName}}</h3>
    <chapter-block
    :paras='paras'
    :style="calcBackgroundStyle"/>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import chapterBlock from '~components/chapterBlock'
import axios from 'axios'

export default {
  layout: 'essayView',
  data () {
    return {
    }
  },
  asyncData: async ({isServer, query, isDev}) => {
    let port = isDev ? 3000 : 80
    let instance = axios.create({
      proxy: {port}
    })
    let data
    try {
      ({data} = await instance.get('/api/getdemo', {params: query}))
    } catch (err) {
      console.error(err)
    }
    let {
      bookName,
      chptName,
      bookStats,
      chptStats,
      paras
    } = data
    return ({
      isServer,
      query,
      bookName,
      chptName,
      bookStats,
      chptStats,
      paras
    })
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
    ...mapMutations([
      'setIdChptNum',
      'setBaseUrl'
    ])
  },
  components: {
    'chapter-block': chapterBlock
  },
  mounted () {
    this.setIdChptNum(this.query)
  }
}
</script>

<style lang="scss">
* {
  padding: 1%;
}
</style>
