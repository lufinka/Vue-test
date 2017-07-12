<template>
    <div class="product-wrapper">
    <div class="promotion-title" v-show="special.statusDesc == 0 && (special.productDrug.productPromotion || special.productDrug.productPromotionInfos)">
        <div class="promotion-info"  v-if="inow == 0">
           <i>抢</i>
           <p>{{countDown}}</p>
        </div>
        <div class="promotion-info"  v-else-if="inow == 1 && special.productDrug.productPromotionInfos">
           <i>减</i>
           <p v-for="item in special.productDrug.productPromotionInfos">
            <span v-if="item.promotion_type=='2'||item.promotion_type=='3'">
                {{item.promotionDesc | limmitNum}}
            </span>
            </p>
         </div>
          <div class="promotion-info"  v-else-if="inow == 2">
          <div v-if="special.productDrug.productPromotionInfos">
           <i>赠</i>
           <p v-for="item in special.productDrug.productPromotionInfos">
            <span v-if="item.promotion_type=='5'||item.promotion_type=='6'||item.promotion_type=='7'||item.promotion_type=='8'">
                {{item.promotionDesc | limmitNum}}
            </span>
            </p>
            </div>
            <div v-else-if="special.productDrug.productPromotion && special.productDrug.productPromotion.end_time">
               <i>抢</i>
               <p>{{countDown}}</p>
            </div>
         </div>
        <div class="saleNumber">销量：{{special.productDrug.sales_total | saleCount}}{{special.productDrug.unit_cn}}</div>
    </div>
    <router-link :to="'info/'+special.productDrug.idd+'/'+special.productDrug.seller_code">
        <div class="product-photo"><img v-lazy="special.productDrug.pic_path" alt=""></div>
        <div class="product-text">
            <h2>{{special.productDrug.short_name}}&nbsp;{{special.productDrug.spec}}</h2>
            <h3><img src="../images/home/factory.png" alt="">{{special.productDrug.factory_name_cn}}</h3>
            <h4 v-if="special.statusDesc == 0">
                <div v-if="special.productDrug.productPromotion && special.productDrug.productPromotion.promotion_id != 0" class="price">
                    <p class="product_price"><span>采购价</span>&yen;<em>{{special.productDrug.productPromotion.promotion_price | priceInt}}</em>{{special.productDrug.productPromotion.promotion_price | priceFloat}}</p>
                    <p class="old_price">&yen;{{special.productDrug.showPrice | price}}</p>
                </div>
                <div v-else class="price">
                    <p class="product_price"><span>采购价</span>&yen;<em>{{special.productDrug.showPrice | priceInt}}</em>{{special.productDrug.showPrice | priceFloat}}</p>
                </div>

                <button @click.stop.prevent="addShopCar" class="btn btn_add_list">去抢购</button>
            </h4>
            <h4 v-else-if="special.statusDesc == -1">
                <div class="price">
                </div>
                <router-link to="login" class="btn btn_login">登录</router-link>
            </h4>
            <h4 v-else-if="special.statusDesc == -2">
                <div class="price">
                </div>
                <button class="btn_warning btn" @click.stop.prevent="addChannel">加入渠道</button>
            </h4>
            <h4 v-else-if="special.statusDesc == -3">
                <div class="price">
                </div>
                <button class=" btn_warning btn" @click.stop.prevent>资质未认证</button>
            </h4>
            <h4 v-else-if="special.statusDesc == -4">
                <div class="price">
                </div>
                <button class="btn btn_warning" @click.stop.prevent>渠道待审核</button>
            </h4>
            <h4 v-else-if="special.statusDesc == -5">
                <div v-if="special.productDrug.productPromotion && special.productDrug.productPromotion.promotionId != 0" class="price">
                    <p class="product_price"><span>采购价</span>&yen;<em>{{special.productDrug.productPromotion.promotion_price | priceInt}}</em>{{special.productDrug.productPromotion.promotion_price | priceFloat}}</p>
                    <p class="old_price">&yen;{{special.productDrug.showPrice | price}}</p>
                </div>
                <div v-else class="price">
                    <p class="product_price"><span>采购价</span>&yen;<em>{{special.productDrug.showPrice | priceInt}}</em>{{special.productDrug.showPrice | priceFloat}}</p>
                </div>
                <button class="btn_add_list btn" @click.stop.prevent="notice">到货通知</button>
            </h4>
            <h4 v-else-if="special.statusDesc == -6">
                <div class="price">
                </div>
                <button class="btn_warning btn" @click.stop.prevent>无采购权限</button>
            </h4>
            <h4 v-else-if="special.statusDesc == -7">
                <div class="price">
                </div>
                <button class="btn_warning btn" @click.stop.prevent>已下架</button>
            </h4>
            <h4 v-else-if="special.statusDesc == -8">
                <div class="price">
                </div>
                <button class="btn_warning btn" @click.stop.prevent>无采购权限</button>
            </h4>
        </div>
    </router-link>
