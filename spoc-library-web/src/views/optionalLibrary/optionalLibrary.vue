<style lang="less">
@acolor:#44bcb7;
.optional-library{
	.page{
		text-align: center;
		margin-top: 20px;
	}
	.search{
		margin: 10px 0;
    	width: 396px;
	}
	.alink{
		color: @acolor;
		font-size: 12px;
	}
	.ctrl-alink{
		color: @acolor;
		font-size:12px;
		margin-right:5px;
	}
	.intro-text{
		.ivu-table-cell{
			white-space: nowrap;
		}
	}
}
</style>
<template>
	
  <div class="optional-library">
	<div class="search">
		<v-select placeholder="输入关键词搜索" icon="search" v-model="search.text" k='cnname' :datafunc="searchDropList" @on-enter="onSearch" @on-click="onSearch" @selected="onSearch">
		</v-select>
	</div>
	<v-title title="专业-列表">
      <v-btn-options slot="right" :btns="mybtns"></v-btn-options>
    </v-title>
	<Table :columns="majorColumn" :data="majorList.list" @on-selection-change="onTableItemSelect"></Table>
    <div class="page">
      <Page show-elevator show-total show-sizer :current="majorList.pageNo" :total="majorList.count" :page-size="pageConfig.pageSize" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" v-if="majorList.count>10"></Page>
    </div>
  </div>
</template>
<script>
import vSelect from "../../modules/vSelect";
import vTitle from "@public/modules/vTitle";
import vBtnOptions from "../../modules/vBtnOptions";


import valid, { errors, major } from "../../libs/request.js";
import {mapMutations,mapGetters} from 'vuex';

export default {
	data() {
		return {
			search:{
				text:'',
				page:1,
			},
			tableSelectedItem:[],
			btns:[
				{class:'bt1',text:'删除',btnClick:this.delItem},
				{class:'bt2',text:'导入专业',btnClick:this.import},
				{class:'bt3',text:'添加专业',btnClick:this.addMajor}
			],
			btnsNormal:[
				{class:'bt2',text:'导入专业',btnClick:this.import},
				{class:'bt3',text:'添加专业',btnClick:this.addMajor}
			],
			pageConfig:{
				pageSize:10,
			},
			majorColumn:[
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title:'专业',
					align: 'left',
					width:290,
					render: (h, params) => {
						return h('div', [
							h('a', {
								class:{
									'alink':true,
								},
								on: {
									click: () => {
										this.$router.push({name:'library.optionalLibrary.majorDetail',query:{id:params.row.id}});
									}
								}
							}, params.row.enname),
						]);
					}
				},
				{
					title: "学校数量",
					key: "num",
					align: 'center',
					width: 90,
				},
				{
					title: "描述",
					key: "introduce",
					align: 'center',
					className:'intro-text'
				}, 
				{
					title: "操作",
					align: 'center',
					width: 120,
					render: (h, params) => {
						return h('div', [
							h('a', {
								class:{
									'ctrl-alink':true
								},
								on: {
									click: () => {
										this.$router.push({name:'library.optionalLibrary.addMajor',query:{id:params.row.id}});
									}
								}
							}, '修改'),
						]);
					}
				}
			],
			majorList:{},
			

		};
	},
	computed:{
		mybtns(){
			if(this.tableSelectedItem.length){
				return this.btns;
			}
			return this.btnsNormal;	
		}
	},
	components:{
		vSelect,
		vTitle,
		vBtnOptions,
	},
	created(){
		this.getTableList();
	},
	methods:{
		...mapMutations(['updateLoadingStatus']),
		getTableList(){
			let param = {
				pageSize:this.pageConfig.pageSize
			};
			if(this.search.text){
				param.name=this.search.text;
			}
			if(this.search.page){
				param.pageNo = this.search.page;
			}
			this.updateLoadingStatus({isLoading:true});
			major.list(param).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.majorList = res.data.data;
				}
			}).catch(errors.call(this)).finally(()=>{
				this.updateLoadingStatus({isLoading:false});
			});
		},
		onSearch(){
			this.$nextTick(()=>{
				this.search.page = 0;
				this.getTableList();
			});
		},
		searchDropList(word){
			return new Promise((resolve,reject)=>{
            	major.listThink(word).then(valid.call(this)).then(res=>{
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
		delItem(){
			if(this.tableSelectedItem.length){
				this.$Modal.confirm({
                    title: '删除专业',
                    content: '您确定要删除所选内容吗？删除后将无法恢复',
                    onOk: () => {
						this.updateLoadingStatus({isLoading:true});
						let ids = this.tableSelectedItem.map(item=>item.id);
						major.deleteBatch(ids).then(valid.call(this)).then(res=>{
							if (res.ok){
								this.getTableList();
							}
						}).catch(errors.call(this)).finally(()=>{
							this.updateLoadingStatus({isLoading:false});
							this.tableSelectedItem=[];
						});
					}
				});
			} else {
				this.$Message.warning("请选择至少一个");
			}
		},
		import(){
			this.$router.push({name:'library.import',query:{t:'major'}});
		},
		addMajor(){
			this.$router.push({name:'library.optionalLibrary.addMajor'});
		},
		onPageChange(page){
			this.search.page = page || 1;
			this.getTableList();
		},
		onPageSizeChange(pageSize){
			this.pageConfig.pageSize = pageSize;
			this.getTableList();
		},
		onTableItemSelect(sels){
			this.tableSelectedItem = sels;
		},
		

	}

}
</script>



