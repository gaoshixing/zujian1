<style lang="less">
	.anslyseDetailDiscountRateD {
		font-size: 14px;
		border-top: 1px solid #e0e0e0;
		.page {
			text-align: center;
			margin-top: 20px;
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
		}
	}
</style>
<template>
    <div class="anslyseDetailDiscountRateD">
		<v-select
		:datafunc="datafunc"
		style="width: 396px;margin: 15px 0;"
		placeholder=" "
		icon="search" 
		v-model="compact"
		k='cnname'
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
		@on-select-item="getControlledIds"
		:controlledData="firm.countryList"
		key1="name"
		>
		</v-search-option>
		<case-bar-filter :from="2" menuId="201" mgt="12" @tagListChange="tagListChange">
		</case-bar-filter>
        <div class="discountRateDtable">
            <div class="tableTitle">
               <p>审批通过 <i> {{agreeCount}} </i> 份合同，平均综合折扣率 <b> {{discountRateAVG}}% </b> ~ 
                </p>
                <v-title>
		        <span  style="fontSize:12px">折扣率明细-列表</span>
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
            	<Table :columns="columns" :data="data.list"  @on-select-all="signSelectAll" @on-selection-change="signChange"  @on-sort-change="onSortChange"></Table>
			</div>
            <div class="page">
                <Page show-elevator show-total  show-sizer  @on-page-size-change="onPageSizeChange" :page-size="listParams.pageSize" :current="1" :total="listParams.count" @on-change="onPageChange" v-if="listParams.count>10"></Page>
            </div>
        </div>
		<form class="formexport" :action="exportUrl" method="post" target="_blank">
			<input type="hidden" name="startTime" v-model="startTime" />
			<input type="hidden" name="name" v-model="compact||$route.query.name" />
			<input type="hidden" name="endTime" v-model="endTime" />
			<input type="hidden" name="companyIds" v-model="companyIds" />
			<input type="hidden" name="tags" v-model="tags" />
			<input type="hidden" name="ids" v-model="signId" />
			<input type="hidden" name="timePrecision" value="month" />
		</form>
    </div>
</template>
<script>
import vSelect from '../../../modules/vSelect.vue'
import statisticsTime from '../../../modules/statisticsTime'
import vSearchOption from '../../../modules/vSearchOption'
import analyseBar from '../components/analyseBar'
import vTitle from "@public/modules/vTitle";
import valid, { errors, ANALYSE, common } from "../../../libs/request"
import caseBarFilter from "@public/modules/caseBarFilter.vue";


