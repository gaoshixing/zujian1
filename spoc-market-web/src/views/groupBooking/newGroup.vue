<style lang='less'>
    .newGroupGsx {
        .newGroup_title {
            font-size: 18px;
        }
        .goods_infor {
            padding: 20px;
            .choose_goods {
                font-size: 14px;
                line-height: 45px;
                .fh {
                    color: red;
                    margin-left: 30px;
                }
                img {
                    width: 50px;
                    height: 36px;
                    margin-right: 36px;
                    vertical-align: middle;
                }
               
                .goods_title {
                    font-size: 12px;
                    display: inline-block;
                    // width: 77px;
                    text-align: right;
                    margin-right: 20px;
                    color: #495060;
                }
                .good_name {
                    margin-right: 120px;
                    font-size: 12px;
                }
            }
        }
        .Group_infor {
            padding: 20px 10px;
            li {
                list-style: none;
                font-size: 14px;
               
                margin-bottom: 20px;
                .line {
                    background-color: #44bcbc;
                    width: 10px;
                    height: 3px;
                    margin: 10px;
                    vertical-align: middle;
                    display: inline-block;
                }
                .group_name {
                    color: #495060;
                    display: inline-block;
                    width: 105px;
                    text-align: right;
                    font-size: 12px;
                    margin-right: 20px;
                }
                .fh {
                    color: red;
                }
                .info_introduce {
                    color: #999;
                    font-size: 10px;
                    padding: 10px 0 0 132px;
                }
                .line-top {
                    margin-left: 112px;
                    span {
                        color: #b8b8b8;
                        font-size: 10px;
                    }
                }
            }
            .notice {
                padding: 10px 0 0 113px;
                color: red;
                font-size: 10px;
            }
            
        }
        .confirm {
            text-align: center;
        }
    }

</style>

<template>
    <div class="newGroupGsx">
        <p class="newGroup_title">商品信息</p>
        <div class="goods_infor">
            <p class="choose_goods">
                <span class="fh">*</span><span class="goods_title">选择商品：</span><img :src="picture" alt=""><span class="good_name">{{goods.packName}}</span>
                <Button type="primary" @click="chooseGoods">{{chooseText}}</Button>
            </p>
            <p class="choose_goods">
                <span class="fh">　　*</span><span class="goods_title">原价：</span>{{goods.packOriPrice}}
            </p>
            <p class="choose_goods">
                <span class="fh">*</span><span class="goods_title">最大库存：</span>{{goods.remainNum ? goods.remainNum: '不限量'}}
                <!-- <span class="goods_title"><span class="fh">*</span></span>{{goods.packOriPrice}} -->
            </p>
        </div>
        <p class="newGroup_title">拼团信息</p>
        <div class="Group_infor">
           <ul>
                <li>
                    <span class="group_name"><span class="fh">*</span>拼团活动时间：</span>
                    <DatePicker type="datetime" :value='goods.startTime' @on-change="startChange" style="width:160px"></DatePicker>
                    <span class="line"></span>
                    <DatePicker type="datetime" :value='goods.endTime' @on-change="endChange" style="width:160px"></DatePicker>
                </li>
                <li>
                    <span class="group_name">　　<span class="fh">*</span>起拼人数：</span>
                        <InputNumber :max="999999" :min="1" v-model="goods.memberNum" :precision='0' style="width: 178px"></InputNumber>
                        <p class="info_introduce">包括团长在内的人数,建议2-10人</p>
                </li>
                <li>
                    <span class="group_name">　　<span class="fh">*</span>拼团价格：</span>
                    <InputNumber :max="999999"  v-model="goods.packPrice" style="width: 178px"></InputNumber>
                </li>
                <li>
                    <span class="group_name">　　<span class="fh">*</span>模拟成团：</span> 
                    <RadioGroup v-model="isImitate">
                        <Radio label="开启"></Radio>
                        <Radio label="关闭"></Radio>
                    </RadioGroup>
                    <p class="info_introduce">开启模拟成团，当拼团时限或拼团活动结束前，人数未满的团，系统将会模拟“匿名”买家凑满人数，使其成团。</p>
                </li>
                <li>
                    <span class="group_name">　　<span class="fh">*</span>超团成员：</span> 
                    <RadioGroup v-model="isSurpass">
                        <Radio label="开启"></Radio>
                        <Radio label="关闭"></Radio>
                    </RadioGroup>
                    <p class="info_introduce">开启超员成团后，拼团人数为最低成团人数。即：如果同时参与某个团的人数超过拼团人数，那么将以实际参团的人数成团，避免超员用户支付成功</p>
                    <p v-if="isSurpass=='开启'" class="line-top">
                        <Checkbox v-model="single">需设置拼团上线人数　</Checkbox><Input v-model="goods.maxNum" number :disabled="!single" style="width: 178px"></Input></br>
                        <span>如果关联商品无库存限制且不限制拼团上限人数,则不需要勾选本项</span>
                    </p>
                </li>
                <li>
                    <companys-checkbox
                        :nameStyle="nameSty"
                        name="分公司可见："
                        ref="com"
                        :hasChecked="goods.officeIds"
                        @checkComany="checkComany"
                        ></companys-checkbox>
                    <!-- <p class="notice">（勾选本项，则其他分校可按该拼团规则售卖商品）</p> -->
                </li>
            </ul>
        </div>
        <!-- 对话框 -->
        <Modal
            v-model="modal1"
            title="选择一件商品"
            width=728
            @on-ok="ok"
            @on-cancel="cancel">
            <v-select 
                style="width:294px;margin-bottom:10px;"
                placeholder="搜索名称"
                :datafunc="datafunc"
                icon="search" 
                v-model="compact"
                k='cnname'
                @on-enter="textChange" 
                @on-click="textChange" 
                @selected="textChange">
            </v-select>
            <Table ref="selection" :columns="columns" :data="data.data" border  @on-row-click='tableChange'></Table>
        </Modal>
        <p class="confirm">
            <Button type="primary" class="primary_btn" @click="confirm">确定</Button>
        </p>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import companysCheckbox from '../../modules/companysCheckbox'
