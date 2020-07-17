<template>
  <div>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane :label="a"
                   name="first">
        <div v-for="(item,index) in unread"
             :key="index"
             style="display:flex;width:100%;justify-content: space-between;">
          <div>{{item.messages}}</div>
          <div>{{item.time}}
            <el-button @click="noread(item,index)">标为已读</el-button>
          </div>
        </div>
        <el-button type="primary"
                   @click="all1">全部标记为已读</el-button>
      </el-tab-pane>
      <el-tab-pane :label="b"
                   name="second">
        <div v-for="(item,index) in read"
             :key="index"
             style="display:flex;width:100%;justify-content: space-between;">
          <div>{{item.messages}}</div>
          <div>{{item.time}}
            <el-button @click="delet(item,index)">删除</el-button>
          </div>
        </div>
        <el-button type="danger"
                   @click="all2">删除全部</el-button>
      </el-tab-pane>
      <el-tab-pane :label="c"
                   name="third">
        <div v-for="(item,index) in recycle"
             :key="index"
             style="display:flex;width:100%;justify-content: space-between;">
          <div>{{item.messages}}</div>
          <div>{{item.time}}
            <el-button @click="reduction(item,index)">还原</el-button>
          </div>
        </div>
        <el-button type="info"
                   @click="all3">清空回收站</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {

  },
  data () {
    return {
      activeName: 'second',
      unread: [{
        messages: '【系统消息】系统将于本周末00：00：00停机更新',
        time: '2020-7-16 09:00:00'
      }],
      read: [{
        messages: '老员工本周五晚上20：00：00到公司总部开季度大会',
        time: '2020-07-05 08：00：00'
      }],
      recycle: [{
        messages: '今晚公司发福利',
        time: '2020-07-16 08: 00: 00'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    noread (item, index) {
      this.unread.splice(index, 1)
      this.read.push(item)
    },
    delet (item, index) {
      this.read.splice(index, 1)
      this.recycle.push(item)
    },
    reduction (item, index) {
      this.recycle.splice(index, 1)
      this.read.push(item)
    },
    all1 () {
      this.read = this.unread.concat(this.read)
      this.unread = ''
    },
    all2 () {
      this.recycle = this.read.concat(this.recycle)
      this.read = ''
    },
    all3 () {
      this.recycle = ""
    },
  },
  mounted () {

  },
  watch: {

  },
  computed: {
    a () {
      return `未读消息(${this.unread.length})`
    },
    b () {
      return `已读消息(${this.read.length})`
    },
    c () {
      return `回收站(${this.recycle.length})`
    },
  }
}
</script>

<style scoped lang='scss'>
</style>