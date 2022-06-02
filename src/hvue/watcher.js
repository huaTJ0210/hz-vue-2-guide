import Dep from './dep'

const seenObjects = new Set()
export default class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    // vue实例中创建 watchers记录所有创建的watcher实例
    vm._watchers.push(this)

    if (options) {
      this.deep = !!options.deep
      this.computed = !!options.computed
    } else {
      this.deep = false
      this.computed = false
    }
    // 记录watcher已经被哪些依赖deps收集
    this.deps = []
    this.depIds = new Set()
    //计算属性是否缓存
    this.dirty = this.computed

    if (typeof expOrFn === 'function') {
      //** 函数执行时，函数内部读取的属性都会将watcher添加到自己的响应式列表中
      //** vue实例挂载时： expOrFn = （）=>{ vm._update(vm._render())}
      this.getter = expOrFn
    } else {
      this.getter = this.parseKeyPath(expOrFn)
    }
    this.cb = cb
    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
  }

  evaluate() {
    if (this.dirty) {
      this.value = this.get()
      this.dirty = false
    }
    return this.value
  }

  depend() {
    //**  将组件的watcher实例添加到dep实例的依赖列表中：
    //** 完成了组件watcher对于计算属性用到的所有的状态的监测

    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
    // --计算属性:将组件的watcher添加到计算属性的依赖列表中
    if (this.dep && Dep.target) {
      this.dep.depend()
    }
  }

  addDep(dep) {
    const id = dep.id
    if (!this.depIds.has(id)) {
      this.depIds.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  teardown() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].removeSub(this)
    }
  }

  get() {
    window.target = this
    const value = this.getter.call(this.vm, this.vm)
    if (this.deep) {
      //递归value的所有子值来触发它收集依赖的功能
      this.traverse(value)
    }
    window.target = undefined
    return value
  }

  update() {
    if (this.computed) {
      //**计算属性的数据发生变动， */
      if (this.dep.subs.length === 0) {
        this.dirty = false
      } else {
        this.getAndInvoke(() => {
          this.dep.notify()
        })
      }
    } else {
      const oldValue = this.value
      const newValue = this.get()
      this.cb.call(this.vm, newValue, oldValue)
    }
  }

  getAndInvoke(cb) {
    const value = this.get()
    if (value !== this.value || typeof value === 'object' || this.deep) {
      const oldValue = this.value
      this.value = value
      this.dirty = false
      if (this.user) {
        try {
          cb.call(this.vm, value, oldValue)
        } catch (error) {
          console.log('callback for watcher:', this.expression)
        }
      } else {
        cb.call(this.vm, value, oldValue)
      }
    }
  }

  parseKeyPath(expOrFn) {
    const segement = expOrFn.split('.')
    return function(obj) {
      for (let i = 0, length = segement.length; i < length; i++) {
        if (!obj) {
          return
        }
        obj = obj[segement[i]]
      }
      return obj
    }
  }
  traverse(val) {
    this._traverse(val, seenObjects)
    seenObjects.clear()
  }

  _traverse(val, seen) {
    let i, keys
    const isA = Array.isArray(val)
    if ((!isA && typeof val !== 'object') || Object.isFrozen(val)) {
      return
    }
    if (val.__ob__) {
      const depId = val.__ob__.dep.id
      if (seen.has(depId)) {
        return
      }
      seen.add(depId)
    }
    if (isA) {
      i = val.length
      while (i--) {
        this._traverse(val[i], seen)
      }
    } else {
      keys = Object.keys(val)
      i = keys.length
      while (i--) {
        // val[keys[i]] 会触发getter方法，也就是会触发依赖收集的动作
        this._traverse(val[keys[i]], seen)
      }
    }
  }
}
