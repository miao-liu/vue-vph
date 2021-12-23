import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../views/manage/App'
Vue.use(VueRouter)

const routes = [{
  path: '/manage',
  component: App,
  children: [{
    path: '',
    component: () => import('../components/manage/home')
  }, {
    path: 'user',
    component: () => import('../components/manage/user')
  }]
}]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
