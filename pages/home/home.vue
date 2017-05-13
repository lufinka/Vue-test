<template>
  <div class="app">
  <div class="topbar">
  <city :target="province"></city>
  <search></search>
  </div>
   <slides :slideData="slideData"></slides>
   <transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
   <notice :target="target"></notice>
   </div>
</template>

<script>
    import {
        Toast,
        TabContainer,
        TabContainerItem
    } from 'mint-ui';
    import {
        headers,
        mainH5Province,
        listIndexFloorNew
    } from '@/service/getDate';
    headers.station = '000000';
    import slides from '@/components/slide';
    import notice from '@/components/notice';
    import city from '@/components/city';
    import search from '@/components/search';
    export default {
        data() {
            return {
                slideData: [], //焦点图数据
                target: [], //到货通知
                province:[] //城市列表数据
            }
        },
        created() {
            this.getSlideData();
            this.getProvince();
        },
        components: {
            slides,
            notice,
            city,
            search
        },
        methods: {
            noticeEvent(arg) {
                this.target.push(arg);
            },
            getSlideData() {
                listIndexFloorNew(this).then((response) => {
                    this.slideData = response.body.data.bannerList;
                }, (error) => {
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            },
            getProvince(){
                mainH5Province(this).then((response) => {
                    this.province = response.body.data;
                }, (error) => {
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
    @body_bgcolor: #f7f7f7;
    * {
        box-sizing: border-box;
    }
    .topbar{
        position: fixed;
        display: flex;
        top: 9/@size;
        height: 32/@size;
        left: 0;
        right: 0;
        z-index: 7;
    }
    body {
        background-color: @body_bgcolor;
    }
    
    .arrow_right {
        fill: #999;
        width: 20px;
        height: 20px;
        color: #000;
    }
    
    .ui-title {
        height: 42/@size;
        display: flex;
        padding: 0 10/@size;
        align-items: center;
        justify-content: space-between;
        h2 {
            display: inline-block;
            color: #333;
            font-size: 14/@size;
        }
        a {
            display: block;
            color: #999;
            height: 42/@size;
            line-height: 42/@size;
            font-size: 11/@size;
            padding: 0 10/@size;
            background-image: url(../../images/home/more@2x.png);
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 6/@size auto;
        }
    }
    
    .notice {
        &_shadow {
            background-color: rgba(0, 0, 0, .3);
            position: fixed;
            z-index: 9;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
        &_box {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            right: 0;
            height: 195/37.5rem;
            width: 100%;
            background-color: #f8f8f8;
            .btn_close {
                height: 50/37.5rem;
                text-align: right;
                i {
                    display: inline-block;
                    height: 50/37.5rem;
                    width: 50/37.5rem;
                    background-image: url(../../images/close.svg);
                    background-size: 24/37.5rem 24/37.5rem;
                    background-position: 20/37.5rem 10/37.5rem;
                    background-repeat: no-repeat;
                }
            }
            .phone_val {
                width: 100%;
                box-sizing: border-box;
                padding: 0 25/37.5rem;
                text-align: center;
                input {
                    width: 100%;
                    padding: 0;
                    height: 44/37.5rem;
                    text-align: center;
                    border: 1px solid #d8d8d8;
                    font-size: 18/37.5rem;
                }
                em {
                    font-size: 12/37.5rem;
                    color: #333;
                    height: 40/37.5rem;
                    line-height: 40/37.5rem;
                }
            }
        }
        &_btn {
            margin-top: 16/37.5rem;
            width: 100%;
            height: 45/37.5rem;
            text-align: center;
            color: #fff;
            font-size: 15/37.5rem;
            line-height: 45/37.5rem;
            background: linear-gradient(90deg;
            #ff5b3b, #fe403b);
        }
    }
</style>