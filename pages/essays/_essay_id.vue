<template lang="html">
  <div>
    <h1>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer || false}}</h3>
    <h4 :style="calc_background_style">Current Font Family is {{currFontFamily}}</h4>
    <demo class="demo" :plen="Number(essay_id)"/>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import demo from '~components/demo'

export default {
  layout: 'test_layout',
  data () {
    return {
      time: 'loading'
    }
  },
  asyncData: async ({isServer, params: {essay_id}}) => {
    return {isServer, essay_id}
  },
  computed: {
    ...mapGetters([
      'calc_background_style'
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
    demo
  }
}
</script>

<style lang="css">
* {
  padding: 1%;
}
</style>
