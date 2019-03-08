<style lang='less'>
    .channelMGSX {
        border-top: 1px solid #e0e0e0;
        .page {
            text-align: center;
            margin-top: 20px;
        }
        .titleBar {
			font-size: 12px;
			.bar {
				margin-top: 10px;
			}
			span {
				display: inline-block;
				padding: 4px 10px;
				cursor: pointer;
			}
			.active {
				background-color: #44bcb7;
				color: white;
			}
			span:first-of-type {
				padding: 4px 0;
				color: #b8b8b8;
				cursor: auto;
            }  
        }   
        p {
            i {
                font-style: normal;
                color: #44bcbc;
                font-size: 18px;
            }
        }
        .ivu-table .ivu-table-header thead tr th:nth-child(3){
            text-align: center
        }
        .cancleBorder {
            .ivu-table th {
                background: #fff;
            }
            .ivu-table-wrapper {
                border: none;
            }
            .ivu-table:after {
                content: '';
                width: 0px;
                
            }
            .ivu-table-column-center {
                background-color: #fff;
            }
        }
    }
    .CRMADMINGSX {
        p {
            line-height: 40px;
            span {
                i {
                    font-style: normal;
                    color: red;
                }
            }
        }
        p >span:first-child, div .key {
            color: #b8b8b8;
            display: inline-block;
            text-align: right;
            width: 99px;
        }
        >div {
            min-height: 20px;
            overflow: hidden;
            .key, .remarks ,.table {
                float: left;
            }
            .remarks, .table {
                width: 550px;
            }
            .table {
                max-height: 125px;
                overflow: auto
            }
        }
        // .ivu-table {
        //     max-height: 120px;
        //     overflow-y: scroll
        // }
    }

</style>
<template>
    <div class="channelMGSX">
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="请输入渠道名称/创建人"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
		<div class="titleBar">
			<span>创建时间：</span>
			<span v-for="(item, index) in monthList" :key="index" :class="{active:index==num}" @click="addClass(index, item)" >{{item}}</span>
             <DatePicker v-model="startTimeV" @on-change="beforeChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
				——
		    <DatePicker v-model="endTimeV" @on-change="afterChange" format="yyyy-MM" type="month" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
		</div>
        <p>共找到 <i>{{data.count}}</i> 条资源</p>
        <btnlist
            title="渠道列表">
        </btnlist>
        <div class="cancleBorder">
            <Table :loading="loading" :columns="columns" :data="data.list"  @on-sort-change="onSortChange"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
        <!-- 弹出窗 -->
        <Modal
            v-model="modal1"
            width=728
            title="查看渠道信息"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="CRMADMINGSX">
                <p><span>代理名称：</span>{{formInfo.name}}</p>
                <p><span>代理类型：</span>{{formInfo.type}}</p>
                <p><span>分成比例：</span>{{formInfo.profitRatio}}%</p>
                <p><span>合同/协议：</span><a>{{signName}}</a> <a style="margin-left:30px" @click="updownFile(formInfo.url)">下载</a></p>
                <div>
                    <span class="key">备注：</span>
                    <div class="remarks">
                        {{formInfo.remarks}}
                    </div>
                </div>
                <p><span>更新人：</span>{{formInfo.createBy}}</p>
                <p><span>更新时间：</span>{{formInfo.createDate}}</p>
                <div>
                    <span class="key">更新记录：</span>
                    <div class="table">
                        <Table :columns="columns1" :data="formInfo.channelFormVOList" ></Table>
                    </div>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="modal3"
            width=728
            title="编辑渠道信息"
            @on-ok="ok3"
            ref="modal3"
            @on-cancel="cancel3">
            <div class="CRMADMINGSX">
                <p><span><i>*</i> 代理名称：</span><Input v-model="formInfo.name" placeholder="Enter something..." style="width: 300px"></Input></p>
                <p><span><i>*</i> 代理类型：</span>
                    <RadioGroup v-model="isPerson" @on-change='radioChange'>
                        <Radio label="机构代理"></Radio>
                        <Radio label="个人代理"></Radio>
                    </RadioGroup>
                </p>
                <p><span><i>*</i> 分成比例：</span><Input v-model="formInfo.profitRatio" placeholder="Enter something..." style="width: 300px"></Input></p>
                <p><span>渠道费用：</span><Input v-model="formInfo.cost" placeholder="Enter something..." style="width: 300px"></Input></p>
                <p><span>合同/协议：</span><a>{{signName}}</a> <a style="margin-left:30px" @click="upLoadFile">更新</a></p>
                <div>
                    <span class="key">备注：</span>
                    <div class="remarks">
                        <Input v-model="formInfo.remarks" type="textarea" :rows="4" placeholder="Enter something..."></Input>
                    </div>
                </div>
            </div>
        </Modal>
        <!-- 上传文件 -->
        <up-to-pan ref="uptopan" objectId="" :dir="folderName" dirName="business" :format="['docx','pdf','doc']" type="import_channel" menuId ="801" @uploadok="onUploadOk" />

    </div>
