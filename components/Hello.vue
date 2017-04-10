<template>
  <div class="hello">
    <h1 v-on:click="js">{{ msg }}</h1>
    <h2 @click="toast">Essential Links</h2>
    <mt-swipe :auto="4000" v-if="slide && slide.length">
      <mt-swipe-item v-for="item in slide"><img :src="item.img_path" alt=""></mt-swipe-item>
    </mt-swipe>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
    import {
        listIndex,
        slideshowPics
    } from '../service/getDate.js'
    import {
        Toast,
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                slide: []
            }
        },
        methods: {
            js: function() {
                slideshowPics({
                    orderMeetingId: 5
                }).then((response) => {
                    this.slide = response.data.data;
                    console.log(this.slide)
                }, (response) => {
                    console.log(response.data, 'response2')
                });
            },
            toast: function() {
                Toast('提示信息');
            }
        },
        components: {
            Swipe,
            SwipeItem
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "//unpkg.com/mint-ui/lib/style.css";
    h1,
    h2 {
        font-weight: normal;
    }
    .mint-swipe{width: 100%;height: 300px;background-color: #428bca;}
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
</style>