<template>
  <div v-loading="Loading" class="home" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
    <article class="newhome">
      <div class="lbox">
        <div class="index">
          <div class="article-header">
            <p>
              <label class="title">最新随笔</label>
            </p>
          </div>
          <div class="article-list">
            <ul v-if="moodList.length > 0">
              <li v-for="(item,index) in moodList" :key="index">
                <h3 class="moodtitle">
                  <a :href="'/mood/post/'+item.Id">{{ item.Title }}</a>
                </h3>
                <p class="moodtext">
                  {{ item.Abstract }}
                </p>
                <p class="moodinfo">
                  <span>发布于{{ item.CreateTime }}。属于{{ item.Category }}分类</span>
                </p>
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
      </div>
      <div class="rbox">
        <right-slot>
          <right-slot-item>
            <p slot="title">公众号</p>
            <div slot="content" class="imgContent">
              <img src="../../assets/images/gzh.jpg">
              <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=1628300708@qq.com" target="blank" title="我的邮箱">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-blog-youxiang" />
                </svg>
              </a>
              <a href="http://wpa.qq.com/msgrd?v=3&uin=1628300708&site=qq&menu=yes" target="blank" title="QQ">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-blog-QQ1" />
                </svg>
              </a>
              <a href="https://github.com/ligang1628" title="github" target="blank">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-blog-github" />
                </svg>
              </a>
            </div>
          </right-slot-item>
        </right-slot>
      </div>
    </article>
  </div>
</template>

<script>
import { getMoodList } from '@/api/api'
import RightSlot from '@/components/RightSlot/RightSlot'
import RightSlotItem from '@/components/RightSlot/RightSlotItem'
export default {
  components: {
    RightSlot,
    RightSlotItem
  },
  data() {
    return {
      Loading: false,
      moodList: [],
      pageParams: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  created() {
    this.getMoodList()
  },
  methods: {
    CurrentChange(obj) {
      this.pageParams.page = obj
      this.getMoodList()
    },
    async getMoodList() {
      const res = await getMoodList(this.pageParams)
      if (res.result === true) {
        this.moodList = res.data
      } else {
        this.$message.warning(res.msg)
      }
    }
  }
}
</script>

<style scoped>
@import url(../../styles/base.css);
.mood {
  /* padding-top: 20px; */
  min-height: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

.mood-list {
  width:100%;
}

.mood-list ul {
  padding:10px 0;
}

.mood-list li {
  overflow: hidden;
  border-bottom: 1px dashed #eee;
  padding: 10px 0;
  position: relative;
  min-height: 120px;
}

/* .mood-list ul li:last-child {
  border-bottom: none;
} */

.moodtitle{
  margin: 0 0 10px 0;
  font-size: 18px;
  overflow: hidden;
}

.moodtitle:hover{
  color: #337ab7;
}

.moodtext, .moodinfo {
  overflow: hidden;
  margin-top: 20px;
}

.moodtext {
  font-size: 14px;
  color: #666;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
}

.moodinfo{
  color:#999;
  line-height: 34px;
}

.moodinfo span{
  color: #757575;
  font-size: .85rem;
}

.moodinfo span a{
  font-size: .85rem;
  text-decoration:underline;
}

.moodinfo span a:hover,.moodinfo span a:focus {
  color:#21759b;
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

.moodlist {
  width:100%;
  height:150px;
  line-height:150px;
  border:1px dashed #dedede;
  text-align:center;
}

</style>
