<style lang="less">
.resource-import-container{
    padding-top: 30px;border-top: 1px solid #e0e0e0;
    .case-manage-timePicker {
        float: left;
        .case-manage-line-div {
            display: inline-block;
            width: 10px;
            height: 2px;
            background-color: #44bcb7
        }
    }
    .import-item{
        padding-left: 102px;position: relative;min-height: 52px;padding-bottom: 20px;
    }
    .title{
        position: absolute;top: 0;width: 102px;height: 32px;line-height: 32px;left: 0;
        text-align: right;
        &.must{
            &::before{
                content: "*";
                display: inline-block;
                margin-right: 4px;
                line-height: 1;
                font-family: SimSun;
                font-size: 12px;
                color: #ed3f14;
            }
        }
    }
    .ivu-select{
        width: 230px !important;margin-right: 20px;
    }
    .ivu-select-selection .ivu-select-arrow:nth-of-type(1){
        display: block;
    }
    .place-detail{
        width: 737px;margin-top: 20px;
    }
    .textarea{
        width: 737px;
    }
    .ivu-radio-wrapper{
        margin-top: 7px;margin-right: 40px;
    }
    .buttons{
        .ivu-btn{
            margin-right: 20px;width: 93px;
        }
    }
    .error {
        .ivu-input,.ivu-select-selection{
            border-color: #f00;
        }
    }
    .file-name{
        display: inline-block;margin-left: 5px;
        .ivu-icon{
            cursor: pointer;margin-left: 4px;position: relative;top: 1px;font-size: 14px;
            &:hover{
                color: #f00;
            }
        }
    }
}
</style>
    
