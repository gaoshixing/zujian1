<style lang="less">
	.search-box{
		margin: 10px 0;
		.ivu-select-selection:before{
			content: "\F4A5";    
			font-family: "Ionicons";
			position: absolute;
		    top: 50%;
		    right: 8px;
		    line-height: 1;
		    margin-top: -7px;
		    font-size: 14px;
		    color: #80848f;
		}
	}
</style>

<template>
    <div class="search-box">
		<Select v-model="searchValue" :placeholder="place" filterable remote clearable :remote-method="remoteMethod" :loading="majorIdLoading" @on-change="addMajorInfo" :style="{width: searchWidth}">
	        <Option v-for="item in nameList" :value="item.cnname" :key="item.cnname">{{ item.cnname }}</Option>
	    </Select>
    </div>
</template>

<script>
import valid,{
    errors,
    school,
    SchoolMajor,
    major
} from '../libs/request';
	export default {
		props:{
			'sWidth':{
				type:String,
				default:'396px'
			},
			'place':{
				type:String,
				default:'输入关键词搜索'
			},
			'placeType':{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				searchValue:'',
				majorIdLoading:false,
				nameList:[],
			}
		},
		computed:{
			searchWidth:function () {
				return this.sWidth ;
			},
			say:function () {
				return this.place ;
			},
			pType:function(){
				return this.placeType;
			}
		},
		methods:{
            remoteMethod:function (query) {
            	console.log(query)
                if (query !== '') {
                	if(this.pType==0){
	                    this.majorIdLoading = true;
	                    setTimeout(() => {
	                    	let param={schoolName:query}
	                        school.listThink(param).then(valid.call(this)).then(res => {
//	                        	console.log(res)
			                	this.nameList=res.data.data;
	                        	this.majorIdLoading = false;
						    }).catch(errors.call(this)).finally(()=>{
	                        	this.majorIdLoading = false;
						    });
	                    }, 200);
                	}else if(this.pType==1){
	                    this.majorIdLoading = true;
	                    setTimeout(() => {
	                    	let param={name:query}
	                        major.listThink(param).then(valid.call(this)).then(res => {
//	                        	console.log(res)
			                	this.nameList=res.data.data;
	                        	this.majorIdLoading = false;
						    }).catch(errors.call(this)).finally(()=>{
	                        	this.majorIdLoading = false;
						    });
	                    }, 200);
                	}
                } else {
                    this.nameList = [];
                }
            },
			addMajorInfo:function(){
				this.$emit('search',this.searchValue)
			}
		}
	}
</script>

