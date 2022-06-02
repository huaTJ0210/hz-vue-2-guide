<template>
  <li class="todo-item">
    {{ title }}
    <button @click="$emit('remove')">remove</button>
    <input type="text" ref="todoRef" />
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  padding: 10px;
}
</style>
