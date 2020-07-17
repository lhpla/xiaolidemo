<template>
  <div>
    <div>
      <el-button type="primary"
                 @click="back">返回</el-button>
    </div>
    <h2>{{title}}</h2>
    <div>作者：{{abstract}}</div>
    <div>发布时间：{{time}}</div>
    <div>内容<br>
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
  },
  components: {

  },
  data () {
    return {
      title: '',
      abstract: '',
      time: '',
      text: ''
    }
  },
  methods: {
    back () {
      this.$router.push('/Released')
    }
  },
  mounted () {
    let contents = this.$route.query.content
    this.title = contents.title,
      this.abstract = contents.abstract,
      this.time = contents.time,
      this.text = contents.text
    console.log(contents)
  },
  watch: {

  },
  computed: {

  }
}
</script>

<style scoped lang='scss'>
</style>