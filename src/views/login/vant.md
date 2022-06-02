(1)安装
npm i vant -S
（2）按需引入
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。
npm i babel-plugin-import -D
babel.config.js中配置；

(3)ViewPort布局
+ postcss-px-to-viewport 进行转换。