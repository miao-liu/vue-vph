<template>
    <nav>
        <span class="cur">
          <router-link to="/">推荐</router-link>
        </span>
        <span v-for="(item, idx) of navArr" :key="idx">
          <router-link :to="{path:'type', query: {type_id: item.type_id}}">{{item.name}}</router-link>
        </span>
      </nav>
</template>
<script>
import ajax from '@/api/ajax'
import { INDEX_NAVS } from '@/config/api'
export default {
  name: 'columns',
  data () {
    return {
      navArr: []
    }
  },
  async mounted () {
    const results = await ajax('get', INDEX_NAVS)
    this.navArr = results.data
  }
}
</script>
<style scoped>
::-webkit-scrollbar{
  appearance: none;
  height: 0;
  width: 0;
  color: transparent;
}
nav{
  padding: 0 3%;
  font-size: .6rem;
  color: #666;
  position: fixed;
  left: 0;
  top: 3.8rem;
  z-index: 100;
  width: 100%;
  background: #fff;
  padding-bottom: .5rem;
  white-space: nowrap;
  overflow-x: scroll;
}
nav span{
  margin: 0 3%;
  padding-bottom: 1%;
  display: inline-block;
}
nav span.cur{
  border-bottom: 0.15rem solid #d34ba8;
  color: #d34ba8;
}
</style>
