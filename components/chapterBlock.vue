<script>
import ap from './public/ap'
import {mapState} from 'vuex'

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
    ...mapState(['currMainTextStyle'])
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
    return (
      <div style={this.currMainTextStyle}>
        {dom}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.chapter {
  color: #777;
  line-height: 1.62em;
}

br {
  line-height: 2.55em;
}
</style>
