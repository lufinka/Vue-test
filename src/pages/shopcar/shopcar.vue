<template>
    <div class="shopcar shop_car_container" v-if="ready">
    <div v-if="shopCartList.length">
        <div v-for="(item,index) in shopCartList" :key="index">
            <div class="factory_item" :data-minSalePrice="item.minSalePrice" :data-supplyId="item.supplyId" :data-productTotalPrice="item.productTotalPrice">
                <!-- 厂商 -->
                <section class="factory">
                    <input class="factory_checkall" type="checkbox" v-model="item.checked" @click="selectAll(item)">
                    <i class="select_icon"></i>
                    <div v-if="item.supplyId == 8353" class="factory_name zfactory_name" :data-supplyId="item.supplyId" style="background: none;">{{item.supplyName}}</div>
                    <span v-if="item.supplyId == 8353" class="rules">运费规则？</span>
                    <div v-else class="factory_name" :data-supplyId="item.supplyId">{{item.supplyName}}</div>
                    <div v-if="item.minSalePrice != 0 && item.minSalePrice>item.productTotalPrice" class="contact shop_tips">起批价不低于￥{{item.minSalePrice | price:''}}元</div>

                </section>
                <div v-if="item.supplyId == 8353 && item.freighRuleList.length && item.total <= item.freighRuleList[item.freighRuleList.length-1].upValue" class="add_item">
                    <div v-if="item.total == 0">
                    <span id="add_item"><span class='fl'>运费：<em id='yf'>{{item | postage}}</em>元，<em id='short'>满<i>{{item.freighRuleList[item.freighRuleList.length-1].upValue}}</i></em>元免邮</span></span>
                    <a class="fr" href="/selfstores.html?enterpriseId=8353">去凑单&gt;</a>
                    </div>
                    <div v-else>
                        <span id="add_item"><span class='fl'>运费：<em id='yf'>{{item | postage}}</em>元，<em id='short'>还差<i>{{item.freighRuleList[item.freighRuleList.length-1].upValue-item.total}}</i></em>元免邮</span></span>
                    <a class="fr" href="/selfstores.html?enterpriseId=8353">去凑单&gt;</a>
                    </div>
                </div>
                <!-- 购买商品列表 -->
                <section class="buy_shop_list">
                    <div class="items-list">
                        <ul>
                            <li v-for="(value,index) in item.products" :key="index" :class="{shop_li:value.normalStatus && value.statusDesc == 0}" :data-stork="value.stockCount " :data-min="value.stepCount" :data-productId="value.shoppingCartId" :data-spec="value.spec" :data-factoryName="value.factoryName" :data-vendorId="value.vendorId" :data-vendorName="value.vendorName" :data-spuCode="value.spuCode" :data-shoppingCartId="value.shoppingCartId" :data-disabled=' value.normalStatus && value.statusDesc == 0 ? "" : "1"'>
                                    <div v-if="value.normalStatus" class="checkBox">
                                        <div v-if="value.statusDesc == '0'" class="checkBoxcont">
                                            <input class="checkitem"  v-model="value.checked" @click="selectOne(item,value)" type="checkbox">
                                            <i class="select_icon "></i>
                                        </div>
                                        <div v-else>
                                            <input class="checkitem" :data-disabled='1' type="checkbox" disabled>
                                            <i class="select_icon select_disabled" :data-disabled='1'></i>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <input class="checkitem" :data-disabled='1' type="checkbox" disabled>
                                        <i class="select_icon select_disabled" :data-disabled='1'></i>
                                    </div>
                               <router-link :to="'info/'+value.spuCode+'/'+value.vendorId">
                                <div class="sale_active_info">
                                    <dl v-if="value.statusDesc == '0' && value.filteredPromotionList != null && value.filteredPromotionList.length > 0">
                                        <!-- 满减优惠文描 -->
                                        <a v-for="(itemValue,index) in value.filteredPromotionList" :key="index" class="shop_enter" :data-promotionInfoStr="value.productPromotionInfoStr" :data-enterpriseId="value.vendorId" :data-promotionId="itemValue.promotionId" title="进入店铺">
                                            <dd v-if="itemValue.promotionType ==1 || itemValue.promotionType ==2 || itemValue.promotionType ==3 && itemValue.productPromotionRules!=null " data-type="满减">
                                                <p>
                                                    <span v-if="itemValue.promotionType == 3">多品促销：</span> {{value.rule}}
                                                </p>
                                            </dd>
                                            <dd v-else-if="itemValue.promotionType ==5 || itemValue.promotionType ==6" data-type="满赠">
                                                <p>
                                                    <span v-if="itemValue.promotionType == 6">多品促销：</span> {{value.gitsRule}}
                                                </p>
                                            </dd>
                                            <dd v-else-if="itemValue.promotionType ==7 || itemValue.promotionType ==8" data-type="满赠">
                                                <p>
                                                    <span v-if="itemValue.promotionType == 8">多品促销：</span> {{value.deliveryIntegralRule}}
                                                </p>
                                            </dd>
                                        </a>
                                    </dl>
                                </div>
                                <div class="handel">
                                    <div class="shop_img">
                                            <img :src="value.productPicUrl | defaultImg" alt="商品图片">
                                    </div>
                                    <div class="shop_infor">
                                        <div class="shop_name">
                                            <p data-type="特价" :class="{shop_title:true,sale_type_tj:value.statusDesc == 0 && value.productPromotion && value.productPromotion.promotionId != 0}">{{value.productName}}</p>
                                        </div>
                                        <div class="shop_address">
                                            <span v-if="value.statusDesc == '0'" class="money">￥<em>{{value.productPrice | price}}</em></span>
                                            <span v-if="value.statusDesc == '0'" class="repertory">库存: {{value.stockCount >500 ? '>'+500: value.stockCount }}</span>
                                            <span>{{value.spec}}</span>
                                        </div>
                                    <div class="batch">
                                       <div class="batch_num" :data-vendorId="value.vendorId">{{value.factoryName}}</div>
                                        <div v-if="value.statusDesc == '0'" class="batch_status">
                                            <div class="shop_count" :data-shopcardid=value.shoppingCartId>
                                                <button class="btn_left" @click.stop.prevent="minus(item,value)">-</button>
                                                <input class="num" type="tel" @click.stop.prevent maxlength="6"  @input="changeQuantity(item,value)" v-model="value.quantity">
                                                <button class="btn_right" @click.stop.prevent="add(item,value)">+</button>
                                            </div>
                                        </div>
                                        <div v-else-if="value.statusDesc == '-5'">
                                            <div class="money">缺货</div>
                                        </div>
                                        <div v-else-if="value.statusDesc == '-7'">
                                            <div class="money">已下架</div>
                                        </div>
                                        <div v-else>
                                            <div class="money">不可购买</div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="search_empty">
            <i class="icon_empty"></i>
            <p>
                抱歉,你还没有订单
            </p>
            <router-link to="/home">去首页逛逛</router-link>
        </div>
    </div>
    <div class="container">
      <div class="header-fixed">
       <header data-title="进货单">
       <section class="head_goback" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(0,0,0);stroke-width:2" transform="scale(1.2, 1.2)"/>
            </svg>
        </section>
            <button id="btn_edtor" v-show="shopCartList.length && editStatus" type="button" @click="edit" class="btn_edtor">编辑</button>
            <button id="btn_edtor" v-show="shopCartList.length && !editStatus" type="button" @click="edit" class="btn_edtor">完成</button>
       </header>
       </div>
        <div id="factory_box">

        </div>
        <div id="erro_div" v-if="noDate">
            <div class="result_empty">
                <img src="images/icon_noresult.png" alt="为空" />
                <p class="empty_content">暂无商品</p>
                <p class="">您还可以
                    <router-link to="/home">去首页逛逛</router-link>
                </p>
            </div>
        </div>
    </div>
    <span class="mask"></span>
    <!--规则弹出层-->
    <div class="shopcar_rules" style="display: none;">
        <h2>供应商为广东壹号药业有限公司的需要增加运费，规则如下：</h2>
        <div v-for="(item2,index) in shopCartList" :key="index">
        <div v-if="item2.supplyId == 8353">
            <div v-for="(v,i) in item2.freighRuleList" :key="i">
                <p v-if="i == item2.freighRuleList.length - 1">
                    {{i * 1 + 1}}、订单金额满{{v.upValue}}元，包邮。
                </p>
            </div>
        </div>
        </div>
        <p class="shop_colse">关闭</p>
    </div>
    <footer-bar></footer-bar>
    
        <!-- 购物车结算&删除 -->
        <section class="settlement" v-if="shopCartList.length">
            <div class="checkAll">
                <label for="check_all">
                    全选
                    <input id="check_all" type="checkbox" v-model="allChecked" @click="checkAll">
                    <i class="select_icon"></i>
                </label>
            </div>
            <div class="consult" v-if="editStatus">
                <span class="total_label">
                    合计：
                </span>
                <span class="total_money">{{money | price}}</span>
            </div>
            <div class="shop_kind" v-if="editStatus">
                <span class="shop_label">
                    品种：
                </span>
                <span class="shop_kind_count">{{size}}</span>
            </div>
            <button @click="settle" :class="{btn:true,btn_disabled:money == 0,btn_submit:true}" v-if="editStatus">去结算</button>
            <button @click="deleteDate" :class="{btn:true,btn_disabled:money == 0,btn_delete:true}" v-else>删除</button>
        </section>
