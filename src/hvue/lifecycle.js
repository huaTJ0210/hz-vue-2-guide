//** 生命周期相关的实例方法 */

export function lifeCycle(Vue) {
  Vue.prototype.$forceUpdate = function() {
    //** 仅仅影响实例本身以及插入插槽内容的子组件而不是所有子组件 */
    const vm = this
    //** 获取vm实例上的watcher执行update函数 */
    if (vm._watcher) {
      vm._watcher.update()
    }
  }

  //**移除一个vue实例 */
  Vue.prototype.$destroy = function() {
    const vm = this
    // 防止重复触发
    if (vm._isBeingDestoryed) {
      return
    }
    //** (0)触发生命周期beforeDestory*/
    callHook(vm, 'beforeDestory')
    vm._isBeingDestoryed = true

    //** (1)删除自己与父节点之间的联系 */
    const parent = vm.$parent
    //** 存在父级、同时父级没有被销毁而且不是抽象 */
    if (parent && !parent._isBeingDestoryed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }

    //** （2）从watcher监听的所有状态的依赖列表中移除watcher*/
    if (vm._watcher) {
      // 组件内所有状态的更新都会通知同一个watcher
      //** 为什么vue.js使用异步更新队列？？？ */
      //** Vue.js2.0使用虚拟DOM进行渲染，变化侦测通知只发送到组件，组件内用到的所有状态的变化都会通知到同一个watcher */
      //** 然后虚拟DOM会对整个组件进行对比并更改DOM，也就是说如果在同一轮事件循环中有两个数据发生变化，那么watcher会收到2份通知 */
      //** 从而进行两次渲染，事实并不需要渲染两次，虚拟DOM会等待所有状态更改完毕后统一渲染 */
      vm._watcher.teardown()
    }

    //** （3）销毁vm.$watch创建的watcher */
    let i = vm._watchers.length
    while (i--) {
      vm.watchers[i].teardown()
    }
    // 代表vue组价已被销毁
    vm._isDestroyed = true
    //**（4）vm.$destroyed执行时，Vue.js不会将已经渲染到页面的DOM节点移除，但会将模板中的所有指令解绑 */
    vm.__patch__(vm.vnode, null)

    //** （5）触发destoryed钩子 */
    callHook(vm, 'destoryed')

    //**（6）移除所有的事件监听器 */
    vm.$off()
  }
}
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/***  执行钩子函数 */

function callHook(hook, vm) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, l = handlers.length; i < l; i++) {
      try {
        handlers[i].call(vm)
      } catch (error) {
        errorHandler(vm, error)
      }
    }
  }
}

/**
 *  错误处理
 */

function errorHandler() {}

export function renderMixin(Vue) {
  //** 将回调延迟到【下一次DOM更新周期】之后执行 */
  //**使用场景：当更新了状态后，需要对新DOM做一些操作，但此时获取的不是最新的DOM，因为此时还没有重新渲染，这时候需要nextTick */
  Vue.prototype.$nextTick = function(fn) {
    //** vm.$nextTick将fn添加到下一微任务执行时更新DOM */
    nextTick(fn, this)
  }
}

//** nextTick */
const callbacks = [] //存储用户注册的回调
let pending = false // 是否已向任务队列中添加了一个任务；

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0, len = copies.length; i < len; i++) {
    copies[i]()
  }
}

let microTimerFunc

let macroTimerFunc
if (typeof setImmediate !== 'undefined') {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel != 'undefined') {
  const channel = new MessageChannel()
  const port = channel.port2()
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage()
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
  }
} else {
  microTimerFunc = macroTimerFunc
}

let useMacroTask = false

//** 包裹事件的回调函数，使得事件的回调函数中调用vm.$nextTick中执行的回掉会被发送宏任务队列中 */
export function withMacroTask(fn) {
  //** 例如点击事件触发回调，会使得fn._withTask执行 */
  return (
    fn._withTask ||
    (fn._withTask = function() {
      useMacroTask = true
      const res = fn.apply(null, arguments)
      useMacroTask = false
      return res
    })
  )
}

function nextTick(cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx)
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  //** nextTick 不传递回调函数 */
  if (!cb && typeof Promise != 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
