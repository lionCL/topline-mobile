import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
const Login = () => import('@/views/login/')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes
})

export default router
