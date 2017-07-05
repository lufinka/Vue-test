<template>
    <div class="app">
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import iconfont from '@/service/iconfont'
export default {
    name: 'app',
    methods: {
        aa: function () {
            console.log(1)
        }
    },
    mounted() {
        console.log(this, 23)
    }
}
</script>

<style lang="less">
@import "style/common.less";
@import "//unpkg.com/mint-ui/lib/style.css";

body {
    font-size: 0.4rem;
    background-color: #f8f8f8;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

#app {
    font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Arial;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-align: center;
    color: #2c3e50;
}

.app {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}

.mint-msgbox-btn.mint-msgbox-confirm {
    color: #FE403B!important;
}

img[lazy=loading] {
    width: 40% !important;
    display: block;
    height: 100%;
    margin: 0 auto;
}
</style>