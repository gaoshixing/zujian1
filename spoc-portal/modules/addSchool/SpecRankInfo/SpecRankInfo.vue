<style lang="less">
	.SpecRankInfo{
		.formSpecRank{
			overflow:hidden;
			width: 930px;
			padding-right: 20px;
			.ivu-form-item{
				height:48px;
			}
			input{
				vertical-align: middle;
				.fr{
					float: right;
				}
				.fl{
					float: left;
				}
			}
			.ivu-form-item-error-tip{
				padding: 0;
			}
		}
		.unerr{
			&.ivu-form-item-error {
				.ivu-input{
				    border: 1px solid #dddee1;
				}
			}
			.ivu-form-item-content{
                .ivu-input{
					background: #ccc;
				}
			}
		}
		.ivu-radio-group-vertical{
			height: 48px;
			.ivu-radio-group-item{
				height: 18px;
			}
		}
		.usForm{
			padding-left: 26px;
		}
	}
</style>

<template>
	<div class="SpecRankInfo">
		<Form ref="SpecRankform" :model="formSpecRank" :show-message="true" :label-width="154" class="formSpecRank" :class="{usForm:!!usarr.length}">
			<FormItem :label="'U.S.News美国'+school_type+'排名'" prop='usRanking' :class="{unerr:flag!=1,usnews:usarr[0]}" :show-message="flag==1" required :rules="{required: flag==1,pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数且不能为空', trigger: 'blur'}" class="fl inline" v-if="school_type!='其他' && !!school_type">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.usRanking" type="text" class="width242"style="padding: 7px 0px;" @on-focus='focusUs'></Input>
			    <RadioGroup @on-change="unRank" v-model="flag" :vertical="true">
			        <Radio :disabled="$route.query.edit==1" label="3">暂无排名</Radio>
			        <Radio :disabled="$route.query.edit==1" label="2">没有发布</Radio>
			    </RadioGroup>
			</FormItem>
			<FormItem label="U.S.News世界大学排名" prop='world' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}"  class=" inline fr">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.world" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="福布斯美国大学排名" prop='Forbes' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class="fl inline">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.Forbes" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="毕业薪资总排名(Payscale)" prop='pay' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class=" inline fr" :class="{usnews:usarr[3]}">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.pay" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="学校创新性排名" prop='innovate' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class="fl inline" :class="{usnews:usarr[4]}">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.innovate" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="全美高中辅导员推荐度" prop='recommend' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class=" inline fr" :class="{usnews:usarr[5]}">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.recommend" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="QS世界大学排名" prop='qs' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class="fl inline">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.qs" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="泰晤士世界大学排名" prop='Times' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class=" inline fr">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.Times" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="上交大世界大学学术 排名（ARWU）" prop='arwu' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class="fl" >
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.arwu" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="U.S.News本科最佳商 科排名" prop='Business' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class="fr inline" :class="{usnews:usarr[9]}" v-if="isBusiness==1">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.Business" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="U.S.News本科最佳工科排名(提供博士)" prop='engineering' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class=" inline fr" :class="{usnews:usarr[10]}" v-if="isEngineering==1">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.doctorate" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
			<FormItem label="U.S.News本科最佳工科排名(不提供博士)" prop='engineering' :rules="{pattern:/^\d{0,7}$/, message: '必须为数字且不大于7位数', trigger: 'blur'}" class=" inline fl" :class="{usnews:usarr[11]}" v-if="isEngineering==1">
        		<Input :disabled="$route.query.edit==1" v-model="formSpecRank.engineering" type="text" class="width242"style="padding: 7px 0px;"></Input>
        	</FormItem>
        	<FormItem class="width870 fl" style="margin: 54px 0;">
        		<Button type="primary" @click="handleSubmit('SpecRankform')" class="submit">保存并下一步</Button>
        	</FormItem>
		</Form>
	</div>
</template>

