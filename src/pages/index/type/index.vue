<template>
    <div class="pro-type">
        <header-search />
        <div class="box flex">
          <aside>
            <aisde-left />
          </aside>
          <main>
            <pro-items />
          </main>
        </div>
    </div>
</template>
<script>
import headerSearch from '@/components/index/headerSearch.vue'
import aisdeLeft from '@/components/index/type/asideLeft.vue'
import proItems from '@/components/index/type/proItems.vue'
export default {
  components: { headerSearch, aisdeLeft, proItems },
  name: 'proType'
}
</script>
<style scoped>
  ::-webkit-scrollbar{
    appearance: none;
    height: 0;
    width: 0;
    color: transparent;
  }
  .pro-type{
    background: #f3f4f5;
  }
  aside,main{
    height: calc(100% - 2.3rem);
    overflow-y: auto;
    overflow-x: hidden;
  }
  aside{
    width: 25%;
  }
  main{
    width: 75%;
    background: #fff;
  }
</style>
