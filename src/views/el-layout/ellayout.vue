<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">2</div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">3</div></el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">4</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.bg-purple {
  background-color: purple;
}
.bg-purple-light {
  background-color: lightcoral;
}
</style>
