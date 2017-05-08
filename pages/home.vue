<template>
  <div class="app">
   <slides :slideData="slideData"></slides>
   <div class="nav-wrapper">
       <ul>
           <li><a href="#">
               <img src="../images/home/nav1@2x.png" alt="">
               <p>中西成药</p>
           </a></li>
           <li><a href="#">
               <img src="../images/home/nav2@2x.png" alt="">
               <p>医疗器械</p>
           </a></li>
           <li><a href="#">
               <img src="../images/home/nav3@2x.png" alt="">
               <p>中药药材</p>
           </a></li>
           <li><a href="#">
               <img src="../images/home/nav4@2x.png" alt="">
               <p>保健食品</p>
           </a></li>
       </ul>
   </div>
   <div class="special-wrapper">
       <div class="special-title">
           <h2>首推特价</h2>
           <a href="#">更多</a>
       </div>
       <div class="special-cont">
           <ul>
               <li v-for="item in special">
                   <product :special="item"></product>
               </li>
           </ul>
       </div>
   </div>
   <div class="purchas-wrapper">
       <ul>
           <li><a href="#"><img src="../images/ll_banner.jpg" alt=""></a></li>
           <li><a href="#" class="mr"><img src="../images/ll_banner.jpg" alt=""></a><a class="ml" href="#"><img src="../images/ll_banner.jpg" alt=""></a></li>
       </ul>
   </div>
   <div class="bussines">
     <div class="bussines-wrapper">
      <div class="bussines-title">
          推荐商业
      </div>
      <div class="bussines-tabs">
          <ul>
              <li @click="active = tab-container1">1</li>
              <li @click="active = tab-container2">2</li>
              <li @click="active = tab-container3">3</li>
          </ul>
      </div>
       <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-container1">
    <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
  </mt-tab-container-item>
  <mt-tab-container-item id="tab-container2">
    <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
  </mt-tab-container-item>
  <mt-tab-container-item id="tab-container3">
    <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
  </mt-tab-container-item>
</mt-tab-container>
  </div>
   </div>
   <notice :target="target"></notice>
   <add-car :target="addCartarget"></add-car>
   </div>
</template>

