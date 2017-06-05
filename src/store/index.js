import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
	username: '', // 用户名
	password: '', // 密码
    focus:0,      //footer选中
    shopCarNum:0  //购物车数量
}

const store =  new Vuex.Store({
    actions,
    getters,
	state,
    mutations
})
export default store;