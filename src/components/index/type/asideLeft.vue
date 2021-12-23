<template>
    <div class="aside-left">
        <div v-if="!types.length">
          <loading />
        </div>
        <div v-else>
          <ul>
            <li v-for="(item, idx) of types" :key="idx" :class="[isActive == idx ? 'cur' : '']" @click = "isActive = idx">
                <router-link :to="{query: {type_id: item.type_id}}">
                  <img v-if="item.background_pic" :src="item.background_pic" alt="">
                <span v-else>
                  {{item.name}}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
import ajax from '@/api/ajax'
import loading from '../loading'
import { TYPES_ALL } from '@/config/api'

export default {
  name: 'asideLeft',
  data () {
    return {
      types: [],
      isActive: 0
    }
  },
  methods: {
    renderTypes () {
      ajax('get', TYPES_ALL).then(res => {
        this.types = res.data
      }, err => {
        console.log(err)
      })
    },
    catchCur () {
      this.isActive = this.$route.query.type_id - 1
    }
  },
  components: {
    loading
  },
  mounted () {
    this.renderTypes()
    if (!this.$route.query.type_id) {
      this.$router.replace({ query: { type_id: 1 } })
    }
    this.catchCur()
  }
}
</script>
<style scoped>
.aside-left li{
  font-size: .55rem;
  line-height: 3;
  text-align: center;
  position: relative;
}
.aside-left li a{
  display: block;
  width: 70%;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 auto;
}
.aside-left li img{
  width: 100%;
  vertical-align: middle;
}
.aside-left li.cur{
  background: #fff;
}
.aside-left li.cur::before{
  content: '';
  width: 0.12rem;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #f03867;
}
.aside-left li.cur a{
  border-bottom-color: transparent;
}
</style>
