<template>
<div class="columns">
    <img src="@/assets/images/1.jpg" alt="">
</div>
</template>
<script>
export default {
}
</script>
<style scoped>
@font-face {
font-family: "iconfont";
/* Project id  */
    src: url('~@/assets/css/iconfont2.ttf?t=1639280174557') format('truetype');
}

.icon-clothes:before {
    content: "\e628";
}

.icon-plane:before {
    content: "\e78c";
}

.icon-Cosmetics:before {
    content: "\e64f";
}

.icon-WaterBottle:before {
    content: "\e996";
}

div{
    height: auto;
}
img{
    width: 100%;
}

.columns{
    padding-top: 2.4rem;
}
</style>
