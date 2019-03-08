<style lang="less">
	.inviteManage {
		.search {
			position: relative;
			.buttons {
				position: absolute;
				right: 0;
				top: 0;
			}
		}
		.cancleBorder {
		}
		.page {
			margin-top: 20px;
			margin-bottom: 140px;
			text-align: center;
		}
		.preview-warp {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 10;
			display: flex;
			justify-content: center;
			align-items: center;
			.preview_box {
				width: 375px;
				height: 602px;
				position: relative;
				.preview_clone {
					width: 14px;
					height: 18px;
					position: absolute;
					top: -24px;
					right: -24px;
					cursor: pointer;
				}
			}
			.preview {
				width: 375px;
				height: 602px;
				overflow: hidden;
				overflow-y: auto;
				background: #FFFFFF;
				position: relative;
				display: flex;
				flex-direction: column;
				.bgImg {
					width: 375px;
					height: 602px;
					position: relative;
					order: 2;
					img {
						width: 375px;
						height: 598px;
					}
					.bgTitle {
						width: 279px;
						height: 45px;
						background: rgba(255, 255, 255, 0.8);
						color: #000000;
						font-size: 24px;
						text-align: center;
						line-height: 45px;
						font-weight: 500;
						position: absolute;
						top: 91px;
						left: 50%;
						margin-left: -140px;
					}
				}
				.xformview {
					z-index: 10;
					width: 100%;
					padding: 0 15px;
					.xformTit {
						padding: 12px 0px;
						font-size: 14px;
						font-weight: 400;
						color: rgba(136, 136, 136, 1);
						line-height: 20px;
						border-bottom: 1px #E5E5E5 solid;
						margin-bottom: 20px;
					}
					&.up {
						order: 1;
					}
					&.dowm {
						order: 3;
					}
					&.floating {
						position: absolute;
						bottom: 0;
						background: rgba(255, 255, 255, 0.9);
					}
					button {
						margin-bottom: 20px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="inviteManage">
		<div class="search">
			<v-select style="width: 396px;margin: 5px 0 12px;" placeholder="搜索素材名称" :datafunc="datafunc" icon="search" v-model="compact" k='cnname' @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
			<!--<div class="buttons">
				<Button type="primary" @click="newInvitation">新建邀请页面</Button>
			</div>-->
		</div>
		<btnlist title="邀请页面列表" :btnList='btnList'>
		</btnlist>
		<div class="cancleBorder">
			<Table :columns="columns" :data="tableList" class="common-table" :loading="loading"></Table>
		</div>
		<div class="page">
			<Page show-elevator show-total show-sizer @on-page-size-change="PageSizeChange" :current="pageNo" :total="count" @on-change="PageChange" v-if="count>10"></Page>
		</div>
		<div class="preview-warp" v-if="!ishid">
			<div class="preview_box">
				<div class="preview">
					<div class="bgImg">
						<img :src="this.inviteForm.uploadFile" />
						<!--<div class="bgTitle">
							{{inviteForm.formTitle}}
						</div>-->
					</div>
					<div class="xformview" :class="{up:inviteForm.formPosition=='up',dowm:inviteForm.formPosition=='below',floating:inviteForm.formPosition=='floating'}">
						<div class="xformTit">
							{{inviteForm.formTitle}}
						</div>
						<xformview ref="meetxForm" :fid="formIds" />
						<Button type="primary" long>确认报名</Button>
					</div>
				</div>
				<span class="preview_clone" @click="ishid=true"><Icon type="close-round" :size="18" color="#fff"></Icon></span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	import valid, {
		errors,
		common,
		sys,
		wpInvitingPage
	} from "../../libs/request";
	import vSelect from '@public/modules/vSelect';
	import btnlist from '@public/modules/btnlist';
	import xformview from '../xform/xformview';
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
				compact: '',
				btnList: [{
					text: '新建邀请页面',
					type: 'primary',
					event: this.newInvitation
				}, ],
				columns: [{
						title: "邀请页面编号",
						key: "code",
						align: "center",
					},
					{
						title: "邀请页面名称",
						key: "title",
						align: "center"
					},
					{
						title: "操作",
						key: "predictNum",
						align: "center",
						render: (h, params) => {
							return h('div', {
								style: {
									width: "124px",
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
												this.$router.push({
													name: "market.inviteBox",
													query: {
														id: params.row.id,
														isEdit: true
													}
												})
											}
										}
									},
									"编辑"
								),
								h(
									"a", {
										style: {

										},
										on: {
											click: () => {
												// this.transfer(params.row);
												this.$router.push({
													name: "market.collection",
													query: params.row
												})
											}
										}
									},
									"数据收集"
								),
								h(
									"a", {
										style: {

										},
										on: {
											click: () => {
												//												this.$router.push({
												//													name: "market.inviteBox",
												//													query: {
												//														id: params.row.id,
												//														readOnly: true
												//													}
												//												})
												this.getForm(params.row.id);
											}
										}
									},
									"预览"
								),
							])
						}
					},
				],
				tableList: [],
				formIds: '',
				inviteForm: {
					id: '',
					title: "",
					uploadFile: "",
					formPosition: "",
					formTitle: "",
					frmName: "",
					visible: []
				},
				ishid: true,

			}
		},
		components: {
			vSelect,
			btnlist,
			xformview
		},
		created() {
			this.getList();
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			getForm(id) {
				if(id) {
					this.updateLoadingStatus({
						isLoading: true
					});
					let params = {
						id
					}
					wpInvitingPage.form(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							//							this.$Message.success(res.data.message);
							this.inviteForm.id = res.data.data.id;
							this.inviteForm.title = res.data.data.title;
							this.inviteForm.attachmentId = res.data.data.attachmentId;
							this.inviteForm.uploadFile = res.data.data.filepath;
							this.inviteForm.formPosition = res.data.data.formPosition;
							this.inviteForm.formTitle = res.data.data.formTitle;
							this.inviteForm.frmName = res.data.data.formName;
							this.formIds = res.data.data.formId;
							this.inviteForm.visible = res.data.data.officeIds;
							this.ishid = false;
							this.updateLoadingStatus({
								isLoading: false
							});
						} else {
							this.updateLoadingStatus({
								isLoading: false
							});
						}
					}).catch(errors.call(this));
				}
			},
			getList() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {
					title: this.compact,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}
				wpInvitingPage.listPage(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.count;
						this.tableList = res.data.data.list;
						this.pageNo = res.data.pageNo;
						this.pageSize = res.data.pageSize;
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				}).catch(errors.call(this));
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
			newInvitation() {
				this.$router.push({
					name: "market.inviteBox",
					query: {}
				})
			}
		}
	}
</script>