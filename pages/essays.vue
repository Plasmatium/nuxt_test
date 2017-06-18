<template lang="html">
  <div>
    <h1 ref='title'>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer || false}}</h3>
    <h4>Total chapters count: {{contents.length}}.</h4>
    <h4 :style="calcBackgroundStyle">
      Current Font Family is {{currFontFamily}}</h4>
    <br>
    <h4>Book Name</h4>
    <h2>{{bookInfo.Title}}</h2>
    <h4>Chapter {{chptnum}}</h4>
    <h3>{{chapter.title}}</h3>
    <chapter-block
    :chapter='chapter'
    :style="calcBackgroundStyle"/>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import chapterBlock from '~components/chapterBlock'
import {decodeQuery} from '~/server/utils'
import axios from 'axios'

export default {
  layout: 'essayView',
  data () {
    return {
    }
  },
  asyncData: async ({store, isServer, query, isDev}) => {
    let port = isDev ? 3000 : 3000 // can't run on 80 on mac
    let host = isDev ? 'localhost' : '192.168.1.30'
    let instance = axios.create({
      proxy: {host, port}
    })

    store.commit('setRenderSide', {isServer})
    store.commit('setQueryStr', {queryStr: query})

    let data
    try {
      ({data} = await instance.get(`/api/getbook`, {params: query}))
    } catch (err) {
      console.error(err)
    }
    let {bookID, chptnum} = decodeQuery(query.q, isServer)
    let {bookInfo, bookStats, chapter, contents} = data

    return ({
      isServer,
      bookID,
      chptnum,
      bookInfo,
      bookStats,
      contents,
      chapter
    })
    // let {
    //   bookName,
    //   chptName,
    //   bookStats,
    //   chptStats,
    //   paras,
    //   pvt_data
    // } = data
    // return ({
    //   isServer,
    //   bookID,
    //   chptnum,
    //   bookName,
    //   chptName,
    //   bookStats,
    //   chptStats,
    //   paras,
    //   pvt_data
    // })
  },
  computed: {
    ...mapGetters([
      'calcBackgroundStyle',
      'getIDnNum'
    ]),
    ...mapState([
      'currFontFamily',
      'currFontWeight'
    ])
  },
  methods: {
    ...mapMutations([
    ])
  },
  components: {
    'chapter-block': chapterBlock
  },
  mounted () {
  }
}
</script>

<style lang="scss">
* {
  padding: 1%;
}
</style>
