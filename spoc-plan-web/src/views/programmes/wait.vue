<style lang="less">
	.wait {
		.filelist{
			padding-left: 100px;
		}
	}
</style>

<template>
	<div class="wait">
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
									odata:params.row,
									key:params.row.id
								},
								style: {
								},
							}, '')
						}
					},
					{
						title: '审核提交状态',
						key: 'age',
						align: 'center',
						filters: [{
								label: '待提交',
								value: 'save'
							},
							{
								label: '已提交',
								value: 'commit'
							}
						],
						render: (h, params) => {
							let self = this;
							return h('div', {
								style: {
									width: '100%',
								},
							}, params.row.auditStatus == 'save' ? '待提交' : '已提交')
						},
						filterMultiple: false,
						filterRemote(val) {
							let value='';
							if(val==''){
								value='save,commit';
							}else{
								value=val[0];
							}
							this.$emit('filterMethod',value)
						}
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
										display:(params.row.auditStatus=='save'&&params.row.attachmentList.length)?'inline':'none'
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
										marginLeft: params.row.auditStatus=='save'?'20px':0
									},
									on: {
										click: function() {
											self.$emit('log',params.row);
										}
									},
								}, '日志')
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
		components:{
			Attach,
			student
		},
		methods: {
			sort(data) {
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