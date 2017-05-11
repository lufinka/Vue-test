<template>
   <div>
    <div class="slide-wrapper">
        <mt-swipe :auto="4000" continuous>
          <mt-swipe-item v-for="(item, index) in slideData" :key="index"><a :href="item.url"><img :alt="item.name"  v-lazy="item.imgPath" ></a></mt-swipe-item>
        </mt-swipe>
    </div>
    </div> 
</template>

<script>
    import {
        Toast,
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        props: {
            slideData: {
                type: Array
            }
        },
        components: {}
    }
</script>

<style lang="less" scoped>
    @public_size : 37.5rem;
    .slide-wrapper {
        width: 100%;
        background-color: #ddd;
        height: 180/@public_size;
    }
    .mint-swipe {
        background: none;
        height: 180/@public_size;
        a {
            display: block;
            height: 100%;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    img[lazy=loading] {
        width: 10% !important;
        display: block;
        height: 100%;
        margin: 0 auto;
    }
</style>