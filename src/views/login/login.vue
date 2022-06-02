<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div class="line border">1px border</div>
  </div>
</template>

<script>
// 使用按需加载的方式导入组件
import { NavBar, Form, Field, Button } from 'vant';

export default {
  // 使用局部注册的方式，引入组件
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('login');
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
  },
};
</script>

<style lang="scss" scoped>
// 使用夏华夏覆盖border文件中的bordercolor；
$border-color: red;
@import './border';

.line {
  display: inline-block;
  margin-left: 100px;
}
</style>
