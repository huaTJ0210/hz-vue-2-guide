const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
[('push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse')].forEach(
  method => {
    const originMethod = arrayProto[method];
    Object.defineProperty(arrayMethods, method, {
      value: function mutator(...args) {
        //
        const ob = this.__ob__;

        let inserted;
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.slice(2);
            break;
        }
        if (inserted) {
          // 对新增的数组元素增加响应式监听
          ob.observeArray(inserted);
        }
        const value = originMethod.apply(this, args);
        // 依赖发出通知后，将watcher放到队列中，在nexttick中执行watcher的回调
        // 同时在添加watcher的时候会
        ob.dep.notify(); 
        return value;
      },
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
);

/*
  (1) 侦测数组变化的行为 -- 引发数组自身变动的方法，采用拦截器的方式进行拦截
 （2）如何收集依赖？ -- 
*/
