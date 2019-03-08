<style lang="less">
@import '../../../../../assets/less/config.less';
.attendance-manage-container{
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 200px;
    margin-top: 10px;
    .leftMenu{
        width: 200px;
        border-right: 1px solid #dddee1;
    }
    .left-menus{
        left: 0;
        top: 0;
        width: 200px;
        height: 100%;
        position: absolute;
    }
    .right-container{
        position: relative;
        min-height: 100%;
        margin: 15px 0 0 15px;
    }
    .box{
        padding: 18px 30px;
        border-radius: 4px;
        border: solid 1px #e0e0e0;
        box-shadow: 0 2px 10px #e5e5e5;
        .ivu-select{
            width:100px;margin-right: 20px;
        }
        .icon-data-picker{
            @h: 32px;
            float: right;height: @h;line-height: @h;width: @h;
            text-align: center;font-size: 20px;color: @primary-color;
            cursor: pointer;
        }
    }
    .count{
        position: relative;//top: 6px;
        line-height: 40px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
    .history{
        text-align: center;
    }
}
.model-edit-attendance{
    .ivu-form-item{
        float: left;
    }
    .edit-brief{
        padding-bottom: 12px;margin-bottom: 20px;
        border-bottom: 1px solid #dcdcdc;
        .ivu-form-item{
            margin-bottom: 0;
        }
    }
    .edit-detail{
        .ivu-form-item{
            margin-bottom: 20px;
        }
    }
}
.model-histroy {
    .ivu-modal-body {
        height: 500px;
        overflow: hidden;
        overflow-y: scroll;
        padding-bottom: 50px;
        box-sizing: border-box;
    }
}
</style>
    
<template>
<div class="attendance-manage-container">
    <div class="left-menus">
        <left-menu :navTab="tab" @onItemClick="itemClick" ref="leftMenus" style="width: 200px;" :hideStaffNums="false"></left-menu>
    </div>
    <div class="right-container">
        <div class="box">
            <Select v-model="year" @on-change="selectDateChange">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value + '年'}}</Option>
            </Select>
            <Select v-model="month" @on-change="selectDateChange">
                <Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.value + '月'}}</Option>
            </Select>
            <span class="conut">工作天数：{{ workDays }}天</span>
            <span class="icon-data-picker" @click="showDataPicker">
                <Icon type="calendar"></Icon>
            </span>
            <div class="history" @click="showHistry"><a>查看历史纪录</a></div>
        </div>

        <my-date-picker
            ref="myDataPicker"
            v-if="year"
            :yearList="yearList"
            :yearProp="year"
            :monthProp="month"
            @getWorkDays="getWorkDays"
        ></my-date-picker>

        <largeTableSalary
            :pId="pid"
            :showTags=false
            :exportExcel=true
            :total="count"
            :fixedHeader="[ 0, 1 ]"
            placeholder='请输入员工编号/员工姓名/身份证号'
            :checkBoxList="largeTable.checkBoxList"
            :tableColumnsChecked="largeTable.checkBoxList"
            :table2ColumnList="largeTable.tableColumnList"
            :tableData2="largeTable.tableData"
            :hasCaoZuo=true
            style="margin-top: 20px;"
            @onclickSearchInfos="onclickSearchInfos"
            @onclickImportData="onclickImportData"
            @onSortChange="onSortChange"
            @onFilterChange="onFilterChange"
            @getchangedCheckedItem="getchangedCheckedItem"
            @exportExcel="exportExcel"
        ></largeTableSalary>
    </div>
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
    <Modal v-model="histroyModal" title="历史记录" width='728' class="model-histroy">
        <ul class="histroy-lists" v-if="historyList.length">
            <li class="histroy-item" v-for="(item, index) in historyList" :key="index">
                <div class="time">• {{item.createDate}}</div>
                <div class="detail" v-html="item.content"></div>
            </li>
        </ul>
        <div v-else style="width: 698px; height: 420px; box-sizing: border-box; padding-top: 100px;">
            <img src="../../assets/img/no-history@2x.png" alt="" style="width: 315px; height: 232px; margin: 0 auto; display: block;">
        </div>
    </Modal>
    <Modal v-model="editModal" title="调整员工出勤信息" width='728' class="model-edit-attendance" @on-ok="editOk" @on-cancel="editCancel">
        <div class="edit-brief clearfix">
            <Form ref="briefDetail" :model="attendanceDetail" :rules="briefRules" :label-width="120">
                <FormItem label="员工编号：" prop="bianhao" style="width: 50%">
                    <div>{{ editData.userNo }}</div>
                </FormItem>
                <FormItem label="员工姓名：" prop="xingming" style="width: 50%">
                    <div>{{ editData.userName }}</div>
                </FormItem>
                <FormItem label="考勤月份：" prop="yuefen" style="width: 50%">
                    <div>{{ month + '月' }}</div>
                </FormItem>
                <FormItem label="应出勤天数：" prop="tianshu" style="width: 50%">
                    <div>{{ workDays }}</div>
                </FormItem>
            </Form>
        </div>
        <div class="edit-detail clearfix">
            <Form ref="briefDetail" :model="attendanceDetail" :rules="briefRules" :label-width="120">
                <FormItem label="出勤天数：" prop="phone" style="width: 50%">
                    <InputNumber v-model="editData.actualAttendanceDays" style="width:200px;"></InputNumber>
                </FormItem>
                <FormItem label="缺勤天数：" prop="phone" style="width: 50%">
                    <InputNumber v-model="editData.absenceDays" style="width:200px;"></InputNumber>
                </FormItem>
                <FormItem label="旷工天数：" prop="phone" style="width: 50%">
                    <InputNumber v-model="editData.completionDays" style="width:200px;"></InputNumber>
                </FormItem>
                <FormItem label="迟到次数：" prop="phone" style="width: 50%">
                    <InputNumber v-model="editData.lateTimes" style="width:200px;"></InputNumber>
                </FormItem>
                <FormItem label="加班天数：" prop="phone" style="width: 50%">
                    <InputNumber v-model="editData.overtimeDays" style="width:200px;"></InputNumber>
                </FormItem>
                <FormItem label="未休假天数：" prop="phone" style="width: 50%">
                    <InputNumber v-model="editData.notLeaveDays" style="width:200px;"></InputNumber>
                </FormItem>
                <FormItem label="备注：" prop="phone" style="width: 100%">
                    <Input type="textarea" v-model="editData.remarks" style="width:548px;"></Input>
                </FormItem>
            </Form>
        </div>
    </Modal>
