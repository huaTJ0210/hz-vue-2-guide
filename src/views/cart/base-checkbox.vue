<template>
  <div>
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <button @click="changeDoc">sync标识符</button>
    <slot name="bottom" v-bind:user="user"></slot>
  </div>
</template>

<script>
// Vue内部如何实现v-model的
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  data: function() {
    return {
      user: {
        name: 'hua'
      }
    };
  },
  methods: {
    changeDoc: function() {
      this.$emit('update:subtitle', 'hz');
    }
  }
};
</script>

<style lang="scss" scoped></style>
