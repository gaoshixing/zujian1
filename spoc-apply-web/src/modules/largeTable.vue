<style lang="less">
	.table-chose-to-show-boss {
		.drop-list-container{
			position: absolute;
			right: 0px;
			top: 38px;
			min-width: 110px;
			max-width: 180px;
			min-height: 150px;
			max-height: 400px;
			overflow: hidden;
			overflow-y: scroll;
			z-index: 999;
			background: #fff;
			padding: 0 10px;
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
			color:red;
			font-size:16px;
			font-weight:
			bold;margin-left:5px;
		}
	}
	.large-table-edit-button {
		float: right;
		margin-right: 85px;
	}
</style>

<template>
	<div class="table-chose-to-show-boss">
		<div v-if="showMenu === 'show'" class="large-table-mask" @click="onclickMask"></div>
		<div class="large-table-pandect">
			{{tableTitle}}<span>{{total}}</span>
			<div style="position: absolute; right: 15px; top: 0; width: 52px; height:32px; display: flex; justify-content: space-around;
				border: 1px solid #44bcb6; border-radius: 5px;" @click.stop="showSelected">
				<Icon type="funnel" style="font-size: 17px; margin-top:7px; color: #44bcb6;"></Icon>
			</div>
			<Button v-if="edit" :type="buttonText === '编辑' ? 'primary' : 'success'" class="large-table-edit-button" @click="onclickEditLargeTable">{{buttonText}}</Button>
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
						:label="item.label">
						{{item.name}}
					</Checkbox>
				</CheckboxGroup>
			</div>
		</div>
		<Table 
			:data="tableData2"
			:columns="tableColumns2"
			@on-sort-change="onSortChange"
			@on-filter-change="onFilterChange"
			class="large-table-border-none">
		</Table>
	</div>
