<template>
  <div>
    <p :class="{ active: isActive, hasError: isError }">{{ message }}</p>
    <a :href="url">baidu</a>
    <button @click="getSomething">get something</button>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }}
      </li>
    </ul>
    <template>
      <div v-if="isShow" name="li">v-if show</div>
      <div v-else title="else">v-if hidden</div>
      <button @click="isShow = !isShow">change v-if</button>
    </template>

    <template>
      <div class="todoList">
        <form @submit.prevent="addTodos">
          <label for="todo">addTodo</label>
          <input id="todo" v-model="todoText" />
          <button>add</button>
        </form>
        <ul>
          <li is="todo-item" v-for="(item, index) in todoList" :title="item.title" :key="item.id" @remove="todoList.splice(index, 1)"></li>
        </ul>
      </div>
    </template>
    <input type="text" v-model.trim="inputText" />
  </div>
</template>

<script>
import TodoItem from './todo-item.vue'
export default {
  components: {
    TodoItem // 模板中使用小写字母单词加“-”链接
  },
  data() {
    return {
      message: 'hello',
      url: 'www.baidu.com',
      isActive: true,
      isError: false,
      books: [
        { id: '1', name: 'vue.js' },
        { id: '2', name: 'react.js' },
        { id: '3', name: 'angular.js' }
      ],
      isShow: true,
      todoText: '',
      todoList: [
        {
          id: 0,
          title: 'to do apple'
        },
        {
          id: 1,
          title: 'to do orange'
        }
      ],
      inputText: ''
    }
  },
  methods: {
    getSomething() {
      console.log('get something')
    },
    addTodos() {
      const id = this.todoList[this.todoList.length - 1].id++
      this.todoList.push({ id, title: this.todoText })
      this.todoText = ''
    }
  },
  computed: {
    // 计算属性主要依赖vue实例对象上的属性值（响应式的）
    reverseMessage: function() {
      return this.message
        .split('')
        .reverse()
        .join('')
    }
  },
  //*-----生命周期函数-------
  beforeCreate() {
    //* 事件及生命周期函数初始化完毕
    console.log('---beforeCreate---')
  },
  created() {
    //* 状态变为响应式及injection
    console.log('--created--')
  },
  beforeMount() {
    //*
    console.log('--beforeMount--')
  },
  mounted() {
    console.log('--mounted--')
  },
  beforeUpdate() {
    console.log('--beforeUpdate--')
  },
  updated() {
    console.log('--updated--')
  },
  beforeDestroy() {
    console.log('--beforeDestory--')
  },
  destroyed() {
    console.log('--destoryed--')
  }
}
</script>

<style lang="scss" scoped>
.active {
  background-color: red;
}
.hasError {
  background-color: pink;
}

.todoList {
  padding: 20px;
}
</style>
