<template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
  </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
            aa: function() {
                console.log(1)
            }
        }
    }
</script>

<style>
    @import 'https://necolas.github.io/normalize.css/6.0.0/normalize.css';
    body {
        margin: 0;
        font-size: 0.4rem;
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
</style>