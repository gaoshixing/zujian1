// 存档合同
<style lang="less">

</style>
<template>
	<div class="sign-contract-manage-deposit-container">
		<div class="search-box">
			<v-select placeholder="输入合同名称/合同编码/学生姓名/EC号" icon="search" v-model="search.text" k='cnname' :datafunc="searchDropList" @on-enter="onSearch" @on-click="onSearch" @selected="onSearch">
			</v-select>
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
import vSelect from "../../../../../modules/vSelect";
import btnList from "../btnlist";

import valid,{errors } from "../../../../../libs/request";
export default {
	name:'vDeposit',
	data () {
		return {
			search:{
				text:'',
			},
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
					align:'center'
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
					title:'合同优惠后金额',
					key:'6',
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
					width:190,
					render:(h,params)=>{
						return h('div',{
							style:{
								color:'#0d70b0',
								textAlign:'center',
							}
						},[
							h('span',{
								style:{
									cursor:'pointer',
									marginRight:'10px'
								},
								on:{
									click: ()=>{	
										this.download1(params)							
									}	
								}
							},'下载合同扫描件'),
							h('span',{
								style:{
									cursor:'pointer',
								},
								on:{
									click: ()=>{	
										this.download2(params)							
									}	
								}
							},'下载合同')
						])
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
		vSelect,
		btnList,
	},
	methods: {
		// 联想搜索
		searchDropList(word){
			return new Promise((resolve,reject)=>{
				academeManage.academySearch(word).then(valid.call(this)).then(res=>{
					if(res.ok){
						resolve(res.data.data);
					} else {
						reject(res);
					}
				}).catch(err=>{
					errors.call(this);
					reject(err);
				});
			});
		},
		onSearch(){
			// this.$nextTick(()=>{
			// 	this.listParams.pageNo = 1;
			// 	this.listParams.cnName = this.search.text;
			// 	this.fetchTableList(this.listParams);
			// });
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
		jumpInfo(params){
			alert(11)
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
