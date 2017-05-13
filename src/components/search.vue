<template>
    <div class="search-wrapper">
        <a href="/search.html?redirecturl=%2Findex.html">
            <input type="text" placeholder="药品名/拼音缩写/厂家名/供应商" readonly>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {}
    }
</script>

<style scoped lang="less">
    @size : 37.5rem;
    .search-wrapper {
        width: 100%;
        display: flex;
        flex: 1;
        height: 100%;
        margin-right: 10/@size;
        a {
            display: flex;
            width: 100%;
            input {
                padding-left: 30/@size;
                height: 32/@size;
                flex: 1;
                font-size: 12/@size;
                color: #C7C7CD;
                line-height: 1.5;
                border-radius: 32/@size;
                background: url("../images/index/icon_search.png") 10/@size center no-repeat;
                background-color: #fff;
                background-size: 15/@size;
            }
        }
    }
</style>