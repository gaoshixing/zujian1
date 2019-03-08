<style lang="less">
.lib_addAcademe_step1{
  .warning{
	margin-bottom: 20px;
  }
  .upload_form{
	.ivu-form-item-label{
	  margin-top: 12px;
	}
  .upload_logo{
	display: flex;

	.academe_icon{
	  border: 1px solid #e0e1e2;
	  display: inline-block;
	  width: 70px;
	  height: 70px;
	  background-color: #f1f1f1;
	  border-radius: 5px;
	}
	.upload_btn{
	  margin-top: 5px;
	  margin-left: 25px;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  .ivu-upload{
	   background-color:#44bcb7; 
	   border-radius: 4px;
	   color: #fff;
	   line-height: 28px;
	  }
	  .ivu-upload-drag{
		border:none;
	  }
	  .tipInfo{
		color: #999899;
	  }
	}
  }
  }
  .labelIcon{
	position: relative;
	img{
	  position: absolute;
	  top: -25%;
	  left: -50px;
	}
  }
  .ivu-radio-group{
	width: 100%;
  }
	.unerr{
		&.ivu-form-item-error {
			.ivu-input{
				border: 1px solid #dddee1;
			}
		}
		.ivu-form-item-content{
			.ivu-input,.ivu-select-input{
				background: #ccc;
			}
			.ivu-select-selection:hover{
				border-color: transparent;
			}
			.ivu-select-selection{
				border-color: transparent;
			}
		}
	}
}
</style>

