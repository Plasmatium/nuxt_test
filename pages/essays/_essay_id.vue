<template lang="html">
  <div>
    <h1 ref='title'>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer || false}}</h3>
    <h4>Total chapter count: {{essayChunk.length}}.
      Total paragraph count: {{essay_id}}.</h4>
    <h4 :style="calcBackgroundStyle">Current Font Family is {{currFontFamily}}</h4>
    <a
    class='button--green'
    href="#"
    @click.prevent="clk">
      push
    </a>
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
    ...mapMutations([]),
    clk (e) {
      console.log(123)
    }
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
