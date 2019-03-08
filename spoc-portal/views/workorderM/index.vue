<style lang='less'>
    .workorderMGSX {
        .updataTime {
                color: #b8b8b8;
                display: inline-block;
                text-align: right;
                width: 60px;
                margin-right: 14px;
            }
        .docu-top-area-timing-through {
            width: 14px;
            height: 4px;    
            display: inline-block; 
            margin-top: 14px;				
            background-color: #44bcb7;
        }
        .all {
            i {
                font-style: normal;
                font-size: 18px;
                color: red;
            }
        }
        .page {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 140px;
        }
    }
    .checkDetailMGSX {
        ul,li {
            margin: 0;
            padding: 0;
        }
        li {
            list-style: none;
            line-height: 30px;
            margin-left: 10px;
            span {
                display: inline-block;
                width: 80px;
                text-align: right;
                margin-right: 10px;
                vertical-align: top;
            }
            .description {
                display: inline-block;
                width: 550px;
            }
        }
    }
</style>
<template>
    <div class="workorderMGSX">
        <div v-if="!isShowDetail">
            <v-select 
                style="width: 396px;margin: 15px 0;"
                placeholder="输入编号/问题内容关键词/提交姓名"
                :datafunc="datafunc"
                icon="search" 
                v-model="compact"
                k='cnname'
                @on-enter="textChange" 
                @on-click="textChange" 
                @selected="textChange">
            </v-select>
            <span class="updataTime">提交时间：</span>
            <DatePicker type="date" placeholder="开始时间" style="width: 110px" @on-change="onchangeBDate"></DatePicker>
            <span class="docu-top-area-timing-through"></span>
            <DatePicker type="date" placeholder="结束时间" style="width: 110px" @on-change="onchangeEDate"></DatePicker>
            <p class="all">共计<i>{{data.count}}</i>条</p>
            <v-title
                title="反馈列表"
            >
            <v-btn-options 
                slot="right" :btns="btnsNormal1">
            </v-btn-options>
            </v-title>
            <Table :columns="columns" :data="data.list"  @on-sort-change="onSortChange" @on-filter-change="filterChange" @on-selection-change='selectChange'></Table>
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :current="pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
            </div>
            <!-- 对话框 -->
            <Modal
                :mask-closable='false'
                v-model="modalShow"
                width=728
                title="确认接收"
                @on-ok="ok"
                @on-cancel="cancel">
                <p style="text-align:center">确认接收当前反馈内容？</p>
            </Modal>
            <Modal
                :mask-closable='false'
                v-model="modalClose"
                width=728
                title="确认关闭"
                @on-ok="okClose"
                @on-cancel="cancelClose">
                <p style="text-align:center">确认关闭当前反馈内容？</p>
            </Modal>
            <Modal
                v-model="checkDetailM"
                width=728
                title="确认解决结果"
                :mask-closable='false'
            >
                <ul class="checkDetailMGSX">
                    <li><span>优先级：</span>{{checkInfo.status}}</li>
                    <li><span>问题分类：</span>{{checkInfo.type}}</li>
                    <li><span>问题描述：</span><div class="description" v-html="checkInfo.content">{{checkInfo.content}}</div></li>
                </ul>
                <div slot="footer">
                    <Button @click="cancelResole">不予解决</Button>
                    <Button type="primary" @click="okResole">确认已解决</Button>
                </div>
            </Modal>  
            <Modal
                :mask-closable='false'
                v-model="reasonModal"
                width=728
                title="确认解决结果"
                @on-ok="okReason"
                ref="reason"
                @on-cancel="cancelReason">  
                <div style="padding-left:10px">
                    <p style="line-height:30px" v-if="isReject"><span style="color:red">*</span>请输入不予解决的理由</p>
                    <p style="line-height:30px" v-else>请描述解决方案</p>
                    <editor :value='editorC' @input="inputContent"></editor>
                </div>
            </Modal>
        </div>
        <div v-else>
            <view-feedback-detail :detailId='detailId'></view-feedback-detail>
        </div>
    </div>
</template>

