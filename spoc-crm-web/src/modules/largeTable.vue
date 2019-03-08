<style lang="less">
	#table-chose-to-show-boss {
		// margin-top: 20px;
		.drop-list-container{
			position: absolute;
			right: -5px;
			top: 38px;
			// min-width: 80px;
			// max-width: 140px;
			min-height: 150px;
			max-height: 400px;
			overflow: hidden;
			overflow-y: scroll;
			z-index: 999;
			background: #fff;
			padding: 0 10px;
			box-sizing: border-box;
			border: solid 1px #e5e5e5;
			.ivu-checkbox-group-item {
				display: block;
			}
		}
		.drop-list-container::-webkit-scrollbar{
			display: none;
		}
	}
	.ivu-table-filter-select-item {
		text-align: center;
	}
	.large-table-border-none {
		border-left: none;
		.ivu-table {
			&::after {
				content: none;
			}
		}
		.ivu-table-cell {
			color: #333;
		}
	}
	.large-table-mask {
		width:100%;
		height:100%;
		background:rgba(0,0,0,0);
		position:fixed;
		left:0;
		top:0;
		z-index:99;
	}
	.large-table-pandect {
		line-height: 32px;
		height: 32px;
		color:#333;
		font-size:14px;
		margin: 15px 0 15px 0;
		position: relative;
		>span {
			color:#44bcb7;
			font-size:18px;
			font-weight:
			bold;margin-left:5px;
		}
	}
	.docu-top-input {
			margin-bottom: 15px;
	}
	.export-exceil-button {
		background-color: #44bcb7;
		padding: 0 20px;
		float: right;
		margin-right: 50px;
		border-radius: 5px;
		text-align: center;
		a {
			color: #fff !important;
		}
	}
	.modal-select {
		display: flex;
		justify-content: space-between;
		>div {
			width: 50%;
			box-sizing: border-box;
			background-color: #f8f8f9;
			border:1px solid #e9eaec;
			.modal-select-title {
				color: #333;
				display: inline-block;
				padding-left: 15px;
				height: 35px;
				width: 100%;
				line-height: 35px;
				font-size: 16px;
				border-bottom: 1px solid #e9eaec;
				position: relative;
				> label {
					right: 15px;
					position: absolute;
				}
			}
		}
		.modal-select-common {
			padding: 10px;
			label {
				font-size: 14px;
				line-height: 35px;
				width: 50%;
				margin-right: 0px;
				float: left;
			}
			p {
				font-size: 14px;
				line-height: 35px;
				width: 50%;
				margin-right: 0px;
				float: left;
			}
		}

	}
	.select-modal{
		.ivu-modal-body {
			max-height: 400px;
			overflow: hidden;
			overflow-y: scroll;
		}
	}
</style>

