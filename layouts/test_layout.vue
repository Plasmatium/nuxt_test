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
        <ul>
          <li><a href="/essays/02i1ejg">e1</a></li>
          <li><a href="/essays/02i2ejg">e2</a></li>
          <li><a href="/essays/02i3ejg">e3</a></li>
        </ul>
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
      ])
    }
  }
</script>

<style type="scss">
/* IDEA:  */
h1.title {
  color: orange;
}
*, *:before, *:after
{
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  margin: 0;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
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
  padding: 10px 30px;
  margin-left: 15px;
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

  flex-direction: row;
}
#sidebar {
  border: solid 1px #efefef;
  width: 15%;
  min-width: 15em;
  padding: 1.5em;
}
#content {
  border: solid 1px #efefef;
  width: 80%;
}

#font-list li {
  display: inline;
}
</style>
