<template>
    <ul>
       <li>
           <router-link to="cart">我的购物车</router-link>
       </li>
       <li>
            <router-link to="addresslist">收货地址</router-link>
        </li>
       <li>
             <span @click="togglePanel(true)">注销账户</span>
             <p class="confirm flex">
                <button @click="closeCount()">【确认】</button>
                <button @click="togglePanel()">【取消】</button>
             </p>
        </li>
    </ul>
</template>
<script>
import ajax from '@/api/ajax'
import { USER_DEL } from '@/config/api'
export default {
  methods: {
    togglePanel (flag) {
      flag ? document.querySelector('.confirm').style.display = 'flex' : document.querySelector('.confirm').style.display = 'none'
      flag ? document.querySelector('.confirm').style.opacity = 1 : document.querySelector('.confirm').style.opacity = 0
    },
    closeCount () {
      ajax('get', USER_DEL, { username: window.sessionStorage.getItem('username') }).then(res => {
        if (!res.error) {
          this.$store.commit('user/delToken')
          window.sessionStorage.removeItem('username')
          this.$router.replace('/login')
        }
      })
    }
  }
}
</script>
<style scped>
    ul li{
        color: #666;
        font-size: .7rem;
        text-indent: 1em;
        line-height: 2.5em;
        border-bottom: 1px solid #eee;
    }
    .confirm{
        display: none;
        justify-content: space-between;
        opacity: 0;
        position: fixed;
        width: 86%;
        left: 5%;
        top: 50%;
        padding: 4% 2%;
        transform: translateY(-50%);
        background:#fff;
        border: .1rem solid #d34ba8;
        text-align: center;
        line-height: 2;
        transition: all .5s ease;
    }
    .confirm button{
      background: transparent;
    }
</style>
