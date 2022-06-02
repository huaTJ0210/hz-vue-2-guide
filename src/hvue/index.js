import Watcher from './watcher'
import { set, del } from './observer'
/*
  （1） $watch的内部原理
*/
const _Vue = {}
_Vue.prototype.$watch = function(expOrFn, cb, options) {
  const vm = this
  options = options || {}
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    cb.call(vm, watcher.value)
  }
  return function unwatchFn() {
    watcher.teardown()
  }
}

/*
  $set : 给响应式对象添加属性后，属性也会变成响应式的
  vm.$set(target,key,value); // target不能是vue实例或者根vue的data
*/
_Vue.prototype.$set = set

/*
  vm.$delete(target,key);
*/

_Vue.prototype.$delete = del

/** 
 使用extendOptions创建一个vue实例
*/
_Vue.extend = function (extendOptions) {
  
}
