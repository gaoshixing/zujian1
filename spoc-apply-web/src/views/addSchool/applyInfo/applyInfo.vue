<style lang="less">
	.applyInfo{
		width: 100%;
		height: 100%;
		color: #212121;
		font-size:14px;
		.ivu-form-item-error-tip{
			padding-top: 0;
		}
		.widthMax{
			width: 100%;
		}
		.width568{
			width: 568px;
		}
		.width684{
			width: 684px;
		}
		.width215{
			width: 215px;
		}
		.width500{
			width: 500px;
		}
		.width360{
			width: 360px;
		}
		.fl{
			float: left;
		}
		.fr{
			float: right;
		}
		.ivu-input:hover{
			border-color: #69c9c5;
		}
		textarea.ivu-input{
			vertical-align: middle;
		}
		.warn-tit{
			color: #f00;
		}
		.formApply{
			width: 100%;
			.nextBtn{
				padding: 14px 0;
				clear: both;
				.button{
					width: 175px;
					height: 40px;
					display: block;
					margin: auto;
				}
			}
			.appltTime{
				width: 100%;
				height:40px;
				border: 1px #e0e0e0 solid;
				border-radius:4px;
				overflow:hidden;
				margin:20px 0;
				cursor: pointer;
				i{
					float: left;
					width: 5px;height: 38px;
					background: #44bcb7;
				}
				span{
					line-height: 38px;
					float: left;
					padding-left: 18px;
					color: #666666;
				}
				p{
					float: right;
					padding-right: 30px;
					font-size: 16px;
					line-height: 38px;
					&.on{
						color: #0D70B0;
					}
					&.off{
						color: #e71f1d;
					}
				}
			}
			.formBox{
				width:880px;
				margin-left: 28px;
				overflow: hidden;
				.width754{
					width: 754px;
				}
				.radio{
					width: 240px;
				}
				.form1-tit1{
					width: 100%;
					padding: 14px 0;
				}
				.otherDeadline{
					.ivu-form-item-label{
						padding: 0px 12px 0 30px;
						line-height: 16px;
					}
					&.otherDeadline1{
						.ivu-form-item-label{
							padding: 0px 12px 0 24px;
							line-height: 16px;
						}
					}
				}
			}
			.normWrap{
				width: 860px;
				margin-left: 100px;
				.tab{
					width:100%;
					overflow: hidden;
				.infoList {
				    width: 80px;
				    height: 80px;
				    border: 1px solid #e0e1e2;
				    margin-right: 20px;
				    cursor: pointer;
				    text-align: center;
				    float: left;
				    transition: all ease 200ms;
				    position: relative;
				    .addMask {
				      position: absolute;
				      opacity: 0;
				      top: 0;
				      left: 0;
				      right: 0;
				      height: 100%;
				      z-index: 2;
				      background: rgba(68, 188, 183, 0.8);
				      color: #fff;
				      font-size: 35px;
				      line-height: 80px;
				      transition: all ease 300ms;
				    }
				    &:hover {
				      border-color: #44bcb7;
				      .addMask {
				        top: 0;
				        opacity: 1;
				      }
				    }
				}
					.tabBox{
						cursor: pointer;
						width: 70px;
						height: 70px;
						display: inline-block;
						padding-top: 14px;
						margin: 20px 20px 20px 0;
						text-align: center;
						font-weight: normal;
						b{
							display: block;
							font-weight: normal;
							&.other{
								    width: 22px;
								    height: 22px;
								    margin: auto;
								    color: #666;
								    border-radius: 50%;
								    border: 1px solid #666;
								    text-align: center;
								    line-height: 11px;
							}
							&.blue{
								color: #001a72;
							}
							&.green{
								color: #458b91;
							}
							font-size: 18px;
							color: #aa1b0f;
							line-height: 24px;
							font-style: italic;
						}
						span{
							display: block;
							font-size: 12px;
							color: #323232;
							line-height: 20px;
						}
					}
				}
				.normBox{
					width: 860px;
					margin-bottom: 30px;
					border: 1px #cccccc solid;
					position: relative;
					.tabBox{
						cursor: pointer;
						width: 70px;
						height: 70px;
				    	border: 1px solid #e0e1e2;
						display: inline-block;
						padding-top: 14px;
						margin: 20px 20px 20px 0;
						text-align: center;
						font-weight: normal;
						b{
							display: block;
							font-weight: normal;
							&.blue{
								color: #001a72;
							}
							&.green{
								color: #458b91;
							}
							font-size: 18px;
							color: #aa1b0f;
							line-height: 24px;
							font-style: italic;
						}
						span{
							display: block;
							font-size: 12px;
							color: #323232;
							line-height: 20px;
						}
					}
					.close{    
						font-size: 31px;
					    color: #999;
					    transition: color 0.2s ease;
						position: absolute;
						top: 0px;
						right: 10px;
						cursor: pointer;
						z-index: 99;
					}
					.ivu-form-item-label{
						padding: 0px 12px 0 34px;
						line-height: 16px;
					}
					.lowGrade{
						.ivu-form-item-label{
							padding: 0px 12px 0 46px;
						}
					}
					.otherDeadline{
						.ivu-form-item-label{
							padding: 0px 12px 0 12px;
						}
						&.onlycodes{
							.ivu-form-item-label{
								padding: 8px 12px;
							}
						}
					}
					&.sat-or-actItem{
						.ivu-form-item-label{
							width: 138px;
							padding: 0px 12px 0 46px;
							line-height: 16px;
							
						}
						.splice{
							.ivu-form-item-label{
								padding: 0px 12px 0 38px;
							}
						}
						.otherDeadline{
							.ivu-form-item-label{
								padding: 0px 12px 0 18px;
							}
						}
						.actItem{
							.ivu-form-item-label{
								padding: 0px 12px 0 56px;
							}
						}
						.onlycodes{
							.ivu-form-item-label{
								padding: 8px 12px;
							}
						}
					}
				}
			}
			
			.interview{
				width: 860px;
				overflow: hidden;
				padding-left: 30px;
				p{
					overflow: hidden;
					width: 670px;
					&.mb{
						margin-bottom: 14px;
					}
				}
				.mark{
					display: inline-block;
					width: 574px;
					.ivu-input-type{
						margin-bottom: 14px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="applyInfo">
		<p class="warn-tit">（带*表示必填项）</p>
		<Form ref="formApply" :model="formApply" :rules="applyRule" :show-message="true" :label-width="126" class="formApply">
			<div class="appltTime" @click="IIB(0)" ><i></i><span>申请时间及费用</span><p class="on"  v-show="!toggle[0]">开启</p><p class="off"  v-show="toggle[0]">关闭</p></div>
			<div class="formBox" v-show="toggle[0]">
				<p class="form1-tit1 fl">早申请类型（当选择是时，填写截止日期、结果发放日期）</p>
				<div v-for="(item,index) in formApply.ssApplytypeList" v-if="item.applyType==0" :key="item.type">
					<FormItem :label="'是否有'+item.type" class="fl widthMax">
		        		<RadioGroup v-model="item.offered" size="small">
		        			<Row class-name="radio">
		        				<Col span="12">
					        		<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
		        				</Col>
		        				<Col span="12">
					        		<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
		        				</Col>
		        			</Row>
		    			</RadioGroup>
		        	</FormItem>
		        	<div v-show="item.offered==1">
			        	<FormItem label="截止日期" class="inline fl">
		            		<Input :disabled="$route.query.edit==1" v-model="item.deadline" type="text" class="width242"></Input>
			        	</FormItem>
			        	<FormItem label="结果发放日期" class="inline fr">
		            		<Input :disabled="$route.query.edit==1" v-model="item.noticed" type="text" class="width242"></Input>
			        	</FormItem>
			        	<FormItem label="备注" class="fl">
		            		<Input :disabled="$route.query.edit==1" v-model="item.remarks " type="text" class="width754"></Input>
			        	</FormItem>
		        	</div>
				</div>
				
				<p class="form1-tit1 fl">常规申请类型</p>
				
				<div v-for="(item,index) in formApply.ssApplytypeList" v-if="item.applyType===1">
					<FormItem :label="'是否有'+item.type" class="fl widthMax">
		        		<RadioGroup v-model="item.offered" size="small">
		        			<Row class-name="radio">
		        				<Col span="12">
					        		<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
		        				</Col>
		        				<Col span="12">
					        		<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
		        				</Col>
		        			</Row>
		    			</RadioGroup>
		        	</FormItem>
		        	<div v-show="item.offered==1 ">
			        	<FormItem label="截止日期" class="inline fl">
		            		<Input :disabled="$route.query.edit==1" v-model="item.deadline" type="text" class="width242"></Input>
			        	</FormItem>
			        	<FormItem label="结果发放日期" class="inline fr">
		            		<Input :disabled="$route.query.edit==1" v-model="item.noticed" type="text" class="width242"></Input>
			        	</FormItem>
			        	<FormItem label="备注" class="fl">
		            		<Input :disabled="$route.query.edit==1" v-model="item.remarks " type="text" class="width754"></Input>
			        	</FormItem>
		        	</div>
				</div>
	        	
	        	<FormItem label="申请费用（国际生）" prop="fees" class="inline fl" :class="{usnews:formApply.fees==usnewsInfo.fees}">
            		<Input :disabled="$route.query.edit==1" v-model="formApply.fees" type="text" class="width242"></Input>
	        	</FormItem>
	        	<FormItem label="申请系统" prop="system" :rules="{required:true,message:'申请系统不能为空',trigger:'blur'}" class="fl widthMax">
	        		<CheckboxGroup v-model="applySystem" size="small" @on-change="sysChange">
	        			<Row class-name="width360">
	        				<Col :span="7" v-for="(item,index) in applyList" :key="item.id">
				        		<Checkbox :disabled="$route.query.edit==1" :label="item.label">{{item.label}}</Checkbox>
	        				</Col>
	        			</Row>
	    			</CheckboxGroup>
	        	</FormItem>
	        	<FormItem label="Midyear Report 截止时间" prop="midReportDeadline" class="inline fl widthMax otherDeadline otherDeadline1">
            		<Input :disabled="$route.query.edit==1" v-model="formApply.midReportDeadline" type="text" class="width242"></Input>
	        	</FormItem>
	        	<FormItem label="春季入学申请 截止时间" prop="springDeadline" class="inline fl widthMax otherDeadline">
            		<Input :disabled="$route.query.edit==1" v-model="formApply.springDeadline" type="text" class="width242"></Input>
	        	</FormItem>
	        	<FormItem label="夏季入学申请 截止时间" prop="autumnDeadline" class="inline fl widthMax otherDeadline">
            		<Input :disabled="$route.query.edit==1" v-model="formApply.autumnDeadline" type="text" class="width242"></Input>
	        	</FormItem>
	        	<FormItem label="夏季入学申请 截止时间" prop="summerDeadline" class="inline fl widthMax otherDeadline">
            		<Input :disabled="$route.query.edit==1" v-model="formApply.summerDeadline" type="text" class="width242"></Input>
	        	</FormItem>
	        	<FormItem label="冬季入学申请 截止时间" prop="winterDeadline" class="inline fl widthMax otherDeadline">
            		<Input :disabled="$route.query.edit==1" v-model="formApply.winterDeadline" type="text" class="width242"></Input>
	        	</FormItem>
			</div>
	        	<div class="nextBtn" v-show="toggle[0]"><Button type="primary" @click="nextTo(1)" class="button" :disabled="$route.query.edit==1">保存并下一步</Button></div>
			
        	<div class="appltTime" @click="IIB(1)"><i></i><span>标准化考试要求</span><p class="on"  v-show="!toggle[1]">开启</p><p class="off"  v-show="toggle[1]">关闭</p></div>
        	
			<div class="normWrap" v-show="toggle[1]">
				<div class="tab">
					<h3 class="tabBox infoList" v-for="(item,index) in exam" @click="addExam(item.value)">
						<b :class="{blue:item.value=='TOEFL'||item.value=='SAT',green:item.value=='ACT',other:item.value=='other'}" v-html="item.value=='other'?'...':item.value"></b>
						<span>{{item.value}}</span>
						<div class="addMask"><Icon type="android-add"></Icon></div>
					</h3>
				</div>
				<div v-for="(item,index) in formApply.ssEaxminfoRequireList" class="normBox" :class="{'sat-or-actItem':(item.examType!='TOEFL')}" v-if="formApply.ssEaxminfoRequireList.length">
					<p class="close" @click="delExam(index)"><Icon type="ios-close-empty"></Icon></p>
				    <Row type="flex" align="middle">
				        <Col span="3" class="tr">
							<h3 class="tabBox">
								<b :class="{blue:item.examType=='TOEFL'||item.examType=='SAT',green:item.examType=='ACT',other:item.examType=='other'}" v-html="item.examType=='other'?'其他':item.examType"></b>
								<span>{{item.examType}}</span>
							</h3>
				        </Col>
				        <Col span="21" style="padding-top: 20px;">
							<FormItem v-if="item.examType!='other'" :label="item.examType=='TOEFL'?'国际生是否要求TOEFL':item.examType=='IELTS'?'是否接受雅思':item.examType=='other'?'':item.examType+'考试是否必须'" required :rules="{required:true,type:'number',message:'不能为空',trigger:'change'}" class="fl widthMax">
				        		<RadioGroup v-model="item.isMust" size="small">
				        			<Row class-name="radio">
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
				        				</Col>
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="2">推荐</Radio>
				        				</Col>
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
				        				</Col>
				        			</Row>
				    			</RadioGroup>
				        	</FormItem>
				        	<FormItem v-if="item.examType!='other'" class="fl widthMax">
			            		<Input :disabled="$route.query.edit==1" v-model="item.remarks" placeholder="备注要求" type="text" class="width242"></Input>
				        	</FormItem>
				        	<FormItem label="是否有最低分要求" v-if="item.examType=='TOEFL'||item.examType=='IELTS'" required :rules="{required:true,type:'number',message:'是否有最低分要求不能为空',trigger:'change'}" class="fl widthMax lowGrade">
				        		<RadioGroup v-model="item.isLowestScore" size="small">
				        			<Row class-name="radio">
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
				        				</Col>
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
				        				</Col>
				        			</Row>
				    			</RadioGroup>
				        	</FormItem>
				        	<FormItem v-if="item.examType=='TOEFL'||item.examType=='IELTS'" class="fl widthMax" v-show="item.isLowestScore==1">
			            		<Input :disabled="$route.query.edit==1" v-model="item.scoreRequire" number placeholder="最低分" type="text" class="width242"></Input>
				        	</FormItem>
				        	<FormItem v-if="item.examType=='TOEFL'||item.examType=='IELTS'" class="fl widthMax">
			            		<Input :disabled="$route.query.edit==1" v-model="item.scoreRemarks" placeholder="备注考分要求" type="text" class="width242"></Input>
				        	</FormItem>
				        	<FormItem label="TOEFL wavie条件" v-if="item.examType=='TOEFL'" class="inline fl widthMax">
			            		<Input :disabled="$route.query.edit==1" v-model="item.wavieCondition" type="text" class="width568"></Input>
				        	</FormItem>
				        	<FormItem label="SAT是否要求写作" v-if="item.examType=='SAT'||item.examType=='ACT'" class="fl widthMax">
				        		<RadioGroup v-model="item.isWrite" size="small">
				        			<Row class-name="radio">
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
				        				</Col>
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="2">推荐</Radio>
				        				</Col>
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
				        				</Col>
				        			</Row>
				    			</RadioGroup>
				        	</FormItem>
				        	<FormItem  v-if="item.examType=='SAT'||item.examType=='ACT'" class="fl widthMax">
			            		<Input :disabled="$route.query.edit==1" v-model="item.scoreRequire" number placeholder="备注要求" type="text" class="width242"></Input>
				        	</FormItem>
							<FormItem label="ACT是否可替代SAT2" required :rules="{required:true,type:'number',message:'ACT是否可替代SAT2不能为空',trigger:'change'}" v-if="item.examType=='ACT'" class="splice fl widthMax ">
				        		<RadioGroup v-model="item.isReplace" size="small">
				        			<Row class-name="radio">
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
				        				</Col>
				        				<Col span="8">
							        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
				        				</Col>
				        			</Row>
				    			</RadioGroup>
				        	</FormItem>
				        	<FormItem :label="item.examType+'分数送达时间'"  v-if="item.examType=='SAT'||item.examType=='ACT'" class="fl widthMax">
			            		<Input :disabled="$route.query.edit==1" v-model="item.sendscoreRequire" type="text" class="width242"></Input>
				        	</FormItem>
				        	<FormItem :label="item.examType+'提前申请考试时间要求'" v-if="item.examType!='other'" class="inline fl widthMax otherDeadline">
			            		<Input :disabled="$route.query.edit==1" v-model="item.earlyDatetime" type="text" class="width568"></Input>
				        	</FormItem>
				        	<FormItem :label="item.examType+'常规申请考试时间要求'" v-if="item.examType!='other'" class="inline fl widthMax otherDeadline">
			            		<Input :disabled="$route.query.edit==1" v-model="item.regularDatetime" type="text" class="width568"></Input>
				        	</FormItem>
				        	<FormItem :label="item.examType+'送分代码'" v-if="item.examType!='other'" class="inline fl widthMax otherDeadline onlycodes">
			            		<Input :disabled="$route.query.edit==1" v-model="item.sendscoreCode" type="text" class="width568"></Input>
				        	</FormItem>
				        	
				        	<FormItem label="考试名称" v-if="item.examType=='other'" class="fl widthMax onlycodes">
				        		<Input :disabled="$route.query.edit==1" v-model="item.name" type="text" class="width568"></Input>
				        	</FormItem>
				        	<FormItem label="分数要求" v-if="item.examType=='other'" class="fl inline onlycodes">
				        		<Input :disabled="$route.query.edit==1" v-model="item.scoreRemarks" type="text" class="width215"></Input>
				        	</FormItem>
				        	<FormItem label="考试时间" v-if="item.examType=='other'" class="fl inline onlycodes">
				        		<Input :disabled="$route.query.edit==1" v-model="item.examtimeRequire" type="text" class="width215"></Input>
				        	</FormItem>
				        	<FormItem label="备注" v-if="item.examType=='other'" class="fl widthMax onlycodes">
				        		<Input :disabled="$route.query.edit==1" v-model="item.remarks" type="textarea" :row="4" class="width568"></Input>
				        	</FormItem>
				        	
				        	<FormItem v-for="(val,index) in item.ssScoreRequireList" :label="val.label+' score'" class="inline fl widthMax otherDeadline" :key="index">
			            		<Input :disabled="$route.query.edit==1" v-model="val.lowestScore" type="text" class="width568"></Input>
				        	</FormItem>
				        </Col>
				    </Row>
				</div>
			</div>
    		<div class="nextBtn" v-show="toggle[1]"><Button type="primary" @click="nextTo(2)" class="button" :disabled="$route.query.edit==1">保存并下一步</Button></div>
    		
			<div class="appltTime" @click="IIB(2)"><i></i><span>面试要求</span><p class="on"  v-show="!toggle[2]">开启</p><p class="off"  v-show="toggle[2]">关闭</p></div>
			
			<div class="interview" v-show="toggle[2]">
				<FormItem label="面试是否必须？" :rules="{required:true,type:'number',message:'面试是否必须不能为空',trigger:'change'}" prop="isReview" class="widthMax">
		        		<Select :disabled="$route.query.edit==1" v-model="formApply.isReview" class="width242">
					        <Option :value="1" >是</Option>
					        <Option :value="2" >推荐</Option>
					        <Option :value="0" >否</Option>
					    </Select>
				</FormItem>
				<FormItem label="面试要求" prop="msyq" required style="width: 234px;display: inline-block;" v-show="formApply.isReview!=0">
				    <CheckboxGroup v-model="formApply.msyq">
				        <p class="mb">
			        		<Checkbox :disabled="$route.query.edit==1" v-model="formApply.isStudentApplyReview" :true-value='1' :false-value="0" label="学生主动申请" class="fl">学生主动申请</Checkbox>
				        </p>
				        <p class="mb">
					        <Checkbox :disabled="$route.query.edit==1" v-model="formApply.isSchoolApplyReview" :true-value='1' :false-value="0" label="学校主动邀请" class="fl">学校主动邀请</Checkbox>
				        </p>
				        <p class="mb">
					        <Checkbox :disabled="$route.query.edit==1" v-model="formApply.isOtherReview" :true-value='1' :false-value="0" label="第三方面试" class="fl">第三方面试</Checkbox>
				        </p>
				        <p>
					        <Checkbox :disabled="$route.query.edit==1" v-model="formApply.isStudentReview" :true-value='1' :false-value="0" label="校友面试" class="fl">校友面试</Checkbox>
				        </p>
				    </CheckboxGroup>
				</FormItem>
				<div class="mark" v-show="formApply.isReview!=0">
		        	<Input :disabled="$route.query.edit==1" v-model="formApply.studentApplyReviewRemarks" error="null" placeholder="填写备注信息，没有则不填" type="text" class="width568 fr"></Input>
			        <Input :disabled="$route.query.edit==1" v-model="formApply.schoolApplyReviewRemarks" type="text" class="width568 fr"></Input>
			        <Input :disabled="$route.query.edit==1" v-model="formApply.otherReviewRemarks" type="text" class="width568 fr"></Input>
			        <Input :disabled="$route.query.edit==1" v-model="formApply.studentReviewRemarks" type="text" class="width568 fr"></Input>
				</div>
				<template v-if="formApply.isReview!=0">
					<FormItem label="面试介绍链接" :rules="[{required:true,message:'面试介绍链接不能为空',trigger:'blur'},{max:1000,message:'长度不得超过1000'}]" prop="reviewLink" class="widthMax">
						<Input :disabled="$route.query.edit==1" v-model="formApply.reviewLink" type="text" style="width:686px"></Input>
					</FormItem>
				</template>
			</div>
    		<div class="nextBtn" v-show="toggle[2]"><Button type="primary" @click="nextTo(3)" class="button" :disabled="$route.query.edit==1">保存并下一步</Button></div>
			
			<div class="appltTime" @click="IIB(3)"><i></i><span>其它申请信息</span><p class="on"  v-show="!toggle[3]">开启</p><p class="off"  v-show="toggle[3]">关闭</p></div>
			
			<div class="interview" v-show="toggle[3]">
				<FormItem label="邮寄地址" prop="address" class="widthMax" :rules="{max:255,message:'长度不得超过255',trigger:'blur'}" >
				        <Input :disabled="$route.query.edit==1" v-model="formApply.address" type="text" class="width242"></Input>
				</FormItem>
				<FormItem label="Checklist Link" prop="checklist" class="widthMax" :rules="{max:1000,message:'长度不得超过1000',trigger:'blur'}">
				        <Input :disabled="$route.query.edit==1" v-model="formApply.checklist" type="textarea" :row="4" class="width684"></Input>
				</FormItem>
				<FormItem label="国际生比例" prop="internationalRatio" class="widthMax" :rules="{max:100,message:'长度不得超过1000',trigger:'blur'}">
				        <Input :disabled="$route.query.edit==1" v-model="formApply.internationalRatio" type="text" class="width242"></Input>
				</FormItem>
				<FormItem label="推荐信要求" prop="recomletterRequire" class="widthMax" :rules="{max:1000,message:'长度不得超过1000',trigger:'blur'}">
				        <Input :disabled="$route.query.edit==1" v-model="formApply.recomletterRequire" type="textarea" :row="4" class="width684"></Input>
				</FormItem>
				<FormItem label="财力证明要求" prop="financeRequre" class="widthMax" :rules="{max:1000,message:'长度不得超过1000',trigger:'blur'}">
				        <Input :disabled="$route.query.edit==1" v-model="formApply.financeRequre" type="textarea" :row="4" class="width684"></Input>
				</FormItem>
	        	<FormItem label="是否需要成绩单认证" prop="isScorelist" class="widthMax">
	        		<RadioGroup v-model="formApply.isScorelist" size="small">
	        			<Row class-name="width242">
	        				<Col span="12">
				        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
	        				</Col>
	        				<Col span="12">
				        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
	        				</Col>
	        			</Row>
	    			</RadioGroup>
	    			<div class="inline" v-show="formApply.isScorelist==1">成绩单认证链接：<Input :disabled="$route.query.edit==1" v-model="formApply.scorelistLink" type="text" class="width242"></Input></div>
	        	</FormItem>
	        	<FormItem label="是否双录取" prop="isDobuleaccept" class="widthMax">
	        		<RadioGroup v-model="formApply.isDobuleaccept" size="small">
	        			<Row class-name="width242">
	        				<Col span="12">
				        		<Radio :disabled="$route.query.edit==1" :label="1">是</Radio>
	        				</Col>
	        				<Col span="12">
				        		<Radio :disabled="$route.query.edit==1" :label="0">否</Radio>
	        				</Col>
	        			</Row>
	    			</RadioGroup>
	        	</FormItem>
				<FormItem label="其他" prop="remarks" class="widthMax" :rules="{max:255,message:'长度不得超过255',trigger:'blur'}">
					<Input :disabled="$route.query.edit==1" v-model="formApply.remarks " type="textarea" :row="4" class="width684"></Input>
				</FormItem>
			</div>
    		<div class="nextBtn" v-show="toggle[3]"><Button type="primary" @click="handleSubmit('formApply')" class="button" :disabled="$route.query.edit==1">保存并下一步</Button></div>
		</Form>
	</div>
</template>

<script>
import valid,{
    errors,
    ssApplyRequire,
	usnews,
	common
} from '@/component/spoc-library-web/src/libs/request';
	export default{
		data(){
            const validateReview = (rule, value, callback) => {
            	if(this.formApply.isReview!=0){
	                if (this.formApply.isStudentApplyReview||this.formApply.isSchoolApplyReview||this.formApply.isOtherReview||this.formApply.isStudentReview) {
	                    callback();
	                } else {
	                    callback(new Error('面试要求不能为空'));
	                }
            	}else{
            		callback();
            	}
            };
			return {
				formApply: {
					address : '' ,
					autumnDeadline : '' ,
					summerDeadline :'',
					fees : '' ,
					financeRequre : '' ,
					internationalRatio : '' ,
					isDobuleaccept : 0 ,
					isReview :0,
					isScorelist : 0 ,
					midReportDeadline : '' ,
					recomletterRequire : '' ,
					remarks : '' ,
					isOtherReview : 0 ,
					isSchoolApplyReview : 0 ,
					isStudentApplyReview: 0 ,
					isStudentReview : 0 ,
					otherReviewRemarks : '' ,
					schoolApplyReviewRemarks : '' ,
					studentApplyReviewRemarks : '' ,
					studentReviewRemarks : '' ,
					reviewLink : '' ,
					schoolId : this.$route.query.schoolId ,
					scorelistLink : '',
					checklist:'',
					springDeadline : '' ,
					ssApplytypeList : [
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'ED1' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'ED2' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'EA' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'REA/SCEA' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'Priority' ,
						},
						{
							applyType : 1 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'RD' ,
						},
						{
							applyType : 1 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'Rolling' ,
						},
					] ,
					ssEaxminfoRequireList:[],
					system :'',
					winterDeadline : '' 
				},
				applyRule:{
					msyq:[{ validator: validateReview, trigger: 'change' }],
					fees:[
						{required:true,message:'申请费用不能为空',trigger:'blur'},
						{pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,message:'必须是小数或整数',trigger:'blur'}
					]
				},
				test: {},
				applyList:[],
				toggle:[true,false,false,false],
                isOk:false,
                isChange:false,
                applySystem:[],
                paramsSub:{
					address : '' ,
					autumnDeadline : '' ,
					summerDeadline :'',
					fees : '' ,
					financeRequre : '' ,
					internationalRatio : '' ,
					isDobuleaccept : 0 ,
					isReview :0,
					isScorelist : 0 ,
					midReportDeadline : '' ,
					recomletterRequire : '' ,
					remarks : '' ,
					isOtherReview : 0 ,
					isSchoolApplyReview : 0 ,
					isStudentApplyReview: 0 ,
					isStudentReview : 0 ,
					otherReviewRemarks : '' ,
					schoolApplyReviewRemarks : '' ,
					studentApplyReviewRemarks : '' ,
					studentReviewRemarks : '' ,
					reviewLink : '' ,
					schoolId : this.$route.query.schoolId ,
					scorelistLink : '',
					checklist:'',
					springDeadline : '' ,
					ssApplytypeList : [
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'ED1' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'ED2' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'EA' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'REA/SCEA' ,
						},
						{
							applyType : 0 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'Priority' ,
						},
						{
							applyType : 1 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'RD' ,
						},
						{
							applyType : 1 ,
							deadline : '' ,
							noticed : '' ,
							offered:'',
							remarks : '' ,
							type : 'Rolling' ,
						},
					] ,
					ssEaxminfoRequireList:[
					],
					system :'',
					winterDeadline : '' 
                },
                exam:[],
                score:[],
                showExam:[],
                ssEaxminfoRequireList:[
						{
							isMust:0,
							remarks:'',
							isLowestScore:0,
							scoreRequire : '' ,
							scoreRemarks:'',
							wavieCondition:'',
							earlyDatetime:'',
							regularDatetime:'',
							sendscoreCode:'',
							examType:'TOEFL',
							name:'TOEFL',
							ssScoreRequireList:[]
						},
						{
							isMust:0,
							remarks:'',
							isLowestScore:0,
							scoreRequire:'',
							scoreRemarks:'',
							wavieCondition:'',
							earlyDatetime:'',
							regularDatetime:'',
							sendscoreCode:'',
							examType:'IELTS',
							name:'IELTS',
							ssScoreRequireList:[]
						},
						{
							isMust:0,
							remarks:'',
							isWrite:0,
							scoreRequire:'',
							isReplace:1,
							sendscoreRequire:'',
							earlyDatetime:'',
							regularDatetime:'',
							sendscoreCode:'',
							examType:'ACT',
							name:'ACT',
							ssScoreRequireList:[]
						},
						{
							isMust:0,
							remarks:'',
							isWrite:0,
							scoreRequire:'',
							sendscoreRequire:'',
							earlyDatetime:'',
							regularDatetime:'',
							sendscoreCode:'',
							examType:'SAT',
							name:'SAT',
							ssScoreRequireList:[]
						},
						{
							name:'',
							remarks:'',
							scoreRemarks:'',
							examtimeRequire:'',
							examType:'other',
							ssScoreRequireList:[]
						}
                ],
				usnewsInfo:{},
			}
		},
		computed:{
			sys:function(){
				return this.applySystem.join(',');
			}
		},
		created(){
			let _this=this;
			let param={
				type:'ss_school_major_system'
			}
		    common.listData(param).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.applyList=res.data.data;
		    	}
		    }).catch(errors.call(this));
		    
			let param2={
				types:'xx_exam_type',
				pids:'0,1039'
			}
		    common.batchListData(param2).then(valid.call(this)).then(res => {
		    	if(res.ok){
			    	this.exam=res.data.data.xx_exam_type;
			    	let examList=res.data.data.xx_exam_type;
			    	let arr=res.data.data.xx_exam_type.map(item=>item.id);
					let param3={
						types:'xx_exam_score_type',
						pids:arr.join(',')
					}
				    common.batchListData(param3).then(valid.call(this)).then(res => {
				    	if(res.ok){
					    	this.score=res.data.data.xx_exam_score_type;
					    	examList.forEach(function(v,k){
				    			let scoreArr=[];
						    	res.data.data.xx_exam_score_type.forEach(function(val,key){
						    		if(v.id==val.parentId){
						    			scoreArr.push({label:val.label,lowestScore:''});
						    		}
						    	});
				    			examList[k].ssScoreRequireList=scoreArr;
					    	});
					    	this.ssEaxminfoRequireList.forEach(function(val,key){
								examList.forEach(function(v,k){
									if(v.value==val.examType){
										val.ssScoreRequireList=v.ssScoreRequireList;
									}
								});
					    	});
				    	}
				    	
					    if(this.$route.query.schoolId){
							let param1={
								id:this.$route.query.schoolId
							}
						    ssApplyRequire.form(param1).then(valid.call(this)).then(res => {
						    	let list=res.data.data;
						    	if(res.ok){
							    	for (var i in this.formApply){
							    		if(i=='ssApplytypeList'){
							    			if(list[i].length){
							    				for (var k in this.formApply[i]){
									    			for (var v in list[i]){
									    				if(this.formApply[i][k].type==list[i][v].type){
									    					for (var l in this.formApply[i][k]){
									    						if(l=='offered'){
									    							this.formApply[i][k][l]=''+list[i][v][l];
									    						}else{
									    							this.formApply[i][k][l]=list[i][v][l];
									    						}
									    					}
									    				}
									    			}
								    			}
							    			}
							    		}else if(i=='ssEaxminfoRequireList'){
						    				this.formApply[i]=res.data.data[i];
							    			if(this.formApply[i].length){
								    			for (var k in this.formApply[i]){
								    				console.log(this.formApply[i][k].examType)
													this.showExam.splice(this.showExam.length-1,0,this.formApply[i][k].examType);
								    			}
							    			}
							    		}else{
							    			if(res.data.data[i]){
							    				this.formApply[i]=res.data.data[i];
										    	this.$set(this.formApply,'isReview',parseInt(this.formApply.isReview));
										    	this.$set(this.formApply,'msyq',[]);
										    	if(i=='system') {
													let arr=!!this.formApply.system?this.formApply.system.split(','):[]
													this.$set(this,'applySystem',arr);
									    		}
							    			}
							    		}
							    	}
						    		if(this.$route.query.usnews){
							    		let param6={
							    			usnewsId:this.$route.query.usnews
							    		}
							    		usnews.info(param6).then(valid.call(this)).then(res => {
							    			if(res.ok){
									    		this.usnewsInfo=res.data.data;
							    			}
									    }).catch(errors.call(this));
						    		}
									if(this.$route.query.edit==1){
										this.$watch('formApply',function (val, oldVal) {console.log(this.formApply);this.isChange=true;},{deep: true});
									}
						    	}
						    }).catch(errors.call(this));
					    }
				    }).catch(errors.call(this));
		    	}
		    }).catch(errors.call(this));
			if(this.$route.query.edit!=1){
				this.$watch('formApply',function (val, oldVal) {this.isChange=true;},{deep: true});
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
			sysChange:function(arr){
				if(!!arr.length) this.$set(this.formApply,'system',arr.join(','));
				else  this.$set(this.formApply,'system','');
			},
			addExam:function(val){
				let _this=this;
				this.ssEaxminfoRequireList.forEach(function(v){
					if(v.examType==val && _this.showExam.join(',').search(val)==-1 && val!='other'){
						_this.formApply.ssEaxminfoRequireList.splice(0,0,v);
						_this.showExam.splice(0,0,val);
					}else if(val=='other' && v.examType==val){
						_this.formApply.ssEaxminfoRequireList.splice(0,0,v);
					}
				})
			},
			delExam:function(ind){
				this.formApply.ssEaxminfoRequireList.splice(ind,1);
				this.showExam.splice(ind,1);
				console.log(this.showExam)
			},
			IIB:function(val){
				var isShow=!this.toggle[val];
				this.$set(this.toggle,val,isShow);
			},
			nextTo:function (ind){
				this.$set(this.toggle,ind,true)
				this.$set(this.toggle,ind-1,false)
			},
            handleSubmit:function (name) {
                this.$refs[name].validate((valid1) => {
	                if (valid1) {
//	                	this.$delete(this.formApply,'msyq')
						for (var i in this.paramsSub){
				    		if(i=='ssApplytypeList'){
				    			if(!!this.formApply[i].length){
				    				for (var k in this.paramsSub[i]){
						    			for (var v in this.formApply[i]){
						    				if(this.paramsSub[i][k].type==this.formApply[i][v].type){
						    					for (var l in this.paramsSub[i][k]){
						    						if(l=='offered'){
						    							this.paramsSub[i][k][l]=''+this.formApply[i][v][l];
						    						}else{
						    							this.paramsSub[i][k][l]=this.formApply[i][v][l];
						    						}
						    					}
						    				}
						    			}
					    			}
				    			}
				    		}else if(i=='ssEaxminfoRequireList'){
				    			this.paramsSub[i]=this.formApply[i];
				    			console.log(this.paramsSub[i])
				    		}else{
				    			if(!!this.formApply[i]){
				    				this.paramsSub[i]=this.formApply[i];
				    			}
				    		}
				    	}
				    	this.$set(this.paramsSub,'isReview',parseInt(this.paramsSub.isReview));
	                	var params=this.paramsSub;
	                	delete params.msyq;
	                	for (var i in this.params){
				    		if(i=='ssApplytypeList'){
				    			if(!!this.params[i].length){
				    				for (var k in this.params[i]){
				    					this.params[i][k].offered=parseInt(this.params[i][k].offered);
						    			if(!this.params[i][k].offered) this.params[i].splice(k,1);
					    			}
				    			}
				    		}
	                	}
	                	ssApplyRequire.save(params).then(valid.call(this)).then(res => {
			            	if(res.ok){
			            		this.$Message.success(res.data.message);
			                    this.isOk=true;
			                    this.$emit('jump',5,'library.bonus',this.$route.query.schoolId,this.$route.query.edit,this.$route.query.ban,this.$route.query.usnews);
			            	}
					    }).catch(errors.call(this));
	                } else {
	                    this.$Message.error('请正确填写表单信息!');
	                }
	            })
            },
		},
	}
</script>
