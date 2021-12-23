<template>
<div>
    <loading v-if="no_data" />
    <div v-else>
        <main>
            <div class="pro-img">
                <img :src="imgUrl + content.pic_imgs" alt="content.name">
            </div>
            <p class="price">
             <span class="name">【{{content.name}}】</span><span class="price1">{{content.price1}}</span><del class="price2">{{content.price2}}</del>
            </p>
        </main>
        <footer class="flex">
            <router-link to="/center">
                <i class="user"></i>
                我的
            </router-link>
            <router-link to="/cart">
                <i class="badge"></i>
                <i class="cart"></i>
                购物车
            </router-link>
            <button @click="addCart(content.id)" :disabled="is_disabled" :class="is_disabled ? 'disabled' : ''">
                加入购物车
            </button>
            <i class="count">已加入</i>
        </footer>
    </div>
</div>
</template>
<script>
import loading from '@/components/index/loading.vue'
import ajax from '@/api/ajax'
import parabola from '@/api/parabola.js'
import { DETAIL } from '@/config/api'
export default {
  data () {
    return {
      content: null,
      no_data: true,
      count: 1,
      start: null,
      end: null,
      parabola: null,
      is_disabled: false
    }
  },
  components: { loading },
  methods: {
    async getData () {
      return await ajax('get', DETAIL, { prodocut_id: this.$route.query.id }).then(res => res.data)
    },
    addCart (id) {
      if (!this.isLogin()) {
        this.$router.push('/login')
        return
      }
      this.parabola.init()
      this.is_disabled = true
      this.$store.commit('cart/pushProductToCart', id)
    },
    async init () {
      this.content = await this.getData()
      this.no_data = false
      await this.$nextTick()
      this.start = document.querySelector('footer .count')
      this.end = document.querySelector('footer a .badge')
      this.parabola = parabola(this.start, this.end, { curvature: 0.005 })
      if (this.$store.getters['cart/checkouProduct'](+this.$route.query.id)) {
        this.is_disabled = true
        this.parabola.init()
      }
    },
    isLogin () {
      return !!this.$store.state.user.userToken
    }
  },
  async mounted () {
    this.init()
  }
}
</script>
<style scoped>
div{
    height: auto;
}
.pro-img{
    text-align: center;
}
.price{
  padding: 3%;
  position: relative;
  background: -webkit-linear-gradient(right,#f657a1,#f83b6b);
  background: linear-gradient(270deg,#f657a1,#f83b6b);
  color: #fff;
}
.price::before{
  content: '特卖价';
  display: inline-block;
  font-size: .45rem;
  padding: .1rem;
  border-radius: .1rem;
  vertical-align: middle;
}
.price .price1{
  position: relative;
  font-weight: bold;
  font-size: .7rem;
  margin-left: .2rem;
  letter-spacing: .05rem;
}
.price .price1::before{
  content: '¥';
  margin-right: .2rem;
}
.price .price2{
  position: relative;
  font-size: .6rem;
}
.price .price2::before{
  content: '¥';
  margin-left: .2rem;
}
.name{
    font-size: .9rem;
}
footer{
    text-align: center;
    font-size: .6rem;
    padding: 2%;
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}
footer i{
    width: 1rem;
    height: 1rem;
    display: block;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
}
footer i.user{
    background-image: url('~@/assets/images/user.png');
}
footer i.cart{
    background-image: url('~@/assets/images/cart.png');
}
footer button{
    background: #f657a1;
    color: #fff;
    border-radius: .2rem;
    padding: .6rem 1rem;
    position: relative;
    z-index: 1;
}
footer button.disabled{
  opacity: .5;
}
footer a{
    position: relative;
}
footer a .badge{
    position: absolute;
    width: 1rem;
    height: 1rem;
    right: -.6rem;
    top: -.5rem;
}
footer .count{
    position: fixed;
    height: 1.5rem;
    width: 1.5rem;
    background: #f657a1;
    border-radius: 50%;
    color: #fff;
    line-height: 1.5rem;
    text-align: center;
    bottom: 2%;
    right: 2%;
    z-index: 0;
}
</style>
