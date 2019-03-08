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
	.ivu-table-wrapper {
		border: none;
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
	.cross-list-container {
		z-index: 9999;
		position: absolute;
		right: -5px;
		top: 49px;
		width: 550px;
		max-height: 300px;
		padding: 20px 0px 20px 20px;
		box-sizing: border-box;
		border-radius: 4px;
		box-shadow: 0 2px 10px #e5e5e5;
		overflow-y: scroll;
		background: white;
		.ivu-checkbox-input {
			margin-right: 5px;
		}
		.ivu-checkbox-wrapper {
			width: 130px;
			margin-right: 0;
		}
		.cross-list-container::-webkit-scrollbar{
			display: none;
		}
	}
	.cross-list-container {
		.ivu-checkbox-group-item {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
</style>

<template>
	<div id="table-chose-to-show-boss">
		<div v-if="showMenu === 'show'" class="large-table-mask" @click="onclickMask"></div>

		<Input v-if="showSearchInput" v-model.trim="searchVal" icon="ios-search" :placeholder="placeholder" style="width: 396px" @on-click="onclickSearchInfos" @on-enter="onclickSearchInfos" class="docu-top-input"></Input>

		<CasebarFilter
			v-if="showTags"
			title="标签："
			:from="2"
			:menuId="pId"
			modelName="CRM模块"
			style="margin-bottom: 9px;"
			class="apply-info-casebar-filters"
			@tagListChange="tagListChange"
		></CasebarFilter>

		<div class="large-table-pandect" :style="{'margin-top': !showTags ? '0': '15px'}" >
			当前总计&nbsp;<span>{{total}}</span>
			<Dropdown class="export-exceil-button" @on-click="onclickExportExcel" v-if="exportExcel">
				<a href="javascript:void(0)">
					导出
				</a>
				<DropdownMenu slot="list">
					<DropdownItem name="0">导出所选</DropdownItem>
					<DropdownItem name="1">导出全部</DropdownItem>
				</DropdownMenu>
			</Dropdown>
            <div class="export-exceil-button" style="margin-right: 10px; color: #fff; cursor: pointer;" v-if="exportExcel && canImport" @click="onclickImportData">{{btnVal2}}</div>
			<div class="export-exceil-button" style="margin-right: 10px; color: #fff; cursor: pointer;" :style="{ marginRight: (isAdmin || isCeo) ? '10px' : '10px'}" v-if="btnVal1" @click="onClickBtn1">{{btnVal1}}</div>
			<div style="position: absolute; right:5px; top: 5px; width: 22px; height:22px; border: 1px solid #44bcb6;
				padding: 2px 4px 0 4px; border-radius: 3px; display: flex; cursor:pointer;" @click.stop="showSelected">
					<Icon type="funnel" style="font-size: 14px; color: rgb(68, 188, 182);"></Icon>
			</div>
			<div class="drop-list-container" v-if="false">
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
						:label="item.key">
						{{item.value}}
					</Checkbox>
				</CheckboxGroup>
			</div>
			<div class="cross-list-container" v-if="showMenu === 'show'">
				<div class="cross-list-container-must">
					<checkbox
						:value=true
						:disabled=true
						style="font-size: 14px; margin-bottom: 15px;">
						必选项
					</checkbox>
					<br>
					<Checkbox 
						v-for="(item, index) in checkBoxList"
						:key="index"
						v-if="item && item.isSys === '1'"
						disabled
						:value=true
						:label="item.key">
						{{item.value}}
					</Checkbox>
				</div>
				<div class="cross-list-container-choose" v-if="canChooseCheck">
					<checkbox
						:age="indeterminate"
						v-model="checkAll"
						@click.prevent.native="handleCheckAll"
						style="font-size: 14px; margin-bottom: 15px; margin-top: 10px;">
						可选项
					</checkbox>
					<br>
					<CheckboxGroup v-model="tableColumnsChecks" @on-change="changeTableColumns">
						<Checkbox 
							v-for="(item, index) in checkBoxList"
							:key="index"
							v-if="item && item.isSys !== '1'"
							:label="item.key">
							{{item.value}}
						</Checkbox>
					</CheckboxGroup>
				</div>
			</div>
		</div>
		<p style="border-bottom: solid 0.5px #e9eaec;"></p>
		<Table
			v-if="isShow"
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
						<Checkbox v-for="(item, index) in copy_exportChecks" :key="index" v-model="item.check" @on-change="onclickChockItem(item.check, index)">{{item.value}}</Checkbox>
					 </div>
				</div>
				<div>
					<p class="modal-select-title">已选字段</p>
					 <div class="modal-select-common modal-select-selected">
						 <p v-for="(item, index) in copy_exportChecks" :key="index" v-if="item.check">{{item.value}}</p>
					 </div>
				</div>
			</div>
		</Modal>
	</div>
</template>
<script>
    import Vue from 'vue';
	import { waitUntil, } from '@public/libs/util';
	import CasebarFilter from '@public/modules/caseBarFilter';
	import {mapGetters,mapState, mapMutations, } from 'vuex';
	import valid, {errors, common, sys, attendanceManageApi } from "../libs/request";
    export default {
		props: {
			// 是否显示搜索框
			showSearchInput: {
				type: Boolean,
				default: true,
			},
			// 是否显示导入按钮
			canImport: {
				type: Boolean,
				default: true,
			},
			// 列表的类型, crm模块需要
			types: {
				type: String,
				dafault: 'resource',
			},
			// 模块ID
			pId: {
				type: String,
				required: true,
			},
			// 搜索框的 placeholder
			placeholder: {
				type: String,
				default: '请输入客户编号/姓名',
			},
			// 按钮一文案
			btnVal1: {
				type: String,
				default: '',
			},
			// 按钮二文案
			btnVal2: {
				type: String,
				default: '导入',
			},
			// 是否显示标签列表
			showTags: {
				type: Boolean,
				default: true,
			},
			// 数据项总数
			total: {
				default: 0,
			},
			// 固定显示项
			// 这个 prop 的意义是将 姓名 和 编号 从用户信息列独立出来(依照原型);
			fixedHeader: {
                type: Array,
                default: () => {
                    return [];
                },
			},
			/*
			* 是否是多级表单 暂只支持 二级
			*/
			multipleHead: {
				type: Boolean,
				default: false,
			},
			// 列表数据
			tableData2: { // 数据
				type: Array,
				default: () => {
					return [];
				},
			},
			// 表头数据
			table2ColumnList: {
				type: Array,
				default: () => {
					return [];
				},
			},
			// checkbox 已选择
			tableColumnsChecked: {
				type: Array,
				default: () => {
					return [];
				},
			},
			 // CheckBox 所有选项
			checkBoxList: {
				type: Array,
				default: () => {
					return [];
				},
			},
			// 是否显示导出按钮
			exportExcel: {
				type: Boolean,
				default: false,
			},
			// 页面的查询信息 比如 搜索的关键字; 页码; pageSize, 列表的filters; 列表的sortalbe
			getInfoData: {
				type: Object,
				default: () => {
					return {};
				},
			},
			// 是否显示loading
			loading: {
				type: Boolean,
				default: false,
			},
			// 是否有操作选项 如果有的话 数据回传的时候 要将这列先行删去
			hasCaoZuo: {
				type: Boolean,
				default: false,
			},
		},
		components: {
			CasebarFilter,
		},
        data () {
            return {
				isShow: true, // table 显示还是隐藏
				searchVal: '', // 搜索框 关键字
				indeterminate: false,
				checkAll: false, // 是否全选
				showMenu: 'hide', // 筛选下拉框显示时的 mask
				tableColumns2: [], // 列表的表头
				tableColumnsChecks: [], // Array<string> 已选中的显示项
				thisTableData: [], // 列表的数据
				selection: [], // 选中项
				indexs: 0, // 计数
				exportModal: false, // 导出的modal
                m_indeterminate: false,
				m_checkAll: false, // 导出 modal 的全选
				m_allChecks: [], // 导出 modal 所有选项
				copy_exportChecks: [], // copy
				ids: '', // 选中人的id
				resInfoColVOS: [], // 筛选条件
				getInfoDatas: null,
				exportAll: false, // 是否导出全部
				mustCheck: [], // 必选项
				chooseCheck: [], // 可选项
				canChooseCheck: true, // 是否 显示 可选项
            }
		},
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
			}),
			...mapGetters('salary', ['isAdmin', 'isCeo',]),
		},
		watch: {
            checkAll() {
                const _this = this;
                setTimeout(() => {
					_this.checkBoxList.forEach((item,index) => {
						if(item.isSys === '1') Vue.set(_this.checkBoxList[index], 'isCheck', '1');
					});
                }, 1000);
			},
			tableColumns2(newVal) {
				setTimeout(()=>{ this.isShow = true; }, 0);
			},
		},
		created() {
			document.addEventListener('click', this.clickToHideDropList);
		},
		mounted() {
			waitUntil(() => {
				return !!this.checkBoxList.length;
			}, () => {
				let index = 0;
				this.getTableCheckColumns();
				this.checkBoxList.forEach(item => {
					if (item.isCheck === '1') {
						this.mustCheck.push(item); // 必选项
					} else {
						this.chooseCheck.push(item); // 可选项
					}
					if (item.isSys === '0') index++;
				});
				if (index === 0) this.canChooseCheck = false;
			});
		},
        methods: {
			onclickSearchInfos() {
				this.$emit('onclickSearchInfos', this.searchVal);
			},
			tagListChange(val) {
				this.$emit('onclickToChoseTags', val);
			},
			onclickImportData() {
				this.$emit('onclickImportData');
			},
			onClickBtn1() {
				this.$emit('onClickBtn1');
			},
            getTableCheckColumns() {
				let index = 0; // 固定的表头并不显示在已选择的选项中
				this.tableColumnsChecked.forEach(item => {
					if(item.isCheck === '1') {
						index++;
						this.tableColumnsChecks.push(item.key);
					}
				});

				// this.fixedHeader.forEach(index => { // 固定项默认选中
				// 	this.tableColumnsChecks.push(this.table2ColumnList[index].key)
				// });

				if (index === this.tableColumnsChecked.length) { // 数据初次加载的时候 判断是否全选
					this.checkAll = true;
				} else {
					this.checkAll = false;
				}
				this.tableColumns2 = this.getTable2Columns();
			},
			/*
			* 全选 列表显示项
			*/
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
                    const newArr = [];
					this.checkBoxList.forEach(item => {
						if(item.isSys === '1' && item.isCheck === '1') newArr.push(item.key);
					});
                    this.tableColumnsChecks = newArr;
				}
                this.dealCheckedColumnDatas(this.tableColumnsChecks);
				this.tableColumns2 = this.getTable2Columns();
			},
			onclickMask() {
				this.showMenu = 'hide';
			},
			/*
			* 处理表头数据 core
			*/
            getTable2Columns () {
				this.indexs++;
				let data = [];
				let tempArr = JSON.parse(JSON.stringify(this.tableColumnsChecks)); // Array<string>
				if (!this.multipleHead) {
					// 获取固定的表头
					this.fixedHeader.forEach(index => {
						data.push(this.table2ColumnList[index]);
						const indexs = tempArr.indexOf(this.table2ColumnList[index].key);
						tempArr.splice(indexs, indexs + 1);
					});
					this.table2ColumnList.forEach((item, index) => {
						if (this.indexs <= 1) {
							this.m_allChecks.push(item);
						}
						for (let j = 0; j < tempArr.length; j++) { // 选中项
							if (item.key === tempArr[j]) {
								tempArr.splice(j, 1);
								data.push(item);
							}
						}
					});
				} else { // 二级表头
					this.isShow = false;
					const tempTableColumn = this.deepClone(this.table2ColumnList);
					// 获取固定的表头 默认固定项是 第一项 和 第二项
					this.fixedHeader.forEach(index => {
						data.push(tempTableColumn[0]);
						const indexs = tempArr.indexOf(tempTableColumn[0].key);
						tempArr.splice(indexs, indexs + 1); // 去掉 显示项 里面的 固定项
						tempTableColumn.splice(0, 1);
					});
					// 获取其他的显示项
					tempTableColumn.forEach((item, index) => {

						if (this.indexs <= 1) {
							if (item.children) {
								item.children.forEach(items => this.m_allChecks.push(items));
							} else {
								this.m_allChecks.push(item);
							}
						}

						for (let j = 0; j < tempArr.length; j++) { // Array<string>
							if (item.key === tempArr[j]) { // 二级表头的 key 一般不匹配
								tempArr.splice(j, 1);
								data.push(item);
							}
							if (item.children) {
								const tempItem = this.deepClone(item);
								tempItem.children = [];
								item.children.forEach(items => {
									if (items.key === tempArr[j]) {
										tempArr.splice(j, 1);
										tempItem.children.push(items);
										let tempIndex = -1;
										data.forEach((dataItem, index) => { // 判断 当前数组 是否已经 存储 该二级表头
											if (dataItem.title === tempItem.title) tempIndex = index;
										});
										tempIndex >= 0 ? data.splice(tempIndex, 1, tempItem) : data.push(tempItem);
									}
								});
							}
						}
					});
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

				if (this.exportExcel && data[0].type !== 'selection') { // 添加多选
					data.unshift(
						{
							type: 'selection',
							fixed: "left",
							width: 60,
							align: 'center'
                     	}
					);
				}
				return data;
			},
			/*
			* CheckBox change 筛选显示的列表项
			*/
            changeTableColumns (data) {
				if (data) this.dealCheckedColumnDatas(data); // 上传数据

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
			/*
			* checkbox 变化处理数据 添加必选项与可选项
			*/
			dealCheckedColumnDatas(data) {
				this.checkBoxList.forEach(item => {
					if (item.isSys !== '1') {
						item.isCheck = '0';
					} else {
						item.isCheck = '1';
					}
				});

				data.forEach(item => {
					this.checkBoxList.forEach(items => {
						if (items.key === item) items.isCheck = '1';
					});
				});

				const tempArr = JSON.parse(JSON.stringify(this.checkBoxList));
				this.hasCaoZuo && tempArr.pop();
				this.$emit('getchangedCheckedItem', tempArr);
			},
			/*
			* 多选 列表数据
			*/
			onSelectionChange(selection) {
				this.selection = selection;
				const arr = [];
				this.selection.forEach(item => {
					arr.push(item.userId);
				});
				this.ids = arr.join();
			},
			/*
			* export modal
			* 确认导出
			* 取消导出
			* 点击每一个导出项
			* 点击全选
			* 导出表单
			*/
			exportModalOk() {
				const datas = [...this.tableColumnsChecked];
				let resInfoColVOS = '';
				let count = 0;
				datas.forEach(item => item.isCheck = '0');
				this.copy_exportChecks.forEach((item, index)  => {
					if (item.check === true) {
						datas.forEach(items => {
							if (items.key === item.key) {
								items.isCheck = '1';
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
					data = Object.assign({ resInfoColVOS, }, { ids: '', }, this.getInfoDatas);
				} else {
					data = Object.assign({ ids: this.ids, }, { resInfoColVOS, }, this.getInfoDatas);
				}
				this.$emit('exportExcel', data);
				// window.open(attendanceManageApi.exportExcel(data));
				this.resetDatas();
			},
			exportModalCancel() {
				this.resetDatas();
			},
			onclickChockItem(val, indexs) {
				this.copy_exportChecks.forEach((item,index) => {
					if (index === indexs) {
                        Vue.set(this.copy_exportChecks[index], 'check', val);
					}
				});
				if (this.copy_exportChecks.every(item => item.check === true)) {
					this.m_checkAll = true;
				} else {
					this.m_checkAll = false;
				}
			},
            m_handleCheckAll () {
				this.m_checkAll = !this.m_checkAll;
                if (this.m_checkAll) {
					this.copy_exportChecks.forEach(item => item.check = true );
                } else {
					this.copy_exportChecks.forEach(item => item.check = false );
				}
            },
			onclickExportExcel(data) {
				this.copy_exportChecks = JSON.parse(JSON.stringify(this.checkBoxList));;
				this.hasCaoZuo && this.copy_exportChecks.pop(); // 去除 操作 选项
				this.copy_exportChecks.forEach((item,index) => {
                    Vue.set(this.copy_exportChecks[index], 'check', false);
                    Vue.set(this.copy_exportChecks[index], 'title', item.name);
				});

				this.getInfoDatas = this.getInfoData; // 获取 table 的条件筛选项
				if (data === '0') { // 导出所选
					if (!this.selection.length) {
						this.$Message.error('请勾选需要导出的数据');
						return;
					}
					this.exportModal = true;
					this.m_checkAll = false;
				} else { // 导出全部
					this.exportAll = true;
					this.exportModal = true;
					this.$refs.selection.selectAll(true); // 选中表中所有人员
					this.m_checkAll = true;
					this.copy_exportChecks.forEach(item => item.check = true );
				}
			},
			/*
			* 数据重置
			*/
			resetDatas() {
				this.ids = '';
				this.exportAll = false;
				this.m_checkAll = false;
				this.copy_exportChecks.forEach(item => item.check = false );
				this.$refs.selection.selectAll(false);
			},
			/*
			* 深拷贝
			*/
			deepClone(source) {
				const targetObj = source.constructor === Array ? [] : {};
				for(let keys in source) {
					if(source.hasOwnProperty(keys)) {
						if(source[keys] && typeof source[keys] === 'object') {
							targetObj[keys] = source[keys].constructor === Array ? [] : {};
							targetObj[keys] = this.deepClone(source[keys]);
						} else {
							targetObj[keys] = source[keys];
						}
					}
				}
				return targetObj;
			},
		},
		beforeDestroy() {
			document.removeEventListener('click', this.clickToHideDropList);
		},
	};
</script>