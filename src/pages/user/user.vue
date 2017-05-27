<template>
<div class="user">
    <section class="top-banner">
        <div class="wrapInfo">
            <img src="../../images/usercenter/user_header.png" alt="">
            <div class="username">{{nick}}</div>
            <div class="enterpriseName">{{enterpriseName}}</div>
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
                   <router-link to="/order">
                    <h3>0</h3>
                    <p>待付款</p>
                    </router-link>
                </li>
                <li>
                   <router-link to="/order">
                    <h3>0</h3>
                    <p>待发货</p>
                    </router-link>
                </li>
                <li>
                   <router-link to="/order">
                    <h3>0</h3>
                    <p>待收货</p>
                    </router-link>
                </li>
                <li>
                   <router-link to="/order">
                    <h3>0</h3>
                    <p>拒收&#92;补货</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
    <div class="into-list">
        <ul>
            <li>
               <router-link to="/address" class="address">
                  <i></i>
                   <p>收货地址</p>
                   <span></span>
               </router-link>
            </li>
            <li>
               <a href="tel:4009215767">
                  <i></i>
                   <p>联系客服</p>
                   <span></span>
               </a>
            </li>
            <li class="notice">
               <router-link to="/often_list" class="often_list">
                  <i></i>
                   <p>常购清单</p>
                   <span></span>
               </router-link>
            </li>
            <li>
               <router-link to="/often_shop" class="often_shop">
                  <i></i>
                   <p>常购商家</p>
                   <span></span>
               </router-link>
            </li>
            <li>
               <router-link to="/set" class="set">
                  <i></i>
                   <p>设置</p>
                   <span></span>
               </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
    import {
        Toast,
        Indicator
    } from 'mint-ui';
    import {
        getLocalStorage
    } from '@/service/tool';
    import {
        getUserTipInfo
    } from '@/service/getDate';
    export default {
        data() {
            return {
                ready: !1,
                info: {},
                nick: '',
                enterpriseName: ''

            }
        },
        created() {
            Indicator.open();
            this.nick = getLocalStorage('username');
            this.enterpriseName = getLocalStorage('enterpriseName');
            this.getUserInfo();
        },
        components: {},
        methods: {
            getUserInfo() {
                getUserTipInfo(this).then((response) => {
                    Indicator.close();
                    var data = response.body.data;
                    this.ready = !0;
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
            }
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
                padding: 10/@size;
                display: block;
                transition: all .218s;
                vertical-align: middle;
                i{
                    display: inline-block;
                width: 33/@size;
                height: 36/@size;
                background-repeat: no-repeat;
                background-position: 10/@size center;
                background-image: url("../../images/usercenter/usercenter_icon.png");
                background-size:282/@size 33/@size;
                &.address{
                    background-position: -125/@size 3/@size
                }
                    }
                
                    p{
                        display: inline-block;
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
                background-size: 8/@size auto;
                width: 8/@size;
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