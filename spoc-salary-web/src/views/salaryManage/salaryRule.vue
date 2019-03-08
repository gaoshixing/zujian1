<template>
    <div class="salary-rule-boss">
        <Input v-model.trim="searchVal" size='large' icon="ios-search" placeholder="请输入薪酬规则名称" style="width: 396px; margin-top: 20px; margin-bottom: 20px;" @on-click="onclickSearchInfos" @on-enter="onclickSearchInfos" class="docu-top-input"></Input>
        <p
            class="rule-setting-total">
            当前总计:
            <span>{{count}}</span>
            <Button type="primary" class="salary-rule-button" @click="onclickAddSalaryRuleModal">新增薪酬规则</Button>
        </p>
        <Table class="table-border-none" :columns="localColumns" :data="columnsData"></Table>
        <Page
            v-if="pageCount > 1"
            show-sizer
            :total="count"
            :current="pageNo"
            :page-size="pageSize"
            show-total
            show-elevator
            @on-change="onclickPageNoChange"
            @on-page-size-change="onclickPageSizeChange"
            style="margin-bottom: 140px; text-align: center; margin-top: 20px;">
        </Page>
        <Modal
            ref="refAddSalaryRule"
            v-model="addSalaryRule"
            title="新增薪酬规则"
            @on-ok="onclickAddSalaryRule"
            @on-cancel="onclickCancelAdd"
            class="rule-setting-modal">
            <div>
                <p>规则名称：</p><Input v-model.trim="ruleName" placeholder="请输入规则名称" style="width: 300px; margin-top: 20px; margin-bottom: 20px;" class="docu-top-input"></Input>
            </div>
            <div>
                <p>备注：</p><Input v-model="ruleRemark" type="textarea" placeholder="" style="width: 300px;"></Input>
            </div>
        </Modal>
    </div>    
</template>

<script>
import { mapMutations, } from 'vuex';
import valid, { errors, sys, common, salaryManageApi, } from '../../libs/request';
export default {
    name: 'SalaryRule',
    data() {
        return {
            searchVal: '',
            count: 0,
            pageNo: 1,
            pageSize: 10,
            pageCount: 1,
            addSalaryRule: false,
            ruleName: '',
            ruleRemark: '',
            localColumns: [
                {
                    title: '薪酬规则名称',
                    key: 'ruleName',
                    align: 'center',
                },
                {
                    title: '备注',
                    key: 'remarks',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'createDate',
                    align: 'center',
                },
                {
                    title: '最近更新时间',
                    key: 'updateDate',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: '',
                    align: 'center',
                    render: (h, params) => {
                        const _this = this;
                        return h('span', {
                            style: {
                                color: '#44bcb7',
                                cursor: 'pointer',
                            },
                            on: {
                                click() {
                                    _this.$router.push({
                                        name: 'salary.ruleSetting',
                                        query: {
                                            id: params.row.id,
                                        },
                                    });
                                },
                            },
                        }, '编辑')
                    },
                },
            ],
            columnsData: [],
        };
    },
    created() {
        this.getListPage();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        /*
        * 输入框查询
        */
        onclickSearchInfos() {
            this.pageNo = 1;
            this.getListPage();
        },
        /*
        * 添加项目 Modal
        */
        onclickAddSalaryRuleModal() {
            this.addSalaryRule = true;
        },
        onclickAddSalaryRule() {
            if (!this.ruleName) {
                this.$refs.refAddSalaryRule.visible = true;
                this.addSalaryRule = true;
                this.$Message.error('规则名称不能为空');
            }
            const data = {
                	createDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
                    id: "",
                    remarks: this.ruleRemark,
                    ruleName: this.ruleName,
                    updateDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
            };
            this.updateLoadingStatus({ isLoading: true, });
            salaryManageApi.salaryRuleSave(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.$Message.success(res.data.message);
                    this.pageNo = 1;
                    this.getListPage();
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        onclickCancelAdd() {
            this.ruleName = this.ruleRemark = '';
        },
        /*
        * 分页
        */
        onclickPageNoChange(val) {
            this.pageNo = val;
            this.getListPage();
        },
        onclickPageSizeChange(val) {
            this.pageSize = val;
            this.getListPage();
        },
        /*
        * 列表获取
        */
        getListPage() {
            const data = {
                ruleName: this.searchVal,
                pageSize: this.pageSize,
                pageNum: this.pageNo,
            };
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.salaryRuleListPage(data).then(valid.call(this)).then(res => {
                const rdata = res.data.data;
                this.pageNo = rdata.pageNum;
                this.pageSize = rdata.pageSize;
                this.count = rdata.total;
                this.pageCount = rdata.pages;
                this.columnsData = rdata.list;
            }).catch(errors.call(this)).finally(() => { this.updateLoadingStatus({isLoading:false}); });
        },
    },
};
</script>

<style lang="less">
    .salary-rule-boss {
        .rule-setting-total {
            color: #222;
            font-size: 15px;
            position: relative;
            margin-bottom: 12px;
            >span {
                color: #44bcb7;
                font-size: 16px;
            }
            .salary-rule-button {
                color: #fff;
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
    }
    .table-border-none {
        border-left: none;
        // border-top: none;
        .ivu-table {
            &::after {
                content: none;
            }
        }
        .ivu-table-cell {
            color: #333;
        }
    }
    .rule-setting-modal {
        p {
            display: inline-block;
            width: 65px;
            text-align: left;
        }
        .ivu-input {
            resize: none !important;
        }
    }
</style>
