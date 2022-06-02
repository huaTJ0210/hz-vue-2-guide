<template>
  <div>{{ formatTitle }}--{{ innerLikes }}</div>
</template>

<script>
export default {
  name: 'CatagoryHeader',
  props: {
    title: String,
    likes: {
      type: Number,
      default: 1,
      require: false, //是否必须
      // 对props的验证
      validator: function(value) {
        return value >= 0 && value < 100;
      }
    }
  },
  data: function() {
    return {
      // 使用props初始化组件内部状态
      innerLikes: this.likes
    };
  },
  computed: {
    // 需要对props的静态值进行格外的处理
    formatTitle: function() {
      return 'hz' + this.title.trim().toLowerCase();
    }
  }
};
</script>

<style lang="scss" scoped></style>
