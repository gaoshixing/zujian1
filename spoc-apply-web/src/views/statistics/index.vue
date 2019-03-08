
<style lang='less'>
    .applyStatisticsGSX {
        p {
            i {
                font-size: 18px;
                color: #44bcb7;
                font-style: normal;
            }
        }
        .search {
            margin: 0 auto;
            width: 396px;
            text-align: center;
        }
        .echarts {
            overflow: hidden;
            margin-top: 28px;
            div {
                float: left;
            }
            p {
                text-align: center;
            }
            .centerL, .left,  .right {
                width: 22%;
            }
            .centerR {
                width: 34%;
            }
        }
        .table {    
            .updataTime {
                color: #b8b8b8;
                display: inline-block;
                text-align: right;
                width: 75px;
                margin-right: 14px;
            }
            .docu-top-area-timing-through {
				width: 14px;
                height: 4px;
                display: inline-block; 
				margin-top: 14px;				
				background-color: #44bcb7;
            }
            .page {
                text-align: center;
                margin-top: 20px;
            }
        }
        .cancleBorder {
            .ivu-table-wrapper {
                border: none;
            }
            .ivu-table:after {
                content: '';
                width: 0px;
                
            }
            .ivu-table-column-center {
                background-color: #fff;
            }
        }
    }

