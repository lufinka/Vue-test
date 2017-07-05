<template>
    <div class="edit">
        <v-header :title="title"></v-header>
        <div class="field" v-if="address.length">
            <div class="input" data-text="收货人:">
                <input type="text" v-model="address[index].receiverName">
            </div>
            <div class="input" data-text="手机号:">
                <input type="number" v-model="address[index].contactPhone">
            </div>
            <div class="input" @click="choseArea" data-text="所在地区:">
                <div class="into area">
                    {{ addressProvince }} {{ addressCity }} {{ addressArea }}
                </div>
            </div>
            <div class="input" data-text="详细地址:">
                <textarea name="" id="" cols="30" rows="10" v-model="address[index].address"></textarea>
            </div>
            <div class="saveauto" v-if="address[index].defaultAddress == 1">
                <div class="cell">
                    <h2>设为默认地址</h2>
                    <p>注：每次下单时会使用该地址（轻松购下单除外）</p>
                </div>
                <div class="cell">
                    <mt-switch v-model="switchValue"></mt-switch>
                </div>
            </div>
        </div>
        <div class="save-address">
            <router-link to="/edit/9999">
                保存
            </router-link>
        </div>
    
        <transition name="toggle-cart">
            <div class="page-picker" v-show="ishow">
                <div class="close" @click="ishow = false">
                    <i></i>
                </div>
                <div class="page-picker-wrapper">
                    <mt-picker value :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { Switch, Picker } from 'mint-ui';
import {
    mapGetters,
    mapActions
} from 'vuex';
import header from '@/components/header';
import s from '@/service/city.js';
console.log(s, 1245656)
export default {
    data() {
        return {
            index: -1,
            ishow: !1,
            title: '编辑收货地址',
            switchValue: !1,
            addressSlots: [
                {
                    flex: 1,
                    values: Object.keys(s),
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['市辖区'],
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                }, {
                    flex: 1,
                    values: ['东城区'],
                    className: 'slot5',
                    textAlign: 'center'
                }
            ],
            numberSlot: [{
                flex: 1,
                defaultIndex: 0,
                values: [0, 1, 2, 3, 4, 5, 6],
                className: 'slot1'
            }],
            oPicker: {},
            addressProvince: '',
            addressCity: '',
            addressArea: '',
        }
    },
    computed: mapGetters([
        'address'
    ]),
    created() {
        this.index = this.$route.params.index;
        this.addressProvince = this.address[this.index].provinceName;
        this.addressCity = this.address[this.index].cityName;
        this.addressArea = this.address[this.index].districtName;
        console.log(this.oPicker)
    },
    components: {
        'v-header': header
    }, methods: {
        onAddressChange(picker, values) {
            this.oPicker = picker;
            let province = Object.keys(s);
            let city = Object.keys(s[values[0]]);
            let area = s[values[0]][values[1]];
            this.areaObj = area;
            picker.setSlotValues(1, city);
            this.addressProvince = values[0];
            this.addressCity = values[1];
            this.addressArea = values[2];
            picker.setSlotValues(2, area);
        },
        onCityChange(picker, values) {
            console.log(values)
        },
        choseArea() {
            this.ishow = !0;
        }
    }, mounted() {
        this.$nextTick(() => {
            setTimeout(() => {//这个是一个初始化默认值的一个技巧
                this.addressSlots[0].defaultIndex = 0;
            }, 100);
        });
    }
}
</script>

<style scoped lang="less">
@size: 37.5rem;

.toggle-cart-enter-active,
.toggle-cart-leave-active {
    transition: all .3s ease-out;
}

.toggle-cart-enter,
.toggle-cart-leave-active {
    transform: translateY(100%);
}

.saveauto {
    width: 100%;
    background-color: #fff;
    padding: 10/@size;
    border-bottom: 1px solid #f5f5f5;
    display: table;
    .cell {
        vertical-align: middle;
        display: table-cell;
    }
    h2 {
        font-size: 12/@size;
        color: #666;
        line-height: 1.6em;
    }
    p {
        color: #848689;
        font-size: 10/@size;
    }
}

.page-picker {
    position: absolute;
    bottom: 10/@size;
    right: 0;
    left: 0;
    .close {
        width: 100%;
        height: 30/@size;
        background-color: #fff;
        text-align: center;
        position: relative;
        &:before {
            width: 32/@size;;
            height: 1px;
            content: "";
            position: absolute;
            left: 50%;
            bottom: 15/@size;
            margin-left: -2/@size;
            background-color: #ccc;
            border-width: 1px 1px 0 0;
            transform: rotate(155deg);
            -webkit-transform: rotate(155deg);
            -moz-transform: rotate(155deg);
        }
        &:after {
            width: 32/@size;;
            height: 1px;
            content: "";
            position: absolute;
            right: 50%;
            bottom: 15/@size;
            margin-right: -2/@size;
            background-color: #ccc;
            border-width: 1px 1px 0 0;
            transform: rotate(25deg);
            -webkit-transform: rotate(25deg);
            -moz-transform: rotate(25deg);
        }
    }
}

.mint-switch-input:checked+.mint-switch-core {
    border-color: #F84A73;
    background-color: #F84A73;
}

.into {
    background-image: url(../../images/home/more@2x.png);
    background-position: right center;
    background-repeat: no-repeat;
    background-size: 8/@size auto;
}

.area {
    width: 100%;
    padding: 0 0 0 80/@size;
}

.input {
    width: 100%;
    position: relative;
    border-bottom: 1px solid #f5f5f5;
    padding: 12/@size 10/@size;
    background-color: #fff;
    &:before {
        content: attr(data-text);
        position: absolute;
        left: 10/@size;
        top: 12/@size;
        color: #222;
        font-size: 15/@size;
        width: 70/@size;
        height: 20/@size;
        line-height: 20/@size;
    }
    input {
        width: 100%;
        padding: 0 10/@size 0 80/@size;
        height: 20/@size;
        line-height: 20/@size;
    }
    textarea {
        width: 100%;
        padding: 0 0 0 80/@size;
        height: 40/@size;
    }
}

.save-address {
    padding: 10/@size;
    margin-top: 30/@size;
    a {
        width: 100%;
        padding: 10/@size 0;
        background-image: linear-gradient(-180deg, #F84A73 0%, #FF3C4C 100%);
        color: #fff;
        display: inline-block;
        border-radius: 2px;
        text-align: center;
        font-size: 15/@size;
        i {
            margin-right: 6/@size;
            font-style: normal
        }
    }
}
</style>