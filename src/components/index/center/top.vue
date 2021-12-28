<template>
    <div class="center">
        <bread-menu :navs="navs" />
        <div class="img">
            <img src="@/assets/images/user-1.png" alt="">
            <span>唯品会员</span>
        </div>
    </div>
</template>
<script>
import breadMenu from '@/components/index/breadMenu.vue'
export default {
  name: 'top',
  components: { breadMenu },
  data () {
    return {
      navs: [{ name: '个人中心', to: '/center' }]
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.center /deep/ .bread-menu{
  margin-left: 2%;
}
.img{
    background: url('~@/assets/images/center-bg.png') no-repeat center / 100%;
    text-align: center;
    height: 10rem;
}
.img img{
  width: 4rem;
  height: 4rem;
  margin-top: 2rem;
}
.img span{
  display: block;
  font-size: .6rem;
}
</style>
