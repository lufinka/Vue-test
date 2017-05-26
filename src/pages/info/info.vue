<template>
<div v-if="ready">
<div class="info" v-if="info.productName && info.productId">
    <div class="info-header">
        <div class="cont">
            <section class="head_goback" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-fanhui"></use>
            </svg>
            </section>
            <div class="info-tabs">
                <ul>
                    <li @click="active = 'tab-container1'" :class="{actived:active == 'tab-container1'}">商品</li>
                    <li v-show="info.storyList.length" @click="active = 'tab-container2'" :class="{actived:active == 'tab-container2'}">品牌故事</li>
                    <li @click="active = 'tab-container3'" :class="{actived:active == 'tab-container3'}">说明书</li>
                </ul>
            </div>
            <div class="info-handle">
                <div class="dottle" @click="showTool = !showTool">
                    <span></span>
                    <span></span>
                    <span></span>
                    <div class="toggle-tool" v-if="showTool">
                        <div class="cont">
                            <i></i>
                            <router-link to="/home">
                                <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-home"></use>
                        </svg>
                                <p>首页</p>
                            </router-link>
                            <router-link to="/search">
                                <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-searchlist"></use>
                        </svg>
                                <p>搜索</p>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <mt-tab-container v-model="active">
        <mt-tab-container-item id="tab-container1">
            <div class="slide-box">
                <slides :slideData="slideData"></slides>
            </div>
            <section class="info_list">
                <div class="info_cont">
                    <section>
                        <h4>{{info.productName}}&nbsp;&nbsp;{{info.spec}}</h4>
                        <div class="price" v-if="info.statusDesc == 0 || info.statusDesc == -5">
                            <p v-if="info.statusDesc != -5 && info.productPromotion && info.productPromotion.promotionId != 0">
                                <span class="new"><i>￥</i>{{info.productPromotion.promotionPrice | price}}</span>
                                <span class="old">￥{{info.productPrice | price}}</span>
                                <span v-if="info.productPromotion" class="sale_type_tj" data-type="特价"></span>
                                <span v-else class="new"><i>￥</i>{{info.productPrice | price}}</span>
                            </p>
                            <p v-else>
                                <span class="new"><i>￥</i>{{info.productPrice | price}}</span>
                            </p>
                            <span class="sale_limmit_num">起售{{info.baseCount}}</span>
                        </div>
                    </section>
                </div>
            </section>
            <div class="info_list" v-if="info.statusDesc == 0 && info.filteredPromotionList != null && info.filteredPromotionList.length > 0">
                <!-- 满减优惠文描 -->
               <div v-for="(item,index) in info.filteredPromotionList" :key="index">
                <a v-if="item.promotionType ==1 || item.promotionType ==2 || item.promotionType ==3 && item.productPromotionRules!=null" :class="{look_promotionInfo:index == 0}">
                        <div :class="{sale_tips:index == 0,sale_tips_1:index == 0}" data-type="满减">
                            <p>
                               {{item.promotionDesc}} 
                            </p>
                    </div>
                </a>
                <a v-else-if="item.promotionType ==7 || item.promotionType ==8" :class="{look_promotionInfo:index == 0}">
                    <div :class="{sale_tips:index == 0,sale_tips_1:index == 0}" data-type="满赠">
                        <p>{{item.promotionDesc}}</p>
                    </div>
                </a>
                <a v-else-if="item.promotionType ==5 || item.promotionType ==6" :class="{look_promotionInfo:index == 0}">
                    <div :class="{sale_tips:index == 0,sale_tips_1:index == 0}" data-type="满赠">
                        <p>{{item.promotionDesc}}</p>
                    </div>
                </a>
                </div>
            </div>
            <section class="info_list">
                <ul class="product_base_info">
                    <li class="item">
                        <p>
                            <span class="name">库存</span>
                            <span class="value">
                            {{ info.stockCount >500 ? ">500" : info.stockCount}}
                            </span>
                        </p>
                    </li>
                    <li class="item">
                        <p>
                            <span class="name">最小拆零包装</span>
                            <span class="value">{{ info.stepCount }}{{info.unit}}</span>
                        </p>
                    </li>
                    <li class="item">
                        <p>
                            <span class="name">供应商</span>
                            <span class="value">{{ info.vendorName }}</span>
                        </p>
                    </li>
                    <li class="item">
                        <p>
                            <span class="name">生产厂商</span>
                            <span class="value">{{ info.factoryName }}</span>
                        </p>
                    </li>
                    <li class="item">
                        <p>
                            <span class="name">批准文号</span>
                            <span class="value">{{ info.approvalNum }}</span>
                        </p>
                    </li>
                    <li class="item">
                        <p>
                            <span class="name">商品名</span>
                            <span class="value">{{info.productName}}</span>
                        </p>
                    </li>
                </ul>
            </section>
            <section class="info_list info_last_list">
                <dl class="product_base_info product_rights">
                    <dt class="item item_title">权益保障</dt>
                    <dd class="item certified">
                        <span class="main">100%正品</span>
                        <span class="explain">完整资质认证</span>
                        <a href="#" title="查看资质" class="btn_look">查看资质</a>
                    </dd>
                    <dd class="item service">
                        <span class="main">金牌服务</span>
                        <span class="explain">销售物流售后率表现高于同行</span>
                    </dd>
                    <dd class="item terrace">
                        <span class="main">平台认证</span>
                        <span class="explain">已获得1号药城专业认证</span>
                    </dd>
                </dl>
            </section>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2" v-show="info.storyList.length">
            <div class="product_intro_img">
        	<img v-for="(item,index) in info.storyList" :key="index" src="../../images/null.jpg" v-lazy="item" alt="">
        	</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
    <div class="product_instr">
                <section>
                    <div class="product_header">
                        <h3 class="product_name">{{info.productName }}说明书</h3>
                        <p class="point">请仔细阅读说明书，按医生指导购买和服用！</p>
                    </div>
                    <div class="product_ext_info">
                        <dl>
                            <dt class="type">商品名称</dt>
                            <dd class="detail">
                                <span>通用名称</span>
                                <span class="name">{{info.ext.commonName }}</span>
                            </dd>
                            <dd class="detail">
                                <span>汉语拼音</span>
                                <span class="name">{{info.ext.commonNamePinyin }}</span>
                            </dd>
                            <dd class="detail">
                                <span>商品名称</span>
                                <span class="name">{{info.productName }}</span>
                            </dd>
                        </dl>
                    </div>
                </section>
                <ul class="product_ext_info">
                    <li>
                        <section>
                            <p class="type">成分</p>
                            <p class="detail">
                                <span>{{info.ext.incredinet }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">性状</p>
                            <p class="detail">
                                <span>{{info.ext.character }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">作用类别</p>
                            <p class="detail">
                                <span>{{info.ext.actionType }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">适应症</p>
                            <p class="detail">
                                <span>{{info.ext.adaptationDisease }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">用法用量</p>
                            <p class="detail">
                                <span>{{info.ext.directions }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">不良反应</p>
                            <p class="detail">
                                <span>{{info.ext.untowardEffect }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">禁忌</p>
                            <p class="detail">
                                <span>{{info.ext.taboo }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">注意事项</p>
                            <p class="detail">
                                <span>{{info.ext.announcements }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">药物相互作用</p>
                            <p class="detail">
                                <span>{{info.ext.drugInteractions }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">贮藏</p>
                            <p class="detail">
                                <span>{{info.ext.storage }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">包装</p>
                            <p class="detail">
                                <span>{{info.ext.pack }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">有效期</p>
                            <p class="detail">
                                <span>{{info.ext.expiryDate }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">执行标准</p>
                            <p class="detail">
                                <span>{{info.ext.carriedStandard }}</span>
                            </p>
                        </section>
                    </li>
                    <li>
                        <section>
                            <p class="type">说明书修订日期</p>
                            <p class="detail">
                                <span>{{info.ext.manualRevisionDate }}</span>
                            </p>
                        </section>
                    </li>
                </ul>
            </div>
    </mt-tab-container-item>
    </mt-tab-container>
    <div class="add_container">
       <div class="add_footer table">
           <div class="cell">
             <router-link v-if="info.vendorId==8353" class="shop_page" to="/shop" >
              <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shop"></use>
                    </svg>
               <p>店铺</p>
               </router-link>
               <router-link v-else to="/shop"  class="shop_page">
              <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shop"></use>
                    </svg>
               <p>店铺</p>
               </router-link>
           </div>
           <div class="cell">
              <router-link to="/shopCar" class="car_num">
               <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shopcar"></use>
               </svg>
               <i class="shop_count" :style=" {display: shopCar_count>0?'inline-block':'none'}">{{shopCar_count}}</i>
               <p>购物车</p>
               </router-link>
           </div>
           <div class="cell btn_counm">
               <button  v-if="info.statusDesc == 0" @click.stop.prevent="addShopCar" class="btn_product_public btn_add_list">去抢购</button>
                <router-link v-else-if="info.statusDesc == -1" to="/login" class="btn_product_public">登录</router-link>
                <button v-else-if="info.statusDesc == -2" class="btn_product_public btn_add_channel" @click.stop.prevent="addChannel">加入渠道</button>
                <button v-else-if="info.statusDesc == -3" class="btn_product_off btn_check_qualification" @click.stop.prevent>资质未认证</button>
                <button v-else-if="info.statusDesc == -4" class="btn_product_off" @click.stop.prevent>渠道待审核</button>
                <button v-else-if="info.statusDesc == -5" class="btn_product_off btn_lack" @click.stop.prevent="notice">到货通知</button>
                <button v-else-if="info.statusDesc == -6" class="btn_product_off" @click.stop.prevent>不可购买</button>
                <button v-else-if="info.statusDesc == -7" class="btn_product_off" @click.stop.prevent>已下架</button>
           </div>
       </div>
        </div>
        <add-shop-car :target="addCartarget" ref="addscar"></add-shop-car>
        <notice :target="target"></notice>
</div>
<div v-else class="noData">
    <p>无该商品信息</p>
</div>
</div>
</template>

<script>
    import {
        Toast,
        TabContainer,
        MessageBox,
        Indicator,
        TabContainerItem,
    } from 'mint-ui';
    import {
        cartAccount,
        applyChannelapi,
        getProductDetail
    } from '@/service/getDate';
    import slides from '@/components/slide';
    import notice from '@/components/notice';
    import addShopCar from '@/components/addShopCar';
    import * as tool from '@/service/tool';
    export default {
        data() {
            return {
                active: 'tab-container1',
                showTool: !1,
                addCartarget: {}, //加入购物车对象
                target: [], //到货通知
                info: {},
                ready:!1,
                count: 0,
                shopCar_count: 0, //购物车数量
                slideData: [{
                    "imgPath": "/images/default.jpg",
                    "url": "javascript:;"
                }] //焦点图数据
            }
        },
        created() {
            Indicator.open();
            this.getDetail(this.$route.params.productId, this.$route.params.enterpriseId);
            this.getsShopcarNum();
        },
        methods: {
            noticeEvent() {
                var obj = {
                    "spuCode": this.info.spuCode,
                    "sellerCode": this.info.vendorId * 1,
                };
                this.target.push(obj);
            },
            addShopCar() {
                var obj = {
                    "productCodeCompany": this.info.productCodeCompany,
                    "spuCode": this.info.spuCode,
                    "productId": this.info.productId,
                    "productCount": this.count,
                    "productPrice": this.info.productPrice,
                    "supplyId": this.info.vendorId,
                    "productName": this.info.productName,
                    "promotionId": this.info.mPromotionId,
                    "promotionCollectionId": this.info.mPromotionCollectionId,
                    "manufactures": this.info.factoryName,
                    "specification": this.info.spec,
                    "productSpec": this.info.unit,
                    "inventory": this.info.stockCount,
                    "promotionlimitNum": this.info.productPromotion ? this.info.productPromotion.limitNum : '',
                    "inimumPacking": this.info.productPromotion ? this.info.productPromotion.minimumPacking : this.info.stepCount
                };
                this.addCartarget = obj;
                this.$refs.addscar.ishow = !0;
            },
            getDetail(productId, enterpriseId) {
                getProductDetail(this, {
                    productId: productId,
                    enterpriseId: enterpriseId
                }).then((response) => {
                    this.ready = !0;
                    Indicator.close();
                    var data = response.body.data;
                    this.info = data;
                    //console.log(response.body)
                    if (data.picList.length) {
                        this.slideData = data.picList;
                    }
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
            addChannel: function() {
                MessageBox.confirm('确定加入渠道?').then(action => {
                    applyChannelapi(this, {
                        spuCode: this.info.productId,
                        sellerCode: this.info.vendorId
                    }).then(action => {
                        if (action.body.statusCode == 0) {
                            this.special.statusDesc = '-4';
                        }
                        Toast({
                            message: action.body.message,
                            position: 'bottom',
                            duration: 2000
                        });
                    }, error => {
                        console.log(error)
                        Toast({
                            message: error,
                            position: 'bottom',
                            duration: 2000
                        });
                    })
                }, cancel => {});
            },
            getsShopcarNum(){
            if (!tool.getLocalStorage("token")) return false;
            cartAccount(this).then((response) => {
                this.shopCar_count = response.body.data.count;
                }, (error) => {
                    Toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
        }
        },
        filters: {
            price(x) {
                var f = parseFloat(x);
                if (isNaN(f)) {
                    return false;
                }
                var f = Math.round(x * 100) / 100;
                var s = f.toString();
                var rs = s.indexOf('.');
                if (rs < 0) {
                    rs = s.length;
                    s += '.';
                }
                while (s.length <= rs + 2) {
                    s += '0';
                }
                return s;

            }
        },
        components: {
            slides,
            notice,
            addShopCar
        }
    }
</script>

<style lang="less" scoped>
    @size : 37.5rem;
    .table {
        display: table
    }
    
    .cell {
        display: table-cell;
        vertical-align: middle;
    }
    
    .add_container {
        box-shadow: 0 0 5px rgba(0, 0, 0, .3);
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        height: 54/@size;
        padding: 0 9/@size;
        background-color: #fff;
        z-index: 3;
        .shop_page,
        .car_num {
            display: block;
            height: 54/@size;
            padding: 9/@size 0;
            font-size: 11/@size;
            position: relative;
            .shop_count {
                position: absolute;
                height: 16/@size;
                min-width: 16/@size;
                line-height: 17/@size;
                left: 50%;
                top: 4/@size;
                background: red;
                padding: 0 2/@size;
                color: #fff;
                text-align: center;
                font-size: 12/@size;
                border-radius: 15/@size;
                letter-spacing: 1px;
                display: none;
            }
            .icon {
                font-size: 20/@size;
            }
        }
        .add_footer {
            text-align: center;
            width: 100%;
            .btn_counm {
                width: 218/@size;
            }
        }
        .btn_product_off,
        .btn_product_public {
            display: inline-block;
            text-align: center;
            width: 218/@size;
            height: 35/@size;
            line-height: 35/@size;
            font-size: 15/@size;
            background-image: linear-gradient(-180deg, #FF5B3B 0%, #FE403B 100%);
            box-shadow: 0 2px 8px 0 rgba(254, 64, 59, 0.50);
            border-radius: 4px;
            color: #FFFFFF;
        }
        .btn_product_off {
            background-image: linear-gradient(-180deg, #CAC8C8 0%, #A19F9F 100%);
            box-shadow: 0px 2px 8px 0px rgba(120, 111, 111, 0.50);
        }
    }
    
    .noData {
        text-align: center;
        padding-top: 40/@size;
        color: #bbb;
    }
    
    body {
        background-color: #f8f8f8;
    }
    
    .info {
        padding-top: 41/@size;
    }
    
    .slide-box {
        height: 440/@size;
    }
    
    .info- {
        &header {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 99;
            height: 40/@size;
            border-bottom: solid 1px #ebedec;
            background-color: #fff;
            .cont {
                width: 100%;
                height: 100%;
                position: relative;
                text-align: center;
                .head_goback {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 45/@size;
                    padding: 0 15/@size;
                    .icon {
                        font-size: 26/@size;
                        height: 40/@size;
                    }
                }
            }
        }
        &tabs {
            display: inline-block;
            height: 40/@size;
            line-height: 40/@size;
            li {
                float: left;
                padding: 0 8/@size;
                height: 38/@size;
                line-height: 38/@size;
                &.actived {
                    color: #e60012;
                    border-bottom: 2/@size #e60012 solid;
                }
            }
        }
        &handle {
            position: absolute;
            right: 0;
            top: 0;
            width: 60/@size;
            padding: 0 15px/@size;
            height: 40/@size;
            .dottle {
                width: 30/@size;
                margin-left: 15/@size;
                position: relative;
                span {
                    margin: 18/@size 3/@size;
                    float: left;
                    display: block;
                    width: 4/@size;
                    height: 4/@size;
                    border-radius: 50%;
                    background-color: #505050;
                }
                .toggle-tool {
                    position: absolute;
                    top: 48/@size;
                    right: -5/@size;
                    background-color: #fff;
                    width: 93/@size;
                    height: 84/@size;
                    background: #fafafa;
                    box-shadow: 0px 5/@size 10/@size 0px rgba(0, 0, 0, 0.20);
                    border-radius: 3px;
                    z-index: 1000;
                    transition: all 0.5s;
                    .cont {
                        position: relative;
                        i {
                            position: absolute;
                            top: -8/@size;
                            right: 8/@size;
                            width: 0;
                            height: 0;
                            border-bottom: 10/@size solid #fafafa;
                            border-left: 10/@size solid transparent;
                            border-right: 10/@size solid transparent;
                        }
                        a {
                            float: left;
                            display: block;
                            font-size: 12/@size;
                            width: 100%;
                            height: 40/@size;
                            border-bottom: 2/@size solid #f7f7f7;
                            color: #030303;
                            line-height: 12/@size;
                            text-align: center;
                            line-height: 40/@size;
                            letter-spacing: 1px;
                            vertical-align: middle;
                            .icon {
                                display: inline-block;
                                color: #8f8e93;
                                font-size: 18/@size;
                            }
                            p {
                                display: inline-block;
                                padding-left: 4/@size;
                            }
                        }
                    }
                }
            }
        }
    }
    
    .product_name {
        margin-bottom: 16/@size;
        font-size: 14/@size;
        font-weight: 400;
    }
    
    .point {
        color: #999999;
        font-size: 12/@size;
    }
    
    .product_intro_img {
        padding-bottom: 60/@size;
        img {
            width: 100%;
        }
    }
    
    .info_list {
        margin-bottom: 5/@size;
        background-color: #fff;
        .info_cont {
            position: relative;
            padding: 10/@size;
            border-bottom: 1px solid #EEE;
            h4 {
                margin-bottom: 8/@size;
                font-size: 15/@size;
                color: #333333;
                line-height: 20/@size;
                font-weight: 400;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        }
        .item {
            position: relative;
            padding-left: 15/@size;
            margin-right: 15/@size;
            min-height: 43/@size;
            line-height: 43/@size;
            font-size: 13/@size;
            color: #333;
        }
        .info_last_list {
            margin-bottom: 117/@size;
        }
        .btn_look {
            display: inline-block;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 73/@size;
            height: 25/@size;
            line-height: 21/@size;
            font-size: 11/@size;
            text-align: center;
            border: 1px solid #FE403B;
            border-radius: 2px;
            color: #FE403B;
            &:after {
                display: inline-block;
                content: "";
                height: 9px;
                width: 5px;
                line-height: 28/@size;
                margin-left: 4px;
                background: url(../../images/product/icon_right.png) center/contain no-repeat;
                color: #FE403B;
            }
        }
        li {
            overflow: auto;
            border-bottom: .5px solid #EEEEEE;
            .name {
                display: inline-block;
                width: 35%;
                color: #8F8E94;
                float: left;
            }
            .value {
                float: left;
                width: 65%;
                min-height: 43/@size;
            }
        }
        .item_title {
            margin-left: 15/@size;
            padding-left: 0;
            border-bottom: .5px solid #EEEEEE;
        }
    }
    
    .price {
        overflow: hidden;
        .new {
            font-size: 20/@size;
            color: #FE403B;
            i {
                font-size: 12/@size;
            }
        }
        .old {
            font-size: 11/@size;
            color: #999999;
            text-decoration: line-through;
        }
        .sale_type_tj,
        .sale_type_mz,
        .sale_type_mj {
            display: inline-block;
        }
        p {
            float: left;
        }
        .sale_limmit_num {
            color: #666;
            float: right;
            padding-top: 6/@size;
            font-size: 11/@size;
        }
    }
    
    .sale_type_tj,
    .sale_type_mz,
    .sale_type_mj {
        position: relative;
        width: 30/@size;
        display: inline-block;
        height: 14/@size;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        font-weight: 100;
    }
    
    .sale_active_type {
        height: 14/@size;
    }
    
    .sale_type_tj:before,
    .sale_type_mz:before,
    .sale_type_mj:before {
        content: attr(data-type);
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 30/@size;
        height: 14/@size;
        font-size: 10/@size;
        line-height: 16/@size;
    }
    
    .sale_type {
        &_tj {
            background-image: linear-gradient(90deg;
            #80DEEA, #41CBDB);
        }
        &_mz {
            background-image: linear-gradient(90deg;
            #FFC470, #FFB54C);
        }
        &_mj {
            background-image: linear-gradient(90deg;
            #FFA083, #FF7E56);
        }
    }
    
    .sale_active_type {
        padding: 4/@size 0 2/@size;
        span {
            font-weight: normal;
            display: inline-block;
        }
    }
    
    .product_rights {
        margin-bottom: 62/@size;
        dd.item {
            margin-left: 15/@size;
        }
        .main {
            padding-left: 10/@size;
        }
        .explain {
            padding-left: 5/@size;
            color: #8F8E94;
            font-size: 11/@size;
        }
        .certified {
            background: url("../../images/product/icon_certified.png") left no-repeat;
            background-size: 20/@size;
        }
        .service {
            background: url("../../images/product/icon_service.png") left no-repeat;
            background-size: 20/@size;
        }
        .terrace {
            background: url("../../images/product/icon_terrace.png") left no-repeat;
            background-size: 20/@size;
        }
    }
    
    .product_instr {
        section {
            background-color: #fff;
        }
        ul.product_ext_info {
            margin-bottom: 127/@size;
            background-color: #f4f4f4;
        }
        ul.product_ext_info.product_ext_change {
            margin-bottom: 70/@size;
        }
        .product_header {
            padding: 22/@size 0;
            text-align: center;
        }
        .product_ext_info {
            box-sizing: border-box;
            .type {
                text-indent: 10/@size;
                padding-left: 0;
                font-size: 13/@size;
                line-height: 37/@size;
                color: #000;
                &:after {
                    display: block;
                    content: "";
                    height: 1px;
                    width: 100%;
                    background-color: #ebedec;
                }
            }
            dl {
                padding: 0 10/@size;
            }
            dd.detail {
                line-height: 30/@size;
                .name {
                    margin-left: 40/@size;
                }
            }
            .detail {
                padding: 10/@size 0 10/@size 10/@size;
                font-size: 12/@size;
                color: #666666;
            }
            li {
                padding: 10/@size 10/@size 0;
                background-color: #fff;
            }
        }
    }
</style>