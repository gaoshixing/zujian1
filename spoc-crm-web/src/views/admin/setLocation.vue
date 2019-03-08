<style lang="less">
	.set-location-boss {
		border-top: solid 1px #e0e0e0;
		.set-loaction-table {
			border: none;
			.ivu-table {
				&::after {
					content: none;
				}
			}
		}
		.bill-paging {
			text-align: center;
			margin-top: 20px;
		}
		.ivu-table th {
			background: #fff;
		}
	}
</style>

<template>
	<div class="set-location-boss">
		<Input
			size="large"
			icon="ios-search"
			v-model="searchKeyword"
			placeholder="请输入省份/城市"
			@on-enter="onclickSearchInfo"
			@on-click="onclickSearchInfo"
			style="margin: 20px 0 20px 0; width:400px;">
		</Input>
		<div style="line-height: 32px; font-size: 14px; color: #333;">共找到 <span style="color: #44bcb7; font-size: 16px; font-weight: bold;">{{pageTotal}}</span>  条数据</div>
		<BtnList title="归属地列表" :btnList="btnInfos"></BtnList>
		<Table 
			:data="dataLocation"
			class="set-loaction-table"
			:columns="columnsLocation"
			@on-sort-change="onSortChange"
			@on-filter-change="onFilterChange"
			></Table>
		<Page
			show-sizer
			show-total
			show-elevator
			:current="pageNo"
			:total="pageTotal"
			class="bill-paging"
			v-if="pageTotal > 10"
			:page-size="pageSize"
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange">
		</Page>
		<LocationModal
			:title="title"
			ref="refAddLocationModal"
			:id="id"
			:companyList="companyList"
			:countryId="addLocationData.country"
			:countryName="addLocationData.countryName"
			:provinceId="addLocationData.province"
			:cityId="addLocationData.city"
			:officeId="addLocationData.office"
			:timeStap="timeStap"
			@onclickSaveLocation="onclickSaveLocation"
			@cancelLocation="cancelLocation"
			></LocationModal>
	</div>
</template>

<script>
import valid, { errors, crmLocation, sys, sysConfig, } from '../../libs/request';
import LocationModal from '../../modules/addLocationModal';
import BtnList from '@public/modules/btnlist';
export default {
	name: 'SetLocation',
	components: {
		BtnList,
		LocationModal,
	},
	data() {
		return {
			title: '新增归属地',
			id: null, // 更新归属地的id
			companyList: [],
			timeStap: null,
			searchKeyword: null,
			officeId: null,
			orderByType: null,
			orderByStatus: null,
			btnInfos: [
				{
					text: '新增',
					event: this.onclickAddLocation,
				},
				{
					text: '批量导入',
					event: this.onclickBatchAdd,
				},
			],
 			columnsLocation: [
				 {
					title: '国家',
					key: 'countryName',
					align: 'center',
				},
				{
					title: '省份',
					key: 'provinceName',
					align: 'center',
				},
				{
					title: '城市',
					key: 'cityName',
					align: 'center',
					render: (h, params) => {
						const text =  params.row.cityName || '所有';
						return h('span', text);
					},
				},
				{
					title: '所属分公司',
					key: 'office',
					align: 'center',
					filters: [],
					filterMultiple: false,
					filterMethod (value, row) {
						return true;
					},
					render: (h, params) => {
						const text =  params.row.office.name && params.row.office.name.split(' ')[0];
						return h('span', text);
					},
				},
				{
					title: '更新时间',
					key: 'updateDate',
					sortable: true,
					align: 'center',
					render: (h, params) => {
						const text =  params.row.updateDate || "N/A";
						return h('span', text);
					},
				},
				{
					title: '操作',
					key: 'caozuo',
					align: 'center',
					render: (h, params) => {
						const _this = this;
						return h('span', {
							style: {
								color: '#44bcb7',
								cursor: 'pointer',
								userSelect: 'none',
							},
							on: {
								click() {
									_this.title = '更新归属地';
									_this.timeStap = new Date().getTime();
									_this.id = params.row.id;
									_this.addLocationData.office = params.row.office.id;

									_this.addLocationData.province = params.row.province;
									_this.addLocationData.city = params.row.city;
									_this.addLocationData.country = params.row.country;

									_this.addLocationData.countryName = params.row.countryName;
									_this.onclickUpdateLocation(_this.addLocationData);
								},
							},
						}, '更新');
					},
				},
            ],
			dataLocation: [],
			// 新增 Location 对象
			addLocationData: {
				province: null,
				city: null,
				country: null,
				countryName: null,
				office: null,
			},
			pageTotal: 0,
			pageNo: 1,
			pageSize: 10,
		};
	},
	created() {
		this.getList();
		this.getCompanyList();
	},
	methods: {
		onclickSearchInfo() {
			this.getList();
		},
		onclickBatchAdd() {
			this.$router.push({
				name: 'crm.importPage',
				query: {
					froms: 'CRM',
				},
			});
		},
		/*
		* 点击 新增归属地
		*/
		onclickAddLocation() {
			this.$refs.refAddLocationModal.show();
		},
		/*
		* 保存归属地
		*/
		onclickSaveLocation(data) {
			this.saveLocation(data);
		},
		onclickUpdateLocation(data) {
			this.$refs.refAddLocationModal.show();
		},
		/*
		* Table 操作
		*/
		onSortChange(obj) {
			this.orderByType = obj.key;
			this.orderByStatus = obj.order;
			this.getList();
		},
		onFilterChange(val) {
			this.officeId = val._filterChecked[0];
			this.getList();
		},
		/*
		* 分页操作
		*/
		onclickChangePage(val) {
			this.pageNo = val;
			this.getList();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getList();
		},
		/*
		* 列表 获取
		*/
		getList() {
			const data = {
				name: this.searchKeyword,
				officeId: this.officeId,
				orderByType: this.orderByType,
				orderByStatus: this.orderByStatus,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			crmLocation.list(data).then(valid.call(this)).then(res => {
				if (res) {
					this.pageTotal = res.data.data.count;
					this.dataLocation = res.data.data.list;
				}
			}).catch(errors.call(this));
		},
		/*
		* 保存详情
		*/
		saveLocation(data) {
			crmLocation.save(data).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.$refs.refAddLocationModal.modalLocation = false;
					this.$refs.refAddLocationModal.visible = false;
					this.getList();
					if (this.id) {
						this.$Message.info('更新归属地成功');
					} else {
						this.$Message.info('新增归属地成功');
					}
					this.id = null;
					this.$refs.refAddLocationModal.country = this.$refs.refAddLocationModal.province = this.$refs.refAddLocationModal.city = this.$refs.refAddLocationModal.office = this.$refs.refAddLocationModal.countryNames = null;
					this.title = "新增归属地";
				} else {
					this.$refs.refAddLocationModal.modalLocation = true;
					this.$refs.refAddLocationModal.visible = true;
					return;
				}
			}).catch(errors.call(this));
		},
		/*
		* 取消弹窗
		*/
		cancelLocation() {
			this.id = null;
			this.title = '新增归属地';
		},
		/*
		* 公司列表获取
		*/
		getCompanyList() {
			sys.controlledList().then(valid.call(this)).then(res => {
				if (res.ok) {
					res.data.data.forEach(item => {
						this.columnsLocation[3].filters.push({
							label: item.companyName,
							value: item.id,
						});
					});
					this.companyList = res.data.data;
				}
			}).catch(errors.call(this));
		},
	},
};
</script>
