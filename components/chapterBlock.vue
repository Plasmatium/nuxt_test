<script>
export default {
  props: {
    parastyle: {
      type: Object
    },
    chapter: {
      type: Array,
      required: true
    },
    chptnum: {
      required: true
    }
  },
  computed: {
    title () {
      return this.chapter[0]
    },
    paragraphs () {
      return this.chapter[1]
    }
  },
  data () {
    return {
    }
  },
  render (h) {
    let dom = []
    let titleDom = <h3>{this.title}</h3>
    dom.push(titleDom)
    this.paragraphs.forEach(para => {
      // let paraDom = <p>{para}</p>
      // dom.push(paraDom)
      let br = <br style='line-height: 2.55em'/>
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
}
</style>
