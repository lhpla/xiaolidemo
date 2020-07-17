<template>
  <div>
    <el-table :data="arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              style="width: 100%">
      <el-table-column fixed
                       label="#"
                       width="50">
        <template slot-scope="scope">
          <div>{{scope.$index+1}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="300">
      </el-table-column>
      <el-table-column prop="author"
                       label="作者"
                       width="100">
      </el-table-column>
      <el-table-column label="类目"
                       width="150">
        <template slot-scope="scope">
          <div>
            <el-tag size="medium"
                    v-if="scope.row.category === 'Vue'">{{ scope.row.category }}
            </el-tag>
            <el-tag type="success"
                    v-if="scope.row.category === 'React'">
              {{scope.row.category}}
            </el-tag>
            <el-tag type="info"
                    v-if="scope.row.category === 'Node.js'">
              {{scope.row.category}}
            </el-tag>
            <el-tag type="warning"
                    v-if="scope.row.category === '性能优化'">
              {{scope.row.category}}
            </el-tag>
            <el-tag type="danger"
                    v-if="scope.row.category === 'JavaScript'">
              {{scope.row.category}}
            </el-tag>
            <el-tag type="info"
                    v-if="scope.row.category === '小程序'">
              {{scope.row.category}}
            </el-tag>
            <el-tag type="warning"
                    v-if="scope.row.category === '工具类'">
              {{scope.row.category}}
            </el-tag>
            <el-tag type="danger"
                    v-if="scope.row.category === '其他'">
              {{scope.row.category}}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="source"
                       label="来源"
                       width="150">
      </el-table-column>
      <el-table-column label="重要性"
                       width="150">
        <template slot-scope="scope">
          <div class="block">
            <span class="demonstration">
              <el-rate v-model="scope.row.star"
                       disabled></el-rate>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间"
                       width="150">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="300">
        <template slot-scope="scope">
          <el-button @click="look(scope.$index,scope.row)"
                     type="primary"
                     size="small">
            查看</el-button>
          <el-button @click="edit(scope.$index,scope.row)"
                     type="success"
                     size="small">编辑</el-button>
          <el-button @click="detel(scope.$index,scope.row)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="pagesizes"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="this.tableData.length">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  name: '',
  props: {},
  components: {

  },
  data () {
    return {
      pagesizes: [5, 20, 30, 50],
      pagesize: 5,
      currentPage: 1,
      tableData: [],
      arr: [],


    }
  },
  methods: {
    handleClick (row) {
      console.log(row);
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    look () {
      this.$router.push('/Look')
    },
    //编辑
    edit (index, row) {
      // console.log(this.arr[index])
      this.$router.push({
        path: '/Edit',
        query: {
          mis: row
        }
      })
    },
    //查看
    look (index, row) {
      this.$router.push({
        path: '/Look',
        query: {
          content: row
        }
      })
    },
    //删除
    detel (index, item) {
      let a = (this.currentPage - 1) * this.pagesize + index
      // console.log(a)
      axios.post('/api/article/delete', {
        _id: item._id
      }).then(res => {
        // console.log(res.data)
        // console.log(this.tableData._id)
        if (res.data.code === 200) {
          this.tableData.splice(a, 1)
        }
      })
    }
  },
  mounted () {
    axios.get('/api/article/allArticle').then(res => {
      // console.log(res.data)
      if (res.data.code === 200) {
        this.arr.date = res.data.data
        // console.log(this.arr.date)
        this.arr.date.map(item => {
          item.time = dayjs(item.date).format("YYYY年MM月DD日hh时mm分")
          item.star = Number(item.star)
        })
      }
      this.tableData = res.data.data
      this.arr = this.tableData
      console.log(this.arr)

    }).catch(err => {
      console.log(err)
    })
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang='scss'>
</style>