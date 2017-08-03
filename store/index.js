import Vuex from 'vuex'
import _fontList from '~/assets/refined_fonts/extra_fonts_list'
import {encodeQuery, decodeQuery} from '~/server/utils'

const objectPath = require('object-path')

// const rawFontStr = 'Abel|Actor|Alegreya+Sans|Amiko|Antic|Archivo+Narrow|Assistant|Cabin|Cabin+Condensed|Catamaran|Chivo|Droid+Sans|Ek+Mukta|Hind|Josefin+Sans|Lato|Magra|Marvel|Maven+Pro|Molengo|Muli|Nunito|Nunito+Sans|Open+Sans|Oxygen|PT+Sans|Questrial|Quicksand|Raleway|Roboto|Source+Sans+Pro|Spinnaker'
const rawFontStr = [
  'Open Sans',
  'Roboto',
  'Slabo 27px',
  'Lato',
  'Source Sans Pro',
  'Raleway',
  'PT Sans',
  'Droid Sans',
  'Arimo',
  'Noto Sans',
  'Alegreya Sans',
  'Dosis',
  'Cabin',
  'Oxygen',
  'Inconsolata',
  'Hind',
  'Nunito',
  'Muli',
  'Josefin Sans',
  'Signika',
  'Crimson Text',
  'Maven Pro',
  'Varela Round',
  'Quicksand',
  'Fira Sans',
  'Questrial',
  'Josefin Slab',
  'Pontano Sans',
  'Istok Web',
  'News Cycle',
  'Quattrocento Sans' ]

const store = new Vuex.Store({
  state: {
    isServer: null,

    currFontFamily: 'Josefin Sans',
    currFontWeight: 400,

    // ----- styleOptions ---------
    styleOptions: {
      currMenuStyle: {
        'font-family': _fontList[14], 'font-weight': '400', 'font-size': '100%'
      },
      currTitleStyle: {
        'font-family': _fontList[15], 'font-weight': '200', 'font-size': '100%'
      },
      currMainTextStyle: {
        'font-family': _fontList[14], 'font-weight': '300', 'font-size': '100%', 'color': '#777'
      },
      currBoardStyle: {
        'font-family': _fontList[14], 'font-weight': '300', 'font-size': '100%'
      }
    },
    // -----------------------

    currQueryStr: null,

    currMenu: null,

    chosenWord: '',
    activeP: null
  },
  mutations: {
    setActiveP (state, {activeP}) {
      // console.time('setActiveP')
      // 首先解除原先active：撤销class，置isActive为false
      if (state.activeP) {
        state.activeP.$el.removeAttribute('class')
        state.activeP.isActive = false
      }
      // 然后，如果传入的不是null，那么：
      // 设定新activeP的class和isActive
      if (activeP) {
        activeP.$el.setAttribute('class', 'active')
        activeP.isActive = true
      }
      // 最后更新state状态
      state.activeP = activeP
      // console.timeEnd('setActiveP')
    },

    setRenderSide (state, {isServer}) {
      state.isServer = isServer
    },

    setFont (state, {font}) {
      state.currFontFamily = font || 'Josefin Sans'
    },
    setWeight (state, {weight}) {
      state.currFontWeight = weight || 400
    },
    setQueryStr (state, {queryStr}) {
      state.currQueryStr = queryStr
    },
    showMenu (state, {menu}) {
      state.currMenu = menu
    },

    setStyle (state, {target, style}) {
      let styleStr = Object.entries(style).map(([styleKey, styleVal]) => {
        return `${styleKey}:${styleVal}`
      }).join(';')
      if (!state[target]) {
        console.error(`state has no property named "${target}"`)
      }
      state[target] = styleStr
    },

    setOption ({styleOptions}, {optionPath, newVal}) {
      objectPath.set(styleOptions, optionPath, newVal)
    }
  },
  getters: {
    fontList () {
      // return _fontList.concat(rawFontStr.replace(/\+/g, ' ').split('|'))
      return [..._fontList, ...rawFontStr]
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
      if (!state.currQueryStr) { return {bookID: 0, chptnum: 0} }
      let query = decodeQuery(state.currQueryStr.q, state.isServer)
      let {bookID, chptnum} = query
      return {bookID, chptnum}
    },

    demoBookStartUrl (state) {
      let query = {bookID: 'a1', chptnum: 1}
      return encodeQuery(query, state.isServer)
    }
  }
})

export default () => store
