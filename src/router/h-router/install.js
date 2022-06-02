import RouterView from './component/view';
import RouterLink from './component/link';

let Vue = null;
export function install(_vue) {
  // (1) 判断VueRouter是否已经挂载，避免Vue.use(VueRouter)的重复执行
  if (install.installed && Vue === _vue) {
    return;
  }
  install.installed = true;
  Vue = _vue;
  // (2) 利用根组件Vue实例创建，获取到options中的参数初始化
  // 根组件上的属性（_routerRouter、_router、_route）
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // 判断根Vue实例上已挂载了router
        this._routerRoot = this;
        this._router = this.$options.router;
        // 调用VueRouter实例初始化方法
        this._router.init(this);

        // 将_route定义为响应式
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        // 除了根Vue实例其他组件，如果有父组件，则赋值父组件的_routerRoot
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
    },
  });

  // （3）为每个Vue组件实例挂载 $router $route
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router;
    },
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route;
    },
  });

  // （4）注册全局组件 router-view router-link
  Vue.component('RouterView', RouterView);
  Vue.component('RouterLink', RouterLink);
}


// ---  Vue.use的原理 ----

const Vue1 = {};

Vue1.use = function(plugin /*Function | Object*/) {
  // installedPlugins为已安装插件列表，若 Vue 构造函数不存在_installedPlugins属性，初始化
  const installedPlugins =
    this._installedPlugins || (this._installedPlugins = []);
  // 判断当前插件是否在已安装插件列表，存在直接返回，避免重复安装
  if (installedPlugins.indexOf(plugin) > -1) {
    return this;
  }

  // toArray方法将Use方法的参数转为数组并删除了第一个参数（第一个参数就是我们的插件）
  const args = [].slice.call(arguments, 1);
  // use是构造函数Vue的静态方法，那这里的this就是构造函数Vue本身
  // 把this即构造函数Vue放到参数数组args的第一项
  args.unshift(this);
  if (typeof plugin.install === 'function') {
    // 传入参数存在install属性且为函数
    // 将构造函数Vue和剩余参数组成的args数组作为参数传入install方法，将其this指向插件对象并执行install方法
    plugin.install.apply(plugin, args);
  } else if (typeof plugin === 'function') {
    // 传入参数是个函数
    // 将构造函数Vue和剩余参数组成的args数组作为参数传入插件函数并执行
    plugin.apply(null, args);
  }
  // 像已安装插件列表中push当前插件
  installedPlugins.push(plugin);
  return this;
};
