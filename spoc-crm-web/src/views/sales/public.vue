<style lang="less">
.public-container{
    border-top: 1px solid #e0e0e0;
    margin-bottom: 88px;
    .ivu-table th {
        background: #fff;
    }
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table:after {
        display: none;
    }
    .filter{
        margin-bottom: 4px;
        .titleBar{
            span{
                margin: 4px;
                &:first-child{
                    float: left;text-align: right !important;width: 70px !important;
                    margin: 0;line-height: 30px; margin-right: 7px !important;
                }
            }
        }
    }
    .search-data{
        position: relative;padding-left: 77px;zoom: 1;width: 860px;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .title{
            width: 70px;position: absolute;left: 0;top: 0;line-height: 30px;
            color: #b8b8b8;text-align: right;
        }
        li,.more{
            float: left;padding: 5px 12px;cursor: pointer;margin:3px;line-height: 1;
            &.active{
                background: #44bcb6;color: #fff;
            }
        }
    }
    .case-manage-timePicker {
        float: left;
        .case-manage-line-div {
            display: inline-block;
            width: 10px;
            height: 2px;
            background-color: #44bcb7
        }
    }
    .ivu-date-picker.error{
        .ivu-input{
            border-color: #f00;
        }
    }
    .count{
        position: relative;top: 6px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
    .btn-lists-div{
        @h:40px;
        @radius: 1px;
        position: relative;
        height: @h;line-height: @h;padding-left: 21px;margin-top: 22px;
        border: 1px solid #e0e0e0;border-radius: @radius;
        font-size: 14px;color: #666;
        background: #fafafa;
        &:before{
            @border-width: -1px;
            content: "";
            position: absolute;left: @border-width;top: @border-width;bottom: @border-width;
            width: 5px;
            border-top-left-radius: @radius;
            border-bottom-left-radius: @radius;
            background: #44bcb7;
        }
        .qdButton{
            position: absolute;
            margin-top: -2px;
            top: 0;
            right: 20px;
        }
    }
    .btn-lists{
        float: right;
        .ivu-btn{
            float: left;padding-top: 3px;padding-bottom: 3px;
            margin-right: 19px;margin-top: 4px;font-size: 14px;
        }
    }
    .page-box{
        margin-top: 20px;
		text-align: center;
    }
    .urgent-flag{
        padding: 7px 16px 3px;
        &:after{
            content:'掉';
            position: absolute;right: 0;top: 4px;line-height: 1;
            color: #f00;font-size: 12px;
        }
    }
}
</style>

<template>
    <div class="public-container">
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="请输入客户姓名/编号"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <case-bar-filter @tagListChange="tagListChange" modelName="客户模块" :menuId="pid" title="标签：" :from="2" class="filter">></case-bar-filter>
        <time-optpons ref="timeTem" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange" :width="70"></time-optpons>
        <div class="search-data">
            <span class="title">分公司：</span>
            <ul>
                <li :class="[!branchOfficeChecked ? 'active' : '']" @click="changeBranchOffice()">不限</li>
                <li v-for="item in branchOfficelists" :key="item.id" @click="changeBranchOffice(item)"
                    :class="{ active: branchOfficeChecked === item.id}" >{{ item.remarks }}</li>
            </ul>
        </div>
  <!--       <div class="search-data">
            <span class="title">入库时间</span>
            <ul>
                <li :class="[!dataChecked ? 'active' : '']" @click="changeData()">不限</li>
                <li v-for="item in datalists" :key="item.id" 
                    @click="changeData(item)"
                    :class="{active:dataChecked === item.id}">{{ item.data }}</li>
            </ul>
            <div class="case-manage-timePicker">
                <DatePicker type="date"
                    placeholder="开始日期" 
                    style="width: 120px"
                    v-model="beginData"
                    @on-change="beginDateChange">
                </DatePicker>
                <div class="case-manage-line-div"></div>
                <DatePicker type="date"
                    placeholder="结束日期"  
                    style="width: 120px" 
                     v-model="endData"
                    :class="{error: endDataError}"
                    @on-change="endDateChange">
                </DatePicker>
            </div>
        </div> -->
        <div class="count">共找到  <span>{{ count }}</span> 条数据</div>
        <div class="btn-lists-div">
            <span>客户列表</span>
            <div class="qdButton">
                <Button  type="primary" @click="tmkBatchLock" v-show="isTMKLeader || isTMK">批量抢单</Button>
            </div>
        </div>
        <Table :columns="columns1"  :loading="loading" :data="data1" 
            @on-row-click="onRowClick" @on-sort-change="sortChange" 
            @on-filter-change="filterChange"
            @on-selection-change="selectionChange"
            ></Table>
        <div class="page-box">
            <Page  
                show-total  
                show-elevator 
                show-sizer 
                :total="count"
                :current="pageNo"
                :page-size="pageSize" 
                @on-page-size-change="pageSizeChange"
                @on-change="onPageChange"></Page>
        </div>
    </div>
</template>

<script>

import vSelect from '@public/modules/vSelect';
import CaseBarFilter from '@public/modules/caseBarFilter';
import timeOptpons from "../../modules/timeOptpons.vue";
import valid, {errors, common, sys, crmCustomerPub} from "../../libs/request";
import { mapState, mapGetters, } from "vuex";

export default {
    props: {
        pid: {
            required: true
        }
    },
    data(){
        let _this = this
        return {
            btnList: [
                {
                    text: '批量抢单',
					type: 'primary',
                },
            ],
            loading: true,
            signTime: {
                title: '入库时间',
                list: [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '今天',
                        value: 0
                    },
                    {
                        label: '最近7天',
                        value: -7
                    },
                    {
                        label: '最近30天',
                        value: -30
                    },
                ]
            },
            showModal: false,
            tags: [],
            columns1: [
                {
                    title: '编号',
                    key: 'cusCode',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', 
                            {
                                class: {
                                    "urgent-flag":params.row.source =='自动掉落'
                                },
                                style: {
                                    position: 'relative',
                                    color:'#41b3ae',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                    /*     this.$router.push({
                                            name: 'crm.detail',
                                            query: {
                                                id: params.row.cusId,
                                                from:'public'
                                            }
                                        }) */
                                        const {href} = this.$router.resolve({
                                                name: 'crm.detail',
                                                query: {
                                                    id: params.row.cusId,
                                                    from:'public'
                                                }
                                            })
                                        window.open(href, '_blank')
                                    }
                                }
                            },
                            params.row.cusCode ? parseInt(params.row.cusCode) : ''
                        )
                    }
                },
                {
                    title: '客户姓名',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '分公司',
                    key: 'firstOfficeName',
                    align: 'center',
                },
                {
                    title: '跟进人',
                    key: 'firstUserName',
                    align: 'center',
                    /* filters: [
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                    } */
                },
                {
                    title: '入库时间',
                    key: 'time',
                    align: 'center',
                    sortable: 'custom'
                },
                {
                    title: '掉落方式',
                    key: 'source',
                    align: 'center',
                    filters: [
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                    }
                },
                {
                    title: '来源',
                    key: 'cusSource',
                    align: 'center',
                    filters: [
                        {
                            label: '客服录入',
                            value: 'A'
                        },
                        {
                            label: '市场录入',
                            value: 'B'
                        },
                        {
                            label: 'TMK录入',
                            value: 'C'
                        },
                        {
                            label: 'TMK激活',
                            value: 'D'
                        }
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h("div", [
                            h("span", {
                                style:{
                                    cursor:'pointer',
                                    //color:  (_this.userInfo.companyIsUs != '1' &&  params.row.lockFlag == 0) ? '#41b3ae': '#b8b8b8'
                                    color:  (params.row.lockFlag == 0) ? '#41b3ae': '#b8b8b8'
                                },
                                on: {
                                    'click': (event) => {
                                        //if(_this.userInfo.companyIsUs != '1'  &&  params.row.lockFlag == 0) {
                                        if(params.row.lockFlag == 0) {
                                            this.showResult(params.row.cusId,params.row.id);
                                            event.stopPropagation()
                                        }
                                    }
                                }
                            }, '抢单')
                        ])
                    }
                },
            ],
            data1: [
               
            ],
            count: 0,
            pageNo: 1,
            pageCount: 98,
            pageSize: 10,
            compact: '',
            dataChecked: '',
            datalists: [
                {
                    id: '101',
                    data: '今天'
                },
                {
                    id: '102',
                    data: '最近7天'
                },
                {
                    id: '103',
                    data: '最近30天'
                }
            ],
            beginData: '',
            endData: '',
            endDataError: false,
            hisOfficeId: '', //历史跟进人
            source: '', //来源
            sort:'1', //排序
            orderBy:'0' ,//排序
            now: '',//今日
            branchOfficeChecked: '',
            branchOfficelists: [],
            selection: [],
            createType: '',
        };
    },
    computed: {
        ...mapState(['userInfo']),
        ...mapGetters('crm', ['isSaler','isTMKLeader','isTMK']),
    },
    components: {
        vSelect, 
        CaseBarFilter,
        timeOptpons
    },
    mounted(){
        this.getFilialeLists();
        this.getNow()
        this.getFilter()
        this.$refs.timeTem.setTime(0)
        let obj=this.$refs.timeTem.setTime(0);
        if(!obj.beforeTime) obj.afterTime = ''
        if(obj.beforeTime == obj.afterTime && obj.beforeTime) {
            let time = new Date(new Date().setDate(new Date(obj.beforeTime).getDate() + 1));
            time.setHours(0);
            time.setMinutes(0);
            time.setSeconds(0);
            obj.afterTime = time.format('yyyy-MM-dd hh:mm:ss')
        }
        this.beginData = obj.beforeTime
        this.endData = obj.afterTime
        this.getLists()
    },
    created(){
        
    },
    methods: {
        timeChange(start, end) {
            if(!start) end = ''
            if(start == end && start) {
                let time = new Date(new Date().setDate(new Date(start).getDate() + 1));
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				end = time.format('yyyy-MM-dd hh:mm:ss')
            }
            this.beginData = start
            this.endData = end
            this.pageNo = 1
            this.getLists()
        },
        onDataPickStart(start, end) {
            this.beginData = start
            this.endData = end
            this.pageNo = 1
            this.getLists()
        },
        onDataPickEnd(start, end) {
            this.beginData = start
            this.endData = end
            this.pageNo = 1
            this.getLists()
        },
        onRowClick(params){
            /* this.$router.push({
                name: 'crm.detail',
                query: {
                    id: params.cusId,
                    from:'public'
                }
            }) */
        },
        getNow(){
            common.newDate({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.now = new Date(res.data.data.date.substring(0,19))
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        getFilter(){
            //公共库来源
            let obj = {
                types: 'crm_customer_pub_source' 
            }
            sys.batchListData(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    if(!this.isSaler){
                        this.columns1.splice(4,0,
                        {
                            title: '分值',
                            key: 'score',
                            align: 'center',
                            sortable: 'custom'
                        })
                    }
                    if(this.columns1[6].key == 'source'){
                        this.$set(this.columns1[6], 'filters', res.data.data.crm_customer_pub_source) 
                    } else {
                        this.$set(this.columns1[5], 'filters', res.data.data.crm_customer_pub_source) 
                    }
                    if(this.isTMKLeader || this.isTMK){
                        this.columns1.unshift(
                            {
                                type: 'selection',
                                width: 60,
                                align: 'center'
                            }
                        )
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {});

            //获取分公司
            /* sys.controlledList({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    //console.log(res.data.data)
                    let companyArray = []
                    res.data.data.forEach((item,index)=>{
                        companyArray.push({
                            label: item.companyName,
                            value: item.id
                        })
                    })
                    this.$set(this.columns1[2], 'filters', companyArray) 
                }
            })
            .catch(errors.call(this))
            .finally(() => {}); */
        },
        onPageChange(page) {
            this.pageNo = page
            console.log(" this.pageNo = " +  this.pageNo)
            this.getLists();
        },
        pageSizeChange(size){
            this.pageSize = size
            console.log(" this.pageSize = " +  this.pageSize)
            this.getLists();
        },
        filterChange(filterObj){
            console.log( filterObj.key  + '   ' +  filterObj.title + '   ' +  filterObj._filterChecked[0])
            if(filterObj.key == 'cusSource') {
                this.createType  =  filterObj._filterChecked[0] ? filterObj._filterChecked[0] : ""
            } else if(filterObj.key == 'hisName') {
                this.hisOfficeId  =  filterObj._filterChecked[0] ? filterObj._filterChecked[0] : ""
            } else {
                this.source = filterObj._filterChecked[0] ? filterObj._filterChecked[0] : ""
            }
            this.getLists();
        },
        selectionChange(selection){
            this.selection = selection
        },
        tmkBatchLock(){
            if(!this.selection.length){
                this.$Message.error('请选择数据');
                return false;
            }
            let data = []
            this.selection.forEach(item =>{
                data.push({
                    "id": item.id,
                    "cusId": item.cusId,
                    "cusCode": item.cusCode
                })
            })

             crmCustomerPub.tmkBatchLock(data).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                   this.$Message.success(res.data.message);
                   this.getLists()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        sortChange(sortObj){
            /* {key: "score", order: "asc"}
            {key: "score", order: "desc"}
            {key: "score", order: "normal"} */
            console.log(sortObj)
            if(sortObj.key == 'score') {
                this.orderBy = 0 
            } else {
                this.orderBy = 1
            }
            this.sort = ((sortObj.order == 'asc' || sortObj.order =='normal') ? 0 : 1)
            this.getLists();
        },
        ok() {
            this.getLists()
        },
        instance(type, content) {
            this.$Modal[type]({
                title: '抢单结果',
                content: '<p>' + content + '</p>',
                onOk: this.ok,
                width:300,
            });
        },
        showResult(cuseid,id) {
            crmCustomerPub.lock({cusId:cuseid,id:id}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    if(res.data.message == '抢单成功') {
                        this.instance('success', res.data.message)
                    } else {
                        this.instance('error', res.data.message)
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        getLists() {
            let startTime = typeof(this.beginData) =="string" ? this.beginData : this.beginData.format('yyyy-MM-dd')
            let endTime = typeof(this.endData) =="string" ? this.endData : this.endData.format('yyyy-MM-dd')
            console.log(startTime + ' ' + endTime)
            let obj = {
                os: 0,
                name: this.compact,
                startTime: startTime,
                endTime: endTime,
                hisOfficeId: this.hisOfficeId,
                createType: this.createType,
                source: this.source,
                sort: this.sort,
                orderBy: this.orderBy,
                tags: this.tags,
                pageNo: this.pageNo, 
                pageSize: this.pageSize, 
            }
            if(this.branchOfficeChecked) obj.firstOfficeId = this.branchOfficeChecked;
            crmCustomerPub.listPage(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    let q = res.data.data.list
                    q.forEach(item=>{
                        if(item.lockFlag !== '0') {
                            item._disabled = true
                        }
                    })
                    
                    this.data1 =  q
                    this.count = res.data.data.count
                    this.pageCount = res.data.data.pageCount
                    this.loading = false
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        textChange() {
            // 搜索
            console.log(this.compact)
            this.getLists();
        },
        tagListChange(tags) {
            // 选择标签
            console.log(tags)
            let args= [];
            tags.forEach((item, index)=>{
                let newArgs = []
                item.childTags.forEach((childrenItem,childIndex)=>{
                    newArgs.push(childrenItem.id)
                })
                args.push(newArgs)
            })
            this.tags = args
            this.pageNo  = 1
            this.getLists();
        },
        changeData(data) {
            if(data){
                this.dataChecked = data.id;
                this.endData = this.now.format('yyyy-MM-dd')
                let day = 24*60*60*1000 //一天的毫秒数
                if(data.id == 101){//今天
                    this.beginData = this.endData
                }
                if(data.id == 102){//7天
                    let startTime = new Date(this.now.getTime() - day * 7)
                    this.beginData = startTime.format('yyyy-MM-dd')
                }
                if(data.id == 103){//30天
                    let startTime = new Date(this.now.getTime() - day * 30)
                    this.beginData = startTime.format('yyyy-MM-dd')
                }
                this.pageNo  = 1
                this.getLists()
            } else {
                this.dataChecked = '';
                this.beginData = ''
                this.endData = ''
                this.pageNo  = 1
                this.getLists()
            }
        },
        beginDateChange(data) {
            // 开始时间
            this.dataChecked = '';
            this.getLists()
        },
        endDateChange(data) {
            this.dataChecked = '';
            // 结束时间
            if(this.beginData) {
                let start = Date.parse(this.beginData)
                let end = Date.parse(data)
                if(end < start) {
                    this.endDataError = true
                    this.$Message.error('结束时间必须大于开始时间')
                } else {
                    this.endDataError = false
                    this.getLists()
                }
            } else {
                this.getLists()
            }
        },
         getFilialeLists() {
            // 获取分公司列表
            let data = {
                grade: 2,
                types: '1,3'
            }
            sys.officeList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.branchOfficelists = res.data.data.allCompany;
                }
            }).catch(errors.call(this));
            // sys.officeFindCompanyList().then(valid.call(this)).then(res => {
            //     if(res.ok) {
            //         this.branchOfficelists = res.data.data;
            //     }
            // }).catch(errors.call(this));
        },
        changeBranchOffice(obj) {
            // 分公司选择
            if(obj) {
                this.branchOfficeChecked = obj.id;
            }else{
                this.branchOfficeChecked = '';
            }
            this.getLists();
        },
        datafunc() {
           return new Promise((resolve, reject) => {});
        }
    }
}
</script>


