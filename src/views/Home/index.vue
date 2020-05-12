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
          <ul>
            <li>
              <h3 class="blogtitle">
                <a href="javascript:void(0)">标题</a>
              </h3>
              <p class="blogtext">
                啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊阿啊啊啊啊啊啊啊啊啊啊啊
              </p>
              <p class="bloginfo">
                <el-avatar :size="50" src="" style="vertical-align:middle;" />
                <!-- <i class="avatar"></i> -->
                <span>技术博文</span>
                <span>2020/05/21</span>
                <span>【<a href="javascript:void(0)">作者</a>】</span>
              </p>
              <a href="javascrpt:void(0)" class="viewmore">更多</a>
            </li>
          </ul>
        </div>
        <div class="page">
          <el-pagination
            prev-text="上一页"
            next-text="下一页"
            :hide-on-single-page="true"
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="100"
          />
        </div>
      </div>
      <div class="rbox">广告</div>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Loading: true
    }
  },
  created() {
    console.log(this.$store.state)
  },
  mounted() {
    this.Loading = false
  }
}
</script>

<style scoped>
/* .home {
} */

.home .newhome {
  width:1200px;
  background-color: #ffffff;
  padding: 20px;
  overflow: hidden;
  margin: 0 auto;
}

.home .lbox {
  width:75%;
  float: left;
  overflow: hidden;
}

.home .rbox {
  float:right;
  width: 23.5%;
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
  margin-bottom: 20px;
  border-bottom: 1px dashed #eee;
  padding-bottom: 20px;
  position: relative;
  min-height: 120px;
}

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
  margin: 0 5px;
}

.bloginfo span a{
  color:#409674;
}

a.viewmore{
  display: block;
  border-radius: 3px;
  position: absolute;
  right:10px;
  bottom: 38px;
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

.rbox{
  border:1px solid red;
}

</style>
