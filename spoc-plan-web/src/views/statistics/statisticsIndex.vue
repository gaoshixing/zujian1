<template>
    <div class="statisitcsGSX">
        <div class="titleFilter">
            <company-filter
            @toggleGroup='toggleGroup'
            >
            </company-filter>
        </div>
        <div class="content">
            <div class="contentAll">
                <v-title>
                    <span  style="fontSize:12px">规划接案统计</span>
                    <v-btn-options slot="right" :btns="btnsNormal1"></v-btn-options>
                </v-title>
                <div class="center">
					<div class="left">
                        <echart-item :data="data1.option" :mstyle="{width:'360px',height:'300px'}">
                        </echart-item>
                    </div>
                    <div class="centerItem">
                        <echart-item :data="data2.option" :mstyle="{width:'270px',height:'300px'}">
                        </echart-item>
                    </div>
                    <div class="right">
                        <echart-item :data="data3.option" :mstyle="{width:'270px',height:'300px'}">
                        </echart-item>
                        <div class="radioSelect" >
                            <RadioGroup v-model="radioTime" @on-change="radioChange">
                                <Radio label="未来3个月"></Radio></br>
                                <Radio label="未来6个月"></Radio></br>
                                <span @click="con">
                                <Radio label="其他"></Radio></span>
                            </RadioGroup>
                        </div>
                         
                    </div>
				</div>
            </div>
            <div class="contentAverage">
                <v-title>
                    <span  style="fontSize:12px">规划任务统计</span>
                    <v-btn-options slot="right" :btns="btnsNormal2"></v-btn-options>
                </v-title>
                <div class="center">
					<div class="left">
                        <echart-item :data="data5.option" :mstyle="{width:'360px',height:'300px'}">
                        </echart-item>
                    </div>
                    <div class="centerL">
                        <echart-item :data="data6.option" :mstyle="{width:'230px',height:'300px'}">
                        </echart-item>
                    </div>
                    <div class="centerR">
                        <echart-item :data="data7.option" :mstyle="{width:'230px',height:'300px'}">
                        </echart-item>
                    </div>
                    <div class="right">
                        <echart-item :data="data8.option" :mstyle="{width:'230px',height:'300px'}">
                        </echart-item>
                    </div>
				</div>
            </div>
        </div>
        <Modal
            v-model="modal"
            width=728
            ref="refModal"
            title="其他时间段"
            @on-ok="ok"
            @on-cancel="cancel">
                <p>
                    <span>请选择时间段：</span>
                    <DatePicker v-model="checkStartTime"  format="yyyy-MM" type="month" transfer placeholder="请选择时间" style="width: 130px"></DatePicker>
				    ——
		            <DatePicker v-model="checkEndTime"  format="yyyy-MM" type="month" transfer placeholder="请选择时间" style="width: 130px"></DatePicker>
                </p>
        </Modal>
    </div>
</template>

