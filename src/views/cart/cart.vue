<!--  -->
<template>
  <div>
    <h1>Cart</h1>
    <button @click="login">登录</button>
    <!-- <button @click="clickHandle">$on的使用</button> -->
    <br />
    <base-check-box v-model="lovinevue" v-bind.sync="doc">
      <!-- 具名插槽 -->
      <template v-slot:bottom="{ user }">bottom-slot {{ user.name }}</template>
    </base-check-box>
    <p>{{ lovinevue }} -- {{ doc.title }} --{{ doc.subtitle }}</p>
  </div>
</template>

<script>
import BaseCheckBox from './base-checkbox.vue';
export default {
  name: 'Cart',
  components: {
    BaseCheckBox
  },
  data() {
    return {
      message: 'hello',
      lovinevue: false,
      doc: {
        title: '标题',
        subtitle: '副标题'
      }
    };
  },
  computed: {
    exMessage: function() {
      return this.message;
    }
  },
  watch: {},
  methods: {
    login() {
      this.$router.push({ name: 'login' });
    },
    clickHandle() {
      // 自定义事件的触发
      this.$emit('test-event', 'hi');
    },
    example() {
      // 使用setTimeout向宏任务中注册回调
      setTimeout(() => {
        // DOM 已经完成更新
      }, 0);
      // 修改数据，然后向微任务中注册回到函数
      this.message = 'hi';
    }
  },
  created() {
    this.$on('test-event', function(message) {
      console.log(message);
    });
  },
  mounted() {},
  updated() {},
  destroyed() {},
  activated() {}
};
</script>
<style lang="scss" scoped></style>
