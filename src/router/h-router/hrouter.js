import { install } from './install';
import { AbstractHistory } from './history/abstract';
import { HashHistory } from './history/hash';
import { HTML5History } from './history/html5';

import { START } from './utils/route';

import { createMatcher } from './create-matcher';
const inBrowser = typeof window !== 'undefined';

class VueRouter {
  constructor(options) {
    this.options = options;
    // 将路由配置信息转换成routeMap：{'/a/b/c' : record,}
    this.matcher = createMatcher(options.routes);
    let mode = options.mode || 'hash';
    if (!inBrowser) {
      mode = 'abstract';
    }
    this.mode = mode;

    //实现hooks
    this.beforeHooks = [];
    this.resolveHooks = [];
    this.afterHooks = [];

    switch (this.mode) {
      case 'hash':
        this.history = new HashHistory(this);
        break;
      case 'history':
        this.history = new HTML5History(this);
        break;
      case 'abstract':
        this.history = new AbstractHistory(this);
        break;
      default:
        if (process.env.NODE_ENV !== 'production') {
          throw new Error(`[vue-router] invalid mode: ${mode}`);
        }
    }
  }
  // 匹配路由
  match(location) {
    return this.matcher.match(location);
  }

  // 获取所有活跃的路由记录列表
  getRoutes() {
    return this.matcher.getRoutes();
  }

  // 动态添加路由（添加一条新路由规则）
  addRoute(parentOrRoute, route) {
    this.matcher.addRoute(parentOrRoute, route);
    // 新增
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation());
    }
  }

  // 动态添加路由（参数必须是一个符合 routes 选项要求的数组）
  addRoutes(routes) {
    this.matcher.addRoutes(routes);
    // 新增??? 
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation());
    }
  }

  init(app) {
    // 绑定destroyed hook，避免内存泄露:  $emit('hook:xxx')触发回调函数执行
    /*
       +在模板中通过 @hook:created 这种形式注册。
       + JS 中可通过vm.$on('hook:created', cb) 或者 vm.$once('hook:created', cb) 注册，vm 指当前组件实例。
        (1)如何在父组件中监听子组件生命周期:
       答案就是在父组件中获取到子组件实例（vm），然后通过注册hook: 前缀+生命周期钩子的特殊事件监听就可以了
       */
    app.$once('hook:destroyed', () => {
      if (!this.app) this.history.teardown();
      this.app = null;
    });

    // 存在即不需要重复监听路由
    if (this.app) return;

    this.app = app;

    // 跳转当前路由path匹配渲染 用于页面初始化
    this.history.transitionTo(
      // 获取当前页面 path
      this.history.getCurrentLocation(),
      () => {
        // 启动监听放在跳转后回调中即可
        console.log('----（1）启动监听');
        this.history.setupListeners();
      }
    );
    // 新增
    // 传入赋值回调，为_route赋值，进而触发router-view的重新渲染
    // 当前路由对象改变时调用
    this.history.listen((route) => {
      app._route = route;
    });
  }

  // 导航到新url，向 history栈添加一条新访问记录
  push(location) {
    this.history.push(location);
  }

  // 在 history 记录中向前或者后退多少步
  go(n) {
    this.history.go(n);
  }

  // 导航到新url，替换 history 栈中当前记录
  replace(location, onComplete) {
    this.history.replace(location, onComplete);
  }

  // 导航回退一步
  back() {
    this.history.go(-1);
  }

// ------  hook的callback的装载-----
  beforeEach (fn) {
    return this.registerHook(this.beforeHooks, fn)
  }

  beforeResolve (fn){
    return this.registerHook(this.resolveHooks, fn)
  }
 /*
   history的 confirmTransition 成功回调函数中遍历
    this.router.afterHooks.forEach(hook => {
          hook && hook(route, prev)
        })
 */
  afterEach (fn) {
    return this.registerHook(this.afterHooks, fn)
  }

  registerHook (list, fn) {
    list.push(fn)
    return () => {
      const i = list.indexOf(fn)
      if (i > -1) list.splice(i, 1)
    }
  }
}

VueRouter.install = install;

export default VueRouter;
