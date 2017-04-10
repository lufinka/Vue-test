// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import resource from 'vue-resource'
import Mint from 'mint-ui';

Vue.use(Mint);
Vue.use(resource);
Vue.config.productionTip = false


/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    router,
    store,
    methods:{
        aa:function(){
            console.log(1)
        }
    },
    template: '<App/>',
    components: {
        App
    }
})

export {vm};