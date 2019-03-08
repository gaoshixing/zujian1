<template>
    <div class="salary-manage-boss">
        <div class="salary-manage-tab-container">
            <Tabs v-model="tabVal" :animated="false">
                <TabPane label="在职员工" name="1"></TabPane>
                <TabPane label="离职员工" name="2"></TabPane>
            </Tabs>
        </div>
        <div class="salary-manage-content">
            <div class="left-menus">
                <left-menu :navTab="tab" @onItemClick="itemClick" ref="leftMenus" style="width: 200px;" :hideStaffNums="false"></left-menu>
            </div>
            <div class="salary-manage-content-infos">
                <div class="salary-manage-content-card">
                    <Select v-model="year" style="width:100px; height:35px; margin-right: 20px; box-sizing: border-box;" @on-change="selectDateChange">
                        <Option v-for="item in yearList" :value="item" :key="item">{{ item + '年' }}</Option>
                    </Select>
                    <Select v-model="month" style="width:100px; height:35px; margin-right: 20px; box-sizing: border-box;" @on-change="selectDateChange">
                        <Option v-for="item in monthList" :value="item" :key="item">{{ item + '月' }}</Option>
                    </Select>
                    <Button type="primary" class="salary-manage-content-card-search-button" @click="onclickSearch">查询</Button>
                    <!-- <Button type="primary" class="salary-manage-content-card-calc-button" @click="onclickCalc">计算薪酬</Button> -->
                </div>
            </div>
            <largeTable
                v-if="largeTable.tableColumnList.length && dataOk"
                :pId="pid"
                :showTags=false
                :exportExcel=true
                :multipleHead=true
                :fixedHeader="[ 0, 1 ]"
                placeholder='请输入员工编号/员工姓名/身份证号'
                :btnVal1="btnVal1"
                btnVal2="导入"
                :hasCaoZuo=true
                :total="count"
                :checkBoxList="largeTable.checkBoxList"
                :tableColumnsChecked="largeTable.checkBoxList"
                :table2ColumnList="largeTable.tableColumnList"
                :tableData2="largeTable.tableData"
                style="margin-top: 20px; margin-left: 20px;"
                @onClickBtn1="onClickBtn1"
                @onclickImportData="onclickImportData"
                @onSortChange="onSortChange"
                @onFilterChange="onFilterChange"
                @getchangedCheckedItem="getchangedCheckedItem"
                @exportExcel="exportExcel"
                @onclickSearchInfos="searchInfos"
            ></largeTable>
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
            <edit-modal ref="edit" :model='editModal' :editData="editData" @editModalChange="editModalChange" :year="year" :month="month"></edit-modal>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import editModal from './modules/edit';
import { mapState, mapMutations, } from 'vuex';
import leftMenu from "../../modules/leftMenu";
import { waitUntil, } from '@public/libs/util';
import largeTable from '../../modules/largeTable.vue';
import SalaryManegeClass from '../../schema/salaryManege.js';
import valid, { errors, sys, common, salaryManageApi, socialSecurityApi, salPerpetualCalenderRest, } from '../../libs/request';

