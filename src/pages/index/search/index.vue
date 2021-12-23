<template>
  <div class="search">
    <div class="top flex">
      <span class="back iconfont icon-arrow-left" @click="goback"></span>
      <input type="text" @input="is_show='ture'" :placeholder="currentHot" v-model="hotInput">
      <span class="close" v-show='is_show&&hotInput.length' @click="hotClear">X</span>
      <span class="sub">搜索</span>
    </div>
    <dl class="recently" v-if="recentlyHots.length">
      <dt>最近搜索 <span class="clearRecently" @click="clearRecently">清空</span></dt>
      <dd v-for="item of recentlyHots" :key="item.name">
        <router-link :to="{path:'results', query:{type_id:item.type_id}}">{{item.name}}</router-link>
      </dd>
    </dl>
    <dl class="all">
      <dt>热门搜索</dt>
      <dd v-for="item of hots" :key="item.name">
        <router-link @click.native = "addRecently(item)" :to="{path:'results', query:{type_id:item.type_id}}">{{item.name}}</router-link>
      </dd>
    </dl>
    <cart-icon />
  </div>
</template>
<script>
import cartIcon from '@/components/index/cartIcon.vue'
export default {
  name: 'search',
  data () {
    return {
      hots: [],
      recentlyHots: [],
      currentHot: '',
      hotInput: '',
      is_show: false
    }
  },
  components: {
    cartIcon
  },
  methods: {
    getCurrentHot (data, idx) {
      return data[idx].name
    },
    hotClear () {
      this.hotInput = ''
    },
    addRecently (item) {
      this.$store.commit('types/addRecently', item)
    },
    clearRecently () {
      this.recentlyHots = []
      this.$store.commit('types/clearRecently')
    },
    goback () {
      window.history.go(-1)
    },
    getRecentlyHots () {
      window.addEventListener('load', () => {
        if (window.sessionStorage.getItem('recentlyHots')) {
          this.$store.commit('types/setRecentlyHots', JSON.parse(window.sessionStorage.getItem('recentlyHots')))
          window.sessionStorage.removeItem('recentlyHots')
        }
      })
      window.addEventListener('beforeunload', () => {
        window.sessionStorage.setItem('recentlyHots', JSON.stringify(this.recentlyHots))
      })
    }
  },
  created () {
    this.getRecentlyHots()
  },
  async mounted () {
    await this.$store.dispatch('types/getData')
    this.hots = this.$store.state.types.hots
    this.recentlyHots = this.$store.state.recentlyHots
    this.currentHot = this.hots[this.$route.query.idx].name
    this.recentlyHots = this.$store.state.types.recentlyHots
  }
}
</script>
<style scoped>
  div {
    height: auto;
  }
  .search{
    padding:0 2%;
    height: 100%;
  }
  dt {
    font-size: .7rem;
  }
  .top {
    align-items: center;
    justify-content: space-between;
    padding: 2% 0;
    border-bottom: 1px solid #eee;
    margin-bottom: .5rem;
  }
  .top .close {
    position: absolute;
    font-family: fantasy, system-ui;
    left: 75%;
    font-size: .6rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    line-height: 1rem;
  }
  .top .back {
    font-size: 1.5rem;
    color: #999;
  }
  .top input {
    width: 75%;
    font-size: .6rem;
    padding: 0.4rem 0;
    background: #f3f4f5;
    border-radius: 1.5rem;
    text-indent: 1rem;
    margin-right: 2%;
  }
  .top .sub {
    font-size: .7rem;
    color: #595c63;
    margin-right: 1%;
  }
  dl{
    padding: 0 3%;
  }
  dt{
    font-size: .6rem;
    margin-bottom: .5rem;
  }
  dd{
    font-size: .5rem;
    background: #f3f4f5;
    display: inline-block;
    padding:.3rem .3rem;
    border-radius: .4rem;
    margin-right: 1rem;
    margin-bottom: .4rem;
  }
  .recently{
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
    padding-bottom: .7rem;
  }
  .clearRecently{
    float: right;
    font-size: .5;
    color: #585c64;
  }
</style>
