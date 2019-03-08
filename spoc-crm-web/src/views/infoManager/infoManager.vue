<style lang="less">
	.infoManager {
		border-top: solid 1px #e0e0e0;
		.ivu-table th {
			background: #fff;
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
		.table_box {
			padding: 0px 0px 10px;
			tr{
				height: 44px;
			}
			.strip-tit {
				font-size: 14px;
				line-height: 32px;
				color: #333;
				span {
					font-size: 16px;
					color: #44bcb7;
					font-weight: bold;
				}
			}
			.ivu-table-wrapper {
				border: none;
				.ivu-table {
					&:before,
					&:after {
						display: none;
					}
					.ivu-table-body {
						.ivu-table-tbody {
							.ivu-table-row {
								td {
									.ivu-badge-dot {
										right: -14px;
									}
								}
							}
						}
					}
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 14px;
			padding-bottom: 150px;
		}
		.ivu-table-tbody {
			.ivu-table-cell {
				display: flex;
				justify-content: space-around;
			}
		}
	}
	.ivu-table-filter-select-item {
		text-align: center;
	}
	.editModel{
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
	.approval-hide-render {
		display: none;
	}
	.caozuo-span-calss {
		float: left;
		color: #44b4b7;
		cursor: pointer;
		margin-right: 15px;
	}
	.info-manage-boss {
		display: block;
		width: 622px;
		min-height: 32px;
		max-height: 118px;
		line-height: 32px;
		box-sizing: border-box;
		border: solid 1px #e5e5e5;
		background-color: #f5f5f5;
		color: #333;
		padding: 0 7px;
		overflow: hidden;
		overflow-y: scroll;
	}
	.info-manage-boss::-webkit-scrollbar {
		display: none;
	}
	.ivu-form-item-label {
		color: rgb(160,160,160) !important;
	}
	.check-modal-email-content-span {
		line-height: 32px;
		max-height: 115px;
		overflow: hidden;
		overflow-y: scroll;
		display: block;
	}
	.check-modal-email-content-span {
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>

<template>
	<div class="infoManager">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入发送内容" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{pageTotal}}</span> 条记录</p>
			<btn-list title="短信/邮件-列表"></btn-list>
			<Table :loading="loading" :columns="columnsApproval" :data="dataApproval" @on-sort-change="sort" @on-filter-change="onFilterChange"></Table>
		</div>
		<Page
			class="bill-paging"
			v-if="pageTotal > 10"
			show-sizer
			:total="pageTotal"
			:current="pageNo"
			:page-size="pageSize"
			show-total
			show-elevator
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange">
		</Page>
		<!-- 查看 -->
		<Modal ref="refCheckBox" v-model="checkModel" width="730" class-name="editModel common_modal vertical-center-modal" @on-cancel="onclickCancelCheckModal" :styles="{top: '-100px'}">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				查看
			</p>
			<div>
				<Form ref="refCheckForm" :model="checkForm" :label-width="74">
					<FormItem label="发送人：">
						<p v-text="checkForm.senderName"></p>
					</FormItem>
					<FormItem label="收件人：">
						<span>
							<span v-for="(item, index) in checkForm.sysNotificationResultList" :key="index">{{item.user.name}}；</span>
						</span>
					</FormItem>
					<FormItem label="短信内容：">
						<span class="check-modal-email-content-span">{{checkForm.content}}</span>
					</FormItem>
					<FormItem label="提交时间：">
						<span>{{checkForm.handleTime}}</span>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<!-- 编辑 -->
		<Modal ref="refEditBox" v-model="editModel" width="730" class-name="editModel common_modal vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				编辑
			</p>
			<div>
				<Form ref="editForm1" :model="editForm" :label-width="74">
					<FormItem label="发送人：">
						<p v-text="editForm.senderName"></p>
					</FormItem>
					<FormItem label="收件人：">
						<span class="info-manage-boss">
							<span v-for="(item, index) in editForm.sysNotificationResultList" :key="index">{{item.user.name}}；</span>
						</span>
					</FormItem>
					<FormItem label="短信内容：">
						<Input type="textarea" :rows="6" v-model="editForm.content" />
					</FormItem>
				</Form>
			</div>
			<div class="footer">
				<Button @click="closeSendModel">取消</Button>
				<Button type="primary" @click="editOk">确定</Button>
			</div>
		</Modal>
		<!-- 异常日志 -->
		<ModalLog
			ref="refLog"
			:columnsException="columnsException"
			:dataException="dataException"
		></ModalLog>
	</div>
</template>

<script>
import { mapState, } from 'vuex';
import { waitUntil, } from '@public/libs/util';
import vSelect from '@public/modules/vSelect';
import BtnList from '@public/modules/btnlist';
import ModalLog from '../../modules/modalLog';
import valid, { errors, sys, common, messageManage, } from '../../libs/request';
export default {
	components: {
		vSelect,
		BtnList,
		ModalLog,
	},
	data() {
		return {
			loading: true,
			search: '',
			kind: null, // 通知种类
			status: null, // 通知状态 0 提交 1通过 2 驳回
			orderByType: null,
			orderByStatus: null,
			pageTotal: 0,
			pageNo: 1,
			pageSize: 10,
			editForm: {},
			editModel: false,
			checkModel: false,
			checkForm: {},
			columnsApproval: [
				{
					title: '发送类型',
					align: 'center',
					key: 'title',
					filters: [
						{
							label: '群发短信',
							value: 'crmgroupsms',
						},
						{
							label: '群发邮件',
							value: 'crmgroupemail'
						},
					],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
					render: (h, params) => {
						const resText = params.row.kind === 'crmgroupsms' ? '群发短信' : '群发邮件';
						return h('span', resText);
					},
				},
				{
					title: '发送内容',
					align: 'center',
					key: 'content',
					width: 300,
					render: (h, params) => {
						const text = params.row.content;
						return h('span', {
							style: {
								overflow : 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								'-webkit-line-clamp': 2,
								'-webkit-box-orient': 'vertical',
							},
						},text);
					},
				},
				{
					title: '更新时间',
					align: 'center',
					key: 'handleTime',
					sortable: 'custom'
				},
				{
					title: '审批状态',
					key: 'status',
					align: 'center',
					filters: [],
					filterMultiple: false,
					filterMethod(value, key) {
						return true;
					},
					render: (h, params) => {
						let resText = null;
						switch (params.row.status) {
							case '0': resText = '已提交'; break;
							case '1': resText = '已发送'; break;
							case '2': resText = '已驳回'; break;
							case '3': resText = '已发送'; break;
							case '4': resText = '已驳回'; break;
						}; 
						return h('span', resText);
					},
				},
				{
					title: '操作',
					key: 'handle',
					align: 'center',
					render: (h, params) => {
						const _this = this;
						const renderArr = [
							h("span", {
								class: {
									'caozuo-span-calss': true,
								},
								on: {
									click: () => {
										_this.getCheckInfo(params.row.id);
										_this.checkModel = true;
									}
								}
							}, '查看'),
							h("span", {
								class: {
									'approval-hide-render': params.row.status !== '2',
									'caozuo-span-calss': true,
								},
								on: {
									click: () => {
										_this.getCheckInfo(params.row.id);
										_this.editModel = true;
									}
								}
							}, '编辑'),
							h("span", {
								style: {
									marginRight: '0',
								},
								class: {
									'caozuo-span-calss': true,
								},
								on: {
									click: () => {
										_this.dataException = [];
										_this.getLogInfo(params.row.id);
										_this.$refs.refLog.checkException();
									}
								}
							}, '日志'),
						]
						return h('div', {
							style: {
								width: '103px',
								height: '100%',
							},
						}, renderArr)
					}
				}
			],
			dataApproval: [],
			columnsException: [
				{
					title: '序号',
					key: 'index',
					align: 'center',
				},
				{
					title: '操作人',
					key: 'optUserName',
					align: 'center',
				},
				{
					title: '操作',
					key: 'content',
					align: 'center',
				},
				{
					title: '时间',
					key: 'optTime',
					align: 'center',
				},
			],
			dataException: [],
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo,
		}),
	},
	created() {
		this.getMessageList();
	},
	mounted() {
		const filter1 = [
			{ label: '已提交', value: '0', },
			{ label: '已发送', value: '1', },
			{ label: '已驳回', value: '2', },
		];
		const filter2 = [
			{ label: '已提交', value: '0', },
			{ label: '已发送', value: '3', },
			{ label: '已驳回', value: '2', },
		];
		waitUntil(()=>{
			return !!this.userInfo.roleId;
		},()=>{
			let isCeo = false;
			this.userInfo.roleId.split(',').forEach(item => {
				if (item === '903') isCeo = true;
			});
			this.columnsApproval[3].filters = isCeo ? filter2 : filter1;
		});
	},
	methods: {
		searchDropList(word) {
			return new Promise((resolve, reject) => {});
		},
		textChange(val) {
			this.getMessageList();
		},
		/*
		* 查看 Modal
		*/
		onclickCancelCheckModal() {
			this.checkForm = {};
		},
		/*
		* 编辑信息 Modal
		*/
		editOk(){
			if (!this.editForm.content) {
				this.$Message.warning('请编辑短信内容');
				this.$refs.refEditBox.visible = true;
				return;
			} else {
				const arr = [];
				this.editForm.sysNotificationResultList.forEach((item) => {
					arr.push(item.user.id);
				});
				const data = {
					id: this.editForm.id,
					content: this.editForm.content,
					customerIds: arr.join(','),
					kind: this.editForm.kind,
					title: this.editForm.title,
				};
				this.save(data);
				this.$refs.refEditBox.visible = false;
				this.editModel = false;
			}
		},
		closeSendModel(){
			this.editModel=false;
			this.editForm = {};
			this.checkForm = {};
		},
		/*
		* Table 操作
		*/
		sort(val) {
			this.orderByType = val.key;
			this.orderByStatus = val.order;
			this.getMessageList();
		},
		onFilterChange(val) {
			console.log(val);
			switch (val.key) {
				case 'title': this.kind = val._filterChecked[0]; break;
				case 'status': this.status = val._filterChecked[0]; break;
			}
			this.getMessageList();
			/*
			* 903 角色用户筛选驳回的信息 会追加查询 状态 为 4 的 信息
			*/
			if (this.userInfo.roleId.includes('903') && this.status === '2') {
				this.status === '4';
				this.getMessageList();
			}
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getMessageList();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getMessageList();
		},
		/*
		* 列表接口
		*/
		getMessageList() {
			console.log(1);
			const data = {
				name: this.search,
				kind: this.kind,
				status: this.status,
				orderByType: this.orderByType,
				orderByStatus: this.orderByStatus,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			messageManage.listCrmNotificationPage(data).then(valid.call(this)).then(res => {
				if (res) {
					this.pageNo = res.data.data.pageNo;
					this.pageSize = res.data.data.pageSize;
					this.pageTotal = res.data.data.count;
					this.dataApproval = res.data.data.list;
					this.loading = false
				}
			}).catch(errors.call(this));
		},
		/*
		* 日志接口
		*/
		getLogInfo(notificationId) {
			messageManage.listAuditLog({ notificationId, }).then(valid.call(this)).then(res => {
				if (res) {
					this.dataException = res.data.data;
					this.dataException.forEach((item, index) => {
						item.index = index + 1;
					});
				}
			}).catch(errors.call(this));
		},
		/*
		* form
		*/
		getCheckInfo(id) {
			messageManage.form({ id, }).then(valid.call(this)).then(res => {
				if (res) {
					this.editForm = res.data.data;
					this.checkForm = res.data.data;
				}
			}).catch(errors.call(this));
		},
		/*
		* 审批
		*/
		getAudit(data) {
			messageManage.audit(data).then(valid.call(this)).then(res => {
				if (res) {
					console.log(res.data.data);
					this.approvalId = null;
					this.approvalInfos = null;
				}
			}).catch(errors.call(this));
		},
		save(data) {
			messageManage.save(data).then(valid.call(this)).then(res => {
				if (res) {
					this.$Message.info('编辑成功');
					this.getMessageList();
				}
			}).catch(errors.call(this));
		},
	},
}
</script>