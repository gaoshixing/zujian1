<style lang='less'>
	.feedback {
		.updataTime {
			color: #b8b8b8;
			display: inline-block;
			text-align: right;
			width: 60px;
			margin-right: 14px;
		}
		.docu-top-area-timing-through {
			width: 14px;
			height: 4px;
			display: inline-block;
			margin-top: 14px;
			background-color: #44bcb7;
		}
		.all {
			i {
				font-style: normal;
				font-size: 18px;
				color: red;
			}
		}
		.page {
			text-align: center;
			margin-top: 20px;
			margin-bottom: 140px;
		}
		.overbox {
			&::after {
				content: "...";
				font-weight: bold;
				position: absolute;
				bottom: 0;
				right: 0;
				padding-right: 4px;
				background-color: inherit;
			}
		}
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table:after {
			display: none;
		}
	}
	
	.verifymodel {
		.verifyBody {
			height: 70vh;
			overflow: auto;
		}
	}
</style>
<template>
	<div class="feedback">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="输入编号/问题内容关键词" :datafunc="datafunc" icon="search" v-model="name" k='cnname' @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<span class="updataTime">提交时间：</span>
		<DatePicker type="date" placeholder="开始时间" style="width: 110px" @on-change="onchangeBDate"></DatePicker>
		<span class="docu-top-area-timing-through"></span>
		<DatePicker type="date" placeholder="结束时间" style="width: 110px" @on-change="onchangeEDate"></DatePicker>
		<p class="all">共计<i>{{count}}</i>条</p>
		<v-title title="反馈列表">
			<v-btn-options slot="right" :btns="btnsNormal1">
			</v-btn-options>
		</v-title>
		<Table :columns="columns" :data="data" @on-sort-change="onSortChange" @on-filter-change="filterChange" :loading="tableLoad"></Table>
		<div class="page">
			<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
		</div>
		<!-- 对话框 -->
		<Modal v-model="addBackModel" width="730" class-name="vertical-center-modal" @on-visible-change="isloading=false" :mask-closable="false" :closable="false">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				提交反馈
			</p>
			<div class="addBackBody">
				<Form ref="addBackForm1" :model="addBackForm" :rules="addBackRuler" :label-width="120">
					<FormItem prop="priority" label="优先级：">
						<RadioGroup v-model="addBackForm.priority">
							<Radio v-for="item in priorityList" :key="item.id" :label="item.value">{{item.label}}</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem prop="type" label="问题分类：">
						<Select v-model="addBackForm.type" style="width: 300px;">
							<Option v-for="item in classList" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="content" label="问题描述：">
						<editor v-model="addBackForm.content"></editor>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closeAddBackModel('addBackForm1')">取消</Button>
				<Button type="primary" @click="addBackOk('addBackForm1')">确定</Button>
			</div>
		</Modal>
		<Modal v-model="verifyModel" width="730" class-name="verifymodel vertical-center-modal" @on-visible-change="">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				提交反馈
			</p>
			<div class="verifyBody">
				<Form :model="verifyForm" :label-width="120">
					<FormItem prop="priority" label="优先级：">
						<div>{{verifyForm.priority}}</div>
					</FormItem>
					<FormItem prop="type" label="问题分类：">
						<div>{{verifyForm.type}}</div>
					</FormItem>
					<FormItem prop="content" label="问题描述：">
						<div v-html="verifyForm.content"></div>
					</FormItem>
					<FormItem prop="content" label="解决结果：">
						<div v-html="verifyForm.action"></div>
					</FormItem>
					<FormItem prop="content" label="理由：">
						<div v-html="verifyForm.content1"></div>
					</FormItem>
				</Form>
			</div>
			<div slot="footer" style="text-align: right;">
				<Button type="ghost" @click="reasonModel=true">重新激活</Button>
				<Button type="primary" @click="pass">验证通过</Button>
			</div>
		</Modal>
		<Modal v-model="reasonModel" width="730" class-name="vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				激活理由
			</p>
			<div class="reasonBody">
				<Form ref="reasonForm1" :model="reasonForm" :rules="reasonRuler" :label-width="120">
					<FormItem prop="content" label="请输入激活理由：">
						<editor name="editor2" v-model="reasonForm.content" v-if="reasonModel"></editor>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closereasonModel('reasonForm1')">取消</Button>
				<Button type="primary" @click="activate('reasonForm1')">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import vTitle from "@public/modules/vTitle";
	import vBtnOptions from '@public/modules/vBtnOptions';
	import editor from './editor';
	import { mapMutations, mapState } from 'vuex';
	import valid, {
		errors,
		sys
	} from '../../libs/request';
	export default {
		data() {
			return {
				tableLoad: false,
				verifyModel: false,
				reasonModel: false,
				verifyForm: {
					priority: '',
					type: '',
					content: '',
					content1: '',
					action: ""
				},
				reasonForm: {
					content: ''
				},
				reasonRuler: {
					content: {
						required: true,
						message: '激活理由不能为空',
						trigger: 'blur'
					}
				},
				name: '',
				startTime: '',
				endTime: '',
				priority: '',
				sort: '',
				status: '',
				type: '',
				pageNo: 1,
				pageSize: 10,
				count: 20,
				addBackModel: false,
				isEditBack: false,
				priorityList: [],
				classList: [],
				addBackForm: {
					id: '',
					priority: "1",
					type: "",
					content: '',
					status: '',
					'url': window.location.href,
					browser: '',
					os: '',
					username: '',
					pwdFlag: '',
					sysWorkorderLogList: [],
				},
				addBackRuler: {
					priority: {
						required: true,
						message: '优先级不能为空',
						trigger: 'change'
					},
					type: {
						required: true,
						message: '问题分类不能为空',
						trigger: 'change'
					},
					content: {
						required: true,
						message: '问题描述不能为空',
						trigger: 'blur'
					},
				},
				data: [],
				btnsNormal1: [{
					class: "bt3",
					text: "提交反馈",
					btnClick: () => this.addBackModel = true
				}, ],
				columns: [{
						title: "编号",
						key: "no",
						align: "center",
						render: (h, params) => {
							let _this = this;
							return h('a', {
								attr: {
									src: "javascript:void(0);",
								},
								on: {
									click: () => {
										_this.$router.push({
											name: 'plan.portal.viewFeedbackDetail',
											query: {
												detailId: params.row.id
											}
										})
									}
								}
							},params.row.no)
						}
					},
					{
						title: "问题内容",
						key: "creator",
						align: "center",
						ellipsis: true,
						width: 240,
						render: (h, params) => {
							let _this = this;
							return h('div', {
								style: {
									height: "54px",
									padding: "12px 0"
								}
							}, [h('a', {
								style: {
									display: "block",
									whiteSpace: "normal",
									overflow: "hidden",
									height: "32px",
									width: "100%",
									position: "relative"
								},
								attr: {
									src: "javascript:void(0);",
								},
								domProps: {
									innerHTML:_this.getSimpleText(params.row.content).substr(0,10)+'...'
								},
								class: {
								},
								on: {
									click: () => {
										_this.$router.push({
											name: 'plan.portal.viewFeedbackDetail',
											query: {
												detailId: params.row.id
											}
										})
									}
								}
							}, )])
						}
					},
					{
						title: "问题分类",
						key: "type",
						align: "center",
						filters: [],
						filterMultiple: false,
						filterRemote(val) {
							this.type = val[0];
							this.getList();
						}
					},
					{
						title: "优先级",
						key: "priority",
						align: "center",
						width: 120,
						filters: [],
						filterMultiple: false,
						filterRemote(val) {
							this.priority = val[0];
							this.getList();
						}
					},
					{
						title: "提交时间",
						key: "updateDate",
						sortable: "custom",
						align: "center"
					},
					{
						title: "状态",
						key: "status",
						align: "center",
						filters: [],
						filterMultiple: false,
						filterRemote(val) {
							this.status = val[0];
							this.getList();
						}
					},
					{
						title: "操作",
						key: "updateDate",
						align: "center",
						render: (h, params) => {
							let self = this;
							return h('div', {}, [h('a', {
									attr: {
										src: "javascript:void(0);"
									},
									style: {
										display: params.row.status == "已提交" ? '' : 'none'
									},
									on: {
										click: () => {
											this.editBackModel(params.row.id)
										}
									}
								},
								'编辑'
							), h('a', {
									attr: {
										src: "javascript:void(0);"
									},
									style: {
										display: params.row.status == "已解决" || params.row.status == "已拒绝" ? '' : 'none'
									},
									on: {
										click: () => {
											this.verify(params.row);
										}
									}
								},
								'验证'
							)])
						}
					},
				]
			}
		},
		computed: {
			...mapState(['userInfo', 'noLogin']),
			allinfo() {
				let navigate = {};
				navigate.appName = navigator.appName; //浏览器的正式名称
				navigate.appVersion = navigator.appVersion; //浏览器的版本号
				navigate.cookieEnabled = navigator.cookieEnabled; // 返回用户浏览器是否启用了cookie
				navigate.cpuClass = navigator.cpuClass; //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）

				navigate.mimeType = navigator.mimeTypes; // 浏览器支持的所有MIME类型的数组
				navigate.platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)  
				//   Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)
				//     和ＭacPPC(Macintosh PowerPC)
				navigate.plugins = navigator.plugins; //  安装在浏览器上的所有插件的数组
				navigate.userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）
				navigate.userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
				navigate.systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）

				navigate.type = "";

				navigate.appCodeName = navigator.appCodeName; //与浏览器相关的内部代码名
				navigate.appMinorVersion = navigator.appMinorVersion; //辅版本号（通常应用于浏览器的补丁或服务包)

				navigate.language = navigator.language; //浏览器支持的语言 （IE没有）

				navigate.onLine = navigator.onLine; //返回浏览器是否处于在线模式（IE4以上版本）

				navigate.opsProfile = navigator.opsProfile; // 未定义   （IE、火狐没有）

				navigate.oscpu = navigator.oscpu; //浏览器正在运行的操作系统，其中可能有CPU的信息（IE没有）

				navigate.product = navigator.product; // 浏览器的产品名（IE没有）

				navigate.productSub = navigator.productSub; //关于浏览器更多信息（IE没有）

				navigate.securityPolicy = navigator.securityPolicy; // 浏览器支持的加密类型（IE没有）

				navigate.userProfile = navigator.userProfile; //  返回一个UserProfile对象，它存储用户的个人信息（火狐没有）

				navigate.vender = navigator.vender; // 浏览器厂商名称（IE、火狐没有）

				navigate.vendorSub = navigator.vendorSub; // 关于浏览器厂商更多的信息  

				return navigate;

			}
		},
		components: {
			vSelect,
			vBtnOptions,
			vTitle,
			editor
		},
		created() {
			this.getList();
			let params1 = {
				type: "sys_workorder_type",
			}
			sys.dictListData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.classList = res.data.data;
					let arr = [];
					this.classList.forEach((v, k) => {
						arr.push({
							label: v.label,
							value: v.value
						})
					})
					this.columns[2].filters = arr;
				}
			}).catch(errors.call(this));
			let params2 = {
				type: "sys_workorder_priority",
			}
			sys.dictListData(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.priorityList = res.data.data;
					let arr = [];
					this.priorityList.forEach((v, k) => {
						arr.push({
							label: v.label,
							value: v.value
						})
					})
					this.columns[3].filters = arr;
				}
			}).catch(errors.call(this));
			let params3 = {
				type: "sys_workorder_status",
			}
			sys.dictListData(params3).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arrs = res.data.data;
					let arr = [];
					arrs.forEach((v, k) => {
						arr.push({
							label: v.label,
							value: v.value
						})
					})
					this.columns[5].filters = arr;
				}
			}).catch(errors.call(this));

		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			getSimpleText(html) {
				var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
				var msg = html.replace(re1, ''); //执行替换成空字符
				return msg;
			},
			getList() {
				this.tableLoad = true;
				let params = {
					name: this.name,
					startTime: this.startTime,
					endTime: this.endTime,
					priority: this.priority,
					sort: this.sort,
					status: this.status,
					type: this.type,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
				}
				sys.wordorderMList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.pageNo = res.data.data.pageNo;
						this.pageSize = res.data.data.pageSize;
						this.count = res.data.data.count;
						this.data = res.data.data.list;
						this.tableLoad = false;
					}
				}).catch(errors.call(this));
			},
			browserInfo(userAgent) {
				let broName;
				//FireFox
				if(userAgent.indexOf('Firefox') != -1) {
					let isFireFox = true;
					/*broName = 'FireFox浏览器';*/
					let strStart = userAgent.indexOf('Firefox');
					let temp = userAgent.substring(strStart);
					broName = temp.replace('/', '版本号')

				}

				//Edge
				if(userAgent.indexOf('Edge') != -1) {
					let isEdge = true;
					/*broName = 'Edge浏览器';*/
					let strStart = userAgent.indexOf('Edge');
					let temp = userAgent.substring(strStart);
					broName = temp.replace('/', '版本号');
				}

				//IE浏览器
				if(userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1) {
					let isIE = true;
					/*broName = 'IE浏览器'; */
					let strStart = userAgent.indexOf('rv');
					let strStop = userAgent.indexOf(')');
					let temp = userAgent.substring(strStart, strStop);
					broName = temp.replace('rv', 'IE').replace(':', '版本号');
				}

				//360极速模式可以区分360安全浏览器和360极速浏览器
				if(userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") < 0 && userAgent.indexOf("Firefox") < 0) {
					if(navigator.javaEnabled()) {
						let is360 = true;
						broName = '360安全浏览器-极速模式';
					} else {
						let is360 = true;
						broName = '360极速浏览器-极速模式';
					}
				}

				//360兼容
				if(userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") != -1 && userAgent.indexOf("MSIE") != -1 && userAgent.indexOf("rv") < 0) {
					let is360 = true;
					broName = '360兼容模式';
				}

				//Chrome浏览器
				if(userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0) {
					let isChrome = true;
					/*broName = 'Chrome浏览器';*/
					let strStart = userAgent.indexOf('Chrome');
					let strStop = userAgent.indexOf(' Safari');
					let temp = userAgent.substring(strStart, strStop);
					broName = temp.replace('/', '版本号');
				}
				return broName;
			},
			setDeviceAndOS() {
				let obj = {};
				var name = "unknown";
				if(window.navigator.userAgent.indexOf("Android") != -1) {
					name = "Android";
				} else if(window.navigator.userAgent.indexOf("iPhone") != -1) {
					name = "iPhone";
				} else if(window.navigator.userAgent.indexOf("SymbianOS") != -1) {
					name = "SymbianOS";
				} else if(window.navigator.userAgent.indexOf("Windows Phone") != -1) {
					name = "Windows Phone";
				} else if(window.navigator.userAgent.indexOf("iPad") != -1) {
					name = "iPad";
				} else if(window.navigator.userAgent.indexOf("iPod") != -1) {
					name = "iPod";
				}
				if(name != "unknown") {
					_AgentInfo.OSname = name;
					_AgentInfo.deviceType = "mobile";
					return;
				}
				if(window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) {
					name = "Windows 10";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) {
					name = "Windows 8";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
					name = "Windows 7";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) {
					name = "Windows Vista";
				} else if(window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) {
					name = "Windows XP";
				} else if(window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) {
					name = "Windows 2000";
				} else if(window.navigator.userAgent.indexOf("Mac") != -1) {
					name = "Mac/iOS";
				} else if(window.navigator.userAgent.indexOf("X11") != -1) {
					name = "UNIX";
				} else if(window.navigator.userAgent.indexOf("Linux") != -1) {
					name = "Linux";
				}
				obj.OSname = name;
				obj.deviceType = "pc";
				return obj;
			},
			onchangeEDate(val) {
				this.$nextTick(() => {
					if(val) {
						this.endTime = new Date(val).format('yyyy-MM-dd hh:mm:ss');
					} else {
						this.endTime = '';
					}
					this.getList();
				})
			},

			onchangeBDate(val) {
				this.$nextTick(() => {
					if(val) {
						this.startTime = new Date(val).format('yyyy-MM-dd hh:mm:ss');
					} else {
						this.startTime = '';
					}
					this.getList();
				})
			},

			onSortChange(data) {
				if(data.order == 'normal') {
					this.sort = '';
				} else {
					if(data.order == 'desc') {
						this.sort = "0";
					} else {
						this.sort = "1";
					}
				}
				this.getList();
			},

			filterChange() {

			},
			pageChange(val) {
				this.pageNo = val;
				this.$el.parentElement.scrollTop = 0
				this.getList();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList();
			},

			textChange() {
				this.getList();
			},

			datafunc() {
				return new Promise((resole, reject) => {

				})
			},
			closeAddBackModel(name) {
				this.addBackForm = {
					id: '',
					priority: '',
					type: "",
					content: '',
					status: '',
					'url': window.location.href,
					browser: '',
					os: '',
					username: '',
					pwdFlag: '',
					sysWorkorderLogList: [],
				};
				this.$refs[name].resetFields();
				this.isEditBack = false;
				this.addBackModel = false;
			},
			addBackOk(name, id) {
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						this.updateLoadingStatus({
							isLoading: true
						});
						let params5 = {};
						params5 = this.addBackForm;
						params5.browser = this.browserInfo(this.allinfo.userAgent);
						params5.os = this.setDeviceAndOS().OSname;
						params5.username = this.userInfo.name;
						if(this.isEditBack) {
							params5.status = "commited";
						} else {
							params5.id = '';
							params5.status = "commited";
						}
						params5.pwdFlag = 0;

						sys.workorferSave(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.getList();
								this.closeAddBackModel(name);
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});;
					}
				})
			},
			editBackModel(id) {
				this.isEditBack = true;
				let params = {
					id
				}
				sys.sysWorkorderForm(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let obj = res.data.data
						this.addBackForm.id = id;
						this.addBackForm.priority = obj.priority;
						this.addBackForm.type = obj.type;
						this.addBackForm.content = obj.content;
						this.addBackModel = true;
					}
				}).catch(errors.call(this));
			},
			verify(val) {
				let params = {
					id: val.id
				}
				if(val.status=='已解决'){
					params.status = 'fixed'
				}
				if(val.status=='不予解决'){
					params.status = 'willnotfix'
				}
				let actionMap = {
					create: '新建',
					edit: '编辑',
					commit: '提交',
					receive: '接收',
					willnotfix: '不予解决',
					postponed: '延期处理',
					fixed: '已解决',
					reactive: '重新激活',
					confirm: '确认',
					close: '关闭'
				}
				sys.editStatusView(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						//						this.verifyForm = res.data.data;
						this.verifyForm.type = val.type;
						this.verifyForm.id = val.id;
						this.verifyForm.priority = val.priority;
						this.verifyForm.content = val.content;
						if(res.data.data){
							this.verifyForm.content1 = res.data.data.content;
						}
						this.verifyForm.action = val.status;
						this.verifyModel = true;
					}
				}).catch(errors.call(this));
			},
			pass() {
				let params = {
					status: 'confirm',
					content: '',
					id: this.verifyForm.id
				}
				console.log(this.updateLoadingStatus)
				this.updateLoadingStatus({
					isLoading: true
				});
				sys.editStatusMe(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.getList();
						this.verifyModel = false;
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});;
			},
			closereasonModel(name) {
				this.$refs[name].resetFields();
				this.reasonModel = false;
			},
			activate(name) {
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						this.updateLoadingStatus({
							isLoading: true
						});
						let params = {
							status: 'reactive',
							content: this.reasonForm.content,
							id: this.verifyForm.id
						}
						console.log(params)
						sys.editStatusMe(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.getList();
								this.closereasonModel(name);
								this.verifyModel = false;
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});
					}
				})
			},
		}
	}
</script>