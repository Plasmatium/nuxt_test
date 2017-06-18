<script>
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
      let br = <br/>
      dom.push(para)
      dom.push(br)
    })
    return (
      <div id={`chapter-${this.chptnum}`}
        class='chapter'>{dom}</div>
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
