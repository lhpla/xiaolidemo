<template>
  <div>
    <div style="display:flex; flex:1; background: #59A586;justify-content: flex-end;">
      <button style="margin:10px; background:#F56C6C; color:white;border-radius: 3px;padding:5px 10px;"
              @click="back">返回</button>
      <button style="margin:10px; background:#409EFF; color:white;border-radius: 3px;padding:5px 10px;"
              @click="submitForm">发布</button>
    </div>
    <el-card style="margin-top:20px;">
      <el-form :model="ruleForm"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="发表标题"
                      prop="title"
                      required>
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="发表摘要"
                      prop="abstract"
                      required>
          <el-input v-model="ruleForm.abstract"></el-input>
        </el-form-item>
        <div style="display:flex; flex-direction:row;">
          <el-form-item label="作者"
                        required
                        prop="author"
                        style="flex:1;">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <el-form-item label="类目"
                        prop="category"
                        required
                        style="flex:1;">
            <el-select v-model="ruleForm.category">
              <el-option label="Vue"
                         value="Vue"></el-option>
              <el-option label="React"
                         value="React"></el-option>
              <el-option label="Node.js"
                         value="Node.js"></el-option>
              <el-option label="性能优化"
                         value="性能优化"></el-option>
              <el-option label="JavaScript"
                         value="JavaScript"></el-option>
              <el-option label="小程序"
                         value="小程序"></el-option>
              <el-option label="工具类"
                         value="工具类"></el-option>
              <el-option label="其他"
                         value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源"
                        prop="source"
                        required
                        style="flex:1;">
            <el-select v-model="ruleForm.source">
              <el-option label="原创"
                         value="原创"></el-option>
              <el-option label="转载"
                         value="转载"></el-option>
              <el-option label="与他人合作"
                         value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要性"
                        prop="star"
                        required
                        style="flex:1;">
            <el-select v-model="ruleForm.star">
              <el-option label="1"
                         value="1"></el-option>
              <el-option label="2"
                         value="2"></el-option>
              <el-option label="3"
                         value="3"></el-option>
              <el-option label="4"
                         value="4"></el-option>
              <el-option label="5"
                         value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间"
                        prop="date"
                        required
                        style="flex:1;">
            <el-date-picker type="datetime"
                            placeholder="选择日期时间"
                            v-model="ruleForm.date"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <div id="main">
      <mavon-editor v-model="text" />
    </div>
    <div style="display:flex;justify-content:center;margin:20px 0;">
      <button style="background:#409EFF; color:white;border-radius: 3px;padding:5px 10px;"
              @click="submitForm">发布</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      text: '',
      id: '',
      ruleForm: {
        title: '',
        abstract: '',
        author: '',
        category: '',
        source: '',
        star: '',
        date: '',
      },

    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          axios
            .post(('/api/article/update'), {
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              date: this.ruleForm.date,
              text: this.text,
              id: this.id
            })
            .then(res => {
              console.log(res.data)
              if (res.data.success === true) {
                alert('创建成功')
                this.$router.push('/Released')
              } else {
                alert('创建失败 请重新再来')
              }
              console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    back () {
      this.$router.push('/Released')
    }
  },

  mounted () {
    let mis = this.$route.query.mis
    this.ruleForm.title = mis.title,
      this.ruleForm.abstract = mis.abstract,
      this.ruleForm.author = mis.author,
      this.ruleForm.category = mis.category,
      this.ruleForm.source = mis.source,
      this.ruleForm.star = mis.star,
      this.text = mis.text,
      this.ruleForm.date = mis.date,
      this.id = mis._id
    // console.log(mis)
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>

