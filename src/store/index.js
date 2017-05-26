import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    ky:'222',
	username: '', // 用户名
	password: '' // 密码
}

const getters = {
    ky(state){
        return state.ky;
    },
    username(state){
        return state.username;
    },
    password(state){
        return state.password;
    }
}

const mutations = {
    increment(state) {
      state.ky = '123';
  },setUser(state,username,password) {
      state.username = username;
      state.password = password;
  }
}

const actions = {
    increment: ({
		commit
	}) => {
		commit('increment');
	},
    setUser: ({
		commit
	}) => {
		commit('setUser');
	}
    
}

const store =  new Vuex.Store({
    actions,
    getters,
	state,
    mutations
})
export default store;