</template>

<script> 
import vSelect from '@public/modules/vSelect'
import upToPan from '@public/modules/upToPan'
import btnlist from '@public/modules/btnlist'
import valid, { errors, common, sys, MARKETP } from "../../libs/request";
    export default {
        data() {
            return {
                loading: true,
                num: 0,
                signName: '',
                dirName: '',
                folderName: '',
                monthList: [
                    "不限",
                    "当前月",
                    "近三个月",
                    "近六个月"
                ],
                year: "2019",
                month: '',
                dataInfo: {
                    allTarget: 1422,
                },
                formInfo: {
                    channelFormVOList: []
                },
                modal1: false,
                modal3: false,
                compact: '',
                pageSize: 10,
                pageNo: 1,
                data: {
                    count: 20,
                    list: [
                        
                    ],
                    pageNo: 1,
                },
                columns: [
                    {
                        title: "渠道名称",
                        key: "name",
                        align: "center",
                        render: (h, params) => {
                            return h('a',{
                                on: {
                                    click: () => {
                                       this.getTableForm(params.row.id, 'check')
                                    }
                                }
                            },
                            params.row.name)
                        }
                    },
                    {
                        title: "创建人",
                        key: "createByName",
                        align: "center",
                    },
                    {
                        title: "创建时间",
                        key: "createDate",
                        sortable: "custom",
                    },
                    {
                        title: "获客次数",
                        key: "times",
                        sortable: "custom",                        
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'crm.resourceManage',
                                            query: {
                                                mName: params.row.name
                                            }
                                        })
                                    }
                                }
                            }, params.row.times)
                        }
                    },
                    {
                        title: "获客总人数",
                        key: "totalNum",
                        sortable: "custom",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'crm.customerManage',
                                            query: {
                                                mId: params.row.id
                                            }
                                        })
                                    }
                                }
                            }, params.row.totalNum)
                        }
                    },
                    {
                        title: "资源有效率",
                        key: "effectiveRatio",
                        sortable: "custom",
                        align: "center",
                    },
                    {
                        title: "资源优质率",
                        key: "qualityRatio",
                        sortable: "custom",
                        align: "center",
                    },
                    {
                        title: "客户转化率",
                        key: "convertRatio",
                        sortable: "custom",
                        align: "center",
                    }, 
                     {
                        title: "操作",
                        key: "",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                         this.getTableForm(params.row.id, 'edit')
                                    }
                                }
                            },
                            '编辑')
                        }
                    }, 
                ],
                columns1: [
                   {
                        title: "分成比例",
                        key: "profitRatio",
                        align: "center",
                        render: (h, params) => {
                            return h('span',{},
                                params.row.profitRatio + '%'
                            )
                        }
                    }, 
                   {
                        title: "合同协议",
                        key: "agreement",
                        align: "center",
                        render: (h, params) => {
                            return h('p', {}, [
                                h('a', {
                                    style: {
                                        marginRight: '12px'
                                    }
                                },
                                params.row.url.split('/')[params.row.url.split('/').length-1].replace(/.\d+/, '')),
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.updownFile(params.row.url)
                                        }
                                    }
                                }, '下载'),
                            ])
                        }
                    }, 
                   {
                        title: "更新时间",
                        key: "createDate",
                        align: "center",
                    }, 
                   {
                        title: "更新人",
                        key: "createBy",
                        align: "center",
                    }, 
                ],
                currentTime: '',
                startTime: '',
                endTime: '',
                startTimeV: '',
                signId: '',
                endTimeV: '',
                placeholder: '请输入时间',
            }
        },

        components: {
            vSelect,
            btnlist,
            upToPan
        },

        computed: {
            isPerson() {
                return this.formInfo.type == 'individual' ? '个人代理' : '渠道代理'
            }
        },

        mounted() {
            this.getTreeList()
            this.getTime()
            
        },

        methods: {
            getTime() {
                common.newDate({}).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.currentTime = res.data.data.date
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            handleData(index) {
                if(!index) {
                    this.startTime = this.endTime = ''
                    this.getTreeList('future')
                    return 
                }

                let [year, month] = this.currentTime.split('-')
                if(index == 1) {
                    this.endTime = `${year}-${month/1 + 1}-01`
                    this.startTime = `${year}-${month}-01`
                    this.getTreeList('future')
                    return
                }
                
                this.endTime = `${year}-${month/1 + 1}-01`
                month = month / 1  + 1 - 3 * (index - 1)
                year = month <= 0 ? year / 1 - 1 : year
                month = month <= 0 ? month + 12 : month
                month = month < 10 ? `0${month}` : month
                this.startTime =  `${year}-${month}-01`
                this.getTreeList('future')
            },

            getTreeList(type={}) {
                let obj = {
                    name: this.compact,
                    startDate: this.startTime,
                    endDate: this.endTime,
                    pageSize: this.pageSize,
                    pageNo: this.pageNo
                }
                if(type == 'input') {
                    if(!this.startTimeV && !this.endTimeV) {
                        this.num = 0
                    }else {
                        this.num = 1111
                    }
                }else if(type == 'future') {
                    this.startTimeV = this.endTimeV = ''
                }else if(typeof type == 'object') {
                    obj = Object.assign(obj, type)
                }
               
                MARKETP.listManagePage(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data = res.data.data
                        this.loading = false
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            getTableForm(id, type) {
                this.signId = id
                let obj = {
                    id: id,
                }
                MARKETP.tableForm(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        if(type == 'check') {
                            this.modal1 = true   
                        }else {
                            this.modal3 = true
                        }
                        this.formInfo = res.data.data
                        let arr = res.data.data.url.split('/')
                        this.signName = arr[arr.length-1].replace(/.\d+/, '')
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            addClass(index, month) {
                if(this.num == index) return
                this.num = index
                this.handleData(index)
            },

            radioChange(val) {
                this.isPerson = val
            },

            beforeChange(val) {
                if(val) {
                    this.startTime = `${new Date(val).format('yyyy-MM')}-01`
                }else {
                    this.startTime = ''
                }
                
                this.getTreeList('input')
            },

            afterChange(val) {
                if(val) {
                    this.endTime = `${new Date(val).format('yyyy-MM')}-01`
                }else {
                    this.endTime = ''
                }

                this.getTreeList('input')
            },

            updownFile(url) {
                let Arr = url.split('/')
                let realName = Arr[Arr.length-1]
                Arr = Arr.splice(0, Arr.length-1)
                let obj = {
                    dirName: 'business',
                    filePath: Arr.join('/'),
                    realName: realName,
                }
                window.open(sys.downloadPanCrm(obj))
            },

            getControlledSellList(month) {
                this.yearM = month
            },

            changeD(id) {
                this.modal2 = true
            },

            checkTag() {

            },

            onSortChange(obj) {
                if(obj.order == 'normal') {
                    this.getTreeList()
                    return
                }

                let params = {
                    orderBy: `${obj.key} ${obj.order}`
                }
                this.getTreeList(params)
            },

            onPageSizeChange(val) {
                this.pageSize = val
                this.getTreeList()
            },

            onPageChange(val) {
                this.pageNo = val
                this.getTreeList()
            },


            ok1() {

            },

            cancel1(){

            },

            ok() {

            },

            cancel(){

            },

            upLoadFile() {
                this.$refs.uptopan.doUpload()
            },

            //上传成功
            onUploadOk(data){
                if(data.status == "success") {
                    this.$Message.success(data.message);
                    this.localUpObj = data.data
                    this.signName = data.data.realName.replace(/.\d+/, '')
                    this.formInfo.url = data.data.filePath + '/' + data.data.realName 
                }else {
                    this.$Message.error(data.message);
                }
            },

            ok3() {
                if(!this.formInfo.name || !this.formInfo.profitRatio) {
                    this.modal3 = this.$refs.modal3.visible = true
                    this.$Message.info('请填写必填项')
                    return
                }
                let obj = {
                    id: this.signId,
                    name: this.formInfo.name,
                    type: (this.isPerson ==  '个人代理') ? 'individual'   : 'orgnazation',
                    profitRatio: this.formInfo.profitRatio,
                    cost: this.formInfo.cost,
                    url: this.formInfo.url,
                    direct: this.formInfo.direct,
                    officeId: this.formInfo.officeId,
                    remarks: this.formInfo.remarks
                }
                MARKETP.tableSaveForm(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.$Message.info(res.data.message)
                        this.getTreeList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
                
            },

            cancel3(){

            },
            
            textChange() {
                this.getTreeList()
            },

            datafunc() {
                return new Promise((resole, reject) => {
            })
        },
        }
    }
</script>
