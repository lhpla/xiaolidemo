<template>
  <div>
    <div class="ds-pay fx-dcrtion-r">
      <el-card class="box-card">
        <div class="text item el-icon-iconName">
          <i class="iconfont"
             style="font-size:40px;color:#44C8C5;">&#xe62e;</i>
          <div>
            <div>NEW visits</div>
            <countTo :startVal='startVal'
                     :endVal='this.endVal.visits'
                     :duration='3000'></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <i class="iconfont"
             style="font-size:40px;color:#6BB9F6;">&#xe620;</i>
          <div>
            <div>Messages</div>
            <countTo :startVal='startVal'
                     :endVal='this.endVal.messages'
                     :duration='3000'></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <i class="iconfont"
             style="font-size:40px;color:#F2556F;">&#xea76;</i>
          <div>
            <div>Shopping</div>
            <countTo :startVal='startVal'
                     :endVal='this.endVal.shopping'
                     :duration='3000'></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <i class="iconfont"
             style="font-size:40px;color:#FECBA3;">&#xe6ee;</i>
          <div>
            <div>Purchases</div>
            <countTo :startVal='startVal'
                     :endVal='this.endVal.purchases'
                     :duration='3000'></countTo>
          </div>
        </div>
      </el-card>
    </div>
    <div>
      <ve-line :data="chartData"
               :settings="chartSettings"></ve-line>
    </div>
    <div style="display: flex">
      <div style="flex:1;">
        <ve-radar :data="chartData1"
                  :settings="chartSettings1"></ve-radar>
      </div>
      <div style="flex:1;">
        <ve-pie :data="chartData2"
                :settings="chartSettings2"></ve-pie>
      </div>
      <div style="flex:1;">
        <ve-histogram :data="chartData3"
                      :settings="chartSettings3"></ve-histogram>
      </div>
    </div>
    <div style="display:flex;">
      <!-- 订单 -->
      <div style="flex:1;">
        <el-card class="box-card1">
          <div slot="header"
               class="clearfix1">
            <span style="flex:4;">Order_No</span>
            <span style="flex:2;">Price</span>
            <span style="flex:1;">status</span>
          </div>
          <div v-for="(item) in order"
               :key="item"
               class="text1 item1">
            <div>{{item.num}}</div>
            <div>￥{{item.price}}</div>
            <div v-if="item.status===0"
                 style="color:red; border: 1px solid #FEF0F0;">pending</div>
            <div v-else-if="item.status===1"
                 style="color:green; border: 1px solid #F0F9E2;">success</div>
          </div>
        </el-card>
      </div>
      <!-- todo list  -->
      <div style="flex:1;">
        <el-card>
          <div slot="header">
            <span style="flex:4;"><i class="el-icon-arrow-down"></i></span>
            <span style="flex:1;color:#409EFF;">Todo List</span>
          </div>
          <div v-for="(item,index) in todolist"
               :key="index"
               style="display:flex; justify-content: space-between;">
            <div style="margin: 10px 5px;">
              <input type="checkbox"
                     @click="checked">&nbsp;&nbsp;&nbsp;<span>{{item.name}}</span>
            </div>
            <div>
              <buttom style="background:gray; color:white; border-radius:2px;padding:2px;"
                      @click="shanchu">删除</buttom>
            </div>
          </div><hr>
          <div style="display:flex;flex-direction: row;justify-content:space-between;">
            <div>items left</div>
            <div>All</div>
            <div>Active</div>
            <div>Complete</div>
          </div>
        </el-card>
      </div>
      <!-- 进度条 -->
      <div style="flex:1;">
        <el-card class="box-card1">
          <div slot="header">
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
                 width="300px">
          </div>
          <div>
            {{this.progressBar[0].name}}
            <el-progress :text-inside="false"
                         :stroke-width="10"
                         :percentage="this.progressBar[0].progress*100"
                         :status="success"></el-progress>
            {{this.progressBar[1].name}}
            <el-progress :text-inside="false"
                         :stroke-width="10"
                         :percentage="this.progressBar[1].progress*100"
                         status="success"></el-progress>
            {{this.progressBar[2].name}}
            <el-progress :text-inside="false"
                         :stroke-width="10"
                         :percentage="this.progressBar[2].progress*100"
                         :status="success"></el-progress>
            {{this.progressBar[3].name}}
            <el-progress :text-inside="false"
                         :stroke-width="10"
                         :percentage="this.progressBar[3].progress*100"
                         :status="success"></el-progress>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import axios from "axios"
