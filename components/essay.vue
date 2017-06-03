<script>
// import {createPara} from '~/middleware/para_utils'
import {mapGetters} from 'vuex'

export default {
  props: {
    'essay': Array
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
  render (h) {
    // structure of this.essay is [{title: [para, para...]}, {others}...}
    let dom = []
    this.essay.forEach(chpt => {
      let [title, paraList] = Object.entries(chpt)[0]
      // paraList is an Array of string(paragraph)
      let titleDom = <h2>{title}</h2>
      dom.push(titleDom)
      // dom.push(paraList.join('\n\n'))
      paraList.forEach(para => {
        dom.push(para)
        dom.push(<br/>)
      })
    })

    return <div style={this.calcBackgroundStyle} class="essay">{dom}</div>
  }
}
</script>

<style>
.chapter-block {
  display: flex;
  color: green;
  flex-direction: column;
  line-height: 1.62;
}
br {
  line-height: 3.236em;
}
</style>
