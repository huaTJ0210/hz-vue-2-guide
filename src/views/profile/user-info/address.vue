<template>
  <h2>{{ id }}</h2>
</template>

<script>
export default {
  props: ['id'],
  methods: {},
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log(to, from);
    console.log('beforeRouteEnter');
    next(vm => {
      console.log('address.vue-beforeRouteEnter:', vm);
    });
  },
  // 导航守卫 : 浏览器中修改id会触发以下方法
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('address.vue--beforeRouteLeave');
    console.log(to, from);
    next();
  }
};
</script>

<style></style>
