import Vuex from 'vuex'

const rawFontStr = 'Abel|Actor|Alegreya+Sans|Amiko|Antic|Archivo+Narrow|Assistant|Cabin|Cabin+Condensed|Catamaran|Chivo|Droid+Sans|Ek+Mukta|Hind|Josefin+Sans|Lato|Magra|Marvel|Maven+Pro|Molengo|Muli|Nunito|Nunito+Sans|Open+Sans|Oxygen|PT+Sans|Questrial|Quicksand|Raleway|Roboto|Source+Sans+Pro|Spinnaker'

const store = new Vuex.Store({
  state: {
    currFontFamily: 'Muli',
    currFontWeight: '400'
  },
  mutations: {
    set_font (state, {font}) {
      console.log(font)
      if (!font) {
        font = state.currFontFamily
      }
      state.currFontFamily = font
    }
  },
  getters: {
    font_list () {
      return rawFontStr.replace(/\+/g, ' ').split('|')
    },
    calc_tmp_style: () => ({font = 'Arial', weight = 'normal'}) => {
      return `font-family: '${font}'; font-weight: '${weight}'`
    },
    calc_background_style: ({ currFontFamily, currFontWeight }) => {
      return `font-family: '${currFontFamily}'; font-weight: '${currFontWeight}'`
    }
  }
})

export default () => store
