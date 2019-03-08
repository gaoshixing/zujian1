<style lang='less'>
    .expand-detail-gsx {
        .detail-base {
            overflow: hidden;
            margin-bottom: 20px;
            .base-left, .base-right {
                width: 77%;
                float: left;
                border: 1px solid #f0f2fa;
                border-radius: 5px;
            }
            .base-right {
                position: relative;
                width: 22%;
                height: 164px;
                text-align: center;
                float: right;
                .expand-text-num {
                    font-size: 16px;
                    color: #b8b8b8;
                    text-align: center;
                    margin-top: 20px;
                }
                .expand-num {
                    font-size: 40px;
                }
                .ball {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background-color: red;
                    border-radius: 50%;
                    position: absolute;
                    right: -5px;
                    top: -5px;
                }
            }
            .base-left {
                padding: 15px 0;
            }
        }
        .cancleBorder {
            .ivu-table-cell {
                word-wrap : break-word;
            }
            // .ivu-table-wrapper {
            //     border: none;
            // }
            // .ivu-table:after {
            //     content: '';
            //     width: 0px;
                
            // }
            // .ivu-table-column-center {
            //     background-color: #fff;
            // }
        }
        .page {
            margin-top: 20px;
            margin-bottom: 140px;
            text-align: center;
        }
    }
    .rebate-modal-gsx {
        .page {
            margin-top: 20px;
            text-align: center;
        }
        .new-base {
            margin-top: 20px;
        }
        .description {
            height: 81px;
            border: 1px solid  #f0f2fa;
            border-radius: 5px;
            span {
                color: #b8b8b8;
                line-height: 81px;
                margin-left: 117px; 
                i {
                    font-style: normal;
                    font-size: 24px;
                    color: red;
                    margin: 0 75px 0 31px; 
                }
                b {
                    margin-left: 31px;
                    font-size: 24px;
                    font-weight: 400;
                    color: #000;
                }
            }
        }
        .rebate-history {
            font-size: 14px;
            line-height: 73px;
            .new-rebate {
                margin-top: 22px;
                float: right;
            }
        }
        
    }
    .succModelClass {
        .ivu-table-cell {
            word-break: break-all !important;
        }
    }

</style>
<template>
    <div class="expand-detail-gsx">
        <div class="detail-base">
            <div class="base-left">
                <base-infor
                    :baseList='baseList'
                    :baseInfor='baseInfor'
                ></base-infor>
            </div>
            <div class="base-right">
                <p class="expand-text-num">推广签单数</p>
                <p class="expand-num">{{baseInfor.signNum}}</p>
                <!-- <Button class="def_btn_new">返利</Button> -->
                <Button type="primary" class="primary_btn_new" style="position:relative" @click="rebate">返利<span class='ball' v-if="haveNew"></span></Button>
            </div>
        </div>
        <btnlist
            title="推广情况"
            >
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.list" class="common-table" :loading="loading"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>

        <!-- 对话框 -->
        <Modal
            v-model="modal1"
            :mask-closable="false"
            title="返利"
            width=810
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="rebate-modal-gsx">
                <div class="description">
                    <span>未返利签单数<i>{{baseInfor.signNum-baseInfor.rebateNum}}</i></span>
                    <span>总推广签单数<b>{{baseInfor.signNum}}</b></span>
                </div>
                <p class="rebate-history">返利记录<Button type="primary" @click="newRebate"  v-if="isShowAdd&&baseInfor.signNum-baseInfor.rebateNum>0" class="new-rebate">新增返利记录</Button></p>
                <Table :columns="columns1" :data="data1.list"></Table>
                <p v-if="!isShowAdd" class="new-base">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" @on-change="timeChange" placeholder="选择时间" style="width: 136px;"></DatePicker>
                    <!-- <Input v-model=""  style="" /> -->
                    <Select v-model="newRebateObj.ctId" style="width: 110px;margin:0 8px" placeholder="输入合同号" @on-change='rebateSelectChange'>
                        <Option v-for="item in ctIdList" :value="item.ctNo" :key="item.ctNo">{{ item.ctNo }}</Option>
                    </Select>
                    <Input placeholder="输入签约金额" disabled style="width: 88px;margin-right:8px" v-model="selectObj.signPrice" />
                    <InputNumber placeholder="输入返利金额" style="width: 88px;margin-right:8px":max="999999" :min="1" v-model="newRebateObj.price" @on-change="priceBlur"></InputNumber>
                    <Input placeholder="占比" style="width: 98px;" @on-change="ratioBlur" v-model="rebateRatio" />%
                    <Input v-model="newRebateObj.remarks" placeholder="输入备注" style="width: 126px;margin-left:55px" />
                </p>
                <div class="page">
                    <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChangeR"  :current="data1.pageNo" :total="data1.count" @on-change="onPageChangeR" v-if="data1.count>10"></Page>
                </div>
            </div>
           
            <div slot="footer">
                <p v-if="!isShowAdd"> 
                    <Button type="error" @click="newRebate">删除</Button>
                    <Button type="primary" @click="addRebate">添加</Button>
                </p>
            </div>
        </Modal>
        <Modal
            v-model="successModel"
            :mask-closable="false"
            title="成功推广列表"
            width=731
            class-name="succModelClass"
            @on-ok="okSuccess"
            @on-cancel="cancel">
            <Table :columns="succColumns" :data="succList" class="common-table"></Table>
         </Modal>
        <Modal
            v-model="editModel"
            :mask-closable="false"
            title="编辑合同"
            width=728
            ref="editeM"
            @on-ok="okEdit"
            @on-cancel="cancelEdit">
                <p><span>合同号：</span>
                       <InputNumber   v-model="editSignObj.contractNo"  style="width: 300px" ></InputNumber>
                </p>
        </Modal>
    </div>
