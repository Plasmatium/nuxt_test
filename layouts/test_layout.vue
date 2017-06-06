<template>
  <div id="layout" @click="outerClick"
  :style="calcTmpStyle({font: menu_font, weight: 900})">
    <div id="sidebar" :class="sidebarClass" @click.stop="innerClick">
      <div id="sidebar-header">
        <h5 style="margin-top: 0;"
        class="button--grey"
        @click.stop="toggleMenu">Menu</h5>
        <h2>Pick a Font</h2>
        <ul id="font-list">
          <li v-for="font in font_list">
            <a
            :style='calcTmpStyle({font})'
            class='button--green'
            href="#"
            @click.prevent="setFont({font})">
              {{font}}
            </a>
          </li>
        </ul>
        <div class="nav">
          <input type="text" v-model="essayLength">
          <a class="button--green" :href="essayUrl">
            Goto Eassy {{essayLength}}
          </a>
        </div>
        <div>
          <input type="text" name="" id="" v-model="fweight">
          <a href="#"
          class="button--green"
          @click.prevent="setWeight({weight: fweight})">
            Set Font Weight to {{fweight}}</a>
        </div>
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
        fweight: '100',
        essayLength: 200,
        sidebarClass: ['shrink']
      }
    },
    methods: {
      ...mapMutations([
        'setFont',
        'setWeight'
      ]),
      outerClick (e) {
        this.sidebarClass = ['shrink']
      },
      innerClick (e) {
        this.sidebarClass = ['expand']
      },
      toggleMenu (e) {
        if (this.sidebarClass.includes('shrink')) {
          this.sidebarClass = ['expand']
        } else {
          this.sidebarClass = ['shrink']
        }
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([
        'font_list',
        'calcTmpStyle',
        'menu_font'
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
  padding-left: 1.5em;
  padding-top: 0;
  left: 0;
  top: 0;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0.3px 0.3px 3px rgba(0, 0, 0, 0.382);
  overflow: hidden;
  transition: height 0.2s ease-in;
}

.shrink {
  height: 2em;
}
.expand {
  height: 62vh;
}

#content {
  border: solid 1px #efefef;
  border-radius: 3px;
  position: relative;
  top: 2em;
  z-index: -1;
}

#font-list li {
  display: inline;
  padding: 1px;
}
#font-list a {
  font-size: 38.2%;
}

input, a {
  font-size: 38.2%;
  height: 1em;
}
</style>