<script>
    import vSelect from '@public/modules/vSelect'
    import vTitle from "@public/modules/vTitle";
    import vBtnOptions from '@public/modules/vBtnOptions'
    import editor from '../selfCentred/editor'
    import viewFeedbackDetail from '../selfCentred/viewFeedbackDetail.vue'
    import valid, {errors, sys} from '../../libs/request.js';

    export default {
        data() {
            return {
                isReject: false,
                isShowDetail: false,
                detailId: '',
                editorC: '',
                isShow: false,
                handleType: '',
                checkInfo: {
                    content: '',
                },
                modalShow: false,
                modalClose: false,
                showType: '',
                reasonModal: false,
                isAllType: false,
                checkDetailM: false,
                singleId: '',
                showIds: '',
                closeIds: '',
                startTime: '',
                endTime: '',
                pageSize: 10,
                pageNo: 1,
                type: '',
                status: '',
                sort: '',
                priority: '',
                compact:'',
                data: {
                    count: 20,
                    list: [],
                },
                btnsNormal1: [],
                columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: "编号",
                        key: "no",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    'click': () => {
                                        this.detailId = params.row.id
                                        this.isShowDetail = true
                                    }
                                }
                            },
                            params.row.no
                            )
                        }
                    },
                    {
                        title: "问题内容",
                        key: "content",
                        align: "center",
                        width: 240,
                        render: (h, params) => {
                            return h('div', {
                                style: {
                                    // overflow:'hidden',
                                    color: '#44bcbc',
                                    // textOverflow:'ellipsis',
                                    // display:'-webkit-box',
                                    // '-webkit-box-orient':'vertical',
                                    // '-webkit-line-clamp':2,
                                    'cursor': 'pointer'
                                },
                                on: {
                                    'click': () => {
                                        this.detailId = params.row.id
                                        // console.log(params.row.id)
                                        this.isShowDetail = true
                                    }
                                }
                            },
                            params.row.content.replace(/<\/?.+?\/?>/g,"").length>10?(params.row.content.replace(/<\/?.+?\/?>/g,"").substr(0, 10)+'...'):params.row.content.replace(/<\/?.+?\/?>/g,"")
                            )
                        }
                    },
                    {
                        title: "问题分类",
                        key: "type",
                        align: "center",
                        filters: [],
                        filterMultiple: false,
                        filterRemote() {
                        }
                    },
                    {
                        title: "优先级",
                        key: "priority",
                        align: "center",
                        width: 120,
                        filters: [],
                        filterMultiple: false,
                        filterRemote() {
                        }
                    },
                    {
                        title: "提交人",
                        key: "createBy",
                        align: "center"
                    },
                    {
                        title: "提交时间",
                        key: "updateDate",
                        sortable: "custom",                    
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center",
                        filters: [],
                        filterMultiple: false,
                        filterRemote() {
                        }
                    },
                    {
                        title: "操作",
                        // key: "updateDate",
                        sortable: "custom",                    
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.isAllType = false
                                        this.singleId = params.row.id
                                        if (params.row.status == '已提交') {
                                            this.modalShow = true;
                                        }else if (params.row.status == '已验证') {
                                            this.modalClose = true;
                                        } else if (params.row.status == '处理中') {
                                            this.checkInfo = params.row
                                            this.editorC = ''
                                            this.checkDetailM = true;
                                        }
                                    }
                                }
                            }, 
                            params.row.status == "已提交" ? "接收" : (params.row.status == "已验证") ? "关闭" : (params.row.status == "处理中") ? "确认" : ""
                            )
                        }
                    },
                ]
            }
        },

        components: {
            vSelect,
            vBtnOptions,
            vTitle,
            editor,
            viewFeedbackDetail,
        },

        mounted() {
            this.getWordorderMList()
            this.getDictType('sys_workorder_priority')
            this.getDictType('sys_workorder_type')
            this.getDictType('sys_workorder_status')
        },

        methods: {
             getDictType(type) {
                let obj = {
                    type: type,
                }
                sys.dictListData(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let data = res.data.data
                        if (type == 'sys_workorder_priority') this.columns[4].filters = data
                        if (type == 'sys_workorder_type') this.columns[3].filters = data
                        if (type == 'sys_workorder_status') this.columns[7].filters = data
                    }
                }).catch(errors.call(this)).finally();
            },

            getWordorderMList() {
                let obj = {
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    endTime: this.endTime,
                    name: this.compact,
                    sort: this.sort,
                    startTime: this.startTime,
                    status: this.status,
                    type: this.type,
                    priority: this.priority,
                }
                sys.wordorderMList(obj).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.data = res.data.data
                    }
                }).catch(errors.call(this)).finally();
            },

            onchangeEDate(val) {
                this.endTime = val
                this.getWordorderMList()
            },

            onchangeBDate(val) {
                this.startTime = val
                this.getWordorderMList()
            },

            onSortChange(val) {
                this.sort = 0
                if (val.order == "normal") this.sort = ''
                if (val.order == 'desc') this.sort = '1'
                this.getWordorderMList()
            },

            filterChange(val) {
                if (val.key == 'status') this.status = val._filterChecked[0]
                if (val.key == 'priority') this.priority = val._filterChecked[0]
                if (val.key == 'type') this.type = val._filterChecked[0]
                this.getWordorderMList()
            },

            selectChange(val) {
                this.btnsNormal1 = []
                let show, close;
                show = val.some(item => item.status=='已提交')
                close = val.some(item => item.status == '已验证')
                if (show) {
                    this.btnsNormal1.push({ class: "bt3", text: "批量接收", btnClick: () => this.isAllType = this.modalShow = true },)
                    this.showIdHandle(val)
                }
                if (close) {
                    this.btnsNormal1.push({ class: "bt3", text: "批量关闭", btnClick: () => this.isAllType = this.modalClose = true },)
                    this.closeIdHanle(val)
                }
            },

            showIdHandle(val) {
                this.showIds = ''
                val.forEach(item => {
                    if(item.status == '已提交') this.showIds += item.id + ','
                })
            },

            closeIdHanle(val) {
                this.closeIds = ''
                val.forEach(item => {
                    if(item.status == '已验证') this.closeIds += item.id + ','
                })
            },

            okClose() {
                this.showType = 'close'
                if (this.isAllType) {
                    this.editStatusAll(this.closeIds)
                    return
                }
                this.editStatusAll(this.singleId)
            },

            cancelClose() {

            },

            ok() {
                this.showType = 'receive'
                if (this.isAllType) {
                    this.editStatusAll(this.showIds)
                    return
                }
                this.editStatusAll(this.singleId)
            },

            cancel() {

            },

            okResole() {
                this.checkDetailM = false
                this.handleType = 'fixed'
                this.isReject = false
                this.reasonModal = true
                // this.handleWordorder()
            },

            cancelResole() {
                this.handleType = 'willnotfix'
                this.checkDetailM = false
                this.isReject = true
                this.reasonModal = true
            },

            okReason() {
                this.handleWordorder()
            },
            
            cancelReason() {
            },

            editStatusAll(id) {
                let obj = {
                    id: id,
                    status: this.showType
                }
                sys.editStatusAll(obj).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.$Message.info(res.data.message)
                        this.getWordorderMList()
                    }
                }).catch(errors.call(this)).finally();
            },

            inputContent(val) {
                this.editorC = val
            },

            handleWordorder() {
                console.log(this.handleType, 88)
                if (this.handleType === 'willnotfix' && !this.editorC.replace(/<\/?.+?\/?>/g,"")) {
                    this.$Message.info('请填写不予解决理由')
                    this.$refs.reason.visible = true
                    this.reasonModal = true
                    return  
                }
                let obj = {
                    id: this.checkInfo.id,
                    status: this.handleType,
                    content: this.editorC
                }
                // if (this.handleType == 'willnotfix') {
                    // obj = Object.assign(obj, {
                    //     content: this.editorC
                    // })
                // }
                sys.handleWordorder(obj).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.$Message.info(res.data.message)
                        this.getWordorderMList()
                    }
                }).catch(errors.call(this)).finally();
            },

            onPageChange(val) {
                this.pageNo = val
                this.getWordorderMList()
            },

            onPageSizeChange(val) {
                this.pageSize = val
                this.getWordorderMList()
            },

            textChange() {
                this.getWordorderMList()
            },

            datafunc() {
                return new Promise((resole, reject) => {

                })
            },
        }
    }
</script>


