<template>
<footer>
    <p><router-link to="/">唯品会首页</router-link><router-link to="about">关于我们</router-link></p>
    <p>Copyright © 2008-2019 m.vip.com, All Rights Reserved 粤ICP备08114786号</p>
</footer>
</template>
<script>
export default {
}
</script>
<style scoped>
footer{
    text-align: center;
    background: #f3f4f5;
    padding: 2% 3%;
}
footer p:nth-child(1){
    color: #585c64;
    font-size: .6rem;
    line-height: 2;
}
footer p:nth-child(1) a{
    margin: 0 2%;
}
footer p:nth-child(2){
    color: #ccc;
    font-size: .5rem;
}
</style>