</div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import footer from '@/components/footer';
    import {
        headers,
        getShopCartList,
        deleteShopCarts
    } from '@/service/getDate';
    import {
        math
    } from '@/service/math';
    import {
        getLocalStorage
    } from '@/service/tool';
    export default {
        data() {
            return {
                deleteData: {
                    'shoppingCartIdList': []
                },
                ready: !1,
                listData: [],
                shopCartList: [],
                newlistData: [],
                submitData: {},
                allChecked: !1,
                noDate: !1, //无数据
                editStatus: !0 //编辑购物车
            }
        },
        computed: {
            money: function() {
                let count = 0;
                for (let i = 0; i < this.shopCartList.length; i++) {
                    this.shopCartList[i].total = 0;
                    for (let j = 0; j < this.shopCartList[i].products.length; j++) {
                        if (this.shopCartList[i].products[j].checked) {
                            var m = math.numMulti(this.shopCartList[i].products[j].productPrice, this.shopCartList[i].products[j].quantity);
                            this.shopCartList[i].total += m;
                            count += m;
                        }
                    }
                }
                return count;
            },
            size: function() {
                var num = 0;
                for (var i = 0; i < this.shopCartList.length; i++) {
                    for (var j = 0; j < this.shopCartList[i].products.length; j++) {
                        if (this.shopCartList[i].products[j].checked == !0) {
                            num++;
                        }
                    }
                }
                return num;
            }
        },
        watch: {
            shopCartList: {
                handler: function(v, o) {
                    var self = this;
                    if (v) {
                        var bl = v.every(function(item) {
                            return item.products.every(function(value) {
                                return value.checked == v[0].checked;
                            });
                        });
                        console.log(bl)
                        if (bl) {
                            bl = v[0].checked;
                        } else {
                            bl = !1;
                        }
                        this.allChecked = bl;
                    }
                },
                deep: true
            }
        },
        created() {
            this.changeFocus(2);
            this.$indicator.open();
            this.getDate();
        },
        components: {
            'footerBar': footer
        },
        methods: {
            setNum(n) {
                this.setShopCarNum(n);
            },
            selectAll(v) {
                v.checked = !v.checked;
                for (var i = 0; i < v.products.length; i++) {
                    v.products[i].checked = v.checked;
                }
            },
            selectOne(v, t) {
                t.checked = !t.checked;
                var allChecked = v.products.every(function(value) {
                    return value.checked == t.checked;
                });
                if (allChecked) {
                    allChecked = t.checked;
                }
                v.checked = allChecked;
            },
            minus(item, value) {
                if (!value.checked) {
                    this.selectOne(item, value);
                }
                if (value.quantity > 1) {
                    value.quantity--;
                } else {
                    this.selectOne(item, value);
                }
            },
            add(item, value) {
                if (!value.checked) {
                    this.selectOne(item, value);
                }
                value.quantity++;
            },
            changeQuantity(item, value) {
                value.quantity = value.quantity >= value.stockCount ? value.stockCount : value.quantity;
                if (!value.checked) {
                    this.selectOne(item, value)
                }
            },
            checkAll() {
                for (var i = 0; i < this.shopCartList.length; i++) {
                    if (this.shopCartList[i].checked == this.allChecked) {
                        this.shopCartList[i].checked = !this.allChecked;
                    }
                    for (var j = 0; j < this.shopCartList[i].products.length; j++) {
                        if (this.shopCartList[i].products[j].checked == this.allChecked) {
                            this.shopCartList[i].products[j].checked = !this.allChecked;
                        }
                    }
                }
            },
            edit() {
                if (this.editStatus == !0) {
                    this.editStatus = !1;
                } else {
                    this.editStatus = !0;
                }
            },
            settle() {},
            deleteDate() {
                var slef = this;
                var deal = [];
                var data = {
                    shoppingCartIdList: []
                };
                for (var i = 0; i < this.shopCartList.length; i++) {
                    for (var j = 0; j < this.shopCartList[i].products.length; j++) {
                        if (this.shopCartList[i].products[j].checked == !0) {
                            data.shoppingCartIdList.push(this.shopCartList[i].products[j].shoppingCartId + '');
                            deal.push([i, j]);
                        }
                    }
                };
                console.log(deal)
                this.$messageBox.confirm('确定要删除商品吗?').then(action => {
                    this.$http.post('/order/api/cart/deleteShopCarts', data, {
                        headers: headers
                    }).then(action => {
                        this.setNum(deal.length);
                        for (var i = (deal.length - 1); i >= 0; i--) {
                            this.shopCartList[deal[i][0]].products.splice(deal[i][1], 1);
                            if (this.shopCartList[deal[i][0]].products.length == 0) {
                                this.shopCartList.splice(deal[i][0], 1);
                            }
                        }
                        deal = [];
                        this.$toast({
                            message: action.body.message,
                            position: 'bottom',
                            duration: 2000
                        });
                    }, error => {
                        this.$toast({
                            message: error,
                            position: 'bottom',
                            duration: 2000
                        });
                    })
                }, cancel => {});
            },
            isLogin() {
                if (getLocalStorage('token')) {
                    this.noDate = !1;
                } else {
                    this.noDate = !0;
                }
            },
            getDate() {
                getShopCartList(this).then((response) => {
                    this.$indicator.close();
                    var that = this;
                    this.ready = !0;
                    var data = response.body.data;
                    console.log(data, 230)
                    if (data != null) {
                        //保存促销信息
                        for (var i = 0, obj = data.shopCartList; obj && i < obj.length; i++) {
                            obj[i].checked = !1;
                            obj[i].total = 0;
                            for (var j = 0; obj[i].products && j < obj[i].products.length; j++) {
                                obj[i].products[j].checked = !1;
                                obj[i].products[j]['filteredPromotionList'] = that.combinePromotionData(obj[i].products[j].promotionList);
                                if (obj[i].products[j].promotionList) {
                                    obj[i].products[j].productPromotionInfoStr = JSON.stringify(obj[i].products[j].promotionList);
                                } else {
                                    obj[i].products[j].productPromotionInfoStr = '';
                                }
                            }
                        }
                        this.shopCartList = data.shopCartList;
                        //this.shopChange();

                    }
                }, (error) => {
                    this.ready = !0;
                    this.$indicator.close();
                    this.$toast({
                        message: error,
                        position: 'bottom',
                        duration: 2000
                    });
                });
            },
            combinePromotionData(promotions) {
                // 同时存在多品满赠和单品满赠, 只显示单品满赠
                if (promotions && promotions.length > 0) {
                    var promotionList = [];
                    var minusArray = [];
                    var giftArray = [];
                    var scoresArray = [];
                    var singleMinus, singleGift, singleScore;
                    var mutiMinus, mutiGift, mutiScore;
                    promotions.forEach(function(e) {
                        if (e.promotionType == 7 || e.promotionType == 8) {
                            giftArray.push(e);
                            if (e.promotionType == 7) {
                                singleGift = e;
                            } else {
                                mutiGift = e;
                            }
                        } else if (e.promotionType == 5 || e.promotionType == 6) {
                            scoresArray.push(e);
                            if (e.promotionType == 5) {
                                singleScore = e;
                            } else {
                                mutiScore = e;
                            }
                        } else if (e.promotionType == 2 || e.promotionType == 3) {
                            minusArray.push(e);
                            if (e.promotionType == 5) {
                                singleMinus = e;
                            } else {
                                mutiMinus = e;
                            }
                        }

                    });
                    if (giftArray.length > 1) {
                        if (singleGift) {
                            promotionList.push(singleGift);
                        } else {
                            promotionList.push(mutiGift);
                        }
                    } else if (giftArray.length > 0 && giftArray.length <= 1) {
                        promotionList.push(giftArray[0]);
                    }
                    if (scoresArray.length > 1) {
                        if (singleScore) {
                            promotionList.push(singleScore);
                        } else {
                            promotionList.push(mutiScore);
                        }
                    } else if (scoresArray.length > 0 && scoresArray.length <= 1) {
                        promotionList.push(scoresArray[0]);
                    }
                    if (minusArray.length > 1) {
                        if (singleMinus) {
                            promotionList.push(singleMinus);
                        } else {
                            promotionList.push(mutiMinus);
                        }
                    } else if (minusArray.length > 0 && minusArray.length <= 1) {
                        promotionList.push(minusArray[0]);
                    }
                    return promotionList;
                }
            },
            ...mapActions([
                'changeFocus',
                'setShopCarNum'
            ])
        },
        filters: {
            postage: function(s) {
                var t = 0;
                for (var i = 0; i < s.freighRuleList.length; i++) {
                    if (s.total - s.fullReductionMoney >= s.freighRuleList[i].downValue && s.total - s.fullReductionMoney < s.freighRuleList[i].upValue) {
                        t = s.freighRuleList[i].ruleValue;
                    }
                }
                return t
            },
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
            defaultImg(x) {
                return x ? x : '../../images/product/default_picture.jpg';
            }
        }
    }
