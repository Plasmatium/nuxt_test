<script>
import ap from './public/ap'

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
      dom.push(<ap text={para}> </ap>)
    })
    return (
      <div>
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
