<template>
    <div class="register">
           <v-header :title="title"></v-header>
            <div class="cont">
                <div class="from">
                    <input type="number" v-model="phone" @keyup="kry" validate name="" class="phone" placeholder="请填写您的手机号" id="">
                </div>
                <div class="from">
                    <input type="text" validate data-pattern="
                ^[0-9]{4}$" maxlength="4"  name="" @keyup="checkImgCode" class="verify1" v-model="img_verify"  placeholder="请输入验证码" id="glCaptchaToken">
                    <img :src="getImgCode" @click="reflash" alt="" id="getImgCode">
                </div>
                <div class="from">
                    <input type="text" name=""  maxlength="6" v-model="msg_verify"  class="verify2" validate data-pattern="
                ^[0-9]{6}$" placeholder="验证码" id="">
                    <button v-if="ing" :class="{'btn-getcode':true,'disable':!verphone}" @click="sendMsg" type="button">获取验证码</button>
                    <button v-else class="btn-getcode disable" type="button">{{countdown}}秒后重试</button>
                </div>
                <div class="from" v-show="imgpass && msgpass">
                    <input type="text" v-model="username" name="" placeholder="请输入用户名" id="">
                </div>
                <div class="from" v-show="imgpass && msgpass">
                    <input type="password"  v-model="password"  name=""  placeholder="请输入密码" id="">
                </div>
                <div class="agreement">
                    <label class="bb" name="feed">已阅读并同意<a href="http://mall.yaoex.com/jsp/app/service_terms.jsp">《用户服务协议》</a><input type="checkbox" v-model='checked' class="feed" name="feed"  value="1"></label>
                </div>
                <div class="button-bar">
                    <button :class="{'btn-next':true,'disable': !/^[1][345678][0-9]{9}$/.test(phone) || phone.length !== 11 || img_verify.length !== 4 || msg_verify.length !== 4 || username.length <= 6 || password.length <= 6 || !/([a-zA-Z0-9_-]){6,20}$/.test(username) || !checked }" @click="Register" type="button">注册</button>
                </div>
            </div>
        </div>
</template>

