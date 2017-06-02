<template>
    <div class="set">
        <v-header :title="title"></v-header>
        <div class="aboutus">
            <router-link class="into" to="/about">
                关于我们<span></span>
            </router-link>
        </div>
        <div class="signOut">
            <button type="button" @click="sign">退出当前账号</button>
        </div>
    </div>
</template>

<script>
    import router from '@/router';
    import {
        setLocalStorage
    } from '@/service/tool';

    import {
        mapActions
    } from 'vuex';
    import header from '@/components/header';
    export default {
        data() {
            return {
                title: '设置'
            }
        },
        components: {
            'v-header': header
        },
        methods: {
            ...mapActions([
                'signOut'
            ]),
            sign() {
                this.signOut();
                setLocalStorage('token', '');
                router.back()
            }
        }
    }
</script>

<style scoped lang="less">
    @size: 37.5rem;
    body {
        background: #fff;
    }
    
    .aboutus {
        position: relative;
        border-bottom: 1px solid #eee;
        font-size: 15/@size;
        color: #333;
        a {
            display: block;
            padding: 12/@size 10/@size;
            background-color: #fff;
            transition: all .1s;
            &:actived{
                background-color: #f8f8f8;
            }
        }
        span {
            position: absolute;
            right: 10/@size;
            top: 0;
            bottom: 0;
            display: block;
            background-image: url(../../images/icon_next_back.png);
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 6/@size auto;
            width: 6/@size;
            height: 100%;
        }
    }
    
    .signOut {
        width: 100%;
        margin-top: 20/@size;
        padding: 0 20/@size;
        button {
            width: 100%;
            background-image: linear-gradient(-180deg, #F84A73 0%, #FF3C4C 100%);
            color: #fff;
            padding: 10/@size 0;
            border-radius: 2/@size;
        }
    }
</style>