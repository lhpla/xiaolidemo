<template>
  <div>
    <el-input v-model="inpt"
              placeholder="请输入您想搜索的商的名称"
              style="width:300px; margin:10px 0;"></el-input>
    <el-table :data="arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
      <el-table-column prop="NAME"
                       label="名称"
                       width="300">
      </el-table-column>
      <el-table-column prop="GOODS_SERIAL_NUMBER"
                       label="商品编号">
      </el-table-column>
      <el-table-column prop="ORI_PRICE"
                       label="原价">
      </el-table-column>
      <el-table-column prop="PRESENT_PRICE"
                       label="现价">
      </el-table-column>
      <el-table-column prop="address"
                       label="操作 ">
        <template slot-scope="scope">
          <el-button type="primary"
                     @click="edit(scope.row),dialogTableVisible=true">
            修改</el-button>

          <el-button type="danger"
                     @click="delet(index)"
                     v-model="form.name">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址"
               :visible.sync="dialogFormVisible">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.NAME"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原价"
                      :label-width="formLabelWidth">
          <el-input v-model="form.ORI_PRICE"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现价"
                      :label-width="formLabelWidth">
          <el-input v-model="form.PRESENT_PRICE"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pagesizes"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.tableData.length">
      </el-pagination>
    </div>
    <div style="display:flex;">
      <download-excel class="xle"
                      :data="this.arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      :fields="json_fields"
                      name="filename.xls">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary"
                   size="small">导出xle</el-button>
      </download-excel>
      <download-excel class="csv"
                      :data="this.arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      :fields="json_fields"
                      name="filename.xls">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary"
                   size="small">导出csv</el-button>
      </download-excel>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: '',
  props: {},
  components: {

  },
  data () {
    return {
      tableData: [{
        NAME: '',
        GOODS_SERIAL_NUMBER: '',
        ORI_PRICE: '',
        PRESENT_PRICE: ''
      }],
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      arr: [],
      inpt: '',
      dialogFormVisible: false,
      dialogTableVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      index: '',
      json_fields: {}

    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    edit (row) {
      this.form = row
      this.dialogFormVisible = true
    },
    delet (index) {
      this.arr.splice(index, 1)
    },
  },
  mounted () {
    axios.get('/api/tableData').then(res => {
      this.tableData = res.data.data
      this.arr = this.tableData
    }).catch(err => {
      console.log(err)
    })

  },
  watch: {
    inpt (val) {
      this.arr = this.tableData.filter(item => {
        return JSON.stringify(item).includes(val)
      })
    }
  },
  computed: {

  }
}
</script>

<style scoped lang='scss'>
.xle,
.csv {
  padding: 10px;
}
</style>