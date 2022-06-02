import { arrayMethods } from './arrayMethods';
import Dep from './dep';
import { def, isValidArrayIndex } from './utils';

const hasProto = '__proto__' in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export default class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep(); // 用于收集对象的子项依赖
    def(value, '__ob__', this); // 每个响应对象存储了observer实例,主要用来标记value已经被转化为响应式对象了

    if (Array.isArray(value)) {
      const augment = hasProto ? this.protoAugment : this.copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value); //数组中的元素也要设置为响应式
    } else {
      this.walk(value);
    }
  }

  protoAugment(target, src) {
    target.__proto__ = src;
  }
  copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      def(target, key, src[key]);
    }
  }

  walk(value) {
    const keys = Object.keys(value);
    keys.forEach(key => {
      this.defineReactive(value, key, value[key]);
    });
  }
  defineReactive(data, key, value) {
    let childOb = this.observe(value); //** 子数据进行observe */
    let dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        dep.depend();
        //子类型是数组或者是对象，也需要增加响应式监控
        if (childOb) {
          childOb.dep.depend();
        }
        return value;
      },
      set: function(newValue) {
        if (newValue !== value) {
          newValue = value;
          dep.notify();
        }
      }
    });
  }
  observeArray(value) {
    for (let i = 0, l = value.length; i < l; i++) {
      this.observe(value[i]);
    }
  }
  // 尝试为value创建一个Observer实例；
  observe(value) {
    if (typeof value !== 'object') {
      return;
    }
    let ob;
    // eslint-disable-next-line no-prototype-builtins
    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else {
      ob = new Observer(value);
    }
    return ob;
  }
}

export function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if ((key in target) && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  // 新增key
  const ob = target.__ob_;
  if (target._isVue || (ob && ob.vmCount)) {
    // 不能是vue实例或者Vue实例的根数据对象--data
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  ob.defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

export function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  const ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    // 不能是vue实例或者根实例对象
    return;
  }
  // eslint-disable-next-line no-prototype-builtins
  if (!target.hasOwnProperty(key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}
