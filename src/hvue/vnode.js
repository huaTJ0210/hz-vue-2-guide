export default class VNode {
  // constructor(
  //   tag,
  //   data,
  //   children,
  //   text,
  //   elm,
  //   context,
  //   componentOptions,
  //   asyncFactory
  // ) {}
  /*
    （1）vnode是节点描述对象，他描述了应该怎样去创建真实的DOM节点，
        所有真实的DOM结点都是用vnode创建并插入到页面
    + tag：元素节点的名称
    + text：文本节点的文本
    + children：子节点

    (2)vnode的类型
    + 注释节点
    + 文本节点
    + 元素节点
    + 组件节点
    + 函数式结点

  */
}

/*
 （1）创建一个注释节点
*/
export const createEmptyVNode = text => {
  const node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

/*
  (2) 文本节点
  有效属性是text
*/

/*
 （3） 静态节点除了第一次需要创建VNode对象以外，
  组件的状态改变后，静态节点没有发生变化，就不需要执行渲染函数生成新的静态节点的vnode
*/
export function cloneVNode(vnode, deep) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.isCloned = true;
  if (deep && vnode.children) {
    cloned.children = cloneVNode(vnode.children);
  }
  return cloned;
}

/*
  (4) 元素节点

  tag： 节点名称 li p ul div
  data ： attrs、class、style
  children： 子节点
  context： 当前组件的vue实例

  <p><span>hello</span></p>
*/
export const ele = {
  children: [],
  context: {},
  data: {},
  tag: 'p'
};
/*
  (5)组件节点
  componentOptions： 组件结点的选项参数：
  componentInstance： 组件的实例

  <child></child>
*/
export const com = {
  componentOptions: {},
  componentInstance: {},
  context: {},
  data: {},
  tag: 'vue-component-1-child'
};

/*
 (6)函数式组件

*/
export const func = {
  functionContext: {},
  functionOptions: {},
  context: {},
  data: {},
  tag: 'vue-component-1-child'
};

/*
  （1）patch:将vnode渲染成真实的DOM
  + patching算法：通过它渲染真实DOM时，不是暴力覆盖原有的DOM，
  而是对比新旧两个vnode之间有哪些不同，然后根据对比结果找出需要更新的结点
  + 本质是把大量的DOM操作搬运到JavaScript中，最大限度的减少DOM的操作


  （2） 对DOM进行修改需要做三件事情
  + 创建新增的节点 : 1.首次渲染 2、newVNode和oldVNode完全不同时
  + 删除已经废弃的节点
  + 修改需要更新的节点

  （3） 更新节点的过程
  + vnode与old vnode 完全一致（两个对象对比isEqual）直接返回
  + vnode与old vnode都是静态节点，直接返回
  + vnode是text节点，old vnode的文本内容不一致，，直接将vnode的文本替换真实DOM中的内容
  + vnode有children，old vnode也有children，走子节点跟新流程
  + vnode没有children，则删除old vnode在真实DOM中对应的 text或者子节点

  （4）更新子节点流程
  + 遍历vnode的children，将当前遍历的子vnode在 old vnode的children中进行查找
  （4-1）新增子节点
  + 若没有查找到则新建节点并将节点插入到真实DOM【待处理】节点的前面 -- 参照对象是old vnode 
    如果插入到已处理了对象之后会出现位置的错乱
  （4-2）更新子节点
  + 若在old vnode的children中查找到了节点并且位置一样，则进行节点的更新操作 详细见步骤（3）
  （4-3）移动子节点
  + 如果在old vnode的children中查到了节点但位置不一样，除了更新操作还需要以新的vnode的位置为基准进行移动【Node.insertBefore】
  具体位置：所有未处理节点的前面
  （4-4）删除节点
  + 当vnode的children中的所有子节点已经循环完毕，old vnode的children中剩余未处理的节点就需要删除
  
  （4-5）优化策略 - 快捷查找
  + 前前
  + 后后
  + 后前
  + 前后


  （5）vue中设置key的作用
   + 列表中设置key的作用：使用key在进行vnode的比对时能提供path过程的效率,尤其是列表的插入操作，能减少node的更新次数。
   + 避免出现vue就地复用组件造成的bug：例如切换组件，input的内容如果不用key则会造成数据遗留
   + transition:中key能够保证元素发生改变，引发过渡效果
   + vue组件被复用，动态路由参数无法引发生命周期钩子的触发，可以设置key

   （6）vue列表中的key为什么不要使用index
   [
     {name:'li'},
     {name:'wang'},
     {name:'zhang'},
     {name:'hua'}
   ]
   + 如果使用index作为key，若执行的是删除操作，index为1的元素被删除了，
   原本的index为2，3的元素key发生了改变，就会引发重新的渲染

*/

const oldNodes = [];
const newNodes = [];

// 记录旧结点列表中首个未处理的结点
let unhandleOldNodeIndex = 0;

for (let index = 0; index < newNodes.length; index++) {
  const newNode = newNodes[index];
  for (let indey = 0; indey < oldNodes.length; indey++) {
    const oldNode = oldNodes[indey];
    if (!isEqual(newNode, oldNode)) {
      console.log('不一致');
      // 将新建节点插入到unhandleOldNodeIndex结点之前
    } else {
      console.log('一致');
      // 判断位置是否一致
      if (index !== indey) {
        //将新node插入到unhandleOldNodeIndex之前
      } else {
        //
      }
      unhandleOldNodeIndex++;
      break; // 跳出当前循环
    }
  }
}

function isEqual(x, y) {
  return x === y;
}

// 优化之后的子元素对比更新过程

