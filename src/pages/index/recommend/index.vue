<template>
<div>
  <div class="top">
    <header-search />
    <main>
      后续上新，先看<router-link to="discount">3折疯抢</router-link>
    </main>
  </div>
</div>
</template>
<script>
import headerSearch from '@/components/index/headerSearch.vue'
export default {
  data () {
    return {}
  },
  components: { headerSearch }
}
</script>
<style scoped>
div{
  height: auto;
}
.top{
  position: absolute;
  width: 100%;
}
</style>
