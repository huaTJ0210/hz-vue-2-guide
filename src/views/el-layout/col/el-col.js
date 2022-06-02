export default {
  name: 'ElCol',
  component: 'ElCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: String,
    offset: Number,
    push: Number,
    pull: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    gutter() {
      let parent = this.$parent
      while (parent && parent.$options.componentName !== 'ElCol') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    }
  },
  render(h) {
    let classList = []
    let style = {}
    if (this.gutter) {
      style.paddingLeft = `${this.gutter}/2` + 'px'
      style.paddingRight = style.paddingLeft
    }
    // eslint-disable-next-line no-extra-semi
    ;[('span', 'offset', 'push', 'pull')].foreach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        )
      }
    })
    ;[('xs', 'sm', 'md', 'lg', 'xl')].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        let props = this[size]
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          )
        })
      }
    })
    return h(
      this.tag,
      {
        class: ['el-col', classList],
        style
      },
      this.$slot.default
    )
  }
}
