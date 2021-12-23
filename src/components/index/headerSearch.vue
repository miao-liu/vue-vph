<template>
    <header class="header-search">
        <div class="search-wrap flex">
            <input type="text" name="pro-name">
            <span class="iconfont icon-search"></span>
        </div>
    </header>
</template>
<script>
export default {
  name: 'headerSearch'
}
</script>
<style scoped>
    .header-search{
        padding: .6rem 1rem;
        box-sizing: border-box;
    }
    .header-search .search-wrap{
        border: 0.01rem solid #edeeee;
        justify-content: center;
    }
    .header-search input{
        background: transparent;
        display: block;
        width: calc(100% - 1rem);
        font-size: .5rem;
        height: 1.1rem;
        text-indent: 1em;
        line-height: 1.1rem;
    }
    .header-search .iconfont{
        width: 1rem;
        height: 1rem;
        color: #ccc;
        line-height: 1rem;
        align-self: center;
    }
</style>
