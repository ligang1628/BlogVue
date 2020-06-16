<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="message">
    <div class="inputBox">
      <el-input
        id="area"
        v-model="Comment.Content"
        type="textarea"
        :rows="5"
        placeholder="既然来了，就说几句"
        style="border:1px solid #E3E3E3"
      />
      <!-- <v-md-editor v-model="text" :mode="mode" left-toolbar="emoji" right-toolbar="" />
      <p class="show"><i class="el-icon-position fly" :title="setModeTitle" :style="{'color' : setModeColor }" @click="setMode" /></p> -->
      <el-button type="primary" class="reply" @click="replyMessage">留言</el-button>
    </div>
    <div v-if="CommentList" class="area">
      <div v-for="(item,index) in CommentList" :key="item.Id" class="commentArea">
        <div class="history">
          <div class="top">
            <a :href="'#' + item.Id" class="index">#{{ index+1 }}楼</a>
            <span>{{ item.Address }}</span>
            <a :id="'comment_anchor_' + item.Id" :name="item.Id" />
            <span class="time">{{ item.CreateTime }}</span>
            <span class="username">{{ item.Name }}</span>
          </div>
          <div class="feedbackCon">
            <div :id="'comment_body_'+item.Id">
              <div class="blog_comment_body" v-html="item.Content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddress, replyMessage, GetMessageList } from '@/api/api'
export default {
  data() {
    return {
      id: '',
      Loading: false,
      text: '',
      mode: 'edit',
      Comment: {
        Content: '',
        Address: ''
      },
      CommentList: []
    }
  },
  computed: {
    setModeColor() {
      return this.mode === 'edit' ? 'gray' : '#3a8ee6'
    },
    setModeTitle() {
      return this.mode === 'edit' ? '预览' : '编辑'
    },
    token() {
      return this.$store.state.user.token
    },
    name() {
      return this.$store.state.user.name
    }
  },
  created() {
    this.GetMessageList()
  },
  methods: {
    setMode() {
      if (this.mode === 'edit') {
        this.mode = 'preview'
      } else {
        this.mode = 'edit'
      }
    },
    async GetMessageList() {
      const res = await GetMessageList()
      if (res.result === true) {
        this.CommentList = res.data
        this.Comment.Content = ''
      } else {
        this.$message.warning(res.msg)
      }
    },
    async replyMessage() {
      if (!this.token) {
        this.$message.info('请先登录')
        this.$router.push({ path: '/login', query: { 'redirect': '/message' }})
      } else {
        const { data } = await getAddress()
        if (data.info === 'OK') {
          this.Comment.Address = data.province + data.city
        }
        const res = await replyMessage('?name=' + this.name, this.Comment)
        if (res.result === true) {
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      }
    }
  }
}
</script>

<style scoped>
.message {
  width:1200px;
  min-height: 800px;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
}

.message .inputBox {
  overflow: hidden;
}

.message .show{
  background-color: #ffffff;
  margin:0;
}

.message .fly{
  font-size: 30px;
  color:gray;
  cursor: pointer;
  padding: 10px;
}

.message .fly:focus,.message .fly:hover{
  color:#3a8ee6;
}

.el-textarea {
  border: none !important;
  box-shadow: 0px 0px 20px #909399;
}

.el-textarea:hover,.el-textarea:focus {
  border: none !important;
}

.message .reply {
  float:right;
  margin-top: 20px;
}

/* 评论列表 */

.area {
  width: 100%;
  margin-top: 20px;
  padding: 10px 0px;
  background-color: #ffffff;
  border-radius: 5px;
}

.commentArea {
  list-style: none;
  margin: 0px 20px;
  padding-bottom:10px;
  border-bottom: 1px solid #dedede;
}

.commentArea:last-child {
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

.blog_comment_body {
  padding:5px 10px;
  font-size: 14px;
  /* margin:10px 0; */
  /* border: 1px dashed #dedede ; */
}
</style>
