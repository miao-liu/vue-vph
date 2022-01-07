<template>
  <div>
    <div v-if="!list" class="tip">
      空空如也，去<router-link to="/">逛逛吧～</router-link>
    </div>
    <div v-else>
    <ul>
      <li class="flex" v-for="(item, idx) of list" :key="idx">
        <div class="pro-img">
          <img :src="imgUrl + item.img" :alt="item.title">
        </div>
        <div class="pro-info">
          <p class="title">{{item.title}}</p>
          <p class="price">{{item.price}}</p>
          <p class="count">
            <button id="decrement" @click="decrement(item.id)">-</button>
            <input type="number" step="1" min="0" v-model="item.quantity">
            <button id="add" @click="increment(item.id)">+</button>
          </p>
        </div>
      </li>
    </ul>
    <div class="sub">立即支付<span>¥{{total}}</span></div>
    </div>
  </div>
  </template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      list: null,
      total: ''
    }
  },
  computed: {
    ...mapGetters('cart', {
      products: 'getProducts',
      cartTotalPrice: 'cartTotalPrice'
    })
  },
  methods: {
    ...mapMutations('cart', {
      increment: 'incrementItemQuantity',
      decrement: 'decrementItemQuantity'
    })
  },
  async mounted () {
    await this.$store.dispatch('cart/setItemsId')
    await this.$store.dispatch('products/setCartProducts', this.$store.state.cart.itemsId)
    this.list = this.$store.state.cart.cartProducts
    this.total = this.$store.getters['cart/cartTotalPrice']
  },
  watch: {
    products: function (val) {
      if (val.length) {
        this.list = val
      }
    },
    cartTotalPrice: function (val) {
      this.total = val
    }
  }
}
</script>
<style scoped>
  div{
    height: auto;
  }
  .tip{
    font-size: .7rem;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 2rem);
  }
  .tip a{
    color: #d34ba8;
  }
  li{
    padding: 2% 0;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
  }
  .pro-img{
    width: 30%;
    margin-right: 2%;
  }
  .pro-img img{
    width: 100%;
  }
  .pro-info .title{
    font-size: .7rem;
    color: #5f6368;
  }
  .pro-info .price{
    position: relative;
    font-size: .6rem;
    color: #d34ba8;
  }
  .pro-info .price::before{
    content: '¥';
  }
  .pro-info .count button{
      cursor: pointer;
      border: none;
      background:#f3f6f6;
      width:1.2rem;
      height: 1.2rem;
  }
  .pro-info .count input{
     border: none;
      background: #f3f6f6;
      height: 25px;
      width: 35px;
      text-align: center;
      appearance: none;
      -webkit-appearance: none;
  }
  .sub{
    font-size: .6rem;
    display: block;
    width: 50%;
    padding:1% 0;
    background: #f83b6b;
    margin: 2% auto;
    text-align: center;
    color: #fff;
    border-radius: .4rem;
  }
  .sub span{
    margin-left: .2rem;
    font-size: .7rem;
  }
</style>
