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
        <v-md-editor v-model.lazy="article.Content" mode="preview" @copy-code-success="CopyCode" />
      </div>

      <div class="nextRead">
        <div v-if="prev" class="prev">上一篇：<a :href="'/article/post/' + prev.Id">{{ prev.Title }}</a></div>
        <div v-else class="prev">上一篇：没有了</div>
        <div v-if="next" class="next">下一篇：<a :href="'/article/post/' + next.Id">{{ next.Title }}</a></div>
        <div v-else class="next">下一篇：没有了</div>
      </div>

      <div v-if="article.IsOpenComment" class="comment">
        <div class="write">
          <el-input
            id="area"
            v-model="Comment.Content"
            type="textarea"
            :rows="4"
            :placeholder="defaultPlace"
            style="border:1px solid #E3E3E3"
          />
        </div>
        <div class="operation">
          <div v-if="tokenExists" class="right">
            <el-button type="warning" style="display:none" :class="{btnCancal: Cancel}" @click="HandlerCancel">取消评论</el-button>
            <el-button type="primary" @click="reply()">评&nbsp;&nbsp;论</el-button>
          </div>
          <div v-else class="right">
            <el-button style="background-color:#5fbeaa;color:#fff;" @click="login">登&nbsp;&nbsp;录</el-button>
          </div>
        </div>
      </div>
      <div v-else class="comment">
        <p style="padding:60px 0;border:1px solid #dedede;">本文已禁止评论</p>
      </div>

      <div class="com">
        <ul v-for="(item,index) in CommentList" :key="item.Id" class="commentArea">
          <li class="history">
            <div class="top">
              <div class="people" @mouseenter="enter(item.Id)" @mouseleave="leave">
                <a :href="'#' + item.Id" class="index">#{{ index+1 }}楼</a>
                <a :id="'comment_anchor_' + item.Id" :name="item.Id" />
                <a href="javascript:void(0)" style="vertical-align:middle">
                  <el-avatar :size="30" :src="item.Avatar" />
                </a>
                <span class="username">{{ item.UserName }}</span>
                <span v-if="item.UserName === article.UserName">[楼主]</span>：
                <i class="el-icon-time" />
                <span class="time">{{ time(item.CreateTime,item.CreateTime) }}</span>
                <div class="feedbackManage show" :class="{ active : activeIndex === item.Id }">
                  <span class="comment_actions">
                    <a href="javascript:void(0)" @click="replyInfo(item)">回复</a>
                  </span>
                </div>

              </div>
            </div>
            <div class="feedbackCon">
              <div :id="'comment_body_'+item.UserId" class="comment_body">
                <div class="blog_comment_body">
                  <label v-html="item.Content" />
                </div>
                <ul v-if="item.list" class="top">
                  <li v-for="itm in item.list" :key="itm.Id">
                    <div class="people" @mouseenter="enter(itm.Id)" @mouseleave="leave">
                      <div class="feedbackManage show" :class="{active: activeIndex === itm.Id}">
                        <span class="comment_actions">
                          <a href="javascript:void(0)" @click="replyInfo(itm)">回复</a>
                        </span>
                      </div>
                      <a href="javascript:void(0)" style="vertical-align:middle">
                        <el-avatar :size="30" :src="itm.Avatar" />
                      </a>
                      <span>{{ itm.UserName }}</span>
                      <span v-if="itm.UserName === article.UserName">[楼主]</span>
                      <span v-if="itm.Reply_UserId">@{{ itm.Reply_UserName }}</span>
                      <span v-else>@{{ itm.PId_UserName }}</span>
                      <span v-if="itm.UserName === article.UserName">[楼主]</span>：
                      <i class="el-icon-time" />
                      <span class="time">{{ time(itm.CreateTime,itm.CreateTime) }}</span>
                    </div>
                    <div class="blog_comment">
                      <label v-html="itm.Content" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleInfo, getAddress, rePlyComment } from '@/api/api'
