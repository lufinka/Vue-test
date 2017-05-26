<template>
  <div class="hello"  @keyup.enter="userLogin">
   <div class="base_header ui_into">登录</div>
   <h1 class="logo"><img src="../../images/logo.png" alt=""></h1>
   <div class="login_container">
        <div class="afterLine">
            <input type="text" name="username"  v-model="usernameVal" class="login_username" @input="watched" placeholder="用户名" />
            <i v-show="usernameVal" class="btn btn_delete" @click="usernameVal = ''"></i>
        </div>
        <div class="afterLine">
            <input v-if="type" type="password" name="password" class="input_password" v-model="passwordVal" placeholder="密码" />
            <input v-else type="text" name="password" class="input_password" v-model="passwordVal" placeholder="密码" />
            <i :class="{btn:true,btn_look:true,look_hide:type}" @click="type = !type" ></i>
        </div>
        <p class="forget_password">
            <span class="login_error">用户名或者密码错误，请重试</span>
            <!--<a href="">忘记密码？</a>-->
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
    import router from '@/router'
    import {
        listIndex,
        headers
    } from '@/service/getDate.js'
    import {
        setLocalStorage
    } from '@/service/tool.js'
    import {
        Toast,
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        name: 'hello',
        data() {
            return {
                type: true,
                usernameVal: '',
                passwordVal: '',
                namePattern: /([a-zA-Z0-9_-]){6,20}$/
            }
        },
        computed: mapGetters([
            'username',
            'password'
        ]),
        mounted() {
            if (this.username) {
                router.replace('home');
            }
        },
        filters: {
            reverse: function(value) {
                return value.split('').reverse().join('')
            }
        },
        methods: {
            ...mapActions([
                'setUser' // 映射 this.increment() 为 this.$store.dispatch('increment')
            ]),
            watched: function() {
                console.log(this.namePattern.test(this.usernameVal))
            },
            userLogin: function() {
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
                        if (data.result == 0) {
                            setLocalStorage('city_name', data.stationName);
                            setLocalStorage('city_id', data.station);
                            setLocalStorage('token', data.token);
                            setLocalStorage('result', data.result);
                            setLocalStorage('username', data.usernameVal);
                            setLocalStorage('avatarUrl', data.avatarUrl);
                            setLocalStorage('enterpriseName', data.enterpriseName);
                            setLocalStorage('nameList', data.nameList);
                            this.setUser(this.usernameVal,this.passwordVal);
                            Toast({
                                message: '登录成功',
                                position: 'bottom',
                                duration: 2000
                            });
                            setTimeout(function() {
                                router.push('home')
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
            },
            toast: function() {
                Toast('提示信息');
            }
        },
        components: {
            Swipe,
            SwipeItem
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @public_size : 37.5rem;
    @body_bgcolor: #f7f7f7;
    .font-size(@size) {
        font-size: @size/@public_size;
    }
    
    .btn_look {
        position: absolute;
        right: 0;
        width: 0.50666667rem;
        height: 0.21333333rem;
        border: 0.26666667rem solid transparent;
        background-image: url("../../images/icon_paw_show.png");
        background-position: center;
        background-size: 0.50666667rem auto;
        background-repeat: no-repeat;
    }
    
    .btn_look.look_hide {
        background-image: url("../../images/icon_paw_hide.png");
    }
    
    .forget_password {
        margin-top: 0.33333333rem;
        margin-bottom: 0.54666667rem;
        text-align: right;
        height: 0.34666667rem;
    }
    
    .forget_password a {
        font-size: 0.34666667rem;
        color: #333;
        text-decoration: underline;
    }
    
    .forget_password .login_error {
        display: none;
        float: left;
        font-size: 0.34666667rem;
        color: #fe443b;
    }
    
    .active {
        display: block !important;
    }
    
    .btn_next {
        display: block;
        width: 8.08rem;
        height: 1.41333333rem;
        text-align: center;
        line-height: 1.30666667rem;
        color: #ccc;
        background: url("../../images/icon_next_disabled.png") center no-repeat;
        background-size: 103%;
    }
    
    .btn_next_ok {
        color: #fff;
        background: url("../../images/icon_next.png") center no-repeat;
        background-size: contain;
    }
    
    .btn_delete {
        width: 0.34666667rem;
        height: 0.34666667rem;
        background: url("../../images/icon_delete.png") center / contain no-repeat;
    }
    
    .login_container {
        margin: 0 auto;
        width: 78.93%;
    }
    
    .login_container div {
        position: relative;
        margin-top: 0.66666667rem;
    }
    
    .login_container input {
        padding: 0.33333333rem 0.10666667rem;
        width: 100%;
        border: none;
        color: #333333;
        font-size: 0.37333333rem;
        border-bottom: 1px solid #e6e6e6;
    }
    
    .login_container input::-webkit-input-placeholder {
        color: #cccccc;
        font-size: inherit;
    }
    
    .login_container input .username:focus>.btn_delete {
        display: inline-block;
    }
    
    .login_container .btn_next {
        letter-spacing: 0.22666667rem;
        text-decoration: none;
    }
    
    .login_container .btn_look {
        top: 0.56rem;
    }
    
    .login_container .btn_submit {
        margin-top: 0.72rem;
    }
    
    .login_container .btn_register {
        margin-top: 0.4rem;
        color: #fe403b;
    }
    
    .login_container .show_password {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0.74666667rem 0.5rem;
        color: #cccccc;
        font-size: 0.34666667rem;
    }
    
    .login_container .btn {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 90%;
        margin: auto;
    }
    
    .login_container button {
        border: none;
    }
    
    .logo {
        margin-top: 0.97333333rem;
        margin-bottom: 0.74666667rem;
        text-align: center;
    }
    
    .logo img {
        width: 54.66%;
    }
    
    .width(@size) {
        width: @size/@public_size;
    }
    
    .height(@size) {
        height: @size/@public_size;
    }
    
    .line-height(@size) {
        line-height: @size/@public_size;
    }
    
    h1,
    h2 {
        font-weight: normal;
    }
    
    .mint-swipe {
        width: 100%;
        height: 300px;
        background-color: #428bca;
    }
    
    .mint-swipe img {
        width: 100%;
        height: 100%;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
    
    .base_header {
        height: 1.06666667rem;
        line-height: 1.06666667rem;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #ccc;
        background: #fff;
    }
</style>