<template>
  <div id="layout" v-expandOnClick
  :style="calcTmpStyle({font: menuFont, weight: 100})">
    <option-menu>
    </option-menu>
    <nuxt />
    <essay-nav></essay-nav>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex'
  import essayNav from '~components/essayNav'
  import optionMenu from '~components/optionMenu'
  import baseMenu from '~components/public/baseMenu'
  import expandOnClick from '~/functionalComponents/expandOnClick.mixin'

  export default {
    mixins: [expandOnClick],
    components: {
      'essay-nav': essayNav,
      'option-menu': optionMenu,
      baseMenu
    },
    data () {
      return {
        fweight: '100'
      }
    },
    methods: {
      ...mapMutations([
        'setFont',
        'setWeight',
        'showMenu'
      ])
    },
    computed: {
      ...mapState(['currMenu']),
      ...mapGetters([
        'fontList',
        'calcTmpStyle',
        'menuFont'
      ]),
      sidebarClass () {
        return 'err'
      }
    }
  }
</script>

<style lang="scss" scoped>
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
  padding: 0.1em 0.382em;
  margin: 0 1em;
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
  padding-left: 1.5em;
  padding-top: 0;
  left: 0;
  top: 0;
  height: 2em;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0.3px 0.3px 3px rgba(0, 0, 0, 0.382);
  overflow: scroll;
  transition: height 0.2s ease-in;
  z-index: 10;
}

#content {
  border: solid 1px #efefef;
  border-radius: 3px;
  position: relative;
  top: 2em;
}

#font-list li {
  display: inline;
  padding: 1px;
}
#font-list a {
  font-size: 38.2%;
}
</style>
