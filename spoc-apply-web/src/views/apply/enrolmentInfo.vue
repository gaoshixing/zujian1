<style lang="less">
    .apply-info-boss {
        .close-my-close {
            .docu-top-area-timing {
                margin-top: 0;
                padding-right: 58px;
            }
        }
        .my-close-table {
            border: none;
            .ivu-table {
                &::after {
                    content: none;
                }
            }
            .ivu-table-cell {
                color: #333;
            }
        }
        .bill-paging {
            text-align: center;
            margin-top: 20px;
        }
        .apply-info-casebar-filters {
            .titleBar {
                p {
                    span:nth-of-type(1) {
                        text-align: right !important;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="apply-info-boss">
        <TopArea
            class="close-my-close"
            :sliderNav="sliderNav"
            placeholder="请输入申请学校/专业项目/学生姓名"
            @slideNavChange="slideNavChange"
            @onclickSearchBills="onclickSearch"
            @getTargetList="getTargetList">

            <CasebarFilter
                title="标签："
                :from="2"
                :menuId="pId"
                style="margin-bottom: 9px;"
                class="apply-info-casebar-filters"
                @tagListChange="tagListChange"
            ></CasebarFilter>

            <CaseBar
                v-if="isCeo || isAdmin"
                title="分公司"
                typeKind="controlled"
                :tagList="branchList"
                :num="branchListIndex1"
                @addAcitveCon="addAcitveCon"
                style="margin-bottom: 5px;"
            ></CaseBar>
            <CaseBar
                v-if="isCeo || isAdmin || isBranchOfficeLeader || isAplManage"
                title="分组"
                typeKind="group"
                :tagList="docuGroup"
                :num="branchListIndex2"
                style="margin-bottom: 5px;"
                @addAcitveGroup="addAcitveConGroup"
            ></CaseBar>
            <CaseBar
                v-if="isCeo || isAdmin || isBranchOfficeLeader || isAplManage || isAplLeaser"
                title="申请顾问"
                typeKind="man"
                :tagList="docuConsultant"
                :num="branchListIndex3"
                @addAcitve="addAcitveConConsultant"
            ></CaseBar>

            <TagList
                title="完成状态"
                :tagList="tagList"
                @onclickChoseTags="onclickChoseTags"
            ></TagList>
        </TopArea>
        <LargeTable
            fixedHeader="stuName,schoolName"
            :tableData2="largeTable.tableData2"
            :total="pageTotal"
            :checkBoxList="largeTable.checkBoxList"
            :tableColumnsChecked="largeTable.tableColumnsChecked"
            :table2ColumnList="largeTable.table2ColumnList"
            @onSortChange="onSortChange"
            @onFilterChange="onFilterChange"
        ></LargeTable>
        <Page
            class="bill-paging"
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

import CaseBar from '../../modules/caseBar';
import TagList from '../../modules/tagSelect';
import { waitUntil, } from '@public/libs/util';
import LargeTable from '../../modules/largeTable';
import TopArea from '../../modules/docuTop/topArea';
import CasebarFilter from '@public/modules/caseBarFilter';
import { mapMutations, mapState, mapGetters, } from "vuex";
import valid, { errors, sys, common, aplApplyInfo, } from '../../libs/request';
export default {
    name: 'EnrolmentInfo',
    components: {
        CaseBar,
        TopArea,
        TagList,
        LargeTable,
        CasebarFilter,
    },
    props: {
        pId: {
            default: '901',
        },
    },
    data() {
        return {
            apply: 'UG',
            keyword: null,
            tags: null,
            companyId: null, // 分公司 Id
            docuGroupId: null, // 申请组Id
            docuConsultantId: null, // 申请顾问 id
            startDate: null,
            endDate: null,
            pageTotal: 0,
            pageSize: 10,
            pageNo: 1,
            orderByType: null,
            orderByStatus: null,
            companyId: null,
            branchList: [ {id: null, companyName: '全部'},], // 公司
            docuGroup: [ {id: null, name: '全部'},], // 分组
            docuConsultant: [ {id: null, userName: '全部'},], // 申请顾问
            branchListIndex1: 0, // 点击选中
            branchListIndex2: 0,
            branchListIndex3: 0,
            sliderNav: [
                { label: '本科', name: '1', },
                { label: '研究生', name: '2', },
                { label: '高中', name: '3', },
            ],
            // 完成状态
            tagList: [
                { id: null, name: '不限', },
                {id: 'commit', name: '未提交', },
                { id: 'handled', name: '已提交', },
            ],
            largeTable: {
                tableData2: [],
                checkBoxList : [ // 下拉框选择展示
                    // { label: 'schoolName', name: '入读学校' },
                    { label: 'majorName', name: '入读专业', },
                    { label: 'isOffer', name: '已收到正式offer', },
                    { label: 'isWebConfirm', name: '网上确认入读', },
                    { label: 'isPayDeposit', name: '缴纳入读定金', },
                    { label: 'isRequest', name: 'Request 120已到达', },
                    { label: 'isConfirmDeposit', name: '确认入读定金', },
                    { label: 'isConfirmUrl', name: '确认入读网址', },
                    { label: 'isConfirmAccount', name: '确认入读账号/密码', },
                    { label: 'stayDeadline', name: '住宿截止', },
                    { label: 'isReserveStay', name: '预定住宿', },
                    { label: 'isSendVisa', name: '发送签证等材料', },
                    { label: 'visaTime', name: '签证时间', },
                    { label: 'visaResult', name: '签证结果', },
                    { label: 'idMail', name: '学生ID/邮箱', },
                    { label: 'pwd', name: '邮箱密码', },
                    { label: 'isHealthReport', name: '体检表格', },
                    { label: 'applyTime', name: '申请季', },
                    { label: 'createBy', name: '申请顾问', },
                    { label: 'updateDate', name: '更新时间', },
                    // { label: '', name: '面试情况', },
                    // { label: '', name: '申请材料状态', },
                ],
                // 已选择了哪些标签
                tableColumnsChecked: [ 'majorName','isOffer', 'isWebConfirm', 'isPayDeposit', 'isRequest', 'isConfirmDeposit', 'updateDate', 'isConfirmUrl', 'isConfirmAccount', 'stayDeadline', ],
                table2ColumnList: { // 列表项的标题
                    stuName: {
                        title: '学生',
                        key: 'stuName',
                        align: 'center',
                        fixed: 'left',
                        minWidth: 120,
                        render: (h, params) => {
                            const _this = this;
                            return h('div', [
                                h('span', {
                                    style: {
                                        color: '#44bcb7',
                                        cursor: 'pointer',
                                    },
                                    on: {
                                        click() {
                                            _this.$router.push({
                                                name: 'apply.addStudent',
                                                query: {
                                                    studentId: params.row.stuId,
                                                }
                                            });
                                        },
                                    },
                                }, params.row.stuName),
                            ],)
                        },
                    },
                    schoolName: {
                        title: '入读学校',
                        align: 'center',
                        key: 'schoolName',
                        minWidth: 120,
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
                                                name: 'apply.applyDetail',
												query: {
													form: 'myStudent',
													choiceId: params.row.choiceId,
													groupId: params.row.groupId,
												}
                                            });
                                        },
                                },
                            }, params.row.schoolName);
                        },
                    },
                    majorName: {
                        title: '入读专业',
                        align: 'center',
                        key: 'majorName',
                        minWidth: 120,
                        render: (h, params) => {
                            const _this = this;
                            return h('span', {
                                style: {
                                    color: '#44bcb7',
                                    cursor: 'pointer',
                                },
                                on: {
                                    click() {
										if (!params.row.majorId) {
											_this.$Message.error('该校无该专业');
											return false;
										}
										_this.$router.push({
											name: 'apply.applyDetail',
											query: {
												from: 'myStudent',
												choiceId : params.row.choiceId,
												groupId : params.row.groupId,
												contractCount : params.row.contractCount,
												choiceTotal : params.row.choiceTotal,
											}
										})
									},
                                },
                            }, params.row.majorName)
                        },
                    },
                    isOffer: {
                        title: '已收到正式offer',
                        align: 'center',
                        key: 'isOffer',
                        minWidth: 150,
                        filters: [
                            { label: '是',  value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const text = params.row.isOffer == '0' ? '否' : '是';
                            return h('span', text);
                        },
                    },
                    isWebConfirm: {
                        title: '网上确认入读',
                        align: 'center',
                        key: 'isWebConfirm',
                        minWidth: 130,
                        filters: [
                            { label: '无需', value: 2, },
                            {label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isWebConfirm);
                            return h('span', text);
                        },
                    },
                    isPayDeposit: {
                        title: '缴纳入读定金',
                        align: 'center',
                        key: 'isPayDeposit',
                        minWidth: 130,
                        filters: [
                            { label: '无需', value: 2, },
                            {label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isPayDeposit);
                            return h('span', text);
                        },
                    },
                    isRequest: {
                        title: 'Request 120已到达',
                        align: 'center',
                        key: 'isRequest',
                        minWidth: 160,
                        filters: [
                            { label: '无需', value: 2, },
                            {label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isRequest);
                            return h('span', text);
                        },
                    },
                    isConfirmDeposit: {
                        title: '确认入读定金',
                        align: 'center',
                        key: 'isConfirmDeposit',
                        minWidth: 130,
                        filters: [
                            { label: '无需', value: 2, },
                            { label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isConfirmDeposit);
                            return h('span', text);
                        },
                    },
                    updateDate: {
                        title: '更新时间',
                        align: 'center',
                        key: 'updateDate',
                        minWidth: 120,
                        sortable: true,
                        render: (h, params) => {
                            let text = null;
                            if (params.row.stayDeadline) {
                                text = new Date(params.row.stayDeadline).format('yyyy-MM-dd');
                            }
                            return h('span', text);
                        },
                    },
                    isConfirmUrl: {
                        title: '确认入读网址',
                        align: 'center',
                        key: 'isConfirmUrl',
                        minWidth: 130,
                        filters: [
                            { label: '无需', value: 2, },
                            { label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isConfirmUrl);
                            return h('span', text);
                        },
                    },
                    isConfirmAccount: {
                        title: '确认入读账号/密码',
                        align: 'center',
                        key: 'isConfirmAccount',
                        minWidth: 150,
                        filters: [
                            { label: '无需', value: 2, },
                            { label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isConfirmAccount);
                            return h('span', text);
                        },
                    },
                    stayDeadline: {
                        title: '住宿截止',
                        align: 'center',
                        key: 'stayDeadline',
                        minWidth: 120,
                        sortable: true,
                        render: (h, params) => {
                            let text = null;
                            if (params.row.stayDeadline) {
                                text = new Date(params.row.stayDeadline).format('yyyy-MM-dd');
                            }
                            return h('span', text);
                        },
                    },
                    isReserveStay: {
                        title: '预定住宿',
                        align: 'center',
                        key: 'isReserveStay',
                        minWidth: 120,
                        filters: [
                            { label: '无需预定', value: 2, },
                            { label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isReserveStay, 'isReserveStay');
                            return h('span', text);
                        },
                    },
                    isSendVisa: {
                        title: '发送签证等材料',
                        align: 'center',
                        key: 'isSendVisa',
                        minWidth: 140,
                        filters: [
                            { label: '无需', value: 2, },
                            { label: '是', value: 1, },
                            { label: '否', value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            const text = _this.switchToShow(params.row.isSendVisa);
                            return h('span', text);
                        },
                    },
                    visaTime: {
                        title: '签证时间',
                        align: 'center',
                        key: 'visaTime',
                        minWidth: 120,
                        render: (h, params) => {
                            let text = null;
                            if (params.row.visaTime) {
                                text = new Date(params.row.visaTime).format('yyyy-MM-dd');
                            }
                            return h('span', text);
                        },
                    },
                    // 关联字典 定
                    visaResult: {
                        title: '签证结果',
                        align: 'center',
                        key: 'visaResult',
                        minWidth: 120,
                        filters: [],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                    },
                    idMail: {
                        title: '学生ID/邮箱',
                        align: 'center',
                        key: 'idMail',
                        minWidth: 120,
                    },
                    pwd: {
                        title: '邮箱密码',
                        align: 'center',
                        key: 'pwd',
                        minWidth: 120,
                        sortable: true
                    },
                    isHealthReport: {
                        title: '体检表格',
                        align: 'center',
                        key: 'isHealthReport',
                        minWidth: 120,
                        filters: [
                            { label: '无需', value: 2, },
                            { label: '有', value: 1, },
                            { label: '无',  value: 0, },
                        ],
                        filterMultiple: false,
                        filterMethod() {
                            return true;
                        },
                        render: (h, params) => {
                            const _this = this;
                            let text = null;
                            if (params.row.isHealthReport === '0') {
                                text = '无';
                            } else if (params.row.isHealthReport === '1') {
                                text = '有';
                            } else if (params.row.isHealthReport === '2') {
                                text = '无需';
                            }
                            return h('span', text);
                        },
                    },
					applyTime: {
						title: '入学季',
						align: 'center',
                        key: 'applyTime',
                        minWidth: 120,
                    },
                    createBy: {
                        title: '申请顾问',
                        align: 'center',
                        key: 'createBy',
                        minWidth: 120,
                    },
                },
            },
        };
    },
    
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
        ...mapGetters('apply',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isAplManage', 'isAplLeaser', 'isAplConsultant',]),
    },
    watch: {
        companyId(newVal) {
            if (newVal) this.getDocuGroup();
        },
    },
    created() {
        this.getListPage();
        this.getVisa();
    },
    mounted() {
        this.getDocuConsultant(); // 申请顾问获取

        waitUntil(()=>{
            return !!this.userInfo.companyId;
        },()=>{
            // 分公司列表
            this.companyId = this.userInfo.companyId;
            if (this.isAdmin || this.isCeo) this.getCompanyList();
        });
    },
    methods: {
        switchToShow(val, tip) {
            let text = '';
            switch(val) {
                case '0': text = '否'; break;
                case '1': text = '是'; break;
                case '2': text = '无需'; break;
            };
            if (tip === 'isReserveStay') {
                text = text === '无需' ? '无需住宿' : text;
            }
            return text;
        },
        slideNavChange(val) {
            switch(val) {
                case '1':  this.apply = 'UG'; break;
                case '2': this.apply = 'PG'; break;
                case '3': this.apply = 'HS'; break;
            }
            this.getListPage();
        },
        // keyword
        onclickSearch(val) {
            this.keyword = val;
            this.getListPage();
        },
        // time limit
        getTargetList(t1, t2) {
            this.startDate = t1;
            this.endDate = t2;
            this.getListPage();
        },
        // casebarfilter
        tagListChange(val) {
            this.tags = val;
            this.getListPage();
        },
        // compelete ststus
        onclickChoseTags(val) {
            this.resultStatus = val;
            this.getListPage();
        },
        /*
        * Table 操作
        */
        onFilterChange(val1, val2) {
            this[val1] = val2;
            this.getListPage();
        },
        onSortChange(val1, val2) {
            this.orderByType = val1;
            this.orderByStatus = val2;
            this.orderByStatus === 'normal' ? (this.orderByStatus = this.orderByType = null) : this.orderByStatus;
            this.getListPage();
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
        /*
        * 获取标签数据
        */
        /*
        * 公司列表获取
        */
        getCompanyList() {
            if (!this.isAdmin && !this.isCeo) {
                return false;
            }
            sys.controlledList().then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.branchList = [...this.branchList, ...([...res.data.data])];
                }
            }).catch(errors.call(this));
        },
        /*
        * 分组列表获取
        */
        getDocuGroup() {
            common.findGroupNameByMenu({
                officeId: this.companyId,
                menuId: this.pId,
            }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.docuGroup = [];
                    res.data.data.forEach(item => {
                        this.docuGroup.push({
                            id: item.officeId,
                            name: item.name,
                        });
                    });
                    this.docuGroup.unshift({
                        id: null,
                        name: '全部',
                    });
                    this.docuGroupId = null;
                }
            }).catch(errors.call(this));
        },
        /*
        * 申请顾问
        */
        getDocuConsultant() {
            common.findListByUserId({
                menuId: this.pId,
            }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.docuConsultant = [];
                    res.data.data.forEach(item => {
                        this.docuConsultant.push({
                            userId: item.userId,
                            userName: item.name,
                        });
                    });
                    this.docuConsultant.unshift({
                        userName: '全部',
                        userId: null,
                    });
                }
            }).catch(errors.call(this));
        },
        /*
        * 标签处理
        */
        // 分公司
        addAcitveCon(val1) {
            this.branchListIndex1 = val1.index;
            this.companyId = val1.id;
            this.getListPage();
        },
        // 文书组
        addAcitveConGroup(val2) {
            this.docuGroupId = val2.id;
            this.branchListIndex2 = val2.index;
            this.getListPage();
        },
        // 文书顾问
        addAcitveConConsultant(val3) {
            this.docuConsultantId = val3.id;
            this.branchListIndex3 = val3.index;
            this.getListPage();
        },
        /*
        * 列表获取
        */
        getListPage() {
            const data = {
                apply: this.apply,
                keyword: this.keyword,
                officeId: this.companyId,
                comId: this.docuGroupId,
                teacherId: this.docuConsultantId,
                startDate: this.startDate,
                endDate: this.endDate,
                // tags: this.tags,
                resultStatus: this.resultStatus, // tag
                orderByType: this.orderByType,
                orderByStatus: this.orderByStatus,
                isPayDeposit: this.isPayDeposit,
                isRequest: this.isRequest,
                isConfirmDeposit: this.isConfirmDeposit,
                isConfirmUrl: this.isConfirmUrl,
                isConfirmAccount: this.isConfirmAccount,
                isReserveStay: this.isReserveStay,
                isSendVisa: this.isSendVisa,
                isHealthReport: this.isHealthReport,
                visaResult: this.visaResult,

                isOffer: this.isOffer,
                isWebConfirm: this.isWebConfirm,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            aplApplyInfo.applyConfirmListPage(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.largeTable.tableData2 = res.data.data.list;
                    this.pageTotal = res.data.data.count;
                    this.pageSize = res.data.data.pageSize;
                }
            }).catch(errors.call(this));
        },
        /*
        * visa 字典
        */
        getVisa() {
            sys.getTypeList({
                type: 'apl_apply_confirm_visa_result',
            }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.largeTable.table2ColumnList.visaResult.filters = res.data.data;
                }
            }).catch(errors.call(this));
        },
    },
};
</script>