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
    setShopCarNum(state, num) {
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
    },
    setAddress(state, num, obj) {
        state.adderss[num] = obj;
    },
    deleteAddress(state, num){
        state.address.splice(num,1);
    },
    getAddress(state, params) {
        params.fn(params.that).then((response) => {
            var data = response.body.data;
            if (response.body.statusCode == 0) {
                state.address.splice(0,state.address.length);
                for (var i = 0; i < data.length; i++) {
                    state.address.push(data[i]);
                }
            } else {
                state.adderss = [];
            }
        })
    }
}