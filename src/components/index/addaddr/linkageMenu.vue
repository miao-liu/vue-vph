<template>
<div class="choose-address">
        <div class="box">
            <div class="wrap flex">
                <ul class="province" data-type="province" data-level="0" style="transform: translateY(0);"></ul>
                <ul class="city" data-type="city" data-level="1" style="transform: translateY(0);"></ul>
                <ul class="area" data-type="area" data-level="2" style="transform: translateY(0);"></ul>
            </div>
        </div>
</div>
</template>
<script>
import ajax from '@/api/ajax'
import { ADDRESS_MAP } from '@/config/api'
import LinkageMenu from '@/api/linkageMenu'
export default {
  data () {
    return {
      map: null,
      province: '',
      linkage_menu: null
    }
  },
  methods: {
    async getData () {
      return await ajax('get', ADDRESS_MAP).then(res => res.data)
    }
  },
  async mounted () {
    this.map = await this.getData()
    await this.$nextTick()
    this.linkage_menu = new LinkageMenu({ data: this.map, container: '.choose-address .box .wrap', cur: 'cur' })
    this.linkage_menu.init()
  }
}
</script>
<style>
div{
    height: auto;
}
  .choose-address .box {
    position: relative;
    height: 20rem;
    overflow: hidden;
  }
  .choose-address .box .wrap {
    font-size: .7rem;
    line-height: 2.5;
    text-align: center;
    border-top: 1px solid rgb(237, 227, 227);
    border-bottom: 1px solid rgb(237, 227, 227);
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    height: 2.5em;
  }
  .choose-address .box .wrap>ul {
    transition: all .2s linear;
    width: 32%;
  }
  .choose-address .box .wrap > ul li {
    color: #999;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: none !important;
  }
  .choose-address .box .wrap > ul>li.cur {
    color: #000;
  }
</style>
