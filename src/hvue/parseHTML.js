/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
export function parseHTML(html, options) {
  // *(1)需要循环不断的截取html字符串，直到全部截取完毕
  while (html) {
    if (!lastTag || isPlainTextElement(lastTag)) {
      //*判断父元素是不是纯文本元素【正常标签】
      let textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // 做点什么
        if (comment.test(html)) {
          //*1、注释的处理逻辑
          continue;
        }
        if (conditionalComment.test(html)) {
          //*2、条件注释的处理逻辑
          continue;
        }
        if (html.match(doctype)) {
          //*3、DOCTYPE的处理逻辑
          continue;
        }
        if (html.match(endTag)) {
          //*4、结束标签的处理逻辑
          continue;
        }
        if (html.match(startTag)) {
          //*5、开始标签的处理逻辑
          continue;
        }
      }
      let text, rest, next;
      if (textEnd >= 0) {
        // 解析文本
      }
      if (textEnd < 0) {
        text = html;
        html = '';
      }
      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      //*父元素为script style textarea的处理逻辑
    }
  }
}

// * 解析器原理
/*
  + 解析HTML模板就是一个循环的过程
  + 
*/
//*  <div><p>I am li</p></div>
//* 解析上面模板一次触发的钩子 ： start start chars end end；
//* 因此可以在钩子函数中创建AST节点
parseHTML(template, {
  start(tag, attrs, unary) {
    //* 每当解析到标签的开始位置时，触发该函数：创建AST的元素节点
    //* tag: 标签 attrs：属性 unary：是否为自闭合标签--img input之类的
    let element = createASTElement(tag, attrs, unary);
  },
  end() {
    //* 每当解析到标签的结束位置时，触发该函数：
  },
  chars(text) {
    let element = { type: 3, text };
    //* 每当解析到文本类型时触发：创建AST的文本节点
    text = text.trim();
    if (text) {
      const children = currentParent.children;
      let expression = parseText(text);
      //* 如果存在expression说明文本时带有变量的 : hello {{name}}
      //* 此时构建一个带变量的文本类型的AST并将其添加到父节点的children属性中
      if (expression) {
        children.push({
          type: 2,
          expression,
          text,
        });
      } else {
        children.push({
          type: 3,
          text,
        });
      }
    }
  },
  comment(text) {
    //* 每当解析到注释时，触发该函数：创建AST的注释节点
    let element = { type: 3, text, isComment: true };
  },
  //* 如何构建AST节点层级：使用栈start钩子触发则节点入栈，end钩子入栈则节点出栈
});

//*  hello {{name}} ==> hello + _s(name) : _s就是下面的toSting函数

function toString(val) {
  return val == null
    ? ''
    : typeof val === 'object'
    ? JSON.stringify(val, null, 2)
    : String(val);
}

//** ：解析文本 : hello:{{name}} , age:{{age}}  * /
function parseText(text) {
  //* (1){{name}} (2)  {{isTrue ? show : hidden}}
  const tagRE = /\{\{((?:.|\n)+?)\}\}/g;
  if (!tagRE.test(text)) {
    return;
  }
  const token = [];
  let lastIndex = (tagRE.lastIndex = 0);
  let match, index;
  //* exec返回匹配成功后的数组
  while ((match = tagRE.exec(text))) {
    //* 获取模式匹配开始的位置
    index = match.index;
    //* 先把{{ 前边的文本添加到tokens中
    if (index > lastIndex) {
      token.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    //* 把变量修改成_s(x)这样的形式也添加到数组中
    tokens.push(`_s($match[1].trim())`);
    //* 设置lastIndex来保证下一轮循环时，正则表达式不再重复匹配已经解析过的文本
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+');
}

//* 创建元素类型的AST节点
function createASTElement(tag, attrs, unary) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    parent,
    children: [],
  };
}
