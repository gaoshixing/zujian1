<style lang="less">
.zzdd{
	border-top: 1px solid #e0e0e0;
	.ivu-table-wrapper {
		border: none;
	}
	.ivu-table-border th, .ivu-table-border td {
		border-right: none;
		background: #fff;
	}
	.ivu-table:after {
		content: '';
		width: 0px;
	}
}
</style>
<template>
	<div class="zzdd">
		<v-select 
			style="width: 396px;margin: 15px 0;" 
			placeholder="请输入项目名称进行搜索" 
			icon="search" 
			v-model="compact" 
			k='cnname' 
			:datafunc="searchDropList" 
			@on-enter="textChange" 
			@on-click="textChange" 
			@selected="textChange">
		</v-select>
 		<!-- <v-search-options :data="dlList" byKey="label" searchTitle="产品大类" labelWidth="0" @on-select-item="selectDl" style="margin-top: 10px;"></v-search-options>
		<v-search-options :data="xlList" byKey="label" searchTitle="产品小类" labelWidth="0" @on-select-item="selectXl" style="margin-top: 10px;"></v-search-options> -->
		<case-bar
			:tagList ='dlList'
			title="产品大类"
			key1='name'
			:num="num1"
			@addAcitveCon='selectDl'>
		</case-bar>
		<case-bar
			:tagList ='xlList'
			title="产品小类"
			key1='name'
			:num="num2"
			@addAcitveCon='selectXl'>
		</case-bar>
		<btnlists title="自组单列表" :btnList="btninfo"></btnlists>
		<Table border :columns="columns5" :data="data5" @on-sort-change="sortChange"></Table>
		<div style="margin: 30px auto;text-align:center;">
			<Page 
				size="small"
				show-elevator 
				show-sizer 
				show-total 
				:page-size="pageSize" 
				:current="pageNo" 
				:total="count" 
				@on-change="onPageChange" 
				@on-page-size-change="onPageSizeChange">
			</Page>
		</div>
		<Modal
			v-model="modal1"
			title="适用合同"
			:loading="loading"
			width=690
			@on-ok="ok"
			@on-cancel="cancel">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="108">
				<FormItem label="适用合同小类：" prop="syht">
					<Select v-model="formValidate.syht" multiple style="width:528px" placeholder="请选择合同小类">
						<Option v-for="item in syhtList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
			</Form>
		</Modal>
	</div>
	
</template>
<script>
import {mapMutations,mapState, mapGetters} from 'vuex';
import Btnlists from '@public/modules/btnlist';
import caseBar from '@public/modules/caseBar2'
/* import vSearchOptions from "../../modules/vSearchOptions"; */
import vSelect from "../../modules/vSelect.vue";
import valid, { errors, htPolicy, htItem, common, sys } from '../../libs/request.js';

