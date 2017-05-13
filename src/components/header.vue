<template>
   <header :data-title="title">
       <section class="head_goback" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(0,0,0);stroke-width:2" transform="scale(1.2, 1.2)"/>
            </svg>
        </section>
   </header>
</template>

<script>
    export default {
        props:{
            title:{
                type:String
            }
        },
        components: {}
    }
</script>

<style lang="less">
    header {
        height: 40/37.5rem;
        line-height: 40/37.5rem;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #ccc;
        background: #fff;
        &:after{
            content: attr(data-title);
            position: absolute;
            top: 0;
            left: 55/37.5rem;
            right: 55/37.5rem;
            height: 100%;
            font-weight: normal;
            font-size: 16/37.5rem;
        }
    }
    
    .head_goback {
        padding-top: 8/37.5rem;
        left: 0.4rem;
        width: 40/37.5rem;
        height: 100%;
        line-height: 100%;
        margin-left: .4rem;
    }
</style>