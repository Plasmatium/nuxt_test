<template>
  <div id="layout">
    <div id="sidebar">
      <div id="sidebar-header">
        <h3>Lorem ipsum dolor.</h3>
        <h4 :style="set_font">another lorem: Lorem ipsum dolor.</h4>
        <ul id="font-list">
          <li v-for="font in font_list">
            <a
            :style='calc_tmp_style({font})'
            class='button--green'
            href="#"
            @click.prevent="set_font({font})">
              {{font}}
            </a>
          </li>
        </ul>
        <input type="text" v-model="essayLength">
        <a href="" class="button--green" :href="essayUrl">
          Goto Eassy {{essayLength}}
        </a>
        <ul id="contents">
        </ul>
      </div>
    </div>
    <div id="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex'

  export default {
    data () {
      return {
        essayLength: 200
      }
    },
    methods: {
      ...mapMutations([
        'set_font'
      ])
    },
    computed: {
      ...mapState([]),
      ...mapGetters([
        'font_list',
        'calc_tmp_style'
      ]),
      essayUrl () {
        return `/essays/${this.essayLength}`
      }
    }
  }
</script>

<style lang="scss">
/* IDEA:  */
h1.title {
  color: orange;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 2px 6px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 2px 2px;
  margin-left: 1px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}
#layout {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;

  flex-direction: column;
}
#sidebar {
  border: solid 1px #efefef;
  border-radius: 3px;
  // height: 15%;
  padding: 1.5em;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0.3px 0.3px 3px rgba(0, 0, 0, 0.382);
  height: 30vh;
}
#content {
  border: solid 1px #efefef;
  border-radius: 3px;
  position: relative;
  top: 35vh;
  z-index: -1;
}

#font-list li {
  display: inline;
  padding: 1px;
}
#font-list a {
  font-size: 38.2%;
}
</style>
