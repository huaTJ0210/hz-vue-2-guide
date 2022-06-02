
/** 
**  vm的options中用户设置了watch则需要对watch进行初始化
** 实现原理是调用vm.$watch(expOrFn,fn,options),创建一个watcher，
** 当watch的属性发生变动时，会通知watcher，watcher执行notify方法，进而调用设置的的callback函数执行
** 用户自身设置的业务逻辑；
*/
export function initWatch(vm, watch) {
  for (let key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      handler.forEach(item => {
        createWatcher(vm, key, item)
      })
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, expOrFn, handler) {
  let options = {}
  if (typeof handler === 'object') {
    options = handler
    handler = options.handler
  }
    // handler是字符串时，挂载的回调函数在methods上
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  vm.$watch(expOrFn, handler, options)
}
