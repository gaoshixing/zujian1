<template>
    <div class="task-manage-boss">
        <Tabs :animated=false v-model="tabValue" style="margin-bottom: 15px;">
            <TabPane label="邀请购买类" name="0"></TabPane>
            <TabPane label="邀请拼团类" name="1"></TabPane>
            <TabPane label="邀请报名" name="2"></TabPane>
            <TabPane label="邀请阅读类" name="3"></TabPane>
        </Tabs>
        <div class="clearfix" style="height: 45px;">
            <Input 
                v-model.trim="searchVal"
                icon="ios-search"
                placeholder="搜索任务名称"
                style="width: 296px; height: 36px; float:left;margin-right: 20px;"
                @on-click="onclickSearchBills"
                @on-enter="onclickSearchBills">
            </Input>
            <Select v-model="taskStatus" style="width:180px; height: 35px;  float:left;">
                <Option value='-1' >全部任务状态</Option>
                <Option value="1" >展示</Option>
                <Option value="0" >隐藏</Option>
            </Select>
            <Button type="primary" v-if="tabValue === '3'" style="float: right;" @click="onclickGoingtoAddArticle">新增文章任务</Button>
        </div>
        <Btnlist title="任务列表"></Btnlist>
        <Table :columns="tableColumnsTask" :data="tableDataTask1" :loading="loading" class="common-table"></Table>
        <Page 
			class="common-paging" 
			v-if="pageTotal > 10"
			show-sizer
			:total="pageTotal"
			:current="pageNo"
			:page-size="pageSize"
			show-total
			show-elevator
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange">
		</Page>
    </div>    
</template>

