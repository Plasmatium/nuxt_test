<template lang="html">
  <div>
    <h1>ITEM VIEW</h1>
    <h3>Infomation about route.params:</h3>
    <br>
    <p>{{$route.params}}</p>
    <h4>this.time = <span>{{time}}</span></h4>
    <h4><a href="/">back to home</a></h4>
    <input type="text" name="" id="" v-model="time">
  </div>
</template>

<script>
import { sleep } from '../../middleware/async_utils'
// import axios from 'axios'

export default {
  layout: 'test_layout',
  data () {
    return {
      time: 'loading'
    }
  },
  asyncData: async context => {
    let ms = Math.round(Math.random() * 4000)
    await sleep(ms, console.warn, `took ${ms}ms`)
    return {time: ms}
  }
}
</script>

<style lang="css">
</style>
