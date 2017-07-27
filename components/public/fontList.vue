<template>
  <div>
    <div class="input-group">
      <span class="input-group-addon">Font Size:</span>
      <input type="text" class="form-control" placeholder="Username">
    </div>
    <br>
    <p>Font List</p>
    <div class="font-list">
      <button v-for="font in fontList"
        type="button"
        class="btn btn-secondary btn-sm"
        :style="`font-family: ${font}; font-weight: 300; margin: .1em; flex-grow: 1`">
        {{font}}</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['fontList'])
  },
  data () {
    return {}
  }
  // render (h) {
  //   let fontListDom = this.fontList.map(font => {
  //     let style = `font-family: ${font}; font-weight: 300; margin: .1em`
  //     return (
  //       <button
  //         type="button"
  //         class="btn btn-secondary btn-sm"
  //         style={style}>
  //         {font}</button>
  //     )
  //   })
  //
  //   return (
  //     <div>
  //
  //       {fontListDom}
  //     </div>
  //   )
  // }
}
</script>

<style lang="scss" scoped>
.font-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
