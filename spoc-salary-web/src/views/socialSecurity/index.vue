<style lang="less">
.social-security-main-container{
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
        width: 100%;
        margin: 15px 15px 0 15px;
        padding-right: 15px;
    }
    .box{
        padding: 18px 30px;
        border-radius: 4px;
        border: solid 1px #e0e0e0;
        box-shadow: 0 2px 10px #e5e5e5;
        .ivu-select{
            width:100px;margin-right: 20px;
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
<div class="social-security-main-container">
    <div class="left-menus">
        <left-menu :navTab="tab" @onItemClick="itemClick" ref="leftMenus" :hideStaffNums="false"></left-menu>
    </div>
    <div class="right-container">
        <div class="box">
            <Select v-model="year" @on-change="selectDateChange">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}年</Option>
            </Select>
            <Select v-model="month" @on-change="selectDateChange">
                <Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.value }}月</Option>
            </Select>
            <span class="conut" v-if="newStaffNums">本月新入职 <a style="font-size: 20px;">{{newStaffNums}}</a> 位员工，请尽快填写社保信息。</span>
            <div class="history" @click="showHistry"><a>查看历史纪录</a></div>
        </div>

        <largeTable
            v-if="largeTable.tableColumnList.length && dataOk"
            :showSearchInput=false
            :pId="pid"
            :total="count"
            :showTags=false
            :exportExcel=true
            :multipleHead=true
            :fixedHeader="[ 0, 1 ]"
            placeholder='请输入员工编号/员工姓名/身份证号'
            btnVal2="导入"
            btnVal1="社保规则"
            :hasCaoZuo=true
            :checkBoxList="largeTable.checkBoxList"
            :tableColumnsChecked="largeTable.checkBoxList"
            :table2ColumnList="largeTable.tableColumnList"
            :tableData2="largeTable.tableData"
            style="margin-top: 20px;"
            @onclickImportData="onclickImportData"
            @getchangedCheckedItem="getchangedCheckedItem"
            @exportExcel="exportExcel"
            @onSortChange="onSortChange"
            @onFilterChange="onFilterChange"
            @onClickBtn1="goSocialSecurityRule"
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
    </div>

    <edit-modal ref="edit" :zhengceLists="zhengceLists" :model='editModal' :year="year" :month="month" :editData="editData" @editModalChange="editModalChange"></edit-modal>

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
        <!-- <div class="page-box" v-show="pageCount > 1">
            <div style="margin: auto;display: inline-block;">
                <Page :current="pageNo"
                    :total="count"
                    show-elevator show-total show-sizer
                    :page-size="pageSize"
                    @on-change="pageChange"
                    @on-page-size-change="sizeChange">
                </Page>
            </div>
        </div> -->
    </Modal>
</div>
</template>

<script>
import { mapState, mapMutations, } from 'vuex';
import leftMenu from "../../modules/leftMenu";
import BtnList from '@public/modules/btnlist';
import editModal from './modules/edit';
import { waitUntil, } from '@public/libs/util';
import largeTable from '../../modules/largeTable.vue';
import SocialSecurityClass from '../../schema/socialSecurity.js';
import valid, { errors, sys, common, socialSecurityApi, salPerpetualCalenderRest, salHistoryLog, salaryManageApi } from '../../libs/request';

