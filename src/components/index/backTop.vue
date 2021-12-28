<template>
    <div class="back-top" v-show="is_show">
        <span class="iconfont icon-cc-arrow-up" @click="backTop"></span>
    </div>
</template>
<script>
export default {
  data () {
    return {
      is_show: false,
      timer: null,
      idx: 1
    }
  },
  methods: {
    isShow () {
      if (window.pageYOffset >= 100) {
        this.is_show = true
      } else {
        this.is_show = false
      }
    },
    backTop () {
      this.timer = setTimeout(() => {
        this.idx++
        if (window.pageYOffset > 0) {
          document.documentElement.scrollTop = document.documentElement.scrollTop - this.idx * 10
          this.backTop()
        } else {
          clearTimeout(this.timer)
          this.timer = null
        }
      }, 30)
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.isShow()
    })
  }
}
</script>
<style scoped>
.back-top{
    width: 2rem;
    height: 2rem;
    color: #fff;
    background: #252830;
    border-radius: 50%;
    text-align: center;
    line-height: 2rem;
    font-weight: bold;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
}
</style>
