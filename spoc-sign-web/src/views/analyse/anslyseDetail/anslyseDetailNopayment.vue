<style lang="less">
	.anslyseDetailNopayment {
		border-top: 1px solid #e0e0e0;
		font-size: 14px;
		
		.contentBar {
			height: 107px;
			padding: 0 50px;
			display: flex;
			box-sizing: border-box;
			justify-content: space-around;
			align-items: center;
			background-color: #fafafa;
			
		}
		.discountRateDtable {
			.tableTitle {
				p {
					font-size: 12px;
					b,i{
					font-style: normal;
					font-size: 18px;
					color: #44bcb6;
					font-weight: normal;
					}
			
					b {
						color: red;
					}
				}
			}

			.page {
			text-align: center;
			margin-top: 20px;
			}

			.tableTitle {
			margin-bottom: 20px;
			}
		}
	}
</style>
<template>
	<div class="anslyseDetailNopayment">
		<div class="titleBar">
			<v-select
			:datafunc="datafunc"
			style="width: 396px;margin: 15px 0;"
			placeholder="输入顾问姓名"
			icon="search" 
			v-model="compact"
			k='cnname'
			@on-enter="textChange" 
			@on-click="textChange" 
			@selected="textChange">
			</v-select>
			<statistics-time
			@upDateAnalyseSellDetail="upDateAnalyseSellDetail"
			:currentTime="currentTime"
			:startTime="startTime"
			:endTime="endTime"
			:statisticsTimeList='statisticsTimeList'
			>
			</statistics-time>
			<v-search-option
			@on-select-item="getControlledIds"
			:controlledData="firm.countryList"
			>
			</v-search-option>
			<case-bar-filter :from="2" menuId="201"  mgt="12" @tagListChange="tagListChange">
			</case-bar-filter>
			<!-- <analyse-all-tags
			@on-select-item="getTags"
			>
			</analyse-all-tags> -->
		</div>
		<div class="discountRateDtable">
			<div class="tableTitle">
				<p>尾款合同总计
					<i> {{listParams.count}}</i> 份，尾款待收收总金额<b> {{AllPrice|filterWan}} </b>万元 ,当月应收<b> {{currentAllPrice|filterWan}}</b> 万元
				</p>
				<v-title>
					<span  style="fontSize:12px">尾款统计-列表</span>
					<Dropdown style="position:absolute;right:20px" trigger="click" @on-click="exportCurr">
						<Button style="width:94px; margin: 0 5px;border: 1px solid #999;" type="ghost" class="bt2">
							导出 <Icon type="arrow-down-b"></Icon>
						</Button>
						<DropdownMenu slot="list">
							<DropdownItem :name="1">导出当前</DropdownItem>
							<DropdownItem :name="0">导出所有</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</v-title>
				<div class="cancleBorder">
					<Table @on-select-all="signSelectAll" @on-selection-change="signChange" :columns="columns" :data="data1.list"  @on-sort-change="onSortChange"></Table>
				</div>
			</div>
			<div class="page">
				<Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :page-size="listParams.pageSize" :current="1" :total="listParams.count" @on-change="onPageChange" v-if="listParams.count>10"></Page>
			</div>
		</div>
		<form class="formexport" :action="exportUrl" method="post" target="_blank">
			<input type="hidden" name="tags" v-model="tags" />
			<input type="hidden" name="name" v-model="compact" />
			<input type="hidden" name="companyIds" v-model="companyIds" />
			<input type="hidden" name="orderBy" v-model="orderBy" />
			<input type="hidden" name="ids" v-model="signId" />
			<input type="hidden" name="endTime" v-model="endTime" />
			<input type="hidden" name="startTime" v-model="startTime"/>
		</form>	
	</div>
</template>
<script>
import vSelect from "../../../modules/vSelect.vue"
import analyseBar from "../components/analyseBar"
import signCountry from "../components/signCountry"
import statisticsTime from "../../../modules/statisticsTime"
import vSearchOption from "../../../modules/vSearchOption";
import caseBarFilter from "@public/modules/caseBarFilter.vue";

import vTitle from "@public/modules/vTitle";
import valid, { errors, ANALYSE, common } from "../../../libs/request"

