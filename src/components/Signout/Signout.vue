<template>
  <div style="display:flex;width:100%;height:500px;">
    <div style='flex:1'></div>
    <div style='flex:1;'>
      <div style="font-size:30px;margin-top:150px;">期待您下次光临</div>
      <div style="margin:10px 50px;"><el-button type="primary" @click="signout">确定退出</el-button></div>
    </div>
    <div style='flex:1'></div>
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
    return {

    }
  },
  methods: {
    signout () {
      axios.get('/api/user/logout').then(res=>{
      localStorage.clear();
      this.$message.success(res.data.message);
      this.$router.push('/Login')
      }).catch(err=>{
        console.log(err)
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
</style>