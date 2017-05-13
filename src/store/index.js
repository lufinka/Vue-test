import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	username: '', // 用户名
	password: '' // 密码
}

export default new Vuex.Store({
	state
})