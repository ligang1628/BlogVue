<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="message">
    <div class="inputBox">
      <v-md-editor v-model="text" :mode="mode" left-toolbar="emoji" right-toolbar="" />
      <p class="show"><i class="el-icon-position fly" :title="setModeTitle" :style="{'color' : setModeColor }" @click="setMode" /></p>
      <el-button type="primary" class="reply" @click="replyMessage">留言</el-button>
    </div>
    <div v-if="CommentList" class="area">
      <div v-for="(item,index) in CommentList" :key="item.Id" class="commentArea">
        <div class="history">
          <div class="top">
            <a :href="'#' + item.Id" class="index">#{{ index+1 }}楼</a>
            <span v-if="item.UserId === name">[楼主]</span>
            <span>{{ item.Address }}</span>
            <a :id="'comment_anchor_' + item.Id" :name="item.Id" />
            <span class="time">{{ item.CreateTime }}</span>
            <span class="username">{{ item.NickName }}</span>
          </div>
          <div class="feedbackCon">
            <div :id="'comment_body_'+item.Id">
              <div class="blog_comment_body" v-html="replaceBr(item.Content)">{{ item.Content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      Loading: false,
      text: '',
      mode: 'edit',
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
  methods: {
    setMode() {
      if (this.mode === 'edit') {
        this.mode = 'preview'
      } else {
        this.mode = 'edit'
      }
    },
    replyMessage() {
      if (!this.token) {
        this.$message.info('请先登录')
        return
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

.message .reply {
  float:right;
  margin-top: 20px;
}

</style>
