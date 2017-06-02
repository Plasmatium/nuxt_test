<template lang="html">
  <div>
    <h1>ESSAY VIEW</h1>
    <h3>Is This From Server: {{isServer}}</h3>
    <br>
    <h4 :style="calc_background_style">Current Font Family is {{currFontFamily}}</h4>
    <p :style="calc_background_style">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Nisi consequatur laboriosam magnam laudantium tenetur ex
      quaerat repellat numquam possimus officia, molestiae, magni
      debitis expedita facilis quod vero nobis asperiores nihil eius
      delectus totam. Expedita voluptas veritatis, corrupti dolore
      beatae eaque itaque fugit sit, sint quo voluptatum cum ipsa eos
      pariatur.
    </p>

  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
  layout: 'test_layout',
  data () {
    return {
      time: 'loading'
    }
  },
  asyncData: async ({isServer}) => {
    return {isServer}
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
  }
}
</script>

<style lang="css">
* {
  padding: 1%;
}
</style>
