<template>
    <div>
        <top />
        <list />
        <button :class="is_disabled ? 'sub clicked' : 'sub'" @click="logout()" :disabled="is_disabled" >{{is_disabled ? '退出中' : '退出登录'}}</button>
    </div>
</template>
<script>
import top from '@/components/index/center/top.vue'
import list from '@/components/index/center/list.vue'
export default {
  data () {
    return {
      is_disabled: false
    }
  },
  components: { top, list },
  methods: {
    logout () {
      this.$store.commit('user/delToken')
      window.sessionStorage.removeItem('username')
      this.$router.replace('/login')
    }
  }
}
</script>
<style scoped>
div{
    height: auto;
}
.sub{
  width: 90%;
  font-size: .7rem;
  line-height: 2.5em;
  color: #fff;
  background: #d34ba8;
  margin: 1rem auto;
  text-align: center;
  margin-left: 5%;
  }
  .sub.clicked{
      opacity: .5;
  }
</style>