export default {
    name: 'SocialSecurity',
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
            typeDict: [],
            zhengceLists: [],
            tab: true,
            compact: '',
            pageNo: 1,//当前页码
            pageCount: 1,//页码总数
            pageSize: 10,//每页条数
            count: 0,//数据总数
            year: null,
            month: null,
            newStaffNums: 0,
            histroyModal: false,
            editData: null,
            editModal: false,
            newSocialSecurityClass: null,
            tempColumnList: null,
            dataOk: false, // 数据加载完成后 显示 table
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
            largeTable: {
                checkBoxList: [],
                tableChecked: [],
                tableColumnList: [],
                tableData: [],
            },
            orderBy: null,
            orderType: null,
            userType: null,
            userStatus: null,
            personnelNature: null,
            accountNature: null,
            insurePolicy: null,
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
    },
    components: {
        leftMenu, BtnList, editModal, largeTable
    },
    created() {
        this.getCurYearAndMonth();
    },
    mounted() {
        this.dealClassFunc();
        this.getRuleListPage();
        waitUntil(() => {
            return !!this.largeTable.tableColumnList.length;
        }, () => {
            this.newSocialSecurityClass = new SocialSecurityClass(this);
            this.newSocialSecurityClass.getDict({type: 'sal_user_basic_info_job_status'}).then(res => this.largeTable.tableColumnList[2].children[0].filters = res);
            this.newSocialSecurityClass.getDict({type: 'sal_user_basic_info_user_status'}).then(res => this.largeTable.tableColumnList[2].children[1].filters = res);
            this.newSocialSecurityClass.getDict({type: 'sal_user_basic_info_function_status'}).then(res => this.largeTable.tableColumnList[2].children[6].filters = res);
            this.newSocialSecurityClass.getDict({type: 'sal_user_basic_info_account_character'}).then(res => this.largeTable.tableColumnList[2].children[10].filters = res);
            this.newSocialSecurityClass.getDict({type: 'sal_user_basic_info_insure_policy'}).then(res => { this.largeTable.tableColumnList[2].children[12].filters = res; this.dataOk = true; });
        });
        this.getCityList();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        /*
        * 时间筛选
        */
        selectDateChange() {
            this.findPerformanceList();
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
                    // 组织机构
                    // this.level = null,
                    this.companyId = item.id;
                    this.findPerformanceList('companyId', item.id);
                }else if(type == 'grade') {
                    // 职能等级
                    // this.companyId = null;
                    this.level = item.id;
                    this.findPerformanceList('level', item.id);
                }
            });
        },
        textChange() {
            // 搜索
            if(this.compact != '') {
                this.params.nameOrNo = this.compact;
            } else {
                delete this.params.nameOrNo;
            }
            this.getLists();
        },
        showHistry() {
            this.getHistoryLog();
            this.histroyModal = true;
        },
        pageChange(page) {
            this.pageNo = page;
            this.getLists();
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getLists();
        },
        editModalChange(type, data) {
            if (type === 'cancel') {
                this.editData = null;
            } else if (type === 'save') {

            } else if (type === 'fix') {
                this.updatePerformance();
            }
            this.editModal = false;
        },
        /*
        * onSortChange 排序
        * onFilterChange 筛选
        * largeTable
        * onclickImportData 导入
        * onSortChange 排序
        * onFilterChange 筛选
        * getchangedCheckedItem 筛选项发生变化
        * showEditModal 编辑
        * exportExcel 导出 excel
        */
        onclickImportData() {
            this.$router.push({
				name: 'salary.import',
				query: {
                    froms: 'SALARY',
                    path: 'socialSecurity',
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
            this.findPerformanceList();
        },
        onFilterChange(key, val) {
            this[key] = val;
            this.findPerformanceList();
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
                        }
                    });
                });
            });
            const data = {
                userId: this.userInfo.id,
                headListStr: tempArr,
            };
            socialSecurityApi.updatePerformance(data).then(valid.call(this)).then(res => {}).catch(errors.call(this)).finally(() => {});
        },
        showEditModal(data, index) {
            this.indexs = index; // 修改的是哪一行
            this.editData = data;
            this.editModal = true;
        },
        exportExcel(data) {
            const tempArr = [];
            data.resInfoColVOS.split(',').forEach(item => {
                this.largeTable.checkBoxList.forEach(items => {
                    if (item === items.key) tempArr.push(items)
                });
            });
            tempArr.pop();
            const datas = {
                cols: tempArr,
                month: this.month < 10 ? '0' + this.month : this.month + '',
                userId: this.userInfo.id,
                year: this.year,
                userIds: data.ids,
            }
            this.updateLoadingStatus({isLoading:true});
            socialSecurityApi.exportExcel(datas).then(valid.call(this)).then(res => {
                if (res.data) {
                    const blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
                    const link = document.createElement('a');
                    const contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    const result = patt.exec(contentDisposition);
                    const filename = decodeURIComponent(result[1]);
                    link.href = window.URL.createObjectURL(blob);
            
                    link.download = filename;
            
                    link.click();
                    // const contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    // const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    // const result = patt.exec(contentDisposition);
                    // if (!result) {
                    //     this.$Message.error('暂无数据');
                    //     return;
                    // }
                    // const filename = result[1];
                    // const downloadElement = document.createElement('a');
                    // const href = window.URL.createObjectURL(blob); //创建下载的链接
                    // downloadElement.style.display = 'none';
                    // downloadElement.href = href;
                    // downloadElement.download =filename ; //下载后文件名
                    // document.body.appendChild(downloadElement);
                    // downloadElement.click(); //点击下载
                    // document.body.removeChild(downloadElement); //下载完成移除元素
                    // window.URL.revokeObjectURL(href);
                } else {
                    this.$Message.error(res.data.message);
                }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false});});
        },
        /*
        * 列表表头获取
        */
        dealClassFunc() {
            waitUntil(() => {
                return !!this.userInfo.id;
            }, () => {
                const newSocialSecurityClass = new SocialSecurityClass(this, { userId: this.userInfo.id });
                newSocialSecurityClass.dealHeaderData({ userId: this.userInfo.id }).then(res => {
                    setTimeout(() => this.largeTable.tableColumnList = res, 0);
                });
                newSocialSecurityClass.getDoubleHeadList({ userId: this.userInfo.id }).then(res => {
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
        * 列表数据获取
        */
        findPerformanceList(type, val) {
            const data = {
                month: this.month < 10 ? '0' + this.month : this.month + '',
                year: this.year,
                userType: this.userType,
                userStatus: this.userStatus,
                personnelNature: this.personnelNature,
                accountNature: this.accountNature,
                insurePolicy: this.insurePolicy,
                orderBy: this.orderBy,
                orderType: this.orderType,
                page: {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                },
                companyId: this.companyId,
                level: this.level,
            };
            data[type] = val;
            this.updateLoadingStatus({isLoading:true});
            socialSecurityApi.findPerformanceList(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.copyTempData = JSON.parse(JSON.stringify(res.data.data.page.list));
                    this.newStaffNums = res.data.data.newCount;
                    const rdata = res.data.data.page;
                    this.pageNo = rdata.pageNo;
                    this.pageSize = rdata.pageSize;
                    this.pageCount = rdata.pageCount;
                    this.count = rdata.count;
                    this.largeTable.tableData = rdata.list;
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        /*
        * 分页
        */
        onclickPageNoChange(val) {
            this.pageNo = val;
            this.findPerformanceList();
        },
        onclickPageSizeChange(val) {
            this.pageSize = val;
            this.findPerformanceList();
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
        * 保存数据 (暂时不做)
        */
        savePerformance(datas) {
            const data = {
                id: "",
                performanceMap: {}
            };
        },
        /*
        * 更新数据 信息更正
        */
        updatePerformance(datas) {
            const tempData = JSON.parse(JSON.stringify(this.editData));
            delete tempData._id;
            const data = {
                month: tempData.month,
                userId: tempData.userId,
                year: tempData.year,
                performanceMap: tempData,
                effectDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
                isTimeEffect: '0',
            };
            this.updateLoadingStatus({isLoading:true});
            socialSecurityApi.updatePerformance(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.saveHistoryLog();
                    this.editData = null;
                    this.editModal = false;
                    this.$Message.success(res.data.message);
                }
            }).catch(errors.call(this)).finally(() => this.updateLoadingStatus({isLoading:false}));
        },
        /*
        * 保存历史记录
        */
        saveHistoryLog() {
            let contentData = '';
            let fixPro = '';
            const tempDatas = JSON.parse(JSON.stringify(this.editData));
            const cuscode = this.largeTable.tableData[this.indexs].userNo;
            Object.keys(tempDatas).forEach(key => {
                if ((this.copyTempData[this.indexs][key] != tempDatas[key]) && key.startsWith('_') === false) {
                    console.log(tempDatas, key);
                    this.typeDict.forEach(item => {
                        if (key === 'insurePolicy') {
                            if ('CBZC_WxQUv3Lm' === item.colKey) { // 字典映射
                                fixPro = item.name;
                                let from, to = '';
                                this.zhengceLists.forEach(item => {
                                    if (item.value == this.copyTempData[this.indexs][key]) from = item.label === undefined ? '空' : item.label;
                                    if (item.value == tempDatas[key]) to = item.label;
                                });
                                contentData += `<p>修改<span style="color: #44bcb7;">员工编号为 ${cuscode} </span>的${fixPro}，由 ${from} 改为 ${to}。<p>`;
                            }
                        }
                        if (key === item.colKey) {
                            fixPro = item.name;
                            contentData += `<p>修改<span style="color: #44bcb7;">员工编号为 ${cuscode} </span>的${fixPro}，由 ${this.copyTempData[this.indexs][key] === undefined ? '空' : this.copyTempData[this.indexs][key]} 改为 ${tempDatas[key]}。<p>`;
                        }
                    });
                }
            });
            contentData = `<li>${contentData}<p>操作人： ${this.userInfo.name}</p></li>`
            const data = {
                content: contentData,
                userId: this.userInfo.id,
                type: '15',
            };
            salHistoryLog.save(data).then(valid.call(this)).then(res => {
                this.findPerformanceList();
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
                type: '15',
            };
            salHistoryLog.list(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.historyList = res.data.data.list;
                }
            }).then(errors.call(this)).finally(() => {});
        },

        /*
        * rule 列表获取
        */
        getRuleListPage() {
            const data = {
                type: 1,
                name: null,
                pageNum: 1,
                pageSize: 10000,
                showType: null,
                projectType: null,
                isMath: null,
                isUse: null,
            };
            salaryManageApi.salaryManageListPage(data).then(valid.call(this)).then(res => {
                this.typeDict = res.data.data.list;
            }).catch(errors.call(this)).finally(() => {});
        },
        /*
        * 查字典
        */
        getCityList() {
            const data = { type: 'sal_user_basic_info_insure_policy', };
            sys.dictListData(data).then(valid.call(this)).then(res => {
                if (res.ok) this.zhengceLists = res.data.data
            }).then(errors.call(this)).finally(() => {});
        },
        goSocialSecurityRule() {
            // 跳转到规则设置
            this.$router.push({
				name: 'salary.socialSecurityRule',
			});
        }
    }
}
</script>


