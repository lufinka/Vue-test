<template>
    <div>
       <div class="promotion-wrapper">
       <div class="promotion-title">
        <div class="promotion-tabs">
          <ul>
              <li v-for="(item,index) in promotionNav" :key="index" @click="active = 'tab-container'+(index+1)" :class="{actived:active == 'tab-container'+(index+1)}"><p v-text="item.shortName || item.shopName"></p></li>
          </ul>
      </div>
      </div>
      <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item  v-for="(item,index) in promotionList" :key="index" :id="'tab-container'+(index+1)">
      <div class="promotion-cont">
         <ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
             <li v-for="(p,index) in item" :key="index">
                  <testProduct :special="p" :sysTime="sysTime"  ref="product"></testProduct>
             </li>
         </ul>
      </div>
          <div class="promotion-cont empty"  v-if="empty[index]">
              <p>暂无数据</p>
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
                }, {
                    shortName: "全部",
                    shopName: "全部"
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
                loading: !1,
                nowIndex:0
            }
        },
        created() {
            this.getData(0);
        },
        mounted() {
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
                    promotionType: 4,
                    pageIndex: 1,
                    pageSize: this.promotionType
                }).then((response) => {
                    Indicator.close();
                    if (response.body.data) {
                        this.loading = !1;
                        if (this.promotionList[num].length) {
                            this.empty[num] = !0;
                        }
                        if (response.body.data.dataList[0].statusDesc == -1) {
                            clearTimeout(this.timer);
                        }
                        for (var i = 0; i < response.body.data.dataList.length; i++) {
                            this.promotionList[num].push(response.body.data.dataList[i])
                            this.sysTime = response.body.data.sysTime;
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
            loadMore() {
                this.loading = !0;
                console.log(1)
                this.loading = !1;
                //this.getData(this.nowIndex);
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
    
    .promotion- {
        &wrapper {
            background-color: #fff;
        }
        &title {
            width: 100%;
            height: 42/@size;
            line-height: 42/@size;
        }
        &tabs {
            width: 100%;
            text-align: center;
            li {
                width: 25%;
                display: inline-block;
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