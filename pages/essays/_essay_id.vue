<template lang="html">
  <div>
    <h1 ref='title'>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer || false}}</h3>
    <h4>Total chapter count: {{essay.length}}.
      Total paragraph count: {{essay_id}}.</h4>
    <h4 :style="calcBackgroundStyle">Current Font Family is {{currFontFamily}}</h4>
    <essay class="essay-container" :essay="essay"/>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import essay from '~components/essay'
import { createEssay } from '~/middleware/para_utils'

export default {
  layout: 'test_layout',
  data () {
    return {
    }
  },
  asyncData: async ({isServer, params: {essay_id}}) => {
    const essay = createEssay(Number(essay_id))
    return {isServer, essay_id, essay}
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
    essay
  }
}
</script>

<style lang="scss">
* {
  padding: 1%;
}
</style>
