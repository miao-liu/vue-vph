<template>
    <div class="add-address">
        <bread-menu :navs="navs"/>
        <form>
            <div>
                <label for="user">收货人</label>
                <input type="text" name="user" id="user" placeholder="收货人姓名" v-model="user">
                <span class="clear"></span>
            </div>
            <div>
                <label for="phone">手机号码</label>
                <input type="tel" name="phone" id="phone" placeholder="收货人手机号" v-model="phone">
                <span class="clear"></span>
            </div>
            <div>
                <label for="city">所在地区</label>
                <input type="text" name="city" id="city" placeholder="选择省/市/区" readonly @focus="togglePanel(true)" v-model="address">
                <div class="address-panel">
                    <div class="alert-mask"></div>
                    <p class="tip flex">
                        <span class="cancel" @click="togglePanel(false)">取消</span>
                        <span class="ok" @click="confirm()">确认</span>
                    </p>
                    <linkage-menu />
                </div>
            </div>
            <div>
              <label for="street">详细地址</label>
              <input type="text" name="street" id="street" placeholder="街道门牌号" v-model="street">
            </div>
        </form>
        <div class="tip-sub"></div>
        <button :class="is_disabled ? 'sub clicked' : 'sub'" @click="saveaddr" :disabled="is_disabled" >{{is_disabled ? '保存中' : '保存'}}</button>
    </div>
</template>
<script>
import breadMenu from '@/components/index/breadMenu.vue'
import linkageMenu from '@/components/index/addaddr/linkageMenu.vue'
import ajax from '@/api/ajax'
import { ADDRESS_ADD } from '@/config/api'
export default {
  components: { breadMenu, linkageMenu },
  data () {
    return {
      is_default: false,
      user: '',
      phone: '',
      address: '',
      street: '',
      navs: [{ name: '个人中心', to: '/center' }, { name: '收货地址', to: '/addresslist' }, { name: '新增地址', to: '/addaddr' }],
      address_panel: null,
      address_mask: null,
      tip: null,
      timer: null,
      is_disabled: false
    }
  },
  methods: {
    setDefault () {
      this.is_default = !this.is_default
      document.querySelector('.default').classList.toggle('save')
    },
    saveaddr () {
      if (!this.checkFrom()) return
      this.is_disabled = true
      const data = { username: window.sessionStorage.getItem('username'), name: this.user, phone: this.phone, address: this.address, street: this.street }
      ajax('post', ADDRESS_ADD, data).then(res => {
        this.is_disabled = false
        if (!res.error) {
          this.$router.push('/addresslist')
        } else {
          this.tipPanel('服务器问题，联系管理员')
        }
      })
    },
    checkFrom () {
      if (!this.user.trim()) {
        this.tipPanel('请输入收货人姓名')
        return false
      }
      if (!this.phone.trim()) {
        this.tipPanel('请输入手机号码')
        return false
      }
      if (!/^1[3,4,5,7,8,9]\d{9}$/.test(this.phone)) {
        this.tipPanel('请输入正确的手机号')
        return false
      }
      if (!this.phone.trim()) {
        this.tipPanel('请输入收货地址')
        return false
      }
      return true
    },
    togglePanel (flag) {
      console.log(flag)
      this.address_panel.style.visibility = flag ? 'visible' : 'hidden'
      this.address_panel.style.opacity = flag ? 1 : 0
    },
    tipPanel (msg) {
      this.tip.innerText = msg
      this.tip.style.visibility = 'visible'
      this.timer = setTimeout(() => {
        this.tip.style.visibility = 'hidden'
        clearTimeout(this.timer)
      }, 1000)
    },
    confirm () {
      const results = document.querySelectorAll('.add-address .address-panel .cur')
      for (let i = 0; i < results.length; i++) {
        if (results[i].innerText.trim() === '请选择') {
          this.tipPanel('请选择地址')
          return
        }
      }
      let str = results[0].innerText
      for (let i = 1; i < results.length; i++) {
        str += '/' + results[i].innerText
      }
      this.address = str
      this.address_panel.style.visibility = 'hidden'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.address_panel = document.querySelector('.add-address .address-panel')
      this.address_mask = document.querySelector('.add-address .alert-mask')
      this.tip = document.querySelector('.add-address .tip-sub')
    })
  }
}
</script>
<style scoped>
    div {
        height: auto;
    }

    .add-address {
        font-size: .6rem;
        color: #5f6368;
        line-height: 3;
        padding: 2%;
    }

    .add-address p {
        background: #fff;
        padding: 0 .5rem;
        position: relative;
    }

    .add-address header {
        margin-bottom: 1rem;
    }

    .add-address main {
        padding: 0;
        background: #fff;
        border-radius: .4rem;
    }

    .add-address form div {
        /* border-bottom: .01rem solid #f5f6f7; */
        background: #fff;
    }

    .add-address form label {
        width: 20%;
        text-align: justify;
        text-align-last: justify;
    }

    .add-address form input {
        width: 70%;
    }

    .add-address input {
        border: none;
        background: transparent;
        outline: none;
        text-indent: 1em;
    }

    .add-address .default {
        width: 2rem;
        height: 1rem;
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid rgb(204, 204, 204);
        overflow: hidden;
        border-radius: .8rem;
        z-index: 1;
        box-shadow: 5px 0 46px #d34ba8 inset;
    }

    .add-address .default::before,
    .add-address .default::after {
        content: '';
        position: absolute;
        height: 100%;
        transition: all .5s linear;
    }

    .add-address .default::before {
        width: 100%;
        right: 0;
        border-radius: .8rem;
        background: rgb(255, 255, 255);
        z-index: 2;
    }

    .add-address .default::after {
        width: .9rem;
        height: 100%;
        border-radius: 50%;
        z-index: 3;
        background: rgb(255, 255, 255);
        box-shadow: 0 0 4px 1px #ccc;
    }

    .add-address .default.save {
        border-color: transparent;
    }

    .add-address .default.save::before {
        width: 0;
    }

    .add-address .default.save::after {
        right: 0;
    }

    .add-address .address-panel{
    background: rgb(255, 255, 255);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    visibility: hidden;
    opacity: 0;
    transition: all .5s;
  }
    .add-address .address-panel .tip {
    font-size: .7rem;
    margin-top: .9rem;
    color: #969799;
    padding: 0 5%;
    justify-content: space-between;
  }
  .add-address .address-panel .alert-mask{
      position: fixed;
      z-index: 0;
      background:rgba(0,0,0,.7);
      top:0;left: 0;
      bottom:0;
      right: 0;
    }
    .add-address .tip-sub{
        position: fixed;
        z-index: 400;
        width: 80%;
        left: 10%;
        background: rgba(0,0,0,.7);
        color: #fff;
        text-align: center;
        line-height: 2em;
        font-size: 。9rem;
        top: 50%;
        visibility: hidden;
    }

    .add-address .sub{
    width: 90%;
    font-size: .7rem;
    line-height: 2.5em;
    color: #fff;
    background: #d34ba8;
    margin: 1rem auto;
    text-align: center;
    margin-left: 5%;
    }
    .add-address .sub.clicked{
        opacity: .5;
    }
</style>
