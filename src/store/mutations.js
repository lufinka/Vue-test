export default {
    changeFocus(state, num) {
        state.focus = num;
    },
    setUser(state, params) {
        state.username = params.username;
        state.password = params.password;
    },
    signOut(state) {
        state.username = '';
        state.password = '';
    },
    setShopCarNum(state,num){
        state.shopCarNum -= num;
    },
    getShopCarNum(state, params) {
        params.fn(params.that).then((response) => {
            if (response.body.statusCode == 0) {
                state.shopCarNum = response.body.data.count;
            } else {
                state.shopCarNum = 0;
            }
        })
    }
}