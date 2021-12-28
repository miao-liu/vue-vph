import Vue from 'vue'
import App from './App'
import router from '@/router/index'
import currency from '@/api/currency'
import store from '@/store/index/index'
import '@/config/rem'
import '@/assets/css/reset.css'
import '@/assets/css/iconfont.css'

Vue.config.productionTip = false
Vue.filter('currency', currency)
Vue.prototype.imgUrl = process.env.VUE_APP_IMGURL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
