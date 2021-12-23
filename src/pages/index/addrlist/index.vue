<template>
  <div class="address-list">
      <bread-menu :navs="navs"/>
      <main class="container">
          <ul v-if="list">
              <li v-for="(item, idx) of list" :key="idx">
                  <p><span class="name">{{item.name}}</span> <span class="phone">{{item.phone}}</span></p>
                  <p class="address">{{item.address}}</p>
                  <span class="delete" @click="del(idx)"></span>
              </li>
          </ul>
      </main>
      <add-address :msg="'新增地址'" :ev="'addaddr'"/>
  </div>
</template>
<script>
import addAddress from '@/components/index/button.vue'
import breadMenu from '@/components/index/breadMenu.vue'
import ajax from '@/api/ajax'
import { ADDRESS_LIST, ADDRESS_DEL } from '@/config/api'
export default {
  data () {
    return {
      list: [],
      navs: [{ name: '个人中心', to: '/center' }, { name: '收货地址', to: '/addresslist' }]
    }
  },
  methods: {
    async getData () {
      return await ajax('get', ADDRESS_LIST, { username: window.sessionStorage.getItem('username') }).then(res => res.data[0])
    },
    del (idx) {
      this.list.splice(idx, 1)
      let str = JSON.stringify(this.list)
      str = str.substring(1, str.length - 1)
      ajax('post', ADDRESS_DEL, { data: str }).then(res => {
        console.log('删除成功')
      })
    }
  },
  components: { addAddress, breadMenu },
  async mounted () {
    const results = await this.getData()
    if (!results.useraddr) return
    const data = results.useraddr.match(/{"name[":]{3}\W+,"phone[":]{3}\d+","address[:"]{3}\W+,"street[":]{3}[\W,-,0-9]+}/ig)
    data.forEach(item => {
      this.list.push(JSON.parse(item))
    })
  }
}
</script>
<style scoped>
div{
  height: auto;
}
.address-list{
  position: relative;
  padding: 2% 2%;
}
.address-list main {
  padding: 0;
}
.address-list main li{
  position: relative;
  color: #5f6368;
  border-bottom: .01rem solid #f2f2f2;
  padding-bottom: .5rem;
  margin-bottom: .5rem;
}
.address-list main li p{
  font-size: .7rem;
}
.address-list main li p.address{
  font-size: 0.6rem;
}
.address-list main li .delete{
  position: absolute;
  top: 35%;
  right: 1rem;
  font-size: 1rem;
  width: 1rem;
  height: 1rem;
  background: url('~@/assets/images/delete.png') no-repeat center / 100%;
}

.address-list footer{
  text-align: center;
  font-size: .9rem;
  color: #fff;
  border-radius: .8rem;
  background: var(--mainColor);
  height: 2.4rem;
  line-height: 2.4rem;
  position: fixed;
  bottom: 0;
  left: 15px;
  right: 15px;
  cursor: pointer;
  transition: all .5s ease;
}
.address-list footer:hover{
  opacity: .8;
  filter: alpha(opacity=0.8);
}
.address-list /deep/ .btn{
  position: fixed;
  bottom: 0;
  left: 5%;
}
</style>
