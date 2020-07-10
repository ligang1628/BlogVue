<template v-loading="loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="about">
    <div class="logo">
      <img src="../../assets/images/logo.jpg">
    </div>
    <p style="text-align:center">一个关注CSharp技术的个人网站，提供一个互联网从业者的学习成果和工作经验总结</p>
    <v-md-editor v-model.lazy="text" mode="preview" @copy-code-success="CopyCode" />
  </div>
</template>

<script>
import { about } from '@/api/api'
export default {
  data() {
    return {
      id: '',
      loading: true,
      text: ''
    }
  },
  created() {
    this.about()
  },
  methods: {
    CopyCode(code) {
      this.$message.success('copy success')
    },
    async about() {
      const res = await about()
      if (res.result === true) {
        this.text = res.data
      } else {
        this.$message.warning(res.msg)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.about {
  width:1200px;
  padding: 20px;
  min-height: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

.about .logo {
  text-align: center;
}

.about .logo img{
  width:200px;
  box-shadow: 0 0 10px #FFFFFF;
}

</style>
