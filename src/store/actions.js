export default {
    //设置footer当前状态
    changeFocus({commit}, num){
        commit('changeFocus', num);
    },
    //设置登陆账号密码
    setUser({commit}, params){
        commit('setUser', params);
    }
};