<template>
    <div class="manage">
        <v-header :title="title"></v-header>
        <div class="address">
            <ul>
                <li v-for="(n,index) in address" :key="index" >
                    <mt-cell-swipe :right="rightButtons" >
                        <div class="fl">
                            <h2><span>姓名</span><span>电话</span></h2>
                            <h3><i>默认</i>地址</h3>
                        </div>
                        <div class="fr">
                            <i></i>
                        </div>
                    </mt-cell-swipe>
                </li>
            </ul>
        </div>
        <div class="add-address">
            <router-link to="/edit"></router-link>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import header from '@/components/header';
    import {
        getReceiverAddressList
    } from '@/service/getDate';
    export default {
        data() {
            return {
                title: '管理收货地址'
            }
        },
        computed: mapGetters([
            'address'
        ]),
        components: {
            'v-header': header
        },
        created() {
            this.getDate();
            this.rightButtons = [{
                    content: 'Mark as Unread',
                    style: {
                        background: 'lightgray',
                        color: '#fff'
                    }
                },
                {
                    content: 'Delete',
                    style: {
                        background: 'red',
                        color: '#fff'
                    },
                    handler: () => this.$messagebox('delete')
                }
            ];
        },
        methods: {
            leftButtonHandler(evt) {
                console.log(123);
            },
            getDate() {
                this.getAddress({
                    fn: getReceiverAddressList,
                    that: this
                });
            },
            ...mapActions([
                'getAddress'
            ])
        },
        mounted() {
            console.log(this.address,123)
        }
    }
</script>

<style>

</style>