<template>
	<div id="table-chose-to-show-boss">
		<div v-if="showMenu === 'show'" class="large-table-mask" @click="onclickMask"></div>
		<Input v-model.trim="searchVal" icon="ios-search" :placeholder="placeholder" style="width: 396px" @on-click="onclickSearchInfos" @on-enter="onclickSearchInfos" class="docu-top-input"></Input>

		<CasebarFilter
			v-if="tagShow&&showTags"
			title="标签："
			:from="2"
			:menuId="pId"
			modelName="CRM模块"
			style="margin-bottom: 9px;"
			class="apply-info-casebar-filters"
			@tagListChange="tagListChange"
		></CasebarFilter>

		<div class="large-table-pandect" :style="{'margin-top': !showTags ? '0': '15px'}" >
			为您找到&nbsp;<span>{{total}}</span>&nbsp;条数据
			<Dropdown class="export-exceil-button" @on-click="onclickExportExcel" v-if="(isAdmin || isCeo) && exportExcel">
				<a href="javascript:void(0)">
					导出
				</a>
				<DropdownMenu slot="list">
					<DropdownItem name="0">导出所选</DropdownItem>
					<DropdownItem name="1">导出全部</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<div style="position: absolute; right:5px; top: 5px; width: 22px; height:22px; border: 1px solid #44bcb6;
				padding: 2px 4px 0 4px; border-radius: 3px; display: flex; cursor:pointer;" @click.stop="showSelected">
					<Icon type="funnel" style="font-size: 14px; color: rgb(68, 188, 182);"></Icon>
			</div>
			<div v-if="showMenu === 'show'" class="drop-list-container">
				<checkbox
					:age="indeterminate"
					v-model="checkAll"
					@click.prevent.native="handleCheckAll">
					全选
				</checkbox>
				<CheckboxGroup v-model="tableColumnsChecks" @on-change="changeTableColumns">
					<Checkbox 
						v-for="(item, index) in checkBoxList"
						:key="index"
						:disabled="item.disabled"
						:label="item.key">
						{{item.name}}
					</Checkbox>
				</CheckboxGroup>
			</div>
		</div>
		<p style="border-bottom: solid 0.5px #e9eaec;"></p>
		<Table
			ref="selection"
			:data="tableData2"
			:columns="tableColumns2"
			:loading="loading"
			@on-sort-change="onSortChange"
			@on-filter-change="onFilterChange"
			@on-selection-change="onSelectionChange"
			class="large-table-border-none">
		</Table>
		<Modal
			width=832
			ref='modalExport'
			v-model="exportModal"
			title="选择导出字段"
			@on-ok="exportModalOk"
			@on-cancel="exportModalCancel"
			class="select-modal">
			<div class="modal-select">
				<div>
					<p class="modal-select-title">所有字段
						<Checkbox
							class="title-check-all"
							:age="m_indeterminate"
							v-model="m_checkAll"
							@click.prevent.native="m_handleCheckAll">全选
						</Checkbox>
					</p>
					 <div class="modal-select-common modal-select-select">
						<Checkbox v-for="(item, index) in c_allChecks" :key="index" v-model="item.check" @on-change="onclickChockItem(item.check, index)">{{item.title}}</Checkbox>
					 </div>
				</div>
				<div>
					<p class="modal-select-title">已选字段</p>
					 <div class="modal-select-common modal-select-selected">
						 <p v-for="(item, index) in c_allChecks" :key="index" v-if="item.check">{{item.title}}</p>
					 </div>
				</div>
			</div>
		</Modal>
	</div>