export default {
 	data() {
		return {
			exportUrl:'',
			signCount: '',
			AllPrice: '',
			currentAllPrice: '',
			currentTime: '',
			compact: '',
			title: "查看方式",
			numArea: 0,
			num: 0,
			controlledIndex: 0,
			countryIndex: '',
			proTypeIndex: '',
			systemIndex: '',
			momentIndex: '',
			signId: '',
			statisticsTimeList: ['当前月', '最近三个月', '最近六个月'],
			firm:{
				searchName:'分公司',
				countryList:[],
			},
			lookWay: ["按天查看", "按月查看", "按年查看"],
			columns:[
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title:'签约人',
					key:'userName',
					align: 'center',
					render: (h, params) => {
					return h(
						"a",{
							on: {
							click: () => {
								this.$router.push({
								name: "sign.anslyseDetailPerson",
								query: {
									'name': params.row.userName,
									'userId': params.row.userId,
								}
								});
							}
							}
						},
							params.row.userName
						);
					},
				},
				{
				title:'分公司',
				key:'officeName',
				align:'center',
				render: (h, params) => {
                		return h('span',params.row.officeName.indexOf(' ') == -1 ? params.row.officeName : params.row.officeName.substr(0, params.row.officeName.indexOf(' ')))
					}
				},
				{
					title:'签单量',
					key:'signCount',
					"sortable": 'custom',
					align:'center'
				},
				{
					title:'签约总金额',
					key:'signPrice',
					"sortable": 'custom',
					align:'center',
					render: (h, params) => {
                		return h('span', {}, parseFloat(params.row.signPrice).toLocaleString())
					}
				},
				{
					title:'已收款总金额',
					key:'inPrice',
					"sortable": 'custom',
					align:'center',
					render: (h, params) => {
                		return h('span', {}, parseFloat(params.row.inPrice).toLocaleString())
					}
				},
				{
					title:'尾款待收金额',
					key:'stayPrice',
					"sortable": 'custom',
					align:'center',
					render: (h, params) => {
                		return h('span', {}, parseFloat(params.row.stayPrice).toLocaleString())
					}
				},
			],
			listParams:{
				count: '',
				pageNo: 1,
				pageSize: 10,
			},
			data1:{},
			tags: [],
			endTime: '',
			startTime: '',
			companyIds: '',
			orderBy: '',
		};
	},

	components: {
		vSelect,
		analyseBar,
		statisticsTime,
		signCountry,
		vTitle,
		vSearchOption,
		caseBarFilter
	},

	mounted() {
		this.getAnalyseList('first')
		this.getControlledMsg()
	},

	methods: {
		getAnalyseList(type={}) {
			if(this.startTime == this.endTime && this.endTime == this.currentTime) {
					this.startTime = this.endTime = ''
			}
			let obj = {
				name: this.compact,
				startTime: this.startTime,
				endTime: this.endTime,
				tags: this.tags,
				companyIds: this.companyIds,
				orderBy: this.orderBy,
				timePrecision: 'month',
				pageNo: this.listParams.pageNo,
				pageSize: this.listParams.pageSize,
			}
			
			ANALYSE.analyseTailList(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.data1 = res.data.data
					this.listParams.count = res.data.data.attach.count
					this.AllPrice = res.data.data.attach.stayPriceSum
					this.currentAllPrice = res.data.data.attach.modernStayPriceSum
					if(type == 'first') {
						this.currentTime = `${res.data.message.substr(0,7)}-01`

					}
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		textChange() {
			this.getAnalyseList()
		},


		onPageChange(val){
			this.listParams.pageNo = val;
			this.getAnalyseList();
		},

		onPageSizeChange(pageSize){
			this.listParams.pageSize = pageSize;
			this.getAnalyseList();
		},

		getControlledMsg() {
			let params={
				grade:'2',
				types: '1,2,3'
			}

			common.officeList(params).then(valid.call(this)).then(res => {
				if(res.ok){
					this.firm.countryList=res.data.data.allCompany;
				}
			}).catch(errors.call(this));

		},

		upDateAnalyseSellDetail(obj) {
			this.startTime = obj[0]
			this.endTime = obj[1]
			this.getAnalyseList()
		},

		exportCurr(val){
			let form = this.$el.querySelector('.formexport');
			if(val==1){
				if(!this.signId){
					this.$Message.error('请选择学院信息');
				}else{
					this.exportUrl = ANALYSE.exportNoPayAll()
					this.$nextTick(()=>{
						form.submit();
					});
				}
			}else {
				this.signId = ''
				this.exportUrl = ANALYSE.exportNoPaySelected()
				this.$nextTick(()=>{
						form.submit();
					});
			}
		},

		onSortChange(val) {
			if(val.orderBy == 'normal') {
				this.orderBy = ''
			}else {
				this.orderBy = `${val.key} ${val.order}`
			}
			this.getAnalyseList()
		},

		datafunc(val) {
			return new Promise((resole, reject) => {

			})
		},

		tagListChange(item) {
			this.tags = item
			this.getAnalyseList()
			// this.$refs.formModal.validateField('htTagList')
		},

		// getTags(val) {
		// 	this.tags = val
		// 	this.getAnalyseList()
		// },

		getControlledIds(ids) {
			this.companyIds = ids
			this.getAnalyseList()
		},
		
		exportCurr(val){
			let form = this.$el.querySelector('.formexport');
			if(val==1){
				if(!this.signId){
					this.$Message.error('请选择学院信息');
				}else{
					this.exportUrl = ANALYSE.exportNoPaySelected()
					this.$nextTick(()=>{
						form.submit();
					});
				}
			}else {
				this.signId = ''
				this.exportUrl = ANALYSE.exportNoPayAll()
				this.$nextTick(()=>{
						form.submit();
					});
			}
		},
		signChange(obj) {
			this.getSignIds(obj)
		},

		signSelectAll(obj) {
			this.getSignIds(obj)			
		}, 

		getSignIds(obj) {
			let str = ''
			if(obj.length <= 1) {
				this.signId = obj[0].userId
				return
			}

			obj.forEach(item => {
				str += item.userId + ','
			})
			this.signId = str.substr(0, str.length-1)
		},
	},

	filters: {
		filterWan: function(value) {
			if(!value) return '0'
			let val = value.toFixed(0)/10000
			return val
		},
	}
	
};
</script>


