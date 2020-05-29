<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="detail">
    <div v-if="article">
      <div class="head">
        <p class="title">{{ article.Title }}</p>
        <time>{{ article.CreateTime }}</time>
        <div class="cats">{{ article.UserName }}</div>
        <el-tag size="mini">{{ article.CName }}</el-tag>
      </div>
      <div class="content">
        <v-md-editor v-model.lazy="article.Content" mode="preview" />
      </div>

      <div class="nextRead">
        <div v-if="prev" class="prev">上一篇：<a :href="'/article/post/' + prev.Id">{{ prev.Title }}</a></div>
        <div v-else class="prev">上一篇：没有了</div>
        <div v-if="next" class="next">下一篇：<a :href="'/article/post/' + next.Id">{{ next.Title }}</a></div>
        <div v-else class="next">下一篇：没有了</div>
      </div>

      <div v-for="(item,index) in CommentList" :key="item.Id" class="commentArea">
        <div class="history">
          <div class="top">
            <a :href="'#' + item.Id" class="index">#{{ index+1 }}楼</a>
            <span v-if="item.UserId === article.UserId">[楼主]</span>
            <span>{{ item.Address }}</span>
            <a :id="'comment_anchor_' + item.Id" :name="item.Id" />
            <span class="time">{{ item.CreateTime }}</span>
            <span class="username">{{ item.NickName }}</span>
          </div>
          <div class="feedbackCon">
            <div :id="'comment_body_'+item.UserId">
              <div class="blog_comment_body" v-html="replaceBr(item.Content)">{{ item.Content }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="article.IsOpenComment" class="comment">
        <div class="write">
          <el-input
            v-model="Comment.Content"
            type="textarea"
            :rows="4"
            placeholder="既然来了，就说几句"
            style="border:1px solid #E3E3E3"
          />
        </div>
        <div class="operation">
          <div class="right">
            <el-button type="primary" @click="reply()">评&nbsp;&nbsp;论</el-button>
          </div>
        </div>
      </div>
      <div v-else class="comment">
        <p class="stop">本文已禁止评论</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleInfo, getAddress, rePlyComment } from '@/api/api'
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
      },
      Comment: {
        ArticleId: '',
        Content: '',
        ParentId: '',
        IP: '',
        Address: ''
      },
      CommentList: [],
      prev: {},
      next: {}
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    name() {
      return this.$store.state.user.name
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getInfo()
    console.log(this.$store.state)
  },
  methods: {
    replaceBr(val) {
      // const reg = new RegExp("\r\n")
      return val.replace('&#13;', '<br>')
    },
    async getInfo() {
      const res = await getArticleInfo({ id: this.id })
      if (res.result === true) {
        if (!res.data) {
          this.$router.push({ path: '/404' })
        } else {
          const { art, com, data } = res.data
          this.article = art
          this.CommentList = com
          this.prev = data.prev
          this.next = data.next
        }
      } else {
        this.$message.warning(res.msg)
      }
      this.Loading = false
    },
    async reply() {
      if (!this.token) {
        this.$message.info('请先登录')
        return
      }
      await this.Address()
      this.Comment.ArticleId = this.Article.Id
      const res = await rePlyComment('?name=' + this.name, this.Comment)
      if (res.result === true) {
        this.$message.success(res.msg)
        this.Comment.Content = ''
        this.LoadArticle()
      } else {
        this.$message.warning(res.msg)
      }
    },
    async Address() {
      const { data } = await getAddress()
      console.log(data)
      if (data.info === 'OK') {
        this.Comment.Address = data.province + data.city
      }
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

.commentArea {
  padding: 0 20px;
}

.nextRead{
  padding: 20px 20px;
}

.nextRead a:hover{
  color:#21759b;
  text-decoration: underline;
}

.blog_comment_body {
  word-wrap: break-word;
  overflow-wrap: break-word;
  color:#7d8b8d;
  font-family: verdana,Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 25px;
  padding:10px;
  margin:10px 0;
  border: 1px dashed #dedede ;
}

.commentArea .markdown-body{
  border:none;
}

.commentArea .history .top{
  overflow: hidden;
  color: #909399;
  padding: 8px 5px;
}

.history .top a,.history .top span{
  font-size: 12px;
  color:gray;
}

.history .top a{
  text-decoration: none;
}

.history .top a:link,.history .top a:visited,.history .top a:active{
  color:#21759b;
  font-weight: bold;
}

.commentArea .history .feedbackManage{
  float:right;
  width: 200px;
  text-align: right;
}

.feedbackCon .v-note-wrapper {
  min-height: 0 !important;
}

.comment {
  padding: 40px 20px;
}

.comment .write {
  margin-bottom: 10px;
}

.comment .stop{
  width:100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #dedede;
  color:#7d8b8d;
  font-family: verdana,Arial, Helvetica, sans-serif;
}

</style>
