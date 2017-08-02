<script>
import ap from './public/ap'
import {mapState} from 'vuex'
import {calcStyleStr} from '~/server/utils'

export default {
  props: {
    parastyle: {
      type: Object
    },
    chapter: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['styleOptions'])
  },
  components: {
    ap
  },
  data () {
    return {
    }
  },
  render (h) {
    let {paras} = this.chapter
    let dom = []
    paras.forEach(para => {
      // let paraDom = <p>{para}</p>
      // dom.push(paraDom)
      dom.push(<ap rawText={para}> </ap>)
    })
    let styleStr = calcStyleStr(this.styleOptions.currMainTextStyle)
    return (
      <div style={styleStr}>
        {dom}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>

</style>
