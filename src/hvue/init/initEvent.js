/*
  v-on:写在组件标签上，那么这个事件会被注册到子组件vue.js事件系统中；
  如果写在平台标签上则会被注册到浏览器事件中；
*/
export function initEvent(vm) {
  // 初始化的是父组件向子组件注册的事件
  vm._events = Object.create(null)
  // 初始化父组件附加的事件
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

let target

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn)
  } else {
    target.$on(event, fn)
  }
}

function remove(event, fn) {
  target.$off(event, fn)
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm
  updateListeners(listeners, oldListeners, add, remove, vm)
}

function updateListeners(on, oldOn, add, remove) {
  let name, cur, old, event
  for (name in on) {
    cur = on[name]
    old = oldOn[name]
    event = name // 需要特殊处理事件名称，有修饰符
    if (isUndef(cur)) {
      console.log('---event is not allowed undefied-')
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name]
      }
      add(event.name, cur, event.once, event.capture, event.passive)
    } else if (cur !== oldOn) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    // 新增的event事件在在老的列表中找不到就移除
    if (isUndef(on[name])) {
      event = name // 特殊处理
      remove(event.name, oldOn[name], event.capture)
    }
  }
}

function isUndef(obj) {
  return obj === 'undefined' || obj === null
}
