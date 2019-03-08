<style lang="less">
	.record-detail-boss {
		border-top: solid 1px #e0e0e0;
		.record-detail-total {
			line-height: 32px;
			font-size: 14px;
			color: #333;
			user-select: none;
			span {
				font-size: 16px;
				color: #44bcb7;
				font-weight: bold;
			}
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
	}
	.record-manage-modal-detail {
		.ivu-modal-content {
			padding-bottom: 20px;
		}
		thead {
			display: none;
		}
		.ivu-modal-footer {
			display: none;
		}
		.ivu-modal-body::-webkit-scrollbar {
			display: none;
		}
		.ivu-table-wrapper {
			border: none;
		}
		.ivu-table-wrapper {
			.ivu-table {
				&::after {
					width: 0;
					height: 0;
				}
			}
		}
	}
	.detail-table {
		border: none;
		.ivu-table {
			&::after {
				content: none;
			}
		}
		.ivu-table-cell {
			color: #333;
		}
	}
</style>

<template>
	<div class="record-detail-boss">
		<Input
			size="large"
			icon="ios-search"
			v-model="searchKeyword"
			placeholder="请输入客户姓名/编号/销售顾问姓名"
			@on-enter="onclickSearchInfo"
			@on-click="onclickSearchInfo"
			style="margin: 10px 0 20px 0; width:400px;">
		</Input>
		<CaseBarFilter
			title="　　标签："
			:menuId="pid"
			:from="2"
			@tagListChange="tagListChange">
		</CaseBarFilter>
		<BtnAndTime
			types="date"
			title="通话时间"
			:btnList="tagList"
			@onclickChoseTags="onclickChoseTags"
			@getTargetDate="getTargetDate">
		</BtnAndTime>
		<BtnAndTime title="通话时长" types="slider" @sliderOnchange="sliderOnchange"></BtnAndTime>
		<div class="record-detail-total">共找到 <span>{{pageTotal}}</span> 条资源</div>
		<Btnlist title="客户列表"></Btnlist>
		<Table
			class="detail-table"
			ref="refDetailTable"
			:data="dataDetail"
			:columns="columnsDetail"
			@on-sort-change="onSortChange"
			@on-selection-change="onSelectionChange">
		</Table>
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
		<Modal
			width=730
			v-model="modaldetail"
			title="播放记录"
			class="record-manage-modal-detail"
			@on-cancel="canceldetail">
				<Table
					height=300
					:columns="columnsModal"
					:data="dataModal">
				</Table>
		</Modal>
		<mPlayer
			:src="playingSrc"
			ref="refMPlayer"
			v-if="playingSrc"
			:closeable=true
			@on-close="onClose"
		></mPlayer>
	</div>
</template>

<script>
import mPlayer from '../../modules/mPlayer';
import Btnlist from '@public/modules/btnlist';
import { waitUntil, util, getTimeInterval, } from "@public/libs/util";
import BtnAndTime from '../../modules/btnAndTime';
import CaseBarFilter from '@public/modules/caseBarFilter';
import valid, { errors, sys, common, recordManage} from '../../libs/request';
export default {
	name: 'RecordDetail',
	components: {
		mPlayer,
		Btnlist,
		BtnAndTime,
		CaseBarFilter,
	},
	props: {
		pid: {
			type: String,
			default: '801',
		},
	},
	data() {
		return {
			id: null,
			startDuration: null, // 开始通话时长
			endDuration: null, // 结束通话时长
			orderByType: null, // 排序字段
			orderByStatus: null, // 排序方式
			searchTags: null,
			startTime: null, // 开始时间
			endTime: null, // 结束时间
			searchKeyword: null,
			tagList: [
				{
					title: '不限',
					type: 'date',
					ms: null,
				},
				{
					title: '今天',
					type: 'date',
					ms: 0,
				},
				{
					title: '最近7天',
					type: 'date',
					ms: -6,
				},
				{
					title: '最近30天',
					type: 'date',
					ms: -29,
				},
			],
			columnsDetail: [
				{
					title: '编号',
					key: 'cusCode',
					align: 'center',
				},
				{
					title: '客户姓名',
					key: 'customName',
					align: 'center',
					render: (h, params) => {
						const text = params.row.customName ? params.row.customName : 'N/A';
						return h('span', text);
					},
				},
				{
					title: '销售顾问',
					key: 'salerName',
					align: 'center',
				},
				{
					title: '通话时间',
					key: 'callTime',
					sortable: true,
					align: 'center',
				},
				{
					title: '通话时长',
					key: 'duration',
					sortable: true,
					align: 'center',
					render: (h, params) => {
						const time = this.getHMS(params.row.duration);
						return h('span', time);
					}
				},
				{
					title: "录音",
					key: "attachmentIds",
					align: "center",
					render:(h, params) => {
						const _this = this;
						const srcList = params.row.attachmentIds; // ids
						let dropList = []; // 渲染的下拉表单
						const targetList = []; // 目标地址
						params.row.attachmentIds.forEach((item, index) => {
							dropList[index] = h('DropdownItem', {
								props:{
									name: 'dropListItem' + index,
								},
								nativeOn: { // 必须使用nativeOn
									click() {
										waitUntil(()=>{
											return !!(srcList.length === targetList.length); // 获取到播放连接之后
										},()=>{
											_this.playingSrc = targetList[index]; // 得到具体的连接
											waitUntil(() => {
												return !! _this.$refs.refMPlayer; // 播放器准备就绪
											}, () => {
												_this.saveRecordLog({ recordId: params.row.id, type: 0, }, _this);
												_this.$refs.refMPlayer.change(_this.playingSrc); // 切换src
												_this.$refs.refMPlayer.toggle(); // 播放
											});
										});
									},
								},
							},`录音${index + 1}`);
						});
						const renderArrss = [
							h('Dropdown', {
								style: {
									cursor: 'pointer',
								},
							},
							[
								h('div', {}, [
									h('i',{
										class: {
											'iconfont': true,
											'icon-bofang': true,
										},
										on: {
											mouseover() {
												srcList.forEach((item,index) => {
													sys.getPathCRM({id: item.id}).then(valid.call(_this)).then(res => {
														targetList[index] = res.data.data.path;
													}).catch(errors.call(_this));
												});
											},
										},
									}),
								]),
								h('DropdownMenu',{
									slot:'list'
								}, dropList)
							])
						];
						return h('div', {}, srcList.length ? renderArrss : '');
					}
				},
				{
					title: '播放次数',
					key: 'playCount',
					sortable: true,
					align: 'center',
					render: (h, params) => {
						const _this = this;
						return h('span', {
							style: {
								color: '#44bcb7',
								cursor: 'pointer',
							},
							on: {
								click() {
									_this.modaldetail = true;
									_this.getPlayHistory({
										recordId: params.row.id,
									});
								},
							},
						}, params.row.playCount);
					},
				},
				{
					title: '操作',
					key: 'caozuo',
					align: 'center',
					render: (h, params) => {
						const _this = this;
						const renderArr = [
							h('span', {
								style: {
									color: '#44bcb7',
									cursor: 'pointer',
								},
								on: {
									click() {
										const objectId = params.row.id;
										const templateName = `录音编号${params.row.cusCode ? parseInt(params.row.cusCode) : ''}销售顾问${params.row.salerName}`;
										const data = {
											objectId,
											templateName,
											type: 'crm_converter_mp3',
										};
										_this.saveRecordLog({ recordId: params.row.id, type: 1, }, _this);
										window.open(sys.download(data));
									},
								},
							}, '下载'),
						];
						return h('div', {
							style: {
								display: 'flex',
								justifyContent: 'space-around',
							},
						}, params.row.attachmentIds.length ? renderArr : '');
					},
				},
			],
			downloadList: [],
			dataDetail: [],
			pageTotal: null,
			pageNo: 1,
			pageSize: 10,
			modaldetail: false,
			columnsModal: [
				{
					title: '姓名',
					key: 'optUserName',
					align: 'center',
				},
				{
					title: '日期',
					key: 'optDate',
					align: 'center',
				},
			],
			dataModal: [],
			playingSrc: '',
			playingIndex: null,
		};
	},
	created() {
		this.id= this.$route.query.id ? this.$route.query.id : '';
		this.getListPage();
	},
	methods: {
		onclickSearchInfo() {
			this.getListPage();
		},
		/*
		* 标签选择
		*/
		tagListChange(val) {
			this.searchTags = val;
			this.getListPage();
		},
		/*
		* 日期选择 
		*/
		onclickChoseTags(type, ms) {
			const data = getTimeInterval(type, ms);
			this.startTime = data.startTime;
			this.endTime = data.endTime;
			this.getListPage();
		},
		getTargetDate(d1, d2) {
			this.startTime = d1;
			this.endTime = d2;
			this.getListPage();
		},
		/*
		* slider
		*/
		sliderOnchange(val1, val2) {
			this.startDuration = val1;
			this.endDuration = val2;
			this.getListPage();
		},
		/*
		* Table 操作
		*/
		onSortChange(val) {
			this.orderByType = val.key;
			this.orderByStatus = val.order;
			this.getListPage();
		},
		onSelectionChange(val) {
			this.downloadList = val;
		},
		/*
		* 播放录音
		*/
		playRecord(index) {
			const _this = this;
			_this.playingIndex = index;
			_this.dataDetail.forEach((item, i) => {
				if (i !== index) {
					item.play = false;
				}
			});
			waitUntil(()=>{
				return !!_this.$refs.refMPlayer;
			},()=>{
				_this.$refs.refMPlayer.toggle(_this.playingSrc, _this.playingIndex);
			});
		},
		/*
		* 关闭录音
		*/
		onClose() {
			this.$refs.refMPlayer.stop();
			this.playingSrc = null;
		},
		/*
		* 关闭 modal
		*/
		canceldetail() {
			this.modaldetail = false;
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getListPage();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getListPage();
		},
		/*
		* 列表获取
		*/
		getListPage() {
			const data = {
				id: this.id,
				startDuration: this.startDuration,
				endDuration: this.endDuration,
				orderByType: this.orderByType,
				orderByStatus: this.orderByStatus,
				searchTags: this.searchTags,
				startTime: this.startTime,
				endTime: this.endTime,
				name: this.searchKeyword,
				pageSize: this.pageSize,
				pageNo: this.pageNo,
			};
			recordManage.listPage(data).then(valid.call(this)).then(res => {
				if (res) {
					const rdata = res.data.data;
					this.dataDetail = rdata.list;
					this.pageTotal = rdata.count;
					this.pageNo = rdata.pageNo;
					this.pageSize = rdata.pageSize;
				}
			}).catch(errors.call(this));
		},
		/*
		* 播放次数记录
		*/
		getPlayHistory(data) {
			recordManage.listRecordLogData(data).then(valid.call(this)).then(res => {
				if (res) {
					this.dataModal = res.data.data;
				}
			}).catch(errors.call(this));
		},
		/*
		* 录音操作
		*/
		saveRecordLog(data, that) {
			recordManage.saveRecordLog(data).then(valid.call(that)).then(res => {
				if(res.ok) {
					console.log('res', res);
				}
			}).catch(errors.call(that));
		},
		/*
		* 格式化时间
		*/
		getHMS(t) {
			t = t - 0;
			let h,m,s = null;
			h = Math.floor(t / 3600);
			m = Math.floor((t % 3600) / 60);
			s = t % 60;
			return `${this.getZero(h, 'h')}${this.getZero(m, 'm')}${this.getZero(s, 's')}`
		},
		getZero(n, type) {
			if (n) {
			n = n <= 9 ? ('0' + n) : (n);
			if (type === 'h') {
				n = n + '小时';
			} else if (type === 'm') {
				n = n + '分钟';
			} else {
				n = n + '秒';
			}
				return n;
			} else {
				if (type === 'm') {
					return '00分';
				} else if (type === 's') {
					return '00秒';
				} else {
					return '';
				}
			}
		},
	},
	beforeDestroy() {
		this.$refs.refMPlayer && this.$refs.refMPlayer.stop();
		this.playingSrc = null;
	},
};
</script>

