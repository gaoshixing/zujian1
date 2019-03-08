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
	import Attach from "../programmes/attachmentList.vue";
	import student from "../programmes/studentName.vue";
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
						title: '规划老师',
						key: 'userName',
                        align: 'center',
					},
					{
						title: '规划报告',
						className:'filelist',
						render: (h, params) => {
							let self = this;
							return h(Attach, {
								props:{
									odata:params.row,
									isAdd:false,
									isdel:false
								},
								style: {
									width: '240px',
								},
							}, '')
						}
					},
					{
						title: '审批结果',
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
							}, [
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
								}, '日志')
							])
						}
					},
				],
			}
		},
		computed: {
			waitData: function() {
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