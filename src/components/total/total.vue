<template>
  <div>
    <div style="display:flex;width:100%;">
      <div style="background:#7CCABF;flex:1;padding:30px;">
        <div>今日发布<span>{{num}}</span></div>
      </div>
      <div style="background:#E88A87;flex:1;padding:30px;">
        <div>原创文章<span>{{num1}}</span></div>
      </div>
      <div style="background:#8375A3;flex:1;padding:30px;">
        <div>新留言（0）</div>
      </div>
      <div style="background:#9FCEC1;flex:1;padding:30px;">
        <div>新消息（0）</div>
      </div>
    </div>
    <div style='display:flex;'>
      <!-- 饼状1 -->
      <div style="flex:1;">
        <el-card class="box-card">
          <ve-pie :data="chartData"></ve-pie>
        </el-card>
      </div>
      <!-- 饼状2 -->
      <div style="flex:1;">
        <el-card class="box-card">
          <ve-pie :data="chartData1"
                  :settings="chartSettings1"></ve-pie>
        </el-card>
      </div>
    </div>
    <div>
      <ve-waterfall :data="chartData2"
                    :settings="chartSettings"></ve-waterfall>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import lodash from 'lodash'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    // 来源
    this.chartSettings1 = {
      roseType: 'radius'
    },
      //瀑布图
      this.chartSettings = {
        dimension: '时间',
        metrics: '数量'
      }
    return {
      // 分类
      chartData: {
        columns: ['数量', '分类'],
        rows: []
      },
      // 来源
      chartData1: {
        columns: ['来源', '数量'],
        rows: []
      },
      //瀑布图
      chartData2: {
        columns: ['数量', '时间'],
        rows: []
      },
      num: 0,
      num1:0
    }
  },
  methods: {

  },
  mounted () {
    // 分类
    axios.get('/api/article/allArticle').then((res) => {
      let category = lodash.groupBy(res.data.data, "category")
      for (let i in category) {
        let obj = {}
        obj['分类'] = category[i].length
        obj['数量'] = i
        this.chartData.rows.push(obj)
        // console.log(obj)
      }
    }).catch(err => {
      console.log(err)
    })
    //来源
    axios.get('/api/article/allArticle').then((res) => {
      let source = lodash.groupBy(res.data.data, "source")
      for (let i in source) {
        let obj = {}
        obj['来源'] = i
        obj['数量'] = source[i].length
        this.chartData1.rows.push(obj)
        // console.log(obj)
      }
    }).catch(err => {
      console.log(err)
    })
    // 瀑布图
    axios.get('/api/article/allArticle').then((res) => {

      res.data.data.map((item) => {
        item.date = dayjs(item.date).format("YYYY年MM月DD日")
        let today = dayjs().format("YYYY年MM月DD日")
        console.log(item.source)
        if (today === item.date) {
          this.num++
        }
        if (item.source === '原创') {
          this.num1++
        }
        console.log(res.data.data.source + 'bvc')
      })
      let date = lodash.groupBy(res.data.data, "date")
      for (let i in date) {
        let obj = {}
        obj['时间'] = i
        obj['数量'] = date[i].length
        this.chartData2.rows.push(obj)
        // console.log(obj)
      }
    }).catch(err => {
      console.log(err)
    })

  },
  watch: {

  },
  computed: {

  }
}
</script>

<style scoped lang='scss'>
</style>