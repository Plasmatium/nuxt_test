<script>
import baseMenu from '~components/public/baseMenu.vue'
import slider from '~components/public/slider.vue'
import dropdown from '~components/public/dropdown'
import fontList from '~components/public/fontList'
import expandOnClick from '~/functionalComponents/expandOnClick.mixin'
import {mapGetters, mapState} from 'vuex'

export default {
  render (h) {
    let iconList = ['fa-file-text-o', 'fa-paragraph', 'fa-bars', 'fa-clone']
    let iconListDom = iconList.map(icon => {
      return <i class={'fa ' + icon} slot="icon"></i>
    })

    let ttlList = ['Main Text', 'Title', 'Menu', 'Board']
    let sheetDom = ttlList.map(ttl => {
      return (
        <div ttl={ttl} slot="sheet">
          <font-list optionPath={['currMenuStyle']} />
        </div>
      )
    })

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
          {[...iconListDom, ...sheetDom]}
        </slider>
      </base-menu>
    )
    return rsltDom
  },
  mixins: [expandOnClick],
  components: {
    'base-menu': baseMenu,
    'font-list': fontList,
    slider,
    dropdown
  },
  computed: {
    ...mapGetters(['fontList']),
    ...mapState([''])
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
