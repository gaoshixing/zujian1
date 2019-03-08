<template>
    <div class="personStatistics">
        <p class="userInfo">{{userInfo.officeName}}：{{userInfo.userName}}&nbsp;&nbsp;&nbsp;&nbsp; ( {{userInfo.groupName}} )</p>
        <div class="echarts">
            <div class="echartTop">
                <p class="title">{{StatisticsYear}}年度学生服务统计</p>
                <echart-item :data="data1" :mstyle="{width:'900px',height:'400px'}"></echart-item>
                <Select @on-change="selectChange" v-model="StatisticsYear" style="width:100px;height:15px;position:absolute;left:10%;top:27px">
                    <Option v-for="item in timeList" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </div>
            <div class="echartsL">
                <echart-item ref="ec" :data="data5.option" :mstyle="{width:'410px',height:'250px'}"></echart-item>
                <p>
                    <RadioGroup v-model="radioType" @on-change="radioChange">
                        <Radio label="全部"></Radio>
                        <Radio label="服务中"></Radio>
                    </RadioGroup></p>
            </div>
            <div class="echartsR">
                <echart-item :data="data6.option" :mstyle="{width:'400px',height:'250px'}"></echart-item>
            </div>
        </div>
        <div class="filterTable">
            <v-select 
                style="width: 396px;margin: 15px 0;"
                placeholder="输入学生姓名"
                :datafunc="datafunc"
                icon="search" 
                v-model="compact"
                k='cnname'
                @on-enter="textChange" 
                @on-click="textChange" 
                @selected="textChange">
            </v-select>
            <filter-title
                :controlledList ='planStatusList'
                title="中方顾问"
                @getIndex='addAcitve'> 
            </filter-title>
            <statistics-time
                @upDateAnalyseSellDetail="upDateAnalyseSellDetail"
                :statisticsTimeList='statisticsTimeList'
                :isAll='true'
                :currentTime="currentTime"
                @clearStartTime='clearStartTime'
                @clearEndTime='clearEndTime'
            >
            </statistics-time>
            <case-bar-filter 
                :from="2" 
                @tagListChange="tagListChange">
            </case-bar-filter> 
        </div>
        <div class="tableContent cancleBorder">
            <p>当前学生数 <b>{{data.count}}</b> </p>
            <v-title
            title="统计数据-列表"
            >
            </v-title>
            <Table :columns="columns" :data="data.list"  @on-sort-change="onSortChange"></Table>
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
            </div>
        </div>
    </div>
</template>

