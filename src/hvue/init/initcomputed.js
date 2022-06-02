import Watcher from '../watcher'
/*
 * ** 计算属性：根据响应式数据返回运算后的结果，如果，依赖的响应式数据没有发生变动
 *** 则使用缓存数据；
 */

//** 实例化watcher的时候告知当前实例化的是计算属性的watcher */
const computeWatcherOptions = { computed: true }

export function initComputed(vm, computed) {
  const watchers = (vm._computedWatchers = Object.create(null))
  const isSSR = isServerRendering()

  for (let key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (getter === null) {
      console.log('getter is not allowed null')
    }
    if (!isSSR) {
      // 不是服务端渲染的情况下
      watchers[key] = new Watcher(vm, getter, noop, computeWatcherOptions)
    }
    if (!(key in vm)) {
      // 如果计算属性key不在vm上则需要将key设置到vm上
      defineComputed(vm, key, userDef)
    } else {
      // key not in $data props
    }
  }
}

function defineComputed(target, key, userDef) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef
      : noop
    sharedPropertyDefinition.set = userDef.set
  }
  // 将计算属性设置到vm实例上
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
/*
function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
       // dirty作为标识主要是用于判断当前计算属性的值是否有变化：缓存就是利用这个判断的 
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        // 将读取计算属性的Watcher添加到计算属性所依赖的所有状态的依赖列表中
        watcher.depend()
      }
      return watcher.value
    }
  }
}
*/

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      watcher.depend() // 将watcher添加到当前计算属性的依赖列表中
      return watcher.evalute()
    }
  }
}

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

function isServerRendering() {}
function noop() {}
