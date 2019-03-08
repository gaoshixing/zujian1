<style lang='less'>
    .formMeanGSX {
        .tableContent {
            b {
                font-style: normal;
                color: red;
                font-size: 18px;
            }
            .page {
                text-align: center;
                margin-top: 20px;
                margin-bottom: 140px;
            }
        }
        .cancleBorder {
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
    .dialogContentF {
            p {
                line-height: 40px;
                span {
                    
                }
            }
        }
</style>
<template>
    <div class="formMeanGSX">
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="请输入表单名称"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <div class="tableContent cancleBorder">
            <p style="margin-bottom:10px">当前表单数 <b>{{data.count}}</b></p>
            <v-title
                title="统计数据-列表"
            >
            <v-btn-options 
                slot="right" :btns="btnsNormal1">
            </v-btn-options>
            </v-title>
            <Table :columns="columns" :data="data.list"  @on-sort-change="onSortChange" @on-filter-change="filterChange"></Table>
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
            </div>
        </div>
        <!-- 对话框 -->
        <Modal
            v-model="modal"
            width=728
            ref="refModal"
            :title="dialogTitle"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="dialogContentF">
                <!-- <div  v-if="dialogTitle == '发布表单'">
                    <p>公开链接 &nbsp;&nbsp;&nbsp; <span style="color:#999">将表单发布为公开链接, 无需登录即可填写表单</span></p>
                    <p>表单填写链接</p>
                    <Input v-model="urlValue" style="width: 300px" :disabled="true"></Input> 
                    <Button type="primary" @click="CopyUrl">复制</Button>
                    <Button type="primary" @click="windowOpen">打开</Button>
                    <p>最晚填写时间</p>
                    <DatePicker type="datetime" :value="lastfillFormTime" placeholder="Select date" style="width: 200px"></DatePicker>
                    <p style="margin-top:10px">
                       <i-switch v-model="switch1" @on-change="switchChange">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </i-switch>
                        <span v-if="switch1" style="margin-left:20px">
                            <Input v-model="password" placeholder="请输入密码" style="width:200px"></Input>
                        </span>
                    </p>
                        
                </div> -->
                <div  v-if="dialogTitle == '删除表单'">
                    <p style="text-align:center;font-size:16px">确定删除当前表单?</p>
                </div>
                <div  v-if="dialogTitle == '启用表单'">
                    <p style="text-align:center;font-size:16px">确定启用当前表单?</p>
                </div>
                <div  v-if="dialogTitle == '禁用表单'">
                    <p style="text-align:center;font-size:16px">确定禁用当前表单?</p>
                </div>
           </div>
        </Modal>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import vTitle from "@public/modules/vTitle";
import vBtnOptions from '@public/modules/vBtnOptions'
import valid, { errors, common, sys } from "../../libs/request"
export default {
    data() {
        return {
            // lastfillFormTime: '',
            loading: true,
            formId: '',
            password: '',
            publishUrl: 'https://www.baidu.com/',
            switch1: false,
            urlValue: '',
            isVisible: false,
            compact: '',
            dialogTitle: '',
            modal: false,
            tableCount: '0',
            dataInfo: {},
            pageSize: 10,
            btnsNormal1: [{ class: "bt3", text: "创建表单", btnClick: this.showDialog }],
            data: {
                list: []
            },
            tplType: '',
            isPublish: '',
            columns: [
                {
					title: "表单名称",
					key: "name",
					align: "center",
				},
				{
					title: "创建人",
                    key: "creator",
                    align: "center",
                    width: 120,
				},
				{
					title: "更新时间",
                    key: "updateDate",
					sortable: "custom",                    
					align: "center"
				},
				{
					title: "表单类型",
                    key: "groupName",
                    align: "center",
                    width: 120,
                    filters: [],
                    filterMultiple: false,
                    filterRemote() {
                    }
				},
				{
					title: "状态",
					key: "isPublish",
                    align: "center",
                    filters: [
                        {
                            label: '禁用',
                            value: '0'
                        },
                        {
                            label: '启用',
                            value: '1'
                        },
                    ],
                    filterMultiple: false,
                    filterRemote() {
                    },
                    render: (h, params) => {
                        return h('span', {},
                            params.row.isPublish == '1' ?  '启用'  : '禁用'
                        )
                    }
				},
				{
					title: "操作",
					key: "endTime",
                    align: "center",
                    width: 200,
                    render: (h, params) => {
                        if(params.row.isPublish == 0) {
                            return h('p',{
                            }, [
                                h("a",{
                                    style: {
                                        display: 'inline-block',
                                        width: '40px',
                                        textAlign: 'center'
                                    },
                                    on: {
                                        click : () => {
                                            this.showTableDialog(params.row.id +'|edit')
                                        }
                                }
                                },'编辑'),
                                h("a",{
                                    style: {
                                        display: 'inline-block',
                                        width: '40px',
                                        textAlign: 'center'
                                    },
                                    on: {
                                        click : () => {
                                            this.showTableDialog(params.row.id +'|open')
                                        }
                                }
                                },'启用'),
                                h("a",{
                                    style: {
                                        display: 'inline-block',
                                        width: '40px',
                                        textAlign: 'center'
                                    },
                                    on: {
                                        click : () => {
                                            this.showTableDialog(params.row.id +'|copy')
                                        }
                                }
                                },'复制'),
                                h("a",{
                                    style: {
                                        display: 'inline-block',
                                        width: '40px',
                                        textAlign: 'center'
                                    },
                                    on: {
                                        click : () => {
                                            this.showTableDialog(params.row.id +'|dele')
                                        }
                                }
                                },'删除'),
                            ])
                        }
                        if(params.row.isPublish == 1) {
                            return h('p',{
                                    }, [
                                        h("a",{
                                            style: {
                                                display: 'inline-block',
                                                width: '40px',
                                                textAlign: 'center'
                                            },
                                            on: {
                                                click : () => {
                                                    this.showTableDialog(params.row.id +'|edit')
                                                }
                                        }
                                        },'编辑'),
                                        h("a",{
                                            style: {
                                                display: 'inline-block',
                                                width: '40px',
                                                textAlign: 'center'
                                            },
                                            on: {
                                                click : () => {
                                                    this.showTableDialog(params.row.id +'|forb')
                                                }
                                        }
                                        },'禁用'),
                                        h("a",{
                                            style: {
                                                display: 'inline-block',
                                                width: '40px',
                                                textAlign: 'center'
                                            },
                                            on: {
                                                click : () => {
                                                    this.showTableDialog(params.row.id +'|copy')
                                                }
                                        }
                                        },'复制'),
                            ])
                        }
                        // if(params.row.isPublish == 2) {
                        //     return h('p',{
                        //     }, [
                        //         h("a",{
                        //             style: {
                        //                 display: 'inline-block',
                        //                 width: '40px',
                        //                 textAlign: 'center'
                        //             },
                        //             on: {
                        //                 click : () => {
                        //                     this.showTableDialog( params.row.id +'|open')
                        //                 }
                        //         }
                        //         },'启用'),
                        //         ])                                
				        // }
                    }
                }
            ]
        }
    },

    components: {
        vSelect,
        vTitle,
        vBtnOptions,
    },

    mounted() {
        this.getList()
        this.getTableSelect()
        // this.getTime(10)
    },

    methods: {
        // getTime(val) {
            // this.lastfillFormTime = new Date(new Date().setDate(new Date().getDate() + val)).format('yyyy-MM-dd') + ' 00:00:00'
            // console.log(this.lastfillFormTime)
        // },

        getList(params={}) {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                name: this.compact,
                groupId: this.tplType,
                isPublish: this.isPublish
            }
            if(params) {
                obj = Object.assign(obj, params)
            }
            common.listFormMean(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        // 获取筛选项
        getTableSelect() {
            let obj = {
                type: 'com_form_tpl_kind'
            }
           sys.getByType(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.$set(this.columns[3], 'filters', res.data.data)
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        filterChange(val) {
            if(val.title == "表单类型") {
                if(!val._filterChecked.length) {
                    this.tplType = ''
                }else {
                    let selectO = val.filters.find((item, index) => {
                        return item.value == val._filterChecked[0]
                    })
                    this.tplType = selectO.value
                }
            }else if(val.title == "状态") {
                this.isPublish = val.filters == 'undefinded' ? '' :  val._filterChecked[0]
            }

            this.getList()
		},

        // 删除
        delete() {
            let obj = {
                id: this.formId
            }
            common.deleteFormMean(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.getList()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        textChange() {
            this.getList()
        },

        showDialog() {
            this.$router.push({
                name: 'portal.formEdit'
            })
        },

        // 复制
        handle(obj) {
            common.handleFormMean(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.getList()
                    this.switch1 = false
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        showTableDialog(val) {
            let [tabId, dialogType] = val.split('|')
            this.formId = tabId
            // if(dialogType == 'publ') {
            //     this.dialogTitle = '发布表单'
            //     this.modal = true
            //     return
            // }

            if(dialogType == 'edit') {
                this.$router.push({
                    name: 'portal.formEdit',
                    query: {
                        id: tabId
                    }
                })
                return
            }

            if(dialogType == 'copy') {
                let obj = {
                    type: 3,
                    id: tabId
                }
                this.handle(obj)
                return
            }
            
            if(dialogType == 'dele') {
                this.dialogTitle = '删除表单'
                this.modal = true
                return
            }

            if(dialogType == 'open') {
                this.dialogTitle = '启用表单'
                this.modal = true
                return
            }

            if(dialogType == 'forb') {
                this.dialogTitle = '禁用表单'
                this.modal = true
                return
            }
        },

        onPageSizeChange(val) {
			this.pageSize = val
		    this.getList()
		},

		onPageChange(val) {
			this.pageNo = val
			this.getList()
        },

        switchChange(val) {
            console.log(val)

        },

        CopyUrl() {
            const input = document.createElement('input')
            document.body.appendChild(input)
            input.setAttribute('value', this.publishUrl)
            input.select()
            if (document.execCommand('copy')) {
                document.execCommand('copy')
                this.$Message.info( '复制成功!')
            }

            // 删除'虚拟'DOM
            document.body.removeChild(input)
        },

        windowOpen() {
            window.open(this.publishUrl)
        },

        onSortChange(obj) {
            if(obj.order == 'normal') {
                this.getList()
                return
            }

            let params ={
                orderBy: `${obj.key} ${obj.order}`
            }
            this.getList(params)
        },

        cancel() { 

        },

        ok() {
            if(this.dialogTitle == '删除表单') {
                this.delete()
                return
            }

            if(this.dialogTitle == '创建表单') {
                this.$refs.addTask.saveInfo()
                return
            }

            // if(this.dialogTitle == '发布表单') {
               
            //     if(this.switch1 == 1 && !this.password) {
            //         this.modal = true
            //         this.$refs.refModal.visible = true
            //         this.$Message.info('请填写密码')
            //         return
            //     }
            //     this.modal = false
            //     this.$refs.refModal.visible = false
            //     let obj = {
            //         type: 1,
            //         isPassword: this.switch1 == true ? 1 : 0,
            //         password: this.password,
            //         id: this.formId,
            //         publishUrl: "",
            //         lastTime: this.lastfillFormTime,
            //     }
            //     this.handle(obj)
            //     return
            // }

            if(this.dialogTitle == '启用表单') {
                let obj = {
                    type: 1,
                    id: this.formId,
                }
                this.handle(obj)
                return
            }

            if(this.dialogTitle == '禁用表单') {
                let obj = {
                    type: 2,
                    id: this.formId,
                }
                this.handle(obj)
                return
            }
        },
        
        datafunc() {
            return new Promise((resole, reject) => {

            })
        }
    }
}
</script>

