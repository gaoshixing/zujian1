// 待签约
<style lang="less">
.sign-contract-manage-hang-sign-container{
	@blue:#44bcb7;
	@red:#ff0000;
	.abstract{
		font-size: 18px;
		margin: 20px 0 13px;
		.blue{
			color: @blue;
		}
		.red{
			color: @red;
		}
	}
}
</style>
<template>
	<div class="sign-contract-manage-hang-sign-container">
		<div class="abstract">
			累计收到 <span class="blue">30</span> 份待签约合同，待签约金额 <span class="red">300</span> 万
		</div>
		<btn-list :btn="btnItem" :tableSelectedItem="pitchItem" @del="del" @current="deriveCurrent" @all="deriveAll">
			<span slot='url' style="margin-left: 12px;">合同-列表</span>
		</btn-list>
		<Table :columns="columns" :data="data.list"  @on-selection-change="onTableItemSelect" @on-sort-change="onSortChange"></Table>
		<div class="page">
			<Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
		</div>
	</div>
</template>
<script>
import btnList from "../../btnlist";

import valid,{errors } from "../../../../../../libs/request";
export default {
	name:'vHangSign',
	data () {
		return {
			listParams:{
				sort:'asc',
				pageNo:'1',
				pageSize:'10',
				cnName:''
			},
			btnItem:[
				{cont:'导出',
				  importOptList: [
					{ id: 1, label: "导出当前", value: "current" },
					{ id: 2, label: "导出所有", value: "all" }
				  ]
				},
				{cont:'删除'},
			],
			pitchItem:[],
			columns:[
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title:'合同编号',
					key:'identifier',
					align:'center',
					render:(h,params)=>{
						return h('div',{
							style:{
								color:'#44bcb7',
								cursor:'pointer',
							},
							on:{
								click:()=>{
									this.jumpInfo(params)
								}
							}
						},params.row.identifier)
					}
				},
				{
					title:'顾问姓名',
					key:'2',
					align:'center',
					"sortable": 'custom',
				},
				{
					title:'产品体系',
					key:'3',
					align:'center'
				},
				{
					title:'合同原价',
					key:'4',
					"sortable": 'custom',
					align:'center'
				},
				{
					title:'签约金额',
					key:'5',
					"sortable": 'custom',
					align:'center'
				},
				{
					title:'实际优惠后金额',
					key:'7',
					"sortable": 'custom',
					align:'center'
				},
				{
					title:'操作',
					align:'center',
					render:(h,params)=>{
						return h('div',{
							style:{
								color:'#0d70b0',
								textAlign:'center',
								cursor:'pointer'
							},
							on:{
								click:()=>{
									this.jumpOperationInfo(params)
								}
							}
						},'日志')
					}
					
				},
			],
			data:{
				count:500,
				pageNo:1,
				list:[
	
					{
						identifier:'2131',
						2:'21121',
					},
					{
						identifier:'2131',
						2:'21121',
					},
					{
						identifier:'2131',
						2:'21121',
					},
					{
						identifier:'2131',
						2:'21121',
					}
				],
			}
		}
	},
	components: {
		btnList,
	},
	methods: {
		jumpOperationInfo(params){
			this.$router.push({name:'sign.contractOperationInfo'})
		},
		jumpInfo(params){
			alert(111);
		},
		fetchTableList(params){
			
		},
		//导出
		exportCurr(){

		},
		del(){

		},
		deriveCurrent(){

		},
		deriveAll(){

		},
		download1(params){
			alert(111)
		},
		download2(params){
			alert(22222)
		},
		onTableItemSelect(selItem){
			this.pitchItem = selItem;
		},
		onSortChange(val){
			if(val.order ==='normal') return;
		},
			// 分页
		onPageChange(val){
			this.listParams.pageNo = val;
			this.fetchTableList(this.listParams);
		},
		onPageSizeChange(pageSize){
			this.listParams.pageSize = pageSize;
			this.fetchTableList(this.listParams);
		}
	}
}
</script>
