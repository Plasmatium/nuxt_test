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
        dom.push(para)
        dom.push(<br ref={`br_${chptIdx}_${paraIdx}`}/>)
      })
    })
    this.maxDomLen = dom.length
    this.firstDom = dom[this.renderRange[0]]
    this.lastDom = dom[this.renderRange[1] - 1]
    console.log(this.renderRange)
    return (
      <div style={this.calcBackgroundStyle}
        class="essay"
        ref="container">{dom.slice(...this.renderRange)}</div>
    )
  },
  props: {
    'essay': Array
  },
  data () {
    return {
      renderRange: [0, 100],
      maxDomLen: -1,
      firstDom: null,
      lastDom: null
    }
  },
  methods: {
    handleScroll (e) {
      // console.time('e')
      let bodyHeight = Math.round(Number(document.body.scrollHeight))
      let sY = Math.round(Number(window.scrollY))
      let innerHeight = Math.round(Number(window.innerHeight))

      let isBottom = Math.abs(bodyHeight - sY - innerHeight) === 0

      if (isBottom) {
        console.log('--------------')
        this.renderRange = [0, 150]
      }
      // console.timeEnd('e')
    },
    chapterToShow () {
      return [0, 1, 2].map(idx => this.essay[idx])
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
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
