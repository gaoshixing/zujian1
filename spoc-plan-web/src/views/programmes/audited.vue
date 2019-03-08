<style lang="less">
	.audited {
	}
</style>

<template>
	<div class="audited">
		<Table :columns="columns" @on-sort-change="sort" :data="waitData"></Table>
	</div>
</template>

<script>
	import Attach from "./attachmentList.vue";
	import student from "./studentName.vue";
	export default {
		props: {
			'tableSelectedItem': {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		data() {
			return {
				columns: [{
						title: '服务学生',
						align: 'center',
						width:200,
						key: 'studentName',
						render: (h, params) => {
							let self = this;
							return h(student, {
								props:{
									odata:params.row
								}
							}, '')
						},
					},
					{
						title: '规划报告',
						className:'filelist',
						render: (h, params) => {
							let self = this;
							return h(Attach, {
								props:{
									odata:params.row
								},
								style: {
									width: '240px',
								},
							}, '')
						}
					},
					{
						title: '审核提交状态',
						key: 'age',
						align: 'center',
						filters: [{
								label: '审批通过',
								value: 'pass'
							},
							{
								label: '审批驳回',
								value: 'reject'
							}
						],
						render: (h, params) => {
							let self = this;
							return h('div', {
								style: {
									width: '100%',
								},
							}, params.row.auditStatus == 'pass' ? '通过' : '驳回')
						},
						filterMultiple: false,
						filterRemote(val) {
							let value='';
							if(val==''){
								value='pass,reject';
							}else{
								value=val[0];
							}
							this.$emit('filterMethod',value)
						}
					},
					{
						title: '审批时间',
						key: 'auditTime',
                        align: 'center',
                        sortable: 'custom',
					},
					{
						title: '操作',
						key: 'name',
						align: 'center',
						render: (h, params) => {
							let self = this;
							return h('div', {
								style: {
									width: '100%',
									textAlign: "center"
								},
							}, [h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									style: {
										fontSize: '12px',
										display:(params.row.auditStatus=='reject'&&params.row.attachmentList.length)?'inline':'none'
									},
									on: {
										click: function() {
											self.$emit('audit',params.row);
										}
									},
								}, '提交审批'),
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									style: {
										fontSize: '12px',
										marginLeft: '20px'
									},
									on: {
										click: function() {
											self.$emit('log',params.row)
										}
									},
								}, '日志'),h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									style: {
										fontSize: '12px',
										marginLeft: '20px',
										display:params.row.auditStatus=='pass'?'inline':'none'
									},
									on: {
										click: function() {
											self.$emit('send',params.row)
										}
									},
								}, '发送家长'),
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									style: {
										fontSize: '12px',
										marginLeft: '20px',
										display:params.row.auditStatus=='pass'&&params.row.isParentRead!=1?'inline':'none'
									},
									on: {
										click: function() {
											self.$emit('read',params.row)
										}
									},
								}, '家长已读'),
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									style: {
										fontSize: '12px',
										marginLeft: '20px',
										display:params.row.auditStatus=='pass'?'inline':'none'
									},
									on: {
										click: function() {
											self.$emit('record',params.row);
										}
									},
								}, '讲解记录')
							])
						}
					},
				],
			}
		},
		computed: {
			waitData() {
				return this.tableSelectedItem;
			}
		},
		methods:{
			sort(data){
				let sortType = 1;
				if(data.order == 'normal') {
					sortType = 1;
				}else if(data.order == 'asc'){
					sortType=0;
				}else{
					sortType=1;
				}
				this.$emit('sort',sortType)
			},
		}
	}
</script>