export default {
    changeFocus(state, num) {
        state.focus = num;
    },
    setUser(state, params) {
        state.username = params.username;
        state.password = params.password;
    }
}