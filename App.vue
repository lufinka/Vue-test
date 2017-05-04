<template>
  <div id="app">
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
    body{margin: 0;    font-size: 0.4rem;}
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>