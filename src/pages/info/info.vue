<template>
<div class="info-header">
    <section class="head_goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(0,0,0);stroke-width:2" transform="scale(1.2, 1.2)"/>
        </svg>
    </section>
</div>
</template>

<script>
    import {
        Toast,
        TabContainer,
        TabContainerItem,
    } from 'mint-ui';
    export default {
        data() {
            return {}
        },
        mounted() {
            console.log(this.$route.params.productId,this.$route.params.enterpriseId)
        },
        components: {}
    }
</script>

<style lang="less" scoped>
    .info-{
        &header{
            
        }
    }
</style>