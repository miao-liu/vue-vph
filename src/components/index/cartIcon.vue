<template>
    <div class="cart-icon">
        <router-link to="cart">
            <span class="iconfont icon-cart"></span>
        </router-link>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.cart-icon{
    width: 2rem;
    height: 2rem;
    color: #fff;
    background: #252830;
    border-radius: 50%;
    text-align: center;
    line-height: 2rem;
    font-weight: bold;
    position: fixed;
    bottom: 1rem;
    left: 1rem;
}
</style>
