<template>
<div>
    <input type="text" placeholder="搜索订单" v-model="content"><i class="iconfont icon-search" @click="search()"></i>
</div>
</template>
<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    search () {
      console.log(this.content)
    }
  }
}
</script>
<style scoped>
div{
    height: auto;
    width: 90%;
    margin: 2% auto;
}
i{
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
}
input{
    border: none;
    background: #eee;
    border-radius: .5rem;
    text-align: center;
    font-family: "iconfont" !important;
    width: 100%;
    line-height: 1.5rem;
    height: 1.5rem;
    text-indent:.5rem;
    text-align: left;
}
</style>
