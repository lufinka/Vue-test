<template>
    <div class="goods">
    <a :href="'/product.html?productId='+good.productId+'&enterpriseId='+good.vendorId">
    <div class="img">
        <img v-lazy="good.imgPath" alt="">
    </div>
    <h2>{{good.productName}}&nbsp;{{good.productSpec}}</h2>
    <h4 v-if="good.statusDesc == 0">
        <div v-if="good.productPromotion && good.productPromotion.promotionId != 0" class="price">
            <p class="product_price">&yen;<em>{{good.productPromotion.promotionPrice | priceInt}}</em>{{good.productPromotion.promotionPrice | priceFloat}}</p>
            <p class="old_price">&yen;{{good.productPrice | price}}</p>
        </div>
        <div v-else class="price">
            <p class="product_price">&yen;<em>{{good.productPrice | priceInt}}</em>{{good.productPrice | priceFloat}}</p>
        </div>
    </h4>
    <h4 v-else-if="good.statusDesc == -1">
               <p class="prompt">登录后后可见</p>
    </h4>
    <h4 v-else-if="good.statusDesc == -2">
               <p class="prompt">加入渠道后可见</p>
    </h4>
    <h4 v-else-if="good.statusDesc == -3">
        <p class="prompt">资质认证后可见</p>
    </h4>
    <h4 v-else-if="good.statusDesc == -4">
        <p class="prompt">渠道审核后可见</p>
    </h4>
    <h4 v-else-if="good.statusDesc == -5">
        <p class="prompt">缺货</p>
    </h4>
    <h4 v-else-if="good.statusDesc == -6">
        <p class="prompt">无采购权限</p>
    </h4>
    <h4 v-else-if="good.statusDesc == -7">
        <p class="prompt">已下架</p>
    </h4>
    </a>
</div>
</template>

<script>
    export default {
        props: {
            good: {
                type: Object
            }
        },
        components: {},
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
                var sFloat = s.substring(s.indexOf('.'));
                return sFloat;
            }
        }
    }
</script>

<style scoped lang="less">
    @size : 37.5rem;
    .ellipsis() {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .goods {
        width: 100%;
        a {
            display: block;
            padding: 0 20/@size;
            height: 210/@size;
            text-align: center;
            transition: all .218s linear;
            &:active {
                background-color: #f7f7f7;
            }
            .img {
                margin-top: 8/@size;
                height: 120/@size;
                width: 120/@size;
                background-color: #eee;
                img {
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                }
            }
            h2 {
                text-align: left;
                font-size: 12/@size;
                line-height: 16/@size;
                color: #666;
                margin-top: 9/@size;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                height: 32/@size;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
            h4 {
                margin-top: 8/@size;
                text-align: left;
                .btn_login {
                    display: block;
                    text-align: center;
                    padding: 0;
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
                .prompt {
                    font-size: 11/@size;
                    color: #999;
                }
            }
        }
    }
    
</style>