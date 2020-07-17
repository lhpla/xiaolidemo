<template>
  <div class="box ds-pay aln-itms-c jsf-c-ctr">
    <div style="width:500px;padding:30px; background-color:white;border-radius:10px;">
      <div class="_title">注册</div>
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
        <el-form-item>
          <el-button type="primary"
                     style="width:30%;"
                     @click="register">注册</el-button>
          <el-button type="primary"
                     style="width:30%;"
                     @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  props: {
  },
  components: {

  },
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
      form: {
        username: "",
        password: "",
        // email: "",
        arr: '',
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
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/Login')
    },
    register () {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.post('/api/user/register', {
            username: this.form.username,
            password: this.form.password
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
            console.log(res.data)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message.error('密码或用户名输入有误')
        }
      })
    },
  },
  mounted () {

  },
  watch: {

  },
  computed: {

  }

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