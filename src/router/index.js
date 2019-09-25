import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
const Login = () => import('@/views/login/')
const Home = () => import('@/views/home/')
const TabBar = () => import('@/views/tabBar/')
const Search = () => import('@/views/search/')
const List = () => import('@/views/list/')
const Detail = () => import('@/views/detail/')
const My = () => import('@/views/my/')
const Person = () => import('@/views/person/')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: TabBar,
    children: [
      { path: 'home', component: Home, name: 'home' },
      { path: '/my', component: My, name: 'my' }
    ]
  },
  { path: '/login', component: Login, name: 'login' },
  { path: '/search', component: Search, name: 'search' },
  { path: '/list/:keyword', component: List, name: 'list' },
  { path: '/detail/:artid', component: Detail, name: 'detail' },
  { path: '/person', component: Person, name: 'person' }
]

const router = new VueRouter({
  routes
  // mode: 'history'
})

export default router
