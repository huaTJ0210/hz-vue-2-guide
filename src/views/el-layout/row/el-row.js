export default {
  name: 'ElRow',
  componentName: 'ElRow',
  props: {
    gutter: Number,
    tag: {
      type: String,
      default: 'div'
    },
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: String
  },
  computed: {
    style() {
      let ret = {}
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter}/2` + 'px'
        ret.marginRight = ret.marginLeft
      }
      return ret
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        classList: [
          'el-row',
          this.justify !== 'start' ? `is-justify-${this.justify}` : '',
          this.align ? `is-align-${this.align}` : '',
          { 'el-row-flex': this.type === 'flex' }
        ],
        style: this.style
      },
      this.$slot.default
    )
  }
}
