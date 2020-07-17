<template>
  <div id="app">
    <el-card>
      <div style="display:flex;padding: 10px 0;">
        <h2 style="flex:1;background:#EEEEEE;padding:5px 5px;">支持拖拽</h2>
      </div>
      <el-upload class="upload-demo"
                 drag
                 action="/api/upload"
                 multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip"
             slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div style="padding: 10px 0;">
        <h2>支持裁剪</h2>
      </div>
      <div style="display:flex;padding: 10px 0;">
        <p style="flex:1;background:#EEEEEE;padding:5px 5px;">vue-image-crop-upload</p>
      </div>
      <button style="width:150px; height:50px;text-align:center;line-height:50px; background:#409EFF;border-radius:5px;border:none;color:white;"
              @click="toggleShow">上传图片</button>
      <my-upload @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :width="200"
                 :height="200"
                 img-format="png"
                 :size="size"
                 langType='zh'
                 :noRotate='false'
                 field="file"
                 url="/api/upload"
                 :withCredentials='true'></my-upload>
      <img :src="imgDataUrl">
    </el-card>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload';
export default {
  name: '',
  props: {
  },
  components: {
    myUpload
  },
  data () {
    return {
      imgDataUrl: "",
      show: false,
      size: 2.1,
      file: ''
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show;
    },
    cropSuccess (imgDataUrl, field) {
      console.log('-------- crop success --------', imgDataUrl, field);
    },
    //上传成功回调
    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------');
      this.imgDataUrl = jsonData.files.file;
      console.log(jsonData);
      console.log('field: ' + field);
    },
    //上传失败回调
    cropUploadFail (status, field) {
      console.log('-------- upload fail --------');
      console.log('上传失败状态' + status);
      console.log('field: ' + field);
    }

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