<template>
  <div class="lib_addAcademe_step1">
	<v-title title="学院基本信息"></v-title>
	<div class="warning">
   （带*表示必填项）
	</div>
	<Form ref="addAcadmeStep1" :model="addAcadmeData1" :rules="ruleAcademe1" :label-width="100" label-position="right" style="margin-left:70px;max-width:1200px;">
	  <FormItem  label="学院logo" prop="logoUrl" required class="upload_form">
		<div class="upload_logo">
		  <i-input v-model="addAcadmeData1.logoUrl" v-show="false"></i-input>
		  <img :src="addAcadmeData1.logoUrl" alt="" class="academe_icon">
		  <div class="upload_btn">
			<Upload
			  ref="academeLogo"
			  :show-upload-list="false"
			  :on-success="handleSuccess"
			  :format="['jpg','jpeg','png']"
			  :max-size="100"
			  :on-format-error="handleFormatError"
			  :on-exceeded-size="handleMaxSize"
			  type="drag"
			  :action="uploadUrl"
			  name= "avatar"
			  style="width:94px;">
			  上传图片
			</Upload>
			<div class="tipInfo":disabled="$route.query.edit==1">* 文件最大为2MB ( .png, .jpg,)</div>
		  </div>  
		</div>
	  </FormItem>
	  <FormItem label="学院名称" prop="cnName"> 
		<Row>
		  <Col span="9">
			<span v-if="labelIconShow&&sourceObj.cnName==usnewObj.cnName" class="labelIcon" slot="label">学院名称<img src="../../../../assets/images/schoolManage/addSchool/us.svg" alt="" width="25"></span>
			<Input :disabled="$route.query.edit==1" placeholder="请输入中文名称" v-model="addAcadmeData1.cnName"></Input>
		  </Col>
		</Row>
	  </FormItem>
	  <FormItem prop="enName"> 
		<Row>
		  <Col span="9">
			<Input :disabled="$route.query.edit==1" v-model="addAcadmeData1.enName" placeholder="请输入英文名称"></Input>
		  </Col>
		</Row>
	  </FormItem>
	  <FormItem label="学院类型" prop="type">
		<Row>
		  <Col span="9">
			  <Select :disabled="$route.query.edit==1" v-model="addAcadmeData1.type" placeholder="请选择学院类型">
				<Option :value="item.value" v-for="item in addAcadmeTypeList" :key="item.id">{{item.label}}</Option>
			  </Select>
		  </Col>
		</Row>
	  </FormItem>  
	  <FormItem label="招生学位" prop="degree">
		<CheckboxGroup  v-model="addAcadmeData1.degree">
		  <Checkbox :disabled="$route.query.edit==1" v-for="item in degreeList" :key="item.id" :label="item.value">{{item.label}}</Checkbox>
		</CheckboxGroup>
	  </FormItem>
	  <FormItem label="隶属学校" prop="schoolId" required :class="{unerr:addAcadmeData1.isSubschool.length!=0}" :show-message="addAcadmeData1.isSubschool.length==0" :rules="{required:addAcadmeData1.isSubschool.length==0,message:'请选择隶属学校',trigger:'blur'}">
		<span v-if="labelIconShow&&sourceObj.schoolId==usnewObj.schoolId" class="labelIcon" slot="label">隶属学校<img src="../../../../assets/images/schoolManage/addSchool/us.svg" alt="" width="25"></span>
		<Row>
		  <Col span="9">
			<Select
				v-model="addAcadmeData1.schoolId"
				filterable
				remote
				:label="addAcadmeData1.schoolEnname"
				:remote-method="remoteMethod"
				:loading="loading"
				:disabled="schoolIdDisable || $route.query.edit==1"
				placeholder="">
				<Option v-for="(option, index) in schoolList" :value="option.id" :key="index">{{option.enname}}</Option>
			</Select>
		  </Col>
		  <Col span="13" push="1">
			<CheckboxGroup v-model="addAcadmeData1.isSubschool">
			  <Checkbox :disabled="$route.query.edit==1" label="0">没有隶属学校</Checkbox>
			</CheckboxGroup>
		  </Col>
	   </Row>
	  </FormItem>
	  <FormItem prop="ranking" label="U.S.News学院总排名" :class="{unerr:addAcadmeData1.flag!=1}" :show-message="addAcadmeData1.flag==1" :rules="{required: addAcadmeData1.flag==1,pattern:/^\d{0,4}$/, message: '必须为数字且不大于5位数且不能为空', trigger: 'blur'}">
		<span v-if="labelIconShow&&sourceObj.ranking==usnewObj.ranking" class="labelIcon" slot="label">U.S.News学院总排名<img src="../../../../assets/images/schoolManage/addSchool/us.svg" alt="" width="25"></span>
		<Row>
			<Col span="9">
				<Input :disabled="$route.query.edit==1" v-model="addAcadmeData1.ranking" @on-focus='focusUs'></Input>
			</Col>
			<Col span="9" push="1">
				<RadioGroup v-model="addAcadmeData1.flag" @on-change="unRank">
					<Radio :disabled="$route.query.edit==1" label="3">
						暂无排名
					</Radio>
					<Radio :disabled="$route.query.edit==1" label="2">
						没有发布
					</Radio>
				</RadioGroup>
			</Col>
		</Row>
	  </FormItem>
	  <FormItem prop="located" label="学院地理位置">
		<Row>
		  <Col span="9">
		   <Input :disabled="$route.query.edit==1" v-model="addAcadmeData1.located"></Input>
		</Col>
		</Row>
	  </FormItem>
	  <FormItem prop="graduateAcceptRate" label="硕士录取率%">
		<span v-if="labelIconShow&&sourceObj.graduateAcceptRate==usnewObj.graduateAcceptRate" class="labelIcon" slot="label">硕士录取率%<img src="../../../../assets/images/schoolManage/addSchool/us.svg" alt="" width="25"></span>
		<Row>
		  <Col span="9">
		   <Input :disabled="$route.query.edit==1" v-model="addAcadmeData1.graduateAcceptRate"></Input>
		</Col>
		</Row>
	  </FormItem>
	  <FormItem prop="doctorAcceptRate" label="博士录取率%">
		<span v-if="labelIconShow&&sourceObj.doctorAcceptRate==usnewObj.doctorAcceptRate" class="labelIcon" slot="label">博士录取率%<img src="../../../../assets/images/schoolManage/addSchool/us.svg" alt="" width="25"></span>
		<Row>
		  <Col span="9">
		   <Input :disabled="$route.query.edit==1" v-model="addAcadmeData1.doctorAcceptRate"></Input>
		</Col>
		</Row>
	  </FormItem>  
	 <FormItem label="学院简介" prop="intro">
	   <span v-if="labelIconShow&&sourceObj.intro==usnewObj.intro" class="labelIcon" slot="label">学院简介<img src="../../../../assets/images/schoolManage/addSchool/us.svg" alt="" width="25"></span>
	   <Input :disabled="$route.query.edit==1" type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="addAcadmeData1.intro"></Input>  
	 </FormItem>
	  <div class="btnSubmit">
		<FormItem>
		  <Button type="primary" @click="handleSubmit('addAcadmeStep1')">保存并下一步</Button>
		</FormItem> 
	  </div>
	</Form>
  </div>
