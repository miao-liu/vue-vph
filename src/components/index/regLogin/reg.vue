<template>
    <form>
        <p>
            <label for="uname">账户名</label>
            <input type="text" id="uname" name="uname" v-model="uname" placeholder="数字 + 英文字母  4-8位即可" @blur="hideIcon()" @focus="showIcon(uname)">
            <span class="tool">
                <i class="clear clear_name" v-show="uname" @click="uname=''">x</i>
            </span>
        </p>
        <p>
            <label for="umail">邮箱</label>
            <input type="email" id="uemail" name="uemail" v-model="uemail"  placeholder="请输入邮箱" @blur="hideIcon()" @focus="showIcon(uemail)">
            <span class="tool">
                <i class="clear clear_email" v-show="uemail" @click="uemail=''">x</i>
            </span>
        </p>
        <p>
            <label for="upass">密码</label>
            <input :type="show_pass ? 'text' : 'password'" name="upass" id="upass" v-model="upass" placeholder="请输入密码6-10位" @blur="hideIcon()" @focus="showIcon(upass)">
            <span class="tool">
                <i class="clear clear_pass" v-show="upass" @click="upass=''">x</i>
                <i :class="show_pass ? 'eye show' : 'eye hide'" @click="show_pass=!show_pass"></i>
            </span>
        </p>
            <button @click="subForm" :disabled="is_disabled" :class="is_disabled ? 'sub' : 'sub abled'">注册</button>
        <div class="iterm">
            <i :class="is_agree ? 'choose agree' : 'choose'" @click="is_agree=!is_agree" ></i>我已阅读并同意<a href="">相关条款</a>
        </div>
    </form>
</template>
<script>
import { USER_REGISTER } from '@/config/api.js'
import ajax from '@/api/ajax'
export default {
  name: 'reg',
  data () {
    return {
      uname: '',
      upass: '',
      uemail: '',
      show_pass: false,
      is_agree: false,
      is_disabled: false
    }
  },
  methods: {
    subForm (event) {
      event = event || window.event
      event.preventDefault()
      if (!this.checkFrom()) {
        return
      }
      this.is_disabled = true
      ajax('post', this.sub_url, { username: this.uname, userpass: this.upass, useremail: this.uemail }).then(res => {
        this.is_disabled = false
        if (res.code === 6) {
          this.$emit('tip', '该账户名已存在')
        } else if (res.code === 3) {
          this.$emit('tip', '服务器抽了，联系网站管理员')
        } else if (res.code === 0) {
          this.$emit('alert', '注册成功')
          this.clearData()
          this.$emit('tip', '')
        }
      })
    },
    checkFrom () {
      if (!/^[a-z0-9]{5,8}$/i.test(this.uname)) {
        this.$emit('tip', '请输入4-8位账户名')
        return false
      }
      if (!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(this.uemail)) {
        this.$emit('tip', '请输入正确的邮箱')
        return false
      }
      if (!/^[a-z0-9]{6,10}$/i.test(this.upass)) {
        this.$emit('tip', '请输入6-10位密码')
        return false
      }
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
    },
    clearData () {
      this.uname = ''
      this.upass = ''
      this.uemail = ''
      this.is_agree = false
      this.show_pass = false
    }
  },
  mounted () {
    this.sub_url = USER_REGISTER
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
form{
    position: relative;
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