</template>
<script>
	import { waitUntil, } from '@public/libs/util';
	import CasebarFilter from '@public/modules/caseBarFilter';
	import {mapGetters,mapState, mapMutations, } from 'vuex';
	import valid, {errors, common, sys, crmStatistics } from "../libs/request";
    export default {
		props: {
			types: {
				type: String,
				dafault: 'resource',
			},
			tagShow:{
				type: Boolean,
				default: true,
			},
			pId: {
				type: String,
				required: true,
			},
			placeholder: {
				type: String,
				default: '请输入客户编号/姓名',
			},
			showTags: {
				type: Boolean,
				default: true,
			},
			total: {
				default: 0,
			},
			fixedHeader: { // 固定显示项
				type: String,
			},
			tableData2: { // 数据
				type: Array,
				default: () => {
					return [];
				},
			},
			table2ColumnList: { // 表头
				type: Object,
				default: () => {
					return {};
				},
			},
			tableColumnsChecked: { // checkbox 已选择
				type: Array,
				default: () => {
					return [];
				},
			},
			checkBoxList: { // CheckBox 所有选项
				type: Array,
				default: () => {
					return [];
				},
			},
			exportExcel: {
				type: Boolean,
				default: false,
			},
			getInfoData: {
				type: Object,
				default: () => {
					return {};
				},
			},
			loading: {
				type: Boolean,
				default: false,
			},
		},
		components: {
			CasebarFilter,
		},
        data () {
            return {
				searchVal: '',
				indeterminate: false,
				checkAll: false,
				showMenu: 'hide',
				tableColumns2: [],
				tableColumnsChecks: [],
				thisTableData: [],
				selection: [],
				indexs: 0,
				exportModal: false,
                m_indeterminate: false,
				m_checkAll: false,
				m_allChecks: [], // 所有选项
				c_allChecks: [], // copy
				ids: '', // 选中人的id
				resInfoColVOS: [], // 筛选条件
				getInfoDatas: null,
				exportAll: false,
            }
		},
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
			}),
			...mapGetters('crm',['isAdmin', 'isCeo',]),
		},
		watch: {
			tableColumnsChecked(newVal) { // listShowTitle 获取到的数据
				let index = 0; // 固定的表头并不显示在已选择的选项中
				newVal.forEach(item => {
					if(item.ischeck === '1') {
						index++;
						this.tableColumnsChecks.push(item.key);
					}
				});
				if (index === newVal.length) this.checkAll = true; // 数据初次加载的时候 判断是否全选
				this.tableColumns2 = this.getTable2Columns();
			},
			table2ColumnList(newVal) {
				this.checkAll = false;
				this.indeterminate = false;
				this.tableColumns2 = this.getTable2Columns();
			},
		},
		created() {
			document.addEventListener('click', this.clickToHideDropList);
		},
		mounted() {
			this.getTable2Columns()
		},
        methods: {
			onclickSearchInfos() {
				this.$emit('onclickSearchInfos', this.searchVal);
			},
			tagListChange(val) {
				this.$emit('onclickToChoseTags', val);
			},
			handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
					const newArr = [];
					this.checkBoxList.forEach(item => newArr.push(item.key));
                    this.tableColumnsChecks = newArr;
                } else {
                    this.tableColumnsChecks = [];
				}
				this.dealCheckedColumnDatas(this.tableColumnsChecks);
				this.tableColumns2 = this.getTable2Columns();
			},
			onclickMask() {
				this.showMenu = 'hide';
			},
			/*
			* 处理表头数据
			*/
            getTable2Columns () {
				this.indexs++;
				let data = [];
                 // 获取固定的表头
				data = [this.table2ColumnList[this.fixedHeader]];
				let [ ...tempArr ] = this.tableColumnsChecks;
				for (let k in this.table2ColumnList) { // 点击选择要显示的表头时 保持原来的位置

					if (this.indexs <= 1) this.m_allChecks.push(this.table2ColumnList[k]); // 获取modal内的所有字段

					for (let j = 0; j < tempArr.length; j++) {
						if (k !== tempArr[j] || k === this.fixedHeader) {
							continue;
						} else {
							tempArr.splice(j, 1);
							data.push(this.table2ColumnList[k]);
						}
					}
				}

				if (this.indexs <= 1) {
					this.m_allChecks.forEach((item, index) => {
						this.m_allChecks[index] = {
							key: item.key,
							title: item.title,
							check: false,
						};
					});
				}

				if (this.exportExcel) { // 添加多选
					data.unshift(
						{
							type: 'selection',
							fixed: "left",
							width: 30,
							align: 'center'
                     	}
					);
				}
                return data;
			},
			/*
			* CheckBox change
			*/
            changeTableColumns (data) {
				if (data) this.dealCheckedColumnDatas(data);

				data = data ? data : this.getTable2Columns();
                if (data.length === this.checkBoxList.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
				}
				this.tableColumns2 = this.getTable2Columns();
            },
			showSelected() {
				this.showMenu = this.showMenu === 'hide' ? 'show' : 'hide';
			},
			onSortChange(val) {
				this.$emit('onSortChange', val.key, val.order);
			},
			onFilterChange(val) {
				if (val.key === 'phase') {
					let tempInfo = null;
					val.filters.forEach(item => {
						if (item.value === val._filterChecked[0]) {
							tempInfo = item.filterKey;
						}
					});
					this.$emit('onFilterChange', val.key, tempInfo);
				} else {
					this.$emit('onFilterChange', val.key, val._filterChecked[0]);
				}
			},
			// 处理表头
			handleColumn() {
				const tempArr = [];
				const obj =  Object.assign({}, this.table2ColumnList);
				for(const k in obj) {
					tempArr.push(obj[k]);
				}
				return tempArr;
			},
			/*
			* checkbox 变化处理数据
			*/
			dealCheckedColumnDatas(data) {
				let datas = [ ...this.checkBoxList ];
				
				datas.forEach(item => item.ischeck = '0');

				data.forEach(item => {
					datas.forEach(items => {
						if (items.key === item) items.ischeck = '1';
					});
				});
				this.$emit('getchangedCheckedItem', {list:[ ...datas ], });
			},
			/*
			* 多选
			*/
			onSelectionChange(selection) {
				this.selection = selection;
				const arr = [];
				this.selection.forEach(item => {
					arr.push(item.id);
				});
				this.ids = arr.join();
			},
			/*
			* modal
			*/
			exportModalOk() { // 确认导出
				const datas = [...this.tableColumnsChecked];
				let resInfoColVOS = '';
				let count = 0;
				datas.forEach(item => item.ischeck = '0');
				this.c_allChecks.forEach((item, index)  => {
					if (item.check === true) {
						datas.forEach(items => {
							if (items.key === item.key) {
								items.ischeck = '1';
								resInfoColVOS += item.key + ','
								count++;
							}
						});
					}
				});
				if (count <= 1) {
					this.$Message.error('至少选中两列属性导出');
					this.exportModal = true;
					this.$refs.modalExport.visible = true;
					return;
				}
				let data = {};
				if (this.exportAll) {
					data = Object.assign({ resInfoColVOS, }, this.getInfoDatas);
				} else {
					data = Object.assign({ ids: this.ids, }, { resInfoColVOS, }, this.getInfoDatas);
				}
				window.open(crmStatistics.exportResinfo(data));
				this.resetDatas();
			},
			exportModalCancel() {
				this.resetDatas();
			},
			onclickChockItem(val, indexs) { // 点击每一个 checkbox
				this.c_allChecks.forEach((item,index) => {
					if (index === indexs) {
						item.check = val;
					}
				});
				if (this.c_allChecks.every(item => item.check === true)) {
					this.m_checkAll = true;
				} else {
					this.m_checkAll = false;
				}
			},
            m_handleCheckAll () { // 点击全选
				this.m_checkAll = !this.m_checkAll;
                if (this.m_checkAll) {
					this.c_allChecks.forEach(item => item.check = true );
                } else {
					this.c_allChecks.forEach(item => item.check = false );
				}
            },
			/*
			* 导出表单
			*/
			onclickExportExcel(data) {
				this.c_allChecks = [...this.checkBoxList];
				this.c_allChecks.forEach(item => {
					item.check = false;
					item.title = item.name;
					item.key = item.key;
				});
				this.getInfoDatas = this.getInfoData; // 获取 table 的条件筛选项
				if (data === '0') { // 导出所选
					if (!this.selection.length) {
						this.$Message.error('请勾选需要导出的销售人员');
						return;
					}
					this.exportModal = true;
					this.m_checkAll = true;
					this.c_allChecks.forEach(item => item.check = true );
				} else { // 导出全部
					this.exportAll = true;
					this.exportModal = true;
					this.$refs.selection.selectAll(true); // 选中表中所有人员
					this.m_checkAll = true;
					this.c_allChecks.forEach(item => item.check = true );
				}
			},
			resetDatas() {
				this.ids = '';
				this.exportAll = false;
				this.m_checkAll = false;
				this.c_allChecks.forEach(item => item.check = false );
				this.$refs.selection.selectAll(false);
			},
        },
    };
</script>