</div>
</template>

<script>
import { waitUntil, } from '@public/libs/util';
import { mapState, mapMutations } from 'vuex';
import leftMenu from "../../modules/leftMenu";
import BtnList from '@public/modules/btnlist';
import myDatePicker from './modules/myDatePicker.vue';
import largeTableSalary from '../../modules/largeTable.vue';
import Attendance from '../../schema/attendance.js';
import valid, { errors, sys, common, salHistoryLog, attendanceManageApi, salPerpetualCalenderRest, } from '../../libs/request';
export default {
    props: {
        pid: {
            type: String,
        },
    },
    data(){
        return {
            modifyContent: null,
            indexs: null,
            copyTempData: null,
            rdatas: null,
            historyList: [],
            tab: true,
            compact: '',
            pageNo: 1,//当前页码
            pageCount: 0,//页码总数
            pageSize: 10,//每页条数
            count: 0,//数据总数
            loading: true,
            workDays: 0,
            searchVal: null,
            year: null,
            month: null,
            yearList: [
                { value: new Date().getFullYear(), },
                { value: new Date().getFullYear() - 1, },
                { value: new Date().getFullYear() - 2, },
                {  value: new Date().getFullYear() - 3, },
            ],
            monthList: [
                { value: 1, },
                { value: 2, },
                { value: 3, },
                { value: 4, },
                { value: 5, },
                { value: 6, },
                { value: 7, },
                { value: 8, },
                { value: 9, },
                { value: 10, },
                { value: 11, },
                { value: 12, },
            ],
            params: {},
            histroyModal: false,
            editModal: false,
            editData: {}, // 点击编辑 修改数据
            briefRules: {},
            attendanceDetail: {
                bianhao: 'BJ0001',
                xingming: '张三',
                yuefen: '2018年8月',
                tianshu: '23天',
            },
            largeTable: {
                checkBoxList: [],
                tableChecked: [],
                tableColumnList: [],
                tableData: [],
            },
            jobStatus: null,
            userStatus: null,
            level: null,
            companyId: null,
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
    },
    components: {
        leftMenu, BtnList, myDatePicker, largeTableSalary,
    },
    created() {
        this.getCurYearAndMonth(); // 获取当前年月
        waitUntil(() => {
            return !!this.userInfo.id;
        }, () => {
            this.getAttendanceHeadList(); // 获取列表表头
            const newAttendance = new Attendance(this);
            this.largeTable.tableColumnList = newAttendance.columns;
            newAttendance.getDict({type: 'sal_user_basic_info_user_status'}).then(res => this.largeTable.tableColumnList[3].filters = res);
            newAttendance.getDict({type: 'sal_user_basic_info_job_status'}).then(res => this.largeTable.tableColumnList[2].filters = res);
        });
    },
    mounted(){
        this.getLists();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        /*
        * 时间筛选
        */
        selectDateChange() {
            this.getAttendanceListByDateAndLocate();
        },
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
        itemClick(item, type) {
            waitUntil(() => {
                return !!this.year;
            }, () => {
                if(type == 'org') {
                    // this.level = null,
                    this.companyId = item.id;
                    // 组织机构
                    this.getAttendanceListByDateAndLocate('companyId', item.id);
                }else if(type == 'grade') {
                    // 职能等级
                    // this.companyId = null;
                    this.level = item.id;
                    this.getAttendanceListByDateAndLocate('level', item.id);
                }
            });
        },
        datafunc() {
            return new Promise((resolve, reject) => {});
        },
        export() {
            // 导出
        },
        import() {
            // 导入
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'attendanceManage'
				},
			});
        },
        showDataPicker() {
            if (!this.workDays) {
                this.$Message.error('无当前月份数据');
                return;
            }
            this.$refs.myDataPicker.showBoxFun();
        },
        showHistry() {
            this.getHistoryLog();
            this.histroyModal = true;
        },
        /*
        * edit modal
        * show modal
        * edit ok
        * edit cancel
        */
        showEditModal(data, index) {
            this.indexs = index; // 修改的是哪一行
            this.editData = JSON.parse(JSON.stringify(data));

            this.editData.id = this.editData.attendanceId;
            this.editData.attendanceMonth = this.editData.attendanceYearMonth.split('/')[1];
            this.editData.attendanceYear = this.editData.attendanceYearMonth.split('/')[0];

            this.editData.absenceDays = this.editData.absenceDays - 0 || 0;
            this.editData.actualAttendanceDays = this.editData.actualAttendanceDays - 0 || 0;
            this.editData.lateTimes = this.editData.lateTimes - 0 || 0;
            this.editData.notLeaveDays = this.editData.notLeaveDays - 0 || 0;
            this.editData.overtimeDays = this.editData.overtimeDays - 0 || 0;
            this.editData.completionDays = this.editData.completionDays - 0 || 0;
            delete this.editData.attendanceId;
            delete this.editData._index;
            delete this.editData._rowKey;
            delete this.editData.userStatus;
            delete this.editData.job;
            delete this.editData.attendanceYearMonth;
            this.editModal = true;
        },
        editOk() {
            this.updateLoadingStatus({isLoading:true});
            attendanceManageApi.listAttendance(this.editData).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.$Message.success(res.data.message);
                    this.getAttendanceListByDateAndLocate();
                    this.saveHistoryLog();
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        editCancel() {
            this.editModal = false;
            this.editData = {};
        },
        /*
        * largeTable
        * onclickSearchInfos 搜索
        * onclickImportData 导入
        * onSortChange 排序
        * onFilterChange 筛选
        * getchangedCheckedItem 筛选项发生变化
        * exportExcel 导出 excel
        */
        onclickSearchInfos(val) {
            this.searchVal = val;
            this.getAttendanceListByDateAndLocate();
        },
        onclickImportData() {
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'attendanceManage'
				},
			});
        },
        onSortChange(key, val) {
            this.orderBy = key;
            switch (val) {
                case 'normal': this.orderType = null; this.orderBy = null; break;
                case 'asc': this.orderType = '2'; break;
                case 'desc': this.orderType = '1'; break;
            };
            this.getAttendanceListByDateAndLocate();
        },
        onFilterChange(key, val) {
            this[key] = val;
            this.getAttendanceListByDateAndLocate();
        },
        getchangedCheckedItem(val) {
            const data = {
                userId: this.userInfo.id,
                headListStr: val,
            };
            attendanceManageApi.saveAttendanceHeadList(data).then(valid.call(this)).then(res => {}).catch(errors.call(this)).finally(() => {});
        },
        exportExcel(data) {
            const tempArr = [];
            data.resInfoColVOS.split(',').forEach(item => {
                this.largeTable.checkBoxList.forEach(items => {
                    if (item === items.key) tempArr.push(items)
                });
            });
            const datas = {
                cols: tempArr,
                month: this.month < 10 ? '0' + this.month : this.month + '',
                userId: this.userInfo.id,
                year: this.year,
                userIds: data.ids,
            }
            this.updateLoadingStatus({isLoading:true});
            attendanceManageApi.exportExcel(datas).then(valid.call(this)).then(res => {
                // console.log(res)
                const blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
                const contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                const result = patt.exec(contentDisposition);
                if (!result) {
                    this.$Message.error('暂无数据');
                    return;
                }
                const filename = decodeURIComponent(result[1]);
                const downloadElement = document.createElement('a');
                const href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.style.display = 'none';
                downloadElement.href = href;
                downloadElement.download =filename ; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href);
                // if (res.data) {
                //     const blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
                //     const link = document.createElement('a');
                //     const contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                //     const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                //     const result = patt.exec(contentDisposition);
                //     const filename = decodeURIComponent(result[1]);
                //     link.href = window.URL.createObjectURL(blob);
                //     link.download = filename;
                //     link.click();
                // } else {
                //     this.$Message.error(res.data.message);
                // }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false});});
        },
        /*
        * 分页
        */
        onclickPageNoChange(val) {
            this.pageNo = val;
            this.getAttendanceListByDateAndLocate();
        },
        onclickPageSizeChange(val) {
            this.pageSize = val;
            this.getAttendanceListByDateAndLocate();
        },
        /*
        * 获取 列表 表头 显示项
        */
        getAttendanceHeadList() {
            attendanceManageApi.getAttendanceHeadList({ userId: this.userInfo.id, }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    const rdata = res.data.data;
                    rdata.push({isSys: "1", isCheck: "1", key: "caozuo", value: "操作"}); // 添加 操作选项 提交的时候删除s
                    this.largeTable.tableChecked = rdata;
                    this.largeTable.checkBoxList = rdata;
                }
            }).catch(errors.call(this));
        },
        /*
        * 获取列表数据
        */
        getAttendanceListByDateAndLocate(type, val) {
            const data = {
                year: this.year,
                month: this.month < 10 ? '0' + this.month : this.month + '',
                condition: this.searchVal,
                jobStatus: this.jobStatus,
                userStatus: this.userStatus,
                orderBy: this.orderBy,
                orderType: this.orderType,
                pageNum: this.pageNo,
                pageSize: this.pageSize,
                companyId: this.companyId == 1 ?  this.userInfo.companyId : this.companyId,
                level: this.level,
                // userId: this.userInfo.id,
            };
            // data[type] = val;
            attendanceManageApi.getAttendanceListByDateAndLocate(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.copyTempData = JSON.parse(JSON.stringify(res.data.data.list));
                    const rdata = res.data.data;
                    this.largeTable.tableData = rdata.list;
                    this.count = rdata.total;
                    this.pageCount = rdata.pages;
                }
            }).catch(errors.call(this)).finally(() => {});
        },
        /*
        * 获取当前月份
        */
        getCurYearAndMonth() {
            salPerpetualCalenderRest.getCurrentYearAndMonth({}).then(valid.call(this)).then(res => {
                const rdata = res.data.data;
                this.year = rdata.year;
                this.month = Number(rdata.month);
            }).catch(errors.call(this));
        },
        /*
        * 获取当月工作天数
        */
        getWorkDays(val) {
            this.workDays = val;
        },
        /*
        * 保存历史记录
        */
        saveHistoryLog() {
            let contentData = '';
            let fixPro = '';
            const cuscode = this.largeTable.tableData[this.indexs].userNo;
            const computedArr = ['actualAttendanceDays', 'absenceDays', 'completionDays', 'lateTimes', 'overtimeDays', 'notLeaveDays', 'remarks'];
            computedArr.forEach(key => {
                if (this.copyTempData[this.indexs][key] != this.editData[key]) {
                    this.largeTable.tableChecked.forEach(item => {
                        if (item.key === key) fixPro = item.value;
                    });
                    contentData += `<p>修改<span style="color: #44bcb7;">员工编号为 ${cuscode} </span>的${fixPro}，由 ${this.copyTempData[this.indexs][key]} 改为 ${this.editData[key]}。<p>`;
                }
            });
            contentData = `<li>${contentData}<p>操作人： ${this.userInfo.name}</p></li>`
            const data = {
                content: contentData,
                userId: this.userInfo.id,
                type: '14',
            };
            salHistoryLog.save(data).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getAttendanceListByDateAndLocate();
				}
            }).catch(errors.call(this));
        },
        /*
        * 获取历史纪录
        */
        getHistoryLog() {
            const data = {
                userId: this.userInfo.id,
                pageNo: 1,
                pageSize: 10000,
                type: '14',
            };
            salHistoryLog.list(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.historyList = res.data.data.list;
                }
            }).then(errors.call(this)).finally(() => {});
        },
    }
}
</script>


