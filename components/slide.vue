<template>
   <div>
    <div class="slide-wrapper">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in slideData"><a :href="item.url"><img :src="item.img_path" alt=""></a></mt-swipe-item>
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

<style lang="less">
    @public_size : 37.5rem;
    .slide-wrapper {
        width: 100%;
        height: 180/@public_size;
    }
    .mint-swipe{
        background: none;
    }
</style>