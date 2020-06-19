<template>
  <div v-loading="Loading" class="home" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
    <article class="newhome">
      <div class="lbox">
        <div class="index">
          <div class="article-header">
            <p>
              <label v-if="articleList" class="title">{{ CName }}</label>
              <label v-else class="title">最新博文</label>
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
      </div>
      <div class="rbox">
        <right-slot>
          <right-slot-item>
            <p slot="title">热门文章</p>
            <ul v-if="hostArticle.length > 0" slot="content">
              <li v-for="(item,index) in hostArticle" :key="index">
                <font style="color:#7a7a7a;font-size:14px;">[{{ index+1 }}]</font>&nbsp;<a :href="'/article/post/'+item.Id" :title="item.Title">{{ item.Title }}</a> ({{ item.Count }})
              </li>
            </ul>
          </right-slot-item>
        </right-slot>
        <right-slot>
          <right-slot-item>
            <p slot="title">最近更新</p>
            <ul v-if="recentArticle.length > 0" slot="content">
              <li v-for="(item,index) in recentArticle" :key="index">
                <font style="color:#7a7a7a;font-size:14px;">[{{ index+1 }}]</font>&nbsp;<a :href="'/article/post/'+item.Id" :title="item.Title">{{ item.Title }}</a>
              </li>
            </ul>
          </right-slot-item>
        </right-slot>
        <right-slot>
          <right-slot-item>
            <p slot="title">分类目录</p>
            <ul v-if="catelogue.length > 0" slot="content">
              <li v-for="(item,index) in catelogue" :key="index">
                <a :href="'/cate/'+item.Id" :title="item.Name">{{ item.Name }}</a> ({{ item.Count }})
              </li>
            </ul>
          </right-slot-item>
        </right-slot>
        <right-slot>
          <right-slot-item>
            <p slot="title">文章归档</p>
            <ul v-if="articleFiling.length > 0" slot="content">
              <li v-for="(item,index) in articleFiling" :key="index">
                <a :href="'/time/' + item.Year + '-' + item.Month">{{ item.Year }}年{{ item.Month }}月</a> ({{ item.Count }})
              </li>
            </ul>
          </right-slot-item>
        </right-slot>
      </div>
    </article>
  </div>
</template>

<script>
import { getArticleByCId, getHotArticle, getRecentUpdate, getCategoryNum, getArticleFiling } from '@/api/api'
import RightSlot from '@/components/RightSlot/RightSlot'
import RightSlotItem from '@/components/RightSlot/RightSlotItem'
export default {
  components: {
    RightSlot,
    RightSlotItem
  },
  data() {
    return {
      Loading: true,
      CName: '',
      articleList: [],
      hostArticle: [],
      recentArticle: [],
      catelogue: [],
      articleFiling: [],
      pageParams: {
        page: 1,
        limit: 10,
        cid: 0,
        total: 0
      }
    }
  },
  created() {
    this.getInfo()
  },
  mounted() {
    const id = this.$route.params.id
    this.pageParams.cid = id
    this.getArticle()
  },
  methods: {
    CurrentChange(obj) {
      this.pageParams.page = obj
      this.getNewArticle()
    },
    async getArticle() {
      const res = await getArticleByCId(this.pageParams)
      if (res.result === true) {
        this.articleList = res.data
        this.pageParams.total = res.count
        this.CName = res.data.length > 0 ? res.data[0].CName : '最新博文'
      } else {
        this.$message.warning(res.msg)
      }
      this.Loading = false
    },
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
@import url(../../styles/base.css);
</style>
