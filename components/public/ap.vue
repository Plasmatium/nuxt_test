<!-- <template lang="html">
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
</template> -->

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  render () {
    let dom = null
    if (!this.isActive) {
      dom = this.rawText
    } else {
      let splitText = this.rawText.trim().split(/\s+/)
      dom = splitText.map(word => {
        return <span>{word + ' '}</span>
      })
    }
    return <p onClick={this.pClick}>{dom}</p>
  },
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
    ])
  }
}
</script>

<style lang="scss" scoped>

p {
  border-radius: 0.3em;
  box-shadow: none;
  transition: 0.2s ease-in-out;
}
p.active {
  box-shadow: 0.1em 0.1em 1em rgba(0, 0, 0, 0.382);
}
span {
  padding: 0;
}
</style>
