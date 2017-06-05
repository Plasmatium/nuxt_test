<!-- <template>
  <div :style="this.calcBackgroundStyle">
    <chapter-block
    v-for="(chpt, idx) in chapterToShow()"
    :title="chpt[0]" :paraList="chpt[1]" :key="idx"/>
  </div>
</template> -->

<script>
// import {createPara} from '~/middleware/para_utils'
import {mapGetters} from 'vuex'
import chapterBlock from '~/components/chapter-block'

// this variable can not be put in the $vm.data, because
// it can cause an infinite render loop
let currDom = null

export default {
  render (h) {
    // structure of this.essay is [[title: [para, para...]], [others]...}
    let dom = []
    this.essay.forEach((chpt, chptIdx) => {
      let [title, paraList] = chpt
      // paraList is an Array of string(paragraph)
      let titleDom = <h2 ref={`h2_${chptIdx}`}>{title}</h2>
      dom.push(titleDom)
      // dom.push(paraList.join('\n\n'))
      paraList.forEach((para, paraIdx) => {
        let idStr = `p_${chptIdx}_${paraIdx}`
        let paraDom = <p ref={idStr} key={idStr}>{dom.length + '----|' + para}</p>
        dom.push(paraDom)
      })
    })
    this.maxDomLen = dom.length
    currDom = dom.slice(...this.renderRange)

    if (!this.shouldRescroll) {
      this.midRef = currDom[10].data.ref // total 20dom in rendering
    }

    return (
      <div style={this.calcBackgroundStyle}
        class="essay"
        ref="container">{currDom}</div>
    )
  },
  props: {
    'essay': Array
  },
  data () {
    return {
      renderRange: [0, 20],
      maxDomLen: -1,
      midDomLastTop: null,
      midRef: null,
      shouldRescroll: false
    }
  },
  methods: {
    handleScroll (e) {
      let bodyHeight = Math.round(Number(document.body.scrollHeight))
      let sY = Math.round(Number(window.scrollY))
      let innerHeight = Math.round(Number(window.innerHeight))

      let isBottom = Math.abs(bodyHeight - sY - innerHeight) === 0
      let isTop = sY === 0

      if (isBottom) {
        console.log('touching bottom')
        let [begin, end] = this.renderRange
        this.renderRange = [begin + 5, end + 5]
      } else if (isTop) {
        console.log('touching top')
        this.renderRange = [0, 20]
      } else { return }
      this.midDomLastTop = this.$refs[this.midRef].getBoundingClientRect().top
      this.shouldRescroll = true
    },
    chapterToShow () {
      return [0, 1, 2].map(idx => this.essay[idx])
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestory () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  updated () {
    console.warn('updated................')
    if (this.shouldRescroll) {
      let newTop = this.$refs[this.midRef].getBoundingClientRect().top
      let deltaY = this.midDomLastTop - newTop
      window.scrollTo(0, window.scrollY - deltaY)

      this.shouldRescroll = false
    }
  },
  computed: {
    ...mapGetters([
      'calcBackgroundStyle'
    ])
  },
  components: {
    'chapter-block': chapterBlock
  }
}
</script>

<style>
.chapter-block {
  display: flex;
  color: #677;
  flex-direction: column;
  line-height: 1.62;
}
br {
  line-height: 3.236em;
}

h2 {
  border: solid 1px #777;
}
</style>
