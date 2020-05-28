<template>
  <div v-loading="Loading" class="home" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
    <article class="newhome">
      <div class="lbox">
        <router-view />
      </div>
      <div class="rbox">
        <div class="hot">
          <p>热门文章</p>
          <ul v-if="hostArticle">
            <li v-for="(item,index) in hostArticle" :key="index">
              <font style="color:#7a7a7a;font-size:14px;">[{{ index+1 }}]</font>&nbsp;<a :href="'/article/post/'+item.Id" :title="item.Title">{{ item.Title }}</a> ({{ item.Count }})
            </li>
          </ul>
        </div>
        <div class="update">
          <p>最近更新</p>
          <ul v-if="recentArticle">
            <li v-for="(item,index) in recentArticle" :key="index">
              <font style="color:#7a7a7a;font-size:14px;">[{{ index+1 }}]</font>&nbsp;<a :href="'/article/post/'+item.Id" :title="item.Title">{{ item.Title }}</a>
            </li>
          </ul>
        </div>
        <div class="category">
          <p>分类目录</p>
          <ul v-if="catelogue">
            <li v-for="(item,index) in catelogue" :key="index">
              <a :href="'/cate/'+item.Id" :title="item.Name">{{ item.Name }}</a> ({{ item.Count }})
            </li>
          </ul>
        </div>
        <div class="month">
          <p>文章归档</p>
          <ul v-if="articleFiling">
            <li v-for="(item,index) in articleFiling" :key="index">
              <a :href="'/time/' + item.Year + '-' + item.Month">{{ item.Year }}年{{ item.Month }}月</a> ({{ item.Count }})
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { getHotArticle, getRecentUpdate, getCategoryNum, getArticleFiling } from '@/api/api'
export default {
  data() {
    return {
      Loading: true,
      hostArticle: [],
      recentArticle: [],
      catelogue: [],
      articleFiling: []
    }
  },
  created() {
    this.getInfo()
  },
  mounted() {
  },
  methods: {
    async getInfo() {
      const p1 = await new Promise((resolve, reject) => {
        getHotArticle().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

      const p2 = await new Promise((resolve, reject) => {
        getRecentUpdate().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

      const p3 = await new Promise((resolve, reject) => {
        getCategoryNum().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

      const p4 = await new Promise((resolve, reject) => {
        getArticleFiling().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

      const res = await Promise.all([p1, p2, p3, p4])
      this.hostArticle = res[0].data
      this.recentArticle = res[1].data
      this.catelogue = res[2].data
      this.articleFiling = res[3].data
      this.Loading = false
    }
  }
}
</script>

<style scoped>
.home .newhome {
  width:1200px;
  padding: 20px;
  overflow: hidden;
  margin: 0 auto;
  min-height: 800px;
}

.home .lbox {
  width:75%;
  padding:0 20px;
  float: left;
  background-color: #ffffff;
  overflow: hidden;
}

.home .rbox {
  float:right;
  width: 22.5%;
  overflow: hidden;
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

.rbox .hot,.rbox .update,.rbox .category,.rbox .month{
  margin-bottom: 15px;
  font-size: 15px;
  background: #ffffff;
  padding:10px 20px;
}

.rbox ul{
  margin:0;
  padding:0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}

.rbox ul li {
  color:#7a7a7a;
  font-size: 13px;
  line-height: 1.846153846;
  font-family:"Open Sans", Helvetica, Arial, sans-serif;
}

.rbox ul li a{
  text-decoration: underline;
}

.rbox ul li a:hover,.rbox ul li a:focus{
  color: #21759b;
}
.rbox .hot p{
  color:#636363;
}

</style>
