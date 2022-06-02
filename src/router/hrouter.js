import Vue from 'vue';
import VueRouter from './h-router/hrouter';

import Home from './test-page/home.vue';
import About from './test-page/about.vue';

import AboutFirst from './test-page/sub-about/about-first.vue';
import AboutSecond from './test-page/sub-about/about-second.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    children: [
      {
        path: 'first',
        name: 'frist-about',
        component: AboutFirst,
      },
      {
        path: 'second',
        name: 'second-about',
        component: AboutSecond,
      },
    ],
  },
];

const router = new VueRouter({ routes, mode: 'hash' });

export default router;