</template>

<script>
import btnlist from '@public/modules/btnlist'
import baseInfor from '../../modules/baseInfor'
import valid, {
    errors,
    common,
    sys,
    expandMan
} from "../../libs/request";
export default {
    data() {
        return {
            succId: '',
            rebateRatio: '',
            succList: [],
            loading: false,
            successModel: false,
            editSignObj: {},
            editModel: false,
            ctIdList: [],
            selectObj: {
                signPrice: 0,
            },
            newRebateObj: {
                time: '',
                "ctId": '',
                "price": 0,
                "remarks": '',
            },
            isShowAdd: true,
            haveNew: false,
            id: this.$route.query.formId,
            expandNum: 0,
            modal1: false,
            baseInfor: {
            },
            pageSize: 10,
            pageNo: 1,
            baseList: [
                {name: 'ID', value: 'code'},
                {name: '手机号', value: 'phone'},
                {name: "姓名", value: 'name'},
                {name: "学生EC号", value: 'studentId'},
                {name: "微信openID", value: 'openId'},
                {name: "最近登录时间", value: 'registrationTime'},
                {name: "成为推广员累计天数", value: 'succDay'},
            ],
            data: {
                count: '',
                list: [
                   
                ]
            },
            columns: [
                {
                    title: "领任务时间",
                    key: "createDate",
                    align: "center",
                },
                {
                    title: "任务ID",
                    key: "taskCode",
                    align: "center"
                },
                {
                    title: "任务名称",
                    key: "taskName",
                    align: "center"
                },
                {
                    title: "推广点击量",
                    key: "clickNum",    
                    align: "center"
                },
                {
                    title: "成功推广数",
                    key: "successNum",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: params.row.successNum/1 > 0 ? '#44bcbc' : '#000',
                                cursor: 'pointer',
                            },
                            on: {
                                click: () => {
                                    if (params.row.successNum/1 > 0) {
                                        this.succId = params.row.id
                                        let _this = this
                                        let use, from
                                        if (params.row.type == 'news' || params.row.type == 'audio' || params.row.type == 'image'|| params.row.type == 'video') {
                                            from = '3'
                                            use = 1;
                                        } else {
                                            use = params.row.isUse;
                                            switch(params.row.type) {
                                                case 'goods': from = '0'; break;
                                                case 'pack': from = '1'; break;
                                                case 'invite': from = '2'; break;
                                            }
                                        }
                                        const {href} =  _this.$router.resolve({
                                            name: 'market.expandData',
                                            query: {
                                                formId: params.row.taskId,
                                                from,
                                                expandId: params.row.id,
                                                use,
                                            },
                                        });
                                        window.open(href, '_blank')
                                        // _this.$router.push({
                                        //     name: 'market.expandDetail',
                                        //     query: {
                                        //         from,
                                        //         id: params.row.id,
                                        //         use,
                                        //     },
                                            
                                        // });
                                        // this.getSuccList()
                                    }
                                }
                            }
                        },
                            params.row.successNum
                        )
                    }
                },
            ],
            pageSizeR: 10,
            pageNoR: 1,
            data1: {
                // count: 20,
                list: [
                ]
            },
            columns1: [
                {
                    title: "返利时间",
                    key: "time",
                    align: "center",
                    width: 140,
                },
                {
                    title: "返利针对合同号",
                    key: "ctId",
                    align: "center"
                },
                {
                    title: "签约金额",
                    key: "signPrice",
                    align: "center",
                    render: (h, params) => {
                        return h("div",{},
								Number(params.row.signPrice).toFixed(2)								
							);
                    }
                },
                {
                    title: "返利金额",
                    key: "price",
                    align: "center",
                    render: (h, params) => {
                        return h("div",{},
								Number(params.row.price).toFixed(2)								
							);
                    }
                },
                {
                    title: "占比",
                    key: "price",
                    align: "center",
                    render: (h, params) => {
                        return h("div",{},
								Number(params.row.price/params.row.signPrice*100).toFixed(2) + '%'								
							);
                    }
                },
                {
                    title: "记录人",
                    key: "createName",
                    align: "center"
                },
                {
                    title: "备注",
                    key: "remarks",
                    align: "center"
                },
            ],
            succColumns: [
                {
                    title: "推广员订单号",
                    key: "objectCode",
                    align: "left",
                    width: 130,
                },
                {
                    title: "用户昵称",
                    key: "name",
                    align: "left",
                },
                {
                    title: "Union ID",
                    key: "unionID",
                    align: "left",
                    width: 135,
                },
                {
                    title: "用户已签合同",
                    key: "contractNo",
                    align: "left"
                },
                {
                    title: "返利状态",
                    key: "rebate",
                    align: "left",
                    render: (h, params) => {
                        return h ('span', {}, 
                           params.row.rebate ? params.row.rebate : '/' 
                        )
                    }
                },
                {
                    title: "操作",
                    key: "ctId",
                    align: "left",
                    render: (h, params) => {
                        return  h('a', {
                            on: {
                                click: () => {
                                    this.editSignObj = params.row
                                    this.editModel = true
                                }
                            }
                        },
                            '编辑合同'
                        )
                    }
                },
            ],
        }
    },

    watch: {
        baseInfor(newV) {
            if (newV.rebateNum>newV.signNum) {
                this.haveNew = true
                return  
            }
            this.haveNew = false
        },
    },

    computed: {
        
    },

    components: {
        btnlist,
        baseInfor,
    },

    mounted() {
        this.form()
        this.expandCaseList()
    },

    methods: {
        priceBlur(val) {
            if (this.selectObj.signPrice)  this.rebateRatio = (this.newRebateObj.price/this.selectObj.signPrice*100).toFixed(2)
        },

        ratioBlur(val) {
            if (this.selectObj.signPrice)  this.newRebateObj.price = (this.rebateRatio*this.selectObj.signPrice/100).toFixed(2)
        },

        expandCaseList() {
            let obj = {
               openId: this.id,
               pageSize: this.pageSize,
               pageNo: this.pageNo,
            }
            this.loading = true
            expandMan.expandCaseList(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }
            }).catch(errors.call(this)).finally(() => {
                this.loading = false
            });
        },

        getSuccList() {
            let obj = {
                spreadId: this.succId,
            }
            expandMan.succList(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.succList = res.data.data.list
                    this.successModel = true
                }
            }).catch(errors.call(this)).finally(() => {
            });
        },

        form() {
           let obj = {
               openId: this.id,
            }
            expandMan.form(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.baseInfor = res.data.data
                }
            }).catch(errors.call(this));
            expandMan.NoRebateList(obj).then(valid.call(this)).then(res => {
            if(res.ok) {
                this.ctIdList = res.data.data
            }
            }).catch(errors.call(this));
        },

        rebateSelectChange(val) {
            this.newRebateObj.ctId = val
            this.selectObj = this.ctIdList.find(item => {
                return val == item.ctNo
            })
            this.selectObj.signPrice =  this.selectObj.signPrice.substr(0, this.selectObj.signPrice.length-2)
        },

        rebate() {
            this.tableList()
        },

        tableList() {
            let obj = {
                pageSize: this.pageSizeR,
                pageNo: this.pageNoR,
                openId: this.id,
            }
            expandMan.tableList(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.data1 = res.data.data
                    this.modal1 = true
                }
            }).catch(errors.call(this));
        },

        timeChange(val) {
            this.newRebateObj.time = val
        },

        saveTable() {
            let obj = {
               openId: this.id,
                "time": `${this.newRebateObj.time}:00`,
                "ctId": this.newRebateObj.ctId,
                "cusCode": this.selectObj.cusCode,
                "signPrice": this.selectObj.signPrice,
                "price": this.newRebateObj.price,
                "remarks":this.newRebateObj.remarks,
            }
            expandMan.saveTable(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.isShowAdd = !this.isShowAdd
                    this.newRebateObj =  {
                        time: '',
                        "ctId": '',
                        "price": '',
                        "remarks": '',
                    },
                    this.tableList()
                    this.form()
                }
            }).catch(errors.call(this));
        },

        newRebate() {
            this.isShowAdd = !this.isShowAdd
        },

        addRebate() {
            let onOff = false
            console.log(this.newRebateObj)
            for (let i in this.newRebateObj) {
                console.log(this.newRebateObj[i])
                if (this.newRebateObj[i]==''&&i!='remarks') {
                    onOff = true
                }
            }
            if (onOff) {
                this.$Message.error('请填写必填项')
                return  
            }
            this.saveTable()
        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.expandCaseList()
        },

        onPageChange(val) {
            this.pageNo = val
            this.expandCaseList()
        },

        onPageChangeR(val) {
            this.pageNoR = val
            this.tableList()
        },

        onPageSizeChangeR(val) {
            this.pageSizeR = val
            this.tableList()
        },

        ok() {

        },

        okSuccess() {

        },

        cancel() {

        },

        cancelEdit() {},

        okEdit() {
            if (!this.editSignObj.contractNo) {
                this.$refs.editeM.visible = true
                this.editModel = true
                this.$Message.error('请输入合同号')
                return
            }
            this.editSignNum()
        },

        editSignNum() {
            let obj = {
                "id": this.editSignObj.id,
                "contractNo": this.editSignObj.contractNo
            }
            expandMan.editSignNun(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.getSuccList()
                }
            }).catch(errors.call(this));
        }
    }
}
</script>