<template>
<div class="resource-import-container">
    <div class="import-item">
        <div class="title"><span>选择来源：</span></div>
        <Select v-model="source" @on-change="changeSource" :disabled="isEdit">
            <Option v-for="item in sourceList" :value="item.value" :key="'source' + item.value">{{ item.label }}</Option>
        </Select>
    </div>
    <template v-if="source == 'schd'">
        <!-- 市场活动 start -->
        <div class="import-item">
            <div class="title must"><span>活动名称：</span></div>
            <Input :class="{error: error1.name}" @on-blur="checkedParams(params1, error1, [], 'name')" v-model="params1.name" style="width: 230px"/>
        </div>
        <div class="import-item">
            <div class="title must"><span>活动类型：</span></div>
            <Select v-model="params1.type" @on-change="changeType">
                <Option v-for="item in typeFirstList" :value="item.value" :key="'typeFirst' + item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="params1.subType" :class="{error: error1.subType}" @on-change="checkedParamsType">
                <Option v-for="item in typeLastList" :value="item.value" :key="'typeLast' + item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="import-item">
            <div class="title must"><span>活动时间：</span></div>
            <div class="case-manage-timePicker">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                    placeholder="开始日期" 
                    style="width: 200px"
                    :value="params1.beginDate"
                    :class="{error: error1.beginDate}"
                    @on-change="beginDateChange">
                </DatePicker>
                <div class="case-manage-line-div"></div>
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                    placeholder="结束日期"  
                    style="width: 200px" 
                    :value="params1.endDate"
                    :class="{error: error1.endDate}"
                    @on-change="endDateChange">
                </DatePicker>
            </div>
        </div>
        <div class="import-item">
            <div class="title"><span>活动地点：</span></div>
            <div class="place-select">
                <cityarea ref="city" :cou.sync="params1.country" :pro.sync="params1.province" :ci.sync="params1.city"/>
            </div>
            <Input v-model="params1.address" class="place-detail" placeholder="输入具体地址"/>
        </div>
        <div class="import-item">
            <div class="title must"><span>活动支出：</span></div>
            <Input @on-blur="checkedParams(params1, error1, [], 'cost', true)" :class="{error: error1.cost}" v-model="params1.cost" style="width: 230px"/>
            <span>元</span>
        </div>
        <!-- 市场活动 end -->
    </template>
    <template v-if="source == 'qddl'">
        <!-- 渠道代理 start -->
        <div class="import-item">
            <div class="title must"><span>代理名称：</span></div>
            <Select :disabled="isEdit" filterable v-model="params2.name" :class="{error: error2.name}" @on-change="checkedParamsName" v-show="!showAddAgent" placeholder="请选择代理名称">
                <Option v-for="item in agentLists" :key="'agent' + item" :value="item">{{ item }}</Option>
            </Select>
            <Input v-show="showAddAgent" @on-blur="checkNewName" :class="{error: error2.name}" v-model="newName" style="width: 230px;margin-right: 20px;"/>
            <Button type="primary" v-if="!isEdit" v-text="btnText" @click="addAgentLists"></Button>
        </div>
        <div class="import-item">
            <div class="title must"><span>代理类型：</span></div>
            <RadioGroup v-model="params2.type">
                <Radio v-for="item in agentTypeLists" :key="'agentType' + item.id" :label="item.value">{{ item.label }}</Radio>
            </RadioGroup>
        </div>
        <div class="import-item">
            <div class="title must"><span>分成比例：</span></div>
            <Input @on-blur="checkedParams(params2, error2, [], 'profitRatio', true)" :class="{error: error2.profitRatio}" v-model="params2.profitRatio" style="width: 230px"/>
            <span>%</span>
        </div>
        <div class="import-item">
            <div class="title"><span>渠道费用：</span></div>
            <Input v-model="params2.cost" style="width: 230px"/>
            <span>元</span>
        </div>
        <div class="import-item">
            <div class="title"><span>合同/协议：</span></div>
            <Button type="primary" @click="uploadFile()">点击上传</Button>
            <div class="file-name" v-show="fileName != ''">{{ fileName }} <Icon type="close-circled" @click="delFile"></Icon></div>
        </div>
        <!-- 渠道代理 end -->
    </template>
    <template v-if="source == 'sjzj'">
        <!-- 数据资源 start -->
        <div class="import-item">
            <div class="title must"><span>名称：</span></div>
            <Input @on-blur="checkedParams(params3, error3, [], 'name')" :class="{error: error3.name}" v-model="params3.name" style="width: 230px"/>
        </div>
        <div class="import-item">
            <div class="title must"><span>客户来源：</span></div>
            <Select v-model="params3.customerSource" @on-change="changeKhly" :class="{error: error3.customerSource}">
                <Option v-for="item in khlyList" :value="item.name" :key="'khly' + item.id">{{ item.name }}</Option>
            </Select>
        </div>
        <div class="import-item">
            <div class="title must"><span>费用：</span></div>
            <Input @on-blur="checkedParams(params3, error3, [], 'cost', true)" :class="{error: error3.cost}" v-model="params3.cost" style="width: 230px"/>
            <span>元</span>
        </div>
        <!-- 数据资源 end -->
    </template>
    <div class="import-item">
        <div class="title"><span>备注：</span></div>
        <Input v-model="remarks" class="textarea" type="textarea" :rows="row"/>
    </div>
    <div class="import-item">
        <div class="title must"><span>入库：</span></div>
        <div v-if="isTmk">
            <Select v-model="direct" style="width:200px">
                <Option v-for="item in radioLists" v-if="item.value == 'tmk'" :value="item.value" :key="'radio-' + item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div v-else>
            <Select v-model="direct" style="width:200px">
                <Option v-for="item in radioLists" :value="item.value" :key="'radio' + item.value">{{ item.label }}</Option>
            </Select>
            <Select :class="{error: companyModalError}" :disabled="!companyListEdit" v-model="companyModal" style="width:200px" v-if="direct == 'office'">
                <Option v-for="item in companyList" :value="item.id" :key="'company' + item.id">{{ item.companyName }}</Option>
            </Select>
        </div>
    </div>
    <div class="import-item">
        <div class="title must"><span>添加客户：</span></div>
        <div class="buttons">
            <Button type="primary" @click="save(1)">批量导入</Button>
            <Button type="primary" @click="save(2)">手动导入</Button>
        </div>
    </div>
    <up-to-pan ref="uptopan" :object-id="groupId"
        :dir="uploadToPanDir" dirName="business" :type="'import_channel'"
        fileType="all" @uploadok="handleSuccess"/>
    <Modal v-model="submitModal" title="提示" @on-ok="submitImport" width='600' class="model-resource-edit">
        <p>资源即将提交到{{ submitModalTitle }}，请确认是否提交</p>
    </Modal>
