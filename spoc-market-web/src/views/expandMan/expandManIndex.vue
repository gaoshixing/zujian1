<style lang='less'>
.expandMan-index-gsx {
    .cancleBorder {
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
        // .ivu-table th {
        //     background-color: #fff;
        // }
    }
    .page {
        margin-top: 20px;
        margin-bottom: 140px;
        text-align: center;
    }
}
</style>
<template>
    <div class="expandMan-index-gsx">
        <Tabs @on-click="toggleSatus" v-model="tabValue">
            <TabPane :label='"启用中("+allData.use+")"' name="name1"></TabPane>
            <TabPane :label='"已停用("+allData.unUse+")"' name="name2"></TabPane>
            <TabPane :label='"等待审核("+allData.unaudit+")"' name="name3"></TabPane>
            <TabPane :label='"未通过审核("+allData.reject+")"' name="name4"></TabPane>
        </Tabs>
        <v-select 
            style="width: 294px;margin: 15px 0;"
            placeholder="搜索名称"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <btnlist
            title="推广员列表"
            :btnList='btnList'
            >
        </btnlist>
        <div class="cancleBorder">
              <Table :columns="columns" :data="data.list" class="common-table" :loading="loading"></Table>
            <!-- <Table :columns="columns" :data="data.list"  ></Table> -->
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import btnlist from '@public/modules/btnlist'
import valid, {
    errors,
    common,
    sys,
    expandMan
} from "../../libs/request";
export default {
    data() {
        return {
            compact: '',
            loading: false,
            isHaveId: false,
            allData: {
                reject: '',
                unUse: '',
                unaudit: '',
                use: '',
            },
            tabValue: 'name1',
            btnList: [
                {
                    text: '导出',
                    type: 'primary',
                    event: this.export
                },
            ],
            pageNo: '1',
            publicInfo: '',
            pageSize: 10,
            data: {
                count: 2,
                list: [
                ]
            },
            openId: '',
            columns: [
                {
                    title: "编号",
                    key: "code",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {},
                        this.tabValue == 'name3' ? params.row.appId : params.row.code)
                    }
                },
                {
                    title: "客户编号",
                    key: "studentId",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {},
                        params.row.studentId == 'null' ? '' : params.row.studentId)
                    }
                },
                {
                    title: "姓名",
                    key: "name",
                    align: "center"
                },
                {
                    title: "手机号",
                    key: "phone",
                    align: "center"
                },
                {
                    title: "最近登录时间",
                    key: "loginDate",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "predictNum",
                    align: "left",
                    render: (h, params) => {
                        if (this.tabValue === 'name1') {
                            return h("div", {
                                style: {
                                    textAlign: 'left'
                                }
                            }, [
                                h(
                                    "span",
                                    {
                                    style: {
                                            color: 'red',
                                            cursor: 'pointer',
                                            marginRight: "10px",
                                        },
                                        on: {
                                            click: () => {
                                                this.openId = params.row.openId
                                                this.isUp(0)
                                                // this.log(params.row.id);
                                            }
                                        }
                                    },
                                    "停用"
                                ),
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
                                                    name: 'expandMan.expandDetail',
                                                    query: {
                                                        formId: params.row.openId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                            ])
                        } else if (this.tabValue === 'name2') {
                             return h("div", [
                                h(
                                    "a",
                                    {
                                        style: {
                                                marginRight: "10px",
                                            // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                        },
                                        on: {
                                            click: () => {
                                                // this.modal1 = true
                                                this.openId = params.row.openId
                                                this.isUp(1)
                                                // this.log(params.row.id);
                                            }
                                        }
                                    },
                                    "启用"
                                ),
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
                                                    name: 'expandMan.expandDetail',
                                                    query: {
                                                        formId: params.row.openId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                            ])
                        } else if (this.tabValue === 'name3') {
                             return h("div", [
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
                                                    name: 'expandMan.waitingMan',
                                                    query: {
                                                        formId: params.row.openId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "审核报名信息"
                                ),
                            ])
                        } else if (this.tabValue === 'name4') {
                             return h("div", [
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginRight: "10px",
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'expandMan.noPassMan',
                                                    query: {
                                                        isReject: true,
                                                        objectId: params.row.openId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "审核记录"
                                ),
                            ])
                        }
                        
                    }
                },
            ]
        }
    },

    components: {
        vSelect,
        btnlist
    },


    mounted() {
        this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
        this.getList()
        this.getNum()
    },

    methods: {
        getNum() {
            let obj = {
                appId: this.publicInfo.id,
            }
            expandMan.getNum(obj).then(valid.call(this)).then(res => {
            if(res.ok) {
                this.allData = res.data.data
            }
            }).catch(errors.call(this));
        },

        isUp(val) {
            let obj = {
                "openId": this.openId,
                isUse: val,
            }
            expandMan.update(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.getList()
                    this.getNum()
                }
            }).catch(errors.call(this));
        },

        getList() {
            let obj = {
                "pageNo": this.pageNo,
                "pageSize": this.pageSize,
                name: this.compact,
                status: this.tabValue=='name3'?'unaudit':this.tabValue=='name4'?'reject': '',
                salerFlag: 1,
                isUse: this.tabValue=='name1'?'1':this.tabValue=='name2'?'0': '',
                appId: this.publicInfo.id,
            }
            this.loading = true
            expandMan.listPage(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }
            }).catch(errors.call(this)).finally(() => {
                this.loading = false
            });;
        },
        toggleSatus(val) {
            if (val == 'name3') {
                this.$set(this.columns, 4,   {
                    title: "报名时间",
                    key: "registrationTime",
                    align: "center"
                },)
            } else if (val == 'name4') {
                this.$set(this.columns, 4,   {
                    title: "未通过审核时间",
                    key: "rejectTime",
                    align: "center"
                },)
            } else {
                this.$set(this.columns, 4,   {
                    title: "最近登录时间",
                    key: "loginDate",
                    align: "center"
                },) 
            }
            this.getList()
        },

        textChange() {
            this.getList()
        },
        
        export() {
            let obj = {
                "pageNo": this.pageNo,
                "pageSize": this.pageSize,
                name: this.compact,
                status: this.tabValue=='name3'?'unaudit':this.tabValue=='name4'?'reject': '',
                salerFlag: 1,
                isUse: this.tabValue=='name1'?'1':this.tabValue=='0'?'reject': '',
                appId: this.publicInfo.id,
            }
            window.open(expandMan.exportData(obj))
        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.getList()
        },
        
        onPageChange(val) {
            this.pageNo = val
            this.getList()
        },
        
        datafunc() {
            return new Promise((resole, reject) => {})
        },
    }
}
</script>

