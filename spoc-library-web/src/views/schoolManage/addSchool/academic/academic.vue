<style lang="less">
	.academic{
		.search{
			display: inline-block;
			margin: 0px 0 0 27px;
			.ivu-input{
				width: 210px;
			}
			.ivu-input-icon{
				line-height: 41px;
			}
		}
		.ivu-table-wrapper{
			border: 0;
			.ivu-table-header{
				thead th{
					background: #f7f7f7;
				}
			}
			.ivu-table td{
				background: #fff;
			}
			.ivu-table th{
				overflow: inherit;
			}
		}
		.ivu-table-tbody{
			.ivu-table-row{
				height: 58px;
			}
		}
		.ivu-table td.majorRankFont{
			color: #307cb6;
		}
		.submit{
			margin: 46px auto;
		}
		.page-box{
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
	}
	.modal-major{
		.formModal{
			overflow: hidden;
			padding-right: 30px;
			.width200{
				width: 200px;
			}
			.ivu-form-item{
				height: 34px;
				margin-bottom: 20px;
				.ivu-form-item-label{
					color: #999999;
				}
				.ivu-input{
					background: #fafafa;
					color: #212121;
					font-size:14px;
				}
				.ivu-input:hover{
					background: #fff;
				}
				.ivu-select-placeholder{
					color: #b3b3b3;
				}
			}
			.langlabel{
				.ivu-form-item-label{padding:5px 12px 0 0px;
				}
			}
		}
		.warn-tit{
			color: #e83323;
			margin-bottom: 16px;
		}
		.formModal{
			height: 312px;
		}
	}
</style>

<template>
	<div class="academic">
		<Btnlists title="当前学校开设的本科学院及专业项目" :btnList="btninfo" >
	  		<v-select style="width: 210px;" class="search" placeholder="输入关键词搜索" icon="search" v-model="searchValue" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
		</Btnlists>
		<Table ref="itemTable" :columns="itemCol" :data="itemData" size="large" @on-selection-change="selection"></Table>
	  	<div class="page-box">
	        <div style="margin: auto;display: inline-block;">
	            <Page :total="count" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
	        </div>
	    </div>
		<Button type="primary" @click="handleSubmit('formBasic')" class="submit">保存并下一步</Button>
		<Modal ref="modalMajor" v-model="modalMajor" :title="modalTitle" ok-text="保存" width="730" class="modal-major" @on-ok="rulesSubmit('formModal')" >
        <div>
			<p class="warn-tit">（带*表示必填项）</p>
        	<Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="100" class="formModal">
        		<FormItem label="专业名称" prop='majorId' class="fl" style="width: 100%;">
	        		<Select :disabled="$route.query.edit==1" :label="formModal.majorCnname" v-model="formModal.majorId" placeholder="从标准专业库中选择" class="width200" filterable remote :remote-method="remoteMethod" :loading="majorIdLoading" @on-change="addMajorInfo">
				        <Option v-for="item in nameList" :value="item.id" :key="item.id">{{ item.cnname }}</Option>
				    </Select>
	        	</FormItem>
				<FormItem label="该专业在当前学校的名称" prop='name' class=" inline fl langlabel">
	        		<Input :disabled="$route.query.edit==1" v-model="formModal.name" placeholder="默认同标准专业库(中文)" type="text" class="width200"></Input>
	        	</FormItem>
				<FormItem label="该专业在当前学校的名称" prop='enName' class=" inline fr langlabel">
	        		<Input :disabled="$route.query.edit==1" v-model="formModal.enName" placeholder="默认同标准专业库（英文）" type="text" class="width200"></Input>
	        	</FormItem>
				<FormItem label="所属学院" prop='collegeName' class=" inline fl">
	        		<Input :disabled="$route.query.edit==1" v-model="formModal.collegeName" placeholder="专业在当前学校的所属学院" type="text" class="width200"></Input>
	        	</FormItem>
	        	<FormItem label="学院类型" prop='collegeType' class="fr inline">
	        		<Select :disabled="$route.query.edit==1" v-model="formModal.collegeType" placeholder="请选择学院类型" class="width200">
				        <Option v-for="item in collegeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
	        	</FormItem>
	        	<FormItem label="专业排名" prop='majorRank' class="fl">
        			<Input :disabled="$route.query.edit==1" v-model="formModal.majorRank" type="text" number class="width200"></Input>
        			<span style="color: #999999;">&nbsp;&nbsp;(指该专业在U.S.News上的本科专业排名，没有则不填)</span>
	        	</FormItem>
				<FormItem label="专业备注" prop='remarks' class=" inline fl">
	        		<Input :disabled="$route.query.edit==1" v-model="formModal.remarks" type="textarea" style="width: 576px" :rows="4"></Input>
	        	</FormItem>
        	</Form>
        </div>
    </Modal>
	</div>
</template>

<script>
import vSelect from "../../../../modules/vSelect.vue";
import Btnlists from '@public/modules/btnlist';
import valid,{
    errors,
    school,
    SchoolMajor,
	major,
	common
} from '../../../../libs/request';
	export default{
		data(){
			return {
				majorIdLoading:false,
				itemCol:[
					{
						type: 'selection',
	                    width: 50,
	                    title:'',
	                    align: 'center'	
					},
                    {
                        title: '专业',
                        align:'center',
                        key: 'name'
                    },
                    {
                        title: '所属学院',
                        align:'center',
                        key: 'collegeName',
                    },
                    {
                        title: '学院类型',
                        align:'center',
                        key: 'collegeType'
                    },
                    {
                        title: 'U.S.News专业排名',
                        align:'center',
                        key: 'majorRank',
                        className:'majorRankFont',
                        render:(h,params)=>{
                        	return h('span',params.row.majorRank || '空')
                        }
                    },
                    {
                        title: '操作',
                        key: 'name',
                        align:'center',
                        render:(h,params)=>{
                        	return h('div',{
                    		},[
                    			h("Button",
                    				{	
										style: {
										    color: '#0d70b0',
										    fontSize: '12px'
										},
										attrs: {
											type:'text'
										},
										on:{
											click:()=>{
											    for(var i in this.formModal){
											    	this.$set(this.formModal,i,params.row[i])
											    }
									    		this.$refs['formModal'].validate((valid1) => {
									    			
									    		})
												this.onModal('编辑专业信息',);
											}
										}
                    				},'编辑'
                    			),
                    			h("Button",
                    				{	
										style: {
										    color: '#0d70b0',
										    fontSize: '12px'
										},
										attrs: {
											type:'text'
										},
										on:{
											
										}
                    				},'查看'
                    			),
                    		])
                        }
                    },
				],
				itemData:[],
				pitchItem:[],
				btninfo: [
					{
						text: '删除专业',
						type: 'default',
						cls: 'bt1',
						visible: false,
					},
					{
						text: '导入专业',
						type: 'default',
						cls: 'bt4',
						event: this.importMajor,
					},
					{
						text: '添加专业',
						event: this.addMajor,
					},
				],
				modalMajor:false,
				modalTitle:'',
				formModal:{
					majorId :'',
					name:'',
					enName:'',
					collegeName:'',
					collegeType:'',
					majorRank:'',
					remarks:'',
					majorCnname:'',
					id:'',
					schoolId:this.$route.query.schoolId
				},
				ruleModal:{
					majorId:{required:true,message:"专业名称不能为空",trigger: 'change'},
					name:{required:true,message:"当前学校的名称不能为空",trigger: 'blur'},
					enName:{required:true,message:"当前学校的名称不能为空",trigger: 'blur'},
					collegeName:{required:true,message:"所属学院不能为空",trigger: 'blur'},
					collegeType:{required:true,message:"学院类型不能为空",trigger: 'change'},
				},
				nameList:[],
				collegeTypeList:[],
				searchValue:'',
				pageNum:1,
				count:0,
				pageSize:10,
			}
		},
		components:{
			vSelect,
			Btnlists,
		},
		watch: {
			pitchItem(newVal) {
				if (newVal) {
					this.$set(this.btninfo[0], 'visible', true);
					this.$set(this.btninfo[0], 'event', this.delMajor('删除专业', this.pitchItem));
				} else {
					this.$set(this.btninfo[0], 'visible', false);
				}
			},
		},
		created(){
			let prams={
				schoolId:this.$route.query.schoolId,
				name:'',
				pageNo:1,
				pageSize:this.pageSize
			}
        	SchoolMajor.listSchool(prams).then(valid.call(this)).then(res => {
            	if(res.ok){
            		this.count=res.data.data.count;
            		this.itemData=res.data.data.list;
            	}
		    }).catch(errors.call(this));
		},
		methods:{
			searchDropList(word){
				return new Promise((resolve,reject)=>{
	            	SchoolMajor.listThink({name:word,schoolId:this.$route.query.schoolId}).then(valid.call(this)).then(res=>{
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
			sizeChange:function(val){
				this.pageSize=val;
				let prams={
					schoolId:this.$route.query.schoolId,
					name:this.searchValue,
					pageNo:this.pageNum,
					pageSize:this.pageSize
				}
	        	SchoolMajor.listSchool(prams).then(valid.call(this)).then(res => {
	            	if(res.ok){
            			this.count=res.data.data.count;
	            		this.itemData=res.data.data.list;
	            		this.$Message.success(res.data.message);
	            	}
			    }).catch(errors.call(this));
			},
			addMajorInfo:function(val){
				for (var i in this.nameList){
					if(this.nameList[i].id==val){
						this.formModal.name=this.nameList[i].cnname
						this.formModal.enName=this.nameList[i].enname
					}
				}
			},
			pageChange:function(num){
				this.pageNum=num;
				let prams={
					schoolId:this.$route.query.schoolId,
					name:this.searchValue,
					pageNo:this.pageNum,
					pageSize:this.pageSize
				}
	        	SchoolMajor.listSchool(prams).then(valid.call(this)).then(res => {
	            	if(res.ok){
            			this.count=res.data.data.count;
	            		this.itemData=res.data.data.list;
	            		this.$Message.success(res.data.message);
	            	}
			    }).catch(errors.call(this));
			},
			textChange:function(val){
				this.$nextTick(()=>{
					let prams={
						schoolId:this.$route.query.schoolId,
						name:this.searchValue,
						pageNo:this.pageNum,
						pageSize:this.pageSize
					}
		        	SchoolMajor.listSchool(prams).then(valid.call(this)).then(res => {
		            	if(res.ok){
	            			this.count=res.data.data.count;
		            		this.itemData=res.data.data.list;
		            		this.$Message.success(res.data.message);
		            	}
				    }).catch(errors.call(this));
			    })
			},
            handleSubmit:function (name) {
                this.$emit('jump',4,'library.applyInfo',this.$route.query.schoolId,this.$route.query.edit,this.$route.query.ban,this.$route.query.usnews);
            },
            rulesSubmit:function (name) {
                this.modalMajor=true;
                this.$refs[name].validate((valid1) => {
                    if (valid1) {
                        this.modalMajor=false;
	                	SchoolMajor.saveSchool(this.formModal).then(valid.call(this)).then(res => {
		                	if(res.ok){
								let prams={
									schoolId:this.$route.query.schoolId,
									name:this.searchValue,
									pageNo:this.pageNum,
									pageSize:this.pageSize
								}
					        	SchoolMajor.listSchool(prams).then(valid.call(this)).then(res => {
					            	if(res.ok){
				            			this.count=res.data.data.count;
					            		this.itemData=res.data.data.list;
					            		this.$Message.success(res.data.message);
					            	}else{
					                	this.$Message.error(res.data.message);
					            	}
							    }).catch(errors.call(this));
		                		this.$Message.success(res.data.message);
		                	}
					    }).catch(errors.call(this));
                    } else {
						this.$refs.modalMajor.visible = true;
						this.modalMajor = true;
                    }
              })
            },
		  	selection:function(data){
		  		this.pitchItem=data;
		  	},
            remoteMethod:function (query) {
            	console.log(query)
                if (query !== '') {
                    this.majorIdLoading = true;
                    setTimeout(() => {
                    	let param={name:query}
                        major.listThink1(param).then(valid.call(this)).then(res => {
                        	if(res.ok){
			                	this.nameList=res.data.data;
	                        	this.majorIdLoading = false;
                        	}
					    }).catch(errors.call(this)).finally(()=>{
					    });
                    }, 200);
                } else {
                    this.nameList = [];
                }
            },
		  	addMajor:function(){
			    for(var i in this.formModal){
			    	this.$set(this.formModal,i,'')
			    	this.$set(this.formModal,'schoolId',this.$route.query.schoolId)
			    }
		  		this.onModal('添加专业信息')
		  	},
			delMajor:function(val,item){
				if(!!item.length){
					this.$Modal.confirm({
						title:val,
		                render: (h) => {
		                    return h('div', {
		                        style: {
									marginTop:'14px',
									borderTop:'1px #dcdcdc solid',
									paddingTop:'40px',
									textAlign:'center',
									fontSize:'14px',
									fontWeight:'bold'
		                        }
		                    },'您确定要删除吗？')
		                },
		                onOk:()=>{
		                	let arr=[];
		                	item.forEach(function(v,k){
							   arr.push(v.id)
		                	})
                			let str={ids:arr.join(',')}
		                	SchoolMajor.batchdeletedeleteSchool(str).then(valid.call(this)).then(res => {
			                	if(res.ok){
									let prams={
										schoolId:this.$route.query.schoolId,
										name:this.searchValue,
										pageNo:this.pageNum,
										pageSize:this.pageSize
									}
						        	SchoolMajor.listSchool(prams).then(valid.call(this)).then(res => {
						            	if(res.ok){
					            			this.count=res.data.data.count;
						            		this.itemData=res.data.data.list;
						            		this.$Message.success(res.data.message);
						            	}
								    }).catch(errors.call(this));
			                		this.$Message.success(res.data.message);
			                	}
						    }).catch(errors.call(this));
		                }
		            })
				}else{
		            this.$Modal.warning({
		                title: '',
		                content: '请选择专业'
		            });
				}
			},
			onModal:function(val){
				this.loader=true;
				this.modalMajor=true;
				this.modalTitle=val;
				let param={
					type:'ss_school_major_college_type'
				}
			    common.listData(param).then(valid.call(this)).then(res => {
			    	if(res.ok){
				    	this.$nextTick(()=>{
				    		this.collegeTypeList=res.data.data;
				    	})
			    	}
			    }).catch(errors.call(this));
			},
			importMajor:function(cont){
				this.$router.push({name:'library.import',query:{t:'school_major'}})
			},
        }
	}
</script>

