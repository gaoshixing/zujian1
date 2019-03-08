<style lang="less">
	.gantt {
		@import "../../assets/gantt/jsgantt.min.css";
		padding-top: 26px;
		.title {
			.lf {
				font-size: 16px;
				font-weight: bold;
				line-height: 44px;
			}
			.save {
				float: right;
				width: 90px;
				height: 30px;
				font-size: 14px;
				line-height: 16px;
			}
		}
		.position {
			overflow: hidden;
			.sel {
				width: 150px;
				height: 30px;
				margin: 0 16px 16px 0;
				float: left;
			}
			.other {
				display: inline-block;
				width: 634px;
				float: right;
				padding-bottom: 16px;
				div {
					padding: 6px 16px;
					float: left;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					cursor: pointer;
					.box {
						width: 16px;
						height: 16px;
						display: inline-block;
						margin-right: 6px;
						&.ddd {
							background: #dddddd;
						}
						&.red {
							background: #e68a8a;
						}
						&.yellow {
							background: #e6cf8a;
						}
						&.grey {
							background: #999999;
						}
						&.green {
							background: #8ae6e1;
						}
						&.ccc {
							background: #fff;
							border: 1px #ccc solid;
						}
					}
				}
				.iconfont {
					font-size: 30px;
					color: #333333;
					margin-right: 20px;
					float: right;
					line-height: 30px;
					cursor: pointer;
				}
			}
		}
	}
	
	.commit {
		.cont {
			font-size: 18px;
			text-align: center;
			margin: 40px 0;
			font-weight: 600;
		}
		.modal-btn {
			text-align: center;
			padding-bottom: 34px;
			.ivu-btn {
				font-weight: 400;
				font-size: 14px;
				width: 120px;
				height: 36px;
				margin: 0 5px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
</style>

<template>
	<div class="gantt">
		<div class="title">
			<span class="lf">甘特图</span>
			<Button type="primary" class="save" @click="save">保存</Button>
		</div>
		<div class="position">
			<DatePicker class="sel" format="yyyy年MM月" v-model="startTime" type="month" placeholder="请选截止什时间" @on-change="setStartTime"></DatePicker>
			<span style="float: left;margin: 15px 16px 16px 0;background-color: rgb(54, 162, 158); display: inline-block; width: 12px; height: 2px;"></span>
			<DatePicker class="sel" format="yyyy年MM月" v-model="endTime" type="month" placeholder="请选截止什时间" @on-change="setEndTime"></DatePicker>
			<Select class="sel" v-model="stage" @on-change="getGanttList">
				<Option v-for="(item,index) in stageList" :value="item.value" :key="index">{{item.label}}</Option>
			</Select>
			<Select class="sel" v-model="gpa" @on-change="getGanttList">
				<Option value=" ">全部标签</Option>
				<Option v-for="(item,index) in gpaList" :value="item.id" :key="index">{{ item.name }}</Option>
			</Select>
			<Select class="sel" v-model="type" @on-change="getGanttList">
				<Option value=" ">全部类型</Option>
				<Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
			</Select>
			<Select class="sel" v-model="records" placeholder="选择查看历史版本" @on-change="getGanttListInfo">
				<Option value="0">当前版本</Option>
				<Option v-for="(item,index) in  recordsList" :value="item.id" :key="index">{{ item.version }}</Option>
			</Select>
			<div class="other">
				<div @click="Undo" :style="{'text-decoration':taskUndo?'line-through':'none'}">
					<p class="box" :class="{ddd:taskUndo,ccc:!taskUndo}"></p>未开始</div>
				<div @click="Doing" :style="{'text-decoration':taskDoing?'line-through':'none'}">
					<p class="box" :class="{ddd:taskDoing,green:!taskDoing}"></p>进行中任务</div>
				<div @click="Due" :style="{'text-decoration':taskDue?'line-through':'none'}">
					<p class="box" :class="{ddd:taskDue,yellow:!taskDue}"></p>快到期任务</div>
				<div @click="Overtime" :style="{'text-decoration':taskOvertime?'line-through':'none'}">
					<p class="box" :class="{ddd:taskOvertime,red:!taskOvertime}"></p>过期任务</div>
				<div @click="Finish" :style="{'text-decoration':taskFinish?'line-through':'none'}">
					<p class="box" :class="{ddd:taskFinish,green:!taskFinish}"></p>已完成任务</div>
				<i class="iconfont icon-fenxiang"></i>
				<i class="iconfont icon-qrcode-1-copy"></i>
			</div>
		</div>
		<div style="position:relative;width: 100%;" id="ganttBox">
			<!--v-show="ganttList.length"-->
			<div style="position:relative;" id="GanttChartDIV" v-show="ganttList.length&&isShow"></div>
		</div>
		<Modal v-model="saveModal" width="730" class="commit">
			<div style="text-align:center">
				<p class="cont">保存前的甘特图，可从历史版本中查看。</p>
				<div class="modal-btn">
					<Button type="ghost" @click="saveModal=false">取消</Button>
					<Button type="primary" @click="saveOk">确定</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<!--<script src="../../assets/gantt/jsgantt.js" type="text/javascript" charset="utf-8"></script>-->
<script>
	import { mapMutations, mapState } from 'vuex';

	import JSGantt from "../../assets/gantt/jsgantt.js"
	window.g = null;
	window.JSGantt = JSGantt;
	import valid, {
		errors,
		plFile,
		sys,
		common,
		plServiceGantt,
		plServiceGroup
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				groupId: this.$route.params.gid,
				screenWidth: 0,
				startTime: '',
				endTime: '',
				stage: " ",
				stageList: [],
				type: " ",
				typeList: '',
				records: '0',
				recordsList: [],
				gpa: " ",
				gpaList: [],
				ganttList: [],
				saveModal: false,
				taskUndo: false,
				taskDoing: false,
				taskDue: false,
				taskFinish: false,
				taskOvertime: false,
				isShow:true
			}
		},
		computed: {
			...mapState('plan', ['leftclosed'])
		},
		created() {
			let params = {
				parent: '4001'
			}
			common.listData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.gpaList = res.data.data;
				}
			}).catch(errors.call(this));
			let params1 = {
				type: '1'
			}
			plServiceGantt.list(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.typeList = res.data.data;
				}
			}).catch(errors.call(this));
			let params2 = {
				groupId: this.groupId
			}
			common.listPhaseData(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.stageList = res.data.data;
				}
			}).catch(errors.call(this));
			let params3 = {
				groupId: this.$route.params.gid,
				startTime: '',
				endTime: '',
				servicePhase: this.stage,
				taskTag: this.gpa,
				taskType: this.type,
				taskUndo: this.taskUndo,
				taskDoing: this.taskDoing,
				taskFinish: this.taskFinish,
				taskOvertime: this.taskOvertime,
				taskDue: this.taskDue,
			}
			plServiceGantt.taskList(params3).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.ganttList = res.data.data;
					this.openGantt();
				}
			}).catch(errors.call(this));
			let params4 = {
				groupId: this.$route.params.gid,
			}
			plServiceGantt.getSnapshotList(params4).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.recordsList = res.data.data;
				}
			}).catch(errors.call(this));
			let params5 = {
				flag: 1,
				id: this.$route.params.gid
			}
			common.plGetPhase(params5).then(valid.call(this)).then(res => {
				if(res.ok) {
					if(res.data.data.length == 1) {
						this.stage = res.data.data[0].value;
					} else {
						this.stage = '';
					}
				}
			}).catch(errors.call(this));
		},
		mounted() {
			// here's all the html code neccessary to display the chart object
			// Future idea would be to allow XML file name to be passed in and chart tasks built from file.
			//			console.log(JSGantt)
			this.screenWidth = this.$el.querySelector('#ganttBox').scrollWidth;
			this.openGantt();
		},
		methods: {
			getGanttList() {
				let params = {
					groupId: this.groupId,
					startTime: this.startTime,
					endTime: this.endTime,
					servicePhase: this.stage,
					taskTag: this.gpa,
					taskType: this.type,
					taskUndo: this.taskUndo,
					taskDoing: this.taskDoing,
					taskFinish: this.taskFinish,
					taskOvertime: this.taskOvertime,
					taskDue: this.taskDue,
				}
				if(!!this.startTime) {
					params.startTime = (new Date(this.startTime)).format('yyyy-MM-dd');
				};
				if(!!this.endTime) {
					let time = new Date(this.endTime);
					time.setMonth(time.getMonth() + 1);
					time.setDate(0);
					params.endTime = (time).format('yyyy-MM-dd');
				}
				plServiceGantt.taskList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.ganttList = res.data.data;
						this.openGantt();
					}
				}).catch(errors.call(this));
			},
			ganttResize() {
				this.screenWidth = this.$el.querySelector('#ganttBox').scrollWidth;
			},
			openGantt() {
				let _this = this;
				window.g = new JSGantt.GanttChart('g', _this.$el.querySelector('#GanttChartDIV'), 'day', this.screenWidth, this);

				g.setShowRes(1); // Show/Hide Responsible (0/1)
				g.setShowDur(1); // Show/Hide Duration (0/1)
				g.setShowComp(1); // Show/Hide % Complete(0/1)
				g.setCaptionType('Complete'); // Set to Show Caption (None,Caption,Resource,Duration,Complete)

				//				var gr = new Graphics();

				if(!!g) {
					if(!this.ganttList.length) {
					}
					//					g.AddTaskItem(new JSGantt.TaskItem(1, 'Define Chart API', '', '', 'ff0000', 'http://help.com', 0, 'Brian', 0, 1, 0, 1)); 
					this.ganttList.forEach((v, k) => {
						g.AddTaskItem(new JSGantt.TaskItem(v.pID.toString(), v.pName, v.pStart, v.pEnd, v.pColor, v.pParent==0?'':("taskReview," + v.pID + "," + this.groupId), v.pMile, v.pRes, v.pComp, v.pGroup, v.pParent, v.pOpen, v.pDepend));
					})
					g.Draw();
					g.DrawDependencies();

				} else {

					alert("not defined");

				};
//				console.log(window.document.getElementsByClassName('scroll2')[0].scrollWidth)
				
//				window.document.getElementsByClassName('scroll2')[0].scrollTop =500;
			},
			save() {
				this.saveModal = true;
			},
			saveOk() {
				let params = {
					groupId: this.groupId,
					startTime: this.startTime,
					endTime: this.endTime,
					servicePhase: this.stage,
					taskTag: this.gpa,
					taskType: this.type,
					taskUndo: this.taskUndo,
					taskDoing: this.taskDoing,
					taskFinish: this.taskFinish,
					taskOvertime: this.taskOvertime,
					taskDue: this.taskDue,
				}
				plServiceGantt.saveSnapshot(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						let params4 = {
							groupId: this.$route.params.gid,
						}
						plServiceGantt.getSnapshotList(params4).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.recordsList = res.data.data;
								this.getGanttList();
							}
						}).catch(errors.call(this));
						this.saveModal = false;
					}
				}).catch(errors.call(this));

			},
			setStartTime(val) {
				//								this.startTime=val;
				this.$nextTick(() => {
					this.getGanttList();
				})
			},
			setEndTime(val) {
				//				this.endTime=val;
				this.$nextTick(() => {
					this.getGanttList();
				})
			},
			getGanttListInfo() {
				let params4 = {
					snapshotId: this.records
				}
				if(this.records == "0") {
					params4.groupId = this.groupId;
				}
				plServiceGantt.getSnapshotInfo(params4).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.ganttList = res.data.data;
						this.startTime = '';
						this.endTime = '';
						this.gpa = ' ';
						this.type = ' ';
						this.openGantt();
					}
				}).catch(errors.call(this));
			},
			Undo() {
				this.taskUndo = !this.taskUndo;
				this.getGanttList();
			},
			Doing() {
				this.taskDoing = !this.taskDoing;
				this.getGanttList();
			},
			Due() {
				this.taskDue = !this.taskDue;
				this.getGanttList();
			},
			Finish() {
				this.taskFinish = !this.taskFinish;
				this.getGanttList();
			},
			Overtime() {
				this.taskOvertime = !this.taskOvertime;
				this.getGanttList();
			}
		},
		watch: {
			screenWidth(val) {
				console.log(val)
				if(!this.timer) {
					this.screenWidth = val
					this.timer = true
					let that = this
					setTimeout(function() {
						// that.screenWidth = that.$store.state.canvasWidth 
						that.openGantt();
						that.timer = false
					}, 400)
				}
			},
			leftclosed(v) {
				console.log(123)
				console.log(v)
				console.log(this.screenWidth)
				this.isShow=false;
				window.setTimeout(()=>{
					this.isShow=true;
					this.screenWidth = this.$el.querySelector('#ganttBox').scrollWidth;
					this.openGantt();
				},21)
			},
			ganttList: {
				handler(val, oval) {
					//					this.openGantt();
				},
				deep: true
			}
		}
	}
</script>