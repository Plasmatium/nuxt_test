<!-- <template lang="html">
  <baseMenu id="option-menu" ref="root" :class="{expand: isExpand}">
    <i class="fa fa-cog menu-icon" slot="menu-icon"></i>
    <i class="fa fa-power-off close-icon" v-close-expand></i>
    <div slot="main-panel">
      <slider>
        <i class="fa fa-file-text-o" slot="icon"></i>
        <i class="fa fa-paragraph" slot="icon"></i>
        <i class="fa fa-bars" slot="icon"></i>
        <i class="fa fa-clone" slot="icon"></i>

        <p slot="sheet" ttl="Main Text">asdf</p>
        <p slot="sheet" ttl="Title">fdsa</p>
        <div slot="sheet" ttl="Menu">
          menu fonts
        </div>
        <p slot="sheet" ttl="Board">fdsa</p>
      </slider>
    </div>
  </baseMenu>
</template> -->

<script>
import baseMenu from '~components/public/baseMenu.vue'
import slider from '~components/public/slider.vue'
import dropdown from '~components/public/dropdown'
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'
import {mapGetters} from 'vuex'

export default {
  render (h) {
    let fontsDomList = this.fontList.map(font => {
      let style = `font-family: ${font}; font-weight: 300`
      return (
        <a
          class="dropdown-item"
          href="#!"
          slot="dropdown-items"
          style={style}>{font}</a>
      )
    })
    let dropdownMenu = (
      <dropdown>
        <a
        slot="dropdown-button"
        class="btn btn-secondary dropdown-toggle"
        role="button"
        href="#!">
          Font List
        </a>
        {fontsDomList}
      </dropdown>
    )

    let iconList = ['fa-file-text-o', 'fa-paragraph', 'fa-bars', 'fa-clone']
    let iconDomList = iconList.map(icon => {
      return <i class={'fa ' + icon} slot="icon"></i>
    })

    let ttlList = ['Main Text', 'Title', 'Menu', 'Board']
    let sheetDomList = ttlList.map(ttl => {
      return (
        <div ttl={ttl} slot="sheet">
          TEST Text
          {dropdownMenu}
        </div>
      )
    })
    iconDomList
    sheetDomList

    let closeIcon = h('i', {
      class: ['fa', 'fa-power-off', 'close-icon'],
      attrs: {
        [this.closeExpand]: ''
      }
    }, [])
    let rsltDom = (
      <base-menu id="option-menu" class={this.isExpand ? 'expand' : ''}>
        <i class="fa fa-cog menu-icon" slot="menu-icon"></i>
        {closeIcon}
        <slider slot="main-panel">
          {[...iconDomList, ...sheetDomList]}
        </slider>
      </base-menu>
    )
    // rsltDom.context.$slots = Object.assign(rsltDom.context.$slots, {
    //   'menu-icon': [<i class="fa fa-cog menu-icon" slot="menu-icon"></i>],
    // })

    return rsltDom
  },
  mixins: [expandOnClick],
  components: {
    'base-menu': baseMenu,
    slider,
    dropdown
  },
  computed: {
    ...mapGetters(['fontList'])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#option-menu {
  color: purple;
  top: 1.618em;
  right: 10%;
  .expand {
    right: 8%;
  }
}
.close-icon {
  font-size: 1.62em;
  position: absolute;
  right: 1em;
  top: 0.62em;
  color: rgba(255,255,255,0);
  text-shadow: 0 0 .1em;
}
.expand>.close-icon {
  color: red;
  top: 1.62em;
}
.expand>.close-icon:hover {
  text-shadow: 0 0 .4em;
}
</style>