</div>
</template>

<script>

import {mapMutations,mapState} from 'vuex';
import valid, {errors, crmCustomer, crmCustomerImport, crmChannel, sys, common} from '../../libs/request.js';
import upToPan from '../../modules/crmUpToPan'
import cityarea from '../../modules/cityarea';

export default {
    props: {
        formId: {
            required: false,
            type: String
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            submitModalTitle: '',
            submitModal: false,
            companyModal: '',//分公司modal
            companyListEdit: true,//分公司是否能修改
            companyList: [],//分公司列表
            source: 'schd', //来源
            sourceList: [],//来源lists
            typeFirstList: [],
            typeLastList: [],
            startDataError: false, //开始日期错误标识
            endDateError: false, //结束日期错误标识
            cityTree: {
                country:[],
                province:[],
                city:[],
            },
            remarks: '', //备注
            row: 5, //textarea行数
            direct: '1', //入库
            radioLists: [],
            agentSelect: '', //代理名称
            agentLists: [],
            btnText: '添加代理',
            showAddAgent: false, //true显示添加代理，false显示下拉框
            agentTypeLists: [],
            marketDtartDataError: false, //市场促签-开始日期错误标识
            marketEndDataError: false, //市场促签-结束日期错误标识
            marketTree: {
                country:[],
                province:[],
                city:[],
            },
            params: {},
            params1: {},
            params2: {},
            params3: {},
            typeLists: {},
            error1:{
                name: !true,
                subType: !true,
                beginDate: !true,
                endDate: !true,
                cost: !true,
            },
            error2:{
                name: !true,
                profitRatio: !true,
            },
            error3:{
                name: !true,//数据资源名称
                cost: !true,//数据资源费用
                customerSource: !true,//客户来源
            },
            errorNum1: 0,
            patrn: /^\d+(\.\d+)?$/,
            groupId: '',
            uploadToPanDir: '',
            uploadToPanType: '',
            fileName: '',
            isEdit: false,
            id: '',
            agentObj: {},
            userCompanyInfo: {},
            officeId: '',
            khlyList: [], // 客户来源list
            newName: '',
            companyModalError: false,
            isTmk: false,
        };
    },
    computed: {
        ...mapState(['userInfo']),
    },
    created() {
         this.getDictType();
         this.getOfficeFindCompanyList();
         if(this.userInfo.roleId) {
            let roleLists = this.userInfo.roleId.split(',');
            if(roleLists.indexOf('904') != -1 || roleLists.indexOf('908') != -1) {
                // 904 - TMK
                // 908 - TMK主管
                this.isTmk = true;
            }
        }
    },
    mounted(){
        this.getUserCompanyInfo();
        this.getType();
        this.resetdata();
        if(this.formId) {
            // 编辑
            this.getForm();
            this.isEdit = true;
        }
        this.getAgentKeys();
    },
    components: {
        upToPan, cityarea
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getUserCompanyInfo() {
            // 查询当前操作人员所属公司信息
            crmCustomerImport.getUserCompanyInfo().then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.userCompanyInfo = data;
                    if(data.isJT === '0') {
                        // 分公司的人
                        if(data.id == '173' || data.id == '174') {
                            // 北东北西北东北西
                            this.companyList = [
                                {
                                    companyName: '北京西部办公室',
                                    id: '174'
                                },
                                {
                                    companyName: '北京东部办公室',
                                    id: '173'
                                },
                            ]
                        }else{
                            this.companyListEdit = false;
                            this.companyModal = data.id;
                            this.officeId = data.id;
                        }
                    }
				}
			}).catch(errors.call(this)).finally();
        },
        getOfficeFindCompanyList() {
            // 获取分公司
            sys.officeFindCompanyList().then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.companyList = res.data.data;
				}
			}).catch(errors.call(this)).finally();
        },
        getDictType() {
            let obj = {
                type: 'crm_source_type',
            }
            sys.dictListData(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.sourceList = res.data.data
				}
			}).catch(errors.call(this)).finally();
        },

        getForm() {
            // 编辑时，获取信息
            let params = {
                id: this.formId
            }
            crmCustomerImport.form(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    let params = this.params1;
                    let detail = data.activity;
                    this.id = data.id;

                    this.source = data.sourceType;
                    if(data.sourceType == 'schd') {
                        this.params1 = data.activity;
                        
                        params.direct = detail.direct;
                        this.$refs['city'].setAds(this.params1.country,this.params1.province,this.params1.city);
                    } else if(data.sourceType == 'qddl') {
                        this.params2 = data.channel;
                        this.params2.sourceType = data.sourceType;
                        let arr = data.channel.url.split('/');
                        let child = arr[arr.length - 1].split('.');
                        this.fileName = child[0] + '.' + child[2];
                        if(child.length > 2) {
                            this.fileName = child[0] + '.' + child[2];
                        }else{
                            this.fileName = arr[arr.length - 1];
                        }
                        params = this.params2;
                        detail = data.channel;
                        params.direct = data.direct;
                        params.officeId = data.direct;
                    } else if(data.sourceType == 'sjzj') {
                        params.direct = detail.direct;
                        this.params3 = data.activity;
                        params = this.params3;
                        this.getKhlyLists(data.activity.customerSource);
                        this.params3.customerSource = '';
                    }
                    if(data.officeId) this.companyModal = data.officeId;
                    params.remarks = detail.remarks;
                    this.direct = detail.direct;
                    this.remarks = detail.remarks;
                    this.submitModalTitle = data.directName;
                }
            }).catch(errors.call(this));
        },
        getType() {
            // 获取活动类型第一个选项
            let params = {
                types: 'crm_activity_type,crm_activity_type_online,crm_activity_type_offline,crm_customer_import_direct,crm_channel_type'
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.typeLists = res.data.data;
                    this.typeFirstList = this.typeLists.crm_activity_type;
                    this.params1.type = this.typeFirstList[0].value;
                    this.radioLists = this.typeLists.crm_customer_import_direct;
                    this.direct = this.radioLists[0].value;
                    this.agentTypeLists = this.typeLists.crm_channel_type;
                    this.params2.type = this.agentTypeLists[0].value;
                    this.changeType(this.typeFirstList[0].value);
                }
            }).catch(errors.call(this));
        },
        resetdata() {
            // 重置
            this.params1 = { //市场活动
                name: '',//活动名称
                type: '', //活到类型
                subType: '',
                beginDate: '', //开始日期
                endDate: '', //结束日期
                country: '',//活动地点
                province: '',
                city: '',
                address: '',
                cost: 0, //活动支出
                sourceType: 'schd'
            }
            this.params2 = { //渠道代理
                sourceType: 'qddl',
                sourceId: '',
                name: '',
                type: '', //代理类型
                profitRatio: '', //分成比例
                cost: 0, //渠道费用
                fileId: '', //云盘文件id
                url: '', //协议地址
            }
            this.params3 = { //数据资源
                sourceType: 'sjzj',
                name: '',
                cost: 0,
                customerSource: ''
            }
            if(this.companyListEdit) {
                // 总公司的人，分公司置空
                this.companyModal = '';
            }
        },
        changeSource(item) {
            // 切换来源tab
            // this.resetdata();
            this.companyModalError = false;
            if(item == 'sjzj') {
                this.getKhlyLists();
            }
        },
        getKhlyLists(str) {
            // 获取客户来源
            let params = {
                parent: '8007'
            }
            common.listData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data
                    this.khlyList = data;
                    if(str) this.params3.customerSource = str;
                }
            }).catch(errors.call(this));
        },
        changeKhly(item) {
            // 修改客户来源
            // console.log(item);
            // !!!
            this.checkedParams(this.params3, this.error3, [], 'customerSource')
        },
        changeType(item) {
            // 选择活动类型 -- 线上活动、线下活动
            if(item == 'crm_activity_type_online') {
                // 线上活动
                this.typeLastList = this.typeLists.crm_activity_type_online;
            }else{
                // 线下活动
                this.typeLastList = this.typeLists.crm_activity_type_offline;
            }
        },
        beginDateChange(data) {
            // 开始日期
            if(this.params1.endDate) {
                let start = Date.parse(data);
                let end = Date.parse(this.params1.endDate);
                if(end < start) {
                    this.startDataError = true;
                    this.$Message.error('结束时间必须大于开始时间');
                }else{
                    this.startDataError = false;
                    this.params1.beginDate = data;
                }
            } else {
                this.params1.beginDate = data;
            }
            this.checkedParams(this.params1, this.error1, [], 'beginDate');
        },
        endDateChange(data) {
            // 结束日期
            if(this.params1.beginDate) {
                let start = Date.parse(this.params1.beginDate);
                let end = Date.parse(data);
                if(end < start) {
                    this.endDateError = true;
                    this.$Message.error('结束时间必须大于开始时间');
                }else{
                    this.endDateError = false;
                    this.params1.endDate = data;
                }
            }else{
                this.params1.endDate = data;
            }
            this.checkedParams(this.params1, this.error1, [], 'endDate');
        },
        addAgentLists() {
            // 添加代理、取消添加
            this.params2.name = '';
            if(this.showAddAgent) {
                // 取消添加
                this.btnText = '添加代理';
            }else{
                // 添加代理
                this.btnText = '取消添加';
                this.newName = '';
            }
            this.showAddAgent = !this.showAddAgent;
        },
        save(num) {
            // 保存
            let errorFlag = true;
            // 没有选择子公司
            if(this.direct == 'office' && !this.companyModal) {
                errorFlag = false;
                this.companyModalError = true;
                this.$Message.error('请选择子公司');
            }
            if(this.source == 'schd') { // 市场活动
                this.params1.direct = this.direct;
                this.params1.remarks = this.remarks;
                this.params1.officeId = this.companyModal ? this.companyModal : this.officeId;
                this.params = {
                    officeId: this.companyModal ? this.companyModal : this.officeId,
                    sourceType: this.params1.sourceType,
                    direct: this.params1.direct,
                    status: 0,
                    num: this.count,
                    activity: this.params1,
                }
                this.checkedParams(this.params1, this.error1, ['name','beginDate','endDate','cost','subType']);
                if(errorFlag && !this.error1.name && !this.error1.subType && !this.error1.beginDate && !this.error1.endDate && !this.error1.cost) {
                    this.submit(this.params, num);
                }
            } else if(this.source == 'qddl') {
                // 渠道代理
                this.params2.direct = this.direct;
                this.params2.remarks = this.remarks;
                this.params2.officeId = this.companyModal ? this.companyModal : this.officeId;
                this.params = {
                    officeId: this.companyModal ? this.companyModal : this.officeId,
                    sourceType: this.params2.sourceType,
                    sourceId: this.params2.id,
                    profitRatio: this.params2.profitRatio,
                    cost: this.params2.cost,
                    url: this.params2.url,
                    direct: this.params2.direct,
                    status: 0,
                    num: this.count,
                    channel: this.params2,
                }
                this.checkedParams(this.params2, this.error2, ['name', 'profitRatio']);
                if(errorFlag && !this.error2.name && !this.error2.profitRatio) {
                    this.submit(this.params, num);
                }
            } else if(this.source == 'sjzj') {
                // 数据资源
                this.params3.direct = this.direct;
                this.params3.remarks = this.remarks;
                this.params3.officeId = this.companyModal ? this.companyModal : this.officeId;
                this.params = {
                    officeId: this.companyModal ? this.companyModal : this.officeId,
                    sourceType: this.params3.sourceType,
                    direct: this.params3.direct,
                    status: 0,
                    num: this.count,
                    activity: this.params3,
                }
                this.checkedParams(this.params3, this.error3, ['name', 'cost', 'customerSource']);
                if(errorFlag && !this.error3.name && !this.error3.cost) {
                    this.submit(this.params, num);
                }
            }
        },
        submit(params, num) {
            // 提交表单
            this.updateLoadingStatus({isLoading: true});
            if(this.formId) {
                params.id = this.id;
            }
            let data = JSON.parse(JSON.stringify(params));
            if(data.direct == 'headquarter') {
                data.officeId = null;
            }
            crmCustomerImport.save(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    if(num == 1) {
                        // console.log('批量导入')
                        this.$router.push({
                            name: "crm.importPage",
                            query: {
                                froms: 'CRM',
                                cId: res.data.data.id
                            }
                        });
                    }else if(num == 2){
                        // console.log('手动导入')
                        this.$router.push({
                            name: "crm.entryImport",
                            query: {
                                marketId: res.data.data.id
                            }
                        });
                    }else{
                        this.$router.go(-1);
                    }
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        checkedParamsType(item) {
            // 活动类型
            this.checkedParams(this.params1, this.error1, [], 'subType');
        },
        getAgentKeys() {
            // 获取代理列表
            crmChannel.getChannelNames().then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    this.agentObj = data;
                    let arr = Object.keys(data);
                    if(arr.length > 0) {
                        this.showAddAgent = false;
                        this.agentLists = arr;
                    }else{
                        this.showAddAgent = true;
                    }
                }
            }).catch(errors.call(this));

        },
        checkedParamsName(item) {
            // 选择代理名称
            // console.log(this.agentObj[item]);
            let temp = this.agentObj[item];
            if(temp) {
                // 
                this.params2 = temp;
                this.params2.sourceType = 'qddl';
                this.direct = temp.direct;
                this.remarks = temp.remarks;
                let arr = temp.url.split('/');
                let child = arr[arr.length - 1].split('.');
                if(child.length > 2) {
                    this.fileName = child[0] + '.' + child[2];
                }else{
                    this.fileName = arr[arr.length - 1];
                }
            }
        },
        checkedParams(params, error, lists, item, special) {
            // lists 数组，需要检查的项
            // item 单个检查时需要
            // special 需要验证正则的项
            if(item) {
                if(special) {
                    if(item == 'profitRatio') {
                        // 百分比
                        error[item] = params[item] === '' || (!this.patrn.test(params[item]) && parseInt(params[item]) <= 100) ? true : false;
                    }else{
                        error[item] = params[item] === '' || !this.patrn.test(params[item]) ? true : false;
                    }
                }else{
                    error[item] = params[item] === '' ? true : false;
                }
                return false;
            } else {
                // console.log(lists)
                lists.forEach(list => {
                    error[list] = params[list] === '' ? true : false;
                });
            }
        },
        uploadFile() {
            // 上传
            this.$refs.uptopan.doUpload();
        },
        handleSuccess(response) {
            // 本地上传
            let data = response.data;
            this.params2.fileId = data.fileId;
            this.params2.url = data.filePath + '/' + data.realName;
            let arr = data.realName.split('.');
            this.fileName = arr[0] + '.' + arr[2];
        },
        delFile() {
            // 删除合同
            this.fileName = '',
            this.params2.fileId = '';
            this.params2.url = '';
        },
        openSubmitModal() {
            this.submitModal = true;
        },
        submitImport() {
            // 提交
            this.updateLoadingStatus({isLoading: true});
            let params = {
                id: this.formId
            }
            crmCustomerImport.submitImport(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$router.go(-1);
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        checkNewName() {
            this.params2.name = this.newName;
            this.checkedParams(this.params2, this.error2, [], 'name');
        }
    },
}
</script>


