import Vuex from 'vuex'
import fontList from '~/assets/index'
// const fontList = () => import('~/assets/index')

const rawFontStr = 'Abel|Actor|Alegreya+Sans|Amiko|Antic|Archivo+Narrow|Assistant|Cabin|Cabin+Condensed|Catamaran|Chivo|Droid+Sans|Ek+Mukta|Hind|Josefin+Sans|Lato|Magra|Marvel|Maven+Pro|Molengo|Muli|Nunito|Nunito+Sans|Open+Sans|Oxygen|PT+Sans|Questrial|Quicksand|Raleway|Roboto|Source+Sans+Pro|Spinnaker'

const store = new Vuex.Store({
  state: {
    currFontFamily: 'Quicksand',
    currFontWeight: 100,
    essayChunk: null
  },
  mutations: {
    setFont (state, {font}) {
      state.currFontFamily = font || 'Quicksand'
    },
    setWeight (state, {weight}) {
      state.currFontWeight = weight || 100
    },
    injectEssayChunk (state, essayChunk) {
      state.essayChunk = essayChunk
    }
  },
  getters: {
    font_list () {
      return fontList.concat(rawFontStr.replace(/\+/g, ' ').split('|'))
    },
    calcTmpStyle: ({currFontWeight}) => ({ font = 'Arial', weight = currFontWeight }) => {
      return {'font-family': font, 'font-weight': weight}
    },
    calcBackgroundStyle: ({ currFontFamily, currFontWeight }) => {
      return {'font-family': currFontFamily, fontWeight: currFontWeight}
    },
    menu_font () {
      return fontList[14]
    }
  }
})

export default () => store
