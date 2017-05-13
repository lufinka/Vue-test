<template>
    <div class="city-wrapper">
        <h2 @click="toggleList">{{area}}</h2>
          <transition name="fade">
           <div v-show="ishow" class="city-list">
              <div class="city-cont">
               <ul>
                   <li v-for="(item,index) in target" :key="index"  @click="switchCity(item)">{{item.substationName}}</li>
               </ul>
               </div>
           </div>
        </transition>
        </div>
</template>

<script>
    import {
        Toast
    } from 'mint-ui';
    import {
        getLocalStorage,
        setLocalStorage
    } from '../service/tool.js';
    var area = getLocalStorage('stationName');

    import {
        isCommonOrPilotSite
    } from '@/service/getDate';
    export default {
        props: {
            target: {
                type: Array
            }
        },
        data() {
            return {
                ishow: !1,
                area: area || '默认'
            }
        },
        methods: {
            toggleList() {
                this.ishow = this.ishow == !1 ? !0 : !1;
            },
            switchCity(target) {
                this.area = target.substationName;
                this.ishow = !1;
                this.switchPage();
            },
            switchPage(){
                isCommonOrPilotSite(this,{
                    station:this.area
                }).then((response) => {
                    if(response.body.data.status == 0){
                        //通用
                        setLocalStorage('stationName',this.area);
                    }else{
                        //试点
                        setLocalStorage('stationName',this.area);
                    }
                }, (error) => {
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            }
        },
        components: {}
    }
</script>

<style scoped lang="less">
    @size : 37.5rem;
    .city- {
        &wrapper {
            width: 64/@size;
            float: left;
            height: 32/@size;
            text-align: center;
            position: relative;
            line-height: 32/@size;
            h2 {
                padding: 0 10/@size;
                background: url(../images/index/icon_drop_active.png) right center no-repeat;
                background-size: 8/@size auto;
                display: inline-block;
                font-size: 13/@size;
                color: #fff;
            }
        }
        &list {
            position: absolute;
            background-color: #fff;
            border-radius: 3/@size;
            box-shadow: 0 5/@size 10/@size 0 rgba(0, 0, 0, 0.2);
            top: 34/@size;
            left: 19/@size;
            width: 84/@size;
            li {
                height: 30/@size;
                border-bottom: 1px solid #f7f7f7;
                text-align: center;
                line-height: 2.5;
                font-size: 11/@size;
            }
        }
        &cont {
            width: 100%;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                top: -4/@size;
                left: 13/@size;
                margin-left: -2/@size;
                width: 0;
                height: 0;
                border-bottom: 4/@size solid #fafafa;
                border-left: 4/@size solid transparent;
                border-right: 4/@size solid transparent;
            }
        }
    }
</style>