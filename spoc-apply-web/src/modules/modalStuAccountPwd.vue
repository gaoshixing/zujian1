<style lang="less">
	.modal-student-account-password-boss {
		.ivu-form-label-right {
			.ivu-form-item {
				margin-bottom: 0;
			}
			.ivu-form-item-label {
				color: #a0a0a0;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
		.ivu-modal-body {
			padding-bottom: 30px;
		}
	}
</style>

<template>
	<Modal
		width=1030
		v-model="modals"
		class="modal-student-account-password-boss"
		title="查看学生账号/密码"
		@on-cancel="cancel">
		<Form ref="formInline" :label-width="90">
		<FormItem label="学生：">
            <span>{{safeInfo.name}}</span>
        </FormItem>
		<FormItem label="申请邮箱号：">
            <span>{{safeInfo.account}}</span>
        </FormItem>
		<FormItem label="邮箱密码：">
            <span>{{safeInfo.pwd}}</span>
        </FormItem>
		</Form>
		<Table v-if="dataModal" height=300 :columns="columnsModal" :data="dataModal" style="margin-top: 10px;"></Table>
	</Modal>
</template>

<script>
export default {
	name: 'ModalStuAccountPwd',
	props: {
		dataModal: {
			type: Array,
			default: () => {
				return [];
			},
		},
		safeInfo: {
			type: Object,
			default: () => {
				return {
					name: null,
					account: null,
					pwd: null,
				};
			},
		},
	},
	data() {
		return {
			modals: false,
                columnsModal: [
                    {
						title: '申请学校',
						align: 'center',
                        key: 'schoolName'
                    },
                    {
						title: '专业项目',
						align: 'center',
						key: 'program',
						render: (h, params) => {
							return h('span', params.row.program || 'N/A');
						},
                    },
                    {
						title: '申请系统',
						align: 'center',
						key: 'sys',
						render: (h, params) => {
							return h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
								},
								on: {
									click() {
										window.open(params.row.sysUrl);
									},
								},
							}, params.row.sys)
						},
					},
					{
						title: '申请用户名',
						align: 'center',
                        key: 'account'
                    },
                    {
						title: '申请密码',
						align: 'center',
						key: 'accountPwd',
						width: 150,
                    },
                    {
						title: '申请结果查询网址',
						width: 140,
						align: 'center',
						key: 'queryUrl',
						render: (h, params) => {
							return h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
								},
								on: {
									click() {
										window.open(params.row.queryUrl);
									},
								},
							}, params.row.queryUrl)
						},
					},
					{
						title: '申请结果查询账号',
						width: 140,
						align: 'center',
                        key: 'queryAccount'
                    },
                    {
						title: '申请结果查询密码',
						width: 140,
						align: 'center',
                        key: 'queryAccountPwd'
                    }
                ],
		};
	},
	methods: {
		show() {
			this.modals = true;
		},
		cancel() {
			this.modal = false;
		},
	},
};
</script>