<script>
    import {
        Toast,
        TabContainer,
        TabContainerItem
    } from 'mint-ui';
    import {
        headers
    } from '@/service/getDate.js';
    headers.station = '000000';
    import slides from '@/components/slide';
    import product from '@/components/product';
    import notice from '@/components/notice';
    import addCar from '@/components/addCar';
    export default {
        data() {
            return {
                target: [],
                active: 'tab-container2',
                addCartarget: [],
                slideData: [],
                special: [{
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "30555",
                    "factoryName": "测试-药品生产企业",
                    "productCodeCompany": "xiaxiandong001",
                    "productId": "114260",
                    "productName": "xiaxiandong01",
                    "productPicUrl": "https://p8.maiyaole.com//fky/img/default_picture_344.jpg",
                    "productPrice": 0,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "testxia",
                    "spuCode": "1000500AAAH170001",
                    "statusDesc": -1,
                    "stepCount": 5,
                    "stockCount": 999877,
                    "unit": "粒",
                    "vendorId": "32494",
                    "vendorName": "测试-批发企业"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "30555",
                    "factoryName": "测试-药品生产企业",
                    "productCodeCompany": "20170118",
                    "productId": "114260",
                    "productName": "xiaxiandong01",
                    "productPicUrl": "https://p8.maiyaole.com//fky/img/default_picture_344.jpg",
                    "productPrice": 0,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "testxia",
                    "spuCode": "1000500AAAH170001",
                    "statusDesc": -2,
                    "stepCount": 1,
                    "stockCount": 150,
                    "unit": "粒",
                    "vendorId": "33176",
                    "vendorName": "测试批发企业-使用中1"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "31953",
                    "factoryName": "修正药业股份有限公司",
                    "productCodeCompany": "lytest05",
                    "productId": "102817",
                    "productName": "二陈丸",
                    "productPicUrl": "https://p8.maiyaole.com//fky/img/default_picture_344.jpg",
                    "productPrice": 0.01,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "修正药业股份有限公司",
                    "spuCode": "0435AABZ150001",
                    "statusDesc": -3,
                    "stepCount": 1,
                    "stockCount": 5173,
                    "unit": "板",
                    "vendorId": "33186",
                    "vendorName": "lytest03"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "21992",
                    "factoryName": "蓬莱诺康药业有限公司",
                    "productCodeCompany": "20161103003",
                    "productId": "109357",
                    "productName": "利巴韦林喷雾剂",
                    "productPicUrl": "https://p8.maiyaole.com///fky/img/1480386282516.jpg",
                    "productPrice": 0.03,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "400mg",
                    "spuCode": "105347",
                    "statusDesc": -4,
                    "stepCount": 1,
                    "stockCount": 43,
                    "unit": "盒",
                    "vendorId": "33047",
                    "vendorName": "德康行（上海）国际贸易有限公司"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "29879",
                    "factoryName": "测试-药品生产企业1",
                    "productCodeCompany": "12121212",
                    "productId": "122566",
                    "productName": "王辉测试单品+多品满送积分",
                    "productPicUrl": "https://p8.maiyaole.com//fky/img/default_picture_344.jpg",
                    "productPrice": 1,
                    "productPromotion": {
                        "sort": 1,
                        "promotionType": "1",
                        "promotionState": "0",
                        "status": "0",
                        "minimumPacking": 1,
                        "enterpriseId": "32494",
                        "groupCode": "324941126317767",
                        "beginTime": 1491926400,
                        "limitNum": -1,
                        "spuCode": "2016101801BABS160001",
                        "endTime": 1525795200,
                        "promotionPrice": 1.00,
                        "promotionId": "13524",
                        "promotionName": "测试新搜素特价",
                        "currentInventory": -1,
                        "sumInventory": -1
                    },
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "shortName": "",
                    "spec": "11",
                    "spuCode": "2016101801BABS160001",
                    "statusDesc": -5,
                    "stepCount": 1,
                    "sellerCode": '12800',
                    "stockCount": 0,
                    "unit": "粒",
                    "vendorId": "32494",
                    "vendorName": "测试-批发企业"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "21298",
                    "factoryName": "湖南明瑞制药有限公司",
                    "productCodeCompany": "S02487",
                    "productId": "106571",
                    "productName": "替硝唑片",
                    "productPicUrl": "https://p8.maiyaole.com///fky/img/20161111/21195.jpg",
                    "productPrice": 0.5,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "0.5g*8片",
                    "spuCode": "130641",
                    "statusDesc": -6,
                    "stepCount": 3,
                    "stockCount": 7771,
                    "unit": "盒",
                    "vendorId": "12800",
                    "vendorName": "山东优益药业有限公司"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "20592",
                    "factoryName": "山东鲁抗医药股份有限公司",
                    "productCodeCompany": "869",
                    "productId": "103159",
                    "productName": "注射用氨苄西林钠",
                    "productPicUrl": "https://p8.maiyaole.com///fky/img/20161111/4975.jpg",
                    "productPrice": 0.55,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "0.5g",
                    "spuCode": "132671",
                    "statusDesc": -7,
                    "stepCount": 1,
                    "stockCount": 2000,
                    "unit": "盒",
                    "vendorId": "33371",
                    "vendorName": "山东诺安诺泰药业有限公司"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "20592",
                    "factoryName": "山东鲁抗医药股份有限公司",
                    "productCodeCompany": "774",
                    "productId": "103076",
                    "productName": "注射用青霉素钠",
                    "productPicUrl": "https://p8.maiyaole.com//fky/img/default_picture_344.jpg",
                    "productPrice": 0.6,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "160万单位",
                    "spuCode": "136996",
                    "statusDesc": 0,
                    "stepCount": 50,
                    "stockCount": 5000,
                    "unit": "支",
                    "vendorId": "33371",
                    "vendorName": "山东诺安诺泰药业有限公司"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "21084",
                    "factoryName": "江苏黄河药业股份有限公司",
                    "productCodeCompany": "S01194",
                    "productId": "108921",
                    "productName": "罗红霉素胶囊",
                    "productPicUrl": "https://p8.maiyaole.com//fky/img/default_picture_344.jpg",
                    "productPrice": 0.7,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "sellerCode": "12800",
                    "shortName": "",
                    "spec": "0.15g*10s",
                    "spuCode": "104092",
                    "statusDesc": 0,
                    "stepCount": 3,
                    "stockCount": 7777,
                    "unit": "盒",
                    "vendorId": "12800",
                    "vendorName": "山东优益药业有限公司"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "20979",
                    "factoryName": "上海海虹实业(集团)巢湖今辰药业有限公司",
                    "productCodeCompany": "S05963",
                    "productId": "107834",
                    "productName": "羟苯磺酸钙胶囊",
                    "productPicUrl": "https://p8.maiyaole.com//fky/img/default_picture_344.jpg",
                    "productPrice": 0.73,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "shortName": "",
                    "spec": "0.25g*48s",
                    "spuCode": "107773",
                    "statusDesc": 0,
                    "stepCount": 3,
                    "stockCount": 7777,
                    "unit": "盒",
                    "vendorId": "12800",
                    "vendorName": "山东优益药业有限公司"
                }, {
                    "baseCount": 1,
                    "drugformType": "",
                    "factoryId": "20762",
                    "factoryName": "吉林省集安益盛药业股份有限公司",
                    "productCodeCompany": "S04049",
                    "productId": "105511",
                    "productName": "香丹注射液",
                    "productPicUrl": "https://p8.maiyaole.com///fky/img/20161125/53538.jpg",
                    "productPrice": 0.85,
                    "productPromotion": null,
                    "productPromotionGifts": null,
                    "productPromotionInfos": null,
                    "promotionList": null,
                    "shortName": "",
                    "spec": "10ml*5支",
                    "spuCode": "132532",
                    "statusDesc": 0,
                    "stepCount": 3,
                    "stockCount": 7774,
                    "unit": "盒",
                    "vendorId": "12800",
                    "vendorName": "山东优益药业有限公司"
                }]
            }
        },
        created() {
            this.$http({
                'url': '/manage/api/mobileIndex/listIndexFloor',
                params: {
                    type: 3
                },
                headers: headers
            }).then((response) => {
                console.log(response)
            }, (error) => {
                Toast({
                    message: error,
                    position: 'bottom',
                    duration: 2000
                });
            })
        },
        components: {
            slides,
            product,
            notice,
            addCar
        },
        methods: {
            noticeEvent: function(arg) {
                this.target.push(arg);
            },
            shopCar: function(arg) {
                this.addCartarget.push(arg);
            }
        }
    }
</script>

<style lang="less">
    @import "//unpkg.com/mint-ui/lib/style.css";
    @size : 37.5rem;
    @body_bgcolor: #f7f7f7;
    * {
        box-sizing: border-box;
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
                    background-image: url(../images/close.svg);
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
    
    .nav-wrapper {
        width: 100%;
        box-shadow: 0 1px 4px 0 #EEEEEE;
        background-color: #fff;
        ul {
            width: 100%;
            display: flex;
        }
        li {
            float: left;
            flex: 1;
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
                display: inline-block;
            }
            p {
                font-size: 13/@size;
                color: #666;
                display: inline-block;
                height: 13/@size;
                padding: 7/@size 0 0;
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
        .special-title {
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
                background-image: url(../images/home/more@2x.png);
                background-repeat: no-repeat;
                background-position: right center;
                background-size: 6/@size auto;
            }
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
            img {
                width: 100%;
                height: 100%;
            }
            a {
                flex: 1;
                display: block;
                width: 100%;
                height: 100%;
                &.mr {
                    padding-right: 1.5/@size;
                }
                &.ml {
                    padding-left: 1.5/@size;
                }
            }
            &:last-child {
                margin-top: 3/@size;
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
    }
</style>