<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="detail">
    <div v-if="mood">
      <div class="head">
        <p class="title">{{ mood.Title }}</p>
        <time>{{ mood.CreateTime }}</time>
        <div class="cats">{{ mood.UserName }}</div>
        <el-tag size="mini">{{ mood.Category }}</el-tag>
      </div>
      <div class="content">
        <v-md-editor v-model.lazy="mood.Content" mode="preview" />
      </div>

      <div class="nextRead">
        <div v-if="prev" class="prev">上一篇：<a :href="'/mood/post/' + prev.Id">{{ prev.Title }}</a></div>
        <div v-else class="prev">上一篇：没有了</div>
        <div v-if="next" class="next">下一篇：<a :href="'/mood/post/' + next.Id">{{ next.Title }}</a></div>
        <div v-else class="next">下一篇：没有了</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMood } from '@/api/api'
export default {
  name: 'Post',
  data() {
    return {
      id: '',
      Loading: true,
      mood: {},
      prev: {},
      next: {}
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const res = await getMood({ id: this.id })
      if (res.result === true) {
        if (res.data === null) {
          this.$router.push({ path: '/404' })
          this.$message.warning(res.msg)
        } else {
          const { info, data } = res.data
          this.mood = info
          this.prev = data.prev
          this.next = data.next
        }
      } else {
        if (res.data === null) {
          this.$router.push({ path: '/404' })
        }
        this.$message.warning(res.msg)
      }
      this.Loading = false
    }
  }
}
</script>

<style scoped>
.detail {
  width:1200px;
  min-height: 800px;
  margin: 0 auto;
  padding:20px;
  background-color: #ffffff;
  border-radius: 5px;
}

.detail .head{
  padding-left:20px;
}

.detail p.title{
  font-size: 2rem;
}

.detail time {
  color:#b5b5b5;
  font-size: .75rem;
}

.detail .cats {
  display:inline-block;
  font-size: .75rem;
}

.detail .cats::before{
  display: inline-block;
  margin: 0 5px;
  content: '';
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 8px solid #4caf98;
}

.detail .cats a{
  font-weight: 700;
  color: #4caf98;
}

.nextRead {
  margin: 10px 20px;
}

.nextRead p {
  display: block;
}

</style>
