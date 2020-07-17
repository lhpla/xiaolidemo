<template>
  <div class="box ds-pay jsf-c-ctr aln-itms-c">
    <div style="width:500px;padding:30px; background-color:white;border-radius:10px;">
      <div class="_title">欢迎来到xxx后台系统</div>
      <el-form :model="form"
               label-width="100px"
               status-icon
               :rules="rules"
               ref="form">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="form.username"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="form.password"
                    placeholder="请输入密码"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="checkPass">
          <el-input type="password"
                    v-model="form.checkPass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <div class="ds-pay jsf-c-sp-bet"
             style="width:100%;">
          <el-form-item label="验证码"
                        prop="code">
            <el-input v-model="form.code"
                      style="width:55%;"
                      placeholder="请输入验证码"></el-input>
            <div v-html="this.image"
                 @click="getData"></div>
          </el-form-item>
        </div>
        <!-- <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     style="width:30%;"
                     @click="login">登录</el-button>
          <el-button type="primary"
                     style="width:30%;"
                     @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  name: "",
  props: {},
  components: {},
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      image: '',
      form: {
        username: "",
        password: "",
        // email: "",
        checkPass: "",
        code: ''
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "用户名在2~8位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 15, message: "密码在6~15位", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "两次输入密码不一致", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        // email: [
        //   { required: true, message: "邮箱不能为空", trigger: "blur" },
        //   { type: "email", message: "请输入正确邮箱", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    // login () {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       let user = {
    //         username: this.form.username,
    //         password: this.form.password,
    //       }
    //       console.log(this.form.username)
    //       localStorage.setItem('user', JSON.stringify(user))
    //       this.$message({
    //         showClose: true,
    //         message: '恭喜你，登录成功',
    //         type: 'success'
    //       });
    //       this.$router.push('/')
    //     } else {
    //       this.$message.error("验证错误");
    //     }
    //   });
    // },
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.post('/api/user/login', {
            username: this.form.username,
            password: this.form.password,
            code: this.form.code
          }).then(res => {
            if (res.data.code === 200) {
              let nowtime=dayjs().format("YYYY年MM月DD日  HH时mm分ss秒")
              this.$message.success(res.data.message)
              let user = {
                username: this.form.username,
                password: this.form.password,
                time:nowtime
              }
              console.log(user)
              localStorage.setItem('user', JSON.stringify(user))
              this.$message({
                showClose: true,
                message: '恭喜你，登录成功',
                type: 'success'
              });
              this.$router.push('/')
            }else if(res.data.code===1){
              this.$message.warning(res.data.message)
              this.form.code=''
              this.$message({
                showClose: false,
                message: '验证失败',
                type: 'danger'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    getData () {
      axios.get('/api/captcha').then(res => {
        if (res.data) {
          this.image = res.data
        }
        console.log(this.image)
      }).catch(err => {
        console.log(err)
      })
    },
    register () {
      this.$router.push('/Register')
    },
  },
  mounted () {
    axios.get('/api/captcha').then(res => {
      if (res.data) {
        this.image = res.data
      }
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  height: 700px;
  background-color: skyblue;
  ._title {
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 10px;
  }
}
</style>