<template>
  <div>
    <div style="display:flex; flex:1; background: #59A586;justify-content: flex-end;">
      <button style="margin:10px; background:#F56C6C; color:white;border-radius: 3px;padding:5px 10px;"
              @click="look">查看</button>
      <button style="margin:10px; background:#409EFF; color:white;border-radius: 3px;padding:5px 10px;"
              @click="submitForm">发布</button>
    </div>
    <el-card style="margin-top:20px;">
      <el-form :model="ruleForm"
               :rules="rules"
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
            <el-select v-model="ruleForm.category"
                       placeholder="请选择">
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
            <el-select v-model="ruleForm.source"
                       placeholder="请选择">
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
            <el-select v-model="ruleForm.star"
                       placeholder="请选择">
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
      ruleForm: {
        title: '',
        abstract: '',
        author: '',
        category: '',
        source: '',
        star: '',
        date: '',
      },

      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        abstract: [
          {
            required: true,
            message: '请输入文章摘要',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 50,
            message: '长度在 3 到 50 个字符',
            trigger: 'blur'
          }
        ],
        actor: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择类目', trigger: 'change' }
        ],
        date: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        text: [
          {
            type: 'text',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          axios
            .post('/api/article/create', {
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              text: this.text,
              date: this.ruleForm.date,
            })
            .then(res => {
              if (res.data.code) {
                this.$router.push('/Released')
                alert('创建成功')
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
    look () {
      this.$router.push('/Released')
    }
  },
  mounted () { },
  watch: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>

