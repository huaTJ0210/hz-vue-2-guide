/**
 ** 如果provide是函数类型需要执行得到对象数据
 ** 然后直接设置到 vm._provide中
 ** @param 
*/
export function initProvide(vm) {
  const options = vm.$options
  const provide = options.provide
  if (provide) {
    vm._provide = typeof provide === 'function' ? provide.call(vm) : provide
  }
}
