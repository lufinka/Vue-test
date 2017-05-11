<template>
    <div>
        <transition name="fade">
            <div class="notice_shadow" v-show="target.length"  @click="close"></div>
        </transition>
        <transition name="toggle-cart">
        <div class="notice_box"  v-show="target.length">
            <div class="btn_close"><i @click="close"></i></div>
            <div class="phone_val">
                <input type="number" name=""  v-model="vphone" placeholder="请填写手机号" id=""><em>若该商品到货，我们会在第一时间通知您！</em></div>
            <div class="notice_btn" @click="notice">提交</div>
        </div>
         </transition>
    </div>
</template>

<script>
    import {
        Toast
    } from 'mint-ui';
    import {
        headers
    } from '@/service/getDate.js';
    export default {
        data() {
            return {
                pattern: /^[1][345678][0-9]{9}$/,
                vphone: ''
            }
        },
        props: {
            target: {
                type: Array
            }
        },
        components: {},
        methods: {
            close:function(){
                this.target.pop();
            },
            notice: function() {
                if (this.pattern.test(this.vphone)) {
                    console.log(this.target[0])
                    this.ajax();
                } else {
                    Toast({
                        message: "手机号码有误， 请重新输入！",
                        position: 'bottom',
                        duration: 2000
                    });
                }
            },
            ajax: function() {
                var data = {
                    "spuCode": this.target[0].productCode,
                    "sellerCode": this.target[0].productCodeCompany,
                    "phoneNumber": this.vphone
                };
                this.$http.post('mall/api/addArrivalNotice', data, {
                    headers: headers,
                    emulateJSON:true
                }).then(action => {
                    Toast({
                        message: action.body.message,
                        position: 'bottom',
                        duration: 2000
                    });
                }, error => {
                    Toast({
                        message: error.body.message,
                        position: 'bottom',
                        duration: 2000
                    });
                })
            }
        }
    }
</script>

<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(0, 0, 0);
        opacity: 0;
    }
    .toggle-cart-enter-active, .toggle-cart-leave-active {
        transition: all .3s ease-out;
    }
    .toggle-cart-enter, .toggle-cart-leave-active {
        transform: translateY(100%);
    }
    
</style>    