</script>

<style scoped lang="less">
    @size: 37.5rem;
    @body_bgcolor: #f8f8f8;
    .shop_count {
        float: right;
        width: 140/@size;
        height: 30/@size;
        background: #eee;
        border-radius: 3px;
        .btn_left,
        .btn_right {
            float: left;
            width: 30/@size;
            height: 30/@size;
            height: 100%;
            text-align: center;
            background: #eee;
            border: none;
            outline: none;
        }
        .num {
            float: left;
            padding-left: 2px;
            width: 80/@size;
            height: 100%;
            border: none;
            border-left: 1px solid #fff;
            border-right: 1px solid #fff;
            background: #eee;
            color: #333;
            text-align: center;
        }
    }
    
    .shopcar {
        padding-top: 41/@size;
    }
    
    .hairlines {
        .base_header,
        .factory {
            border-bottom-width: 1px !important;
        }
        .buy_shop_list li {
            border-top-width: 1px !important;
        }
        .num {
            border-left-width: 1px;
            border-right-width: 1px;
        }
    }
    
    .search_empty {
        margin-top: 30%;
        text-align: center;
        .icon_empty {
            display: block;
            margin: 0 auto;
            padding: 86/@size 0 72/@size;
            width: 91/@size;
            height: 132/@size;
            background: url("../../images/icon_empty.png") center/contain no-repeat;
        }
        p,
        span {
            color: #8F8E94;
            font-size: 15/@size;
        }
        a {
            display: inline-block;
            margin-top: 10/@size;
            color: #FE403B;
            font-size: 13/@size;
            text-decoration: underline;
        }
    }
    
    .header-fixed {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 99;
    }
    
    header {
        border-bottom: 1px solid #ccc;
        height: 40/@size;
        line-height: 40/@size;
        text-align: center;
        width: 100%;
        position: relative;
        background: #fff;
        &:after {
            content: attr(data-title);
            position: absolute;
            top: 0;
            left: 55/@size;
            right: 55/@size;
            height: 100%;
            font-weight: normal;
            font-size: 16/@size;
        }
        .btn_edtor {
            padding: 0 20/@size;
            right: 0;
            position: absolute;
            top: 0;
            height: 40/@size;
            background: none;
            font-size: 13/@size;
            color: #333;
            font-weight: bold;
            border: none;
        }
    }
    
    .head_goback {
        padding-top: 8/37.5rem;
        left: 0.4rem;
        width: 40/37.5rem;
        height: 100%;
        line-height: 100%;
        margin-left: .4rem;
    }
    
    .factory {
        padding: 0 10/@size 0 0;
        position: relative;
        background: #fff;
        height: 45/@size;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #edeaea;
        .factory_name {
            flex: 1;
            margin-left: 34/@size;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 20/@size;
            line-height: 20/@size;
            background: url("../../images/icon_store_receive.png") left center no-repeat;
            padding-left: 22/@size;
            padding-right: 65/@size;
            background-size: 20/@size;
            font-size: 13px;
            position: relative;
            &:after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: 17/@size;
                height: 100%;
                background-image: url(../../images/usercenter/icon_go.png);
                background-repeat: no-repeat;
                background-position: center right;
                background-size: 5/@size auto;
                z-index: 88;
            }
        }
        .zfactory_name {
            padding-left: 35/@size;
            &:before {
                content: "自营";
                position: absolute;
                top: 2/@size;
                background: #fe5050;
                color: #fff;
                position: absolute;
                left: 0;
                text-align: center;
                border-radius: 3px 3px;
                font-size: 0.32rem;
                line-height: 17/@size;
                height: 17/@size;
                width: 28/@size;
            }
        }
        .contact {
            font-size: 10/@size;
            color: #666;
        }
    }
    
    .buy_shop_list {
        margin-bottom: 10/@size;
        .sale_active_info {
            box-sizing: border-box;
            width: 100%;
            padding-left: 20/@size;
            background-color: #f8f8f8;
            dd {
                position: relative;
                width: 100%;
                font-size: 10/@size;
                height: 28/@size;
                line-height: 28/@size;
                p {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    float: left;
                    max-width: 100%;
                    display: inline-block;
                    box-sizing: border-box;
                    overflow: hidden;
                    font-size: 10/@size;
                    padding: 0 0 0 40/@size;
                }
                &:before {
                    content: attr(data-type);
                    position: absolute;
                    display: inline-block;
                    left: 0;
                    top: 6/@size;
                    border-radius: 2/@size;
                    width: 32/@size;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 15/@size;
                    font-size: 10/@size;
                    border: 1px solid #fe7e7a;
                    color: #fe7e7a;
                    border-radius: 2px;
                }
                &:after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 10/@size;
                    width: 10/@size;
                    height: 100%;
                    background-image: url(../../images/usercenter/icon_go.png);
                    background-repeat: no-repeat;
                    background-position: center right;
                    background-size: 5/@size auto;
                }
            }
            .promotion_info {
                &:before {
                    display: none;
                    width: 0;
                    border: 0px solid #fe7e7a;
                }
                p {
                    padding: 0 0 0 0;
                    font-size: 10/@size;
                }
            }
        }
        ul {
            background: #fff;
            li {
                border-bottom: 1px solid @body_bgcolor;
                position: relative;
                .checkBox {
                    height: 102/@size;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 20/@size;
                    .checkBoxcont {
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }
                }
            }
        }
        .handel {
            padding: 0 10/@size 0 15/@size;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 115/@size;
            position: relative;
            height: 102/@size;
            &:last-child {
                border-bottom: none;
            }
            .shop_img {
                position: absolute;
                top: 50%;
                margin-top: -35/@size;
                left: 34/@size;
                margin-right: 10/@size;
                width: 70/@size;
                height: 70/@size;
                a,
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .shop_name {
            width: 100%;
            color: #333;
            .shop_title {
                display: block;
                font-size: 15/@size;
                font-weight: bold;
                max-height: 40/@size;
                min-height: 20/@size;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                span {
                    float: left;
                    margin-top: 3/@size;
                    display: inline-block;
                    font-weight: normal;
                    margin-right: 3/@size;
                }
            }
            .shop_norms {
                display: inline-block;
                padding-left: 10/@size;
                font-size: 13/@size;
                max-width: 90/@size ;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .shop_address {
            max-width: 260/@size;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13/@size;
            color: #999;
            span {
                display: inline-block;
                width: 33.3333%;
            }
        }
        .batch_num {
            float: left;
            max-width: 100/@size;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13/@size;
            color: #999;
        }
        .batch {
            padding-top: 2/@size;
            width: 100%;
            line-height: 30/@size;
            overflow: hidden;
            .batch_status {
                float: right;
            }
        }
    }
    
    .shop_infor {
        flex: 1;
    }
    
    .shop_car_container {
        .shop_tips {
            color: #fe403b;
            font-size: 10/@size;
            width: 150/@size;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .shop_name .shop_norms {
            padding-left: 0;
        }
        li {
            a {
                display: block;
            }
        }
        input[type="checkbox"] {
            position: absolute;
            width: 34/@size;
            height: 100%;
            left: 0/@size;
            z-index: 10;
            top: 0;
            border: none;
        }
        span.rules {
            position: absolute;
            right: 15/@size;
            z-index: 10;
            color: #999;
            height: 45/@size;
            line-height: 45/@size;
            font-size: 12/@size;
        }
        input:checked {
            background: transparent;
        }
        input:checked+i {
            background: url("../../images/usercenter/select_active.png") center no-repeat;
            background-size: 18/@size;
        }
        .select_icon {
            position: absolute;
            width: 18/@size;
            height: 18/@size;
            background: url("../../images/usercenter/select.png") center no-repeat;
            background-size: 18/@size;
            left: 8/@size;
            top: 50%;
            margin-top: -9/@size;
            z-index: 0;
        }
        .money {
            color: #fe7e7a;
            font-size: 15/@size;
        }
        .repertory {
            color: #999;
            font-size: 13/@size;
        }
        .lacked {
            color: red;
        }
    }
    
    #factory_box {
        padding-bottom: 106/@size;
        .factory_item {
            position: relative;
            z-index: 1;
        }
    }
    
    .settlement {
        position: fixed;
        z-index: 99;
        bottom: 55/@size;
        left: 0;
        right: 0;
        height: 45/@size;
        line-height: 45/@size;
        padding-right: 15/@size;
        background: #f3eeee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn_disabled {
            background: #8A7E89!important;
        }
        .consult {
            height: 100%;
            span {
                display: inline-block;
                height: 100%;
                line-height: 45/@size;
            }
        }
    }
    
    .checkAll {
        width: 70/@size;
        height: 100%;
        label {
            height: 100%;
            display: block;
            padding-left: 30/@size;
            position: relative;
            font-size: 15/@size;
            color: #333;
        }
    }
    
    .total_label,
    .shop_label,
    .shop_kind_count {
        font-size: 13/@size;
        color: #999;
    }
    
    .total_money {
        font-size: 18/@size;
        color: #fe403b;
    }
    
    .btn_submit,
    .btn_delete {
        border-radius: 5/@size;
        background-image: linear-gradient( 90deg, rgb(254, 65, 59) 0%, rgb(255, 90, 59) 100%);
        width: 90/@size;
        height: 38/@size;
        font-size: 15/@size;
        color: #fff;
        text-align: center;
        line-height: 2;
        border: none;
        outline: none;
    }
    
    .select_disabled {
        background: url("../../images/usercenter/select-disabled.png") center no-repeat!important;
        background-size: 18/@size!important;
    }
    
    .nav_ico3 {
        position: relative;
        .shop_count {
            position: absolute;
            width: 15px;
            height: 15px;
            right: -9px;
            top: 0px;
            background: #fe7e7a;
            padding: 0 2/@size;
            color: #fff;
            text-align: center;
            font-size: 12px;
            line-height: 1.4;
            border-radius: 15px;
            letter-spacing: 1px;
            display: none;
        }
    }
    
    .footer {
        z-index: 23;
    }
    
    .add_item {
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        overflow: hidden;
        background: #FFF9F9;
        line-height: 35/@size;
        height: 35/@size;
        padding: 0 20/@size 0 40/@size;
        border: 1px solid #FFE6E6;
        border-left: 0;
        border-right: 0;
        font-size: 11/@size;
        color: #666666;
        em {
            i {
                color: #fe7e7a;
            }
        }
        #yf {
            color: #fe7e7a;
        }
        .fl {
            float: left;
            color: #666;
        }
        a.fr {
            float: right;
            color: #333;
        }
    }
    /*满减、特价、买赠公用效果*/
    
    .sale_type_tj {
        position: relative;
        padding-left: 33/@size;
    }
    
    .sale_type_tj:before {
        text-indent: 0;
        width: 30/@size;
        display: inline-block;
        height: 14/@size;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        font-weight: 100;
        content: attr(data-type);
        text-align: center;
        background-image: linear-gradient(90deg, #80DEEA, #41CBDB);
        position: absolute;
        left: 0;
        top: 3/@size;
        width: 30/@size;
        height: 14/@size;
        font-size: 10/@size;
        line-height: 16/@size;
    }
</style>