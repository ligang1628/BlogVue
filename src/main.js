import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import '@/icons' // icon
import '@/permission' // permission control

import marked from 'marked'
Vue.prototype.$marked = marked

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn'
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'

VueMarkdownEditor.use(vuepressTheme)
VueMarkdownEditor.use(createEmojiPlugin())
VueMarkdownEditor.use(createKatexPlugin())
VueMarkdownEditor.use(createTodoListPlugin())

Vue.use(VueMarkdownEditor)
console.log(VueMarkdownEditor.version)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
