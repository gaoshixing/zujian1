检索条件
<style lang="less">
.sign-contract-manage-search-items-container{
	.v_search_options{
		margin-bottom: 10px;
	}
}
</style>
<template>
	<div class="sign-contract-manage-search-items-container">
		{{stopTime}}
		<v-search-options :label-width="110" :searchTitle="signResult.title" :data="signResult.list" @on-select-item="select1"></v-search-options>
		<v-search-options :label-width="110"  :searchTitle="signTime.title" :data="signTime.list" @on-select-item="select2">
			<DatePicker type="date" placeholder="预计签约时间" style="width: 200px" @on-change="onDataPickStart" v-model="startTime"></DatePicker>
			<span style="width:10px;height:2px;background-color:#44bcb7;margin:10px"></span>
			<DatePicker type="date" placeholder="预计签约时间" style="width: 200px" @on-change="onDataPickEnd" v-model="stopTime"></DatePicker>
		</v-search-options>
		<v-search-options :label-width="110" :searchTitle="company.title" :data="company.list" @on-select-item="select3"></v-search-options>
		<v-search-options :label-width="110" :searchTitle="category.title">
			<div>
				<Select v-model="searchParams.category" @on-change="select4" style="width:100px">
					<Option v-for="(item,index) in category.list" :value="item.value" :key="index">{{item.label}}</Option>
				</Select>
<!-- 
				<Select v-model="searchParams.category" @on-change="select5" style="width:100px">
					<Option v-for="(item,index) in category.list" :value="item.value" :key="index">{{item.label}}</Option>
				</Select>
				<Select v-model="searchParams.category" @on-change="select5" style="width:100px">
					<Option v-for="(item,index) in category.list" :value="item.value" :key="index">{{item.label}}</Option>
				</Select> -->
			</div>
		</v-search-options>
	</div>
</template>
<script>
import vSearchOptions from "../../../../../../modules/vSearchOptions";

export default {
	name:'vSearchItems',
	data () {
		return {
			startTime:'',
			stopTime:'',
			searchParams:{
				signResult:0,
				signTime:0,
				company:0,
				category:'',
			},
			signResult:{
				title:'签约结果：',
				list:[
					{label:'待签约',value:'0'},
					{label:'已签约',value:'1'},
				]
			},
			signTime:{
				title:'待签约时间：',
				list:[
					{label:'本月',value:0},
					{label:'本季度',value:1},
					{label:'今年',value:2},
				]
			},
			company:{
				title:'分公司：',
				list:[
					{label:'全部'},
					{label:'北京分公司'},
					{label:'上海分公司'},
					{label:'深圳分公司'},
					{label:'杭州分公司'},
					{label:'成都分公司'},
					{label:'广州分公司'},
				]
			},
			category:{
				title:'合同分类：',
				list:[
					{label:'美国',value:'america'},
					{label:'澳大利亚',value:'a'},
					{label:'日本',value:'b'},
					{label:'德国',value:'c'},
				]	
			}	
		}
	},
	components: {
		vSearchOptions,
	},
	created () {
		this.$emit('on-search-items',this.searchParams)	
	},
	methods: {
		select1(data){
			this.searchParams.signResult = data.value;
			this.$emit('on-search-items',this.searchParams)	
		},
		select2(data){
			this.searchParams.signTime = data.value;
			this.$emit('on-search-items',this.searchParams)	
		},
		select3(data){
			// this.searchParams.company = data.value;
		},
		select4(data){
			this.$emit('on-search-items',this.searchParams)	
		},
		onDataPickStart(data){
			console.log('======onDataPickStart========',data);
		},
		onDataPickEnd(data){
			console.log('=======onDataPickEnd=======',data);
		}
	}

}
</script>
