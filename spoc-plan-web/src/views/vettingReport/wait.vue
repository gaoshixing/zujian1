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
						title: '审批提交时间',
						key: 'pushTime',
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
										display:params.row.auditStatus=='commit'?'inline':'none'
									},
									on: {
										click: function() {
											self.$emit('audit',params.row);
										}
									},
								}, '审批'),
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									style: {
										fontSize: '12px',
										marginLeft: params.row.auditStatus=='commit'?'20px':'0'
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
				this.$emit("sort",sortType)
			},
		}
	}
</script>