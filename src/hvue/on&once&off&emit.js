const _Vue = {};
/*
 * Vue实例进行初始化时会创建 vm._events = Object.create(null);
 */

/**
 **   每个Vue的实例中包含一个events的Map，通过eventName进行查找
 ** $on 支持单个和多个事件的注册，统一将回调函数注册到Vue实例的events的Map中；
 */

_Vue.prototype.$on = function(event, fn) {
  const vm = this;
  if (Array.isArray(event)) {
    for (let i = 0, len = event.length; i < len; i++) {
      this.$on(event[i], fn);
    }
  } else {
    const events = vm._events[event] || [];
    vm._events[event] = events;
    events.push(event);
  }
  return vm;
};

/*
 * 移除事件的监听
 * （1）参数没有提供则移除所有事件的监听
 * （2）只提供了事件则只移除该事件的监听
 * （3）提供了事件名和回调函数则只移除回调函数的监听器
 */
_Vue.prototype.$off = function(event, fn) {
  const vm = this;
  if (arguments.length === 0) {
    //** 重置当前vue实例的_events
    vm._events = Object.create(null);
    return vm;
  }
  //** 如果是数组则递归调用
  if (Array.isArray(event)) {
    for (let i = 0, len = event.length; i < len; i++) {
      this.$off(event[i], fn);
    }
    return vm;
  }
  const cbs = vm._events[event];
  if (!cbs) {
    return vm;
  }
  if (arguments.length === 1) {
    vm._events[event] = null;
    return vm;
  }
  if (fn) {
    let cb;
    let i = cbs.length;
    //** 代码的遍历时从后往前遍历的，避免影响前面先添加的监听器 */
    while (i--) {
      cb = cbs[i];
      //**cb.fn是为了兼容$once中的拦截器 */
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  }
};

//** $once注册的监听只触发一次回调 */
_Vue.prototype.$once = function(event, fn) {
  const vm = this;
  //** 使用拦截器，在执行$on之后触发回调，使用$off移除监听 * /
  function on() {
    vm.$off(event, fn);
    fn.apply(vm, arguments);
  }
  on.fn = fn;
  vm.$on(event, on);
  return vm;
};

//** $emit 触发事件的执行
_Vue.prototype.$emit = function(event) {
  const vm = this;
  const cbs = vm._events[event];
  if (cbs) {
    const args = [].slice(arguments, 1);
    for (let i = 0, len = cbs.length; i < len; i++) {
      try {
        cbs[i].apply(vm, args);
      } catch (error) {
        throw new Error('${error}');
      }
    }
  }
  return vm;
};
