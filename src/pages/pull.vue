<template>
    <div>
       <div class="promotion-wrapper">
       <div class="promotion-title">
        <div class="promotion-tabs">
          <ul>
              <li v-for="(item,index) in promotionNav" :key="index" @click="active = 'tab-container'+(index+1)" :class="{actived:active == 'tab-container'+(index+1)}"><p v-text="item.shortName || item.shopName"></p></li>
          </ul>
      </div>
      <div class="listAll">全部</div>
      </div>
      <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item  v-for="(item,index) in promotionList" :key="index" :id="'tab-container'+(index+1)">
      <div class="promotion-cont" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :bottom-method="loadBottom" :autoFill="isfill"  @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded[index]" ref="loadmore">
         <ul>
             <li v-for="(p,index) in item" :key="index">
                  {{item[index]}}
             </li>
         </ul>
         <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus[index] !== 'loading'" :class="{ 'is-rotate': bottomStatus[index] === 'drop' }">↑</span>
          <span v-show="bottomStatus[index] === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div class="promotion-cont empty"  v-if="empty[index]">
              <p>暂无数据</p>
          </div>
      </mt-loadmore>
      </div>
  </mt-tab-container-item>
</mt-tab-container>
    </div>
<add-car :target="addCartarget" ref="addscar"></add-car>
      </div>
</template>

<script>
    import {
        Toast,
        Loadmore,
        TabContainer,
        TabContainerItem,
        Indicator
    } from 'mint-ui';
    import {
        queryDrugByPageForAll
    } from '@/service/getDate';
    import testProduct from '@/components/testProduct';
    import products from "@/service/products";
    import addCar from '@/components/addCar';
    console.log(products)
    export default {
        data() {
            return {
                promotionNav: [{
                    shortName: "抢购",
                    shopName: "抢购"
                }, {
                    shortName: "满减",
                    shopName: "满减"
                }, {
                    shortName: "满赠",
                    shopName: "满赠"
                }],
                total: [5, 50, 60],
                promotionType: 7,
                sysTime: 0,
                addCartarget: {}, //加入购物车对象
                once: [!0, !1, !1],
                empty: [!1, !1, !1],
                timer: null,
                promotionList: [
                    [],
                    [],
                    []
                ],
                isfill:false,
                active: 'tab-container1',
                nowIndex: 0,
                allLoaded: [!1,!1,!1,],
                limmit: [5, 50, 60],
                pageNow: [1, 1, 1],
                wrapperHeight: 0,
                bottomStatus: ['', '', '']
            }
        },
        created() {
            this.getData(0);
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper[0].getBoundingClientRect().top;
        },
        watch: {
            active(x, y) {
                var n = x.substring(x.length - 1);
                if (n == 1) {
                    this.promotionType = 4;
                    this.nowIndex = 0;
                } else if (n == 2) {
                    this.promotionType = 5;
                    this.nowIndex = 1;
                } else {
                    this.promotionType = 7;
                    this.nowIndex = 2;
                }
                if (this.once[n - 1] == !1) {
                    this.once[n - 1] = !0;
                    this.getData(n - 1);
                }
            },
            route(x, y) {
                console.log(x, y)
            }
        },
        methods: {
            getData(num) {
                for (let i = 1; i <= 5; i++) {
                    this.promotionList[num].push(i);
                }
            },
            handleBottomChange(status) {
                this.bottomStatus[this.nowIndex] = status;
            },
            loadBottom() {
                
                    console.log(this.nowIndex)
                setTimeout(() => {
                    console.log(this.$refs.loadmore[this.nowIndex])
                    let lastValue = this.promotionList[this.nowIndex].length;
                    if (lastValue+1 < this.limmit[this.nowIndex]) {
                        for (let i = 1; i <= 10; i++) {
                            this.promotionList[this.nowIndex].push(lastValue + i);
                        }
                    } 
                    console.log(lastValue)
                    if(lastValue+10 >= this.limmit[this.nowIndex]){
                        this.allLoaded[this.nowIndex] = !0;
                    }
                    this.$refs.loadmore[this.nowIndex].onBottomLoaded();
                }, 1500);
            }
        },
        components: {
            testProduct,
            addCar
        }
    }
</script>

<style scoped lang="less">
    @size : 37.5rem;
    @body_bgcolor: #f7f7f7;
    .empty p {
        text-align: center;
        padding: 20/@size 0 30/@size;
        color: #999;
        font-size: 14/@size;
    }
    
    .mint-loadmore-bottom {
        span {
            display: inline-block;
            transition: .2s linear;
            vertical-align: middle;
            &.is-rotate {
                transform: rotate(180deg);
            }
        }
    }
    
    ul {
        overflow: hidden;
    }
    
    .promotion- {
        &wrapper {
            background-color: #fff;
            margin-top: 300px;
        }
        &cont {
            overflow: scroll;
            li{
                width: 100%;
                padding: 15px;
                border-bottom: 1px solid #ddd;
                text-align: center;
            }
        }
        &title {
            width: 100%;
            height: 42/@size;
            line-height: 42/@size;
            .listAll {
                width: 25%;
                float: right;
                text-align: center;
                font-size: 13/@size;
                color: #666;
            }
        }
        &tabs {
            float: left;
            li {
                float: left;
                padding: 0 24/@size;
                font-size: 13/@size;
                color: #666;
                transition: all .218s linear;
                p {
                    padding: 0 6/@size;
                    position: relative;
                    &:before {
                        transition: all .218s linear;
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background-color: #FE403B;
                        transform: rotateY(90deg);
                    }
                }
                &:active {
                    background-color: #f7f7f7;
                }
                &.actived {
                    color: #FE403B;
                    p {
                        &:before {
                            transform: rotateY(0);
                        }
                    }
                }
            }
        }
    }
</style>