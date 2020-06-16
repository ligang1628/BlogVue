<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="mood">
    <div class="mood-list">
      <ul v-if="moodList.length > 1">
        <li v-for="(item,index) in moodList" :key="index">
          <h3 class="moodtitle">
            <a :href="'/mood/post/'+item.Id">{{ item.Title }}</a>
          </h3>
          <p class="moodtext">
            {{ item.Abstract }}
          </p>
          <p class="moodinfo">
            <span>发布于 <a :href="'/time/'+item.CreateTime">{{ item.CreateTime }}</a>。</span>
          </p>
        </li>
      </ul>
      <div class="moodlist">
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
  /* width:1200px; */
  padding-top: 20px;
  min-height: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

.mood-list {
  width:100%;
}

.mood-list ul li:last-child {
  border-bottom: none;
}

.moodlist {
  width:100%;
  height:150px;
  line-height:150px;
  border:1px dashed #dedede;
  text-align:center;
}

</style>
