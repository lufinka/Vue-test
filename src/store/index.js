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
    }
}

const mutations = {
    increment(state) {
      state.ky = '123';
  }
}

const actions = {
    increment: ({
		commit
	}) => {
		commit('increment');
	}
}

const store =  new Vuex.Store({
    actions,
    getters,
	state,
    mutations
})
export default store;