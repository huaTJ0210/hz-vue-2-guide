const _Vue = {};
const mount = _Vue.prototype.$mount;

_Vue.prototype.$mount = function(el) {
  el = el && query(el);//* 可能是字符串或者selector

  const options = this.$options;
  if (!options.render) {
    //** 将模板编译成渲染函数，并赋值给options.render */
    let template = options.template;
    if (template) {
      if (typeof template === 'string') {
        //** 如果template是字符串并且以#开头，则他被用于选择符，通过选择符获取DOM元素后，会使用innerHTML作为模板 */
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          throw new Error('invalid template option:', template, this);
        }
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    //**编译相关的逻辑:将模板编译成渲染函数，并设置到options上*/
    if (template) {
      const { render } = compileToFunctions(template, {}, this);
      options.render = render;
    }
  }
  return mount.call(this, el);
};

function query(el) {
  if (typeof el === 'string') {
    const selected = document.querySelector(el);
    if (!selected) {
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

function idToTemplate(id) {
  const el = query(id);
  return el && el.innerHTML;
}

const cache = {};
function compileToFunctions(template, options) {
  options = Object.assign({}, options);
  // 检查缓存
  const key = options.dellimiters
    ? String(options.dellimiters) + template
    : template;
  if (cache[key]) {
    return cache[key];
  }
  const compiled = compile(template, options);
  const res = {};
  res.render = createFunction(compiled.render);
  return (cache[key] = res);
}

function compile() {}
function createFunction(code) {
  return new Function(code);
}

//** 只包含运行时版本的vm.$mount的实现原理 */
_Vue.prototype.$mount = function(el) {
  el = el && query(el);
  return mountComponent(this, el);
};

function mountComponent(vm) {
  if (!vm.$options.render) {
    vm.$options.render = createEmptyNode();
    if (process.env.NODE_ENV !== 'production') {
      // 开发环境发出警告
    }
  }
  callhook(vm, 'beforeMount');
  //* 为每个vue创建wathcer实例，
  vm._watcher = new Watcher(vm, () => {
    //* vm._render()函数的调用能够将watcher添加到每一个data属性的依赖列表中
    vm._update(vm._render());
  });
  callhook(vm, 'mounted');
  return vm;
}

function createEmptyNode() {}
function callhook() {}
class Watcher {}
