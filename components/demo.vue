<!-- This demo.vue is not correct.
There is an issue about "Mismatching childNodes vs. VNodes"
use render function instead. -->

<template lang="html">
  <div>
    <div :style="calcBackgroundStyle" class="chapter-block" v-for="chpt in essay">
      <h3 class="chapter-title">{{Object.keys(chpt)[0]}}</h3>
      <p class="paragraph" v-for="para in Object.values(chpt)[0]">
        {{para}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    'essay': Array
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'calcBackgroundStyle'
    ])
  }
}
</script>

<style lang="scss">

</style>