</template>
<script>
	import { waitUntil, } from '@public/libs/util';
    export default {
		props: {
			edit: {
				type: Boolean,
				default: false,
			},
			tableTitle: {
				type: String,
				default: '当前统计',
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
					return [];
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
		},
        data () {
            return {
				isEditing: false, // 是否点击了编辑按钮
				buttonText: '编辑',
				indeterminate: false,
				checkAll: false,
				showMenu: 'hide',
				tableColumns2: [],
				tableColumnsChecks: [],
				thisTableData: [],
				tempThisTableData: [],
				edittingStore: [],
				tempTable2ColumnListRender: {},
            }
		},
		watch: {
			tableData2() {
				this.init();
			},
			tableColumnsChecked(newVal) {
				if (newVal.length === this.checkBoxList.length) this.checkAll = true;
				this.tableColumnsChecks = newVal;
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
        methods: {
			// 点击编辑按钮
			onclickEditLargeTable() {
				const vm = this;
				if (vm.buttonText === '编辑') {
					vm.isEditing = true;
					vm.init();
					vm.thisTableData.forEach(item => {
						if (!item.editting) {
							if (item.edittingCell) {
								for (let name in item.edittingCell) {
									item.edittingCell[name] = false;
									vm.edittingStore[item.index].edittingCell[name] = false;
								}
							}
							vm.edittingStore[item.index].editting = true;
							vm.edittingStore[item.index]._checked = true;
							vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
						}
					});
				} else {
					vm.isEditing = false;
					vm.thisTableData.forEach(item => {
						item.editting = false;
						delete item.edittingCell;
					});
					vm.$emit('modifyTableInfos', vm.edittingStore);
					vm.edittingStore = [];
				}
				vm.buttonText = vm.buttonText === '编辑' ? '保存' : '编辑';
			},
			// init
			init () {
				let vm = this;
				if (!this.edit) return;
				const [...tempColumns] = this.handleColumn(); // 传入表头时对象格式 需要转成数组
				let editableCell = tempColumns.filter(item => {
					if (item.editable) {
						if (item.editable === true) {
							return item;
						}
					}
				});
				let [...cloneData] = JSON.parse(JSON.stringify(this.tableData2)); // 传入的列表数据
				let res = [];
				res = cloneData.map((item, index) => {
					let isEditting = false;
					if (this.thisTableData[index]) {
						if (this.thisTableData[index].editting) {
							isEditting = true;
						} else {
							for (const cell in this.thisTableData[index].edittingCell) {
								if (this.thisTableData[index].edittingCell[cell] === true) {
									isEditting = true;
								}
							}
						}
					}
					if (isEditting) {
						return this.thisTableData[index];
					} else {
						this.$set(item, 'editting', false);
						let edittingCell = {};
						editableCell.forEach(item => {
							edittingCell[item.key] = false;
						});
						this.$set(item, 'edittingCell', edittingCell);
						return item;
					}
				});
				this.thisTableData = res;
				this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
				tempColumns.forEach(item => {
					if (item.editable && vm.isEditing) {
						item.render = (h, param) => {
							let currentRow = this.thisTableData[param.index];
							if (!currentRow.editting) {
								return h('span', currentRow[item.key]);
							} else {
								if (item.types === 'select') {
									return h('Select', {
										props: {
											value: currentRow[item.key],
											placeholder: currentRow[item.key],
										},
										on: {
											'on-change' (val) {
												let key = param.column.key;
												vm.edittingStore[param.index][key] = val;
											}
										},
									}, [
										vm.getProps(item.filters, h),
									]);
								} else if (item.types === 'date') {
									return h('DatePicker', {
										props: {
											type: 'date',
											value: currentRow[item.key],
										},
										on: {
											'on-change' (val) {
												let key = param.column.key;
												vm.edittingStore[param.index][key] = val;
											}
										},
									})
								} else {
									return h('Input', {
										props: {
											type: 'text',
											value: currentRow[item.key]
										},
										on: {
											'on-change' (event) {
												let key = param.column.key;
												vm.edittingStore[param.index][key] = event.target.value;
											}
										}
									});
								}
							}
						};
					} else {
						item.render = this.tempTable2ColumnListRender[item.key];
					}
				});
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
					this.checkBoxList.forEach(item => newArr.push(item.label));
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
				let data = [];
				 // 获取固定的表头
				data[0] = this.table2ColumnList[this.fixedHeader.split(',')[0]];
				data[1] = this.table2ColumnList[this.fixedHeader.split(',')[1]];
				let [ ...tempArr ] = this.tableColumnsChecks;
				for (let k in this.table2ColumnList) { // 点击选择要显示的表头时 保持原来的位置
					for (let j = 0; j < tempArr.length; j++) {
						if (k !== tempArr[j]) {
							continue;
						} else {
							tempArr.splice(j, 1);
							data.push(this.table2ColumnList[k]);
						}
					}
				}
				// console.log('this.table2ColumnList', this.table2ColumnList);
				// console.log(this.fixedHeader);
				// console.log('data__', data);
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
				this.$emit('onFilterChange', val.key, val._filterChecked[0]);
			},
			// 获取 select option's render
			getProps(data, h) {
				const tempArr = [];
				data.forEach(item => {
					let tempData = h('Option', {props: {value:item.value, label:item.label}});
					tempArr.push(tempData);
				});
				return tempArr;
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
					const tempArr = [];
					data.forEach(item => {
						tempArr.push({
							key: item,
							ischeck: '1',
						});
					});
					this.$emit('getchangedCheckedItem', tempArr);
			},
        },
        mounted () {
			// 确保拿到 props 时;进行数据的获取
			waitUntil (()=>{
				return !!this.fixedHeader;
			},()=>{
				this.tableColumnsChecks = this.tableColumnsChecked;
				this.changeTableColumns();
			});
			for (const k in this.table2ColumnList) {
				this.tempTable2ColumnListRender[k] = this.table2ColumnList[k].render;
			}

			this.init();
		},
    };
</script>