<template>
    <div class="selection">
        <div class="bg-img">
            <img src="@/assets/images/bg2.jpg" alt="">
        </div>
        <loading v-if="no_data" />
        <div class="box" v-else>
            <div class="types flex">
                <router-link  v-for="item in types"  :key="item.name" :to="{path:'type',query:{type_id:item.link || ''}}">
                    <img :src="imgUrl + item.img" :alt="item.name">
                </router-link>
            </div>
            <div class="pros flex">
                <router-link  v-for="(item, idx) of pros"  :key="idx" :to="{path:'detail',query:{id:item.link || ''}}">
                    <img :src="imgUrl + item.img" :alt="item.name">
                    <div class="name">{{item.name}}</div>
                    <div class="discount">{{item.price_2}}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import loading from '@/components/index/loading.vue'
import ajax from '@/api/ajax'
import { INDEX_SELECTION_TYPES, INDEX_SELECTION_ITEMS } from '@/config/api'
export default {
  data () {
    return {
      types: [],
      pros: [],
      no_data: true
    }
  },
  components: { loading },
  methods: {
  },
  async mounted () {
    const types = await ajax('get', INDEX_SELECTION_TYPES)
    const items = await ajax('get', INDEX_SELECTION_ITEMS)
    this.types = types.data
    this.pros = items.data
    this.no_data = false
  }
}
</script>
<style scoped>
div{
    height: auto;
}
img{
    width: 100%;
}
.bg-img{
    font-size: 0;
}
.box{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
}
.types{
    margin-top: 1.8rem;
    padding: 0 .8rem;
}
.types a{
    width: 30%;
    margin:0 1.5%;
    border-radius: 50%;
    overflow: hidden;
}
.pros{
    flex-wrap: wrap;
    text-align: center;
    padding: 0 3%;
    margin-top: 2.9%;
}
.pros a{
    width: 22%;
    margin: 0 1.5% 2.6% 1.5%;
}
.pros a img{
    width: 2.5rem;
    height: 2.5rem;
}
.pros .name{
    font-size: .5rem;
    margin-top: -0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pros .discount{
    font-size: .4rem;
    color: #fff;
    border-radius: .1rem;
    margin-top: 1%;
    position: relative;
}
.pros .discount::before{
    content: '¥';
}
.pros .discount::after{
    content: '元';
}
</style>