import { formatTime } from '@/utils/index'
export default {
  name: 'Post',
  data() {
    return {
      activeIndex: -1,
      defaultPlace: '既然来了，就说几句',
      Cancel: false,
      id: '',
      times: null,
      Loading: true,
      article: '',
      Comment: {
        ArticleId: '',
        Content: '',
        ParentId: '',
        IP: '',
        Address: '',
        Level: 1,
        PId_UserId: '',
        Reply_Id: '',
        Reply_UserId: ''
      },
      CommentList: [],
      prev: {},
      next: {},
      tokenExists: false
    }
  },
  computed: {
    name() {
      return this.$store.state.user.name
    }
  },
  created() {
    const token = this.$store.state.user.token
    if (token !== 'undefined' && token !== undefined) {
      this.tokenExists = true
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getInfo()
  },
  methods: {
    CopyCode(code) {
      this.$message.success('copy success')
    },
    enter(idx) {
      this.activeIndex = idx
    },
    leave() {
      this.activeIndex = -1
    },
    time(time, options) {
      return formatTime(time, options)
    },
    async login() {
      this.$router.push({ name: 'login', query: { 'redirect': '/article/post/' + this.id }})
    },
    HandlerCancel() {
      this.Comment.ParentId = ''
      this.Comment.PId_UserId = ''
      this.Comment.Reply_Id = ''
      this.Comment.Reply_UserId = ''
      this.Comment.Level = 1
      this.Cancel = false
      this.defaultPlace = '既然来了，就说几句'
    },
    async getInfo() {
      const res = await getArticleInfo({ id: this.id })
      if (res.result === true) {
        if (res.data === null) {
          this.$router.push({ path: '/404' })
          this.$message.warning(res.msg)
        } else {
          const { art, com, data } = res.data
          this.article = art
          this.CommentList = com
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
    },
    async reply() {
      if (!this.tokenExists) {
        this.$message.info('请先登录')
        return
      }
      await this.Address()
      this.Comment.ArticleId = this.id
      this.Comment.Content = this.Comment.Content.replace(/(^\s*)|(\s*$)/g, '')
      if (this.Comment.Content.length === 0) {
        this.$message.warning('请输入评论内容')
        return
      }
      const res = await rePlyComment('?name=' + this.name, this.Comment)
      if (res.result === true) {
        this.$message.success(res.msg)
        this.Comment.Content = ''
        this.getInfo()
      } else {
        this.$message.warning(res.msg)
      }
      this.HandlerCancel()
    },
    replyInfo(item) {
      if (!this.tokenExists) {
        this.$message.info('请先登录')
        return
      }
      // 若不存在ParentId,则回复的是等级1
      if (item.Level === 1) {
        this.Comment.ParentId = item.Id
        this.Comment.PId_UserId = item.UserId
      } else {
        this.Comment.ParentId = item.ParentId
        this.Comment.PId_UserId = item.PId_UserId
        this.Comment.Reply_Id = item.Id
        this.Comment.Reply_UserId = item.UserId
      }
      this.Comment.Level = 2
      this.Cancel = true
      this.defaultPlace = `@ ${item.UserName}\r\n `
      document.getElementById('area').focus()
    },
    async Address() {
      const { data } = await getAddress()
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

.nextRead {
  margin: 10px 20px;
}

.nextRead p {
  display: block;
}

.comment{
  margin-top: 20px;
  padding: 20px 0px;
  margin: 0 20px;
  overflow: hidden;
  text-align: center;
}

.comment textarea {
  border-color:#909399;
  min-height: 100px !important;
  height: auto;
  line-height: 20px;
  padding: 6px 10px;
  resize: vertical;
  display: block;
  width: 100%;
  border-radius: 2px;
}

.comment .btnCancal {
  display:inline-block !important;
}

.comment .operation .right{
  margin-top: 20px;
  float:right;
}

.comment_body{
  color:#7d8b8d;
  /* border: 1px dashed #dedede; */
  word-wrap: break-word;
  overflow-wrap: break-word;
  /* color:#7d8b8d; */
  font-family: verdana,Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 25px;
}

.comment_body ul {
  margin: 0;
}

.comment_body ul li{
  text-decoration: none;
  list-style: none;
  padding:0 10px;
  border-left: 1px solid #dedede;
}

.blog_comment_body {
  padding:5px 10px;
  /* margin:10px 0; */
  /* border: 1px dashed #dedede ; */
}

/* 评论列表 */

.commentArea {
  list-style: none;
  margin: 0px 20px;
  padding:0px;
  border-bottom: 1px solid #dedede;
}

.com .commentArea:first-child {
  border-top: 1px solid #dedede;
}

.com .commentArea:last-child {
  border-bottom: none;
}

.commentArea .markdown-body{
  border:none;
}

.commentArea .history{
  margin-top: 20px;
}

.commentArea .history .top{
  overflow: hidden;
  color: #909399;
  padding: 8px 5px;
}

.history .people {
  cursor: pointer;
}

.history .top a,.history .top span{
  font-size: 12px;
  color:gray;
}

.history .top a{
  text-decoration: none;
}

.history .top li {
  margin-left: 20px;
}

.history .top a:link,.history .top a:visited,.history .top a:active{
  color:#21759b;
  font-weight: bold;
}

.commentArea .history .show{
  display:none;
}

.commentArea .history .active {
  display:inline-block;
}

.commentArea .history .showReply{
  width:70px !important;
}

.commentArea .history .feedbackManage{
  float:right;
  width: 200px;
  text-align: right;
}

.feedbackCon .v-note-wrapper {
  min-height: 0 !important;
}

</style>