</style>
<template>
    <div class="applyStatisticsGSX">
        <Tabs @on-click="toggleSatus" v-model="tabValue">
			<TabPane label="高中" name="name1"></TabPane>
			<TabPane label="本科" name="name2"></TabPane>
			<TabPane label="研究生" name="name3"></TabPane>
		</Tabs>
        <p style="text-align:center;margin-top:10px">累计收到 <i>{{dataMain1.stuNum}}</i> 位学生，申请 <i>{{dataMain1.schoolNum}}</i> 所申请学校</p>
        <div class="search">
            <v-select 
                style="width: 396px;margin: 15px 0;"
                placeholder="输入销售顾问姓名"
                :datafunc="datafunc"
                icon="search" 
                v-model="compact"
                k='cnname'
                @on-enter="textChange" 
                @on-click="textChange" 
                @selected="textChange">
            </v-select>
        </div>
        <div class="echarts">
            <div class="left">
                <echart-item :data="data6.option" :mstyle="{width:'250px',height:'250px'}">
                </echart-item>
            </div>
            <div class="centerL">
                <echart-item :data="data7.option" :mstyle="{width:'250px',height:'250px'}">
                </echart-item>
            </div>
            <div class="centerR">
                <echart-item :data="data5.option" :mstyle="{width:'370px',height:'250px'}">
                </echart-item>
            </div>
            <div class="right">
                <echart-item :data="data8.option" :mstyle="{width:'250px',height:'250px'}">
                </echart-item>
            </div>
        </div>
        <div class="table">
            <case-bar1 v-if="isAdmin||isCeo" title="分公司" :isShow='false' :tagList='companyList' @addAcitveCon='addAcitveGroup'  :num='num1' ></case-bar1>
            <case-bar1 v-if="showGroup" title="分组" :tagList='groupList' @addAcitveCon='addAcitveGroup1' key1='name' :num='num2'></case-bar1>
            <case-bar1 v-if="showGroup" title="申请顾问" :tagList='applyList' @addAcitveCon='addAcitveGroup2' key1='name'  :num='num3'></case-bar1>
            <case-bar1 title="完成状态" :isShow='false' :tagList='statusList' @addAcitveCon='addAcitveGroup3' key1='name'  :num='num4'></case-bar1>
            <span class="updataTime">更新时间：</span>
            <DatePicker type="month" placeholder="开始时间" style="width: 110px" @on-change="onchangeBDate"></DatePicker>
			<span class="docu-top-area-timing-through"></span>
			<DatePicker type="month" placeholder="结束时间" style="width: 110px" @on-change="onchangeEDate"></DatePicker>
            <p style="line-height:40px">为您找到： <i>{{data.stuNum}}</i> 位学生， <i>{{data.schoolNum}}</i> 所申请学校</p>
            <v-title
                title="统计数据-列表"
            >
            </v-title>
            <div class="cancleBorder">
                <Table :columns="columns" :data="data.list.list"  @on-filter-change="filterChange"></Table>
            </div>
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import vSelect from '@public/modules/vSelect'
    import echartItem from './echartItem'
    import caseBar1 from '@public/modules/caseBar1'
    import vTitle from "@public/modules/vTitle";
    import valid, { errors, common, sys, STATISTICS } from "../../libs/request";
    import {mapMutations,mapState,mapGetters} from 'vuex';

    const color = ['#5a9cd3','#85ca48','#e8722b','#adc2e6','#fdb802','#3967bc','#9a9b9c','#66a041','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

    export default {
        data() {
            return {
                num1: 0,
                num2: 0,
                num3: 0,
                num4: 0,
                comGroupId: '',
                teaId: '',
                pageSize: 10,
                pageNo: 1,
                status: '',
                sort: '',
                orderBy: '',
                endTime: '',
                startTime: '',
                companyList: [],
                companyId: '',
                groupId: '',
                pId: '901',
                applyList: [],
                statusList:[
                    {name: '未结案', id: '0'},
                    {name: '已结案', id: '1'},
                ],
                groupList:[],
                apply: 0,
                pageSize: 10,
                pageNo: 1,
                allStudent: 50,
                allSchool: 100,
                tabValue: 'name1',
                compact: '',
                data: {
                    count: 200,
                    list: [
                    ]
                },
                 columns: [
                    {
                        title: "申请学校",
                        key: "schoolName",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    'click': () => {
                                        const { href } = this.$router.resolve({
                                            name: "apply.applyDetail",
                                        })
                                        window.open(href+'?from=caseManage&choiceId='+params.row.choiceId+'&groupId='+params.row.groupId, '_blank')
                                        // this.$router.push({
                                        //     name: 'apply.applyDetail',
                                        //     query: {   
                                        //         from: 'caseManage',
                                        //         choiceId: params.row.choiceId,
                                        //         groupId: params.row.groupId,
                                        //     }
                                        // })
                                    }
                                }
                            }, params.row.schoolName)
                        }
                    },
                    {
                        title: "专业项目",
                        key: "majorName",
                        align: "center",
                    },
                    {
                        title: "申请学生",
                        key: "studentName",
                        align: "center",
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    'click': () => {
                                        const { href } = this.$router.resolve({
                                            name: "apply.studentDteail",
                                        })
                                        window.open(href+'?menuId=901&studentId='+params.row.studentId, '_blank')
                                        // this.$router.push({
                                        //     name: 'apply.studentDteail',
                                        //     query: {
                                        //         studentId: params.row.studentId,
                                        //         menuId: '901'
                                        //     }
                                        // })
                                    }
                                }
                            }, 
                                params.row.studentName 
                            )
                        }
                    },
                    {
                        title: "准备申请材料",
                        key: "resource",
                        align: "center", 
                        filters: [
                            {
                                label: '待完成',
                                value: '0'
                            },
                            {
                                label: '已完成',
                                value: '1'
                            },
                        ],
                        filterMultiple: false,
                        filterRemote() {
                        },
                        render: (h, params) => {
                            return h('span', {},
                                params.row.applyResStatus == 0 ? '待完成' : '已完成' 
                            )
                        }
                    },
                    {
                        title: "提交申请信息",
                        key: "info",
                        align: "center", 
                        filters: [
                            {
                                label: '待提交',
                                value: '0'
                            },
                            {
                                label: '已提交',
                                value: '1'
                            },
                            {
                                label: '填表中',
                                value: '2'
                            },
                        ],
                        filterMultiple: false,
                        filterRemote() {
                        },
                        render: (h, params) => {
                            return h('span', {},
                                params.row.applyInfoStatus == 0 ? '提交 ' : params.row.applyInfoStatus == 1 ? '填表中' : '已提交' 
                            )
                        }
                    },
                    {
                        title: "确认申请信息",
                        key: "result",
                        align: "center",
                        filters: [],
                        filterMultiple: false,
                        filterRemote() {
                        },
                        render: (h, params) => {
                            return  h('span', {},
                                params.row.applyResultStatus  == '0' ?  '未知' : params.row.applyResultStatus
                            )
                        }
                    },
                    {
                        title: "是否入读",
                        key: "confirm",
                        align: "center",
                        filters: [
                            {
                                label: '未知',
                                value: '0'
                            },
                            {
                                label: '是',
                                value: '1'
                            },
                            {
                                label: '否',
                                value: '2'
                            },
                        ],
                        filterMultiple: false,
                        filterRemote() {
                        },
                        render: (h, params) => {
                            return h('span', {},
                                params.row.applyConfirmStatus == 0 ? '否' : params.row.applyConfirmStatus == 1 ? '是' : '未知' 
                            )
                        }
                    },
                ],
                dataMain1: {
                    resultTags: [
                        {value: 0, name: '全部'},
                    ],
                }
            }
        },

        components: {
            vSelect,
            echartItem,
            caseBar1,
            vTitle
        },

        computed: {
            ...mapGetters('apply', ['isAdmin', 'isAplLeaser', 'isAplManage', 'isCeo']),
            ...mapState(['userInfo']),
            showGroup() {
                if(this.isAdmin || this.isAplManage || this.isCeo) return true
                return false
            },

            data5(){
                let d = this.dataMain1;
                if(d.resultTags.length){
					d = d.resultTags
				} else {
                    d = [{
                        value: 0, name: '全部'
                    }]
                }
                let titles= [];
                let data = d.map(item=>{
                    titles.push(item.name);
                    return {value:item.value,name:item.name};
                });
                const num = data.map(item=>item.value).reduce((a,b)=>a+b/1,0);
                var formatter = (obj)=>{
                    return obj.value;
                }
                let title=`申请结果分布(学校)`;
                const ops = this.makeOption(title,titles,data,{formatter}, 55);  
                return {
                    sum:num,
                    option:ops
                };
            },
            data6() {
                const d = this.dataMain1;
                let data = [{value: d.resSchNum, name: '任务总数'}, {value: d.resSchSubNum, name: '已完成'}];
                let sum = (d.resSchSubNum / d.schoolNum * 100).toFixed(0) + '%'
                if(d.schoolNum == 0) sum = '0%'
                let finish = `学校：${d.resSchSubNum}\n学生：${d.resSchNum}`
                let title= `已准备申请材料(学校)：${sum}`;
                const ops = this.makeOption1(title, data, finish)
                return {option: ops};	
            },
            
            data7() {
                const d = this.dataMain1;
                let data = [{value: d.infoSchNum, name: '任务总数'}, {value: d.infoSchSubNum , name: '已完成'}];
                let sum = (d.infoSchSubNum / d.schoolNum * 100).toFixed(0) + '%'
                if(d.schoolNum == 0) sum = '0%'                
                let finish = `学校：${d.infoSchSubNum}\n学生：${d.infoSchNum}`
                let title= `已提交申请信息(学校)：${sum}`;
                const ops = this.makeOption1(title, data, finish)
                return {option: ops};
            },
            
            data8() {
                const d = this.dataMain1;
                let data = [{value: d.confirmStuNum, name: '任务总数'}, {value: d.confirmStuSubNum, name: '已完成'}];
                let sum = (d.confirmStuSubNum / d.schoolNum * 100).toFixed(0) + '%'                
                if(d.schoolNum == 0) sum = '0%'                
                let finish = `学生：${d.confirmStuNum}`
                let title= `已确认入读信息(学生)：${sum}`;
                const ops = this.makeOption1(title, data, finish)
                return {option: ops};
            },
        },

        mounted() {
            this.getFIlterType()
            // this.getList()
            this.getPicture()
            // this.getControlledList()
            if(this.isAdmin||this.isCeo) {
                this.getControlledList()
            } else if(this.isAplManage) {
                this.getGroupList('isAplManage')
            } else if(this.isAplLeaser) {
                this.getApplyList('isAplManage')
            }else {
                this.getList()
            }
        },

        methods: {  
            getFIlterType() {
                let obj = {
                    type: 'apl_apply_resultt_type'
                }
            sys.dictListData(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.$set(this.columns[5], 'filters', res.data.data)
				}
			}).catch(errors.call(this)).finally();
            },

            getList() {
                let obj = {
                    apply: this.apply,
                    name: this.compact,
                    endTime: this.endTime,
                    startTime: this.startTime,
                    officeId: this.companyId,
                    orderBy: this.orderBy,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    sort: this.sort,
                    status: this.status,
                    comGroupId: this.comGroupId,
                    teaId: this.teaId,
                }
                STATISTICS.getList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.data = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            getPicture() {
                let obj = {
                    apply: this.apply,
                }
                STATISTICS.getPicture(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.dataMain1 = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});

            },

            getControlledList() {
                let obj = {
                    grade: '2'
                }
                sys.officeList(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.companyList = res.data.data.allCompany
                        this.$set(this.companyList, 0, {id: '',
                            remarks: '全部'
                        })
                        this.companyId = ''
                       this.getGroupList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            getGroupList(isAplManage = '') {
                let officeId = ''
                if(isAplManage == 'isAplManage') {
                    officeId = this.userInfo.companyId
                } else {
                    officeId = this.companyId
                }
                let obj = {
                    officeId: officeId,
                    menuId: this.pId //文书模块  701
                }
                common.findGroupNameByMenu(obj).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        res.data.data.unshift(
                            {
                                id: '',
                                name: '全部',
                            }
                        )
                        this.groupList = res.data.data
                        this.comGroupId = res.data.data[0].id
                        if (this.isAplManage) {
                            this.getApplyList('isAplManage')
                            return
                        }
                        this.getApplyList()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },

            getApplyList(isAplManage = '') {
                let officeId = ''
                if(isAplManage == 'isAplManage') {
                    officeId = this.userInfo.companyId
                } else {
                    officeId = this.companyId
                }
                let obj = {
                    menuId: this.pId,
                    officeId: officeId,
                    groupId: this.comGroupId
                }
                common.listByAll(obj).then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.applyList =  res.data.data.reduce((prev, item) => {
                                prev.push(item.user)
                                return prev
                            }, [])
                            this.applyList.unshift({
                                name: '全部',
                                id: ''
                            })
                            this.getList()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            },

            filterChange(val) {
                // console.log(val.key)
                // if(val.key == 'confirm' || val.key == 'info' || val.key == 'resource') {
                //     this.sort = val._filterChecked.length ? val._filterChecked[0] : '';
                // }else {
                this.sort = val._filterChecked.length ? val._filterChecked[0] : '';
                if (!this.sort) {
                    this.orderBy = ''
                }else {
                    this.orderBy = val.key
                }
                // }
               
                // console.log(val)

                // console.log(this.sort)
                this.getList()
            },

            toggleSatus(val) {
                this.apply = val == 'name1' ? 0 : val == 'name2' ? 1 : 2
                this.getList()
                this.getPicture()

            },

            textChange() {

            },

            onchangeBDate(val) {
                this.startTime = val
                this.getList()
            },

            onchangeEDate(val) {
                this.endTime = val
                this.getList()
            },

            addAcitveGroup(id, index) {
                this.companyId = id
                this.num1 = index    
                this.num2 = this.num3 = 0
                this.teaId = this.comGroupId = ''            
                this.getGroupList()
            },

            addAcitveGroup1(id, index) {
                this.comGroupId = id
                this.num2 = index
                this.num3 = 0
                this.teaId = ''  
                this.getApplyList()
            },

            addAcitveGroup2(id, index) {
                this.teaId = id
                this.num3 = index                
                this.getList()
            },

            addAcitveGroup3(id, index) {
                this.status = id
                this.num4 = index
                this.getList()
            },

            onPageSizeChange(val) {
                this.pageSize = val
                this.getList()
            },

            onPageChange(val) {
                this.pageNo = val
                this.getList()
            },


            makeOption1(title, data, finish) {
                let option = {
                    // tooltip: {
                    // 	trigger: 'item',
                    // 	formatter: "{a} <br/>{b}: {c} ({d}%)"
                    // },
                    color,
                    title: {
                        text: title,
                        left: 'center',
                        subtext: finish,
                        itemGap: 95,
                        textStyle:{
                            color:'#333',
                            fontSize:16,
                            fontWeight: 500,
                        },
                        subtextStyle:{
                            color: '#333',
                            fontSize: 14,
                            fontWeight: 500,
                        },
                    },
                    series: [
                        {
                            name:title,
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter:(obj)=>{
                                        return  ``;
                                    }
                                },
                            },
                            data:data
                        }
                    ]
                }
                return option;	
            },

            makeOption(title,titles,data,extra){
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: `申请结果({b})占比:{d}%<br/>申请书(学生): ${this.dataMain1.infoSchNum}<br/>申请结果数: {c}<br/>`
                    },
                        
                    title: {
                        text: title,
                        left: 'center',
                        itemGap: 125,
                        textStyle:{
                            color:'#333',
                            fontSize:16,
                            fontWeight: 500,
                        },
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        top:'bottom',
                        data:titles,
                        type:'scroll',
                        align:'left',
                    },
                    color,
                    series: [
                        {
                            name:title,
                            type:'pie',
                            center: ['42%','50%'],
                            radius: ['0%', '75%'],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inner',
                                    formatter:extra.formatter,
                                },
                            },
                            data:data
                        }
                    ]
                };
                if(extra.grid){
                    option.grid = extra.grid;
                }
                return option;	
            },

            datafunc() {
               return new Promise((resole, reject) => {

                })
            }
        }
    }
</script>

