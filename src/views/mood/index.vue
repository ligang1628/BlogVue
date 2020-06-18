<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="mood">
    <div class="mood-list">
      <ul v-if="moodList.length > 0">
        <li v-for="(item,index) in moodList" :key="index">
          <h3 class="moodtitle">
            <a :href="'/mood/post/'+item.Id">{{ item.Title }}</a>
          </h3>
          <p class="moodtext">
            {{ item.Abstract }}
          </p>
          <p class="moodinfo">
            <span>发布于{{ item.CreateTime }}。属于<a :href="'/cate/' + item.CategoryId">{{ item.Category }}</a>分类</span>
          </p>
        </li>
      </ul>
      <div v-else class="moodlist">
        正在书写中。。
      </div>
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
import { getMoodList } from '@/api/api'
export default {
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
