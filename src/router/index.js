import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Index from '@/views/index'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
      {
        path: '/',
        name: '',
        component: () => import('@/views/Home/public'),
        meta: { title: '' },
        children: [
          {
            path: '/',
            name: '首页',
            component: () => import('@/views/Home/index'),
            mate: { title: '' }
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
          }
        ]
      },
      {
        path: 'mood',
        name: '心情随笔',
        redirect: '/mood/index',
        component: Index,
        meta: { title: '心情随笔' },
        children: [
          {
            path: 'index',
            name: '随笔列表',
            component: () => import('@/views/mood/index'),
            meta: { title: '随笔列表' }
          },
          {
            path: 'post/:id(\\d+)',
            name: '查看随笔',
            component: () => import('@/views/mood/detail'),
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
          // {
          //   path: 'index',
          //   component: () => import('@/views/article/index'),
          //   name: '文章列表',
          //   mata: { title: '文章列表' }
          // },
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