<script>
    import router from '@/router'
    import header from '@/components/header';
    import {
        Toast
    } from 'mint-ui';
    import {
        headers
    } from '@/service/getDate.js'
    export default {
        data() {
            return {
                title: '注册页面',
                phone: '', //手机号
                img_verify: '', //图片验证码
                msg_verify: '', //短信验证码
                checked: !1,
                uid: '',
                glAppId: '1016',
                getImg: '',
                countdown: 60,
                ing: !0,
                glCaptchaToken: '',
                verphone: !1,
                username: '',
                password: '',
                imgpass: !1,
                msgpass: !1
            }
        },
        watch: {
            phone() {
                if (/^[1][345678][0-9]{9}$/.test(this.phone)) {
                    this.verphone = !0;
                } else {
                    this.verphone = !1;
                }
            }
        },
        computed: {
            getImgCode() {
                this.uid = this.uuid();
                this.getImg = "http://web-ycaptcha.111.com.cn/getcode?glAppId=" + this.glAppId + "&glCaptchaId=" + this.uuid + "&t=" + Math.random();
                return this.getImg;
            }
        },
        methods: {
            kry: function() {
                console.log(this.verphone)
            },
            Register: function() {
                if (!/^[1][345678][0-9]{9}$/.test(this.phone) || this.phone.length !== 11 || this.img_verify.length !== 4 || this.msg_verify.length !== 4 || username.length <= 6 || password.length <= 6 || !/([a-zA-Z0-9_-]){6,20}$/.test(username) || !checked) {
                    register(this, {
                        username: this.username,
                        password: this.password
                    }).then((response) => {
                        console.log(response)
                    }, (response) => {
                        console.log(response)
                    });
                }
            },
            time: function() {
                var self = this;
                this.ing = !this.ing;
                var timer = setInterval(function() {
                    if (self.countdown <= 1) {
                        clearInterval(timer);
                        self.ing = !self.ing;
                        self.countdown = 60;
                    } else {
                        self.countdown--;
                    }
                }, 1000);
            },
            sendMsg: function() {
                var self = this;
                if (this.ing && this.verphone) {
                    if (this.glCaptchaToken) {
                        this.$http.get('http://arch-sms.111.com.cn/sendsms?jsoncallback=jsonp1', {
                            params: {
                                "glAppId": this.glAppId,
                                "templateId": '8',
                                "tag": 'register',
                                "phone": this.phone,
                                "length": '6',
                                "glCaptchaToken": this.glCaptchaToken
                            }
                        }).then((response) => {
                            this.time();
                        }, (response) => {
                            console.log(response)
                        });
                    } else {
                        Toast({
                            message: '请先输入图形验证码',
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                }
            },
            checkMsg: function() { //短信校验
                checkAppValidCode(this, {
                    mobile: this.phone,
                    validCode: this.msg_verify
                }).then((response) => {
                    console.log(response)
                    this.glCaptchaToken = response.glCaptchaToken;
                    this.msgpass = !0;
                }, (response) => {
                    console.log(response)
                });
            },
            uuid: function(len, radix) {
                var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var chars = CHARS,
                    uuid = [],
                    i;
                radix = radix || chars.length;

                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    // rfc4122, version 4 form
                    var r;

                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';

                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }

                return uuid.join('');
            },
            checkImgCode: function(event) {
                if (this.img_verify.length != 4)
                    return;
                if (event.which == 13) {
                    return;
                }
                this.$http.jsonp('http://web-ycaptcha.111.com.cn/checkfrontjsonp?jsoncallback=jsonp1', {
                    params: {
                        "glAppId": this.glAppId,
                        "glCaptchaId": this.uid,
                        "glCaptchaCode": this.img_verify
                    },header:headers
                }).then((response) => {
                    this.imgpass = !0;
                    console.log(response)
                }, (response) => {
                    console.log(response)
                });
            },
            reflash: function() {
                this.getImg = "http://web-ycaptcha.111.com.cn/getcode?glAppId=" + this.glAppId + "&glCaptchaId=" + this.uuid + "&t=" + Math.random();
            }
        },
        components: {
            'v-header': header
        }
    }
</script>

<style lang="less">
    @size : 37.5rem;
    @body_bgcolor: #f7f7f7;
    .font-size(@s) {
        font-size: @s/@size;
    }
    .height(@s) {
        height: @s/@size;
    }
    .line-height(@s) {
        line-height: @s/@size;
    }
    .width(@s) {
        width: @s/@size;
    }
    body {
        background-color: #fff;
    }
    
    .register {
        background-color: #fff;
        width: 100%;
        height: 100%;
    }
    
    .cont {
        padding: 0 15/@size;
    }
    
    .from {
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        .font-size(14);
        padding-top: 10/@size;
        color: #b2b2b2;
        position: relative;
        input {
            border: none;
            width: 100%;
            text-indent: 10/@size;
            .height(50);
        }
        button {
            background-image: linear-gradient(-180deg, #FF5B3B, #FE403B);
            background-color: transparent;
            border: none;
            border-radius: 4/@size;
            .font-size(12);
            .width(78);
            .height(28);
            color: #fff;
            position: absolute;
            top: 50%;
            margin-top: -14/@size;
            right: 10/@size;
            &.disable {
                background-image: linear-gradient(-180deg, #eee, #eee);
                color: #b2b2b2;
            }
        }
        img {
            position: absolute;
            .width(80);
            .height(32);
            right: 10/@size;
            top: 50%;
            margin-top: -16/@size;
        }
    }
    
    .button-bar {
        width: 100%;
        padding: 0 20/@size 20/@size;
        button {
            width: 100%;
            background: #eee;
            box-shadow: 0px 3px 10px 0px rgba(254, 64, 59, 0.50);
            -webkit-box-shadow: 0px 3px 10px 0px rgba(254, 64, 59, 0.50);
            border-radius: 100px;
            .font-size(15);
            .height(45);
            .line-height(45);
            background-image: linear-gradient(-180deg, #FF5B3B, #FE403B);
            color: #fff;
            &.disable {
                box-shadow: 0px 3px 10px 0px rgba(238, 238, 238, 0.50);
                -webkit-box-shadow: 0px 3px 10px 0px rgba(238, 238, 238, 0.50);
                color: #b2b2b2;
                background-image: linear-gradient(-180deg, #eee, #eee);
            }
        }
        a {
            display: block;
            margin-top: 15/@size;
            text-align: center;
            width: 100%;
            background: #eee;
            box-shadow: 0px 3px 10px 0px rgba(254, 64, 59, 0.50);
            -webkit-box-shadow: 0px 3px 10px 0px rgba(254, 64, 59, 0.50);
            border-radius: 100px;
            .font-size(15);
            .height(45);
            .line-height(45);
            background-image: linear-gradient(-180deg, #FF5B3B, #FE403B);
            p {
                display: inline-block;
                color: #fff;
                padding-left: 22/@size;
                background-image: url(../../images/purchas/button-phone.png);
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 18/@size auto;
            }
        }
    }
    
    .agreement {
        padding: 10/@size 0;
        label {
            display: block;
            text-align: left;
            padding-left: 20/@size;
            .line-height(20);
            margin: 10/@size 20/@size;
            .font-size(13);
            position: relative;
            color: #666;
            input:after {
                content: "";
                .width(16);
                .height(16);
                position: absolute;
                top: 50%;
                left: 0;
                background-image: url(../../images/purchas/checkbox-off.png);
                background-size: 16/@size auto;
                margin-top: -8/@size;
            }
            input:checked:after {
                content: "";
                background-image: url(../../images/purchas/checkbox-on.png);
                background-size: 16/@size auto;
            }
            a {
                color: #FE403B;
            }
        }
    }
</style>