import valid, {
    errors,
    common,
    sys,
    groupB
} from "../../libs/request";
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            single: false,
            picture: '',
            nameSty: {
                'color': '#495060',
                'display': 'inline-block',
                'width': '105px',
                'text-align': 'right',
                'margin-right': '20px',
                'font-size': '12px'
            },
            goods: {
                remainNum: '   ',
                name: '',
                price: '',
                memberNum: 1,
                packPrice: 0,
                startTime: '',
                endTime: '',
                officeIds: [],
            },
            id: this.$route.query.id || '',
            form: {},
            goodsInfor: '',
            currentId: '',
            chooseText: '选择商品',
            groupNum: '',
            isImitate: '关闭',
            isSurpass: '关闭',
            isOtherSelect: false,
            modal1: false,
            compact: '',
            data: {
                count: 20,
                data: [
                ]
            },
            columns: [
                {
                    title: "选择",
                    key: "objectValue",
                    width: 80,
                    align: 'left',
                    render: (h, params) => {
                        let id = params.row.id
                        let defaultS = false
                        if(this.currentId === id) {
                            defaultS = true
                        } else {
                            defaultS = false
                        }
                        return h('Radio', { 
                            props: {
                                value: defaultS
                            },
                        })
                    }
                },
                {
                    title: "商品名称",
                    key: "name",
                    align: "left",
                    width: 360,
                },
                {
                    title: "库存",
                    key: "remainNum",
                    align: "left",
                    render: (h, params) => {
                        return h('div', { 
                        },params.row.remainNum ? params.row.remainNum : '不限量')
                    }
                },
                {
                    title: "定价",
                    key: "price",
                    align: "left"
                },
            ]
        }
    },

    components: {
        vSelect,
        companysCheckbox
    },

    // computed: {
    //     goods: {
    //         handle: () => {
    //             if(this.goods.packName) {
    //                 this.chooseText =  '重新选择'
    //             } else {
    //                 this.chooseText =  '选择商品'
    //             }
    //         },
    //         deep: true
    //     }
    // },

    mounted() {
        if(this.id) {
            this.chooseText = '重新选择'
            let obj = {
                id: this.id
            }
            groupB.getDetail(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    res.data.data.memberNum = res.data.data.memberNum/1
                    res.data.data.packPrice = res.data.data.packPrice/1
                    this.goods = res.data.data
                    this.currentId = this.goods.goodsList[0].id
                    this.isImitate = this.goods.isDownPack == 0 ? '关闭' : '开启'
                    this.isSurpass = this.goods.isUpPack == 0 ? '关闭' : '开启'
                    this.single = this.goods.maxNum > 0 ? true : false
                    this.getPicture(res.data.data.goodsList[0].attachmentId)
                }
            }).catch(errors.call(this))
        }
    },

    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getPicture(id) {
            // 获取图片
            let params = {
                id: id
            }
            sys.getPath(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.picture = res.data.data.path;
                }
            }).catch(errors.call(this));
        },
        
        checkComany(val) {
            this.goods.officeIds = val
        },

        startChange(val) {
            this.goods.startTime = val
        },

        endChange(val) {
            this.goods.endTime = val
        },

        chooseGoods(type={}) {
            let obj = {
                codeOrName: this.compact,
            }
            groupB.getGoodsList(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.data = res.data
                    if (!type) {
                        this.modal1 = true
                    }
                    this.modal1 = true
                }
            }).catch(errors.call(this))
        },

        tableChange(obj, index) {
            this.goodsInfor = obj
            this.currentId = obj.id
        },
        confirm() {
            if (!this.goods.startTime||!this.goods.endTime) {
                this.$Message.error('请选择开始时间或结束时间')
                return
            }
            let startT = new Date(this.goods.startTime).getTime()
            let endT = new Date(this.goods.endTime).getTime()
            let nowT = new Date().getTime()
            if ( endT < startT ) {
                this.$Message.error('结束时间不能大于开始时间')
                return
            }
            if ( endT < nowT ) {
                this.$Message.error('结束时间不能小于当前时间')
                return
            }
            if(this.$refs.com.showCheckboxGroup && !this.goods.officeIds.length) {
                this.$Message.error('您已选择分校可见，但未指定分校')
                return
            }
            if(!this.goods.packName) {
                this.$Message.info('请选择商品')
                return
            }
            if(!this.goods.memberNum) {
                this.$Message.info('请填写人数')
                return
            }
            // if(!this.goods.packPrice) {
            //     this.$Message.info('请填写价格')
            //     return
            // }
            if(this.goods.packPrice >= this.goods.packOriPrice) {
                if (this.goods.packOriPrice/1) {
                    console.log(this.goods.packOriPrice)
                    this.$Message.info('拼团价格不能大于或等于商品原价')
                    return
                }
            }
            let obj = {
                "id": this.id,
                "packCode": this.goods.packCode,
                "packName": this.goods.packName,
                "startTime": this.goods.startTime,
                "endTime": this.goods.endTime,
                "memberNum": this.goods.memberNum,
                "packPrice": this.goods.packPrice,
                "packOriPrice": this.goods.packOriPrice,
                "isDownPack": this.isImitate == '开启' ? 1 : 0,
                "isUpPack":  this.isSurpass == '开启' ? 1 : 0,
                "isGlobal": this.goods.officeIds.length == 0 ? 0 : 1,
                "goodsList":[
                    {
                    "id": this.currentId
                    }
                ],
                "officeIds": this.goods.officeIds,
                "packStatus": this.id == ''? 'packempty' : this.goods.packStatus,
                "isUse": this.id == ''? 0 : this.goods.isUse,
                "packNum": this.id == ''? '0' : this.goods.packNum,
                "auditStatus": this.id == ''? 'unaudit' : this.goods.auditStatus,
            }
            if (this.isSurpass == '开启') {
                obj = Object.assign(obj, {
                    maxNum: this.goods.maxNum
                })
            }
            this.updateLoadingStatus({isLoading: true})
            groupB.newSave(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.$router.replace({
                        name: 'groupM.index'
                    })
                }
            }).catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({isLoading: false})
            });
        },
        textChange() {
            this.chooseGoods(true)
        },
        cancel() {
            this.compact = ''
        },
        ok() {
            this.compact = ''
            if(this.goodsInfor !='') {
                this.chooseText = '重新选择'
                this.goods.code = this.goodsInfor.code
                this.goods.packName = this.goodsInfor.name
                this.goods.packOriPrice = this.goodsInfor.price
                this.goods.remainNum = this.goodsInfor.remainNum
                this.getPicture(this.goodsInfor.attachmentId)
            }
        },
        datafunc() {
            return new Promise((resole, reject) =>{})
        }
    }

}
</script>

