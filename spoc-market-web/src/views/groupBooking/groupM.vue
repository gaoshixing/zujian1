<style lang='less'>
    @import '../../less/theme.less';
    .groupMGsx {
        // color: @productColor;
        border-top: none !important;
        .search {
            position: relative;
            .new-form {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        .cancleBorder {
        }
        .page {
            margin-top: 20px;
            margin-bottom: 140px;
            text-align: center;
        }
        
    }
    .downTime-gsx {
        .sit {
            font-size: 14px;
            margin-bottom: 8px;
        }
        .descp {
            color: #ccc;
            font-size: 12px;
            margin-left: 144px;
            margin-top: 8px;
        }
    }
</style>
<template>
    <div class="groupMGsx">
        <Tabs @on-click="toggleSatus" v-model="tabValue" >
            <TabPane label="上架中" name="name1" :disabled='loading'></TabPane>
            <TabPane label="未上架" name="name2" :disabled='loading'></TabPane>
            <TabPane label="需审核" name="name3" :disabled='loading'></TabPane>
            <TabPane label="未通过审核" name="name4" :disabled='loading'></TabPane>
            <TabPane label="拼团结束已下架" name="name5" :disabled='loading'></TabPane>
        </Tabs>
        <p class="search">
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
        </p>
        <btnlist
            title="商品列表"
            :btnList="btnList"
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
            title="上架设置"
            width=728
            ok-text="确定上传"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="downTime-gsx">
                <p class="sit">设置下架日期及时间： <DatePicker type="datetime" :value='downTime' style="width:160px"></DatePicker></p>
                <span class="descp">如需手动下架，可不填写</span>
            </div>
        </Modal>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import btnlist from '@public/modules/btnlist'
import valid, {
    errors,
    common,
    sys,
    groupB
} from "../../libs/request";
export default {
    data() {
        return {
            loading: false,
            type: '0',
            btnList: [
                // {
                //     text: '数据数据收集',
                //     type: 'primary',
                //     event: this.dataCollection
                // },
                {
                    text: '新建拼团',
                    type: 'primary',
                    event: this.newForm
                },
            ],
            tabValue: 'name1',
            nameType: 'name1',
            compact: '',
            modal1: false,
            pageNo: 1,
            pageSize: 10,
            downTime: '',
            data: {
                count: 20,
                list: [
                ]
            },
            columns: [
                {
                    title: "编号",
                    key: "packCode",
                    align: "center",
                },
                {
                    title: "商品名称",
                    key: "packName",
                    align: "center"
                },
                {
                    title: "原价",
                    key: "packOriPrice",
                    align: "center"
                },
                {
                    title: "拼团价",
                    key: "packPrice",
                    align: "center"
                },
                {
                    title: "商品剩余库存",
                    key: "remainNum",
                    align: "center",
                    render: (h, params) => {
                        return h('div', { 
                        },params.row.remainNum ? params.row.remainNum : '不限量')
                    }
                },
                {
                    title: "成功拼团人数",
                    key: "packNum",
                    align: "center"
                },
                {
                    title: "跨校区售卖",
                    key: "predictNum",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            
                        },params.row.isGlobal == '0' ? '否' : '是')
                    }
                },
                {
                    title: "拼团状态",
                    key: "packStatusName",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "predictNum",
                    align: "left",
                    minWidth: 70,
                    render: (h, params) => {
                        if (this.tabValue === 'name1') {
                            return h("div", {
                                style: {
                                    textAlign: 'left'
                                }
                            },
                            [
                                h(
                                    "span",
                                    {
                                    style: {
                                            color: 'red',
                                            cursor: 'pointer',
                                        },
                                        on: {
                                            click: () => {
                                                this.id = params.row.id
                                                this.isUp(0)
                                                // this.log(params.row.id);
                                            }
                                        }
                                    },
                                    "下架"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: "market.collection",
													query: {
                                                        packCode: params.row.packCode,
                                                        packName: params.row.packName,
                                                        id: params.row.id,
                                                        isGroup: true,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "数据收集"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'groupM.groupMDetail',
                                                    query: {
                                                        shopId: params.row.id
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                            ])
                        } else if (this.tabValue === 'name2') {
                             return h("div", {
                                style: {
                                    textAlign: 'left'
                                }
                            },[
                                h(
                                    "a",
                                    {
                                         style: {
                                            // marginLeft: "10px",
                                            // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                        },
                                   
                                        on: {
                                            click: () => {
                                                // this.modal1 = true
                                                this.id = params.row.id
                                                this.isUp(1)
                                                // this.log(params.row.id);
                                            }
                                        }
                                    },
                                    "上架"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: "market.collection",
													query: {
                                                        packCode: params.row.packCode,
                                                        packName: params.row.packName,
                                                        id: params.row.id,
                                                        isGroup: true,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "数据收集"
                                ),
                                
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'groupM.groupMDetail',
                                                    query: {
                                                        shopId: params.row.id,
                                                        isEdit: true,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                            ])
                        } else if (this.tabValue === 'name3') {
                             return h("div", {
                                style: {
                                    textAlign: 'left'
                                }
                            }, [
                                h(
                                    "a",
                                    {
                                        style: {
                                            // marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: "market.collection",
													query: {
                                                        packCode: params.row.packCode,
                                                        packName: params.row.packName,
                                                        id: params.row.id,
                                                        isGroup: true,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "数据收集"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'groupM.groupMDetail',
                                                    query: {
                                                        shopId: params.row.id
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                            ])
                        } else if (this.tabValue === 'name4') {
                             return h("div", {
                                style: {
                                    textAlign: 'left'
                                }
                            },[
                                h(
                                    "a",
                                    {
                                        style: {
                                            // marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: "market.collection",
													query: {
                                                        packCode: params.row.packCode,
                                                        packName: params.row.packName,
                                                        id: params.row.id,
                                                        isGroup: true,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "数据收集"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'groupM.groupMDetail',
                                                    query: {
                                                        isReject: true,
                                                        shopId: params.row.id,
                                                        isEdit: true,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
                                ),
                            ])
                        } else if (this.tabValue === 'name5') {
                             return h("div", {
                                style: {
                                    textAlign: 'left'
                                }
                            }, [
                                h(
                                    "a",
                                    {
                                        style: {
                                            // marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: "market.collection",
													query: {
                                                        packCode: params.row.packCode,
                                                        packName: params.row.packName,
                                                        id: params.row.id,
                                                        isGroup: true,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "数据收集"
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            marginLeft: "10px",
                                        // display: params.row.status != 'finished' ? 'inline-block': 'none',
                                    },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'groupM.groupMDetail',
                                                    query: {
                                                        shopId: params.row.id,
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "详细信息"
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
        btnlist,
    },

    mounted() {
        this.getList()
    },

    methods: {
        getList() {
            let obj = {
                "pageNo": this.pageNo,
                "pageSize": this.pageSize,
                showType: this.type,
                codeOrName: this.compact,
            }
            this.loading = true
            groupB.listPage(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$nextTick(() => {
                        this.data = res.data.data
                    })
                }
            }).catch(errors.call(this)).finally(() =>{
                this.loading = false
            });
        },

        newForm() {
            this.$router.push({
                name: 'groupM.newGroup'
            })
        },

        dataCollection() {
            this.$router.push({
                name: 'groupM.dataCollection'
            })
        },

        toggleSatus(val, isUp='') {
            if (!isUp) {
                if (this.nameType == val) return
                this.nameType = val
                if (val == 'name5'||val == 'name1'||val == 'name2') {
                    if (this.columns[7].title!='拼团状态') {
                        this.columns.splice(7, 0,
                            {
                                title: "拼团状态",
                                key: "packStatusName",
                                align: "center"
                            },
                        )
                    }
                    
                } else if(this.columns[7].title=='拼团状态') {
                    this.columns.splice(7, 1)
                }
            }
            let type = {}
            switch (val) {
                case 'name1' : type = 0 ; break;
                case 'name2' : type = 1 ; break;
                case 'name3' : type = 2 ; break;
                case 'name4' : type = 3 ; break;
                case 'name5' : type = 4 ; break;
            }
            this.type = type
            this.getList()
        },

        isUp(type) {
            let obj = {
                id: this.id,
                type: type,
            }
            groupB.isUse(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.toggleSatus(this.nameType, true)
                }
            }).catch(errors.call(this));
        },

        onPageChange(val) {
            this.pageNo = val
            this.getList()
        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.getList()
        },
        
        textChange() {
            this.getList()
        },
        
        cancel() {

        },

        ok() {

        },
        datafunc() {
              return new Promise((resole, reject) => {})
        }
    }
}
</script>