export default {
  name: '',
  props: {
  },
  components: {
    countTo,
  },
  data () {
    //折线图
    this.chartSettings = {
      metrics: ['expected', 'actual'],
      dimension: ['date']
    }
    //雷达图
    this.chartSettings1 = {
      dimension: ['name'],
      metrics: ['delelopmer', 'marketing', 'ministration', 'techology', 'sales'],
    }
    //饼状图
    this.chartSettings2 = {
      dimension: ['name'],
      roseType: 'radius'
    }
    //柱状图
    this.chartSettings3 = {
      metrics: ['expected', 'actual'],
      dimension: ['date']
    }

    return {
      // 计数器
      startVal: 0,
      endVal: {},
      // 折线图
      chartData: {
        columns: ['actual', 'date ', 'expected'],
        rows: []
      },
      // 雷达图
      chartData1: {
        columns: ['delelopmer', 'marketing', 'ministration', 'techology', 'sales'],
        rows: [],
      },
      //饼状图
      chartData2: {
        columns: ['name', 'data'],
        rows: []
      },
      //柱状图
      chartData3: {
        columns: ['actual', 'date ', 'expected'],
        rows: []
      },
      //订单
      order: [],
      //todolist
      todolist: [],
      num1: '',
      progressBar: [],

    }
  },
  methods: {
    checked () {
      // if(this.todoList.checked===ture){

      // }
    },
    shanchu () {

    }
  },
  mounted () {
    // 计数器
    axios.get('/api/homeData').then(res => {
      this.endVal = res.data.data
      console.log(this.endVal)
    }).catch(err => {
      console.log(err)
    }),
      // 折线图
      axios.get('/api//homeChat').then(res => {
        this.chartData.rows = res.data.data
        // console.log(this.chartData.rows)
      }).catch(err => {
        console.log(err)
      }),
      // 雷达图
      axios.get('/api/radarChat').then(res => {
        this.chartData1.rows = res.data.data
        // console.log(this.chartData1.rows)
      }).catch(err => {
        console.log(err)
      }),
      // 饼图
      axios.get('/api/ringChat').then(res => {
        this.chartData2.rows = res.data.data
        // console.log(this.chartData2.rows)
      }).catch(err => {
        console.log(err)
      }),
      //柱状图
      axios.get('/api/homeChat').then(res => {
        this.chartData3.rows = res.data.data
        // console.log(this.chartData3.rows)
      }).catch(err => {
        console.log(err)
      }),
      //订单
      axios.get('/api/orderData').then(res => {
        this.order = res.data.data
        // console.log(this.order)
      }).catch(err => {
        console.log(err)
      })
    //todo list
    axios.get('/api/todoList').then(res => {
      this.todolist = res.data.data
      // console.log(this.todolist)
    }).catch(err => {
      console.log(err)
    })
    //进度条
    axios.get('/api/progress').then(res => {
      this.progressBar = res.data.data
      console.log(this.progressBar)
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
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  display: flex;
  flex: 1;
}
.text1 {
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.item1 {
  margin-bottom: 18px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid gray;
}

.clearfix1:before,
.clearfix1:after {
  display: table;
  content: "";
}
.clearfix1 {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
}
.clearfix1:after {
  clear: both;
}

.box-card1 {
  width: 400px;
}
</style>