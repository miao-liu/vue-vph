import Vue from 'vue'
import App from '@/views/index/App'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: () => import('../pages/index/home')
  }, {
    path: 'type',
    component: () => import('../pages/index/type')
  }, {
    path: 'search',
    component: () => import('../pages/index/search')
  }, {
    path: 'results',
    component: () => import('../pages/index/results')
  }, {
    path: 'login',
    component: () => import('../pages/index/regLogin'),
    beforeEnter: (to, from, next) => {
      if (store.state.user.userState) {
        next('/center')
      } else {
        next()
      }
    }
  }, {
    path: 'about',
    component: () => import('../pages/index/about')
  }, {
    path: 'recommend',
    component: () => import('../pages/index/recommend')
  }, {
    path: 'discount',
    component: () => import('../pages/index/discount')
  }, {
    path: 'center',
    component: () => import('../pages/index/center'),
    meta: { needLogin: true }
  }]
}]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (store.state.user.userState) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
