import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
// import App from './AppRouter.vue'; // 测试Hrouter
import router from './router/router'
//import router from './router/hrouter';
import store from './store/store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
