let uid = 0
export default class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    this.remove(sub)
  }
  depend() {
    if (window.target) {
      // watcher 收集自己的依赖
      window.target.addDep(this)
    }
  }
  notify() {
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].update()
    }
  }
  remove(sub) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub)
      this.subs.splice(index, 1)
    }
  }
}
