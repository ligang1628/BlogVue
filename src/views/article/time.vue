<template>
  <div v-loading="Loading" class="index" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
    <div class="article-header">
      <p>
        <label class="title">最新博文</label>
      </p>
    </div>
    <div class="article-list">
      <ul v-if="articleList">
        <li v-for="(item,index) in articleList" :key="index">
          <h3 class="blogtitle">
            <a :href="'/article/post/'+item.Id">{{ item.Title }}</a>
          </h3>
          <p class="blogtext">
            {{ item.Abstract }}
          </p>
          <p class="bloginfo">
            <span>发布于 <a :href="'/time/'+item.CreateTime">{{ item.CreateTime }}</a>。</span>
            <span>属于 <a :href="'/cate/'+item.CategoryId">{{ item.CName }}</a> 分类</span>
          </p>
        </li>
      </ul>
      <span v-else>暂无博文</span>
    </div>
    <div class="page">
      <el-pagination
        :current-page="1"
        prev-text="上一页"
        next-text="下一页"
        :hide-on-single-page="true"
        :page-size="pageParams.limit"
        :total="pageParams.total"
        layout="prev, pager, next"
        @current-change="CurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getArticleByTime } from '@/api/api'
export default {
  data() {
    return {
      time: '',
      Loading: true,
      articleList: [],
      pageParams: {
        page: 1,
        limit: 10,
        time: '',
        total: 0
      }
    }
  },
  created() {
    // this.getArticle()
  },
  mounted() {
    const time = this.$route.params.time
    this.time = time.replace('-', ' 年 ') + ' 月'
    this.pageParams.time = time
    this.getArticle()
  },
  methods: {
    CurrentChange(obj) {
      this.pageParams.page = obj
      this.getNewArticle()
    },
    async getArticle() {
      const res = await getArticleByTime(this.pageParams)
      if (res.result === true) {
        this.articleList = res.data
        this.pageParams.total = res.count
      } else {
        this.$message.warning(res.msg)
      }
      this.Loading = false
    }
  }
}
</script>

<style scoped>
@import url(../../styles/base.css);
</style>
