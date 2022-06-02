<!--  -->
<template>
  <div>
    <h1>Catagory</h1>
    <button @click="push">push</button>
  </div>
</template>

<script>
export default {
  name: 'Catagory',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    push() {
      this.$router.push({ name: 'catagoryList' });
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
  activated() {}
};
</script>
<style lang="scss" scoped></style>
