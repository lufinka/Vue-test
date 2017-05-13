<template>
    <div>
        <div class="nav-wrapper" v-if="menu && menu.length">
       <ul>
           <li v-for="(item,index) in menu" :key="index"><a :href="item.url">
               <img :src="item.imgPath" alt="">
               <p>{{item.name}}</p>
           </a></li>
       </ul>
   </div>
   <div class="special-wrapper">
       <div class="ui-title">
           <h2>{{special.name}}</h2>
           <a href="#">更多</a>
       </div>
       <div class="special-cont">
           <ul>
               <li v-for="item in special.floorProductDtos">
                   <homeProduct :special="item"></homeProduct>
               </li>
           </ul>
       </div>
   </div>
   <div class="purchas-wrapper">
       <ul>
           <li v-for="(item,index) in add" :key="index" :class="{mr:index==1,ml:index == 2}">
           <a :href="item.url"><img :alt="item.name" :src="item.imgPath" alt=""></a>
           </li>
       </ul>
   </div>
   <div class="bussines">
     <div class="bussines-wrapper">
      <div class="bussines-title">
          推荐商业
      </div>
      <div class="bussines-tabs">
          <ul>
              <li v-for="(item,index) in shopList" :key="index" @click="active = 'tab-container'+(index+1)" :class="{actived:active == 'tab-container'+(index+1)}"><p v-text="item.shortName || item.shopName"></p></li>
          </ul>
      </div>
       <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item  v-for="(item,index) in shopList" :key="index" :id="'tab-container'+(index+1)">
      <company :target="item"></company>
      <div class="bussines-line"></div>
      <div class="bussines-cont">
         <ul>
             <li v-for="(k,index) in item.products" :key="index">
                  <bussine :target="k"></bussine>
             </li>
         </ul>
      </div>
  </mt-tab-container-item>
</mt-tab-container>
  </div>
   </div>
   <div class="list-wrapper" v-for="(item,index) in goodList" :key="index">
       <div class="ui-title">
           <h2>{{item.name}}</h2>
           <a :href="item.url">更多</a>
       </div>
       <div class="list-cont">
           <ul>
               <li v-for="(k,index) in item.floorProductDtos" :key="index">
                   <goods :good="k"></goods>
               </li>
           </ul>
       </div>
   </div>
   <add-shop-car :target="addCartarget" ref="addscar"></add-shop-car>
    </div>
</template>

<script>
    import {
        Toast,
        TabContainer,
        Indicator,
        TabContainerItem
    } from 'mint-ui';
    import {
        listIndexFloor,
        listIndexFloorNew,
        listRecommendShop,
        listRecommendIndexFloor
    } from '@/service/getDate';
    import homeProduct from '@/components/homeProduct';
    import company from '@/components/company';
    import bussine from '@/components/bussine';
    import goods from '@/components/goods';
    import addShopCar from '@/components/addShopCar';
    export default {
        data() {
            return {
                good: [], //商品分类列表
                menu: [], //快速入口数据
                active: 'tab-container1',
                special: [], //首页特价
                add: [], //广告图数据
                addCartarget: {}, //加入购物车对象
                shopList: [], //推荐商业
                goodList: [], //品类列表
            }
        },
        created() {
            this.firstScreen();
            this.addPic();
            this.getShopList();
            this.getGoodList();
        },
        components: {
            homeProduct,
            company,
            addShopCar,
            bussine,
            goods
        },
        methods: {
            noticeEvent(arg) {
                this.$parent.noticeEvent(arg);
            },
            shopCar(arg) {
                this.addCartarget = arg;
                this.$refs.addscar.ishow = !0;
            },
            firstScreen() {
                Indicator.open();
                listIndexFloorNew(this).then((response) => {
                    Indicator.close();
                    this.menu = response.body.data.fastList;
                    this.special = response.body.data.floorProduct[0];
                }, (error) => {
                    Indicator.close();
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            },
            addPic() {
                listIndexFloor(this, {
                    type: 4
                }).then((response) => {
                    this.add = response.body.data;
                }, (error) => {
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            },
            getShopList() {
            listRecommendShop(this,{
                    nowPage: 1,
                    per: 3,
                    queryAll: false
                }).then((response) => {
                    this.shopList = response.body.data.shopList;
                }, (error) => {
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            },
            getGoodList(){
               listRecommendIndexFloor(this, {
                    page:1,
                   size:5,
                   type:5
                }).then((response) => {
                    this.goodList = response.body.data.floors;
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

<style scoped lang="less">
    @size : 37.5rem;
    @body_bgcolor: #f7f7f7;
    * {
        box-sizing: border-box;
    }
    
    .nav-wrapper {
        width: 100%;
        box-shadow: 0 1px 4px 0 #EEEEEE;
        background-color: #fff;
        ul {
            width: 100%;
            overflow: hidden;
        }
        li {
            float: left;
            width: 25%;
            text-align: center;
            a {
                display: block;
                padding: 10/@size 0;
            }
            a:active {
                background-color: #f7f7f7;
            }
            img {
                width: 46/@size;
                height: 46/@size;
                display: inline-block;
            }
            p {
                font-size: 13/@size;
                color: #666;
                display: block;
                width: 100%;
                height: 13/@size;
                line-height: 13/@size;
                margin: 7/@size 0 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    
    .special-wrapper {
        margin-top: 10/@size;
        box-shadow: 0 1px 4px 0 #EEEEEE;
        background-color: #fff;
        width: 100%;
        li {
            float: left;
            width: 100%;
        }
        .special-cont {
            background-color: #fff;
            overflow: hidden;
        }
    }
    
    .purchas-wrapper {
        width: 100%;
        margin-top: 10/@size;
        overflow: hidden;
        li {
            float: left;
            width: 100%;
            display: flex;
            height: 100/@size;
            &:first-child {
                margin-bottom: 3/@size;
            }
            &.mr {
                padding-right: 1.5/@size;
                width: 50%;
            }
            &.ml {
                padding-left: 1.5/@size;
                width: 50%;
            }
            img {
                width: 100%;
                height: 100%;
            }
            a {
                flex: 1;
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    
    .bussines- {
        &wrapper {
            background-color: #fff;
            margin-top: 10/@size;
        }
        &title {
            padding: 14/@size 10/@size;
            color: #333;
            font-size: 14/@size;
        }
        &line {
            height: 2/@size;
            width: 100%;
            padding: 0 15/@size;
            position: relative;
            &:before {
                content: "";
                position: absolute;
                left: 15/@size;
                right: 15/@size;
                top: 0;
                bottom: 0;
                background-color: #eee;
            }
        }
        &tabs {
            width: 100%;
            height: 32/@size;
            line-height: 30/@size;
            text-align: center;
            font-size: 13/@size;
            color: #8F8E94;
            ul {
                width: 100%;
                display: flex;
                li {
                    flex: 1;
                    transition: all .218s linear;
                    height: 32/@size;
                    p {
                        height: 32/@size;
                        display: inline-block;
                        overflow: hidden;
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
        &cont {
            width: 100%;
            ul {
                display: flex;
                li {
                    flex: 1;
                }
            }
        }
    }
    
    .list- {
        &wrapper {
            margin-top: 10/@size;
            background-color: #fff;
        }
        &cont {
            width: 100%;
            ul {
                overflow: hidden;
                li {
                    width: 50%;
                    float: left;
                }
            }
        }
    }
</style>