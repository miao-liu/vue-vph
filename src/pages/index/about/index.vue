<template>
<div>
    <header>
        <img src="@/assets/images/about.png" alt="">
    </header>
    <main>
        <section>
            <p>唯品会成立于2008年，率先在中国开创了“精选品牌+深度折扣+限时抢购”的时尚特卖模式，在线销售服饰鞋包、美妆、母婴、跨境商品、家电数码、商超等全品类国内外品牌正品，通过日日上新为用户带来“网上逛街惊喜”与抢购乐趣，目前已经成为全球最大的特卖电商。</p>
        </section>
        <section>
            <p>2012年3月唯品会在美国纽约证券交易所（NYSE）上市，截至2019年9月30日，唯品会已连续二十八个季度实现盈利。2018年唯品会净营收845亿元，年订单量达4.374亿单，日均订单量近120万单。目前，唯品会注册会员达3.4亿。</p>
        </section>
        <img src="@/assets/images/about-1.png" alt="">
        <section>
            <p>唯品会的会员尊享7天无理由退货（特殊商品除外）与免费上门揽退服务（部分商品或地区除外），近2000名客服提供贴心服务。</p>
            <p>在物流配送方面，目前唯品会全球仓储物流总面积达300万平方米，并引入自动化系统，以降低成本、提高物流效率。运用高效的物流配送体系为消费者的购物体验提供了保障。</p>
            <img src="@/assets/images/logo.png" alt="">
        </section>
    </main>
    <bottom />
    <back-top />
</div>
</template>
<script>
import backTop from '@/components/index/backTop.vue'
import bottom from '@/components/index/bottom.vue'
export default {
  components: { bottom, backTop }
}
</script>
<style scoped>
img{
    width: 100%;
}
section{
    padding: 0 3%;
}
section p{
    text-indent: 2em;
    font-size: .7rem;
    line-height: 2;
    color: #585d64;
    text-align: justify;
}
</style>