</div>
</template>

<script>
    import {
        headers,
        applyChannelapi
    } from '@/service/getDate.js';
    export default {
        props: {
            special: {
                type: Object
            },
            sysTime: {
                type: Number
            },
            inow:{
                type: Number
            }
        },
        mounted() {
            var str = '';
            if (this.special.productDrug.productPromotionInfos) {
                var obj = this.special.productDrug.productPromotionInfos;
                for (var i = 0; i < obj.length; i++) {
                    str += obj[i].promotion_id + ",";
                }
                this.$set(this.special,'promotionCollectionIds',str.substring(0, str.length - 1));
                console.log(this.special)
            } else {
                this.$set(this.special,'promotionCollectionIds','');
            }
        },
        computed: {
            countDown() {
                if (this.special.productDrug.productPromotion && this.special.productDrug.productPromotion.end_time) {
                    var diff = this.special.productDrug.productPromotion.end_time * 1000 - this.sysTime;
                    var options = diff / 1000;
                    var day = Math.floor(options / (60 * 60 * 24));
                    var hour = Math.floor(options / (60 * 60)) % 24;
                    var minite = Math.floor(options / 60) % 60;
                    var second = Math.floor(options) % 60;
                    if (Math.floor(parseInt(diff / 1000) / (60 * 60 * 24)) != 0) {
                        this.special.whole = !1;
                        return "还剩" + day + "天" + hour + "小时" + minite + "分" + second + "秒";
                    } else {
                        this.special.whole = !1;
                        return "还剩" + day + "天" + hour + "小时" + minite + "分";
                    }
                }
            }
        },
        components: {},
        methods: {
            countFn() {
                if (this.special.productDrug.productPromotion && this.special.productDrug.productPromotion.end_time) {
                    var diff = this.special.productDrug.productPromotion.end_time * 1000 - this.sysTime;
                    var options = diff / 1000;
                    var day = Math.floor(options / (60 * 60 * 24));
                    var hour = Math.floor(options / (60 * 60)) % 24;
                    var minite = Math.floor(options / 60) % 60;
                    var second = Math.floor(options) % 60;
                    if (Math.floor(parseInt(diff / 1000) / (60 * 60 * 24)) != 0) {
                        this.special.whole = !1;
                        return "还剩" + day + "天" + hour + "小时" + minite + "分" + second + "秒";
                    } else {
                        this.special.whole = !1;
                        return "还剩" + day + "天" + hour + "小时" + minite + "分";
                    }
                }
            },
            notice() {
                var arg = {
                    "spuCode": this.special.productDrug.spu_code,
                    "sellerCode": this.special.productDrug.seller_code,
                };
                this.$parent.$parent.$parent.$parent.noticeEvent(arg);
            },
            addShopCar() {
                var obj = {
                    "productCodeCompany": this.special.productDrug.productcode_company,
                    "spuCode": this.special.productDrug.spu_code,
                    "productId": this.special.productDrug.idd,
                    "productPrice": this.special.productDrug.showPrice,
                    "supplyId": this.special.productDrug.seller_code,
                    "productName": this.special.productDrug.short_name,
                    "promotionId": this.special.productDrug.productPromotion && this.special.productDrug.productPromotion.promotion_id,
                    "promotionCollectionId": this.special.promotionCollectionIds,
                    "manufactures": this.special.productDrug.factory_name_cn,
                    "specification": this.special.productDrug.spec,
                    "productSpec": this.special.productDrug.spec,
                    "promotionlimitNum": this.special.productDrug.productPromotion && this.special.productDrug.productPromotion.limit_num,
                    "inventory": this.special.productDrug.stock_amount,
                    "inimumPacking": this.special.productDrug.minimum_packing
                };
                this.$parent.$parent.$parent.$parent.shopCar(obj);
            },
            addChannel() {
                this.$messageBox.confirm('确定加入渠道?').then(action => {
                    applyChannelapi(this, {
                        spuCode: this.special.spu_code,
                        sellerCode: this.special.seller_code
                    }).then(action => {
                        if (action.body.statusCode == 0) {
                            this.special.statusDesc = '-4';
                        }
                        this.$toast({
                            message: action.body.message,
                            position: 'bottom',
                            duration: 2000
                        });
                    }, error => {
                        console.log(error)
                        this.$toast({
                            message: error,
                            position: 'bottom',
                            duration: 2000
                        });
                    })
                }, cancel => {});
            }
        },
        filters: {
            saleCount(x) {
                if (x / 1000 >= 1) {
                    return parseInt(x / 100) / 100 + '万'
                }
                return x;
            },
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

            },
            priceInt(x) {
                return parseInt(x);
            },
            priceFloat(x) {
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
                var sFloat = s.substring(s.indexOf('.'));
                return sFloat;
            },
            limmitNum(x) {
                return x.length <= 18 ? x : x.substring(0, 18) + '..';
            }
        }
    }
