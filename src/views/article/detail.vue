<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="content">
    <div v-if="article">
      <div class="head">
        <p class="title">{{ article.Title }}</p>
        <time>{{ article.CreateTime }}</time>
        <div class="cats">{{ article.UserName }}</div>
        <el-tag size="mini">{{ article.CName }}</el-tag>
      </div>
      <v-md-editor v-model="article.Content" mode="preview" />
    </div>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/api'
export default {
  data() {
    return {
      id: '',
      Loading: true,
      article: {
        title: '',
        Content: '',
        CreateTime: '',
        UserName: ''
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const res = await getArticleInfo({ id: this.id })
      if (res.result === true) {
        if (!res.data) {
          this.$router.push({ path: '/404' })
        } else {
          this.article = res.data
        }
      } else {
        this.$message.warning(res.msg)
      }
      this.Loading = false
    }
  }
}
</script>

<style scoped>
.content {
  width:1200px;
  min-height: 800px;
  margin: 0 auto;
  padding:20px;
  background-color: #ffffff;
  border-radius: 5px;
}

.content .head{
  padding-left:20px;
}

.content p.title{
  font-size: 2rem;
}

.content time {
  color:#b5b5b5;
  font-size: .75rem;
}

.content .cats {
  display:inline-block;
  font-size: .75rem;
}

.content .cats::before{
  display: inline-block;
  margin: 0 5px;
  content: '';
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 8px solid #4caf98;
}

.content .cats a{
  font-weight: 700;
  color: #4caf98;
}

</style>
