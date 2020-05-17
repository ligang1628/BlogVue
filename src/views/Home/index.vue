<template>
  <div class="home">
    <article class="newhome">
      <div v-loading="Loading" class="lbox" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
        <div class="article-header">
          <p>
            <label class="title">最新博文</label>
          </p>
        </div>
        <div class="article-list">
          <ul v-if="articleList">
            <li v-for="(item,index) in articleList" :key="index">
              <h3 class="blogtitle">
                <a href="javascript:void(0)">{{ item.Title }}</a>
              </h3>
              <p class="blogtext">
                {{ item.Content }}
              </p>
              <p class="bloginfo">
                <el-avatar :size="40" :src="item.avatar" style="vertical-align:middle;" />
                <span>{{ item.CName }}</span>
                <span>{{ item.CreateTime }}</span>
                <span>【<a href="javascript:void(0)">{{ item.UserName }}</a>】</span>
              </p>
              <a :href="'/article/detail/'+item.Id" class="viewmore">更多</a>
            </li>
          </ul>
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
      <div class="rbox">
        <div class="hot">
          <p>热门文章</p>
        </div>
        <div class="hot">最近更新</div>
        <div class="hot">分类目录</div>
        <div class="hot">文章归档</div>
      </div>
    </article>
  </div>
</template>

<script>
import { getArticleList } from '@/api/api'
export default {
  data() {
    return {
      Loading: true,
      articleList: [],
      pageParams: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  created() {
    this.getNewArticle()
  },
  mounted() {
  },
  methods: {
    CurrentChange(obj) {
      this.pageParams.page = obj
      this.getNewArticle()
    },
    async getNewArticle() {
      const res = await getArticleList(this.pageParams)
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

.home .newhome {
  width:1200px;
  background-color: #ffffff;
  padding: 20px;
  overflow: hidden;
  margin: 0 auto;
  min-height: 800px;
}

.home .lbox {
  width:75%;
  float: left;
  overflow: hidden;
}

.home .rbox {
  float:right;
  width: 22.5%;
  overflow: hidden;
}

.home .article-header p {
  border-bottom: 1px solid #eee;
  font-size: 16px;
  line-height: 40px;
  color: #484848;
  font-weight: 400;
  position: relative;
  margin-bottom: 10px;
}

.home .article-header .title {
  border-bottom: 2px solid #000000;
  display: inline-block;
}

.article-list ul {
  padding:10px 0;
}

.article-list li {
  overflow: hidden;
  border-bottom: 1px dashed #eee;
  padding: 10px 0;
  position: relative;
  min-height: 120px;
}

/* .article-list li:hover,.article-list li:focus{
  border-top: 1px solid #409EFF;
  border-bottom: 1px solid #409EFF;
  cursor: pointer;
} */

.blogtitle{
  margin: 0 0 10px 0;
  font-size: 18px;
  overflow: hidden;
}

.blogtitle:hover{
  color: #337ab7;
}

.blogtext, .bloginfo {
  overflow: hidden;
  margin-top: 20px;
}

.blogtext {
  font-size: 14px;
  color: #666;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
}

.bloginfo{
  color:#999;
  line-height: 34px;
}

.bloginfo span{
  color:#b5b5b5;
  font-size: .85rem;
}

.bloginfo span a{
  font-size: .85rem;
  color:#409674;
}

a.viewmore{
  display: block;
  border-radius: 3px;
  position: absolute;
  right:10px;
  bottom: 30px;
  padding:3px 10px;
  background:#12b7de;
  color:#fff;
}

.home .page{
  text-align: center;
  margin-bottom: 20px;
}

@keyframes loading {
  0% {
    width: 90%;
  }
  50% {
    width: 100%;
  }
  to {
    width: 90%;
  }
}
[v-cloak] {
  display: none !important;
}

.rbox .hot{
  margin-bottom: 15px;
  font-size: 15px;
}

.rbox .hot p{
  color:#636363;
}

</style>
