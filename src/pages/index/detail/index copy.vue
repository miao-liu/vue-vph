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
            <router-link to="/center">
                <i class="cart"></i>
                购物车
            </router-link>
            <span @click="addCart">
                加入购物车
            </span>
            <i class="badge">{{count}}件</i>
        </footer>
    </div>
</div>
</template>
<script>
import loading from '@/components/index/loading.vue'
import ajax from '@/api/ajax'
import { DETAIL } from '@/config/api'
export default {
  data () {
    return {
      content: null,
      no_data: true,
      count: 1
    }
  },
  components: { loading },
  methods: {
    async getData () {
      return await ajax('get', DETAIL, { prodocut_id: this.$route.query.id }).then(res => res.data)
    },
    addCart () {
      if (!this.$store.state.user.userToken) {
        this.$router.push('/login')
      } else {
        document.querySelector('.badge').classList.add('run')
      }
    }
  },
  async mounted () {
    this.content = await this.getData()
    this.no_data = false
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
footer span{
    background: #f657a1;
    color: #fff;
    border-radius: .2rem;
    padding: .6rem 1rem;
}
footer .badge{
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
}
footer .badge.run{
  animation: box-run .5s cubic-bezier(.05, .51, .31, .82);
  animation-fill-mode: forwards;
}
@keyframes box-run {
  0%{
      right: 2%;
      bottom: 2%;
  }
  50% {
      right: 35%;
       bottom: 10%;
  }
  100% {
      right: 50%;
      bottom: 6%;
  }
}
</style>
