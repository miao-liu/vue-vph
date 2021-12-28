<template>
    <div class="btn" @click="func">
        {{msg}}
    </div>
</template>
<script>
export default {
  props: ['msg', 'ev'],
  methods: {
    func () {
      switch (this.ev) {
        case 'addaddr':
          this.$router.push('/addaddr')
          break
      }
    },
    saveAddr () {
      console.log('save')
    }
  }
}
</script>
<style scoped>
div{
    width: 90%;
    font-size: .7rem;
    line-height: 2.5em;
    color: #fff;
    background: #d34ba8;
    margin: 1rem auto;
    text-align: center;
}
</style>
