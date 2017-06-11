import Vuex from 'vuex'
import _fontList from '~/assets/refined_fonts/extra_fonts_list'
import {encodeQuery, decodeQuery} from '~/server/utils'

const rawFontStr = 'Abel|Actor|Alegreya+Sans|Amiko|Antic|Archivo+Narrow|Assistant|Cabin|Cabin+Condensed|Catamaran|Chivo|Droid+Sans|Ek+Mukta|Hind|Josefin+Sans|Lato|Magra|Marvel|Maven+Pro|Molengo|Muli|Nunito|Nunito+Sans|Open+Sans|Oxygen|PT+Sans|Questrial|Quicksand|Raleway|Roboto|Source+Sans+Pro|Spinnaker'

const store = new Vuex.Store({
  state: {
    isServer: null,

    currFontFamily: 'Quicksand',
    currFontWeight: 100,
    currQueryStr: null,

    currMenu: null
  },
  mutations: {
    setRenderSide (state, {isServer}) {
      state.isServer = isServer
    },

    setFont (state, {font}) {
      state.currFontFamily = font || 'Quicksand'
    },
    setWeight (state, {weight}) {
      state.currFontWeight = weight || 100
    },
    setQueryStr (state, {queryStr}) {
      state.currQueryStr = queryStr
    },
    showMenu (state, {menu}) {
      state.currMenu = menu
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
    },

    getIDnNum (state) {
      let query = decodeQuery(state.currQueryStr.q, state.isServer)
      let {essayID, chptnum} = query
      return {essayID, chptnum}
    },

    demoBookStartUrl (state) {
      let query = {essayID: 200, chptnum: 10}
      return encodeQuery(query, state.isServer)
    }
  }
})

export default () => store
