<style lang="less" scoped>
	.schoolsTable {
		.tags {
			span {
				padding: 3px 10px;
				margin-right: 10px;
				background-color: #d0d0d0;
				border-radius: 3px;
				color: #fff;
			}
		}
		.ivu-table-wrapper{
			border: none;
		}
		.ivu-table-cell{
			padding: 0 3px;
		}
	}
</style>
<template>
	<div class="schoolsTable">
		<div class="tags">
			<span v-for="(item, index) in row.tags" :key="index">{{item}}</span>
		</div>
		<div>
			<Table :data="tableData" :columns="tableColumns">
			</Table>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	import valid, {
		errors,
		sys,
		docuManage,
		docEssayTask
	} from "../libs/request"
	import { aplApplyTask } from '../libs/request';
	import yunpan from '@public/modules/yunpan'
	import upToPan from './applyUpToPan';

	export default {
		props: {
			row: Object,
			from: String, //caseManage ||  myStudent
			menuId: String,
		},
		data() {
			let statusTrans = { //申请材料状态
				0:'待完成',
				1:'已完成'
			}
			let statusTrans1 = { //申请信息状
				0:'待提交',
				1:'填表中',
				2:'已提交'
			}
			return {
				tableData: [],
				tableColumns: [
					{
						title: '学校名称',
						key: 'schoolName',
						width: 210,
						render: (h, params) => {
							return h('div', [
								h('a', {
									style: {
										color: '#44bcb7'
									},
									on: {
										click: () => {
											/* this.$router.push({
												name: 'apply.applyDetail',
												query: {
													from:this.from,
													choiceId : params.row.choiceId,
													groupId : this.row.groupId,
													contractCount : this.row.contractCount,
													choiceTotal : this.row.choiceTotal,
												}
											}) */
											const {href} = this.$router.resolve({
												name: 'apply.applyDetail',
												query: {
													from:this.from,
													choiceId : params.row.choiceId,
													groupId : this.row.groupId,
													contractCount : this.row.contractCount,
													choiceTotal : this.row.choiceTotal,
												}
											})
											window.open(href, '_blank')
										}
									}
								}, [
									params.row.schoolName
								])
							]);
						}
					},
					{
						title: '专业项目',
						key: 'majorName',
						render: (h, params) => {
							return h('div',
							{
										style: {
											cursor:'pointer',
											color: '#44bcb7',
											'font-style': 'normal',
											'white-space':'nowrap',
											'overflow':'hidden',
											'text-overflow':'ellipsis'
										},
										on: {
											click: () => {
												this.$router.push({
													name: 'apply.applyDetail',
													query: {
														from:this.from,
														choiceId : params.row.choiceId,
														groupId : this.row.groupId,
														contractCount : this.row.contractCount,
														choiceTotal : this.row.choiceTotal,
													}
												})
												/* const {href} = this.$router.resolve({
													name: 'library.graduateProgramInfo',
													query: {
														majorId:params.row.majorId
													}
												})
												window.open(href, '_blank') */
											}
										}
									}, [
								params.row.majorName
							]);
						}
					},
                    {
                        title: '申请难度',
						key: 'difficulty',
					},
					{
						title: '申请批次',
						key: 'batch',
					},
					{
						title: '截止时间',
						key: 'deadline',
					},
					{
						title: '准备申请材料',
						key: 'resourceStatus',
						render: (h, params) => {
							return h('div',
								[ statusTrans[params.row.resourceStatus] || params.row.resourceStatus
							]);
						}
					},
                    {
                        title: '提交申请信息',
						key: 'infoStatus',
						render: (h, params) => {
							return h('div',
								[ statusTrans1[params.row.infoStatus] || params.row.infoStatus
							]);
						}
					},
                    {
                        title: '确认申请结果',
						key: 'resultStatus',
					},
					{
						title: '操作',
						key: 'action',
						width: 100,
						align: 'center',
						render: (h, params) => {
							//查看
							return h('div', [
								h('a', {
									style: {
										color: '#73cdc9'
									},
									on: {
										click: () => {
											this.$router.push({
												name: 'apply.applyDetail',
												query: {
													from:this.from,
													choiceId : params.row.choiceId,
													groupId : this.row.groupId,
													contractCount : this.row.contractCount,
													choiceTotal : this.row.choiceTotal,
												}
											})
										/* 	const {href} = this.$router.resolve({
												name: 'apply.applyDetail',
												query: {
													from:this.from,
													choiceId : params.row.choiceId,
													groupId : this.row.groupId
												}
											})
											window.open(href, '_blank') */
										}
									}
								}, '查看')
							]);
						}
					}
				], 
			}
		},
		computed: {
			//...mapState(['userInfo']),
		},
		components: {
		},
		mounted() {
			this.loadData()
		},
		methods: {
			loadData() {
				let obj = {
					studentId: this.row.studentId,
				}
				aplApplyTask.sublist(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableData =  res.data.data
					}
				})
				.catch(errors.call(this))
				.finally(() => {})
			}
		}
	};
</script>