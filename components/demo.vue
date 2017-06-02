<template lang="html">
  <div>
    <p v-for="para in essay" :style="calc_background_style">
      {{para}}</p>
  </div>
</template>

<script>
import {createEssay} from '~/middleware/para_utils'
import {mapGetters} from 'vuex'

export default {
  props: {
    plen: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'calc_background_style'
    ]),
    essay () {
      console.log('created para')
      return createEssay()
    }
  }
}
</script>

<style lang="scss">
p::first-letter {
  font-size: 162%;
}
</style>
