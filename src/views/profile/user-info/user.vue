<template>
  <div class="container">
    <van-nav-bar>
      <template v-slot:left>left</template>
      <template v-slot:right>right</template>
    </van-nav-bar>
    <ul>
      <li :key="friend.userId" v-for="friend in friends">
        {{ friend.name | capitalize }}-{{ friend.age }}
      </li>
    </ul>
    <h4>朋友的数量：{{ friendsCount }}</h4>
    <button @click="_addFriend">添加朋友-{{ userId }}</button>
    <h4 v-if="loading">loading......</h4>

    <button @click="_changePath">触发update</button>

    <div>
      <grid-city
        class="grid-city"
        :textColor="index === 0 ? 'blue' : 'black'"
        :key="index"
        :title="city.title"
        :cities="city.cities"
        v-for="(city, index) in cityGrid"
      ></grid-city>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant';
import { mapState, mapGetters, mapActions } from 'vuex';
import GridCity from './grid-city.vue';

export default {
  components: {
    [NavBar.name]: NavBar,
    GridCity
  },
  props: ['userId'],
  data: function() {
    return {
      loading: true,
      name: 'li',
      cities: ['北京', '北京', '北京', '北京', '北京', '北京', '北京', '北京'],
      // 将state中的friends添加到 this上
      cityGrid: [
        {
          title: '热门城市',
          cities: [
            '北京',
            '北京',
            '北京',
            '北京',
            '北京',
            '北京',
            '北京',
            '北京'
          ]
        },
        {
          title: 'A(按照字母排序)',
          cities: [
            '北京',
            '北京',
            '北京',
            '北京',
            '北京',
            '北京',
            '北京',
            '北京'
          ]
        }
      ]
    };
  },
  // vuex中的state附加到计算属性中：
  computed: {
    ...mapGetters('user', ['friendsCount']),
    ...mapState('user', ['friends'])
  },
  // 完成DOM挂载，可以进行DOM的相关操作
  mounted() {
    console.log('---mounted---:', this);
    // 获取朋友列表
    if (this.friends.length === 0) {
      this.fetchFriends({ userId: '1001' }).then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
  // 过滤器：对显示数据进行处理
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  activated() {
    // keep-alive缓存组件不会重复触发created函数
    console.log('----activated---');
  },
  methods: {
    ...mapActions('user', ['addFriend', 'fetchFriends']),
    _addFriend() {
      const friend = {
        name: 'zh' + Math.random(),
        age: Math.random() * 40,
        userId: Math.random() * 1000 + ''
      };
      this.addFrined(friend);
    },
    _changePath() {
      this.$router.push('/profile/user/1010');
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log('watch:$route');
        // 对路由变化做出响应
        // 解决一些被组件复用的问题
        console.log(to, from);
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #eee;
}
.grid-city {
  margin-top: 10px;
  background-color: white;
}
</style>
