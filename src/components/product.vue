<template>
    <div class="product-wrapper">
       <a :href="'info?productId='+special.productId+'&enterpriseId='+special.productSupplyId">
        <div class="product-photo"><img v-lazy="special.productPicUrl" alt=""></div>
        <div class="product-text">
            <h2>{{special.productName}}&nbsp;{{special.spec}}</h2>
            <h3><img src="../images/home/factory.png" alt="">{{special.factoryName}}</h3>
            <h4 v-if="special.statusDesc == 0">
                <div v-if="special.productPromotion && special.productPromotion.promotionId != 0"  class="price">
                                <p class="product_price"><span>采购价</span>&yen;<em>{{special.productPromotion.promotionPrice | priceInt}}</em>{{special.productPromotion.promotionPrice | priceFloat}}</p>
                                <p class="old_price">&yen;{{special.productPrice | price}}</p>
                             </div>
                           <div  v-else class="price">
                                <p class="product_price"><span>采购价</span>&yen;<em>{{special.productPrice | priceInt}}</em>{{special.productPrice | priceFloat}}</p>
                                </div>
                        <button @click.stop.prevent="addShopCar" class="btn btn_add_list">
                            去抢购</button>
                             </h4>
                        <h4 v-else-if="special.statusDesc == -1">
                        <div class="price">
                        </div>
                        <router-link to="login" class="btn btn_login">登录</router-link>
                        </h4>
                        <h4 v-else-if="special.statusDesc == -2">
                        <div class="price">
                        </div>
                        <button class="btn_warning btn" @click.stop.prevent="addChannel" >加入渠道</button>
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
                            <div v-if="special.productPromotion && special.productPromotion.promotionId != 0"  class="price">
                                <p class="product_price"><span>采购价</span>&yen;<em>{{special.productPromotion.promotionPrice | priceInt}}</em>{{special.productPromotion.promotionPrice | priceFloat}}</p>
                                <p class="old_price">&yen;{{special.productPrice | price}}</p>
                             </div>
                           <div  v-else class="price">
                                <p class="product_price"><span>采购价</span>&yen;<em>{{special.productPrice | priceInt}}</em>{{special.productPrice | priceFloat}}</p>
                                </div>
                        <button class="btn_add_list btn" @click.stop.prevent="notice">到货通知</button>
                        </h4>
                        <h4 v-else-if="special.statusDesc == -6">
                        <div class="price">
                        </div>
                        <button class="btn_warning btn" @click.stop.prevent>不可购买</button>
                        </h4>
                        <h4 v-else-if="special.statusDesc == -7">
                        <div class="price">
                        </div>
                        <button class="btn_warning btn" @click.stop.prevent>已下架</button>
            </h4>
        </div>
        </a>
    </div>
</template>

<script>
    import {
        
        MessageBox
    } from 'mint-ui';
    import {
        headers
    } from '@/service/getDate.js';
    export default {
        props: {
            special: {
                type: Object
            }
        },
        components: {},
        methods: {
            notice: function() {
                this.$parent.noticeEvent(this.special);
            },
            addShopCar: function() {
                this.$parent.shopCar(this.special);
            },
            addChannel: function() {
                MessageBox.confirm('确定加入渠道?').then(action => {
                    this.$http.post('mall/api/applyChannelapi', {
                        spuCode: this.special.spuCode,
                        sellerCode: this.special.vendorId
                    }, {
                        headers: headers
                    }).then(action => {
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
            price: function(x) {
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
            priceInt: function(x) {
                return parseInt(x);
            },
            priceFloat: function(x) {
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
                var sFloat = s.substring(1);
                return sFloat;
            }
        }
    }
</script>

<style lang="less" scoped>
    @size : 37.5rem;
    .product {
        &-wrapper {
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
            background-color: #ddd;
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
    
    img[lazy=loading] {
        width: 40% !important;
        display: block;
        height: 100%;
        margin: 0 auto;
    }
</style>