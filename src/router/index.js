import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Index from '@/views/index'

export const constantRoutes = [
  {
    path: '/login',
    meta: { title: '登录' },
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/signup',
    meta: { title: '注册' },
    name: 'signup',
    component: () => import('@/views/login/signup'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/',
    children: [
      // {
      //   path: '/',
      //   name: '',
      //   component: () => import('@/views/Home/public'),
      //   meta: { title: '' },
      //   children: [
      //     {
      //       path: '/',
      //       name: '首页',
      //       component: () => import('@/views/Home/index'),
      //       mate: { title: '' }
      //     },
      //     {
      //       path: '/mood',
      //       name: '随笔列表',
      //       component: () => import('@/views/mood/index'),
      //       meta: { title: '随笔列表' }
      //     },
      //     {
      //       path: 'cate/:id',
      //       name: '类别',
      //       component: () => import('@/views/article/cate'),
      //       mate: { title: '' }
      //     },
      //     {
      //       path: 'time/:time',
      //       name: '时间',
      //       component: () => import('@/views/article/time'),
      //       mate: { title: '' }
      //     }
      //   ]
      // },
      {
        path: '/',
        name: '首页',
        component: () => import('@/views/Home/index'),
        mate: { title: '' }
      },
      {
        path: '/mood',
        name: '随笔列表',
        component: () => import('@/views/mood/index'),
        meta: { title: '随笔列表' }
      },
      {
        path: 'cate/:id',
        name: '类别',
        component: () => import('@/views/article/cate'),
        mate: { title: '' }
      },
      {
        path: 'time/:time',
        name: '时间',
        component: () => import('@/views/article/time'),
        mate: { title: '' }
      },
      {
        path: 'mood',
        name: '心情随笔',
        component: Index,
        meta: { title: '心情随笔' },
        children: [
          {
            path: 'post/:id(\\d+)',
            name: '查看随笔',
            component: () => import('@/views/mood/post'),
            meta: { title: '查看随笔' }
          }
        ]
      },
      {
        path: 'article',
        name: '技术分析',
        redirect: '/',
        component: Index,
        meta: { title: '技术分析' },
        children: [
          {
            path: 'post/:id',
            component: () => import('@/views/article/post'),
            name: '查看文章',
            mata: { title: '查看文章' }
          }
        ]
      },
      {
        path: 'message',
        name: 'Blog留言',
        component: () => import('@/views/message/index'),
        meta: { title: 'Blog留言' }
      },
      {
        path: 'about',
        name: '关于我',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我' }
      }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