<script>
import CaseBarFilter from '@public/modules/caseBarFilter';
import filterTitle from './components/filterTitle'
import echartItem from './components/echartItem'
import statisticsTime from './components/statisticsTime'
import vTitle from "@public/modules/vTitle";
import vSelect from '@public/modules/vSelect'
import {MENUIDS} from "@public/libs/config.js";
import valid, { errors, STATISTICS, sys, common } from "../../libs/request"
const color=['#5a9cd3','#85ca48','#e8722b','#adc2e6','#fdb802','#3967bc','#9a9b9c','#66a041','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
export default {
    props:{
        uid:{
            type:String,
            // required:true,
        }
    },
    data() {
        return {
            compact: '',
            statisticsTimeList: ['全部', '当前月', '未来3个月', '未来6个月' ],
            dataMain: {
                data1: [],
                data5: [],
                data6: [],
            },
            userInfo: '',
            data: {
                list: []
            },
            userId: this.$route.query.uid || this.uid,
            radioType: '全部',
            timeList: [2018, 2019, 2020],
            StatisticsYear: 2018,
            planStatusList: [{label: '全部', id: ''}],
            currentTime: '',
            status: '',	
            startTime: '',
            endTime: '',
            orderByType: '',
            orderByStatus: '',
            tags: [],
            id: '',
            year: 2017,
            isAll: '',
            apply: '',
            pageNo: 1,
            pageSize: 10,
            columns: [
                {
					title: "学生",
					key: "studentName",
					align: "center",
				},
				{
					title: "服务阶段",
                    key: "",
                    align: "center",
                    render: (h, params) => {
                        if(params.row.plServiceStatusList.length) {
                            return h('div', 
                            { 
                                style: {
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                },
                            },
                            params.row.plServiceStatusList.map(function(item){
                            return h('span',{
                                style: {
                                    paddingRight: '15px',
                                },
                            }, item.phaseLabel);
                        }))
                        }else {
                            return h('p', '');
                        }
                    } 
				},
				{
					title: "入学季节",
                    key: "applyTime",
					align: "center"
				},
				{
					title: "规划状态",
                    key: "statusLabel",
					align: "center"
				},
				{
					title: "接案时间",
					key: "startTime",
					sortable: "custom",
					align: "center",
				},
				{
					title: "(预计)交接时间",
					key: "endTime",
					sortable: "custom",
					align: "center",
				},
				{
					title: "规划周期(天)",
					key: "dayTime",
					sortable: "custom",
					align: "center",
				},
            ]
        }
    },

    components: {
        echartItem,
        filterTitle,
        CaseBarFilter,
        statisticsTime,
        vTitle,
        vSelect
    },

    computed: {
        data1(){ // 已签约
			return this.makeOption(this.dataMain.data1);
        },
        
        data5(){
            let d = this.dataMain.data5;
			let titles= [];
			let data = d.map(item=>{
                titles.push(item.apply)
				return {value:item.num,name:item.apply};
            });
			var formatter = (obj)=>{
				return obj.value;
			}
			const ops = this.makeOption1('学生申请类别分布',titles,data,{formatter});
			return {
				option: ops
			};
        },

        data6(){
            let d = this.dataMain.data6;
			let titles= [];
			let data = d.map(item=>{
                titles.push(item.grade);
				return {value:item.num,name:item.grade};
            });
			var formatter = (obj)=>{
				return obj.value;
            }
            let title = `学生年级构成  ${this.apply}`
			const ops = this.makeOption1(title, titles,data,{formatter});
			return {
				option: ops
			};
        },
    },
    
    created() {
        this.getTime()
        this.getGroupUserId()  
    },

    mounted() {
        this.getViewStuServiceByYear()
        this.getPlanStatus()
        this.getViewServiceGroupByApply()
        this.getViewServiceGroupByGrade()
        this.echartFilter()
    },

    methods: {
        getGroupUserId() {
            let obj = {
                userId: this.userId,
                menuId: MENUIDS.PLAN
            }
            common.getGroupUserId(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                   this.userInfo = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        getTime() {
            STATISTICS.getTime({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.currentTime = res.data.data.date
                    this.getListPageStudentDate('first')
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        echartFilter() {
            let _this = this
            this.$refs.ec.chart.on('click', function (params) {
                _this.apply = params.data.name
                _this.getViewServiceGroupByGrade()
            });
        },

        // 饼图数据 (zuo)
        getViewServiceGroupByApply() {
            let obj = {
                userId: this.userId,
                isAll: this.isAll
            }
            STATISTICS.viewServiceGroupByApply(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.dataMain.data5 = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        // 饼图数据 
        getViewServiceGroupByGrade() {
             let obj = {
                userId: this.userId,
                isAll: this.isAll,
                apply: this.apply,
            }
            STATISTICS.viewServiceGroupByGrade(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.dataMain.data6 = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        selectChange(val) {
            this.StatisticsYear = val
            this.getViewStuServiceByYear()
        },

        // 柱状图
        getViewStuServiceByYear() {
            let obj = {
                year: this.StatisticsYear,
                id: this.userId
            }
            STATISTICS.viewStuServiceByYear(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.dataMain.data1 = res.data.data 
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        // 表数据
        getListPageStudentDate(params={}) {
            if(params == 'first') {
                // this.startTime = `${this.currentTime.substr(0, 7)}-01`
                // let [year, month] = this.currentTime.split('-')
                // month = month / 1 + 1
                // year = month > 12 ? year / 1 + 1 : year
                // month = month > 12 ? month - 12 < 10 ? '0' + (month - 12) : month - 12 : month
                // month = month < 10 ? `0${month}` : month
                // this.endTime =  `${year}-${month}-01`
            }

            let obj = {
                status: this.status,	
                startTime: this.startTime,	
                endTime: this.endTime,
                searchTags: this.tags,
                id: this.userId,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                name: this.compact
            }
            if(params != 'first') {
                obj = Object.assign(obj, params)
            }
            
            STATISTICS.listPageStudentDate(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        upDateAnalyseSellDetail(val) {
            this.startTime = val[0]
            this.endTime = val[1]
            this.getListPageStudentDate()
        },

        tagListChange(tags) {
            this.tags = tags
            this.getListPageStudentDate()
        },
        
        onSortChange(obj) {
            // 排序字段，0：接案时间；1：交接时间；2：规划周期；默认规划周期
            if(obj.order == 'normal') {
                this.getListPageStudentDate()
                return
            }
            let key = obj.key
            let orderByType, orderByStatus
            switch(key) {
                case 'startTime': orderByType = 0 ; break;
                case 'endTime': orderByType = 1 ; break;
                case 'dayTime': orderByType = 2 ; break;
            }

			if(obj.order == 'asc') {
                orderByStatus = '0'
            }else {
                orderByStatus = '1'
            }
            let params ={
                orderByType: orderByType,
                orderByStatus: orderByStatus,
            }

            this.getListPageStudentDate(params)
        },

        onPageSizeChange(val) {
			this.pageSize = val
		    this.getListPageStudentDate()
		},

		onPageChange(val) {
			this.pageNo = val
			this.getListPageStudentDate()
        },
        
        // 获取规划状态
        getPlanStatus() {
            let obj = {
                type: 'pl_service_status_status'
            }

            sys.listData(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.deletaData(res.data.data)
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        deletaData(val) {
            let arr = []
            arr = val.map((item, key) => {
                if(item.value != 'unreceive' && item.value !=  'assigned') {
                    return item
                }
                return ''
            })
            arr.forEach((item, key) => {
                if(item != '') {
                    this.planStatusList.push(item)
                }
            })
        },

        clearStartTime(val, val2) {
            if(val) {
               this.startTime = `${val}-01`
            }else {
                this.startTime = ''
            }
            if(val2) this.endTime = ''
            
            this.getListPageStudentDate()
        },
        
        clearEndTime(val, val2) {
            if(val) {
               this.endTime = `${val}-01`
            }else {
                this.endTime = ''
            }
            if(val2) this.endTime = ''
            
            this.getListPageStudentDate()
        },

        addAcitve(val) { 
            this.status = val
            this.getListPageStudentDate()
        },

        radioChange(val) {
            if(val == '服务中') {
                this.isAll = 1
            }else {
                this.isAll = ''
            }
            
            this.getViewServiceGroupByApply()
        },

        datafunc() {
            return (resole, reject) => {
            }
        },

        textChange() {
            this.getListPageStudentDate()
        },

        makeOption(data){ 
            let d=data
            if(!d.length) return {};
			let s=[];
			let titles=[];
			let vals={};
			let types = {
				plan:'(预计)交接学生数',
                received:'接案学生数',
				// count:'签单量'
            }
            let dataMark=[];
			d.forEach((item,index)=>{
				titles.push(item.month);
				let sum=0;
				for(let i in types){
					if(!vals[i]){
						vals[i]=[];
					}
					let n = Number(item[i]);
					vals[i].push(n);
					sum+=n;
				}
				dataMark.push({
					value:Number(item.plan),
					xAxis:index,
					yAxis:sum,
				})
			});

			let sum = 0;
			for(let i in types){
                let name = types[i];
                // let color = 
				const exam = {
					name: name,
					type: 'bar',
                    stack: '总量',
                    // color: 'red',
                    data: vals[i],
                    barWidth : 30,
				};
				s.push(exam)
			}

			s[0].markPoint={data:dataMark};

			let option = {
				tooltip : {
					trigger: 'axis',
				},
				legend: {
					selectedMode:false,
					data: Object.values(types) 
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				yAxis:  {
					type: 'value'
				},
				xAxis: {
					type: 'category',
					data: titles 
				},
				series: s
			};
			return option;
        },

        makeOption1(title,titles,data,extra){
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
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
					subtextStyle:{
						color: '#333',
						fontSize: 16,
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
    }
}
</script>

<style lang='less'>
.personStatistics {
    .userInfo {
        font-size: 16px;
        font-weight: 600;
    }
    .echarts {
        overflow: hidden;
        .echartTop {
            width: 1000px;
            text-align: center;
            margin: 0 auto;
            position: relative; 
        }
        .title {
            font-size: 16px;
            font-weight: 600;
        }
        .echartsL, .echartsR{
            width: 50%;
            text-align: center;
            float: left;
        }
        .echartsL {
            margin-bottom: 20px;
            p {
                text-align: center;
            }
        }
    }
    .tableContent {
        b {
            font-style: normal;
            color: red;
            font-size: 18px;
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
