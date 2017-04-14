<template>
  <div id="app">
    <router-view></router-view>
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
</style>