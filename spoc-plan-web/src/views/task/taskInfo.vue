<style lang="less">
	.plan_task_info {
		.plan_task_info_content {
			.caption {
				margin-top: 10px;
				color: #999;
			}
			ul {
				font-size: 14px;
				padding: 10px 0 4px 12px;
				li {
					line-height: 24px;
					&.record {
						border-bottom: 1px #eeeeee solid;
					}
				}
				&.noSys {
					li {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.lf {
							padding-left: 46px;
							position: relative;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							height: 34px;
							.check_box {
								position: absolute;
								left: 20px;
								.check {
									border: 5px #fff solid;
									border-radius: 15px;
									display: block;
									width: 30px;
									height: 30px;
									line-height: 20px;
									/*cursor: pointer;*/
									color: #9b9b9b;
									&.click {
										cursor: pointer;
									}
								}
							}
							.edit {
								font-size: 20px;
								position: absolute;
								left: 0;
								line-height: 34px;
								display: block;
								padding-top: 3px;
								height: 34px;
								display: none;
								cursor: pointer;
							}
							&:hover .edit {
								display: block;
							}
							.user {
								width: 120px;
								padding-left: 18px;
								background: #dff8d6;
								line-height: 24px;
								height: 24px;
							}
						}
						.gt {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							margin-left: 10px;
							flex-wrap: wrap;
							.time {
								margin-left: 24px;
								white-space: nowrap;
								&.red {
									color: #c15757;
								}
								&.orange {
									color: #e6cf8a;
								}
								&.grey {
									color: #a9a9a9;
								}
							}
							.tag_box {
								margin-left: 14px;
								white-space: nowrap;
								.tag {
									margin: 0 10px;
								}
							}
							.posi_box {
								position: relative;
								padding-left: 250px;
								height: 30px;
								white-space: nowrap;
							}
							.percent {
								white-space: nowrap;
								width: 16px;
								height: 24px;
								line-height: 24px;
								font-size: 14px;
								margin: 0 6px;
								cursor: pointer;
								display: block;
								box-sizing: content-box;
								line-height: 14px;
							}
							.percent_box {
								display: flex;
								justify-content: space-around;
								align-items: center;
								overflow: hidden;
								.title {
									width: 32px;
								}
								.slid {
									margin: 0 12px;
									width: 180px;
								}
							}
							.handled {
								visibility: hidden;
								display: flex;
								justify-content: flex-start;
								transition: all 0.7s;
								align-items: center;
								padding: 10px 0;
								height: 36px;
								z-index: 1000;
								position: absolute;
								left: 24px;
								top: 0px;
								.ivu-tooltip {
									height: 30px;
								}
								.percent {
									font-size: 14px;
									margin: 0 6px;
									cursor: pointer;
									display: block;
									box-sizing: content-box;
									line-height: 14px;
								}
								.percent_box {
									display: flex;
									justify-content: space-around;
									align-items: center;
									overflow: hidden;
									.title {
										width: 32px;
									}
									.slid {
										margin: 0 12px;
										width: 180px;
									}
								}
								i {
									margin: 0 6px;
									cursor: pointer;
									line-height: 24px;
									color: #999;
									&.iconfont {
										height: 18px;
										line-height: 28px;
									}
									&:hover {
										color: #333;
									}
								}
								.ivu-badge {
									vertical-align: unset;
								}
								.drop {
									.ivu-select-dropdown {
										margin: 0;
										ul {
											padding: 0;
											li {
												line-height: 22px;
											}
										}
									}
								}
								.selOperator {
									.title {
										line-height: 24px;
										font-size: 14px;
									}
									i {
										line-height: 0;
									}
									ul {
										padding: 0;
									}
									.footer {
										display: flex;
										justify-content: center;
										align-items: center;
										.ivu-btn {
											display: inline-block;
											margin: 10px 5px;
											text-align: center;
										}
									}
								}
								.selPrivacy {
									.title {
										line-height: 24px;
										font-size: 14px;
									}
									.privacy_info {
										line-height: 20px;
										font-size: 12px;
										color: #999;
									}
									i {
										line-height: 0;
									}
									ul {
										padding: 0;
									}
									.footer {
										display: flex;
										justify-content: center;
										align-items: center;
										.ivu-btn {
											display: inline-block;
											margin: 10px 5px;
											text-align: center;
										}
									}
								}
							}
							&:hover .handled {
								visibility: visible;
							}
						}
					}
				}
			}
			.operate {
				padding: 0px 10px;
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
				.but {
					width: 108px;
					height: 30px;
					padding: 0;
				}
				a,
				.hid_tit {
					margin-left: 20px;
					cursor: pointer;
				}
			}
		}
	}
	/*.plan_warnModel {
		.pl50 {
			padding-left: 24px;
		}
	}*/
	
	.plan_addWarnModel {
		.warnForm {
			display: flex;
			justify-content: space-between;
			align-items: auto;
			flex-wrap: wrap;
		}
	}
	
	.plan_activateModel {
		.footer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.ivu-btn {
				width: 120px;
				height: 35px;
				margin: 10px 5px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
</style>

<template>
	<div class="plan_task_info">
		<div class="plan_task_info_content">
			<ul class="noSys" v-if="!item.listData.list">
				<li>暂无数据</li>
			</ul>
			<ul class="noSys" v-else-if="!item.listData.list.length">
				<li>暂无数据</li>
			</ul>
			<ul class="noSys" v-else>
				<li class="record" v-for="(value,ind) in item.listData.list" :key="value.id" v-dragging="{ item: value, list: item.listData.list, group: 'list'}">
					<div class="lf" v-if="item.tplType=='metting'||item.tplType=='report'">
						<span class="check_box" v-if="value.status!='finish'">
							<Icon type="ios-checkmark-outline" size="24" class="check" ></Icon>
						</span>
						<span class="check_box" v-else>
							<Icon type="ios-checkmark" size="24" class="check" style="color: #41b3ae;"></Icon>
						</span>
						<p class="user">{{value.userName}}</p>
					</div>
					<div class="lf" v-else>
						<i class="iconfont icon-bianji edit" @click="editTask(value,index,item)" v-if="value.executorId==userInfo.id"></i>
						<span class="check_box" @click="setStatusOn('finish',value)" v-if="value.status!='finish'">
							<Icon type="ios-checkmark-outline" size="24" class="check click" ></Icon>
						</span>
						<span class="check_box" @click="setStatusOn('doing',value)" v-else>
							<Icon type="ios-checkmark" size="24" class="check click" style="color: #41b3ae;"></Icon>
						</span>
						<p class="user">{{value.userName}}</p>
					</div>
					<div class="gt" v-if="value.status!='abort'&&value.status!='finish'">
						<p class="project">
							<span href="javascript:void(0);" v-if="item.tplType=='essay'">{{value.name}}</span>
							<span href="javascript:void(0);" v-else-if="item.tplType=='choiceSchool'||item.tplType=='apply'"><span style="color: #aaa;">申请学校/专业：</span>{{value.name}}</span>
							<a href="javascript:void(0);" v-else @click="jump1('taskReview',value.id)"><span v-text="value.type=='china'?'[中方任务]':value.type=='us'?'[美方任务]':'[学生任务]'" style="margin-right: 8px;"></span>{{value.name}}</a>
						</p>
						<input type="text" :value="value.name" v-show="false" />
						<p class="time" :class="[value.status=='overtime'?'red':value.status=='due'?'orange':'grey']">（到期日：<span v-text="(new Date(formatData(value.endTime))).format('yyyy-MM-dd')"></span>）</p>
						<div class="tag_box">
							<div class="tag ivu-tag ivu-tag-checked" style="background: rgba(60, 166, 161, 0.91); border-width: 1px; border-style: solid; border-color: rgba(60, 166, 161, 0.91); color: rgb(255, 255, 255);" v-for="val in value.tagList" :key="val.id">
								<span class="ivu-tag-text ivu-tag-color-white" style="color: rgb(255, 255, 255);">{{val.name}}</span>
							</div>
						</div>
						<div class="set_time" v-if="item.tplType">
							<a href="javascript:void(0);" @click="setTime">[设置]</a>
						</div>
						<div v-if="item.tplType!='metting'&&item.tplType!='report'&&!!item.tplType">{{value.objectStatus}}</div>
						<Poptip placement="top" width="300" class="perce" v-if="value.isSliderShow && item.tplType!='essay'">
							<span class="percent">{{value.progress}}%</span>
							<div class="percent_box" slot="content">
								<span class="title">进度：</span>
								<Slider v-model="value.progress" show-tip="never" :max="99" class="slid" @on-change="setSliderShow(value,index)"></Slider>
								<span class="title">{{value.progress}}%</span>
							</div>
						</Poptip>
						<div class="posi_box">
							<div class="handled">
								<Poptip placement="top" width="300" class="perce" v-if="!value.isSliderShow && item.tplType!='essay'">
									<span class="percent">{{value.progress}}%</span>
									<div class="percent_box" slot="content">
										<span class="title">进度：</span>
										<Slider v-model="value.progress" :max="99" show-tip="never" class="slid" @on-change="setSliderShow(value,index)"></Slider>
										<span class="title">{{value.progress}}%</span>
									</div>
								</Poptip>
								<Tooltip content="优先级" placement="top" v-if="item.tplType!='metting'&&item.tplType!='report'&&item.tplType!='essay'">
									<Dropdown trigger="click" class="drop" @on-click="setPriority(value,$event)">
										<Icon type="information-circled" size="18" :color="iconColor(value.priority)"></Icon>
										<DropdownMenu slot="list">
											<DropdownItem v-for="ite in priorityList" :key="ite.id" :name="ite.value" :selected="ite.value==value.priority">
												<Icon type="information-circled" size="14" :color="iconColor(ite.value)"></Icon>{{ite.label}}
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</Tooltip>
								<Tooltip content="添加标签" placement="top" v-if="item.tplType!='metting'&&item.tplType!='report'&&item.tplType!='essay'">
									<Dropdown trigger="click" class="drop" @on-click="setTag(value,$event)">
										<i class="iconfont icon-biaoqian1"></i>
										<DropdownMenu slot="list" style="height: 180px;overflow-y: auto;">
											<DropdownItem v-for="ite in tallyList" :key="ite.id" :name="ite.id+','+ite.name" :selected="value.tagList.map(item=>item.id).indexOf(ite.id)!=-1">
												<div>{{ite.name}}</div>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</Tooltip>
								<Poptip placement="top" width="250" v-model="value.operatorShow" @on-popper-show="setOperatorShow(value)" v-if="item.tplType!='metting'&&item.tplType!='report'&&item.tplType!='essay'">
									<Tooltip content="执行人" placement="top">
										<Icon type="person" size="18"></Icon>
									</Tooltip>
									<div class="selOperator" slot="content">
										<p class="title">选择任务执行人：</p>
										<Select v-model="operator" style="width: 188px;">
											<Option v-for="item1 in crewlist" :key="item1.id" :value="item1.userId" :label="item1.name"></Option>
										</Select>
										<div class="footer">
											<Button @click="value.operatorShow=false">取消</Button>
											<Button type="primary" @click="operatorOk(value,index)">确定</Button>
										</div>
									</div>
								</Poptip>
								<Poptip placement="top" width="250" v-model="value.privacyShow" @on-popper-show="setPrivacyShow(value)" v-if="item.tplType!='metting'&&item.tplType!='report'&&item.tplType!='essay'">
									<Tooltip content="隐私性" placement="top">
										<Icon type="locked" size="18"></Icon>
									</Tooltip>
									<div class="selPrivacy" slot="content">
										<p class="title">设置任务隐私性：</p>
										<p class="privacy_info">即任务对组内哪些人公开？</p>
										<Select v-model="privacy" style="width: 216px;">
											<Option value="0">公开（项目组内成员可见）</Option>
											<Option value="1">私有（仅自己及任务执行人可见）</Option>
										</Select>
										<div class="footer">
											<Button @click="value.privacyShow=false">取消</Button>
											<Button type="primary" @click="privacyOk(value,index)">确定</Button>
										</div>
									</div>
								</Poptip>
								<!--<Tooltip content="提醒" placement="top">
									<i class="iconfont icon-icon_notice" @click="warn(value)"></i>
								</Tooltip>-->
								<Tooltip content="放弃" placement="top" v-if="item.tplType!='metting'&&item.tplType!='report'&&item.tplType!='essay'">
									<div @click="waive(value,index)">
										<i class="iconfont icon-fangqi"></i>
									</div>
								</Tooltip>
							</div>
						</div>
					</div>
					<div class="gt" v-if="value.status=='finish'">
						<p class="project">
							<span href="javascript:void(0);" v-if="item.tplType=='essay'">{{value.name}}</span>
							<span href="javascript:void(0);" v-else-if="item.tplType=='choiceSchool'||item.tplType=='apply'"><span style="color: #aaa;">申请学校/专业：</span>{{value.name}}</span>
							<a href="javascript:void(0);" v-else @click="jump1('taskReview',value.id)"><span v-text="value.type=='china'?'[中方任务]':value.type=='us'?'[美方任务]':'[学生任务]'" style="margin-right: 8px;"></span>{{value.name}}</a>
						</p>
						<p class="time" v-if="item.tplType=='metting'||item.tplType=='report'" :class="[value.status=='overtime'?'red':value.status=='due'?'orange':'grey']">（到期日：<span v-text="(new Date(formatData(value.endTime))).format('yyyy-MM-dd')"></span>）</p>
						<div class="tag_box">
							<div class="tag ivu-tag ivu-tag-checked" style="background: rgba(60, 166, 161, 0.91); border-width: 1px; border-style: solid; border-color: rgba(60, 166, 161, 0.91); color: rgb(255, 255, 255);" v-for="val in value.tagList" :key="val.id">
								<span class="ivu-tag-text ivu-tag-color-white" style="color: rgb(255, 255, 255);">{{val.name}}</span>
							</div>
						</div>
						<div v-if="item.tplType!='metting'&&item.tplType!='report'&&!!item.tplType">{{value.objectStatus}}</div>
						<div class="posi_box" v-if="item.tplType!='metting'&&item.tplType!='report'&&item.tplType!='essay'">
							<div class="handled">
								<Tooltip content="添加标签" placement="top">
									<Dropdown trigger="click" class="drop" @on-click="setTag(value,$event)">
										<i class="iconfont icon-biaoqian1"></i>
										<DropdownMenu slot="list">
											<DropdownItem v-for="ite in tallyList" :key="ite.id" :name="ite.id+','+ite.name" :selected="value.tagList.map(item=>item.id).indexOf(ite.id)!=-1">
												<div>{{ite.name}}</div>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</Tooltip>
							</div>
						</div>
					</div>
					<div class="gt" v-if="value.status=='abort'">
						<p class="project">
							<Poptip trigger="hover" title="放弃理由" :content="value.reason">
								<span style="text-decoration: line-through;color: #a9a9a9;" href="javascript:void(0);" v-if="item.tplType=='essay'">{{value.name}}</span>
								<span style="text-decoration: line-through;color: #a9a9a9;" href="javascript:void(0);" v-else-if="item.tplType=='choiceSchool'||item.tplType=='apply'"><span style="color: #aaa;">申请学校/专业：</span>{{value.name}}</span>
								<a href="javascript:void(0);" v-else style="text-decoration: line-through;color: #a9a9a9;" @click="jump1('taskReview',value.id)"><span v-text="value.type=='china'?'[中方任务]':value.type=='us'?'[美方任务]':'[学生任务]'" style="margin-right: 8px;"></span>{{value.name}}</a>
							</Poptip>
						</p>
						<div class="tag_box">
							<div class="tag ivu-tag ivu-tag-checked" style="background: rgba(60, 166, 161, 0.91); border-width: 1px; border-style: solid; border-color: rgba(60, 166, 161, 0.91); color: rgb(255, 255, 255);" v-for="val in value.tagList" :key="val.id">
								<span class="ivu-tag-text ivu-tag-color-white" style="color: rgb(255, 255, 255);">{{val.name}}</span>
							</div>
						</div>
						<div v-if="item.tplType!='metting'&&item.tplType!='report'&&!!item.tplType">{{value.objectStatus}}</div>
						<div class="posi_box">
							<div class="handled">
								<Tooltip content="激活" placement="top">
									<a href="javascript:void(0);" @click="activate(value,index)"><i class="iconfont icon-jihuo"></i></a>
								</Tooltip>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div class="operate" v-if="this.$route.meta.hasBtn!==false">
				<div v-if="item.tplType!='metting' && item.tplType!='report'">
					<Button type="primary" class="but" @click="addTask(item,index)" v-if="item.tplType==null&&$route.name!='plan.myTask.msg'">+ 添加一个任务</Button>
					<a class="hid_tit" @click="hidFinish(item)" v-text="item.isFinishShow?'隐藏 '+item.listData.finishList.length+' 项已完成任务':'【 '+item.listData.finishList.length+'项已完成】'" v-if="item.listData.finishList"></a>
					<a class="hid_tit" @click="hidAbandon(item)" v-text="item.isAbandonShow?'隐藏  '+item.listData.abortList.length+' 项已放弃任务':'【'+item.listData.abortList.length+'项已放弃】'" v-if="item.listData.abortList"></a>
				</div>
			</div>
		</div>
		<!--<Modal ref="warnBox" v-model="warnModel" width="730" class-name="plan_warnModel plan_common_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				任务提醒
			</p>
			<div>
				<div style="line-height: 22px;font-size: 14px;overflow: hidden;">
					<Button type="primary" style="float: right;" @click="addWarnUser">添加提醒</Button>
					<p style="margin: 20px 0 20px 24px;">{{taskName}}：根据学校情况、课程体系计算学生GPA。</p>
				</div>
				<Table :columns="warnCol" :data="warnList"></Table>
			</div>
		</Modal>-->
		<!--<Modal ref="addWarnBox" v-model="addWarnModel" width="730" class-name="plan_addWarnModel plan_common_modal vertical-center-modal" @on-ok="addWarnOk('addWarnForm1')" @on-cancel="closeAddWarnBox">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				<span v-text="isEditWarn?'编辑':'添加'"></span>提醒
			</p>
			<div>
				<Form ref="addWarnForm1" :model="addWarnForm" :label-width="96" inline class="warnForm">
					<FormItem label="提醒谁：">
						<Select v-model="addWarnForm.user" style="width: 180px;">
							<Option v-for="item in crewlist" :key="item.id" :value="item.userId">{{item.name}}</Option>
						</Select>
					</FormItem>
					<FormItem label="提醒时间：">
						<DatePicker type="datetime" v-model="addWarnForm.time" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 180px"></DatePicker>
					</FormItem>
					<FormItem label="提醒方式：">
						<Select v-model="addWarnForm.type" style="width: 180px;">
							<Option v-for="item in warnType" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Form>
			</div>
		</Modal>-->
		<Modal ref="waiveBox" v-model="waiveModel" width="730" class-name="waiveModel plan_common_modal vertical-center-modal" ok-text="保存" @on-ok="setStatus">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				放弃理由
			</p>
			<div>
				<div style="margin-bottom: 14px;font-size: 14px;color:#999">
					请输入放弃理由
				</div>
				<Input v-model="reason" type="textarea" :rows="3"></Input>
			</div>
		</Modal>
		<Modal ref="activateBox" v-model="activateModel" width="730" class-name="plan_activateModel plan_common_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				确认激活
			</p>
			<div style="height: 180px;">
				<div style="line-height:100px;font-size: 16px;text-align: center;font-weight: 700;">
					是否激活当前任务
				</div>
				<div class="footer">
					<Button @click="activateModel=false">取消</Button>
					<Button type="primary" @click="activateOk">确定</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VueDND from 'awe-dnd'
	import { mapState } from 'vuex';
	import valid, {
		errors,
		plFile,
		sys,
		plServiceGroup,
		plTask,
		common,
		plReport,
		plServiceMember,
		remind
	} from "../../libs/request.js";
	let mapList = {
		'high': "#e56665",
		'middle': "#ead282",
		'low': "#8ae594",
		'undefine': "#1d1d1d",
	};
	export default {
		props: {
			oData: {
				type: Object,
				default: function() {
					return {};
				}
			},
			priorityList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			tallyList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			crewlist: {
				type: Array,
				default: function() {
					return [];
				}
			},
			index: {
				type: Number,
				default: function() {
					return 0;
				}
			},
		},
		data() {
			return {
				privacy: '',
				operator: '',
				item: this.oData,
				//				warnModel: false,
				//				warnList: [],
				//				warnCol: [{
				//						title: '提醒谁',
				//						key: 'userName',
				//						className: 'pl50'
				//					},
				//					{
				//						title: '提醒时间',
				//						key: 'remindTime',
				//						className: 'pl50'
				//					},
				//					{
				//						title: '提醒方式',
				//						key: 'typeLabel',
				//						className: 'pl50'
				//					},
				//					{
				//						title: '操作',
				//						key: 'name',
				//						align: 'center',
				//						render: (h, params) => {
				//							let self = this;
				//							return h('div', {
				//								style: {
				//									width: '100%',
				//									textAlign: "center"
				//								},
				//							}, [h('a', {
				//									attrs: {
				//										href: "javascript:void(0)"
				//									},
				//									style: {
				//										fontSize: '12px',
				//										margin: '0 10px'
				//									},
				//									on: {
				//										click: function() {
				//											self.editWarn(params.row)
				//										}
				//									},
				//								}, '编辑'),
				//								h('a', {
				//									attrs: {
				//										href: "javascript:void(0)"
				//									},
				//									style: {
				//										fontSize: '12px',
				//										color: "#ff0000",
				//										margin: '0 10px'
				//									},
				//									on: {
				//										click: function() {
				//											self.delWarn(params.row)
				//										}
				//									},
				//								}, '删除')
				//							])
				//						}
				//					},
				//				],
				addWarnModel: false,
				isEditWarn: false,
				addWarnForm: {
					user: '',
					time: '',
					type: ''
				},
				clickId: '',
				taskName: '',
				warnType: [],
				waiveModel: false,
				reason: '',
				activateModel: false,
				dragIds: ''
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		created() {
			Vue.use(VueDND);
			let params8 = {
				type: 'pl_task_remind_type'
			}
			sys.dictListData(params8).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.warnType = res.data.data;
				}
			}).catch(errors.call(this));
		},
		mounted() {
			this.$dragging.$on('dragged', ({
				value
			}) => {
				let ids = value.list.map(item => item.id);
				this.dragIds = ids.join(',');
			})
			this.$dragging.$on('dragend', () => {
				let params1 = {
					tasks: this.dragIds
				}
				common.sortTask(params1).then(valid.call(this)).then(res => {
					if(res.ok) {} else {
						this.open();
					}
				}).catch(errors.call(this));
			})
		},
		methods: {
			formatData(val) {
				if(val) {
					return val.replace(/-/g, "/");
				}
			},
			editTask(value, index, item) {
				this.$emit('editTask', value, index, item);
			},
			setStatusOn(val, item) {
				let params1 = {
					status: val,
					id: item.id
				}
				common.updateStatus(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.open();
					}
				}).catch(errors.call(this));
			},
			hidAbandon() {
				this.$emit('hidAbandon')
			},
			hidFinish() {
				this.$emit('hidFinish');
			},
			setSliderShow(val, ind) {
				if(val.progress > 99) {
					val.progress = 99;
				}
				if(val.progress > 0) {
					val.isSliderShow = true;
				} else {
					val.isSliderShow = false;
				}
				let params1 = {
					progress: val.progress.toString(),
					id: val.id
				}
				common.updateProgress(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
					} else {
						this.open();
					}
				}).catch(errors.call(this));
			},
			open() {
				this.$emit('open')
			},
			setPriority(val, eve) {
				let params1 = {
					priority: eve,
					id: val.id
				}
				common.updatePriority(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						val.priority = eve;
					}
				}).catch(errors.call(this));
			},
			setTag(val, eve) {
				let arr = eve.split(',');
				let arr1 = val.tagList.map(item => item.id);
				let num = arr1.indexOf(arr[0]);
				if(num == -1) {
					if(arr1.length >= 8) {
						this.$Modal.confirm({
							render: (h) => {
								return h('div', {
									style: {
										width: "370px",
										height: "40px",
										textAlign: 'center',
										fontSize: '16px',
										fontWeight: '700'
									},
								}, '任务标签不能大于8个。 ')
							}
						});
						return false;
					}
					arr1.push(arr[0]);
				} else {
					if(arr1.length <= 1) {
						this.$Modal.confirm({
							render: (h) => {
								return h('div', {
									style: {
										width: "370px",
										height: "40px",
										textAlign: 'center',
										fontSize: '16px',
										fontWeight: '700'
									},
								}, '任务标签不能为空。 ')
							}
						});
						return false;
					}
					arr1.splice(num, 1);
				}
				//				let arr1 = val.tagList.map(item => item.id);
				let params1 = {
					tags: arr1.join(','),
					id: val.id
				}
				common.updateTags(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						if(num == -1) {
							val.tagList.push({
								id: arr[0],
								name: arr[1]
							});
						} else {
							val.tagList.splice(num, 1)
						}
					}
				}).catch(errors.call(this));
			},
			setOperatorShow(val) {
				this.operator = val.executorId;
			},
			operatorOk(val, ind) {
				let params1 = {
					executorId: this.operator,
					id: val.id
				}
				common.updateExecutorId(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.open()
					}
				}).catch(errors.call(this));
			},
			setPrivacyShow(val) {
				this.privacy = val.visibility;
			},
			privacyOk(val, ind) {
				let params1 = {
					visibility: this.privacy,
					id: val.id
				}
				common.updateVisibility(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.open()
					}
				}).catch(errors.call(this));
			},
			//			warn(val) {
			//				this.warnModel = true;
			//				this.clickId = val.id;
			//				let params1 = {
			//					taskId: val.id
			//				}
			//				common.plRemindList(params1).then(valid.call(this)).then(res => {
			//					if(res.ok) {
			//						this.warnList = res.data.data.list;
			//						this.taskName = val.name;
			//					}
			//				}).catch(errors.call(this));
			//			},
			waive(val, num) {
				this.waiveModel = true;
				this.clickId = val.id;
			},
			jump1(name, id) {
				if(this.item.tplType == 'metting') {
					this.$emit('handleRender', this.item);
				} else if(this.item.tplType == 'report') {
					this.$emit('handleRender', this.item);
				} else {
					let urlName = '';
					if(this.$route.name == 'plan.portal.task') {
						urlName = name + '.msg';
					} else if(this.$route.name == 'plan.task') {
						urlName = name;
					}
					this.$router.push({
						name: 'plan.' + urlName,
						query: {
							parent: 'group',
							taskId: id
						},
						params: {
							gid: this.$route.params.gid
						}
					})
				}
			},
			addTask(item, ind) {
				this.$emit("addTask", item, ind);
			},
			//			addWarnUser() {
			//				this.addWarnModel = true;
			//			},
			closeAddWarnBox() {
				this.addWarnModel = false;
				this.isEditWarn = false;
			},
			addWarnOk(name) {
				this.addWarnModel = true;
				let params5 = {
					taskId: this.clickId,
					user: this.addWarnForm.user,
					remindTime: (new Date(this.addWarnForm.time)).format('yyyy-MM-dd hh:mm:ss'),
					type: this.addWarnForm.type
				}
				if(this.isEditWarn) {
					params5.id = this.addWarnForm.id
				}
				common.remindSave(params5).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.addWarnModel = false;
						this.addWarnForm = {
							user: '',
							time: '',
							type: ''
						};
						let params1 = {
							taskId: this.clickId
						}
						common.plRemindList(params1).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.warnList = res.data.data.list;
							}
						}).catch(errors.call(this));
					} else {
						this.$refs.addWarnBox.visible = true;
						this.addWarnModel = true;
					}
				}).catch(errors.call(this));
			},
			editWarn(val) {
				this.isEditWarn = true;
				this.addWarnModel = true;
				this.addWarnForm = {
					id: val.id,
					user: val.userId,
					time: val.remindTime,
					type: val.type
				};
			},
			delWarn(val) {
				let params1 = {
					id: val.id
				}
				common.remindDel(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						let params1 = {
							taskId: this.clickId
						}
						common.plRemindList(params1).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.warnList = res.data.data.list;
							}
						}).catch(errors.call(this));
					}
				}).catch(errors.call(this));
			},
			setStatus() {
				let params1 = {
					status: 'abort',
					reason: this.reason,
					id: this.clickId
				}
				common.updateStatus(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.open();
						this.reason = '';
					}
				}).catch(errors.call(this));
			},
			activate(val) {
				this.activateModel = true;
				this.clickId = val.id;
			},
			activateOk() {
				let params1 = {
					status: 'doing',
					id: this.clickId
				}
				common.updateStatus(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.open();
						this.activateModel = false;
					}
				}).catch(errors.call(this));
			},
			iconColor(val) {
				return mapList[val];
			},
			setTime() {
				this.$emit('setTime');
			}
		},
		watch: {
			oData: {
				handler(val, oval) {
					this.item = val;
				},
				deep: true
			}
		}
	}
</script>