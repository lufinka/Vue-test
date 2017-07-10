<template>
    <div class="hello" v-if="ready" @keyup.enter="userLogin">
        <div class="base_header ui_into">登录</div>
        <h1 class="logo">
            <img src="../../images/logo.png" alt="">
        </h1>
        <div class="login_container">
            <div class="afterLine">
                <input type="text" name="username" v-model="usernameVal" class="login_username" placeholder="用户名" />
                <i v-show="usernameVal" class="btn btn_delete" @click="usernameVal = ''"></i>
            </div>
            <div class="afterLine">
                <input v-if="type" type="password" name="password" class="input_password" v-model="passwordVal" placeholder="密码" />
                <input v-else type="text" name="password" class="input_password" v-model="passwordVal" placeholder="密码" />
                <i :class="{btn:true,btn_look:true,look_hide:type}" @click="type = !type"></i>
            </div>
            <p class="forget_password">
                <span class="login_error">用户名或者密码错误，请重试</span>
                <router-link to="/forgetpsw">忘记密码？</router-link>
            </p>
            <a href="javascript:;" :class="{btn_next:true,btn_submit:true,btn_next_ok:usernameVal.length >=6 && passwordVal.length >=6 && namePattern.test(usernameVal)}" @click="userLogin">登录</a>
            <router-link class="btn_next btn_register" to="/register">注册</router-link>
        </div>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    headers,
    userLogin
} from '@/service/getDate.js'
import {
    setLocalStorage
} from '@/service/tool.js'
import {
    Toast
} from 'mint-ui';
export default {
    name: 'hello',
    data() {
        return {
            type: true,
            ready: !1,
            usernameVal: 'testqqq',
            passwordVal: 'q123456',
            namePattern: /([a-zA-Z0-9_-]){6,20}$/
        }
    },
    computed: mapGetters([
        'username',
        'password'
    ]),
    //        created() {
    //            if (getLocalStorage('token')) {
    //                router.replace('home');
    //            }
    //        },
    mounted() {
        this.ready = !0;
        //            if (this.username) {
        //                router.replace('home');
        //            }
    },
    methods: {
        ...mapActions([
            'setUser'
        ]),
        userLogin: function () {
            if (this.usernameVal.length >= 6 && this.passwordVal.length >= 6 && this.namePattern.test(this.usernameVal)) {
                this.$http.post(
                    '/passport/api/user/userLogin', {
                        'username': this.usernameVal,
                        'password': this.passwordVal
                    }, {
                        headers: headers
                    }
                ).then((response) => {
                    var data = response.data.data;
                    var self = this;
                    if (data.result == 0) {
                        setLocalStorage('city_name', data.stationName);
                        setLocalStorage('city_id', data.station);
                        setLocalStorage('token', data.token);
                        setLocalStorage('result', data.result);
                        setLocalStorage('username', data.userName);
                        setLocalStorage('avatarUrl', data.avatarUrl);
                        setLocalStorage('enterpriseName', data.enterpriseName);
                        setLocalStorage('nameList', data.nameList);
                        this.setUser({
                            username: this.usernameVal,
                            password: this.passwordVal
                        });
                        Toast({
                            message: '登录成功',
                            position: 'bottom',
                            duration: 2000
                        });
                        setTimeout(function () {
                            self.$router.push('home')
                        }, 1000)
                    } else {
                        Toast({
                            message: data.remark,
                            position: 'bottom',
                            duration: 2000
                        });
                    }

                }, (response) => {
                    console.log(response)
                })
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@size : 37.5rem;

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #f8f8f8 inset;
}

input[type=text]:focus,
input[type=password]:focus,
textarea:focus {
    -webkit-box-shadow: 0 0 0 1000px #f8f8f8 inset;
}

.btn_look {
    position: absolute;
    right: 0;
    width: 19/@size;
    height: 8/@size;
    border: 10/@size solid transparent;
    background-image: url("../../images/icon_paw_show.png");
    background-position: center;
    background-size: 19/@size auto;
    background-repeat: no-repeat;
    &.look_hide {
        background-image: url("../../images/icon_paw_hide.png");
    }
}

.forget_password {
    margin-top: 12.5/@size;
    margin-bottom: 20.5/@size;
    text-align: right;
    height: 13/@size;
    a {
        font-size: 12/@size;
        color: #999;
    }
    .login_error {
        display: none;
        float: left;
        font-size: 13/@size;
        color: #fe443b;
    }
}

.active {
    display: block !important;
}

.btn_next {
    display: block;
    width: 100%;
    padding: 10/@size;
    text-align: center;
    text-align: center;
    color: #ccc;
    border: 1px solid #F84A73;
    border-radius: 2/@size;
}

.btn_next_ok {
    color: #fff;
    padding: 10/@size;
    background-image: linear-gradient(-180deg, #F84A73 0%, #FF3C4C 100%);
    color: #fff;
    border-radius: 2/@size;
}

.btn_delete {
    width: 13/@size;
    height: 13/@size;
    background: url("../../images/icon_delete.png") center/contain no-repeat;
}

.login_container {
    margin: 0 auto;
    width: 78.93%;
    div {
        position: relative;
        margin-top: 25/@size;
    }
    input {
        padding: 12.5/@size 4/@size;
        width: 100%;
        border: none;
        color: #333333;
        font-size: 14/@size;
        border-bottom: 1px solid #e6e6e6;
        &::-webkit-input-placeholder {
            color: #cccccc;
            font-size: inherit;
        }
        .username:focus>.btn_delete {
            display: inline-block;
        }
    }
    .errorMsg {
        color: #f00;
    }
    .btn_next {
        letter-spacing: 8.5/@size;
    }
    .btn_next1 {
        letter-spacing: 2/@size;
    }
    .btn_look {
        top: 21/@size
    }
    .btn_submit {
        margin-top: 27/@size;
    }
    .btn_register {
        margin-top: 15/@size;
        color: #fe403b;
    }
    .show_password {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 28/@size .5rem;
        color: #cccccc;
        font-size: 13/@size;
    }
    .btn {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 90%;
        margin: auto;
    }
    button {
        border: none;
    }
}

.logo {
    margin-top: 36.5/@size;
    margin-bottom: 28/@size;
    text-align: center;
    span {
        color: #FE403B;
    }
    img {
        width: 54.66%;
    }
}

.base_header {
    height: 40/@size;
    line-height: 40/@size;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #ccc;
    background: #fff;
}
</style>