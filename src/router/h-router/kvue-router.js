/*
 + 【Vue-Router源码】 https://juejin.cn/post/6991640600533532679
 +  
*/


let Vue; // Vue的构造函数，插件中使用，不需要导入Vue

class VueRouter {
  constructor(options) {
    this.$options = options;
    // 响应式的数据，router-view会根据地址变化重新渲染
    const initial = window.location.hash.slice(1) || '/';
    // 给对象定义响应式属性
    Vue.util.defineReactive(this, 'current', initial);

    //监听hash的变化
    window.addEventListener('hashchange', () => {
      // 截取地址中#标识符后面的内容
      this.current = window.location.hash.slice(1);
    });
  }
}

// 作为插件必须包含install方法？？？,vue会在Vue.use调用是导入
VueRouter.install = function(_vue) {
  Vue = _vue;
  // (1) this.$router.push
  // 延迟到router创建完毕后并且附加到根Vue实例的Options后才执行
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  //（2）全局注册 router-view router-link
  // (2-1) router-link
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // this.$slots.default : 插槽中的内容
      // # -- hash 模式
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default);
    },
  });

  Vue.component('router-view', {
    render(h) {
      // 拿到当前的地址，找到配置路由表的组件，然后渲染出来
      let component = null;
      // 嵌套路由
      const route = this.$router.$options.routes.find((route) => {
        return route.path === this.$router.current;
      });
      if (component) {
        component = route.component;
      }
      return h(component);
    },
  });
};

export default VueRouter;
