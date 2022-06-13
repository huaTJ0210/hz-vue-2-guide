import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
// import App from './AppRouter.vue'; // 测试Hrouter
import router from './router/router'
//import router from './router/hrouter';
import store from './store/store'

import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import SentryRRWeb from '@sentry/rrweb'

Vue.config.productionTip = false

process.env.NODE_ENV === 'production' &&
  Sentry.init({
    Vue,
    dsn: 'http://71bccabbcba545cfa6f48f94bac6152d@127.0.0.1:9000/2',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
      }),
      new SentryRRWeb({
        checkoutEveryNms: 10 * 1000, // 每10秒重新制作快照
        checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
        maskAllInputs: false // 将所有输入内容记录为 *
      })
    ],
    logErrors: true,
    release: process.env.SENTRY_RELEASE,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  })

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