<script>
import valid,{
    errors,
    school,
	usnews,
	common
} from '@/component/spoc-library-web/src/libs/request';
	export default{
		data(){
			return{
				flag:'1',
				formSpecRank:{
					usRanking:'',
					world:'',
					Forbes:'',
					pay:'',
					innovate:'',
					recommend:'',
					qs:'',
					Times:'',
					arwu:'',
					engineering:'',
					doctorate:'',
					Business:'',
				},
				rankInfo:{
				},
				ruleSpecRank:{
				},
				isBusiness:'',
				isEngineering:'',
				school_type:'',
                isOk:false,
                isChange:false,
                loading:false,
				usnewsInfo:[],
				usarr:[],
			}
		},
		computed:{
			rankList:function(){
				let arr=[
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"best_global_universities"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"forbes_american_university_rankings"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"payscale_ranking"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"most_innovative_schools"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"high_school_counselor_rankings"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"qs_global_university_ranking"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"thames_world_university_rankings"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"arwu_world_university_rankings"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"best_undergraduate_engineering_programs"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"best_undergraduate_engineering_programs_doctorate"
					},
					{
						rank:'',
						schoolId:this.$route.query.schoolId,
						type:"best_undergraduate_business_programs"
					},
//					{
//						rank:'',
//						schoolId:this.$route.query.schoolId,
//						type:"national_universities"
//					},
//					{
//						rank:'',
//						schoolId:this.$route.query.schoolId,
//						type:"national_liberal_arts_colleges"
//					},
				];
				return arr;
		},
		},
		created(){
			if(this.$route.query.schoolId){
				let params={
					id:this.$route.query.schoolId
				}
		    	school.formBasic(params).then(valid.call(this)).then(res => {
		    		if(res.ok){
		    			this.$nextTick(()=>{
			    			this.$set(this,'isBusiness',res.data.data.isBusiness)
			    			this.$set(this,'isEngineering',res.data.data.isEngineering)
			    			let schoolType=res.data.data.schoolType;
						    let param2={
						    	type:'ss_school_school_type'
						    }
						    let _this=this;
				    		let param3={
				    			usnewsId:this.$route.query.usnews
				    		}
						    usnews.rank(param3).then(valid.call(this)).then(res => {
		    					if(res.ok){
									this.usnewsInfo=res.data.data;
								}
						    }).catch(errors.call(this));
				        	school.formSsRank(params).then(valid.call(this)).then(res => {
				        		if(res.ok){
				    				let obj={};
				    				obj.rank="";
				    				obj.schoolId=this.$route.query.schoolId;
				    				obj.type=schoolType=='universities'?'national_universities':schoolType=="colleges"?'national_liberal_arts_colleges':'';
				    				this.rankList.splice(0,0,obj);
					            	if(res.data.status=="success" && !!res.data.data){
					            		for(var i=0;i<this.rankList.length;i++){
						            		for(var k=0;k<res.data.data.length;k++){
						            			if(this.rankList[i].type==res.data.data[k].type){
						            				this.rankList[i].rank=res.data.data[k].rank;
						            				if(!!res.data.data[k].flag){
						            					this.flag=res.data.data[k].flag;
						            				}
						            			}
						            		}
					            		}
						        		var num=0;
						        		for(var i in this.formSpecRank){
						        			this.formSpecRank[i]=this.rankList[num].rank;
						        			num++
						        		}
										if(this.$route.query.edit==1){
											this.$watch('formSpecRank',function (val, oldVal) { this.isChange=true;this.usarrChange();},{deep: true});
											this.$watch('flag',function (val, oldVal) { this.isChange=true;this.usarrChange();},{deep: true});
										}
					            	}else{
					                	this.$Message.error(res.data.message);
					            	}
					            	this.loading=true;
					            	setTimeout(()=>{
						            	this.$nextTick(()=>{
						            		this.usarrChange();
						            	});
					            	},100);
				        		}
						    }).catch(errors.call(this));
						    common.listData(param2).then(valid.call(this)).then(res => {
						    	if(res.ok){
									res.data.data.forEach(function(v,k){
											if(v.value==schoolType) _this.$set(_this,'school_type',v.label)
									})
						    	}
						    }).catch(errors.call(this));
			    		});
				    }
	    		}).catch(errors.call(this));
				if(this.$route.query.edit!=1){
					this.$watch('formSpecRank',function (val, oldVal) { this.isChange=true;},{deep: true});
					this.$watch('flag',function (val, oldVal) { this.isChange=true;},{deep: true});
				}
			};
		},
		// 组件内导航钩子，处理未保存退出的情况
		beforeRouteLeave: function(to, from , next){
		    if(this.isOk == false && !!this.isChange){
		        next(false);
		        this.$Modal.confirm({
	                title: '提示',
	                content: '页面未保存，是否离开？',
	                onOk:()=>{
                		next()
                	}
             	});
		    }else{
        		next()
		    }
		},
		methods:{
			usarrChange:function(){
	        	let arr=[];
        		let num=0
        		for(var i in this.formSpecRank){
					arr.push(false);
        			this.rankList[num].rank=this.formSpecRank[i];
        			num++
        		}
				for (var i in this.rankList){
					for (var k in this.usnewsInfo){
						if(this.rankList[i].type==this.usnewsInfo[k].type){
							if(this.rankList[i].type=='national_universities' || this.rankList[i].type=='national_liberal_arts_colleges'){
								if(this.rankList[i].rank==this.usnewsInfo[k].rank && this.flag==this.usnewsInfo[k].flag ){
									arr[i]=true;
								}
							}else{
								if(this.rankList[i].rank==this.usnewsInfo[k].rank){
									arr[i]=true;
								}
							}
						}
					}
				}
				this.usarr=arr;
			},
			focusUs:function(){
				this.flag=1
			},
			unRank:function(val){
				if(this.flag!=1){
					this.formSpecRank.usRanking='';
				}
			},
			rnpRank:function(val){
				if(val==1) this.$set(this,'isUn',0)
				if(this.isUn==1 || this.isRnp==1){
					this.formSpecRank.usRanking='';
				}
			},
            handleSubmit:function (name) {
                this.$refs[name].validate((valid1) => {
	                if (valid1) {
	                	let _this=this;
	                	let form=this.rankList;
	                	let ssRankList=[];
		        		var num=0
		        		for(let i in this.formSpecRank){
		        			this.rankList[num].rank=this.formSpecRank[i];
		        			num++
		        		}
		        		this.rankList[0].flag=this.flag;
	                	form.forEach(function(k,v){
	                		if(k.rank){
	                			ssRankList.push(k)
	                		}
	                		else if(v==0){
	                			ssRankList.push(k)
	                		}
	                	})
	                	school.saveSsRank(ssRankList).then(valid.call(this)).then(res => {
		                	if(res.ok){
		                		this.$Message.success(res.data.message);
		                		this.isOk=true
		                    	this.$emit('jump',3,'library.academic',this.$route.query.schoolId,this.$route.query.edit,this.$route.query.ban,this.$route.query.usnews);
		                	}
					    }).catch(errors.call(this));
	                } else {
						console.warn('form valid failed');
	                }
	            })
            },
		},
	}
</script>