export default {
    data() {
        return {
			exportUrl: '',
			agreeCount: '',
			discountRateAVG: '',
            num1: 0,
            numComp: 0,
			controlledIndex: 0,
			countryIndex: '',
			proTypeIndex: '',
			systemIndex: '',
			momentIndex: '',
			signId: '',
			id: this.$route.query.userId,
			firm:{
				searchName:'分公司',
				countryList:[],
			},
            columns:[
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '签约合同编号',
					align: 'center',
					render: (h, params) => {
						return h('div', {}, [
							h('a', {
								style: {
									color: '#3b9ad1',
									cursor:'pointer',
								},
								on:{
									click: () => {
										this.$router.push({
											name: "sign.pactPreview",
											query: {
												id: params.row.id
											}
										});
									}
								}
							}, params.row.no),
							h('i', {
								'class': {
									'iconfont': true,
									'icon-wenjianjia': true
								},
								style: {
									color: '#3b9ad1',
									fontSize: '14px',
									display:params.row.isProtocol==1?'':'none'
								}
							}, '')
						])
					}
				},
				{
					title: '审批人',
					key: 'userName',
					align: 'center'
				},
				{
					title: '审批时间',
                    key: 'auditorTime',
                    "sortable": 'custom',
					align:'center'
				},
				{
					title: '审批时长',
					key:'auditorDuration',
					"sortable": 'custom',
					align:'center'
				},
				{
					title: '合同原价',
					key: 'contractPrice',
					"sortable": 'custom',
					align:'center',
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.contractPrice).toLocaleString()
							);
					},
				},
				{
					title: '折扣金额',
					key: 'deratePrice',
					"sortable": 'custom',
					align:'center',
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.deratePrice).toLocaleString()
							);
					},
				},
				{
					title: '赠送成本',
					key:'presentPriceCost',
					"sortable": 'custom',
					align:'center',
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.presentPriceCost).toLocaleString()
							);
					},
				},
				{
					title: '综合折扣率',
					align: 'center',
					key: 'discountRate',
                    "sortable": 'custom',
				},
            ],
            
            listParams:{
				count: '',
				pageNo: 1,
				pageSize: 10,
			},
			currentTime: '',
            data:{},
			tags: [],
			compact: this.$route.query.name,
			orderBy: '',
			companyIds: '',
			startTime: '',
			endTime: '',
        }
	},
	
    components: {
        vSelect,
        analyseBar,
		statisticsTime,
		vSearchOption,
		vTitle,
		caseBarFilter
	},
	
	mounted() {
		this.getAnalyseDiscountRateList('first')
		this.getControlledMsg()
	},

    methods: {
		getAnalyseDiscountRateList(type={}) {
			if(this.startTime == this.endTime && this.startTime == this.currentTime) {
					this.startTime = this.endTime = ''
			}
			let obj = {
				id: this.id,
				name: this.compact,
				startTime: this.startTime,
				endTime: this.endTime,
				tags: this.tags,
				companyIds: this.companyIds,
				orderBy: this.orderBy,
				pageNo: this.listParams.pageNo,
				pageSize: this.listParams.pageSize,
				timePrecision: 'month'
			}
			ANALYSE.analyseDiscountRateList(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.data = res.data.data
					this.listParams.count = res.data.data.count
					this.agreeCount = this.data.attach.agreeCount
					this.discountRateAVG = this.data.attach.discountRateAVG
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
					this.firm.countryList=res.data.data.allCompany;
				}
			}).catch(errors.call(this));

		},

        addAcitve(obj) {
            this.num1 = obj[0]
        },

		upDateAnalyseSellDetail(obj) {
			this.startTime = obj[0]
			this.endTime = obj[1]
			this.getAnalyseDiscountRateList()
		},

        onPageChange(val){
		    this.listParams.pageNo = val;
		    this.getAnalyseDiscountRateList();
        },
        
        onPageSizeChange(pageSize){
		    this.listParams.pageSize = pageSize;
		    this.getAnalyseDiscountRateList();
		},
		
		getControlledIds(ids) {
			this.companyIds = ids
			this.getAnalyseDiscountRateList()
		},
        
        tagListChange(val) {
			this.tags = val
			this.getAnalyseDiscountRateList()
		},

		datafunc() {
			return new Promise((resole,reject) => {
				
			})
		},

		textChange() {
			this.id = ''
			this.getAnalyseDiscountRateList()
		},
		
		onSortChange(val) {
			if(val.order == 'normal') {
				this.orderBy = ''
			}else {
				this.orderBy = `${val.key} ${val.order}`
			}
			this.getAnalyseDiscountRateList()
		},
		
		exportCurr(val){
			let form = this.$el.querySelector('.formexport');
			if(val==1){
				if(!this.signId){
					this.$Message.error('请选择学院信息');
				}else{
					this.exportUrl = ANALYSE.exportContractDiscountRateSelected()
					this.$nextTick(()=>{
						form.submit();
					});
				}
			}else {
				this.signId = ''
				this.exportUrl = ANALYSE.exportContractDiscountRate()
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
			obj.forEach(item => {
				str += item.id + ','
			})
			this.signId = str.substr(0, str.length-1)
		},
	},
  
}
</script>

