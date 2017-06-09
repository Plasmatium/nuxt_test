import Vuex from 'vuex'
import _fontList from '~/assets/refined_fonts/extra_fonts_list'

const rawFontStr = 'Abel|Actor|Alegreya+Sans|Amiko|Antic|Archivo+Narrow|Assistant|Cabin|Cabin+Condensed|Catamaran|Chivo|Droid+Sans|Ek+Mukta|Hind|Josefin+Sans|Lato|Magra|Marvel|Maven+Pro|Molengo|Muli|Nunito|Nunito+Sans|Open+Sans|Oxygen|PT+Sans|Questrial|Quicksand|Raleway|Roboto|Source+Sans+Pro|Spinnaker'

const store = new Vuex.Store({
  state: {
    currFontFamily: 'Quicksand',
    currFontWeight: 100,
    currEssayID: null,
    currChptnum: null,

    currMenu: null
  },
  mutations: {
    setFont (state, {font}) {
      state.currFontFamily = font || 'Quicksand'
    },
    setWeight (state, {weight}) {
      state.currFontWeight = weight || 100
    },
    setIdChptNum (state, {essayID, chptnum}) {
      state.currEssayID = essayID
      state.currChptnum = chptnum
    },
    showMenu (state, {menu}) {
      Object.assign(state, 'currMenu', menu || null)
      console.log(state.currMenu)
    }
  },
  getters: {
    fontList () {
      return _fontList.concat(rawFontStr.replace(/\+/g, ' ').split('|'))
    },
    calcTmpStyle: ({currFontWeight}) => ({ font = 'Arial', weight = currFontWeight }) => {
      return {'font-family': font, 'font-weight': weight}
    },
    calcBackgroundStyle: ({ currFontFamily, currFontWeight }) => {
      return {'font-family': currFontFamily, fontWeight: currFontWeight}
    },
    menuFont () {
      return _fontList[14]
    }
  }
})

export default () => store
