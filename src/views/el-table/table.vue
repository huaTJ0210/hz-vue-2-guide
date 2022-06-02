<template>
  <div>
    <el-table :data="list" :row-class-name="tableRowClassName" boreder>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column>
        <template slot="header">
          <span>-操作-</span>
        </template>
        <template slot-scope="{ row }">
          <el-button type="primary" @click="add(row)">add</el-button>
          <el-button type="primary" @click="update(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--一个分页组件总共分为：总数、当前页、每页的个数，每页个数及当前页发生变化时触发的事件-->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchList"></pagination>
  </div>
</template>

<script>
import Pagination from './pagination.vue'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      tableData: [],
      total: 0,
      page: 1,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  computed: {},
  methods: {
    add(row) {
      console.log(row.id)
    },
    update(row) {
      console.log(row.id)
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      } else {
        return ''
      }
    },
    fetchList({ page, limit }) {
      console.log('---:', page, limit)
      this.list = this.tableData.slice((page - 1) * limit, limit * page)
    }
  },
  created() {
    for (let i = 0; i < 100; i++) {
      const user = {
        id: `${i}`,
        name: `${i} - li - ${i}`,
        address: '北京',
        date: '2020-10-11'
      }
      this.tableData.push(user)
    }
    // 设置总条数
    this.total = 100
    this.fetchList(this.listQuery)
  }
}
</script>

<style>
.el-table .warning-row {
  background-color: oldlace;
}
.el-table .success-row {
  background-color: #f0f9ab;
}
</style>

<style lang="scss" scoped></style>
