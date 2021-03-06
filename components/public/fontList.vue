<template>
  <div class="font-list-view">
    <div class="font-option">
      <!-- Font Weight -->
        <div class="input-group">
          <span class="input-group-addon">Font Weight</span>
          <dropdown :class="'font-weight-dropdown'">
            <button class="btn btn-secondary dropdown-toggle btn-sm" type="button"
              :style="`font-family:'${getOption('font-family')}'; font-weight:${getOption('font-weight')}`"
              slot="dropdown-button">
              {{getOption('font-weight')}}
            </button>
            <a v-for="idx in 9" slot="dropdown-items"
              class="dropdown-item"
              href="#!"
              @click="setOption('font-weight', idx*100)"
              :style="`font-family:'${getOption('font-family')}'; font-weight:${idx*100}`">
              {{idx*100}}</a>
          </dropdown>
        </div>
        <hr>
      <!-- Font Size -->
        <div class="input-group">
          <span class="input-group-addon">Font Size</span>
          <dropdown :class="'font-size-dropdown'">
            <button class="btn btn-secondary dropdown-toggle btn-sm" type="button"
              :style="`font-family:'${getOption('font-family')}'; font-weight:${getOption('font-weight')}`"
              slot="dropdown-button">
              {{getOption('font-size')}}
            </button>
            <a v-for="idx in 20" slot="dropdown-items"
              class="dropdown-item"
              href="#!"
              :style="`font-family:'${getOption('font-family')}'; font-weight:${getOption('font-weight')}`"
              @click="setOption('font-size', `${idx*10}%`)">
              {{idx*10}}%</a>
          </dropdown>
        </div>
        <hr>
      <!-- Font Family -->
        <div class="input-group">
          <span class="input-group-addon">Font Family</span>
          <dropdown :class="'font-family-dropdown'">
            <button class="btn btn-secondary dropdown-toggle btn-sm" type="button"
              :style="`font-family:'${getOption('font-family')}'; font-weight:${getOption('font-weight')}`"
              slot="dropdown-button">
              {{getOption('font-family')}}
            </button>
            <a v-for="font in fontList" slot="dropdown-items"
              class="dropdown-item"
              href="#!"
              @click="setOption('font-family', font)"
              :style="`font-family:'${font}'; font-weight:${getOption('font-weight')}`">
              {{font}}</a>
          </dropdown>
        </div>
        <hr>
      <!-- Font Options End -->
      <button class="btn btn-outline-primary btn-rdm-color"
        @click="() => setOption('color', randomDarkColor())">
        Random Text Color
        <i class="fa fa-square" aria-hidden="true"
          :style="`width:2em; color:${getOption('color')}`"></i>
      </button>
    </div>
    <div class='text-preview' :style="previewTextStyleStr">
      <p>{{testText1}}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import dropdown from '~components/public/dropdown'
import {calcStyleStr} from '~/server/utils'

const objectPath = require('object-path')

export default {
  components: {
    dropdown
  },
  props: {
    optionPath: {
      required: true
    }
  },
  computed: {
    ...mapGetters(['fontList']),
    ...mapState(['styleOptions']),
    previewTextStyleStr () {
      return calcStyleStr(this.styleOptions[this.optionPath])
    }
  },
  data () {
    return {
      testText1: 'They stared, too, with a sullen indifference at the spectacle of a sergeant who entered their camp escorting a half-dozen recruits, and, with stiff salutation, turned them over to the captain at the door of his tent. The men of Company F might have studied these bounty-men, as they stood in file waiting for the company’s clerk to fill out his receipt, with more interest, had it been realized that they were probably the very last men to be enrolled by the Republic for the Civil War. But nobody knew that, and the arrival of recruits was an old story in the —th New York, which had been thrust into every available hellpit, it seemed to the men, since that first cruel corner at Bull Run. So they scowled at the newcomers in their fresh, clean uniforms, as these straggled doubtfully toward the fire, and gave them no welcome whatever.'
    }
  },
  methods: {
    ...mapMutations(['setOption']),
    getOption (additionalPath) {
      let path = [...this.optionPath, additionalPath]
      return objectPath.get(this.styleOptions, path)
    },
    setOption (additionalPath, newVal) {
      let path = [...this.optionPath, additionalPath]
      objectPath.set(this.styleOptions, path, newVal)
    },
    randomDarkColor () {
      return '#' + Array(3).fill(null).map(() => {
        return Math.round(0x77 * Math.random()).toString(16).padStart(2, '0')
      }).join('')
    }
  }
}
</script>

<style lang="scss" scoped>
/*
About flex items, width, max-width, min-width, flex-grow...
1. width determines if if should wrapped to next line
2. flex-grow determines how to allocation the rest of space generated by LF
3. max-width override flex-grow
 */
.font-list-view {
  display: flex;
  flex-flow: row wrap;
}
.text-preview {
  margin: 0 .62em;
  width: 61.8%;
  flex-grow: 1;
}
.font-option {
  // min-width: 10.5em;
  // max-width: 10.5em;
  min-width: 10.5em;
  display: flex;

  flex-flow: column;
  * {
    width: 100%;
    margin: .05em 0;
  }

  flex-grow: 1;
}
.input-group-addon {
  border: none;
  background: none;
  text-align: left;
}
.dropdown-toggle {
  border: none;
  margin-top: .4em;
}
.btn-rdm-color {
  margin-top: .618em;
}
</style>
