<!-- <template lang="html">
  <div class="chapter-block">
    <h2>{{title}}</h2>
    <p v-for="para in paraList">{{para}}</p>
  </div>

</template> -->

<script>
export default {
  props: {
    title: {
      required: true
    },
    paraList: {
      required: true,
      type: Array
    }
  },
  render (h) {
    let h1 = <h1 ref='h1'>asdf</h1>
    console.log(this)
    return (
      <div>{h1}</div>
    )
  }
}
</script>

<style lang="css">
.chapter-block {
}
</style>
