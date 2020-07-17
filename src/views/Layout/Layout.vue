<template>
  <div>
    <el-container>
      <el-header>
        <div style="width:100%;display:flex; justify-content: space-between;">
          <div>{{num.username}}您好，欢迎来到xxx后台管理系统</div>
          <div class="ds-pay fx-dcrtion-r">
            <div v-if="this.hours>=6&&this.hours<12">
              早上好，亲爱的{{num.username}}
            </div>
            <div v-if="this.hours>=12&&this.hours<14">
              中午好，亲爱的{{num.username}}
            </div>
            <div v-if="this.hours>=14&&this.hours<18">
              下午好，亲爱的{{num.username}}
            </div>
            <div v-if="this.hours>=18&&this.hours<24">
              晚上好，亲爱的{{num.username}}
            </div>
            <div v-if="this.hours>=24||this.hours<6">
              该睡觉了，亲爱的{{num.username}}
            </div>
          </div>
          <div>上次登录时间：{{num.time}}</div>
        </div>
      </el-header>
      <el-container style="display:flex;">
        <el-aside width="10%">
          <el-col>
            <el-menu default-active="$route.push"
                     router
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
              <!--homePage  首页-->
              <el-menu-item index="/Page">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <!--Released  已发布-->
              <el-menu-item index="/Released">
                <i class="el-icon-menu"></i>
                <span slot="title">已发布</span>
              </el-menu-item>
              <!--total  统计-->
              <el-menu-item index="/total">
                <i class="el-icon-menu"></i>
                <span slot="title">统计</span>
              </el-menu-item>
              <!--Article  文章-->
              <el-menu-item index="/Article">
                <i class="el-icon-check"></i>
                <span slot="title">发表文章</span>
              </el-menu-item>
              <!--Tabpage  标签页-->
              <el-menu-item index="/Tabpage">
                <i class="el-icon-setting"></i>
                <span slot="title">标签页</span>
              </el-menu-item>
              <!--Excel  导出-->
              <el-menu-item index="/Excel">
                <i class="el-icon-setting"></i>
                <span slot="title">导出excel</span>
              </el-menu-item>
              <!--Picture  图片上传-->
              <el-menu-item index="/Picture">
                <i class="el-icon-setting"></i>
                <span slot="title">图片上传</span>
              </el-menu-item>
              <!--Signout  退出系统-->
              <el-menu-item index="/Signout">
                <i class="el-icon-delete"></i>
                <span slot="title">退出系统</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      hours: '',
      num: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    // homePage () {
    //   this.$router.push('/Page')
    // },
    // Released () {
    //   this.$router.push('/Released')
    // },
    // total () {
    //   this.$router.push('/total')
    // },
    // Article () {
    //   this.$router.push('/Article')
    // },
    // Tabpage () {
    //   this.$router.push('/Tabpage')
    // },
    // Excel () {
    //   this.$router.push('/Excel')
    // },
    // Picture () {
    //   this.$router.push('/Picture')
    // },
    // Signout () {
    //   this.$router.push('/Signout')
    // }
  },

  mounted () {
    handleOpen: { }
    handleClose: { }
    let time = dayjs().hour()
    this.hours = time
    //  console.log(this.hours)
    //获取存入的数据
    let uses = JSON.parse(localStorage.getItem('user'))
    // console.log(uses)
    //赋值
    this.num = uses
    // console.log(this.username)
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang='scss'>
.el-header {
  background-color: #2e5e85;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 500px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>