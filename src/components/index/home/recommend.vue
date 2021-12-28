<template>
  <div>
    <loading v-if="no_data"></loading>
    <div class="recommend flex" v-else>
      <div class="bg-img">
        <img :src="imgUrl + bg" alt="">
      </div>
        <div class="wrap" v-for="(items, idx) of recommendPros" :key="idx">
          <router-link v-for="(val, i) of items" :to="{path:'detail', query: {id: val.link || ''}}" :key="val.name" :class="i === 0 ? 'front' : 'back' ">
              <div class="box">
                <div class="pro-img">
                  <img :src="imgUrl + val.img" :alt="val.name">
                </div>
                <div class="tit">
                  <div class="name">{{val.name}}</div>
                  <div class="price"><span>{{val.price_1}}</span></div>
                </div>
              </div>
              <div class="bg-img"></div>
          </router-link>
        </div>
    </div>
  </div>
</template>
<script>
import ajax from '@/api/ajax'
import { groupArr } from '@/api/util'
import loading from '@/components/index/loading.vue'
import { INDEX_RECOMMENDS, INDEX_BG } from '@/config/api'
export default {
  data () {
    return {
      recommendPros: [],
      bg: '',
      no_data: true
    }
  },
  components: { loading },
  methods: {
  },
  async mounted () {
    const recommends = await ajax('get', INDEX_RECOMMENDS)
    const bg = await ajax('get', INDEX_BG, { area_id: 1 })
    this.recommendPros = groupArr(recommends.data, 2)
    this.bg = bg.data[0].img
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
.recommend {
  margin-top: 5.5rem;
  padding: 5rem .5rem 0 .5rem;
  justify-content: space-between;
}
.recommend .bg-img{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.recommend .bg-img img{
  height: 100%;
}
.recommend .wrap{
  position: relative;
  width: 31%;
  border-radius: .8rem;
  font-size: 0;
  margin-bottom: .5rem;
}
.recommend .wrap>div{
  overflow: hidden;
  border-radius: .3rem;
}
.recommend .wrap .bg-img{
  position: absolute;
  background:url('~@/assets/images/pro_bg.png') no-repeat bottom center / 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.recommend .wrap .box{
  overflow: hidden;
}
.recommend .wrap .pro-img{
  position: absolute;
  width: 97%;
  margin-left: 1.5%;
  background: #fff;
}
.recommend .tit{
  margin-top: 4rem;
  background: #fff;
  position: relative;
  z-index: 2;
}
.recommend .tit .name{
  font-size: .6rem;
  text-align: center;
}
.recommend .tit .price{
  color: #fff;
  line-height: 2;
  text-align: right;
  background: url('~@/assets/images/arrow.png') no-repeat center / 90%;
}
.recommend .tit .price::before{
  content: '特惠价';
  font-size: .5rem;
  margin-left: .5rem;
  float: left;
  margin-top: .1rem;
}
.recommend .tit .price span{
  position: relative;
  font-size: .6rem;
  margin-right: .8rem;
  font-weight: bold;
  letter-spacing: .07rem;
}
.recommend .tit .price span::before{
  content: '¥';
}
.recommend .bottom-img{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.recommend .front{
  animation: front_animate 6200ms linear 0ms infinite;
}
.recommend .back{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: back_animate 6200ms linear 0ms infinite;
}
@keyframes front_animate {
  0.00% {
      transform: scaleX(0);
      opacity: 0
  }

  41.94% {
      transform: scaleX(0);
      opacity: 0
  }

  45.97% {
      transform: scaleX(0);
      opacity: 0
  }

  50.00% {
      transform: scaleX(1);
      opacity: 1
  }

  91.94% {
      transform: scaleX(1);
      opacity: 1
  }

  95.97% {
      transform: scaleX(0);
      opacity: 0
  }

  100.00% {
      transform: scaleX(0);
      opacity: 0
  }
}
@keyframes back_animate {
  0.00% {
      transform: scaleX(1);
      opacity: 1
  }

  41.94% {
      transform: scaleX(1);
      opacity: 1
  }

  45.97% {
      transform: scaleX(0);
      opacity: 0
  }

  50.00% {
      transform: scaleX(0);
      opacity: 0
  }

  91.94% {
      transform: scaleX(0);
      opacity: 0
  }

  95.97% {
      transform: scaleX(0);
      opacity: 0
  }

  100.00% {
      transform: scaleX(1);
      opacity: 1
  }
}
</style>
