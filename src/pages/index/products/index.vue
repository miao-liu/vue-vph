<template>
    <div class="products-list">
        <loading v-if="no_data" />
        <ul v-else>
            <li v-for="(item, idx) of data" :key="idx">
              <router-link :to="{path: 'detail', query: {id: item.id}}">
                <img src="@/assets/images/default_pro_src.jpg" alt="item.name" :data-lazy="imgUrl + item.pic_imgs">
                <p class="price">
                  <span class="price1">{{item.price1}}</span><del class="price2">{{item.price2}}</del>
                </p>
                <p class="name">{{item.name}}</p>
              </router-link>
            </li>
        </ul>
        <bottom />
        <cart-icon />
        <back-top />
    </div>
</template>
<script>
import cartIcon from '@/components/index/cartIcon.vue'
import backTop from '@/components/index/backTop.vue'
import bottom from '@/components/index/bottom.vue'
import loading from '@/components/index/loading.vue'
import ajax from '@/api/ajax'
import { lzimg, throttling } from '@/api/util'
import { PRODUCTS_ITEM } from '@/config/api'
export default {
  data () {
    return {
      no_data: true,
      data: []
    }
  },
  methods: {
    async getData () {
      const results = await ajax('get', PRODUCTS_ITEM, { type_id: this.$route.query.type_id })
      this.data = results.data
      this.no_data = false
    }
  },
  components: { loading, backTop, cartIcon, bottom },
  async mounted () {
    await this.getData()
    await this.$nextTick()
    throttling(lzimg, document.querySelectorAll('img'), 'default_pro_src', 60)()
    window.onscroll = throttling(lzimg, document.querySelectorAll('img'), 'default_pro_src')
  }
}
</script>
<style scoped>
.products-list{
  background: #f3f4f5;
}
div{
  height: auto;
}
img{
  width: 100%;
}
ul li{
  display: inline-block;
  padding:1% 2%;
  width: 50%;
}
ul li a {
  display: block;
  background: #fff;
}
ul li img{
  border-radius: .2rem;
  height: 6rem;
}
ul li .price{
  position: relative;
  background: -webkit-linear-gradient(right,#f657a1,#f83b6b);
  background: linear-gradient(270deg,#f657a1,#f83b6b);
  color: #fff;
}
ul li .price::before{
  content: '特卖价';
  display: inline-block;
  font-size: .45rem;
  padding: .1rem;
  border-radius: .1rem;
  vertical-align: middle;
}
ul li .price .price1{
  position: relative;
  font-weight: bold;
  font-size: .7rem;
  margin-left: .2rem;
  letter-spacing: .05rem;
}
ul li .price .price1::before{
  content: '¥';
  margin-right: .2rem;
}
ul li .price .price2{
  position: relative;
  font-size: .6rem;
}
ul li .price .price2::before{
  content: '¥';
  margin-left: .2rem;
}
ul li .name{
  color: #585c64;
  font-size: .6rem;
  padding: 2% 2%;
}
</style>
