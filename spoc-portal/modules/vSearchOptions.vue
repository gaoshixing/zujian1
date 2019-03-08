<style lang="less">
	.v_search_options {
		@grey: #999999;
		@color: #44bcb7;
		font-size: 12px;
		.ivu-input{
			height: 28px;
		}
		.ivu-date-picker{
			margin-top: 3px;
		}
		.v_search_options_content {
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			/*align-items: flex-start;*/
			.title {
				/*position: absolute;
				top: 0;
				left: 0;*/
				color: @grey;
				padding: 0px 10px 0px 0;
				height: 2em;
				line-height: 2em;
				box-sizing: border-box;
			}
			.keyword {
				display: inline-block;
				margin-right:10px;
				padding: 4px 12px;
				margin-bottom: 4px;
				cursor: pointer;
				height: 2em;
				float: left;
				&.active {
					background-color: @color;
					color: #fff;
				}
			}
		}
	}
</style>
<template>
	<div class="v_search_options">
		<div class="v_search_options_content" :style="{'align-items':valign}">
			<div class="title" :style="{'min-width':_labelWidth+'px',textAlign:labelPosition}" v-if="!!title">{{title}}：</div>
			<div class="title" :style="{'min-width':_labelWidth+'px',textAlign:labelPosition}" v-else>{{title}}</div>
			<div v-if="list.length">
				<div class="keyword" :class="{'active':active1.indexOf(item.id)!=-1}" v-for="(item,index) in list" :key="index" @click="select(index)" v-if="isMultiple" v-text="(isCompany && item[_key])?item[_key].substr(0,item[_key].search(/\s/)):item[_key]">
					{{item[_key]}}
				</div>
				<div class="keyword" :class="{'active':active==item.id}" v-for="(item,index) in list" :key="item.id" @click="select(index)" v-if="!isMultiple" v-text="(isCompany && item[_key])?item[_key].substr(0,item[_key].search(/\s/)):item[_key]">
					{{item[_key]}}
				</div>
			</div>
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'vSearchOptions',
		props: {
			data: {
				type: Array,
				default: () => {
					return [];
				}
			},
			edit: {
				type: Boolean,
				default: function() {
					return false;
				}
			},
			searchTitle: {
				type: String,
				default: function() {
					return '';
				}
			},
			byKey: {
				type: String,
				default: function() {
					return '';
				}
			},
			labelWidth: {
				validator: (value) => {
					return(typeof value == 'number' || typeof value == 'string')
				}
			},
			labelPosition: {
				type: String,
				default: 'right'
			},
			multiple: {
				type: Boolean,
				default: function() {
					return false;
				}
			},
			company: {
				type: Boolean,
				default: function() {
					return false;
				}
			},
			valign: {
				type: String,
				default: function() {
					return 'flex-start';
				}
			},
			toSelect: {
				type: Array,
				default: function() {
					return [];
				}
			},
			companySelected:{
				type: Array,
				default: function() {
					return [];
				}
			},
			parentId: {
				type: [Number,String],
				default: function() {
					return '';
				}
			}
		},
		data() {
			return {
				active: '',
				active1: [''],
				id:this.parentId
			}
		},
		mounted(){
			
		},
		computed: {
			isMultiple() {
				return this.multiple;
			},
			isCompany() {
				return this.company;
			},
			list() {
				return this.data;
			},
			title() {
				return this.searchTitle;
			},
			_labelWidth() {
				if(/^\d+$/.test(this.labelWidth)) {
					return Number(this.labelWidth);
				} else {
					return Number(this.labelWidth);
				}
			},
			_key(){
				return this.byKey;
			},
			_edit(){
				return this.edit;
			}
		},
		methods: {
			select(index) {
				if(this.isMultiple) {
					if(this.list[index].id==''){
						this.active1=[''];
					}else{
						let isarr = this.active1.indexOf(this.list[index].id);
						let length = this.active1.length;
						if(isarr != -1) {
							this.active1.splice(isarr, 1);
						} else {
							this.active1.splice(length, 0, this.list[index].id);
						}
						let isemp = this.active1.indexOf('');
						if(isemp!= -1){
							this.active1.splice(isemp, 1);
						}
						if(!this.active1.length){
							this.active1=[''];
						}
					}
					this.multipleEmit();
				} else {
					if(this.active==this.list[index].id){
						this.active='';
					}else{
						this.active = this.list[index].id;
					}
					this.$emit('on-select-item', this.active);
				}
			},
			multipleEmit(){
				let obj={};
				obj.id=this.id;
				obj.childTags=[];
				this.active1.forEach((v,k)=>{
					if(v!=''){
						this.list.forEach((val)=>{
							if(v==val.id){
								obj.childTags.push({id:v,title:val[this._key]})
							}
						})
					}
				})
				this.$emit('on-select-item', obj);
			},
		},
		watch: {
		    list: function (val, oldVal) {
		    	if(val.length&&oldVal.length==0){
//			    	this.active=val[0].id;
//			    	this.active1=[val[0].id];
//					this.multipleEmit();
		    	}
			},
		    parentId: function (val, oldVal) {
		    	this.id=val;
			},
			toSelect:{
				handler:function(){
					if(this.toSelect.length){
						let arr=[];
						this.toSelect.forEach((v,k)=>{
							if(v.id==this.id && v.childTags.length){
								arr=v.childTags.map(val=>val.id);
							}
						})
						this.active1=arr;
					}
				},
				deep:true
			},
			companySelected:{
				handler:function(){
					if(this.companySelected.length){
						let arr=this.companySelected;
						this.active1=arr;
						this.multipleEmit();
					}
				},
				deep:true
			}
		}
	}
</script>