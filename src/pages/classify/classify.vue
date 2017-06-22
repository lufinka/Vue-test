<template>
    <div class="container wrapper" v-if="ready">
        <header class="header">
            <div class="search_contaienr">
                <a href="/search.html?redirecturl=%2Fclassify.html"><input id="search_input" class="search_input" type="text" placeholder="药品名/拼音缩写/厂家" readonly="false"></a>
            </div>
        </header>
        <div class="classify" v-if="category.length">
            <div class="classify-tab ui_verscrollpl">
                <div class="cont">
                    <ul>
                        <li @click="tabs(index)" v-for="(value,index) in category" :key="index" :class="{'active':index == clicked}">{{value.categoryName}}</li>
                    </ul>
                </div>
            </div>
            <div class="classify-right">
            <div v-for="(value,index) in category" :key="index" :class="{'classify-content':true,'ui_verscrollpl':true,'active':index == clicked}">
                <div class="classify-wrapper">
                    <div class="add-pic">
                        <a :href="value.activityUrl"><img :src="value.activityPic" alt=""></a>
                    </div>
                    <div class="category" v-if="value.cardCategory">
                        <ul  :class="{ maxHeight: !!value.showCard }">
                            <li v-for="(item,n) in value.cardCategory" :key="n" :class="{'active':n == 0}">
                                <a :href="'#'+item.categoryCode">{{item.categoryName}}</a>
                            </li>
                        </ul>
                        <div :class="{'toggle-btn':true,rotate:!!value.showCard}" @click="value.showCard = !value.showCard" v-if="value.cardCategory && value.cardCategory.length > 6">
                            <i></i>
                        </div>
                    </div>
                    <div class="category-wrapper">
                        <dl v-for="(item,n) in value.secondCategory" :key="n" :name="item.categoryCode" :id="item.categoryCode">
                            <dt>{{item.categoryName}}</dt>
                            <dd  v-for="(val,m) in item.thirdCategory" :key="m">
                                <img :src="val.activityPic" alt="">
                                <p>{{val.categoryName}}</p>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import {
        Toast,
        Indicator
    } from 'mint-ui';
    import {
        mapActions
    } from 'vuex';
    import footer from '@/components/footer';
    import {
        listCategory
    } from '@/service/getDate';
    export default {
        data() {
            return {
                ready: !1,
                category: [],
                clicked: 0
            }
        },
        created() {
            this.changeFocus(1);
            Indicator.open();
            this.getcategory();
        },
        components: {
            'footerBar': footer
        },
        methods: {
            tabs(i) {
                this.clicked = i;
            },
            getcategory() {
                listCategory(this).then((response) => {
                    Indicator.close();
                    this.ready = !0;
                    var data = response.body.data;
                    this.category = data.category;
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
            ...mapActions([
                'changeFocus'
            ])
        }
    }
</script>

<style scoped lang="less">
    @size: 37.5rem;
    .header {
        padding: 0 6/@size;
        height: 40/@size;
        border-bottom: 1px solid #dedddd;
        .search_contaienr {
            width: 100%;
            margin-left: 0;
            a {
                display: block;
            }
        }
        .search_input {
            width: 100%;
            position: relative;
            padding-left: 33/@size;
            height: 33/@size;
            border-radius: 33/@size;
            margin-top: 3/@size;
            background: url("../../images/index/icon_search.png") #f3f3f3 10/@size center no-repeat;
            background-size: 15/@size;
        }
    }
    
    .ui_verscrollpl {
        overflow-x: hidden !important;
        overflow-y: scroll !important;
        -webkit-overflow-scrolling: touch !important;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    
    .classify {
        background-color: #f8f8f8;
        position: fixed;
        top: 40/@size;
        left: 0;
        right: 0;
        bottom: 55/@size;
        &-tab {
            float: left;
            width: 88/@size;
            background-color: #fff;
            height: 100%;
            li {
                float: left;
                height: 62/@size;
                width: 88/@size;
                border-bottom: 1px solid #f8f8f8;
                border-left: 2px solid #fff;
                transition: .218s all;
                line-height: 62/@size;
                text-align: center;
                &:active,
                &.active {
                    border-bottom: 1px solid #fff;
                    border-left: 2px solid #FE403B;
                    background-color: #f8f8f8;
                }
            }
        }
        &-right {
            width: 275/@size;
            float: right;
            height: 100%;
        }
        &-content {
            height: 100%;
            margin-right: 6/@size;
            display: none;
            transition: .218s all;
            &.active {
                display: block;
            }
            .add-pic {
                margin-top: 14/@size;
                width: 100%;
                a {
                    display: block;
                    img {
                        width: 100%;
                        height: 80/@size;
                    }
                }
            }
        }
    }
    
    .category {
        width: 100%;
        margin-top: 12/@size;
        background-color: #fff;
        position: relative;
        padding-bottom: 18/@size;
        ul{
            max-height: 90/@size;
         transition: .218s all;
         overflow: hidden;
            &.maxHeight{
                max-height: inherit;
            }
            }
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        li {
            float: left;
            padding: 10/@size 4/@size 0 4/@size;
            width: 33.33333%;
            text-align: center;
            font-size: 10/@size;
            color: #333;
            a {
                display: block;
                position: relative;
                overflow: hidden;
                border-radius: 4/@size;
                border: 1px solid #eee;
                background-color: #eee;
                transition: .218s all;
                height: 30/@size;
                line-height: 30/@size;
                &:before {
                    content: "";
                    position: absolute;
                    transform: rotate(60deg);
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    right: -8/@size;
                    top: -10/@size;
                    width: 20/@size;
                    height: 16/@size;
                    background-color: #FE403B;
                    display: none;
                }
            }
            &:active,
            &.active {
                p {
                    border-color: #FE403B;
                    background-color: #fff;
                    color: #FE403B;
                }
            }
            &.active {
                p:before {
                    display: block;
                }
            }
        }
        .toggle-btn {
            width: 60/@size;
            height: 30/@size;
            position: absolute;
            left: 50%;
            margin-left: -30/@size;
            bottom: -15/@size;
                transition: .218s all;
            i {
                transition: .218s all;
                width: 20/@size;
                height: 20/@size;
                margin: 5/@size 0 0 20/@size;
                position: relative;
                background-color: #fff;
                border-radius: 10/@size;
                display: block;
                &:after {
                    content: "";
                    position: absolute;
                    top: 4/@size;
                    left: 7/@size;
                    width: 6/@size;
                    height: 6/@size;
                    border: 1px solid #999;
                    border-width: 1px 1px 0 0;
                    transform: rotate(135deg);
                    -webkit-transform: rotate(135deg);
                    -moz-transform: rotate(135deg);
                }
                &:before {
                    content: "";
                    position: absolute;
                    top: 8/@size;
                    left: 7/@size;
                    width: 6/@size;
                    height: 6/@size;
                    border: 1px solid #ccc;
                    border-width: 1px 1px 0 0;
                    transform: rotate(135deg);
                    -webkit-transform: rotate(135deg);
                    -moz-transform: rotate(135deg);
                }
            }
            &.rotate {
                i {
                    transform: rotateX(180deg);
                    -webkit-transform: rotateX(180deg);
                    -moz-transform: rotateX(180deg);
                }
            }
        }
        &-wrapper {
            width: 100%;
            margin-top: 15/@size;
            dl {
                font-size: 14/@size;
                color: #333;
                &:after {
                    content: "";
                    display: table;
                    clear: both;
                }
                dt {
                    font-size: 14/@size;
                    color: #333;
                    padding: 10/@size 0;
                }
                dd {
                    padding-top: 20/@size;
                    background-color: #fff;
                    text-align: center;
                    float: left;
                    width: 33.3333%;
                    img {
                        width: 60/@size;
                        height: 60/@size;
                        display: inline-block;
                    }
                    p {
                        font-size: 12px;
                        color: #333;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin: 5/@size 0;
                    }
                }
            }
        }
    }
</style>