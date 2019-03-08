<style lang='less'>
    .public-m-gsx-g {
        .title {
            font-size: 16px;
            line-height: 54px;
        }
        .cancleBorder {
            // .ivu-table-wrapper {
            //     border: none;
            // }
            // .ivu-table:after {
            //     content: '';
            //     width: 0px;
                
            // }
            // .ivu-table-column-center {
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
    <div class="public-m-gsx-g">
        <p class="title">核心公众号</p>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.list"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="pageNo" :total="data1.count" @on-change="onPageChange" v-if="data1.count>10"></Page>
        </div>
        <p class="title">机构公众号</p>
        <div class="cancleBorder">
            <Table :columns="columns1" :data="data1.list"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="pageNo" :total="data1.count" @on-change="onPageChange" v-if="data1.count>10"></Page>
        </div>
        <Modal
            v-model="modal2"
            title="确认隐藏"
            width=728
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
                <p style="text-align:center">
                    隐藏后, 市场人员将无法进入本公众号进行管理,是否确认隐藏?
                </p>
            </div>
        </Modal>
    </div>
</template>

<script>
import valid,{errors, sys, publicNumM,} from '../../libs/request';

export default {
    data() {
        return {
            tempObj: '',
            modal2: false,
            data: {
                list: [
                ]
            },
            columns: [
                {
                    title: "公众号名称",
                    key: "publicName",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: params.row.isShow == 1 ? '#000' : '#ccc'
                            }
                        },
                        params.row.publicName
                        )
                    }
                },
                {
                    title: "公众号类型",
                    key: "officeName",
                    align: "center",
                     render: (h, params) => {
                        return h('span', {
                        },
                        params.row.type == 'service' ? '服务号' : '订阅号'
                        )
                    }
                },
                {
                    title: "所属分公司",
                    key: "officeName",
                    align: "center",
                },
                {
                    title: "市场人员数量",
                    key: "saleNum",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: params.row.isShow == 1 ? '#000' : '#ccc'
                            }
                        },
                        params.row.saleNum
                        )
                    }
                },
                {
                    title: "操作",
                    key: "content",
                    align: "left",
                    render: (h, params) => {
                        return h("a", {
                            style: {
                                color: params.row.isShow == 1 ? '#ccc' :  '#44bcbc'
                            },
                            on: {
                                click: () => {
                                    this.hiddenM(params.row)
                                }
                            }
                        }, params.row.isShow == 1 ? '隐藏公众号' : '显示公众号' )
                    }
                },
            ],
            data1: {
                list: [
                ]
            },
            columns1: [
                {
                    title: "公众号名称",
                    key: "publicName",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: params.row.isShow == 1 ? '#000' : '#ccc'
                            }
                        },
                        params.row.publicName
                        )
                    }
                },
                {
                    title: "所属分公司",
                    key: "officeName",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: params.row.isShow == 1 ? '#000' : '#ccc'
                            }
                        },
                        params.row.officeName
                        )
                    }
                },
                {
                    title: "分公司主公众号",
                    key: "content",
                    align: "center",
                    render: (h, params) => {
                        if (params.row.isMaster == 1) {
                            return h('i' , {
                                style: {
                                    color: params.row.isShow == 1 ? '#44bcb7' : '#ccc'
                                },
                                'class': {
                                    iconfont: true,
                                    'icon-collection_fill': true
                                },
                            })
                        }
                        
                    }
                },
                {
                    title: "市场人员数量",
                    key: "saleNum",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: params.row.isShow == 1 ? '#000' : '#ccc'
                            }
                        },
                        params.row.saleNum
                        )
                    }
                },
                {
                    title: "状态",
                    key: "content",
                    align: "center",
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: params.row.isShow == 1 ? '#000' : '#ccc'
                            }
                        }, 
                            params.row.isShow == 1 ? '显示' : '隐藏'
                        )
                    } 
                },
                {
                    title: "操作",
                    key: "content",
                    align: "left",
                    render: (h, params) => {
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
                                        marginRight: '20px',
                                        cursor: 'pointer', 
                                        color: params.row.isMaster == 1 ? '#ccc' :  '#44bcbc'
                                    },
                                    on: {
                                        click: () => {
                                            this.hiddenP(params.row)
                                        }
                                    }
                                },
                                params.row.isMaster == 1 ||  params.row.isShow == 1 ? '隐藏公众号' : '显示公众号'
                            ),
                            h(
                                "span",
                                {
                                    style: {
                                        color: params.row.isMaster == 1 ? '#ccc' :  '#44bcbc',
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    },
                                     on: {
                                        click: () => {
                                            this.settingMin(params.row)
                                        }
                                    }
                                },
                                '设为主公众号'
                            ),
                        ])
                    }
                },
            ],
        }
    },

    mounted() {
        this.getDataList('subscribe') // 订阅
    },
      
    methods: {
        getDataList(type) {
            let obj = {
                type: type
            }
            publicNumM.getDataList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    if (type == 'subscribe') {
                        this.getDataList('service') // 服务
                    }
                    let dataList = res.data.data
                    this.handleData(dataList)
                }
            }).catch(errors.call(this));
        },

        handleData(dataList) {
            let coreNum = dataList.filter(item => {
                return item.isCore == 1
            })
            if (coreNum.length) {
                this.data.list = coreNum
                dataList = dataList.filter(item => {
                    return item.isCore == 0
                })
            }
            this.data1.list = this.data1.list.concat(dataList)
        },

        hiddenM(val) {
            this.tempObj = val
            if (val.isShow == 1) {
                this.modal2 = true
                return
            }
            this.save()
        },  

        hiddenP(val) {
            if (val.isMaster == 1 ) return
            this.tempObj = val
            if (val.isShow == 1) {
                this.modal2 = true
                return
            }
            this.save()
        },

        settingMin(val) {
            if (val.isMaster == 1) return
            let obj = {
                appId: val.id,
                isMaster: '1'
            }
            publicNumM.setMain(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.getDataList('service') // 服务
                }
            }).catch(errors.call(this));
        },

        save() {
             let obj = {
                appId: this.tempObj.id,
                isShow: this.tempObj.isShow == 1 ? 0 : 1
            }
            publicNumM.isShowP(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.data1.list = []
                    this.data.list = []
                    this.getDataList('subscribe') // 订阅
                }
            }).catch(errors.call(this));
        },

        ok() {
           this.save()
        },
         
        cancel() {

        }
    }
}
</script>

