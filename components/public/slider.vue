<!-- <template lang="html">

</template> -->

<script>
export default {
  render (h) {
    let {icon = [], sheet = []} = this.$slots
    if (icon.length !== sheet.length) {
      throw Error(`in tag <slider>, length of icon & sheet is not equal.`)
    }

    let buttonGroupDom = (<div class="btn-group" role="group"> {
      icon.map((icn, idx) => {
        return (<button
          type="button"
          class="btn btn-secondary"
          onClick={this.selectSheet(idx)}>{icn}
        </button>)
      })
    }</div>)

    let titleDom = <h2>{this.currTitle}</h2>

    return (<div>
      {[titleDom, buttonGroupDom, this.currSheet]}
    </div>)
  },
  methods: {
    selectSheet (idx) {
      return (e) => {
        // TODO: use a series of setTimeout to control animation step
        // 1. set class="fade-blur" to currSheet & currTitle immediately
        // 2. this.currSheetIdx = idx, 0.1s delay.
        // 3. set class="" to currSheet & currTitle, 0.2s delay.
        setTimeout(() => { this.currSheetIdx = idx }, 1000)
      }
    }
  },
  data () {
    return {
      currSheetIdx: 0
    }
  },
  computed: {
    currSheet () {
      return this.$slots.sheet[this.currSheetIdx]
    },
    currTitle () {
      return this.currSheet.data.attrs.ttl
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