</template>

<script>
import vTitle from "@public/modules/vTitle";
import valid,{errors, fillAcademeBasicInfo,school,sysAcademeBasicInfo } from "../../../../libs/request";
import { mapMutations,mapState } from "vuex";
import { formatParams,parseResData } from "../../../../libs/util";
import { usnews } from "../../../../libs/usnews";
export default {
  name:'basicInfo',
  inheritAttrs: false,
  data () {
	return {
	  isOk:false,
	  isChange:false,
	  addAcadmeTypeList:[],
	  loading:false,
	  degreeList:[],
	  schoolIdDisable:false,
	  rankingDisable:false,
	  // 隶属学校
	  schoolList:[],
	  addAcadmeData1:{
	  logoUrl:'', 
	  cnName:'',
	  enName:'',
	  type :'',
	  degree:[],
	  schoolId :'',
	  isSubschool:[],
	  ranking :'',
	  located:'',
	  graduateAcceptRate:'',
	  doctorAcceptRate:'',
	  intro:'',
	  flag:'1',
	  },
	  ruleAcademe1:{
		logoUrl: [{ required: true, message:'请选择学院logo'}],
		cnName: [{ required: true, message:'请填写学院中文名称', trigger: 'blur'},{pattern:/^[\u4e00-\u9fa5\w\.\s\&\-]{2,80}$/, message:'特殊字符只能包含&和空格', trigger: 'blur'}],
		enName: [{ required: true, message:'请填写学院英文名称', trigger: 'blur'},{pattern:/^[\u4e00-\u9fa5\w\.\s\&\-]{2,80}$/, message:'特殊字符只能包含&和空格', trigger: 'blur'}],
		type: [{ required: true, message:'请选择学院类型', trigger: 'blur'}],
		degree: [{ required: true, type: 'array',message:'请选择学位类型', trigger: 'change' }],
		graduateAcceptRate: [{ required: true,pattern:/^(([1-9]\d?(\.\d+)?)||(\d\.\d*[1-9]\d*))$/, message:'请填写硕士录取率(数字大于0小于100)', trigger: 'blur'}],
		doctorAcceptRate: [{ required: true,pattern:/^(([1-9]\d?(\.\d+)?)||(\d\.\d*[1-9]\d*))$/, message:'请填写博士录取率(数字大于0小于100)', trigger: 'blur'}],
	  },
	  labelIconShow:false,
	  //  编辑学院信息源信息
	  sourceObj:{},
	  usnewObj:{}
	}
  },
  computed: {
	uploadUrl(){
	  return sysAcademeBasicInfo.uploadUrl();
	}
  },
  components: {
	vTitle
  },
  created () {
	if(this.$route.params.currentTitle == 1){
	  this.labelIconShow = true;
	  // 获取编辑数据
	  this.fetchEditDate();
	}
	this.fetchGradeSchoolType();
	this.fetchDegree();
	if(this.$route.params.currentTitle!=1){
	  this.$watch('addAcadmeData1',function (val, oldVal) {this.isChange=true;},{deep: true});
	}
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
  methods: {
	...mapMutations(['updateLoadingStatus']),
	   // fetch 学院类型
	fetchGradeSchoolType(){
		this.updateLoadingStatus({ isLoading: true });
		sysAcademeBasicInfo.fetchGradeSchoolType('ss_gradeschool_type').then(valid.call(this)).then(res => {
			if (res.ok) {
				this.addAcadmeTypeList = res.data.data;
			}
		})
		.catch(errors.call(this))
		.finally(() => {
			this.updateLoadingStatus({ isLoading: false });
		});
	},
	  //fetch学位类型
	fetchDegree(){
	   this.updateLoadingStatus({ isLoading: true });
		sysAcademeBasicInfo.fetchDegree('ss_school_major_level_type').then(valid.call(this)).then(res => {
			if (res.ok) {
				this.degreeList = res.data.data;
			}
		})
		.catch(errors.call(this))
		.finally(() => {
			this.updateLoadingStatus({ isLoading: false });
		});
	} , 

	handleSuccess(data) {
	  if (data.status == "success") {
		this.addAcadmeData1.logoUrl = data.data.filePath;
	  } else {
		this.$Message.error(data.message);
	  }
	},
	handleFormatError() {
	  this.$Message.error("需使用jpg、png格式图片");
	},
	handleMaxSize() {
	  this.$Message.error("图标大小不能超过2MB");
	},
	remoteMethod(query){
		this.loading = true;
		school.fetchListThink(query).then(valid.call(this)).then(res => {
		  if (res.ok) {
			this.schoolList = res.data.data;
		  }
		})
		.catch(errors.call(this))
		.finally(() => {
		  this.loading = false;
		});
	},
	handleSubmit (name) {
	   let params = Object.assign({},this.addAcadmeData1);
	   delete params.ssSchoolMajorList;
	   
	   if(params.isSubschool.length ==0){
		  //  this.ruleAcademe1.schoolId = [{ required: true,message:'请选择隶属学校', trigger: 'blur' }];
		   params.isSubschool = 1;
	   }else{
		   params.schoolId = 0;
		   params.isSubschool = 0;
	   }
		params.degree = params.degree.toString(); 
	  //  delete params.ranking;
		this.$refs[name].validate((validate) => {
			if (validate) {
					this.updateLoadingStatus({ isLoading: true });
					fillAcademeBasicInfo.fillAcademeBasicInfo(params).then(valid.call(this)).then(res => {
						if (res.ok) {
							this.isOk = true;
							this.$router.push({name:'library.academeMajorProject',params:{currentTitle:this.$route.params.currentTitle,processStep:2},query:{schoolId:res.data.data}})
						}
					})
					.catch(errors.call(this))
					.finally(() => {
					  this.updateLoadingStatus({ isLoading: false });
					});
			} else {
				this.$Message.error('请填写必填信息!');
			}
		})
	},
	// 查看学院基本信息（按Id）
	fetchEditDate(){
		 this.updateLoadingStatus({ isLoading: true });
		   fillAcademeBasicInfo.fetchBasicInfo(this.$route.query.schoolId).then(valid.call(this)).then(res => {
				if (res.ok) {
					this.sourceObj = res.data.data;
					let obj = res.data.data;
					console.log('obj',obj);
					
					if(/,/.test(obj.degree)){
						obj.degree = obj.degree.split(',');
					}else{
						obj.degree = Array.of(obj.degree);
					}
					if(obj.isSubschool){
						obj.isSubschool = [];
					}else{
						obj.isSubschool =['1'];                   
					}
					if(obj.ranking==22222||obj.ranking==11111){
						obj.ranking ='';
					}
					this.addAcadmeData1 = obj;
					if(!!String(this.sourceObj.usnewsId)){
						usnews.gradeSchoolInfo(this.sourceObj.usnewsId).then(valid.call(this)).then(res=>{
							console.log('=================',res.data.data);
							this.usnewObj = res.data.data;  
							this.$watch('addAcadmeData1',function (val, oldVal) {this.isChange=true;},{deep: true});
						})
					}else{
						this.$watch('addAcadmeData1',function (val, oldVal) {this.isChange=true;},{deep: true});
					}		
				}
			})
			.catch(errors.call(this))
			.finally(() => {
			  this.updateLoadingStatus({ isLoading: false });
			});   
	},
	focusUs:function(){
		this.addAcadmeData1.flag=1
	},
	unRank:function(val){
		if(this.addAcadmeData1.flag!=1){
			this.addAcadmeData1.ranking='';
		}
	},
  },
  watch: {
	['addAcadmeData1.isSubschool'](val){
		if(val.length){
			this.schoolIdDisable = true; 
			this.addAcadmeData1.schoolId ='';   
		}else{
			this.schoolIdDisable = false; 
		}
	},
  },
}
</script>

