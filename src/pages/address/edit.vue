<template>
    <div class="edit">
        <v-header :title="title"></v-header>
        <div class="field" v-if="index > -1 && index < 999">
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
            <div class="saveauto" v-if="address[index].defaultAddress == 0">
                <div class="cell">
                    <h2>设为默认地址</h2>
                    <p>注：每次下单时会使用该地址（轻松购下单除外）</p>
                </div>
                <div class="cell">
                    <mt-switch v-model="switchValue"></mt-switch>
                </div>
            </div>
        </div>
        <div class="field" v-else>
            <div class="input" data-text="收货人:">
                <input type="text" v-model="vreceiverName">
            </div>
            <div class="input" data-text="手机号:">
                <input type="number" v-model="vcontactPhone">
            </div>
            <div class="input" @click="choseArea" data-text="所在地区:">
                <div class="into area">
                    {{ addressProvince }} {{ addressCity }} {{ addressArea }}
                </div>
            </div>
            <div class="input" data-text="详细地址:">
                <textarea name="" id="" cols="30" rows="10" v-model="vtaddress"></textarea>
            </div>
        </div>
        <div class="save-address">
            <button type="button" @click="save">
                保存
            </button>
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
import { Switch, Picker, Toast } from 'mint-ui';
import {
    mapGetters,
    mapActions
} from 'vuex';
import header from '@/components/header';
import s from '@/service/city.js';
import {
    headers,
    getReceiverAddressList
} from '@/service/getDate';
export default {
    data() {
        return {
            index: -1,//当前编辑地址初始值
            ishow: !1, //城市选择toggle控制
            vreceiverName: '',//收货人
            vcontactPhone: '',//手机号
            vtaddress: '',//详细地址
            title: '编辑收货地址',
            switchValue: !1,//默认地址
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
            addressProvince: '北京市',
            addressCity: '市辖区',
            addressArea: '东城区',
        }
    },
    watch: {
        switchValue: function (v) {
            if (v) {
                this.saveAuto();
            }
        }
    },
    computed: mapGetters([
        'address'
    ]),
    created() {
        this.getDate();
        this.index = this.$route.params.index;
        if (this.index > -1 && this.index < 999) {
            this.addressProvince = this.address[this.index].provinceName;
            this.addressCity = this.address[this.index].provinceName;
            this.addressArea = this.address[this.index].provinceName;
        }
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
        saveAuto() {
            var self = this;
            this.$http.post('/usermanage/api/enterpriseInfo/updDefReceiverAddress', { id: this.address[this.index].id }, {
                headers: headers
            }).then((response) => {
                console.log(response)
                Toast({
                    message: response.body.data.message,
                    position: 'bottom',
                    duration: 2000
                });
            }, (error) => {
                Toast({
                    message: error,
                    position: 'bottom',
                    duration: 2000
                });
            });
            setTimeout(function () {
                self.$router.go(-1);
            }, 2000);
        },
        choseArea() {
            this.ishow = !0;
        }, save() {
            var self = this;
            //Change
            if (this.index > -1 && this.index < 999) {
                if (self.address[this.index].receiverName == '') {
                    this.$toast({
                        message: '收货人不能为空',
                        position: 'bottom',
                        duration: 1000
                    });
                } else if (self.address[this.index].contactPhone == "" || !(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(self.address[this.index].contactPhone))) {
                    this.$toast({
                        message: '请输入正确的手机号码',
                        position: 'bottom',
                        duration: 1000
                    });
                } else if (self.address[this.index].address == "") {
                    this.$toast({
                        message: '详细地址不能为空',
                        position: 'bottom',
                        duration: 1000
                    });
                } else {
                    var obj = { "address": self.address[this.index].address, id: self.address[this.index].id, "receiverName": self.address[this.index].receiverName, "provinceCode": "", "cityCode": "", "districtCode": "", "provinceName": self.addressProvince, "cityName": self.addressCity, "districtName": self.addressArea, "contactPhone": self.address[this.index].contactPhone, "defaultAddress": this.switchValue ? '0' : 1 }
                    this.$http.post('/usermanage/api/enterpriseInfo/updateReceiverAddress', obj, {
                        headers: headers
                    }).then((response) => {
                        console.log(response)
                        Toast({
                            message: response.body.data.message,
                            position: 'bottom',
                            duration: 2000
                        });
                    }, (error) => {
                        Toast({
                            message: error,
                            position: 'bottom',
                            duration: 2000
                        });
                    });

                    setTimeout(function () {
                        self.$router.go(-1);
                    }, 2000);
                }
                //Add One
            } else {
                if (self.vreceiverName == '') {
                    this.$toast({
                        message: '收货人不能为空',
                        position: 'bottom',
                        duration: 1000
                    });
                } else if (self.vcontactPhone == ""  || !(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(self.vcontactPhone))) {
                    this.$toast({
                        message: '请输入正确的手机号码',
                        position: 'bottom',
                        duration: 1000
                    });
                } else if (self.vtaddress == "") {
                    this.$toast({
                        message: '详细地址不能为空',
                        position: 'bottom',
                        duration: 1000
                    });
                } else {
                    var obj = { "address": self.vtaddress, "receiverName": self.vreceiverName, "provinceCode": "", "cityCode": "", "districtCode": "", "provinceName": self.addressProvince, "cityName": self.addressCity, "districtName": self.addressArea, "contactPhone": self.vcontactPhone, "defaultAddress": self.switchValue ? '0' : 1 };
                    this.$http.post('/usermanage/api/enterpriseInfo/saveReceiverAddress', obj, {
                        headers: headers
                    }).then((response) => {
                        console.log(response)
                        Toast({
                            message: response.body.data.message,
                            position: 'bottom',
                            duration: 2000
                        });
                    }, (error) => {
                        Toast({
                            message: error,
                            position: 'bottom',
                            duration: 2000
                        });
                    });

                    setTimeout(function () {
                        self.$router.go(-1);
                    }, 2000);
                }
            }
        },
        ...mapActions([
            'getAddress'
        ]),
        getDate() {
            this.getAddress({
                fn: getReceiverAddressList,
                that: this
            });
        }
    }, mounted() {
        if (this.index > -1 && this.index < 999) {
            this.addressProvince = this.address[this.index].provinceName;
            this.addressCity = this.address[this.index].cityName;
            this.addressArea = this.address[this.index].districtName;

            this.oPicker.setSlotValue(0, this.addressProvince);
            this.oPicker.setSlotValue(1, this.addressCity);
            this.oPicker.setSlotValue(2, this.addressArea);
        }
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
            width: 32/@size;
            ;
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
            width: 32/@size;
            ;
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
    button {
        width: 100%;
        padding: 10/@size 0;
        background-image: linear-gradient(-180deg, #F84A73 0%, #FF3C4C 100%);
        color: #fff;
        display: inline-block;
        border-radius: 2px;
        text-align: center;
        font-size: 15/@size;
    }
}
</style>