<template lang="html">
  <div @click='pClick'>
    <p v-if='!isActive'>
      {{rawText}}
    </P>
    <p v-else>
      <span
      v-for='word in splitText'
      @click.stop='spanClick'>{{word}}{{' '}}</span>
    </p>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      isActive: false
    }
  },
  props: {
    rawText: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations([
      'setActiveP'
    ]),
    pClick (e) {
      console.time('pClick')
      if (this.activeP === this) {
        this.setActiveP({activeP: null})
      } else {
        this.setActiveP({activeP: this})
      }
      console.timeEnd('pClick')
    },
    spanClick (e) {
      console.log('span click')
    }
  },
  computed: {
    ...mapState([
      'activeP'
    ]),
    splitText () {
      return this.rawText.trim().split(/\s+/)
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
div {
  border-radius: 0.3em;
  box-shadow: none;
  transition: 0.2s ease-in-out;
}
div.active {
  box-shadow: 0.1em 0.1em 1em rgba(0, 0, 0, 0.382);
}
span {
  padding: 0;
}
</style>
