<template>
    <div>
        <div class="logo">
            <img src="@/assets/images/logo2.png" alt="">
            <div class="err_tip" v-if="err_tip" >{{err_tip}}</div>
        </div>
        <div v-if="is_login" class="login">
            <login @alert="toogleAlert" @tip="toggleTip" />
        </div>
        <div v-else>
            <reg  @alert="toogleAlert" @tip="toggleTip"/>
        </div>
        <p class="tip" v-if="is_login">
            <span class="reg" @click="is_login=false, err_tip = ''">还没账号，去注册</span>
        </p>
        <p class="tip" v-else>
            <span class="login" @click="is_login=true, err_tip = ''">已有账号，去登录</span>
        </p>

        <div class="alert" v-if="alert_tip">{{alert_tip}}</div>
    </div>
</template>
<script>
import login from '@/components/index/regLogin/login.vue'
import reg from '@/components/index/regLogin/reg.vue'
export default {
  data () {
    return {
      is_login: true,
      alert_tip: '',
      err_tip: ''
    }
  },
  components: { login, reg },
  methods: {
    toogleAlert (msg) {
      this.alert_tip = msg
      setTimeout(() => {
        this.alert_tip = ''
      }, 1000)
    },
    toggleTip (msg) {
      this.err_tip = msg
    }
  }
}
</script>
<style scoped>
div{
    height: auto;
}
.logo{
    height: 8rem;
    background: url('~@/assets/images/bg4.jpg') repeat center;
    position: relative;
}
.logo img{
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.err_tip{
    color: #de3d96;
    font-size: .6rem;
    position: absolute;
    bottom: 0;
    left: 3%;
    text-align: left;
}
.err_tip::before{
    content: '!';
    width: .8rem;
    height: .8rem;
    background: #de3d96;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    margin-right: 0.1rem;
    color: #fff;
    text-align: center;
}
.tip{
    text-align: center;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    border-top: 1px solid #ccc;
}
.tip>*{
    display: inline-block;
    width: 42%;
    margin: 0 2%;
    font-size: .7rem;
    color: #e4007f;
    border: 1px solid #e4007f;
    border-radius: .8rem;
    line-height: 2;
}
.alert{
    font-size: .8rem;
    width: 80%;
    text-align: center;
    border-radius: .1rem;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    position: absolute;
    line-height: 1.5rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