<script>
import Btnlist from '@public/modules/btnlist.vue';
import valid, { errors, sys, common, wpTask, } from '../../libs/request.js';
export default {
    name: 'TaskManage',
    components: {
        Btnlist,
    },
    data() {
        return {
            tabValue: -1,
            searchVal: null,
            taskStatus: '-1', // 全部 null展示 1 隐藏 0
            loading: false,
            toolInfo: null,
            pageNo: 1,
            pageTotal: 0,
            pageSize: 10,
            tableColumnsTask: [],
            tableColumnsTask12: [
                { title: '任务编号', key: 'code', align: 'center', width: 130},
                { title: '任务名称', key: 'title', align: 'center', width: 200, },
                { title: '关联商品编号', key: 'objectCode', align: 'center', width: 150},
                { title: '覆盖人数', key: 'clickNum', align: 'center', },
                { title: '成功推广人数', key: 'successNum', align: 'center', },
                { title: '展示状态', key: 'isShow', align: 'center',
                    render: (h, params) => {
                        const text = params.row.isShow === '0' ? '隐藏' : '展示';
                        return h('span', text);
                    },
                },
                {
                    title: '是否可展示', key: 'isUse', align: 'center',
                    render: (h, params) => {
                        const _this = this;
                        let text = '';
                        switch (params.row.isUse) {
                            case '0': text = "否"; break;
                            case '1': text = "是"; break;
                        };
                        const renderArr = [
                            h('span', {
                                style: {
                                    float: 'left',
                                    textAlign: 'left',
                                },
                            }, text),
                            h('Tooltip', {
                                props: {
                                    content: _this.toolInfo,
                                    placement: 'top',
                                },
                                class: {
                                    'hide': Boolean(Number(params.row.isUse)) ? true : false,
                                },
                                style: {
                                    float: 'right',
                                },
                            }, [
                                h('i', {
                                    attr: {
                                        type: 'help',
                                    },
                                    style: {
                                        cursor: 'pointer',
                                    },
                                    class: {
                                        'pro-class': true,
                                        'ivu-icon': true,
                                        'ivu-icon-help-circled': true,
                                    },
                                    on: {
                                        mouseover() {
                                            _this.showReason(params.row.id);
                                        },
                                    },
                                })
                            ]),
                        ];
                        return h('div', {
                            style: {
                                width: '30px',
                                margin: '0 auto',
                            },
                        }, renderArr);
                    },
                },
                { title: '任务有效期', key: 'endTime', align: 'center', width: 160,
                    render: (h, params) => {
                        const text = params.row.endTime && new Date(params.row.endTime).format('yyyy-MM-dd hh:mm:ss');
                        return h('span', text);
                    },
                },
                { title: '操作', key: 'caozuo', align: 'left', width: 160,
                    render: (h, params) => {
                        const _this = this;
                        const isShow = params.row.isUse === '0' ? false : true;
                        const renderArr = [
                            h('span', {
                                class: {
                                    'proClass': true,
                                },
                                style: {
                                    cursor: 'pointer',
                                },
                                on: {
                                    click() {
                                        let use = null;
                                        if (_this.tabValue === '2' || _this.tabValue === '3') {
                                            use = 1;
                                        } else {
                                            use = params.row.isUse;
                                        }
                                        _this.$router.push({
                                            name: 'market.expandDetail',
                                            query: {
                                                from: _this.tabValue,
                                                id: params.row.id,
                                                use,
                                            },
                                        });
                                    },
                                },
                            }, '推广详情'),
                            h('span', {
                                class: {
                                    'proClass': true,
                                    'hide': !isShow,
                                },
                                style: {
                                    cursor: 'pointer',
                                },
                                on: {
                                    click() {
                                        if (params.row.imageId) {
                                            _this.$router.push({
                                                name: 'market.modifyDisplay',
                                                query: {
                                                    from: _this.tabValue,
                                                    id: params.row.id,
                                                    isShow: params.row.isShow,
                                                },
                                            });
                                        } else {
                                            _this.$router.push({
                                                name: 'market.setDisplay',
                                                query: {
                                                    from: _this.tabValue,
                                                    id: params.row.id,
                                                    isShow: params.row.isShow,
                                                },
                                            });
                                        }
                                    },
                                },
                            }, '展示设置'),
                        ];
                        return h('div', {
                            class: {
                                'render-caozuo-class': true,
                            },
                        }, renderArr);
                    },
                },
            ],
            tableColumnsTask34: [
                { title: '任务编号', key: 'code', align: 'center', width: 130, },
                { title: '任务名称', key: 'title', align: 'center', width: 200, },
                { title: '关联商品编号', key: 'objectCode', align: 'center', width: 150, },
                { title: '覆盖人数', key: 'clickNum', align: 'center', },
                { title: '成功推广人数', key: 'successNum', align: 'center', },
                { title: '展示状态', key: 'isShow', align: 'center',
                    render: (h, params) => {
                        const text = params.row.isShow === '0' ? '隐藏' : '展示';
                        return h('span', text);
                    },
                },
                { title: '任务有效期', key: 'endTime', align: 'center', width: 160,
                    render: (h, params) => {
                        const text = params.row.endTime && new Date(params.row.endTime).format('yyyy-MM-dd hh:mm:ss');
                        return h('span', text);
                    },
                },
                { title: '操作', key: 'caozuo', align: 'left', width: 160,
                    render: (h, params) => {
                        const _this = this;
                        const renderArr = [
                            h('span', {
                                class: {
                                    'proClass': true,
                                },
                                style: {
                                    cursor: 'pointer',
                                },
                                on: {
                                    click() {
                                        let use = null;
                                        if (_this.tabValue === '2' || _this.tabValue === '3') {
                                            use = 1;
                                        } else {
                                            use = params.row.isUse;
                                        }
                                        _this.$router.push({
                                            name: 'market.expandDetail',
                                            query: {
                                                from: _this.tabValue,
                                                id: params.row.id,
                                                use,
                                            },
                                        });
                                    },
                                },
                            }, '推广详情'),
                            h('span', {
                                class: {
                                    'proClass': true,
                                },
                                style: {
                                    cursor: 'pointer',
                                },
                                on: {
                                    click() {
                                        if (params.row.imageId) {
                                            _this.$router.push({
                                                name: 'market.modifyDisplay',
                                                query: {
                                                    from: _this.tabValue,
                                                    id: params.row.id,
                                                    isShow: params.row.isShow,
                                                },
                                            });
                                        } else {
                                            _this.$router.push({
                                                name: 'market.setDisplay',
                                                query: {
                                                    from: _this.tabValue,
                                                    id: params.row.id,
                                                },
                                            });
                                        }
                                    },
                                },
                            }, '展示设置'),
                        ];
                        return h('div', {
                            class: {
                                'render-caozuo-class': true,
                            },
                        }, renderArr);
                    },
                },
            ],
            tableDataTask1: [],
        };
    },
    watch: {
        tabValue(newVal) {
            if (newVal === '0' || newVal === '1') {
                this.tableColumnsTask = this.tableColumnsTask12;
            } else {
                this.tableColumnsTask = this.tableColumnsTask34;
            }
            this.getListPage(1);
            return newVal;
        },
        taskStatus(newVal) {
            this.getListPage();
        },
    },
    created() {
        this.tabValue = localStorage.getItem(`taskManageIndex`) || '0';
        localStorage.removeItem(`taskManageIndex`);
    },
    methods: {
        onclickSearchBills() {
            this.getListPage();
        },
        onclickGoingtoAddArticle() {
            this.$router.push({
                name: 'market.addArticleTask',
            });
        },
        getListPage(num) {
            this.loading = true;
            let status = this.taskStatus;
            if (this.taskStatus === '-1') status = null;
            const data = {
                showType: this.tabValue,
                pageNo: num || this.pageNo,
                pageSize: this.pageSize,
                title: this.searchVal,
                isShow: status,
            };
            wpTask.listPage(data).then(valid.call(this)).then(res => {
                const rdata = res.data.data;
                this.pageNo = rdata.pageNo;
                this.pageSize = rdata.pageSize;
                this.pageTotal = rdata.count;
                this.tableDataTask1 = rdata.list;
            }).catch(errors.call(this)).finally(() => { this.loading = false; });
        },
        showReason(id) {
            wpTask.showReason({ id, }).then(valid.call(this)).then(res => {
                this.toolInfo = res.data.data;
            }).catch(errors.call(this));
        },
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getListPage();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getListPage();
        },
    },
    beforeRouteLeave( to, from, next) {
        if (to.name.includes('modifyDisplay') || to.name.includes('setDisplay') || to.name.includes('addArticleTask') || to.name.includes('expandDetail')) localStorage.setItem(`taskManageIndex`, this.tabValue);
        next();
    },
};
</script>

<style lang="less">
    @import url('../../less/common.less');
    .reject-class {
        color: @reject;
    }
    .pro-class {
        color: #44bcb7 !important;
    }
    .hide {
        display: none;
    }
    .render-caozuo-class {
        span:nth-of-type(1) {
            float: left !important;
            margin-right: 15px !important;
        }
        span:nth-of-type(2) {
            float: right !important;
        }
    }
    .market_container .content .main_content{
        border-top: none;
    }
    .task-manage-boss{
        .ivu-table th{
            background-color: #fff;
        }
    }
</style>