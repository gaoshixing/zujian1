<style lang="less">
	.bonus{
		.width280{
			width: 280px;
		}
		.width420{
			width: 420px;
		}
		.width684{
			width: 684px;
		}
		.ivu-form-item-error-tip{
			padding: 0;
		}
		.nextBtn{
			padding: 30px 0 14px;
			clear: both;
			.button{
				width: 175px;
				height: 40px;
				display: block;
				margin: auto;
			}
		}
		.fellowship{
			.ivu-form-item-label{
				padding: 0px 12px 0 24px;
				line-height: 16px;
			}
		}
		.fellowship1{
			.ivu-form-item-label{
				padding: 0px 12px 0 0px;
				line-height: 16px;
			}
		}
		.warn-tit{
			color: #f00;
			margin-bottom: 14px;
		}
		.bonusForm{
			width: 960px;
		}
	}
</style>

<template>
	<div class="bonus">
		<p class="warn-tit">（带*表示必填项）</p>
		<Form ref="formBonus" :model="bonusForm" :rules="ruleBonus" :label-width="156" class="bonusForm">
			<FormItem label="学费 / 年" prop="cost" :class="{usnews:bonusForm.cost==usnewsInfo.cost}">
		        <Input :disabled="$route.query.edit==1" v-model="bonusForm.cost" type="text" class="width242"></Input>&emsp;（万美元）
			</FormItem>
        	<FormItem label="国际生是否可申请奖学金" prop="isScholarships" class="widthMax fellowship">
        		<RadioGroup v-model="bonusForm.isScholarships" size="small">
        			<Row class-name="width420">
        				<Col span="8">
			        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
        				</Col>
        				<Col span="8">
			        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
        				</Col>
        				<Col span="8">
			        		<Radio :disabled="$route.query.edit==1" :label="3">未知</Radio>
        				</Col>
        			</Row>
    			</RadioGroup>
			</FormItem>
        	<FormItem label="国际生是否可申请助学金（Financial Aid）" prop="isFinancialaid" class="widthMax fellowship1">
        		<RadioGroup v-model="bonusForm.isFinancialaid" size="small">
        			<Row class-name="width420">
        				<Col span="8">
			        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
        				</Col>
        				<Col span="8">
			        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
        				</Col>
        				<Col span="8">
			        		<Radio :disabled="$route.query.edit==1" :label="3">未知</Radio>
        				</Col>
        			</Row>
    			</RadioGroup>
        	</FormItem>
        	<FormItem label="国际学生助学金类型" class="widthMax" v-show="bonusForm.isFinancialaid">
        			<Row class-name="width420">
        				<Col span="8">
					        <Checkbox :disabled="$route.query.edit==1" true-value='1' false-value="0" v-model="bonusForm.isNeedBased" label="Need-Based" >
					        	Need-Based
					        </Checkbox>
        				</Col>
        				<Col span="8">
					        <Checkbox :disabled="$route.query.edit==1" true-value='1' false-value="0" v-model="bonusForm.isNeedBlind" label="Need–Blind" >
					        	Need–Blind
					        </Checkbox>
        				</Col>
        			</Row>
        	</FormItem>
			<FormItem label="奖/助学金介绍" prop="introduce">
		        <Input :disabled="$route.query.edit==1" v-model="bonusForm.introduce" type="textarea" :row="4" class="width684"></Input>
			</FormItem>
			<FormItem label="奖/助学金介绍链接 （学校官网）" prop="link ">
		        <Input :disabled="$route.query.edit==1" v-model="bonusForm.link" type="text" :row="4" class="width684"></Input>
			</FormItem>
    		<div class="nextBtn"><Button type="primary" @click="handleSubmit('formBonus')" class="button">保存并预览</Button></div>
		</Form>
	</div>
</template>

<script>
import valid,{
    errors,
    school,
    SchoolMajor,
    major,
	usnews,
	common
} from '@/component/spoc-library-web/src/libs/request';
	export default{
		data(){
			return{
				bonuTypes:[],
				bonusForm:{
					cost:'',
					isScholarships:"1",
					isFinancialaid:"1",
					isNeedBased :"0",
					isNeedBlind :"0",
					introduce :'',
					'link' :'',
					schoolId:this.$route.query.schoolId
				},
				ruleBonus:{
					cost:{required:true,message:"学费不能为空",trigger:"blur"},
					isScholarships:[{required:true,pattern: /^\d+$/, message:"是否可申请奖学金不能为空",trigger:"change"}],
					isFinancialaid:[{required:true,pattern: /^\d+$/, message:"是否可申请助学金不能为空",trigger:"change"}]
				},
                isOk:false,
                isChange:false,
                usnewsInfo:{},
			}
		},
		created(){
			let params={
				type:'ss_scholarships_financial_type'
			}
			common.listData(params).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.bonuTypes=res.data.data;
		    	}
		    }).catch(errors.call(this));
		    if(!!this.$route.query.schoolId){
			    let params1={
			    	id:this.$route.query.schoolId
			    }
	        	school.formSsScholarships(params1).then(valid.call(this)).then(res => {
	        		if(res.ok){
	        			if(!!res.data.data[0]){
	        				for (var i in this.bonusForm){
	        					this.bonusForm[i]=res.data.data[0][i]
	        				}
	        				if(!!!this.bonusForm.isScholarships) this.bonusForm.isScholarships='0';
	        				if(!!!this.bonusForm.isFinancialaid) this.bonusForm.isFinancialaid='0';
	        			}
			    		if(!!this.$route.query.usnews){
				    		let param6={
				    			usnewsId:this.$route.query.usnews
				    		}
				    		usnews.info(param6).then(valid.call(this)).then(res => {
		    					if(res.ok){
						    		this.usnewsInfo=res.data.data;
						    	}
						    }).catch(errors.call(this));
			    		}
	        		}
				    if(this.$route.query.edit==1){
						this.$watch('bonusForm',function (val, oldVal) { this.isChange=true;},{deep: true});
					}
			    }).catch(errors.call(this));
		    };
		    if(this.$route.query.edit!=1){
				this.$watch('bonusForm',function (val, oldVal) { this.isChange=true;},{deep: true});
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
            handleSubmit:function (name) {
                this.$refs[name].validate((valid1) => {
	                if (valid1) {
	                	let params=[
	                		this.bonusForm
	                	]
	                	school.saveSsScholarships(params).then(valid.call(this)).then(res => {
	                		if(res.ok){
	                    		this.$Message.success(res.data.message);
	                    		this.isOk=true;
	                    		this.$emit('jump',6,'library.replenish',this.$route.query.schoolId,this.$route.query.edit,this.$route.query.ban,this.$route.query.usnews);
	                		}
					    }).catch(errors.call(this));
	                } else {
	                    this.$Message.error('请完善必填项!');
	                }
	            })
            },
		}
	}
</script>
