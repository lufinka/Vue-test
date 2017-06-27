export default {
    //设置footer当前状态
    changeFocus({commit}, num){
        commit('changeFocus', num);
    },
    //设置登陆账号密码
    setUser({commit}, params){
        commit('setUser', params);
    },
    //退出登录
    signOut({commit}){
        commit('signOut');
    },
    //设置购物车数量
    setShopCarNum({commit}, num){
        commit('setShopCarNum', num);
    },
    //获取购物车数量
    getShopCarNum({commit}, params){
        commit('getShopCarNum', params);
    },
    //设置收货地址
    setAddress({commit}, num,obj){
        commit('setAddress', num,obj);
    },
    //获取收货地址
    getAddress({commit}, params){
        commit('getAddress', params);
    }
};