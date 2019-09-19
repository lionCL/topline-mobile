import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
const Login = () => import('@/views/login/')
const Home = () => import('@/views/home/')
const TabBar = () => import('@/views/tabBar/')
const Search = () => import('@/views/search/')
const List = () => import('@/views/list/')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: TabBar,
    children: [{ path: 'home', component: Home, name: 'home' }]
  },
  { path: '/login', component: Login, name: 'login' },
  { path: '/search', component: Search, name: 'search' },
  { path: '/list/:keyword', component: List, name: 'list' }
]

const router = new VueRouter({
  routes
  // mode: 'history'
})

export default router
