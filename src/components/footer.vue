<template>
    <div class="footer">
        <ul>
            <li :class="{on:focus == 0}">
                <router-link to="/home">
                   <h2>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home"></use>
                    </svg>
                    </h2>
                    <p>首页</p>
                </router-link>
            </li>
            <li :class="{on:focus == 1}">
                <router-link to="/search">
                    <h2>
                    <svg class="icon search_list" aria-hidden="true">
                        <use xlink:href="#icon-search_list"></use>
                    </svg>
                    </h2>
                    <p>搜索</p>
                </router-link>
            </li>
            <li :class="{on:focus == 2}">
                <router-link to="/shopcar">
                   <h2>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shopcar"></use>
                    </svg>
                    </h2>
                    <i v-if="count">{{count}}</i>
                    <p>购物车</p>
                </router-link>
            </li>
            <li :class="{on:focus == 3}">
                <router-link to="/user">
                   <h2>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-user"></use>
                    </svg>
                    </h2>
                    <p>我</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import {
        cartAccount
    } from '@/service/getDate';
    export default {
        data() {
            return {
                count: 0
            }
        },
        computed: mapGetters([
            'focus'
        ]),
        created() {
            this.getShopCarNum();
        },
        methods: {
            getShopCarNum() {
                cartAccount(this).then((response) => {
                    this.count = response.body.data.count;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @size: 37.5rem;
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        box-shadow: 0 -1px 2px #e5e5e5;
        ul {
            display: flex;
            li {
                flex: 1;
                text-align: center;
                display: inline-block;
                &.on {
                    p,
                    .icon {
                        color: #ff6b82;
                    }
                }
                a {
                    display: block;
                    position: relative;
                    padding: 5/@size 0;
                    transition: all .218s;
                    &:active {
                        background-color: #f8f8f8;
                    }
                    h2 {
                        height: 28px;
                        width: 100%;
                        overflow: hidden;
                    }
                    i {
                        position: absolute;
                        height: 15/@size;
                        min-width: 15/@size;
                        top: 5/@size;
                        left: 50%;
                        background: #FE403B;
                        padding: 0 2/@size;
                        color: #fff;
                        text-align: center;
                        font-size: 12/@size;
                        line-height: 1.4;
                        border-radius: 15/@size;
                        letter-spacing: 1px;
                    }
                }
                .icon {
                    font-size: 24/@size;
                    color: rgb(134, 134, 134);
                    &.search_list {
                        font-size: 30/@size;
                        margin-top: -2px;
                    }
                }
                p {
                    color: #333;
                    font-size: 12/@size;
                }
            }
        }
    }
</style>