<template>
  <div>
    <catagory-header title="分类标题" likes="2"></catagory-header>
    <ul>
      <li :key="item.id" v-for="item in showListData">{{ item.name }}</li>
    </ul>
    <select name="" id="" v-model="selectedId">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </div>
</template>

<script>
import CatagoryHeader from './catagory-header.vue';
export default {
  components: {
    CatagoryHeader
  },
  props: {
    title: String,
    likes: Number
  },
  data() {
    return {
      selectedId: 0,
      listData: []
    };
  },
  created() {
    setTimeout(() => {
      this.listData = Object.freeze([
        { id: 1, name: 'wang' },
        { id: 2, name: 'ddwang' },
        { id: 3, name: 'sswang' },
        { id: 4, name: 'wangli' },
        { id: 5, name: 'rrwang' }
      ]);
    }, 2000);
  },
  computed: {
    showListData: function() {
      return this.listData.filter(item => {
        if (this.selectedId === 0) {
          return true;
        }
        return item.id === parseInt(this.selectedId);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
