<template lang="html">
  <p
  :class='{ active: this.$el === this.activeP }'
  @click='pClick'>
  {{text}}
  </P>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      isHover: false
    }
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations([
      'setActiveP'
    ]),
    pClick (e) {
      if (this.activeP === this.$el) {
        this.setActiveP({activeP: null})
      } else {
        this.setActiveP({activeP: this.$el})
      }
    }
  },
  computed: {
    refinedText () {
      return this.text.trim().split(/\s+/)
    },
    ...mapState([
      'activeP'
    ])
  }
}
</script>

<style lang="scss" scoped>
p {
  border-radius: 0.3em;
  box-shadow: none;
  transition: 0.2s ease;
}
p.active {
  box-shadow: 0.03em 0.03em 1em rgba(0, 0, 0, 0.2);
}
</style>
