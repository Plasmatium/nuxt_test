<!-- <template lang="html">

</template> -->

<script>
import dropdown from '~components/public/dropdown'

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
          class={'btn btn-secondary' + (this.currSheetIdx === idx ? ' selected' : '')}
          onClick={this.selectSheet(idx)}>{icn}
        </button>)
      })
    }</div>)

    let titleDom = <h2 class={this.sliderContentClass}>{this.currTitle}</h2>
    let sheetDom = <div class={this.sliderContentClass}>{this.currSheet}</div>

    return (<div class="slider">
      {[titleDom, buttonGroupDom, sheetDom]}
    </div>)
  },
  methods: {
    selectSheet (idx) {
      return (e) => {
        if (this.sliding) { return }
        if (this.currSheetIdx === idx) { return }

        this.sliding = true
        this.fading = true

        setTimeout(() => {
          this.fading = false
          this.currSheetIdx = idx
        }, 350)

        setTimeout(() => {
          this.sliding = false
        }, 700)
      }
    }
  },
  data () {
    return {
      currSheetIdx: 0,
      sliding: false,
      fading: false
    }
  },
  computed: {
    currSheet () {
      return this.$slots.sheet[this.currSheetIdx]
    },
    currTitle () {
      return this.currSheet.data.attrs.ttl
    },
    sliderContentClass () {
      return 'slider-content' + (this.fading ? ' fade-blur' : '')
    }
  },
  components: { dropdown }
}
</script>

<style lang="scss" scoped>
div.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  font-size: 1.62em;
}
.slider-content {
  margin: 1em;
  text-shadow: 0 0 0;
  transition: .35s ease-in-out;
}
.btn-group .btn {
  color: inherit;
}
.fade-blur {
  opacity: 0;
  text-shadow: 0 0 1em;
}
.selected {
  text-shadow: 0 0 .2em;
}
</style>
