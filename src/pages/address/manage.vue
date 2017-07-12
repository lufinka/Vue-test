<template>
    <div class="manage">
        <v-header :title="title"></v-header>
        <div class="address">
            <ul v-if="address && address.length">
                <li v-for="(n,index) in address" :key="index"  @click="goo(index)" @click.capture="chooseAddress(n,index)">
                    <mt-cell-swipe :right="rightButtons">
                        <div class="fl">
                            <h2>
                                <span>{{n.receiverName}}</span>
                                <span>{{n.contactPhone}}</span>
                            </h2>
                            <h3>
                                <i v-show="n.defaultAddress == 1">默认</i>{{n.provinceName}}{{n.cityName}}{{n.districtName}}{{n.address}}</h3>
                        </div>
                        <div class="fr">
                            <div class="cont">
                                <i></i>
                            </div>
                        </div>
                    </mt-cell-swipe>
                </li>
            </ul>
            <div v-else class="tips">
                暂无收发货地址，请点击按钮添加
            </div>
        </div>
        <div class="add-address">
            <router-link to="/edit/9999">
                <i>+</i>新建地址</router-link>
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
    headers,
    getReceiverAddressList
} from '@/service/getDate';
export default {
    data() {
        return {
            title: '管理收货地址',
            active: [],
            index:0,
            ready:!0,
            rightButtons: [{
                content: '删除',
                style: {
                    background: '#FF3C4C',
                    color: '#fff'
                },
                handler: () => this.$messagebox.confirm('是否刪除').then(action => {
                    this.$http.post('/usermanage/api/enterpriseInfo/deleteReceiverAddress', { id: this.active.id }, {
                            headers: headers
                        }).then((response) => {
                        if(response.body.data.message == "删除成功"){
                            this.deleteAddress(this.index);
                        }
                        this.$toast({
                            message: response.body.data.message,
                            position: 'bottom',
                            duration: 2000
                        });
                    }, (error) => {
                        this.$toast({
                            message: error,
                            position: 'bottom',
                            duration: 2000
                        });
                    });
                })
            }]
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
    },
    methods: {
        ...mapActions([
            'getAddress',
            'deleteAddress'
        ]),
        getDate() {
            this.getAddress({
                fn: getReceiverAddressList,
                that: this
            });
        },
        chooseAddress(obj,i){
            this.index = i;
            this.active = obj;
        },
        goo(i){
           this.$router.push('edit/'+i)
        }
    },
    mounted() {
        this.ready = !0;
        console.log(this.address, 123)
    }
}
</script>

<style lang="less">
@size: 37.5rem;
html,
body {
    height: 100%;
}
.tips{
    padding: 50/@size 10/@size;
    text-align: center;
    color: #666;
    font-size: 13/@size;
}
.mint-cell-swipe-buttongroup {
    display: table;
}

.mint-cell-swipe-button {
    display: table-cell;
    vertical-align: middle;
}

.mint-cell-title {
    display: none;
}

.mint-cell-value {
    flex: 1;
}

.manage {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 53/@size;
}

.address {
    width: 100%;
    overflow: hidden;
    li {
        width: 100%;
        float: left;
        position: relative;
        &:after {
            content: '';
            height: 1px;
            background-color: #e0e0e0;
            width: 100%;
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
        }
        a.mint-cell {
            padding: 10/@size 0;
            .fl {
                padding: 0 40/@size 0 0;
                width: 100%;
                h2 {
                    font-size: 16/@size;
                    color: #222;
                    font-weight: bold;
                    span:first-child {
                        padding-right: 6/@size;
                    }
                }
                h3 {
                    color: #666;
                    font-size: 14/@size;
                    line-height: 18/@size;
                    padding-top: 8/@size;
                    font-weight: 400;
                    i {
                        font-weight: normal;
                        color: #0d72de;
                        font-size: 12/@size;
                        text-align: center;
                        border: 1px solid #0d72de;
                        border-radius: 2px;
                        position: relative;
                        margin-right: 4/@size;
                        top: -1px;
                        padding: 0 5px
                    }
                }
            }
            .fr {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0/@size;
                width: 50/@size;
                .cont {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    i {
                        position: absolute;
                        right: 10/@size;
                        height: 34/@size;
                        top: 50%;
                        margin-top: -17/@size;
                        width: 40/@size;
                        border-left: 1px solid #e0e0e0;
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOEM2OTVBOEIzNDIxMUU0QjgzQkUwQkRENTM1RTI5NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOEM2OTVBOUIzNDIxMUU0QjgzQkUwQkRENTM1RTI5NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM4QzY5NUE2QjM0MjExRTRCODNCRTBCREQ1MzVFMjk3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM4QzY5NUE3QjM0MjExRTRCODNCRTBCREQ1MzVFMjk3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/rAGIwAAAR5JREFUeNrs1ssKgkAUBuDRpEVPUC/VC3RbtOoGFQRB24iMFhGUtal8uvIBWtTGzgGFGDRvZ0aD+eEXhVl8nFEcbbky64yxE7TG6PKGbqGLmOtL0Au07T07OlzOxChMGTpOicLYCKsy+rygu5Qo3L25wS3UmLwg6gptcag+1NVZPvmJwge9iKg8YEEoi0fJhoWhBjxKJiwRCmNIQt2gzbgoGRMLQh2jUKJhYahhFEokLBNKFCwzSgQMUXZKlAl9QtfUMB/VSDmpKbQCnVDCglCHhNtnfB2ZSGBhqFGSd0rEO2ZRo6hgHWoUFWzvfU0bKhTVv3LmlTR5nWAVTMEUTMEUTMH+Bcb/xN0iTexRsGHdfVgP6hQEhUPq4s1HgAEAv4ZMZmcw3dwAAAAASUVORK5CYII=);
                        background-repeat: no-repeat;
                        background-position: 14/@size center;
                        background-size: 20/@size 20/@size;
                    }
                }
            }
        }
    }
}

.add-address {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f8f8f8;
    text-align: center;
    a {
        width: 47%;
        margin: 10/@size 0;
        background-image: linear-gradient(-180deg, #F84A73 0%, #FF3C4C 100%);
        color: #fff;
        display: inline-block;
        border-radius: 2px;
        height: 33/@size;
        line-height: 33/@size;
        text-align: center;
        font-size: 15/@size;
        i {
            margin-right: 6/@size;
            font-style: normal
        }
    }
}
</style>