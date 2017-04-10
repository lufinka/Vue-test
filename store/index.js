import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	latitude: '', // 当前位置纬度
	longitude: '' // 当前位置经度
}

export default new Vuex.Store({
	state
})