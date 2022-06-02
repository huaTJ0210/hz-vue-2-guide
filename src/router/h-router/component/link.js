/*
  RouterLink 
*/
export default {
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      require: true,
    },
  },
  // h ->  createElement函数 -- VNode
  render(h) {
    const href = typeof this.to === 'string' ? this.to : this.to.path;
    const data = {
      attrs: {
        href: this.$router.mode === 'hash' ? '#' + href : href,
      },
      //新增
      on: {
        click: (e) => {
          e.preventDefault();
          this.$router.push(href);
        },
      },
    };
    return h('a', data, this.$slots.default);
  },
};
