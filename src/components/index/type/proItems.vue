<template>
    <div class="pro-items">
        <div v-if="items">
            <div class="top-img" v-if="items.top_img">
                <img :src="imgUrl + items.top_img">
            </div>
            <dl v-for="(item, idx) of items.items" :key="idx">
                <dt>{{item.name}}</dt>
                <dd v-for="(v, k) of item.children" :key="idx + '-' + k">
                  <router-link :to="{path: 'products', query: {type_id: v.id}}">
                    <figure>
                      <img :src="v.thumb" :alt="v.name">
                      <figcaption>{{v.name}}</figcaption>
                    </figure>
                  </router-link>
                </dd>
            </dl>
        </div>
        <loading v-else />
    </div>
</template>
<script>
import ajax from '@/api/ajax'
import loading from '../loading'
import { TYPES_ITEMS } from '@/config/api'
export default {
  name: 'proItems',
  data () {
    return {
      items: []
    }
  },
  components: { loading },
  methods: {
    getData (idx) {
      ajax('get', TYPES_ITEMS, { type_id: idx }).then(res => {
        this.items = res.data
      }, err => {
        console.log(err)
      })
    }
  },
  mounted () {
    if (!('type_id' in this.$route.query)) {
      this.getData(1)
    } else {
      this.getData(this.$route.query.type_id)
    }
  },
  watch: {
    $route () {
      this.getData(this.$route.query.type_id)
    }
  }
}
</script>
<style scoped>
.pro-items{
    padding:.3rem .2rem;
}
.pro-items .top-img{
  height: auto;
  margin-bottom: .5rem;
}
.pro-items img{
  width: 100%;
}
.pro-items dl::after{
    content: '';
    display: block;
    clear: both;
}
.pro-items dl{
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}
.pro-items dl:last-of-type{
    border-bottom: none;
    margin-bottom: 0;
}
.pro-items dt{
    font-size: .7rem;
    line-height: 2;
}
.pro-items dd{
    width: 30%;
    float: left;
    margin:.3rem 5% .3rem 0;
    text-align: center;
}
.pro-items dd:nth-of-type(3n){
    margin-right: 0;
}
.pro-items dd img{
    width: 100%;
}
.pro-items dd figcaption{
    font-size: .5rem;
}
</style>