export default {
	mounted(){
		this.getDfl(0)
		this.dictListData()
		this.getZzddConfig()
	},
	components:{
		Btnlists,
		/* vSearchOptions, */
		vSelect,
		caseBar
	},
	data () {
		return {
			loading: true,
			formValidate: {
				syht: [],
			},
			ruleValidate: {
				syht: [
					{ required: true, type: 'array', min: 1, message: '请选择合同小类', trigger: 'change' },
				],
			},
			modal1: false,
			syhtList: [],
			sortKey: '',
			sortOrder: '',
			dl:'',
			xl:'',
			num1: 0,
			num2: 0,
			compact: '',
			selection:[],
			dlList:[],
			xlList:[],
			pageSize: 10,
            pageNo: 1, 
            count: 0,
			btninfo: [
				{
					text: '适用合同',
					type: 'primary',
					event: this.allTarget,
				},
			/* 	{
					text: '批量启用',
					type: 'primary',
					event: this.allTarget,
				},
				{
					text: '批量停用',
					type: 'primary',
					event: this.allTarget,
				} */
			],
			columns5: [
				/* {
					type: 'selection',
					width: 60,
					align: 'center'
				}, */
				{
					title: '项目名称',
					key: 'name',
					width: 200,
				},
				{
					title: '产品大类',
					key: 'category1',
					sortable: 'custom',
					width:120,
				},
				{
					title: '产品小类',
					key: 'category2',
					sortable: 'custom',
					width: 150,
				},
				{
					title: '描述',
					key: 'productDesc'
				},
				{
					title: '金额',
					key: 'price',
					align: 'right',
					sortable: 'custom',
					width:140,
				},
				{
					title: '使用状态',
					key: 'age',
					width: 85,
					render: (h, params) => {
						return h('div', {}, [
							h('div', {
								style:{
									display:'inline-block',
									width: '6px',
									height: '6px',
									'background-color': params.row.status== '已启用' ? '#52C41A' : 'red',
									'border-radius': '3px',
									'margin-bottom': '1px',
									'margin-right': '3px'
								}
							}, ''),
							h('span', {}, params.row.status)
						])
					}
				},
				{
					title: '操作',
					key: 'status',
					width: 60,
					render: (h, params) => {
						return h('div', {}, [
							h('span', {
								style:{
									cursor:'pointer',
									color: '#44BCB7',
									/* 'margin-right':'20px' */
								},
								on:{
									click: () => {
										this.changeStatu(params.row.id, params.row.status== '已启用' ?'1' : '0')
									}
								}
							}, params.row.status== '已启用' ? '停用' : '启用'),
							/* h('span', {
								style:{
									cursor:'pointer',
									color:'#44BCB7',
								},
								on:{
									click: () => {
										this.changeStatu(params.row.name,1)
									}
								}
							}, '删除') */
						])
					}
				},
			],
			data5: []
		}
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),
		getZzddConfig(){
			htItem.getZzddConfig({}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.formValidate.syht = JSON.parse(res.data.data)
				}
			}).catch(errors.call(this));
		},
		dictListData(){
			sys.dictListData({
				type: 'contract_type',
				parentId: '88001',
				menuId: '211'
			}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.syhtList = res.data.data
				}
			}).catch(errors.call(this)).finally(()=>{
			});
		},
		changeStatu(id, statu){
			htItem.updateIsJoinUseStatus(
				{	
					"ids":id,
					"isJoinUse":statu
				}
			).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.getList()
				}
			}).catch(errors.call(this));
		},
		getDfl(parentIds,isAll){
			this.updateLoadingStatus({isLoading: true});
			let param = {
				parentIds
			}
			htPolicy.list(param).then(valid.call(this)).then(res=>{
				if(res.ok){
					if(parentIds == 0){
						let array =  res.data.data
						let ids = []
						array.forEach(item => {
							ids.push(item.id)
						});
						this.dl = ''
						this.num1 = 0
						array.unshift({
							id:'',
							name:'全部'
						})
						this.dlList = array
						this.getDfl(ids.join(','),true)
					} else {
						let array =  res.data.data
						if(isAll){
							this.dl = ''
						} else {
							this.dl = parentIds
						}
						this.xl = ''
						this.num2 = 0
						array.unshift({
							id:'',
							name:'全部'
						})
						this.xlList = array
						this.getList()
					}
					
				}
			}).catch(errors.call(this));
		},
		getList(){
			this.updateLoadingStatus({isLoading: true});
			let params  = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				category1: this.dl,
				category2:this.xl,
				name: this.compact,
			}
			if(this.sortOrder){
				if(this.sortKey == 'category1'){
					params.orderBy = 'a' + this.sortOrder
				}
				if(this.sortKey == 'category2'){
					params.orderBy = 'b' + this.sortOrder
				}
				if(this.sortKey == 'price'){
					params.orderBy = 'c' + this.sortOrder
				}
			}
			console.log(params)
			htItem.customProductList(params).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.data5 = res.data.data.list
					this.count = res.data.data.count
					this.pageNo = res.data.data.pageNo
				}
			}).catch(errors.call(this)).finally(()=>{
				this.updateLoadingStatus({isLoading: false});
			});
		},
		selectDl(val,index){
			this.pageNo = 1
			this.num1 = index
			if(val == ''){
				this.getDfl(0)
			} else {
				this.getDfl(val)
			}
		},
		selectXl(val,index){
			this.pageNo = 1
			this.num2 = index
			this.xl = val
			this.getList()
		},
	/* 	selectChange(selection){
			this.selection = selection
		}, */
		sortChange(sortObj){
			this.pageNo = 1
			this.sortKey = sortObj.key
			this.sortOrder = sortObj.order == 'normal' ? '': sortObj.order
			this.getList()
		},
		onPageSizeChange(val){
			this.pageSize = val
			this.getList()
		},
		onPageChange(val) {
			this.pageNo = val
			this.getList()
		},
		allTarget() {
			this.modal1 = true
		},
		ok(){
			this.$refs.formValidate.validate((validRes) => {
				if (validRes) {
					this.modal1 = false
					htItem.saveZzddConfig({
						zzddConfig: this.formValidate.syht
					}).then(valid.call(this)).then(res=>{
						if(res.ok){
						}
					}).catch(errors.call(this));
				} else {
					this.modal1 = true
					this.loading = false
					setTimeout(() => {
						this.loading = true;
					}, 0);
				}
			})
		},
		cancel(){
			this.modal1 = false
			this.getZzddConfig()
		},
		searchDropList(word) {
			return new Promise((resolve, reject) => {});
		},
		textChange: function(val) {
			this.compact = val
			this.pageNo  = 1
			this.getList()
			/* this.$nextTick(() => {
				this.getList()
			}) */
		},
	}
}
</script>
