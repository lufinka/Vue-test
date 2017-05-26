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
      <mt-tab-container-item  v-for="(item,indexNum) in promotionList" :key="indexNum" :id="'tab-container'+(indexNum+1)">
      <div class="promotion-cont" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :bottom-method="loadBottom" :auto-fill="isfill"  @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded[indexNum]" ref="loadmore">
         <ul>
             <li v-for="(p,index) in item" :key="index">
                  <testProduct :special="p" :inow="indexNum" :sysTime="sysTime"  ref="product"></testProduct>
             </li>
         </ul>
         <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus[indexNum] !== 'loading'" :class="{ 'is-rotate': bottomStatus[indexNum] === 'drop' }">↑</span>
          <span v-show="bottomStatus[indexNum] === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div class="promotion-cont empty"  v-if="empty[indexNum]">
              <p>暂无数据</p>
          </div>
      </mt-loadmore>
      </div>
  </mt-tab-container-item>
</mt-tab-container>
    </div>
<add-shop-car :target="addCartarget" ref="addscar"></add-shop-car>
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
    import addShopCar from '@/components/addShopCar';
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
                total: [0, 0, 0],
                promotionType: 4,
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
                active: 'tab-container1',
                nowIndex: 0,
                isfill: false,
                allLoaded: [!1, !1, !1],
                limmit: [0, 0, 0],
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
            this.timer = setInterval(() => {
                this.sysTime += 1000;
            }, 1000);
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
            noticeEvent(arg) {
                this.$parent.noticeEvent(arg);
            },
            shopCar(arg) {
                this.addCartarget = arg;
                this.$refs.addscar.ishow = !0;
            },
            getData(num) {
                Indicator.open();
                queryDrugByPageForAll(this, {
                    siteCode: '420000',
                    promotionType: this.promotionType,
                    pageIndex: this.pageNow[num],
                    pageSize: 5
                }).then((response) => {
                    Indicator.close();
                    if (response.body.data.dataList.length) {
                        this.loading = !1;
                        this.limmit[num] = response.body.data.total;
                        if (this.promotionList[num].length >= this.limmit[num]) {
                            this.empty[num] = !0;
                        }
                        if (response.body.data.dataList[0].statusDesc == -1) {
                            clearTimeout(this.timer);
                        }
                        for (var i = 0; i < response.body.data.dataList.length; i++) {
                            this.promotionList[num].push(response.body.data.dataList[i]);
                            this.sysTime = response.body.data.sysTime;
                        }
                        let lastValue = this.promotionList[num].length;
                        if (lastValue >= this.limmit[num]) {
                            this.allLoaded[num] = !0;
                        }
                    }
                }, (error) => {
                    Indicator.close();
                    this.loading = !1;
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            },
            handleBottomChange(status) {
                this.bottomStatus[this.nowIndex] = status;
            },
            loadBottom() {
                setTimeout(() => {
                    let lastValue = this.promotionList[this.nowIndex].length;
                    if (lastValue < this.limmit[this.nowIndex]) {
                        this.pageNow[this.nowIndex]++;
                        this.getData(this.nowIndex);
                    }
                    console.log(lastValue, this.limmit[this.nowIndex])
                    this.$refs.loadmore[this.nowIndex].onBottomLoaded();
                }, 1500);
            }
        },
        components: {
            testProduct,
            addShopCar
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
        }
        &cont {
            overflow-x: hidden !important;
            overflow-y: scroll !important;
            -webkit-overflow-scrolling: touch !important;
            &::-webkit-scrollbar {
                display: none;
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