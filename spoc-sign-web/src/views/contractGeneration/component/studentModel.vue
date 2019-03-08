<style lang="less">
	.modalstud{
		.division{
			width: 100%;
			padding-bottom: 15px;
			margin-bottom: 24px;
			font-size: 14px;
			line-height: 16px;
			text-align: center;
			border-bottom: 1px #D9D9D9 solid;
		}
		.ivu-form .ivu-form-item-label{
			color: #999;
		}
	}
</style>

<template>
	<Modal ref="generationStu" v-model="modalstud" title="新增学员" width="810" :closable="true" :mask-closable="true" class-name="modalstud vertical-center-modal" @on-visible-change="modalstudVisible">
		<div style="padding-right: 14px;height: 500px;overflow-y: auto;">
			<Form ref="formstud" :rules="studRule" :model="studData" :label-width="100">
				<Row type="flex">
					<Col span="12">
					<FormItem prop="ecId" label="客户编号：">
						<Input v-model="studData.ecId" :disabled="!!$route.query.cusCode"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="source" label="客户来源：">
						<Select v-model="studData.source">
							<Option v-for="item in ecChannels" :key="'c'+item.id" :value="item.id">{{item.name}}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row type="flex">
					<Col span="12">
					<FormItem prop="year" label="入学年份：">
						<Input v-model="studData.year"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="apply" label="申请类别：">
						<Select v-model="studData.apply">
							<Option v-for="item in applyTypes" :key="'ap'+item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<div class="division">
					学生信息
				</div>
				<Row type="flex">
					<Col span="6">
					<FormItem prop="lastName" label="姓：">
						<Input v-model="studData.lastName"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="firstName" label="名：">
						<Input v-model="studData.firstName"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="phone" label="联系电话：">
						<Input v-model="studData.phone"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row type="flex">
					<Col span="12">
					<FormItem prop="studentIdentity" label="身份证号：">
						<Input v-model="studData.studentIdentity"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="address" label="联系地址：">
						<Input v-model="studData.address"></Input>
					</FormItem>
					</Col>
				</Row>
				<div class="division">
					<span>监护人信息<br />（或委托代理人信息）</span>
				</div>
				<Row type="flex">
					<Col span="12">
					<FormItem prop="agentName" label="法定监护人/委托代理人：">
						<Input v-model="studData.agentName" placeholder="如签约时学生已满18周岁，可填“无”"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="agentIdentity" label="身份证号：">
						<Input v-model="studData.agentIdentity"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row type="flex">
					<Col span="12">
					<FormItem prop="email" label="家长邮箱：">
						<Input v-model="studData.email"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					</Col>
				</Row>
			</Form>
		</div>
		<div slot="footer">
			<Button @click="modalstud=false">取消</Button>
			<Button type="primary" @click="studOk('formstud')">确定</Button>
		</div>
	</Modal>
</template>

