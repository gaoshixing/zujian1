<style lang="less">
	.anslyseDetailDiscountRate {
		font-size: 14px;
		border-top: 1px solid #e0e0e0;
		.titleBar {
			.system {
				span:nth-child(2n) {
					margin-right: 65px;
				}
			}
			.statisticsTime {
				span:last-of-type {
					margin-right: 65px;
				}  
			}
		}
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
			font-size: 12px;
			p {
				b,i {
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
	}
}
</style>

<template>
	<div class="anslyseDetailDiscountRate">
		<div class="titleBar">
			<v-select 
			style="width: 396px;margin: 15px 0;"
			placeholder="输入顾问姓名"
			icon="search" 
			v-model="compact"
			k='cnname'
			:datafunc="datafunc"
			@on-enter="textChange" 
			@on-click="textChange" 
			@selected="textChange">
			</v-select>
			<statistics-time
			@upDateAnalyseSellDetail="upDateAnalyseSellDetail"
			:startTime="startTime"
			:currentTime="currentTime"
			:endTime="endTime"
			>
			</statistics-time>
			<v-search-option
			key1="name"
			@on-select-item="getControlledIds"
			:controlledData="firm.countryList"
			>
			</v-search-option>
			<case-bar-filter :from="2" menuId="201" mgt='12' @tagListChange="tagListChange">
			</case-bar-filter>
		</div>
		<div class="discountRateDtable">
			<div class="tableTitle">
				<p>审批通过<i> {{agreeCount}}</i> 份合同,平均综合折扣率<b> {{discountRateAVG}}% </b>	</p>
				<v-title>
					<span style="fontSize:12px">综合折扣率-列表</span>
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
			</div>
			<div class="cancleBorder">
				<Table :columns="columns" :data="data.list" @on-select-all="signSelectAll" @on-selection-change="signChange"  @on-sort-change="onSortChange"></Table>
			</div>
			<div class="page">
				<Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :page-size="listParams.pageSize" :current="1" :total="listParams.count" @on-change="onPageChange" v-if="listParams.count>10"></Page>
			</div>
		</div>
		<form class="formexport" :action="exportUrl" method="post" target="_blank">
			<input type="hidden" name="startTime" v-model="startTime" />
			<input type="hidden" name="endTime" v-model="endTime" />
			<input type="hidden" name="companyIds" v-model="companyIds" />
			<input type="hidden" name="tags" v-model="tags" />
			<input type="hidden" name="ids" v-model="signId" />
			<input type="hidden" name="timePrecision" value="month" />
		</form>
	</div>
</template>

<script>
	import vSelect from "../../../modules/vSelect.vue"; 
	import analyseBar from "../components/analyseBar"
	import signCountry from "../components/signCountry"
	// import analyseAllTags from "../components/analyseAllTags"
	import statisticsTime from "../../../modules/statisticsTime"
	import vTitle from "@public/modules/vTitle";
	import vSearchOption from '../../../modules/vSearchOption'
	import valid, { errors, ANALYSE, common } from "../../../libs/request"
	import caseBarFilter from "@public/modules/caseBarFilter.vue";

	export default {
		data() {
			return {
				exportUrl: '',
				agreeCount: '',
				discountRateAVG: '',
				currentTime: '',
				compact: '',
				title: "查看方式",
				numArea: 0,
				num: 0,
				tags:[],
				controlledIndex: 0,
				countryIndex: '',
				proTypeIndex: '',
				systemIndex: '',
				momentIndex: '',
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
						title:'审批人',
						key:'userName',
						align:'center',
						render:(h,params)=>{
								return h('a',{
									style:{
									color:'#44bcb7',
									cursor:'pointer',
									},
									on:{
										click:()=>{
											this.$router.push({
											name:'sign.anslyseDetailDiscountRateD',
											query: {
												userId: params.row.userId,
												name: params.row.userName
											}
											})
										}
									}
								}, params.row.userName)
							}
						},
						{
						title:'分公司',
						key:'officeName',
						align:'center',
						render:(h,params)=>{
								return h('div',{
							}, params.row.officeName.substr(0,params.row.officeName.indexOf(' ')))
						},
					},
					{
						title:'授权审批合同数',
						key:'allCount',
						"sortable": 'custom',
						align:'center'
					},
					{
						title:'实际审批合同数',
						key:'factCount',
						"sortable": 'custom',
						align:'center'
					},
					{
						title:'审批通过合同数',
						key:'agreeCount',
						"sortable": 'custom',
						align:'center'
					},
					{
						title:'审批驳回合同数',
						key:'rejectCount',
						"sortable": 'custom',
						align:'center'
					},
					{
						title:'审批合同签单金额',
						key:'factPrice',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.factPrice).toLocaleString()
								);
						},
					},
					{
						title:'审批合同折扣金额',
						align:'center',
						key: "deratePrice",
						"sortable": 'custom',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.deratePrice).toLocaleString()
								);
						},
					},
					{
						title:'审批合同赠送成本',
						align:'center',
						key: "presentPriceCost",
						"sortable": 'custom',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.presentPriceCost).toLocaleString()
								);
						},
					},
					{
						title:'综合折扣率',
						align:'center',
						key: "discountRate",						
						"sortable": 'custom',
					},
				],
					
				listParams:{
					count: '',
					pageNo: 1,
					pageSize: 10,
				},
				data:{},
				companyIds: '',
				startTime: '',
				endTime: '',
				orderBy: '',
				signId : ''
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
			this.getAnalyseDiscountRatel('first')
			this.getControlledMsg()
		},

		methods: {
			getAnalyseDiscountRatel(type={}) {
				if(this.startTime == this.endTime && this.startTime == this.currentTime) {
					this.startTime = this.endTime = ''
				}
				let obj = {
					companyIds: this.companyIds,
					endTime: this.endTime,
					startTime: this.startTime,
					tags: this.tags,
					orderBy: this.orderBy,
					name: this.compact,
					pageNo: this.listParams.pageNo,
					pageSize: this.listParams.pageSize,
					timePrecision: 'month'
				}
				
				ANALYSE.analyseDiscountRate(obj)
				.then(valid.call(this))
				.then(res => {
					if(res.ok) {
						let data = res.data.data
						this.data = data
						this.listParams.count = data.count
						this.discountRateAVG = data.attach.discountRate
						this.agreeCount = data.attach.agreeCount
						if(type == 'first') {
							this.currentTime = `${res.data.message.substr(0,7)}-01`
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			},

			getControlledMsg() {
				let params={
					grade:'2',
					types: '1,2,3'
				}

				common.officeList(params).then(valid.call(this)).then(res => {
					if(res.ok){
						this.firm.countryList = res.data.data.allCompany;
					}
				}).catch(errors.call(this));

			},

			textChange() {
				this.getAnalyseDiscountRatel()
			},

			addAcitveArea(index) {
			this.numArea = index;
			},

			addAcitve(index) {
			this.num = index[0];
			},
			
			onPageChange(val){
				this.listParams.pageNo = val;
				this.getAnalyseDiscountRatel();
			},

			onPageSizeChange(pageSize){
				this.listParams.pageSize = pageSize;
				this.getAnalyseDiscountRatel();
			},

			upDateAnalyseSellDetail(obj) {
				this.startTime = obj[0]
				this.endTime = obj[1]
				this.getAnalyseDiscountRatel()
			},
			
			datafunc() {
				return new Promise((resole, reject) => {

				})
			},

			tagListChange(val) {
				this.tags = val
				this.getAnalyseDiscountRatel()
			},

			getControlledIds(ids) {
				this.companyIds = ids
				this.getAnalyseDiscountRatel()
			},

			onSortChange(val) {
				if(val.order == 'normal') {
					this.orderBy = ''
				}else {
					this.orderBy = `${val.key} ${val.order}`
				}

				this.getAnalyseDiscountRatel()
			},

			exportCurr(val){
				let form = this.$el.querySelector('.formexport');
				if(val==1){
					if(!this.signId){
						this.$Message.error('请选择学院信息');
					}else{
						this.exportUrl = ANALYSE.exportDiscountSelected()
						this.$nextTick(()=>{
							form.submit();
						});
					}
				}else {
					this.signId = ''
					this.exportUrl = ANALYSE.exportDiscountAll()
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
				console.log(obj)
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
		}
	};
	</script>


