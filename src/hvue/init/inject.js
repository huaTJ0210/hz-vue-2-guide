const observerState = {}

export function initInjection(vm) {
  // 从配置的inject中，根据key找到内容，然后再设置到当前this中
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    observerState.shouldConvert = false
    Object.keys(result).forEach(key => {
      defineReactive(vm, key, result[key])
    })
    observerState.shouldConvert = true
  }
}

//** 根据用户配置的inject，从底部向上找到可用的注入内容 */
function resolveInject(inject, vm) {
  if (inject) {
    const result = Object.create(null)
    const keys = hasSymbol()
      ? Reflect.ownKeys(inject).filter(key => {
          return Object.getOwnPropertyDescriptors(inject, key).enumerable
        })
      : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const provideKey = inject[key].from

      /*
          {
            inject:{
              foo:{
                 from:'foo'
              }
            }
          }
        */
      let source = vm
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }
      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].provideDefault
          result[key] =
            typeof provideDefault === 'function'
              ? provideDefault.call(vm)
              : provideDefault
        }
      }
    }
    return result
  }
}

function defineReactive(obj, key, value) {
  if (!observerState.shouldConvert) {
    // 不需要转化为响应式
  }
  console.log(obj, key, value)
}

function hasSymbol() {}
