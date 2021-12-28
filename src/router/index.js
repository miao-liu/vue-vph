import Vue from 'vue'
import App from '@/views/index/App'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

window.addEventListener('beforeunload', () => {
  if (store.state.user.userToken) {
    window.sessionStorage.setItem('token', store.state.user.userToken)
  }
})

if (sessionStorage.getItem('token')) {
  store.commit('user/setToken', sessionStorage.getItem('token'))
  window.sessionStorage.removeItem('token')
}

const routes = [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: () => import('../pages/index/home'),
    meta: { title: '首页' }
  }, {
    path: 'type',
    component: () => import('../pages/index/type'),
    meta: { title: '产品分类' }
  }, {
    path: 'search',
    component: () => import('../pages/index/search'),
    meta: { title: '产品搜索' }
  }, {
    path: 'results',
    component: () => import('../pages/index/results'),
    meta: { title: '搜索结果' }
  }, {
    path: 'login',
    component: () => import('../pages/index/regLogin'),
    meta: { title: '登录' },
    beforeEnter: (to, from, next) => {
      if (store.state.user.userToken) {
        next('/center')
      } else {
        next()
      }
    }
  }, {
    path: 'about',
    component: () => import('../pages/index/about'),
    meta: { title: '关于我们' }
  }, {
    path: 'recommend',
    component: () => import('../pages/index/recommend')
  }, {
    path: 'discount',
    component: () => import('../pages/index/discount')
  }, {
    path: 'center',
    component: () => import('../pages/index/center'),
    meta: { needLogin: true, title: '个人中心' }
  }, {
    path: 'products',
    component: () => import('../pages/index/products')
  }, {
    path: 'addresslist',
    component: () => import('../pages/index/addrlist'),
    meta: { needLogin: true, title: '地址列表' }
  }, {
    path: 'addaddr',
    component: () => import('../pages/index/addaddr'),
    meta: { needLogin: true, title: '新增地址' }
  }, {
    path: 'detail',
    component: () => import('../pages/index/detail'),
    meta: { title: '产品详情' }
  }, {
    path: 'cart',
    component: () => import('../pages/index/cart'),
    meta: { needLogin: true, title: '我的购物车' }
  }]
}]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.matched.some(r => r.meta.needLogin)) {
    if (store.state.user.userToken) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
