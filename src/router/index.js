import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
const Login = () => import('@/views/login/')
const Home = () => import('@/views/home/')
const TabBar = () => import('@/views/tabBar/')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/', component: TabBar, children: [{ path: '/home', component: Home, name: 'home' }] },
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes
})

export default router
