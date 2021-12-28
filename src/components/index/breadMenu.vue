<template>
    <div class="bread-menu">
        <router-link to="/"><span class="back"></span></router-link>
        <router-link v-for="(item, idx) of navs" :key="idx" :to="item.to">{{item.name}}</router-link>
    </div>
</template>
<script>
export default {
  props: { navs: Array },
  methods: {
  },
  created () {
  }
}
</script>
<style scoped>
div{
  height: auto;
  line-height: 1.5;
  border-bottom: .01rem solid #f2f2f2;
  padding-bottom: .5rem;
}
.back{
  display: inline-block;
  width: .8rem;
  height: .8rem;
  background: url('~@/assets/images/home.png') no-repeat center / 100%;
  vertical-align: sub;
  margin-right: .5rem;
}
a{
  font-size: .6rem;
  position: relative;
}
a::after{
  content: '>';
  margin: 0 2%;
  font-weight: normal;
}
.bread-menu a:first-child::after, .bread-menu a:last-child::after{
  display: none;
}
</style>
