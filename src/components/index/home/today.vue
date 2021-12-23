<template>
    <div class="today">
        <loading v-if="no_data" />
        <div class="box" v-else>
            <div class="hot flex">
                <router-link class="item" v-for="item of today" :key="item.img" :to="{path:'detail',query:{id:item.link}}" >
                    <img :src="imgUrl + item.img" alt="今日特卖">
                    <img :src="imgUrl + item.logo" alt="品牌logo" class="logo">
                    <p class="price">{{item.price_1}}</p>
                    <p class="discount">惊爆价{{item.price_2}}</p>
                </router-link>
            </div>
            <div class="types">
                <router-link v-for="(item, idx) of types" :key="idx"  :to="{path:'type',query:{type_id:item.link || ''}}" class="lazy-item">
                    <img src="@/assets/images/default_pro_src.jpg" alt="item.name" :data-lazy="imgUrl + item.img">
                    <div class="tit">
                        <div class="name">{{item.name}}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import ajax from '@/api/ajax'
import { lzimg, throttling } from '@/api/util'
import { INDEX_BG, INDEX_TODAY_ITEMS, INDEX_TODAY_TYPES } from '@/config/api'
import loading from '@/components/index/loading'
export default {
  data () {
    return {
      today: [],
      types: [],
      img: '',
      no_data: true
    }
  },
  components: { loading },
  methods: {
    async getData () {
      const bg = await ajax('get', INDEX_BG, { area_id: 4 })
      const data1 = await ajax('get', INDEX_TODAY_ITEMS)
      const data2 = await ajax('get', INDEX_TODAY_TYPES)
      this.img = bg.data[0].img
      this.today = data1.data
      this.types = data2.data
      this.no_data = false
    }
  },
  async mounted () {
    await this.getData()
    await this.$nextTick()
    document.querySelector('.today .box').style.backgroundImage = 'url(' + this.imgUrl + this.img + ')'
    window.onscroll = throttling(lzimg, document.querySelectorAll('.types img'), 'default_pro_src')
  }
}
</script>›
<style scoped>
div{
    height: auto;
}
img{width: 100%;}
.today .box{
    padding-top: 2rem;
    background-color: #f3f4f5;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
}
.hot{
    margin: 3%;
    padding: 0 2%;
    justify-content: space-between;
    background: #fff;
    padding-bottom: 2%;
    border-radius: .4rem;
}
.hot .item{
    width: 22%;
    text-align: center;
}
.hot .item .logo{
    width: 80%;
    height: .8rem;
}
.hot .item .price{
    position: relative;
    font-size: .6rem;
    color: #222;
}
.hot .item .price::before{
    content: '¥';
}
.hot .item .discount{
    font-size: .5rem;
    color: #fff;
    border-radius: .8rem;
    background: #e7395b;
    line-height: 1.5;
}
.types{
    padding: 0 3%;
}
.types a{
    display: block;
    border-radius: .4rem;
    overflow: hidden;
    background: #fff;
    margin-bottom: 1rem;
}
.types .tit{
    padding:0 3%;
    line-height: 2;
}
.types .tit .name{
    font-size: .6rem;
    color: #222;
    font-weight: bold;
}
.types a .discount{
    font-size: .5rem;
}
.types a .discount i{
    color: #de3d96;
}
</style>
