<style lang="less">
.social-security-rule-container{
    @topWidth: 100px;
    .count{
        position: relative;//top: 6px;
        line-height: 40px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
    .top{
        padding: 10px 0 20px;
    }
    .top-item{
        float: left;width: 50%;position: relative;padding-left: @topWidth + 12px;
    }
    .top-title{
        @h: 32px;
        position: absolute;left: 0;top: 0;width: @topWidth;height: @h;line-height: @h;color: #333;font-size: 14px;
        text-align: right;
    }
    .page-box{
        text-align: center;padding-top: 20px;
    }
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table {
        th {
            background: #fff;
        }
    }
    .ivu-table:after {
        display: none;
    }
}
</style>
    
<template>
<div class="social-security-rule-container">
    <div class="top clearfix">
        <div class="top-item">
            <span class="top-title">参保城市</span>
            <Select v-model="city" style="width:200px;">
                <Option v-for="item in cityLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </div>
        <div class="top-item">
            <span class="top-title">试用期时长</span>
            <Select v-model="city" style="width:200px;">
                <Option v-for="item in zhengceLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </div>
    </div>
    <div class="count">为您筛选出  <span>{{ count }}</span> 条数据</div>
    <btn-list title="员工列表" :btnList="btninfo"></btn-list>
    <Table :columns="columns1" :data="data1"></Table>
    <div class="page-box">
        <Page :current="pageNo"
            :total="count"
            show-elevator show-total show-sizer
            :page-size="pageSize"
            @on-change="pageChange"
            @on-page-size-change="sizeChange">
        </Page>
    </div>
</div>
</template>

<script>

import BtnList from '@public/modules/btnlist';

export default {
    props: {
        
    },
    data(){
        return {
            pageNo: 1,//当前页码
            pageCount: 2,//页码总数
            pageSize: 20,//每页条数
            count: 20,//数据总数
            loading: true,
            params: {},
            city: '',
            btninfo: [
                {
                    text: '修改记录',
                    type: 'primary',
                    event: this.histroy
                }, 
                {
                    text: '新增',
                    type: 'primary',
                    event: this.newRule
                }, 
            ],
            cityLists: [
                {
                    id: '1',
                    name: '北京'
                },
                {
                    id: '2',
                    name: '上海'
                }
            ],
            zhengceLists: [
                {
                    id: '1',
                    name: '本市城镇职工'
                },
                {
                    id: '2',
                    name: '本市农村职工'
                },
                {
                    id: '3',
                    name: '外埠城镇职工'
                },
                {
                    id: '4',
                    name: '外埠农村职工'
                }
            ],
            columns1: [
                {
                    title: '保险类型',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '是否缴费',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '最低基数',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '最高基数',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '企业比例',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '个人比例',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '备注',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        let dom = [];
                        dom.push(h('a', {
                            style: {
                                'margin-right': '8px',
                            },
                        }, '查看'));
                        dom.push(h('a', '编辑'));
                        return h('div', dom);
                    }
                }
            ],
            data1: [
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
                {
                    name: '11111'
                },
            ],
        };
    },
    computed: {

    },
    components: {
        BtnList
    },
    mounted(){
        this.getLists();
    },
    methods: {
        getLists() {
            // 获取lists
            this.data = [
                {
                    cusName: '11',
                    score: '21'
                },
                {
                    cusName: '31',
                    score: '141'
                }
            ];
            this.loading = false;
        },
        histroy() {
            // 修改记录
        },
        newRule() {
            // 新增
        },
        pageChange(page) {
            this.pageNo = page;
            // this.getLists();
        },
        sizeChange(size) {
            this.pageSize = size;
            // this.getLists();
        },
    }
}
</script>


