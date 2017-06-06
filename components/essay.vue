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
import chapterBlock from '~components/chapterBlock.vue'

// this variable can not be put in the $vm.data, because
// it can cause an infinite render loop

export default {
  render (h) {
    // structure of this.essay is [[title: [para, para...]], [others]...]
    let {prevChpt, currChpt, nextChpt, chptnum} = this.essayChunk
    let cls = ['prevPage', 'currPage', 'nextPage']
    let dom = [prevChpt, currChpt, nextChpt].map((chpt, pageIdx) => {
      if (!chpt) {
        return null
      }
      return (
        <chapter-block
          chapter={chpt}
          chptnum={chptnum + pageIdx - 1}
          key={chptnum - 1}
          class={cls[pageIdx]}/>
      )
    })
    return (
      <div style={this.calcBackgroundStyle}>{dom}</div>
    )
  },
  props: {
    'essayChunk': Object
  },
  data () {
    return {
    }
  },
  methods: {
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
