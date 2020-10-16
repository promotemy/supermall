import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('@/views/home/home.vue')
const category = () => import('@/views/category/category.vue')
const cart = () => import('@/views/cart/cart.vue')
const profile = () => import('@/views/profile/profile.vue')
const detail = () => import('../views/detail/detail.vue')
// 安装插件
Vue.use(VueRouter)
// 创建router

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detail/:iid',
    component: detail
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router