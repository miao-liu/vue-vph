<template>
<div>
    <p class="flex">
        <select v-model="province">
            <option disabled value="">请选择</option>
            <option v-for="(item, idx) in map" :value="idx" :key="idx">{{idx}}</option>
        </select>
        <select v-if="province" v-model="city">
            <option disabled value="">请选择</option>
            <option v-for="(item, idx) in map[province]" :value="idx" :key="idx">{{idx}}</option>
        </select>
        <select v-if="city" v-model="area">
            <option disabled value="">请选择</option>
            <option v-for="(item, idx) in map[province][city]" :value="idx" :key="idx">{{idx}}</option>
        </select>
        <select v-if="area" v-model="street">
            <option disabled value="">请选择</option>
            <option v-for="(item, idx) of map[province][city][area]" :value="idx" :key="idx">{{item}}</option>
        </select>
    </p>
</div>
</template>
<script>
import ajax from '@/api/ajax'
import { ADDRESS_MAP } from '@/config/api'
export default {
  data () {
    return {
      map: null,
      province: '',
      city: '',
      area: '',
      street: ''
    }
  },
  methods: {
    getData () {
      ajax('get', ADDRESS_MAP).then(res => {
        this.map = res.data
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style scoped>
select, option{
    background: #eee;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    line-height: 2;
    font-size: .6rem;
    text-indent: .2rem;
}
</style>
