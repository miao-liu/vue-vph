<template>
  <div class="shop-home">
     <top />
     <columns />
     <recommend />
     <selection />
     <today />
     <bottom />
     <cart-icon />
     <back-top />
  </div>
</template>
<script>
import top from '@/components/index/top.vue'
import columns from '@/components/index/home/nav.vue'
import recommend from '@/components/index/home/recommend.vue'
import selection from '@/components/index/home/selection.vue'
import today from '@/components/index/home/today.vue'
import bottom from '@/components/index/bottom.vue'
import cartIcon from '@/components/index/cartIcon.vue'
import backTop from '@/components/index/backTop.vue'
export default {
  name: 'ShopHome',
  components: { top, columns, recommend, selection, today, bottom, cartIcon, backTop }
}
</script>
<style scoped>
div{
height: auto;
}
</style>
