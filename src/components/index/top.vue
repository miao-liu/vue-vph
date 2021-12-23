<template>
<header>
  <div class="logo flex">
    <div class="l">
        <img src="@/assets/images/logo.png" alt="">
        <span>品牌特卖·100%正品</span>
    </div>
    <div class="r">
        <router-link v-if="!is_login" to="login">登录</router-link>
        <router-link  v-else to="center" class="center"></router-link>
        <router-link to="type" class="type">
            <span class="iconfont icon-classify"></span>
        </router-link>
    </div>
  </div>

  <div class="search">
    <router-link @click.native = "hotSearch" :to="{path: 'search', query: {idx: idx}}">
        <span v-if="no_data">想买什么就买什么</span>
        <span v-else class="hots"></span>
    </router-link>
  </div>
</header>
</template>
<script>
export default {
  name: 'top',
  data () {
    return {
      hots: [],
      no_data: true,
      idx: 1,
      timer: null,
      is_login: false
    }
  },
  methods: {
    hotsScroll (data) {
      const wrap = document.querySelector('.hots')
      const len = data.length - 1
      this.timer = setInterval(() => {
        this.idx = this.idx >= len ? 0 : this.idx < 0 ? len - 1 : this.idx + 1
        wrap.innerText = data[this.idx].name
      }, 1500)
    },
    hotsRender (data) {
      document.querySelector('.hots').innerText = data.name
    },
    hotSearch () {
      clearInterval(this.timer)
    }
  },
  created () {
    this.is_login = !!this.$store.state.user.userToken
  },
  async mounted () {
    await this.$store.dispatch('types/getData')
    this.hots = this.$store.state.types.hots
    this.no_data = false
    this.$nextTick(() => {
      this.hotsRender(...(this.hots.slice(0, 1)))
      this.hotsScroll(this.hots)
    })
  }
}
</script>
<style scoped>
header{
  padding:0 3%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
}
.logo{
  align-items: center;
  justify-content: space-between;
  padding:2%;
}
.logo .l{
  width: 70%;
}
.logo .l img{
  width: 30%;
  vertical-align: middle;
}
.logo .l span{
  font-size: .6rem;
  color: #98989f;
  border-left: 1px solid #ccc;
  margin-left: .2rem;
  padding-left: .2rem;
}
.logo .r{
  font-size: .6rem;
}
.logo .r .center{
  width: 1rem;
  height: 1rem;
  display: inline-block;
  vertical-align: bottom;
  background: url('~@/assets/images/user.png') no-repeat center / 100%;
}
.logo .r .type{
  vertical-align: middle;
  margin-left: .5rem;
}
.search a{
    display: block;
    width: 98%;
    margin: .5rem auto;
    font-size: .6rem;
    background: #f3f4f5;
    border-radius: 2rem;
    line-height: 2;
    border: 1px solid #ccc;
}
.search a span{
    color: #98989f;
    margin-left: 5%;
}
</style>
