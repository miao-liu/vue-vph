<template>
<div>
    <bread-menu :navs="navs"/>
    <product-list />
</div>
</template>
<script>
import breadMenu from '@/components/index/breadMenu.vue'
import productList from '@/components/index/cart/productList.vue'
export default {
  data () {
    return {
      list: [],
      navs: [{ name: '个人中心', to: '/center' }, { name: '购物车', to: '/cart' }]
    }
  },
  components: { breadMenu, productList }
}
</script>
<style scoped>
  div{
    height: auto;
    padding: 2%;
  }
</style>
