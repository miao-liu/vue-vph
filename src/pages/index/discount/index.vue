<template>
  <div>
    <div class="top">
      <header-search />
    </div>
    <columns />
    <loading v-if="no_data" />
  </div>
</template>
<script>
import headerSearch from '@/components/index/headerSearch.vue'
import columns from '@/components/index/discount/columns.vue'
import loading from '@/components/index/loading.vue'
export default {
  data () {
    return {
      no_data: false
    }
  },
  components: { headerSearch, columns, loading }
}
</script>
<style scoped>
  div {
    height: auto;
  }

  .top {
    position: absolute;
    width: 100%;
    background: #d52d29;
    top: 0;
    z-index: 100;
  }
  .top  /deep/ .search-wrap{
    background: #fff;
  }
 </style>
