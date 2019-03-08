<style lang='less'>
    .user-m-index-gsx {
        .cancleBorder {
        }
        .page {
            margin-top: 20px;
            margin-bottom: 140px;
            text-align: center;
        }
    }
    .add-tag-m-gsx {
        .noUp {
            color: #000;
        }
        .active {
            background-color: #44bcbc;
            color: #fff;
        }
        span {
            height: 33px;
            width: 118px;
            display: inline-block;
            border: 1px solid #e6e6e6;
            padding: 0 13px;
            line-height: 30px;
            border-radius: 7px;
            font-size: 14px;
            cursor: pointer;
            text-align: center;
            margin-bottom: 10px;
            margin-right: 16px;
            vertical-align:middle;
            overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
        }
        .add-tag {
            .add-font {
                color: #dadada;
                font-size: 20px;
                margin-right: 8px;
                vertical-align: middle;
            }
        }
        
    }
</style>
<template>
    <div class="user-m-index-gsx">
        <v-select 
            style="width: 294px;margin: 15px 0 32px;display:inline-block"
            placeholder="搜索姓名/手机号"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <v-select 
            style="width: 294px;margin: 15px 0 32px 20px;display:inline-block"
            placeholder="搜索标签"
            :datafunc="datafuncTag"
            icon="search" 
            v-model="compactTag"
            k='cnname'
            @on-enter="textChangeTag" 
            @on-click="textChangeTag" 
            @selected="textChangeTag">
        </v-select>
        <btnlist
            title="用户列表"
            :btnList='btnList'
            >
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.list" @on-selection-change='tableSelectChange' class="common-table" :loading="loading"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
         <!-- 对话框 -->
        <Modal
            ref="md"
            v-model="modal1"
            title="添加标签"
            width=728
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="add-tag-m-gsx">
                <span v-for="(item, index) in tagList" class="noUp" @click="isShowActive(item, index)" :class="{'active': item.isActive}">{{item.name}}</span>
                <Input v-model="tagValue" v-show="isShowAdd" style="width: 118px;height:33px;margin-right: 16px;vertical-align:top" />
                <span class="add-tag" @click="addTag">
                    <i v-if="isSure=='确认添加'" class="icon-yaoqinghan-queren add-font iconfont" style="color: #44bcbc"></i>
                    <i v-if="isSure=='取消添加'" class="icon-guanbi add-font iconfont" style="color: red; font-size: 12px"></i>
                    <i v-if="isSure=='添加标签'" class="icon-icon-test1 add-font iconfont"></i>{{isSure}}
                </span>
            </div>
        </Modal>

        <Modal
            ref="remarks"
            v-model="modal2"
            title="备注"
            width=728
            @on-ok="okRemarks"
            @on-cancel="cancelRemarks">
            <div>
                <Input v-model="textareaV" type="textarea" :rows="4" placeholder="请填写备注信息" />
            </div>
        </Modal>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import btnlist from '@public/modules/btnlist'
import valid,{errors, sys, useM} from '../../libs/request';