<script>
import vBtnOptions from "@public/modules/vBtnOptions"
import vTitle from "@public/modules/vTitle";
import echartItem from './components/echartItem'
import valid, { errors, STATISTICS } from "../../libs/request"
import companyFilter from './components/companyFilter'
import {mapGetters, mapState} from 'vuex'
const color=['#5a9cd3','#85ca48','#e8722b','#adc2e6','#fdb802','#3967bc','#9a9b9c','#66a041','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

export default {
    data() {
        return  {
            modal: false,
            checkStartTime: '',
            checkEndTime: '',
            cancelV: '未来3个月',
            btnsNormal1: [{ class: "bt3", text: "查看明细", btnClick: this.allDetail }],
            btnsNormal2: [{ class: "bt3", text: "查看明细", btnClick: this.averageDetail }],
            dataMain:{
				data1:[],
				data2:[],
				data3:[],
				data4:[],
				data5:[],
            },
            dataMain1: {
                avgFinish: '',
                avgAbort: '',
                avgOverTimeNum: '',
                userNum: '',
            },
            dataMain2: {
                all: '',
                handed: '',
                notHanded: '',
                studentAVG: '',
            },
            officeId: '',
            groupId: '',
            radioTime: '未来3个月',
            currentTime: '',
        }
    },
    
    components: {
        vBtnOptions,
        echartItem,
        vTitle,
        companyFilter,
    },

    computed: {
        ...mapGetters('plan',['isAdmin', 'isPlanLeaser']),   
        data1() {
            const d = this.dataMain2;
            var formatter = (obj)=>{
				return obj.value;
            }
			let title=`总接案学生：${d.all}`          
            let data = [{value: d.notHanded, name: '未交接'}, {value: d.handed, name: '已交接'}];
            let titles = ['未交接', '已交接']
			const ops = this.makeOption(title, titles, data, {formatter})
			return {option: ops};
        },

        data2() {
            const d = this.dataMain2;
			let title=`顾问平均接案学生：${d.studentAVG}`;
            let data = [{value: d.studentAVG, name: '任务总数'}];
            let finish = ''
			const ops = this.makeOption1(title, data, finish)
			return {option: ops};
        },

        data3() {
            const d = this.dataMain.data3;
			let title=`预计交接学生：${d}`;
            let data = [{value: d, name: '任务总数'}];
            let finish = ''
			const ops = this.makeOption1(title, data, finish)
			return {option: ops};
        },

        data5(){
            let d = this.dataMain.data5;
			let titles= [];
			let data = d.map(item=>{
				titles.push(item.tagName);
				return {value:item.taskNum,name:item.tagName};
            });
			const num = data.map(item=>item.value).reduce((a,b)=>a+b/1,0);
			var formatter = (obj)=>{
				return obj.value;
            }
            let title=`任务数：${num}`;
			const ops = this.makeOption(title,titles,data,{formatter});
			return {
				sum:num,
				option:ops
			};
        },
        
        data6() {
            const d = this.dataMain1;
			let title='人均任务过期率';
            let data = [{value: d.userNum, name: '任务总数'}, {value: d.overTimeNum, name: '已完成'}];
            let finish = (d.overTimeNum / d.userNum * 100).toFixed(0) + '%'
			const ops = this.makeOption1(title, data, finish)
			return {option: ops};	
        },
        
        data7() {
            const d = this.dataMain1;
			let title='人均任务放弃比';
            let data = [{value: d.userNum, name: '任务总数'}, {value: d.abortNum, name: '已完成'}];
            let finish = (d.abortNum / d.userNum * 100).toFixed(0) + '%'
			const ops = this.makeOption1(title, data, finish)
			return {option: ops};
        },
        
        data8() {
            const d = this.dataMain1;
			let title='人均任务完成率';
            let data = [{value: d.userNum, name: '任务总数'}, {value: d.finishNum, name: '已完成'}];
            let finish = (d.finishNum / d.userNum * 100).toFixed(0) + '%'
			const ops = this.makeOption1(title, data, finish)
			return {option: ops};
		},
    },

    created() {
        this.getTime()
    },
  
    mounted() {
        if(this.isPlanLeaser) {
            this.getViewPicRingData()
            this.getStudentCase()
            this.getLeaveStudent()
        }
    },
    
    methods: {
        getTime() {
            STATISTICS.getTime({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.currentTime = res.data.data.date
                    this.filterTime(1)
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        toggleGroup(comId, groupId) {
            this.officeId = comId
            this.groupId = groupId
            this.getViewPicRingData()
            this.getStudentCase()
            this.getLeaveStudent()
        },

        getViewPicRingData() {
            let obj = {
                officeId: this.officeId,
                groupId: this.groupId
            }
            STATISTICS.viewPicRingData(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.dataMain.data5 = res.data.data.pic
                    this.dataMain1 = res.data.data.ring
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        getStudentCase() {
            let obj = {
                officeId: this.officeId,
                groupId: this.groupId
            }
            STATISTICS.studentCase(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.dataMain2 = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        getLeaveStudent() {
            let obj = {
                startTime: this.startTime,
                endTime: this.endTime,
                officeId: this.officeId,
                groupId: this.groupId 
            }
            STATISTICS.leaveStudent(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.dataMain.data3 = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        radioChange(val) {
            if(val == '其他') {
                return
            }
            let long = ''
            if(val == '未来3个月') {
                long = 1
            } else {
                long = 2
            }
            this.cancelV = val
            this.filterTime(long)
        },

        con() {
            this.modal = true
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

        ok() {
            if(!this.checkStartTime || !this.checkEndTime) {
                this.modal = true
                this.$refs.refModal.visible = true
                this.$Message.info('请输选择开始或结束时间')
                return
            }
            this.startTime = `${this.checkStartTime.format('yyyy-MM')}-01`
            this.endTime = `${this.checkEndTime.format('yyyy-MM')}-01`
            this.getLeaveStudent()
        },

        cancel() {
            this.radioTime = this.cancelV
        },

        filterTime(long) {
            this.startTime = `${this.currentTime.substr(0, 7)}-01`
            let [year, month] = this.currentTime.split('-')
            month = month / 1 + long * 3 + 1
            year = month > 12 ? year / 1 + 1 : year
            month = month > 12 ?  month - 12 : month
            month = month < 10 ? `0${month}` : month
            this.endTime =  `${year}-${month}-01`
            this.getLeaveStudent()
        },
        
        allDetail() {
            this.$router.push({
                name: 'plan.statisticsAverageD',
            })
        },

        averageDetail() {
            this.$router.push({
                name: 'plan.statisticsAllD',
            })
        }
    }
}
</script>

<style lang='less'>
    .statisitcsGSX {
        .center{
            margin-top: 20px;
        }
        .contentAll {
            overflow: hidden;
            position: relative;
            .center {
                .left, .centerItem{
                    width: 30%;
                }
                .right {
                    width: 40%;
                    position: relative;
                }
                .radioSelect {
                    position: absolute;
                    right: 8%;
                    bottom: 20px;
                }
            }
        }
        .center {
            overflow: hidden;
            div {
                float: left;
            }
            p {
                text-align: center;
            }
            .left {
                width: 37%;
            }
            .centerL, .centerR, .right {
                width: 21%;
            }
        }
    }
</style>
