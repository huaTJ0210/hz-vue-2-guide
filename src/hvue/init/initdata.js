import Observer from '../observer'
export function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  if (typeof data !== 'object') {
    data = {}
  }
  // 将data代理到Vue.js的实例上
  const keys = Object.keys(data)
  // const props = vm.$options.props
  // const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    // props 和 methods中不能包含key
    Object.defineProperty(vm, key, {
      get() {
        return data[key]
      },
      set(value) {
        return (data[key] = value)
      }
    })
  }
  // 初始化响应式
  Observer(data, true)
}