export default {
    name: 'SalaryManage',
    props: {
        pid: {
            type: String,
        },
    },
    components: {
        leftMenu,
        largeTable,
        editModal,
    },
    data() {
        return{
            modifyContent: null,
            indexs: null,
            tempData: null,
            rdatas: null,
            tab: true,
            tabVal: '1',
            btnVal1: '薪酬规则设置',
            year: null,
            month: null,
            dataOk: false, // 数据加载完成后 显示 table
            monthList: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ],
            yearList: [ new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3 ],
            editData: null,
            editModal: false,
            count: 0,
            pageNo: 1,
            pageSize: 10,
            pageCount: 0,
            largeTable: {
                checkBoxList: [],
                tableChecked: [],
                tableColumnList: [],
                tableData: [],
            },
            tempColumnList: null,
            orderBy: null,
            orderType: null,
            userType: null,
            userStatus: null,
            personnelNature: null,
            accountNature: null,
            insurePolicy: null,
            condition: '',
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
    },
    watch: {
        tabVal(newVal) {
            this.btnVal1 = newVal === '1' ? '薪酬规则设置' : '';
            this.getListPage();
        },
    },
    created() {
        this.getCurYearAndMonth();
    },
    mounted(){
        this.dealClassFunc();
        waitUntil(() => {
            return !!this.largeTable.tableColumnList.length;
        }, () => {
            const newSalaryManegeClass = new SalaryManegeClass(this);
            newSalaryManegeClass.getDict({type: 'sal_user_basic_info_job_status'}).then(res => this.largeTable.tableColumnList[2].children[0].filters = res);
            newSalaryManegeClass.getDict({type: 'sal_user_basic_info_user_status'}).then(res => { this.largeTable.tableColumnList[2].children[1].filters = res; this.dataOk = true; });
            // newSalaryManegeClass.getDict({type: 'sal_user_basic_info_function_status'}).then(res => this.largeTable.tableColumnList[2].children[6].filters = res);
            // newSalaryManegeClass.getDict({type: 'sal_user_basic_info_account_character'}).then(res => this.largeTable.tableColumnList[2].children[10].filters = res); //户口性质
            // newSalaryManegeClass.getDict({type: 'sal_user_basic_info_insure_policy'}).then(res => this.largeTable.tableColumnList[2].children[12].filters = res); // 参保政策
        });
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        /*
        * 时间筛选
        */
        selectDateChange() {
            this.getListPage();
        },
        itemClick(item, type) {
            waitUntil(() => {
                return !!this.year;
            }, () => {
                console.log(type);
                if(type == 'org') {
                    // this.level = null,
                    this.companyId = item.id;
                    // 组织机构
                    this.getListPage('companyId', item.id);
                }else if(type == 'grade') {
                    // 职能等级
                    // this.companyId = null;
                    this.level = item.id;
                    this.getListPage('level', item.id);
                }
            });
        },
        onclickCalc() {
            console.log('calc');
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
        showEditModal(data, index) {
            this.indexs = index; // 修改的是哪一行
            this.editData = data;
            this.editModal = true;
        },
        editModalChange(type, data) {
            if (type === 'cancel') {
                this.editData = null;
                this.editModal = false;
            } else if (type === 'save') {

            } else if (type === 'fix') {
                this.updatePerformance();
            }
            this.editModal = false;
        },
        /*
        * largeTable
        * onclickSearch 搜索
        * onClickBtn1 前往薪酬规则
        * onclickImportData 导入
        * getchangedCheckedItem 筛选项发生变化
        * onSortChange 排序
        * onFilterChange 筛选
        * exportExcel 导出 excel
        */
        onclickSearch(val) {
            this.searchVal = val;
            this.getListPage();
        },
        onClickBtn1() {
            this.$router.push({
                name: 'salary.salaryRule',
            });
        },
        onclickImportData() {
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'salaryManage',
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
            this.getListPage();
        },
        onFilterChange(key, val) {
            this[key] = val;
            this.getListPage();
        },
        getchangedCheckedItem(val) {
            const tempArr = JSON.parse(JSON.stringify(this.tempColumnList));
            tempArr.forEach(item => {
                item.value.forEach(items => items.isCheck = '0');
            });
            val.forEach(item => {
                tempArr.forEach((items, indexs) => {
                    items.value.forEach((itemss, indexss) => {
                        if (itemss.key === item.key && item.isCheck === '1') {
                            tempArr[indexs].value[indexss].isCheck = '1';
                            console.log(tempArr[indexs].value[indexss].key, tempArr[indexs].value[indexss].isCheck);
                        }
                    });
                });
            });
            const data = {
                userId: this.userInfo.id,
                headListStr: tempArr,
            };
            salaryManageApi.saveAttendanceHeadList(data).then(valid.call(this)).then(res => {}).catch(errors.call(this)).finally(() => {});
        },
        exportExcel(data) {
            const tempArr = [];
            data.resInfoColVOS.split(',').forEach(item => {
                this.largeTable.checkBoxList.forEach(items => {
                    if (item === items.key) tempArr.push(items);
                });
            });
            const datas = {
                cols: tempArr,
                month: this.month < 10 ? '0' + this.month : this.month + '',
                userId: this.userInfo.id,
                year: this.year,
                userIds: data.ids,
            };
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.exportExcel(datas).then(valid.call(this)).then(res => {
                if (res.data) {
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
                } else {
                    this.$Message.error(res.data.message);
                }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false});});
        },
        /*
        * 列表获取
        */
        getListPage(type, val) {
            let data = {
                isInService: this.tabVal,
                month: this.month < 10 ? '0' + this.month : this.month + '',
                year: this.year + '',
                userType: this.userType,
                userStatus: this.userStatus,
                personnelNature: this.personnelNature,
                accountNature: this.accountNature,
                insurePolicy: this.insurePolicy,
                orderBy: this.orderBy,
                orderType: this.orderType,
                page: {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                },
                companyId: this.companyId,
                level: this.level,
            };
            if(this.condition) data.condition = this.condition;
            data[type] = val;
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.findPerformanceList(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    if (res.ok) {
                        this.tempData = JSON.parse(JSON.stringify(res.data.data.page.list));
                        const rdata = res.data.data.page;
                        this.largeTable.tableData = rdata.list;
                        this.pageNo = rdata.pageNo;
                        this.pageSize = rdata.pageSize;
                        this.count = rdata.count;
                        this.pageCount = rdata.pageCount;
                    }
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        /*
        * 列表表头获取
        */
        dealClassFunc() {
            waitUntil(() => {
                return !!this.userInfo.id;
            }, () => {
                const newSalaryManegeClass = new SalaryManegeClass(this, { userId: this.userInfo.id });
                newSalaryManegeClass.dealHeaderData({ userId: this.userInfo.id }).then(res => {
                    setTimeout(() => this.largeTable.tableColumnList = res, 0);
                });
                newSalaryManegeClass.getDoubleHeadList({ userId: this.userInfo.id }).then(res => {
                    this.tempColumnList = JSON.parse(JSON.stringify(res)); // 保存 表头 数据 结构
                    let tempArr = [];
                    res.forEach(item => {
                        item.value.forEach(items => tempArr.push(items));
                    });
                    tempArr.push({isSys: "1", isCheck: "1", key: "caozuo", value: "操作"}); // 添加 操作选项 提交的时候删除s;
                    this.largeTable.checkBoxList = this.largeTable.tableChecked = tempArr;
                });
            });
        },
        /*
        * 获取当前月份
        */
        getCurYearAndMonth() {
            salPerpetualCalenderRest.getCurrentYearAndMonth({}).then(valid.call(this)).then(res => {
                const rdata = res.data.data;
                this.year = rdata.year;
                this.month = Number(rdata.month);
                this.getListPage();
            }).catch(errors.call(this));
        },
        /*
        * 更新数据 信息更正
        */
        updatePerformance(datas) {
            const tempDatas = JSON.parse(JSON.stringify(this.editData));
            delete this.tempData._id;
            delete tempDatas._id;
            const postData = {};
            Object.keys(tempDatas).forEach(key => {
                if (key.startsWith('_') === false) {
                    postData[key] = tempDatas[key];
                }
            });
            const data = {
                month: tempDatas.month,
                userId: tempDatas.userId,
                year: tempDatas.year,
                performanceMap: postData,
            };
            this.updateLoadingStatus({isLoading:true});
            salaryManageApi.updatePerformance(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.editData = null;
                    this.editModal = false;
                    this.getListPage();
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:true}));
        },
        searchInfos(val) {
            // 列表搜索
            this.condition = val;
            this.getListPage();
        },
    },
};
</script>

