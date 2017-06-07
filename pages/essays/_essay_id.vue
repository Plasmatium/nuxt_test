<template lang="html">
  <div>
    <h1 ref='title'>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer || false}}</h3>
    <h4>Total paragraph count: {{essay_id}}.</h4>
    <h4 :style="calcBackgroundStyle">Current Font Family is {{currFontFamily}}</h4>
    <nuxt-link :to="`/essays/20000?chptnum=${navNum}`">to chptnum: {{navNum}}</nuxt-link>
    <input v-model='navNum'>
    <essay class="essay-container" :essayChunk="essayChunk"/>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import essay from '~components/essay'

export default {
  layout: 'test_layout',
  data () {
    return {
      navNum: 20
    }
  },
  asyncData: async ({isServer, params: {essay_id}}) => {
    // const essay = createEssay(Number(essay_id))
    return {isServer, essay_id}
  },
  computed: {
    ...mapGetters([
      'calcBackgroundStyle'
    ]),
    ...mapState([
      'currFontFamily',
      'currFontWeight',
      'essayChunk'
    ])
  },
  methods: {
    ...mapMutations([])
  },
  components: {
    essay
  },
  middleware: 'paraUtils'
}
</script>

<style lang="scss">
* {
  padding: 1%;
}
</style>
