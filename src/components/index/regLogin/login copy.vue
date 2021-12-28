<template>
  <form>
      <p>
          <label for="uname">登录名</label>
          <input type="text" id="uname" name="uname" v-model="uname"  placeholder="请输入用户名" @blur="hideIcon()" @focus="showIcon(uname)">
          <span class="tool">
              <i class="clear clear_name" v-show="uname" @click="uname=''">x</i>
          </span>
      </p>
      <p>
          <label for="upass">密码</label>
          <input :type="show_pass ? 'text' : 'password'" name="upass" id="upass" v-model="upass"  placeholder="请输入密码" @blur="hideIcon()" @focus="showIcon(upass)">
          <span class="tool">
              <i class="clear clear_pass" v-show="upass" @click="upass=''">x</i>
              <i :class="show_pass ? 'eye show' : 'eye hide'" @click="show_pass=!show_pass"></i>
          </span>
      </p>
          <button @click="subForm" :disabled="!uname || !upass" :class="uname && upass ? 'sub abled' : 'sub'">登录</button>
      <div class="iterm">
          <i :class="is_agree ? 'choose agree' : 'choose'" @click="is_agree=!is_agree" ></i>我已阅读并同意<a href="">相关条款</a>
      </div>
  </form>
</template>
<script>
import { USER_LOGIN } from '@/config/api.js'
import ajax from '@/api/ajax'
export default {
  name: 'login',
  data () {
    return {
      uname: '',
      upass: '',
      show_pass: false,
      is_agree: false,
      is_hide_uname: false,
      is_hide_upass: false,
      sub_url: ''
    }
  },
  methods: {
    subForm (event) {
      event = event || window.event
      event.preventDefault()
      if (!this.checkFrom()) {
        return
      }
      ajax('post', this.sub_url, { username: this.uname, userpass: this.upass }).then(res => {
        if (res.code === 1) {
          this.$emit('tip', '用户不存在')
        } else if (res.code === 5) {
          this.$emit('tip', '密码错误')
        } else {
          this.$store.commit('user/userLogin', true)
          this.$router.replace('/center')
        }
      })
    },
    checkFrom () {
      if (!this.is_agree) {
        this.$emit('alert', '请阅读并勾选相关协议')
        return false
      }
      return true
    },
    hideIcon (event) {
      event = event || window.event
      const timer = setTimeout(() => {
        event.target.nextElementSibling.querySelector('.clear').style.display = 'none'
        clearTimeout(timer)
      }, 800)
    },
    showIcon (val, event) {
      if (!val.trim()) return
      event = event || window.event
      event.target.nextElementSibling.querySelector('.clear').style.display = 'inline-block'
    }
  },
  mounted () {
    this.sub_url = USER_LOGIN
  }
}
</script>
<style scoped>
input{
  background-color: rgba(0, 0, 0, 0) !important;
}
input:-internal-autofill-selected {
  background-color: rgba(0, 0, 0, 0) !important;
}
a{
  color: #157efa;
}
form p {
  padding: 0 3%;
  border-bottom: 1px solid #ccc;
  line-height: 2;
  position: relative
}
form p label{
  font-size: .8rem;
  width: 18%;
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
}
form p input{
  width: 80%;
  margin-left: 2%;
}
form p .tool{
  position: absolute;
  right: 2%;
  text-align: center;
  line-height: 1rem;
  top: calc(50% - 0.5rem);
}
form p .tool i{
  display: inline-block;
  width: 1rem;
  height: 1rem;
}
form p .tool .clear{
  font-family: fantasy;
  color: #fff;
  border-radius: 50%;
  background: #ccc;
  font-size: .7rem;
}
form p .tool .eye{
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-left: .3rem;
  vertical-align: middle;
}
form p .tool .eye.hide{
  background-image: url('~@/assets/images/hide_eye.png');
}
form p .tool .eye.show{
  background-image: url('~@/assets/images/show_eye.png');
}
form .sub{
  width: 90%;
  border-radius: .8rem;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  line-height: 2;
  display: block;
  background: #caccd2;
  margin: 1rem auto;
}
form .sub.abled{
  background: #de3d96;
}
form .iterm{
  font-size: .7rem;
  padding: 0 3%;
}
form .choose{
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-position-x: center;
  background-repeat: no-repeat;
  background-image: url('~@/assets/images/choose.png');
  vertical-align: middle;
  background-size: cover;
  margin-right: .2rem;
}
form .choose.disagree{
  background-position-y: top;
}
form .choose.agree{
  background-position-y: bottom;
}
</style>
