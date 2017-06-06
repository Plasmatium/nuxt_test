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
let _currDom = null
let _maxDomLen = null

export default {
  render (h) {
    // structure of this.essay is [[title: [para, para...]], [others]...}
    _currDom = [[], []]
    this.essay.slice(...this.renderRange).forEach((chpt, chptIdx) => {
      let [title, paraList] = chpt
      // paraList is an Array of string(paragraph)
      let titleDom = <h2 ref={`h2_${chptIdx}`}>{title}</h2>
      _currDom[chptIdx].push(titleDom)
      // dom.push(paraList.join('\n\n'))
      paraList.forEach((para, paraIdx) => {
        let idStr = `br_${chptIdx}_${paraIdx}`
        let br = <br ref={idStr} key={idStr}/>
        _currDom[chptIdx].push(para)
        _currDom[chptIdx].push(br)
      })
    })
    return (
      <div style={this.calcBackgroundStyle}
        class="essay"
        ref="container">{_currDom}</div>
    )
  },
  props: {
    'essay': Array
  },
  data () {
    return {
      renderRange: [0, 2],
      midDomLastTop: null,
      midRef: null,
      shouldRescroll: false
    }
  },
  methods: {
    handleScroll (e) {
      console.time('rescroll')
      let bodyHeight = Math.round(Number(document.body.scrollHeight))
      let sY = Math.round(Number(window.scrollY))
      let innerHeight = Math.round(Number(window.innerHeight))

      let isBottom = Math.abs(bodyHeight - sY - innerHeight) === 0
      let isTop = sY === 0

      if (isBottom) {
        console.log('touching bottom')
        let [begin, end] = this.renderRange
        begin += 5
        end += 5
        if (end > _maxDomLen) {
          end = _maxDomLen
        }
        this.renderRange = [begin, end]
      } else if (isTop) {
        console.log('touching top')
        let [begin, end] = this.renderRange
        begin -= 5
        end -= 5
        if (begin < 0) {
          begin = 0
          end = 20
        }
        this.renderRange = [begin, end]
      } else { return }
      this.midDomLastTop = this.$refs[this.midRef].getBoundingClientRect().top
      this.shouldRescroll = true
    },
    chapterToShow () {
      return [0, 1, 2].map(idx => this.essay[idx])
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll)
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
      console.timeEnd('rescroll')
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
