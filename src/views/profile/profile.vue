<template>
  <div class="page">
    <h1>profile</h1>
    <button class="btn" @click="push">push to user page</button>
    <br />
    <br />
    <button class="btn" @click="pushAddress">push to address page</button>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    push: function() {
      this.$router.push({ name: 'user', params: { userId: '1002' } });
    },
    pushAddress: function() {
      this.$router.push({ name: 'address', params: { id: '0632' } });
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
  activated() {
    console.log('profile.vue---activated');
  },
  beforeRouteUpdate() {
    console.log('profile.vue---beforeRouteUpdate');
  }
};
</script>
<style scoped></style>
