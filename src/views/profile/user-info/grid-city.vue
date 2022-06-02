<template>
  <div class="container">
    <h4 class="title">{{ title }}</h4>
    <ul class="city-list">
      <li
        class="city-item"
        :style="{ color: textColor }"
        :key="index"
        v-for="(city, index) in cities"
      >
        {{ city }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'gridCity',
  props: {
    title: {
      type: String,
      default: '',
    },
    cities: {
      type: Array,
      default: function() {
        return [];
      },
    },
    textColor: {
      type: String,
      default: 'black',
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
  font-weight: 400;
  margin-left: 12px;
  padding: 10px 0;
}
.city-list {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.city-item {
  width: 25%;
  text-align: center;
  padding: 15px 0;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
