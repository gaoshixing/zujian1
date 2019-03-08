<style lang="less">
	.inviteManage {
		.search {
			position: relative;
			.buttons {
				position: absolute;
				right: 0;
				top: 0;
				button {
					width: 108px;
					height: 32px;
				}
			}
		}
		.cancleBorder {
			
		}
		.page {
			margin-top: 20px;
			margin-bottom: 140px;
			text-align: center;
		}
	}
</style>

<template>
	<div class="inviteManage">
		<div class="search">
			<v-select style="width: 396px;margin: 5px 0 12px;" placeholder="搜索表单名称" :datafunc="datafunc" icon="search" v-model="compact" k='cnname' @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
			<!--<div class="buttons">
				<Button type="primary" @click="newFrm">新建表单</Button>
			</div>-->
		</div>
		<btnlist title="表单列表" :btnList='btnList'>
		</btnlist>
		<div class="cancleBorder">
			<Table :columns="columns" :data="tableList" class="common-table" :loading="loading"></Table>
		</div>
		<div class="page">
			<Page show-elevator show-total show-sizer @on-page-size-change="PageSizeChange" :current="pageNo" :total="count" @on-change="PageChange" v-if="count>10"></Page>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	import valid, {
		errors,
		common,
		sys,
		comFormTable,
		wpInvitingPage
	} from "../../libs/request";
	import vSelect from '@public/modules/vSelect';
	import btnlist from '@public/modules/btnlist';
	export default {
		props: {
			pId: {
				required: true
			}
		},
		data() {
			return {
				count: 0,
				loading: false,
				pageNo: 1,
				pageSize: 10,
				compact: '',
				btnList:[{
					text: '新建表单',
					type: 'primary',
					event: this.newFrm
				}],
				columns: [{
						title: "表单编号",
						key: "id",
						align: "center",
					},
					{
						title: "表单名称",
						key: "name",
						align: "center"
					},
					{
						title: "创建时间",
						key: "updateDate",
						align: "center"
					},
					{
						title: "创建人",
						key: "creator",
						align: "center"
					},
					{
						title: "操作",
						key: "predictNum",
						align: "center",
						render: (h, params) => {
							return h('div', {
								style: {
									width: "64px",
									display: "flex",
									margin: "auto",
									"justify-content": "space-between",
									"align-items": "center",
								}
							}, [
								h(
									"a", {
										style: {},
										on: {
											click: () => {
												this.showTableDialog(params.row.id + '|copy')
											}
										}
									},
									"复制"
								),
								h(
									"a", {
										style: {

										},
										on: {
											click: () => {
												this.$router.push({
													name: "market.formEdit",
													query: {
														id: params.row.id
													}
												})
											}
										}
									},
									"编辑"
								),
							])
						}
					},
				],
				tableList: []
			}
		},
		components: {
			vSelect,
			btnlist
		},
		created() {
			this.getList();
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			getList() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {
					name: this.compact,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					groupIds:"com_form_tpl_kind_goods,com_form_tpl_kind_inviting_page"
				}
				this.loading = true
				comFormTable.list(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.data.count;
						this.tableList = res.data.data.list;
						this.pageNo = res.data.data.pageNo;
						this.pageSize = res.data.data.pageSize;
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				}).catch(errors.call(this)).finally(() =>{
					this.loading = false
				});;
			},
			datafunc() {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.getList();
			},
			PageSizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			PageChange(val) {
				this.pageNo = val;
				this.getList();
			},
			newFrm() {
				this.$router.push({
					name: "market.formEdit",
					params: {}
				})
			},
			// 复制
			handle(obj) {
				common.handleFormMean(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.getList();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			showTableDialog(val) {
				let [tabId, dialogType] = val.split('|')
				this.updateLoadingStatus({
					isLoading: true
				});
				common.viewForm(tabId).then(valid.call(this)).then(res => {
					if(res.ok) {
						if(res.data.data) {
							if(dialogType == 'copy') {
								let obj = {
									type: 3,
									id: tabId
								}
								this.handle(obj);
							}
						} else {
							this.$Message.error('该表单为空，请重新选择');
						}
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
		}
	}
</script>