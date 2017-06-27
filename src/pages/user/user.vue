<template>
<div class="user" v-if="ready">
    <section class="top-banner">
        <div class="wrapInfo">
            <img src="../../images/usercenter/user_header.png" alt="">
            <div v-if="!token">
            <router-link to="/login" class="btn_config">登录/注册</router-link>
            </div>
            <div v-else>
            <div class="username">{{nick}}</div>
            <div class="enterpriseName">{{enterpriseName}}</div>
            </div>
        </div>
    </section>
    <section class="myOrder">
        <div class="all">
            <router-link to="/order">
                全部订单<span></span>
            </router-link>
        </div>
        <div class="four">
            <ul>
                <li>
                   <router-link to="/order/dfk">
                    <h3>{{info.unPayNumber || 0}}</h3>
                    <p>待付款</p>
                    </router-link>
                </li>
                <li>
                   <router-link to="/order/dfh">
                    <h3>{{info.deliverNumber || 0}}</h3>
                    <p>待发货</p>
                    </router-link>
                </li>
                <li>
                   <router-link to="/order/dsh">
                    <h3>{{info.reciveNumber || 0}}</h3>
                    <p>待收货</p>
                    </router-link>
                </li>
                <li>
                   <router-link to="/order/jsbh">
                    <h3>{{info.unRejRep || 0}}</h3>
                    <p>拒收&#92;补货</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
    <div class="into-list">
        <ul>
            <li>
               <router-link to="/vmanage">
                  <i class="address"></i>
                   <p>收货地址</p>
                   <span></span>
               </router-link>
            </li>
            <li>
               <a href="tel:4009215767">
                  <i class="kf"></i>
                   <p>联系客服</p>
                   <span></span>
               </a>
            </li>
            <li class="notice">
               <router-link to="/often_list">
                  <i class="often_list"></i>
                   <p>常购清单</p>
                   <span></span>
               </router-link>
            </li>
            <li>
               <router-link to="/often_shop">
                  <i class="often_shop"></i>
                   <p>常购商家</p>
                   <span></span>
               </router-link>
            </li>
            <li>
               <router-link to="/set">
                  <i class="set"></i>
                   <p>设置</p>
                   <span></span>
               </router-link>
            </li>
        </ul>
    </div>
    <footer-bar></footer-bar>
</div>
</template>

<script>
    import {
        Toast,
        Indicator
    } from 'mint-ui';
    import {
        mapActions
    } from 'vuex';
    import {
        getLocalStorage
    } from '@/service/tool';
    import footer from '@/components/footer';
    import {
        getUserTipInfo
    } from '@/service/getDate';
    export default {
        data() {
            return {
                info: {},
                ready: !1,
                nick: '',
                enterpriseName: '',
                token: ''

            }
        },
        created() {
            this.changeFocus(3);
            Indicator.open();
            this.nick = getLocalStorage('username');
            this.token = getLocalStorage('token');
            this.enterpriseName = getLocalStorage('enterpriseName');
            this.getUserInfo();
        },
        mounted() {
            this.ready = !0;
        },
        components: {
            'footerBar': footer
        },
        methods: {
            getUserInfo() {
                getUserTipInfo(this).then((response) => {
                    Indicator.close();
                    this.ready = !0;
                    var data = response.body.data;
                    this.info = data;
                }, (error) => {
                    this.ready = !0;
                    Indicator.close();
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            },
            ...mapActions([
                'changeFocus'
            ])
        }
    }
</script>

<style lang="less">
    @size : 37.5rem;
    body {
        background-color: #f8f8f8;
    }
    
    .user {
        .top-banner {
            height: 190/@size;
            background: url("../../images/usercenter/bg_banner.png") center no-repeat;
            background-size: 100%;
            overflow: hidden;
            position: relative;
        }
        .wrapInfo {
            text-align: center;
            margin: 30/@size auto;
        }
        img {
            width: 83/@size;
            height: 83/@size;
        }
        .btn_config {
            width: 104/@size;
            height: 33/@size;
            text-align: center;
            font-size: 13/@size;
            background: transparent;
            outline: none;
            display: block;
            margin: 16/@size auto 0;
            color: #fff;
            border-radius: 5/@size;
            border: 1px solid #f1f1f1;
            letter-spacing: 1px;
            line-height: 2.7;
        }
        .username {
            display: block;
            margin-top: 6/@size;
            margin-bottom: 0;
            font-size: 16/@size;
            color: #fff;
        }
        .enterpriseName {
            color: #fff;
            width: 260/@size;
            font-size: 12/@size;
            text-align: center;
            margin: 6/@size auto;
        }
        .myOrder {
            background-color: #fff;
            width: 100%;
            .all {
                border-bottom: 1px solid #ebebeb;
            }
            a {
                padding: 10/@size;
                display: block;
                font-size: 15/@size;
                color: #666;
                transition: all .218s;
                display: block;
                position: relative;
                span {
                    position: absolute;
                    right: 10/@size;
                    top: 0;
                    bottom: 0;
                    display: block;
                    background-image: url(../../images/icon_next_back.png);
                    background-repeat: no-repeat;
                    background-position: right center;
                    background-size: 8/@size auto;
                    width: 8/@size;
                    height: 100%;
                }
                &:active {
                    background-color: #f8f8f8;
                }
            }
            .four {
                width: 100%;
                text-align: center;
                overflow: hidden;
                ul {
                    display: flex;
                    li {
                        flex: 1;
                        a {
                            padding: 12/@size 0;
                            font-size: 14/@size;
                            color: #333;
                            position: relative;
                            h3 {
                                color: #fe7e7a;
                                font-size: 16/@size;
                                padding-bottom: 4/@size;
                            }
                            &:before {
                                content: "";
                                position: absolute;
                                right: -1px;
                                width: 1px;
                                top: 20/@size;
                                bottom: 20/@size;
                                background-color: #ebebeb;
                            }
                        }
                    }
                }
            }
        }
    }
    
    .into-list {
        margin-top: 6/@size;
        background-color: #fff;
        width: 100%;
        overflow: hidden;
        li {
            float: left;
            width: 100%;
            position: relative;
            border-bottom: 1px solid #ebebeb;
            a {
                overflow: hidden;
                padding: 10/@size;
                display: block;
                transition: all .218s;
                vertical-align: middle;
                i {
                    float: left;
                    width: 33/@size;
                    height: 30/@size;
                    background-repeat: no-repeat;
                    background-image: url("../../images/usercenter/usercenter_icon.png");
                    background-size: 282/@size 33/@size;
                    &.address {
                        background-position: -125/@size -2/@size
                    }
                    &.kf {
                        background-position: -156/@size 0/@size
                    }
                    &.often_list {
                        background-position: -256/@size 0/@size
                    }
                    &.often_shop {
                        background-position: -226/@size 0/@size
                    }
                    &.set {
                        background-position: -192/@size -2/@size
                    }
                }
                p {
                    float: left;
                    line-height: 30/@size;
                }
                &:active {
                    background-color: #f8f8f8;
                }
            }
            span {
                position: absolute;
                right: 10/@size;
                top: 0;
                bottom: 0;
                display: block;
                background-image: url(../../images/icon_next_back.png);
                background-repeat: no-repeat;
                background-position: right center;
                background-size: 6/@size auto;
                width: 6/@size;
                height: 100%;
            }
            &.notice {
                &:before {
                    content: "";
                    position: absolute;
                    width: 6/@size;
                    height: 6/@size;
                    right: 24/@size;
                    top: 50%;
                    margin-top: -3/@size;
                    border-radius: 6/@size;
                    background-color: #f00;
                }
            }
        }
    }
</style>