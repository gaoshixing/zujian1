<style lang="less">
	.basicInfo{
		width: 100%;
		height: 100%;
		color: #212121;
		font-size:14px;
		.warn-tit{
			color: #f00;
		}
		.err{
			.ivu-form-item-error-tip{
				padding-top: 0;
			}
		}
		.ivu-form .radio{
			width: 360px;
		}
		.unerr{
			&.ivu-form-item-error {
				.ivu-select-selection {
				    border: 1px solid #dddee1;
				}
				.ivu-select-arrow {
				    color: #80848f;
				}
			}
		}
		.formBasic{
			.logo{
				 .ivu-form .logoBox .uploadBox .tips{
					line-height: 1em;
					margin-top: 20px;
				}
				.ivu-form-item-content{
					line-height: 1em;
				}
			}
		}
	}
</style>

<template>
	<div class="basicInfo">
		<p class="warn-tit">（带*表示必填项）</p>
		<Form ref="formBasic" :model="formBasic" :rules="ruleBasic" :show-message="true" :label-width="98" class="formBasic">
            <Form-item label="Logo" prop="logoUrl" style="margin-bottom:24px; margin-top:20px;" class="logo">
                <div class="infoList logoBox clearfix">
                    <div class="fl schoolLogoBox">
                        <i-input v-model="formBasic.logoUrl" v-show="false"></i-input>
                        <img :src="formBasic.logoUrl" :class="{hide:!formBasic.logoUrl}"></div>
                    <div class="fl uploadBox">
                        <Upload
                            ref="upload"
                            name="avatar"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :action="uploadImg">
                            <Button type="primary" :disabled="$route.query.edit==1">上传图片</Button>
                        </Upload>
                        <p class="tips" :disabled="$route.query.edit==1">* 文件最大为 2MB ( .png, .jpg )</p>
                        <div class="ivu-form-item-error-tip error_tips">{{imgErrorTips}}</div>
                    </div>
                </div>
            </Form-item>
			<FormItem label="学校名称" prop='schoolName' style="margin-bottom: 10px;" :class="{usnews:formBasic.schoolName==usnewsInfo.schoolName && formBasic.schoolEnname==usnewsInfo.schoolEnname}">
        		<Input :disabled="$route.query.edit==1" v-model="formBasic.schoolName" placeholder="请输入中文名称" type="text" class="width292"></Input>
        	</FormItem>
			<FormItem prop='schoolEnname'>
        		<Input :disabled="$route.query.edit==1" v-model="formBasic.schoolEnname" placeholder="请输入英文名称" type="text" class="width292" style="margin-top: 12px;"></Input>
        	</FormItem>
        	<FormItem label="学校类型" prop="schoolType" class="inline err" :class="{usnews:formBasic.schoolType==usnewsInfo.schoolType && formBasic.schoolType==usnewsInfo.schoolType}">
        		<RadioGroup v-model="formBasic.schoolType" size="small">
        			<Row class-name="radio">
        				<Col v-for="item in school_type" :span="24/school_type.length" :key="item.value">
			        		<Radio :disabled="$route.query.edit==1" :label="item.value">{{item.label}}</Radio>
        				</Col>
        			</Row>
    			</RadioGroup>
        	</FormItem>
        	<FormItem label="办学性质" prop="nature " class="inline err">
        		<RadioGroup v-model="formBasic.nature" size="small">
        			<Row class-name="radio">
        				<Col v-for="item in nature" :span="24/nature.length" :key="item.value">
			        		<Radio :disabled="$route.query.edit==1" :label="item.value">{{item.label}}</Radio>
        				</Col>
        			</Row>
    			</RadioGroup>
        	</FormItem>
        	<FormItem label="招生层次" prop="degree" class="err">
        		<CheckboxGroup v-model="degreeList" size="small" @on-change="degreeChange">
        			<Row class-name="radio">
        				<Col v-for="item in degree" :span="24/degree.length" :key="item.value">
			        		<Checkbox :disabled="$route.query.edit==1" :label="item.value">{{item.label}}</Checkbox>
        				</Col>
        			</Row>
    			</CheckboxGroup>
        	</FormItem>
	        				<FormItem label="国家" prop="country" class="inline">
				        		<Select :disabled="$route.query.edit==1" v-model="formBasic.country" class="width242">
							        <Option v-for="item in countryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							    </Select>
	        				</FormItem>
	        				<FormItem prop="region" class="inline mr18" :label-width="1">
				        		<Select :disabled="$route.query.edit==1" v-model="formBasic.region" class="width242 tl">
							        <Option v-for="item in regionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							    </Select>
	        				</FormItem>
	        				</FormItem>
	        				<FormItem prop="state" :rules="isState?{required: true, message: '请选择所属州', trigger: 'change'}:null" class="inline mr18" :label-width="1" :class="{unerr:!isState}">
				        		<Select :disabled="$route.query.edit==1" v-model="formBasic.state" class="width242 tl">
							        <Option v-for="item in stateList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							    </Select>
	        				</FormItem>
	        				</FormItem>
			<FormItem label="地理位置" prop="located" style="margin-top: 6px;" class="err" :class="{usnews:formBasic.located==usnewsInfo.located}">
            		<Input :disabled="$route.query.edit==1" v-model="formBasic.located" type="text" class="width292"></Input>
        	</FormItem>
        	<Row class="cT">
        		<Col span="12">
					<FormItem label="城市类型" prop="setting" class="inline" :class="{usnews:formBasic.setting==usnewsInfo.setting}">
		        		<Select :disabled="$route.query.edit==1" v-model="formBasic.setting" class="width292">
					        <Option v-for="item in setting" :key="item.value" :value="item.value" :label="item.value"></Option>
					    </Select>
		        	</FormItem>
        		</Col>
        		<Col span="12" class="tr">
					<FormItem label="成立时间" prop="founded" class="inline">
		            		<Input :disabled="$route.query.edit==1" v-model="formBasic.founded" type="text" class="width292"></Input>
		        	</FormItem>
        		</Col>
        	</Row>
        	<Row class="hasCollege">
        		<Col span="12">
					<FormItem label="是否有本科 商学院" prop="isBusiness" class="inline" :class="{usnews:formBasic.isBusiness==usnewsInfo.isBusiness}">
		        		<Select :disabled="$route.query.edit==1" v-model="formBasic.isBusiness" class="width292" style="padding: 7px 0;">
					        <Option value="1" label='是'>是</Option>
					        <Option value="0" label='否'>否</Option>
					    </Select>
		        	</FormItem>
        		</Col>
        		<Col span="12" class="tr">
					<FormItem label="是否有本科 工程学院" prop="isEngineering" class="inline" :class="{usnews:formBasic.isEngineering==usnewsInfo.isEngineering}">
		        		<Select :disabled="$route.query.edit==1" v-model="formBasic.isEngineering" class="width292 tl" style="padding: 7px 0;">
					        <Option value="1" label='是'>是</Option>
					        <Option value="0" label='否'>否</Option>
					    </Select>
		        	</FormItem>
        		</Col>
        	</Row>
			<FormItem label="本科生录取率%" prop="acceptRatio" style="margin-top: 6px;" :class="{usnews:formBasic.acceptRatio==usnewsInfo.acceptRatio}">
            		<Input :disabled="$route.query.edit==1" v-model="formBasic.acceptRatio" type="text" class="width292"><!--<span slot="append">%</span>--></Input>
        	</FormItem>
			<FormItem label="学校官网" prop="officeSite" class="width870">
            		<Input :disabled="$route.query.edit==1" v-model="formBasic.officeSite" type="text"></Input>
        	</FormItem>
			<FormItem label="学校简介" prop="overview" class="width870" :class="{usnews:formBasic.overview==usnewsInfo.overview}">
            		<Input :disabled="$route.query.edit==1" v-model="formBasic.overview" type="textarea" :rows="4"></Input>
        	</FormItem>
			<FormItem label="学校喜欢招 哪类学生" prop="profile" class="width870">
            		<Input :disabled="$route.query.edit==1" v-model="formBasic.profile" type="textarea" :rows="4"></Input>
        	</FormItem>
			<FormItem label="学校所在城市 的知名企业" prop="companys" class="width870">
            		<Input :disabled="$route.query.edit==1" v-model="formBasic.companys" type="textarea" :rows="4"></Input>
        	</FormItem>
        	<FormItem class="width870" style="margin: 46px 0;">
        		<Button type="primary" @click="handleSubmit('formBasic')" class="submit">保存并下一步</Button>
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
	export default {
		data () {
			return {
				degreeList:[],
				usnewsInfo:{},
				formBasic:{
					logoUrl:'',
					schoolName:'',
					schoolEnname:'',
					schoolType:'',
					nature:'',
					degree:'',
					country:'',
					region:'',
					state:'',
					located:'',
					setting:'',
					founded:'',
					isBusiness:'1',
					isEngineering:'1',
					officeSite:'',
					overview:'',
					profile:'',
					companys:'',
					acceptRatio:''
				},
				ruleBasic:{
                // 添加成员表单验证
                    logoUrl: [
                        {required: true, message: 'logo不能为空', trigger: 'change'},
                        {type: 'string', message: 'logo必须为jpg或png', pattern: /\w+(\.jpeg|\.png|\.jpg|)/i, trigger: 'blur'}
                    ],
                    schoolName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'},
                    ],
                    schoolEnname: [
                        {required: true, message: '英文名称不能为空', trigger: 'blur'},
                        {pattern: /^[\w\.\s\&\-\'\s\(\)]+$/,message: '字符错误', trigger: 'blur'}
                    ],
                    schoolType: [
                        {required: true, message: '学校类型不能为空', trigger: 'change'}
                    ],
                    nature: [
                        {required: true, message: '办学性质不能为空', trigger: 'change'}
                    ],
                    degree: [
                        {required: true, message: '招生层次不能为空', trigger: 'change'}
                    ],
                    country: [
                        {required: true, message: '请选择国家', trigger: 'change'}
                    ],
                    region: [
                        {required: true, message: '请选择所属地区', trigger: 'change'}
                    ],
                    acceptRatio: [
                        {required: true, message: '录取率不能为空', trigger: 'blur'},
                        {pattern:/^(([1-9]\d?(\.\d+)?)||(\d\.\d*[1-9]\d*))$/,message:"录取率大于0小于100",trigger:'blur'}
                    ],
                    located: [
                        {required: true,pattern: /^[\u4E00-\u9FA5\w\s\,\.\/]+$/, message: '地理位置不能为空', trigger: 'blur'}
                    ],
                    setting: [
                        {required: true, message: '城市类型不能为空', trigger: 'change'}
                    ],
                    isBusiness: [
                        {required: true, message: '是否有本科商学院', trigger: 'change'}
                    ],
                    isEngineering: [
                        {required: true, message: '是否有本科工程学院', trigger: 'change'}
                    ],
				},
				school_type:[],
				nature:[],
				degree:[],
				setting:[],
				countryList: [],
				regionList: [],
				stateList: [],
                imgErrorTips:"",
                isOk:false,
                isChange:false
			}
		},
		computed:{
			uploadImg:function(){
				return common.uploadImg();
			},
			isState:function(){
					return !!this.stateList.length;
			},
		},
		created() {
			let param={
				id:0
			}
		    common.areaRest(param).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.countryList=res.data.data;
		    	}
		    }).catch(errors.call(this));
		    
		    let param2={
		    	type:'ss_school_school_type'
		    }
		    common.listData(param2).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.school_type=res.data.data;
		    	}
		    }).catch(errors.call(this));
		    let param1={
		    	type:'ss_school_nature'
		    }
		    common.listData(param1).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.nature=res.data.data;
		    	}
		    }).catch(errors.call(this));
		    let param3={
		    	type:'ss_school_degree'
		    }
		    common.listData(param3).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.degree=res.data.data;
		    	}
		    }).catch(errors.call(this));
		    let param5={
		    	type:'ss_school_setting'
		    }
		    common.listData(param5).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.setting=res.data.data;
		    	}
		    }).catch(errors.call(this));
		    if(!!this.$route.query.schoolId){
			    let params4={
			    	id:this.$route.query.schoolId
			    }
		    	school.formBasic(params4).then(valid.call(this)).then(res => {
		    		if(res.ok){
		    			this.$set(this,'formBasic',res.data.data)
//		    			this.$set(this.formBasic,'country',parseInt(this.formBasic.country));
//		    			this.$set(this.formBasic,'region',parseInt(this.formBasic.region));
//		    			this.$set(this.formBasic,'state',parseInt(this.formBasic.state));
		    			let arr=!!this.formBasic.degree?this.formBasic.degree.split(','):[]
		    			this.$set(this,'degreeList',arr);
		    		}
		    		if(!!this.$route.query.usnews){
			    		let param6={
			    			usnewsId:this.$route.query.usnews
			    		}
			    		usnews.info(param6).then(valid.call(this)).then(res => {
					    	this.usnewsInfo=res.data.data;
					    }).catch(errors.call(this)).finally(()=>{
					    });
		    		}
					if(this.$route.query.edit==1){
				    	this.$watch('formBasic',function (val, oldVal) { this.isChange=true;},{deep: true});
					}
			    }).catch(errors.call(this)).finally(()=>{
			    });
		    }
			if(this.$route.query.edit!=1){
		    	this.$watch('formBasic',function (val, oldVal) { this.isChange=true;},{deep: true});
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
		methods:{
			degreeChange:function(arr){
				if(!!arr.length) this.$set(this.formBasic,'degree',arr.join(','));
				else  this.$set(this.formBasic,'degree','');
			},
			toRegion:function(val){
				console.log(val||0)
				let param={
					id:val||0
				}
			    common.areaRest(param).then(valid.call(this)).then(res => {
		    		if(res.ok){
			    		this.regionList=res.data.data;
			    	}
			    }).catch(errors.call(this));
			},
			toState:function(val){
				let param={
					id:val
				}
				if(val){
				    common.areaRest(param).then(valid.call(this)).then(res => {
		    			if(res.ok){
				    		this.stateList=res.data.data;
				    	}
				    }).catch(errors.call(this));
				}else{
					this.stateList=[];
				}
			},
		      handleSubmit:function (name) {
		          this.$refs[name].validate((valid1) => {
		            if (valid1) {
		              	let param=this.formBasic;
		              	delete param.schoolRanking;
		                school.saveBasic(param).then(valid.call(this)).then(res => {
			                if(res.ok){
			                  this.$Message.success(res.data.message);
			                  this.isOk=true;
			                  this.$emit('jump',2,'library.SpecRankInfo',res.data.data,this.$route.query.edit,this.$route.query.ban,this.$route.query.usnews);
			                }
				        }).catch(errors.call(this));
		            } else {
		                this.$Message.error('失败!');
		            }
		        })
		      },
			handleSuccess:function(data){
		      if (data.status == "success") {
		        this.formBasic.logoUrl = data.data.filePath;
		      } else {
		        this.$Message.error(data.message);
		      }
			},
			handleFormatError:function(){
      			this.$Message.error("需使用jpg、jpeg、png格式图片");
			},
			handleMaxSize:function(){
      			this.$Message.error("图标大小不能超过2MB");
			}
		},
		watch:{
			'formBasic.country': {
				handler(val, oval) {
					this.toRegion(val)
				},
			},
			'formBasic.region': {
				handler(val, oval) {
					this.toState(val)
				},
			},
		}
	}
</script>