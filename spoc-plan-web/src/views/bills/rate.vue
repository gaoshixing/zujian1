<style lang="less">
	.rate-boss {
		width: 100%;
		height: 100%;
		.my-bill-search-add {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			padding-right: 10px;
		}
		.rate-total-teachers {
			height: 35px;
			line-height: 35px;
			color: rgb(35,35,35);
			font-size: 14px;
			font-weight: 500;
			margin: 10px 0;
			span {
				font-size: 16px;	
				color: rgb(255,12,12);
				margin-right: 10px;
			}
		}
		.rate-btn-list {
			padding-left: 20px;
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
	}
	.bill-modal-detail-rate {
		font-size: 14px;
		.ivu-form-item-label {
			margin-right: 15px;
		}
	}
	.rate-table {
		tr {
			height: 50px;
		}
	}
	.gray-bg-input {
		.ivu-icon-android-arrow-dropdown {
			font-size: 20px;
		}
	}
	.bill-modal-level {
		.ivu-modal-content {
			.ivu-modal-body {
				min-height: 500px;
				max-height: 580px;
				overflow: hidden;
				overflow-y: scroll;
			}
		}
	}
</style>

<template>
	<div class="rate-boss">
		<div class="my-bill-search-add">
			<Input v-model="searchVal" icon="ios-search" placeholder="请输入输入招生官人姓名" style="width: 396px" @on-click="searchmembers" @on-enter="searchmembers"></Input>
		</div>
		<div class="rate-total-teachers">
			当前招生官总人数 <span>{{pageTotal}}</span>
		</div>
		<top-title-and-button
			title="接案数据-列表"
			:isShow="BatchEditList.length"
			@onclickBtnsOne="onclickBtnsOne"
			@onclickBtnsTwo="onclickBtnsTwo"
		></top-title-and-button>
		<Table :columns="columnsTable" :data="dataTable" size="small" ref="table" class="rate-table" @on-select-all="onSelectAll"  @on-selection-change="onSelectionChange" @on-sort-change="onSortChange" @on-filter-change="onFilterChange"></Table>

		<Page class="bill-paging" v-if="pageTotal > 10" show-sizer :total="pageTotal" show-total show-elevator @on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange"></Page>
		<!-- 设置费率-顾问每小时的价格 modal -->
		<Modal
			v-model="modalBatchEdit"
			ref="refModalBatchEdit"
			title="设置费率-顾问每小时的价格"
			width="730"
			@on-ok="batchEditOk"
			@on-cancel="batchEditCancle"
			class="bill-modal-detail-rate">
			<Form :label-width="80">
				<FormItem label="name1"
					v-for="(item, index) in BatchEditList" 
					:key="index"
					:label="item.userName">
					<Select v-model="item.levelName" style="width:200px" @on-change="selectOnChane(item.id)" placeholder="请选择招生官级别">
						<Option
							v-for="(items, index) in levelEditList"
							:key="index"
							:value="items.level">
							{{items.level}}
						</Option>
					</Select>
					<span v-if="item.levelName" style="margin-left: 20px;">服务费/小时： {{item.unit | currencyLogogram}}  {{item.price}}/h</span>
				</FormItem>
			</Form>
		</Modal>
		<!-- 级别设置 modal -->
		<Modal
			v-model="modalLevelEdit"
			ref="refModalLevalEdit"
			title="级别设置"
			width="730"
			ok-text="保存"
			cancel-text="关闭"
			@on-ok="levelOk"
			@on-cancel="levelCancle"
			class="bill-modal-level">
			<Form ref="addLevels" :model="addLevels" :rules="ruleLevel" inline>
				<FormItem prop="level">
					<Input type="text" v-model="addLevels.level" placeholder="请输入级别名称" style="width:180px;margin-right: 20px;" class="gray-bg-input"></Input>
				</FormItem>
				<FormItem prop="price">
					<Input type="text" v-model="addLevels.price" placeholder="请输入价格"  style="width:100px;" class="gray-bg-input"></Input>
				</FormItem>
				<span style="color:rgb(167, 167, 167);line-height:32px;display:inline-block;">/小时</span>
				<FormItem prop="unit">
					<Select v-model="addLevels.unit" style="width:180px;margin-right: 20px;margin-left: 20px;" placeholder="请选择货币类型" class="gray-bg-input">
						<Option v-for="(items, index) in unitTypeList" :key="index" :value="items.value">{{ items.label }}</Option>
					</Select>
				</FormItem>
				<span style="color:#44BCB7;line-height:32px;display:inline-block;float:right;font-size:14px;cursor:pointer;" @click="onclickAddLevel">添加</span>
			</Form>
			<Form ref="addLevel" v-for="(item, index) in addLevel" :key="index" :modal="item" inline>
				<FormItem>
					<Input type="text" v-model="item.level" placeholder="请输入级别" style="width:180px;margin-right: 20px;" class="gray-bg-input"></Input>
				</FormItem>
				<FormItem>
					<Input type="text" v-model="item.price" placeholder="请输入级别名称"  style="width:100px;" class="gray-bg-input"></Input>
				</FormItem>
				<span style="color:rgb(167, 167, 167);line-height:32px;display:inline-block;">/小时</span>
				<FormItem>
					<Select v-model="item.unit" style="width:180px;margin-right: 20px;margin-left: 20px;" placeholder="请选择货币类型" class="gray-bg-input">
						<Option v-for="(items, index) in unitTypeList" :key="index" :value="items.value">{{ items.label }}</Option>
					</Select>
				</FormItem>
				<span style="color:rgb(255, 50, 50);line-height:32px;display:inline-block;float:right;font-size:14px;cursor:pointer;" @click="onclickDeleteLevel(index, item)">删除</span>
			</Form>
		</modal>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import { wait, currencyLogogram, } from '../../libs//util'
import valid, { errors, plRateUser, plRateLevel, sys, } from '../../libs//request';
import TopTitleAndButton from '../../components/topTitleAndButton';
export default {
	name: 'Rate',
	components: {
		TopTitleAndButton,
	},
	filters: {
		currencyLogogram,
	},
	data() {
		return {
			searchVal: null,
			pageTotal: null,
			pageSize: 10,
			pageNo: 1,
			// 批量修改
			modalBatchEdit: false,
			BatchEditList: [],
			// 是否是批量修改
			isBatch: false,
			// 级别设置
			modalLevelEdit: false,
			// 级别设置的列表
			levelEditList: null,
			// 货币字典
			unitTypeList: null,
			// 添加级别
			addLevel: null,
			// 临时列表
			countPlus: 0,
			// levelId
			levelId: null,
			// 排序条件
			filterOptions: null,
			addLevels: {
				level: null,
				price: null,
				unit: null,
			},
			ruleLevel: {
				level: [
					{ required: true, message: '请输入级别名称', trigger: 'blur' }
				],
				price: [
					{ required: true, message: '请输入价格.', trigger: 'blur' },
				],
				unit: [
					{ required: true, message: '请选择货币类型', trigger: 'blur' },
				]
			},
			ruleLevels: {
				level: [
					{ required: true, message: '请输入级别名称', trigger: 'blur' }
				],
				price: [
					{ required: true, message: '请输入价格.', trigger: 'blur' },
				],
				unit: [
					{ required: true, message: '请选择货币类型', trigger: 'blur' },
				]
			},
			columnsTable: [
				{
					type: 'selection',
					width: 60,
					'align': 'center',
				},
				{
					"title": "姓名",
					"key": "userName",
					'align': 'center',
				},
				{
					"title": "级别",
					"key": "levelName",
					'align': 'center',
					filters: [],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
				},
				{
					"title": "服务费/小时",
					"key": "unitPrice",
					'align': 'center',
				},
				{
					"title": "更新时间",
					"key": "updateDate",
					'align': 'center',
					"sortable": true
				},
				{
					"title": "操作",
					"key": "click",
					'align': 'center',
					render: (h, params) => {
						return h('div', {
							style: {
								color: ' #44bcb7',
								cursor: 'pointer',
							},
							on: {
								click: () => {
									const data = [];
									data.push(params.row);
									this.BatchEditList = data;
									this.modalBatchEdit = true;
								},
							},
						}, '修改');
					}
				},
			],
			dataTable: [],
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		/*
		* 搜索报账人
		*/
		searchmembers() {
			this.getRateList({
				userName: this.searchVal,
			});
		},
		/*
		* 获取 rate 列表
		*/
		getRateList(data) {
			this.updateLoadingStatus({ isLoading: true });
			plRateUser.list(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					const rdata = res.data.data;
					this.pageTotal = rdata.count;
					// this.pageTotal = 199;
					this.pageNo = rdata.pageNo;
					this.pageSize = rdata.pageSize;
					this.dataTable = rdata.list;
					this.dataTable.forEach((item, index) => {
						item.unitPrice = item.unit ? (`${item.unit.split('-')[0]} ${item.price}/h`) : `N/A`;
						item.levelName = item.levelName ? item.levelName : 'N/A';
						item.updateDate = item.updateDate ? item.updateDate : 'N/A';
					});
					console.log('this.dataTable_____', this.dataTable);
				}
			}).catch(errors.call(this)).finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		/*
		* 获取账单级别费率设置列表
		*/
		getLevelEditList(data) {
			plRateLevel.list(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.levelEditList = res.data.data;
					this.addLevel = res.data.data;
					/*
					* render 函数 参数的渲染
					*/
					let renderFilter = [];
					this.levelEditList.forEach((item, index) => {
						renderFilter.push({
							label: item.level,
							value: item.id,
						});
					});
					this.columnsTable[2].filters = renderFilter;
				}
			}).catch(errors.call(this)).finally(() => {
			});
		},
		/*
		* 点击批量修改
		*/
		onclickBtnsOne() {
			this.modalBatchEdit = true;
			this.isBatch = true;
		},
		/*
		* 点击级别设置
		*/
		onclickBtnsTwo() {
			this.modalLevelEdit = true;
		},
		/*
		* 点击保存 批量修改 或 单个修改
		*/
		batchEditOk() {
			this.BatchEditList.forEach(item => {
				delete item.unitPrice;
				delete item._index;
				delete item._rowKey;
				delete item.levelName;
				item.updateDate = new Date().format('yyyy-MM-dd hh:mm:ss');
			});
			if (this.BatchEditList.length > 1) {
				plRateUser.saveBatch(this.BatchEditList).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.$Message.success('批量修改成功');
						this.getRateList({
							pageNo: this.pageNo,
							pageSize: this.pageSize,
						});
					}
				});
			} else {
				plRateUser.save(this.BatchEditList[0]).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.$Message.success('修改成功');
						this.getRateList({
							pageNo: this.pageNo,
							pageSize: this.pageSize,
						});
					}
				});
			}
			this.isBatch = false;
			this.modalBatchEdit = false;
			this.BatchEditList = [];
		},
		batchEditCancle() {
			this.modalBatchEdit = false;
			this.isBatch = false;
			this.BatchEditList = [];
			this.handleSelectAll(false);
		},
		/*
		* 级别设置
		*/
		onclickAddLevel() {
			let validRes = true;
			this.$refs.addLevels.validate((valid) => {
				validRes = valid;
			});
			if (!validRes) {
				return false;
			}
			this.addLevels.createDate = new Date().format('yyyy-mm-dd hh:MM:ss');
			this.addLevels.updateDate = new Date().format('yyyy-mm-dd hh:MM:ss');
			this.addLevels.remarks = '';
			this.addLevels.id = '';
			this.addLevels.plBillUserSettingList= [];

			this.addLevel.push(this.addLevels);

			this.addLevels = {};
			
			this.countPlus = 0;

			this.levelOk('添加成功');
		},
		/*
		* 删除级别
		*/
		onclickDeleteLevel(index) {
			this.addLevel.splice(index, 1);
			this.levelOk('删除成功');
		},
		/*
		* 点击保存级别设置
		*/
		levelOk(msg) {
			msg = msg ? msg : '修改成功';
			/*
			* 直接保存 保存未添加项
			*/
			if (this.countPlus > 0 || (this.addLevels.level && this.addLevels.price && this.addLevels.unit)) {
				this.addLevel.push(this.addLevels);
				this.addLevels = {};
				this.countPlus = 0;
			}
			plRateLevel.saveBatch(this.addLevel).then(valid.call(this)).then( res => {
				if (res.ok) {
					this.$Message.success(msg);
					// 更新级别列表
					this.getLevelEditList({});
					this.getRateList({});
				}
			})
		},
		levelCancle() {
			this.addLevels = {};
		},
		/*
		* table 全选
		*/
		onSelectAll(res) {
			this.BatchEditList = res;
		},
		handleSelectAll(status) {
			this.$refs.table.selectAll(status);
		},
		/*
		* 处理接口的参数
		*/
		getOptions() {
			let data = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			this.levelId ? (data.levelId = this.levelId) : null;
			if (this.filterOptions) {
				data = Object.assign(data, this.filterOptions);
			}
			return data;
		},
		/*
		* table on-selection-change
		*/
		onSelectionChange(res) {
			this.BatchEditList = res;
		},
        onSortChange(obj) {
            if(obj.order == 'normal') {
				this.filterOptions = null;
				const datas = this.getOptions();
                this.getRateList(datas);
                return
            }
			this.filterOptions = {
				orderByType: obj.key,
                orderByStatus: obj.order,
			};
			const data = this.getOptions();
			this.getRateList(data);
		},
		onFilterChange(val) {
			// 级别的levelId
			this.levelId = val._filterChecked[0];
			const data = this.getOptions();
			this.getRateList(data);
		},
		/*
		* 点击下拉框 修改数据
		*/
		selectOnChane(val) {
			if(this.levelEditList) {
				this.BatchEditList.forEach((item) => {
					this.levelEditList.forEach((items) => {
						if (items.level === item.levelName) {
							item.unit = items.unit;
							item.price = items.price;
							item.levelId = items.id;
						}
					})
				})
			}
		},
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			const data = this.getOptions();
			this.getRateList(data);
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			const data = this.getOptions();
			this.getRateList(data);
		},
	},
	created() {
		this.getRateList({});

		this.getLevelEditList({});
		/*
		* 获取货币类型的字典
		*/
		sys.dictListData({
			type: 'pl_bill_unit',
		}).then(valid.call(this)).then(res => {
			if (res.ok) {
				this.unitTypeList = res.data.data;
			}
		});
	},
};
</script>