</script>

<style lang="less" scoped>
    @size : 37.5rem;
    .product {
        &-wrapper {
            .promotion-title {
                height: 30/@size;
                background-color: #FFF9F9;
                line-height: 30/@size;
                width: 100%;
                padding: 0 10/@size;
                border: 1px solid #FFE6E6;
                border-width: 1px 0;
                font-size: 12/@size;
                color: #FE403B;
                .promotion-info {
                    float: left;
                    i {
                        float: left;
                        background-image: linear-gradient(-180deg, #F84A73 0%, #FF3C4C 100%);
                        border-radius: 50%;
                        width: 18/@size;
                        height: 18/@size;
                        margin-top: 6px;
                        color: #fff;
                        text-align: center;
                        line-height: 18/@size;
                        margin-right: 4/@size;
                    }
                    p {
                        float: left;
                    }
                }
                .saleNumber {
                    float: right;
                }
            }
            a {
                padding: 10/@size;
                display: block;
                position: relative;
                transition: all .218s linear;
                &:active {
                    background-color: #f7f7f7;
                }
            }
        }
        &-photo {
            width: 70/@size;
            height: 70/@size;
            margin-right: 10/@size;
            position: absolute;
            background-color: #f7f7f7;
            left: 10/@size;
            top: 10/@size;
            ;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        &-text {
            padding-top: 4/@size;
            width: 100%;
            padding-left: 80/@size;
            h2 {
                font-size: 14/@size;
                height: 14/@size;
                line-height: 14/@size;
                overflow: hidden;
                color: #333;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            h3 {
                margin-top: 8/@size;
                height: 14/@size;
                line-height: 14/@size;
                overflow: hidden;
                font-size: 12/@size;
                color: #999;
                white-space: nowrap;
                text-overflow: ellipsis;
                img {
                    height: 100%;
                    font-size: 0;
                    line-height: 0;
                    float: left;
                    margin-right: 4/@size;
                }
            }
            h4 {
                margin-top: 3/@size;
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: space-between;
                .btn_login {
                    display: block;
                    text-align: center;
                    padding: 0;
                }
                .btn {
                    font-size: 11/@size;
                    box-shadow: 0 2px 4px 0 rgba(254, 64, 59, 0.50);
                    border-radius: 4px;
                    width: 77/@size;
                    height: 27/@size;
                    line-height: 27/@size;
                    background-image: linear-gradient(-180deg, #F84A73 0%, #FF3C4C 100%);
                    &_add_list,
                    &_login {
                        color: #fff;
                    }
                    &_warning {
                        background-image: linear-gradient(0deg, #EEEEEE 0%, #FFFFFF 100%);
                        box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.50);
                        color: #999;
                    }
                }
                .price {
                    color: #FE403B;
                    font-size: 12px/@size;
                    .product_price {
                        display: inline-block;
                        span {
                            font-size: 11/@size;
                            color: #999;
                            padding-right: 4/@size;
                        }
                        em {
                            font-size: 16/@size;
                            padding-left: 2/@size;
                        }
                    }
                    .old_price {
                        display: inline-block;
                        padding-left: 4/@size;
                        font-size: 12/@size;
                        text-decoration: line-through;
                        color: #999;
                    }
                }
            }
        }
    }
</style>