export default {
    data() {
        return {
            loading: false,
            isSure: '添加标签',
            compactTag: '',
            textareaV: '',
            publicInfo: {},
            tagValue: '',
            modal2: false,
            tagList: [],
            openids: [],
            isShowAdd: false,
            openId: '',
            compact: '',
            modal1: false,
            pageNo: 1,
            pageSize: 10,
            tagOperateLogs: [],
            tabValue: 'name1',
            btnList: [
                {
                    text: '导出',
                    type: 'primary',
                    children: [
                        {text: '导出全部', event: this.export,},
                        {text: '导出所选', event: this.exportSelect,}
                    ]
                },
                {
                    text: '打标签',
                    type: 'primary',
                    event: this.giveTag
                },
            ],
            data: {
                count: 20,
                list: []
            },
            columns: [
                {   
                    type: 'selection',
                    align: "center",
                    width: 60,
                },
                {
                    title: "头像",
                    key: "objectValue",
                    align: "center",
                    render: (h, params) => {
                        return h('img', {
                            domProps: {
                                src: params.row.avatarUrl
                            },
                            style: {
                                width: '40px',
                                heigth: '40px',
                                'margin-top': '5px'
                            }
                        })
                    }
                },
                {
                    title: "昵称",
                    key: "name",
                    align: "center"
                },
                {
                    title: "openID",
                    key: "openId",
                    align: "center"
                },
                {
                    title: "性别",
                    key: "predictNum",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {},
                            params.row.gender == 1 ? '男' : params.row.gender == 2 ? '女' : '未知'
                        )
                    }
                },
                {
                    title: "标签",
                    key: "predictNum",
                    align: "center",
                    render: (h, params) => {
                        return h('div', params.row.tagList.map(item => {
                            return h('a',{
                                style: {
                                    marginRight: '5px',
                                }
                            },
                            item.tagName
                            )
                        }))
                    }
                },
                {
                    title: "操作",
                    key: "predictNum",
                    align: "left",
                    render: (h, params) => {
                        return h("div", {
                            style: {
                                textAlign: 'left'
                            }
                        }, [
                            h(
                                "a",
                                {
                                    style: {
                                        marginRight: "10px",
                                    // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'useM.detail',
                                                query: {
                                                    userId: params.row.id
                                                }
                                            })
                                        }
                                    }
                                },
                                "详细资料"
                            ),
                            h(
                                "a",
                                {
                                   
                                    on: {
                                        click: () => {
                                            this.textareaV = params.row.beizhu
                                            this.openId = params.row.openId
                                            this.modal2 = true 
                                        }
                                    }
                                },
                                "备注"
                            ),
                        ])
                    }
                },
            ]
        }
    },

    components: {
        vSelect,
        btnlist
    },

    watch: {
        tagValue() {
            if(this.tagValue) {
                this.isSure = '确认添加'
            } else {
                if (this.isShowAdd) {
                    this.isSure = '取消添加'
                    return
                } 
                this.isSure = '添加标签'
            }
        }
    },

    mounted() {
        this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
        this.getDataList()
    },

    methods: {
        tableSelectChange(val) {
            this.openids = []
            val.forEach(item => {
                this.openids.push(item.openId)
            })
        },

        getDataList() {
            let obj = {
                name: this.compact,
                tagName: this.compactTag,
                appId: this.publicInfo.id,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
            }
            this.loading = true
            useM.getDataList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    let dataList = res.data.data
                    this.data = dataList
                }
            }).catch(errors.call(this)).finally(() =>{
                this.loading = false
            });;
        },

        getAllTag() {
            let obj = {
                appId: this.publicInfo.id,
            }
            useM.allTag(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    let dataList = res.data.data
                    this.modal1 = true
                    if (dataList.length) {
                        this.tagList = dataList.map(item => {
                           item.isActive = false
                           return item
                       })
                    }
                }
            }).catch(errors.call(this));
        },

        addTag() {
            if (this.isSure == '添加标签') {
                this.isSure = '取消添加'
                this.isShowAdd = true
                return
            }
            if (this.isSure == '确认添加') {
                let obj = {
                    name: this.tagValue,
                    appId: this.publicInfo.id,
                }
                useM.saveTag(obj).then(valid.call(this)).then(res=>{
                    if (res.ok) {
                        let id = res.data.data.tagId
                        this.tagList.push({
                            name: this.tagValue,
                            isActive: true,
                            id: id,
                        })
                        this.isShowAdd = false
                        this.tagValue = ''
                        this.upStatus()
                    }
                }).catch(errors.call(this));
                
                return
            }
            if (this.isSure == '取消添加') {
                this.isSure = '添加标签'
                this.isShowAdd = false
                return
            }
        },

        isShowActive(item, index1) {
            let isA = !item.isActive
            this.$set(this.tagList, index1, {
                id: item.tagId,
                isActive: isA,
                name: item.name
            })
            this.upStatus()
        },

        upStatus() {
            this.tagOperateLogs = []
            this.tagList.forEach(item => {
                if (item.isActive) {
                    this.tagOperateLogs.push(item.id)
                }
            })
        },

        giveTag() {
            if (!this.openids.length) {
                this.$Message.error('请选择打标签的信息')
                return
            }
            this.getAllTag()
        },

        toggleSatus(val) {
           
        },

        textChange() {
            this.getDataList()
        },
        
        textChangeTag() {
            this.getDataList()
        },
        
        export() {
            let obj = {
                name: this.compact,
                appId: this.publicInfo.id,
            }
            window.open(useM.exportData(obj), "_blank")
        },
 
        exportSelect() {
            if (!this.openids.length) {
                this.$Message.error('请选择所选数据')
                return
            }
            let obj = {
                name: this.compact,
                openIds: this.openids.join(','),
            }
            window.open(useM.exportDataSelect(obj), "_blank")
        },
        cancel() {

        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.getDataList()
        },

        onPageChange(val) {
            this.pageNo = val
            this.getDataList()
        },

        ok() {
            if (!this.tagOperateLogs.length) {
                this.$refs.md.visible=true
                this.modal1 = true
                this.$Message.error('请点击选择要打的标签')
                return
            }
            let obj = {
                appId: this.publicInfo.id,
                openIds: this.openids,
                tagIds: this.tagOperateLogs,
            }
            useM.tagging(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.getDataList()
                }
            }).catch(errors.call(this));
        },

        cancelRemarks() {

        },

        okRemarks() {
            if (!this.textareaV.length) {
                this.$Message.error('请填写备注')
                this.$refs.remarks.visible = true
                this.modal2 = true
                return
            }
            let obj = {
                openId: this.openId,
                beizhu: this.textareaV,
            }
            useM.addRemarks(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.getDataList()
                }
            }).catch(errors.call(this));
            
        },

        datafuncTag() {
            return new Promise((resole, reject) => {})
        },

        datafunc() {
            return new Promise((resole, reject) => {})
        }
    }
}
</script>

