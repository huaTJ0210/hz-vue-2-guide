import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home/home.vue'
import Cart from '@/views/cart/cart.vue'
import Catagory from '@/views/catagory/catagory.vue'
import catagoryList from '@/views/catagory/catagoryList.vue'
import Profile from '@/views/profile/profile.vue'
import HVue from '@/views/vue/index.vue'

// (1) Vue.use()函数内部具体执行了什么？
Vue.use(VueRouter)

// (2) 路由懒加载：

// (3)webpackChunkName:Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
// const Home = () =>
//   import(/* webpackChunkName: "group-tab" */ '@/views/home/home.vue');

const HomePageOne = () => import('@/views/home/cpns/pageOne.vue')
const HomePageTwo = () => import('@/views/home/cpns/pageTwo.vue')

//const Cart = () => import(/* webpackChunkName: "group-tab" */ '@/views/cart/cart.vue')
//const Catagory = () => import(/* webpackChunkName: "group-tab" */ '@/views/catagory/catagory.vue')
//const catagoryList = () => import(/* webpackChunkName: "group-tab" */ '@/views/catagory/catagoryList.vue')
//const Profile = () => import(/* webpackChunkName: "group-tab" */ '@/views/profile/profile.vue')

const User = () => import('@/views/profile/user-info/user.vue')
const Address = () => import('@/views/profile/user-info/address.vue')

// 登录
const Login = () => import('@/views/login/login.vue')
// Vue
//const HVue = () => import('@/views/vue/index.vue')

/**
 *  Element框架组件学习
 */

const ELTable = () => import('@/views/el-table/table.vue')
const ELLayout = () => import('@/views/el-layout/ellayout.vue')
const ELRadio = () => import('@/views/el-radio/index.vue')

const routes = [
  {
    path: '/table',
    component: ELTable,
    name: 'table'
  },
  {
    path: '/layout',
    component: ELLayout,
    name: 'layout'
  },
  {
    path: '/radio',
    component: ELRadio,
    name: 'radio'
  },
  {
    path: '/home/homePageOne',
    component: HomePageOne,
    name: 'homePageOne'
  },
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    meta: {
      showTab: true
    }
  },
  {
    path: '/home/homePageTwo',
    component: HomePageTwo,
    name: 'homePageTwo'
  },

  {
    path: '/cart',
    component: Cart,
    name: 'cart',
    meta: {
      showTab: true
    }
  },
  {
    path: '/catagory',
    component: Catagory,
    name: 'catagory',
    meta: {
      showTab: true
    }
  },
  {
    path: '/catagory/list',
    component: catagoryList,
    name: 'catagoryList'
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
    // 路由元数据
    meta: {
      showTab: true
    },
    beforeEnter: (to, from, next) => {
      console.log('---beforeEnter---')
      next()
    }
  },
  {
    path: '/profile/user/:userId', // 动态路径参数
    component: User,
    name: 'user',
    props: true,
    beforeEnter: (to, from, next) => {
      console.log('---beforeEnter---')
      next()
    }
  },
  {
    path: '/profile/address', // 动态路径参数
    component: Address,
    name: 'address',
    // props可以设置为：布尔、对象、函数等类型
    props: true // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/vue',
    component: HVue,
    name: 'hvue'
  }
]

const router = new VueRouter({ routes })

/*
  解决router连续push相同的地址导致错误未捕获的问题
*/

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => console.log(err))
}

// (4)全局前置路由守卫 ： 登录状态判断、用户权限判断、
router.beforeEach((to, from, next) => {
  //1、to：Route即将进入的目标 路由对象
  //2、from:Route当前导航正要离开的路由
  //3、next:Function:执行效果依赖next方法调用参数 ： next('/')跳转到首页 next('/login')
  //console.log(from.name);
  // if (to.name !== 'login') {
  //   next({ name: 'login' })
  // } else {
  //   next()
  // }

  // 路由元信息
  /*
  to.matched.some(record => {
    return record.meta.requireAuth
  });
  */

  console.log('---beforeEach---')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('---beforeResolve---')

  next()
})

// router.afterEach((to, from) => {
//   // ...
//   console.log('--afterEach---')
// })

export default router
