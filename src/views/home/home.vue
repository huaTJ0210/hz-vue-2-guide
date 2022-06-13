<!--  -->
<template>
  <div>
    <h1>Home</h1>
    <router-link to="/home/homePageOne">业务（1）</router-link>
    <br />
    <router-link to="/home/homePageTwo">业务（2）</router-link>
    <br />
    <router-link to="/table">Element-table</router-link>
    <br />
    <router-link to="/layout">Element-layout</router-link>
    <br />
    <router-link to="/radio">Element-radio</router-link>
    <button @click="errorTest">触发异常</button>
    <br />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    push: function() {
      console.log(this)
      this.$router.push({ name: 'homePageOne' })
    },
    errorTest() {
      console.log(window.a.b())
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
  activated() {}
}
</script>
<style lang="scss" scoped></style>