<script>
	import { arrayRemove, extendKey, validIdCard, clone } from '../../../libs/util.js';
	import valid, {
		errors,
		htPolicy,
		contract,
		htContractTpl,
		ec,
		updateIsContract,
		common
	} from '../../../libs/request.js';
	export default {
		props: {
			editList: {
				type: Object,
				default: () => {
					return {};
				}
			},
			applyTypes: {
				type: Array,
				default: () => {
					return [];
				}
			},
			ecChannels: {
				type: Array,
				default: () => {
					return [];
				}
			},
			ecInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
			//			selected: {
			//				type: [String, Number],
			//				default: ''
			//			}
		},
		data() {
			const must = [{
				required: true,
				message: '该项为必填',
				trigger: 'blur'
			}, ];
			let self=this;
			return {
				modalstud: false,
				isSave:false,
				studData: {
					ecId: '',
					source: '',
					lastName: '',
					firstName: '',
					apply: '',
					studentIdentity: '',
					agentName: '',
					agentIdentity: '',
					phone: '',
					address: '',
					email: '',
					year: '',
				},
				studRule: {
					ecId: [{
							required: true,
							pattern: /^\d+$/,
							message: '请输入正确的客户编号',
							trigger: 'blur'
						},
						{
							validator(rule, value, callback, source, options) {
								if(!value) {
									callback();
								}
								if(self.isSave){
									callback();
									return;
								}
								self.tryGetEc(data => {
									if(data.data.status == "success") {
										let keys = ['source','lastName','firstName','apply','studentIdentity','agentName','agentIdentity','phone','address','email','year'];
										extendKey(keys, data.data.data, self.studData);
										callback();
									} else {
										callback();
									}
								})
							},
							trigger: 'blur'
						}
					],
					source: [{
						required: true,
						message: '请选择来源',
						trigger: 'change'
					}, ],
					lastName: must,
					firstName: must,
					apply: [{
							required: true,
							message: '该项为必填',
							trigger: 'change'
						}, ],
//					studentIdentity:must,
//					studentIdentity: [{
//						validator(rule, value, callback, source, options) {
//							var errors = [];
//							if(value === '') {
//								return callback(errors);
//							}
//							if(!validIdCard(value)) {
//								errors.push(new Error('格式不正确'))
//							}
//							callback(errors);
//						}
//					}, ],
					agentName: [{
						required: true,
						message: '请填写代理人名称',
						trigger: 'blur'
					}, ],
//					agentIdentity:must,
//					agentIdentity: [{
//						validator(rule, value, callback, source, options) {
//							var errors = [];
//							if(value === '') {
//								return callback(errors);
//							}
//							if(!validIdCard(value)) {
//								errors.push(new Error('格式不正确'))
//							}
//							callback(errors);
//						}
//					}],
					phone: [{
							required: true,
							message: '请填写联系电话',
							trigger: 'blur'
						},
						{
							pattern: /^1(3|4|5|7|8)\d{9}$/,
							message: '格式不正确',
							trigger: 'blur'
						},
//						{
//							validator(rule, value, callback, source, options) {
//								if(value) {
//									if(self.studendreaded) {
//										callback();
//									} else {
//										self.$parent.getStudentId(value, callback);
//									}
//								} else {
//									callback([new Error('不能为空')]);
//								}
//							},
//							trigger: 'blur'
//						}
					],
					address: [{
						required: true,
						message: '请填写联系地址',
						trigger: 'blur'
					}, ],
					email: [{
						type: 'email',
						message: '请填写正确的邮箱地址',
						trigger: 'change'
					}],
					year: [{
						required: true,
						message: '请填写入学年份',
						trigger: 'blur'
					}]
				},
			}
		},
		created() {
				this.isSave=false;
		},
		methods: {
			//			getApplyTypes() {
			//				publicSys.dictListData({
			//					type: 'xx_student_apply'
			//				}).then(valid.call(this)).then(res => {
			//					if(res.ok) {
			//						this.applyTypes = res.data.data;
			//					}
			//				}).catch(errors.call(this));
			//			},
			//			getStudentId(phone, callback) { // 通过手机号获取studentId,若取到studentId则加入到最终的表单中
			//				let apply = this.studData.apply;
			//				if(!phone) {
			//					this.$Message.error('请输入手机号')
			//					return false;
			//				}
			//				if(!apply) {
			//					this.$Message.error('请选择申请阶段')
			//					return false;
			//				}
			//				return contract.checkPhone(phone, apply).then(valid.call(this)).then(res => {
			//					if(res.ok) {
			//						const r = res.data.data;
			//						if(r && r.studentId) {
			//							this.studentId = r.studentId;
			//							this.$Modal.confirm({
			//								title: '绑定学生',
			//								content: `${r.groupName?('已存在【'+r.groupName+'】服务组'):'已存在此学生'},是否绑定？`,
			//								onOk: () => {
			//									callback();
			//									this.freeze = false;
			//									this.studendreaded = true;
			//								},
			//								onCancel: () => {
			//									callback([new Error("已取消操作")]);
			//									this.freeze = true;
			//									this.studendreaded = false;
			//								}
			//							});
			//						} else {
			//							callback();
			//						}
			//					}
			//				}).catch(errors.call(this));
			//			},
			tryGetEc(cb) {
				if(this.studData.ecId) {
					ec.getHtContractByCode(this.studData.ecId).then(valid.call(this)).then(res => {
						cb && cb(res);
						if(res.ok && res.data.data && res.data.data.code !== -1) {
							this.ecInfo.data = res.data.data;
							if(this.ecInfo.data.mobile) {
								this.studData.phone = this.ecInfo.data.mobile;
							}
							if(this.ecInfo.data.channelId.toString()) {
								this.studData.source = this.ecInfo.data.channelId.toString();
							}
							this.$nextTick(() => {
								this.$refs.formstud.validateField('phone');
								this.$refs.formstud.validateField('source');
							});
						}
					}).catch(errors.call(this)).finally(() => {
						this.isSave=false;
					});
				}
			},
			studOk(name) {
				this.isSave=true;
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$emit('studOk', this.studData);
						this.modalstud = false;
					} else {}
				})
			},
			modelShow() {
				this.isSave=false;
				if(this.editList) {
					this.studData = Object.assign(this.studData, this.editList)
				}
				this.modalstud = true;
			},
			swfTime(k, v) {
				if(v) {
					this.studData[k] = (new Date(v)).format('yyyy-MM-dd 00:00:00');
				} else {
					this.studData[k] = '';
				}
			},
			modalstudVisible(val) {
				if(!val) {
					this.$refs.formstud.resetFields();
				}
			}
		},
		watch: {
			//			xqList: {
			//				handler: function(val, oldVal) { 
			//				
			//				},
			//				deep: true
			//			}
		}
	}
</script>