<style lang="less">
    .salary-manage-boss {
        position: relative;
        height: 100%;
        .left-menus{
            width: 200px;
            height: 100%;
            border-right: solid 1px #e0e0e0;
            position: absolute;
            left: 0;
            top: 0;
        }
        .salary-manage-tab-container {
            position: relative;
            .salary-manage-tab-button {
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        .salary-manage-content {
            margin-top: 20px;
            position: relative;
            padding-left: 200px;
            height: 100%;
            .salary-manage-content-infos {
                margin-left: 20px;
                .salary-manage-content-card {
                    width: 100%;
                    height: 92px;
                    border-radius: 4px;
                    box-sizing: border-box;
                    padding: 30px 50px 0 30px;
                    border: solid 1px #e0e0e0;
                    box-shadow: 0 2px 10px #e5e5e5;
                    .ivu-select-selection {
                        height: 32px;
                        .ivu-select-selected-value {
                            height: 32px;
                            line-height: 32px;
                        }
                    }
                    .salary-manage-content-card-search-button {
                        box-sizing: border-box;
                        height: 32px;
                        width: 95px;
                    }
                    .salary-manage-content-card-calc-button {
                        position: absolute;
                        right: 50px;
                        top: 30px;
                        width: 100px;
                        height: 35px;
                    }
                }
            }
        }
    }
</style>
