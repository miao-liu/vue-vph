import Vue from 'vue'
import manage from './App.vue'
import router from '../../router/manage'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(manage)
}).$mount('#app')
