<template>
  <div>
    <el-radio v-model="sex" label="man">男</el-radio>
    <el-radio v-model="sex" label="women">女</el-radio>
    <el-radio v-model="sex" label="wo123">未知</el-radio>

    <el-radio-group v-model="fruit" class="fruit">
      <el-radio-button label="apple">苹果</el-radio-button>
      <el-radio-button label="orange">橙子</el-radio-button>
      <el-radio-button label="watermelon">西瓜</el-radio-button>
    </el-radio-group>
    <div>
      <input type="radio" value="red" name="color" />
      红色
      <input type="radio" value="yellow" name="color" />
      黄色
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sex: 'man',
      fruit: 'orange'
    }
  },
  watch: {
    sex(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.fruit {
  margin-top: 50px;
  margin-bottom: 30px;
  display: block;
}
</style>
