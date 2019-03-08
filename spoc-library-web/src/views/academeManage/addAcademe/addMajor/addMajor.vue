<style lang="less">
.lib_addAcademe_step2 {
	.title {
		margin: 20px 0;
	}
	.basicInfo,
	.applyInfo {
		width: 700px;
		margin-left: 70px;
	}
	.basicInfo {
		.ivu-checkbox {
			margin-left: 5px;
		}
	}
	.test_require {
		margin-left: 70px;
		.top {
			font-family: Arial;
			font-size: 18px;
		}
		.tofel,
		.test_nav > div:nth-of-type(1) {
			.top {
				color: #001a72;
			}
		}
		.ielts,
		.test_nav > div:nth-of-type(2) {
			.top {
				color: #aa1b0f;
			}
		}
		.gre,
		.test_nav > div:nth-of-type(3) {
			.top {
				color: #0d327e;
			}
		}
		.gmat,
		.test_nav > div:nth-of-type(4) {
			.top {
				color: #458b91;
			}
		}
		.mcat,
		.test_nav > div:nth-of-type(5) {
			.top {
				color: #129ba7;
			}
		}
		.lsat,
		.test_nav > div:nth-of-type(6) {
			.top {
				color: #346c52;
			}
		}
		.other,
		.test_nav > div:nth-of-type(7) {
			.top {
				width: 22px;
				height: 22px;
				border-radius: 50%;
				border: 1px solid #666;
				text-align: center;
				line-height: 11px;
			}
		}
		.test_nav {
			display: flex;
			margin-top: 19px;
			> div {
				width: 70px;
				height: 70px;
				border: 1px solid #44bcb7;
				margin-left: 20px;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				cursor: pointer;
			}
		}
		.tofel,
		.ielts,
		.gre,
		.gmat,
		.mcat,
		.lsat,
		.other {
			max-width: 1200px;
			margin-top: 30px;
			margin-left: 20px;
			display: flex;
			padding: 20px 20px;
		}
		.left {
			display: flex;
			.ivu-form-item-content {
				margin-left: 0px !important;
			}
			.ivu-checkbox-inner {
				border-radius: 30%;
			}
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.right {
			flex: 1;
		}
	}
	.levelType {
		margin-bottom: 20px;
	}
	.infoList {
		width: 80px;
		height: 80px;
		padding: 10px;
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
	.test_contain {
		border: 1px solid #e0e0e0;
		margin-top: 30px;
		position: relative;
		&:hover {
			border: 1px solid #44bcb7;
			.close {
				display: block;
			}
		}
		.close {
			position: absolute;
			right: 20px;
			top: 20px;
			display: none;
		}
	}
	.ivu-radio-group {
		width: 100%;
	}

}
</style>
<template>
	<div class="lib_addAcademe_step2">
	<div class="warning">
	 （带*表示必填项）
		</div>
		<div class="title">
		<v-title title="添加专业基本信息"></v-title>
		</div>
		<Form ref="addAcadmeStep2" :model="addAcadme2" :rules="ruleAcademe2" :label-width="110" label-position="right">
<!-- 添加专业基本信息 -->
			<div class="basicInfo">
				<Row type="flex" justify="space-between">
					<Col span="11">
						<FormItem label="专业名称" prop="majorId">
							<Select :disabled="$route.query.edit==1" 
								v-model="addAcadme2.majorId"
								filterable
								remote
								:label="addAcadme2.majorCnname"
								:remote-method="remoteMethod"
								:loading="loading" placeholder="从标准专业库中选择">
								<Option v-for="(option, index) in majorNameList" :value="option.id" :key="index" @click.native="getMajorName(option)">{{option.cnname}}</Option>
							</Select>
						</FormItem>  
					</Col>
				</Row>
				<Row>
					<Col span="11">
						<FormItem label="该专业在当前学校的名称" prop="name">
							<Input :disabled="$route.query.edit==1" v-model="addAcadme2.name" placeholder="默认同标准专业库(中文)"></Input>
						</FormItem>  
					</Col>
					<Col span="11">
						<FormItem label="该专业在当前学校的名称" prop="enName">
							<Input :disabled="$route.query.edit==1" v-model="addAcadme2.enName" placeholder="默认同标准专业库(英文)"></Input>
						</FormItem>  
					</Col>
				</Row>
				<Row>
					<Col span="11">
						<FormItem label="专业排名" prop="majorRank">
							<Input :disabled="$route.query.edit==1" v-model="addAcadme2.majorRank" placeholder="请填写专业排名（数字）"></Input>
						</FormItem>  
					</Col>
				</Row> 
				<FormItem label="学位类型" prop="mytypes">
					<div class="levelType" v-for="(item,index) in degreeList" :key="index">
						<Row type="flex">
							<Col span="3">
							<template v-if="item.label=='硕士'">
									<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.isMaster" :label="item.value">{{item.label}}</Checkbox>
							</template>  
							<template v-if="item.label=='博士'">
								<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.isPhd" :label="item.value">{{item.label}}</Checkbox>
							</template> 
							</Col>
							<Col span="20" push="1">
							<template v-if="item.label=='硕士'">
								<Input :disabled="$route.query.edit==1" v-model="addAcadme2.masterProgram" placeholder="输入名称"></Input>
							</template>  
							<template v-if="item.label=='博士'">
								<Input :disabled="$route.query.edit==1" v-model="addAcadme2.phdProgram" placeholder="输入名称"></Input>
							</template> 
							</Col>
						</Row>
					</div>
				</FormItem>
				<FormItem label="申请系统" prop="system">
						<RadioGroup v-model="addAcadme2.system">
										<Row type="flex">
											<Col  v-for="(item,index) in systemList" :key="index">
												<Radio :disabled="$route.query.edit==1" :label="item.value">{{item.label}}</Radio>
											</Col>
											<Col span="8">
												<Input :disabled="$route.query.edit==1" v-if="addAcadme2.system=='others'" placeholder="请填写其他系统"></Input>
											</Col>
										</Row>
						</RadioGroup>
				</FormItem>
				<FormItem label="项目链接" prop="majorLink">
					<Input :disabled="$route.query.edit==1" v-model="addAcadme2.majorLink"></Input>          
				</FormItem>      
				<FormItem label="专业分支" prop="ssMajorBranchList">
					<majorBranchTable :majorId="addAcadme2.majorId" v-model="addAcadme2.ssMajorBranchList"></majorBranchTable>
				</FormItem>      
				<FormItem label="专业分支介绍链接" prop="majorBranchLink">
					<Input :disabled="$route.query.edit==1" v-model="addAcadme2.majorBranchLink" placeholder="输入专业分支链接"></Input>          
				</FormItem>      
			</div>
<!-- 添加专业申请信息 -->
			<v-title title="添加专业申请信息" style="margin-bottom:29px;"></v-title>
			<div class="applyInfo">
				<Row>
					<Col span="11">
						<FormItem label="申请截止日期（春季）" prop="springDeadline">
							<Input :disabled="$route.query.edit==1" v-model="addAcadme2.springDeadline"></Input>          
						</FormItem>      
					</Col>
					<Col span="11">
						<FormItem label="申请截止日期（夏季）" prop="summerDeadline">
							<Input :disabled="$route.query.edit==1" v-model="addAcadme2.summerDeadline"></Input>          
						</FormItem>      
					</Col>
				</Row>
				<Row>
					<Col span="11">
						<FormItem label="申请截止日期（秋季）" prop="autumnDeadline">
							<Input :disabled="$route.query.edit==1" v-model="addAcadme2.autumnDeadline"></Input>
						</FormItem>      
					</Col>
					<Col span="11">
						<FormItem label="申请截止日期（冬季）" prop="winterDeadline">
							<Input :disabled="$route.query.edit==1" v-model="addAcadme2.winterDeadline"></Input>          
						</FormItem>      
					</Col>
				</Row>
				<FormItem label="GPA最低分" prop="gpaScore">
					<Input :disabled="$route.query.edit==1" v-model="addAcadme2.gpaScore"></Input>          
				</FormItem>   
				<FormItem label="邮寄地址" prop="postAddress">
				 <Input :disabled="$route.query.edit==1" v-model="addAcadme2.postAddress"></Input>          
				</FormItem>      
				<FormItem label="Checklist Link" prop="checklistLink">
				 <Input :disabled="$route.query.edit==1" v-model="addAcadme2.checklistLink"></Input>      
				</FormItem>      
				<FormItem label="备注" prop="remarks">
				 <Input :disabled="$route.query.edit==1" v-model="addAcadme2.remarks" type="textarea"></Input>          
				</FormItem> 
			</div>
				<!-- 标准化考试要求    -->
			<div class="test_require">
				<div>
					标准化考试要求
				</div>
				<nav class="test_nav">
					<div class="infoList" v-for="(item,index) in testType" :key="item.id" @click="showTabContent(index)"> 
						<div class="top" v-html="item.top"></div>
						<div class="bottom" v-html="item.bottom"></div>
						<div class="addMask"><Icon type="android-add"></Icon></div>
					</div>
				</nav>
				<!-- TOFEL -->
				
					<div class="test_contain" v-for="(item,index) in testType[0].show" :key="index">
						<div class="close" @click="closeTab(0)">
							<Icon type="close" size="25"></Icon>
						</div>
						<div class="tofel">
							<div class="left">
								<div class="top"><i>TOFEL</i></div>
								<div class="bottom">TOFEL</div>
									<!-- <FormItem prop="tofelSelect">
										<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.tofelSelect">
											<span>&nbsp;&nbsp;未来考试</span>
										</Checkbox>
									</FormItem>          -->
							</div>
							<div class="right">
								<Row type="flex">
									<Col span="12">
										<FormItem required :rules="{required:testType[0].show.length,message:'请填写国际生是否要求TOFEL',trigger:'change'}" label="国际生是否要求TOFEL">
											<RadioGroup v-model="toeflData.isMust">
												<Row type="flex">
													<Col span="8">
														<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
													</Col>
													<Col span="8">
														<Radio :disabled="$route.query.edit==1" label="2">推荐</Radio>
													</Col>
													<Col span="8">
														<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
													</Col>
												</Row>
											</RadioGroup>
										</FormItem>
									</Col>
									<Col span="12">
										<Input :disabled="$route.query.edit==1" v-model="toeflData.remarks" placeholder="备注托福考试要求"></Input>                 
									</Col>
								</Row>
								<Row>
									<Col span="9">
										<FormItem required prop="tofelLowScore" label="TOEFL最低分">
											<Input :disabled="$route.query.edit==1" v-model="toeflData.scoreRequire"></Input>
										</FormItem>
									</Col>  
								</Row>
								<Row>
									<Col span="9">
										<FormItem>
											<Input :disabled="$route.query.edit==1" v-model="toeflData.scoreRemarks" placeholder="备注要求"></Input>
										</FormItem>
									</Col>  
								</Row>
								<Row>
									<Col span="6" v-for="(val,index) in toeflData.ssScoreRequireList" :key="index">	
										<FormItem :label="val.label">
											<Input :disabled="$route.query.edit==1" v-model="val.lowestScore"></Input>
										</FormItem>
									</Col>  
									<!-- <Col span="6">
										<FormItem label="口语"> 
											<Input :disabled="$route.query.edit==1" v-model="toeflData.verbalScore" placeholder="最低分"></Input>
										</FormItem>
									</Col>
									<Col span="6">
										<FormItem label="阅读">
											<Input :disabled="$route.query.edit==1" v-model="toeflData. readScore"></Input>
										</FormItem>
									</Col>
									<Col span="6">
										<FormItem label="写作">
											<Input :disabled="$route.query.edit==1" v-model="toeflData.writingSampleScore"></Input>
										</FormItem>
									</Col> -->
								</Row>
								<Row>
									<Col span="9">
										<FormItem required prop="tofelInstitutionCodes" label="送分代码">
											<Input :disabled="$route.query.edit==1" v-model="toeflData.sendscoreCode" placeholder="备注要求"></Input>
										</FormItem>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				<!-- IELTS -->
				<div class="test_contain" v-for="(item,index) in testType[1].show" :key="index"> 
					<div class="close" @click="closeTab(1)">
						<Icon type="close" size="25"></Icon>
					</div>
					<div class="ielts">
						<div class="left">
							<div class="top"><i>IELTS</i></div>
							<div class="bottom">IELTS</div>
								<!-- <FormItem prop="ieltsSelect">
									<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.ieltsSelect">
										<span>&nbsp;&nbsp;未来考试</span>
									</Checkbox>
								</FormItem>          -->
						</div>
						<div class="right">
							<Row type="flex">
								<Col span="9">
								<FormItem prop="requireIelts" label="是否接受雅思">
									<RadioGroup v-model="ieltsData.isMust">
										<Row type="flex">
											<Col span="11">
												<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
											</Col>
											<Col>
												<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
											</Col>
										</Row>
									</RadioGroup>
								</FormItem>
								</Col>
								<Col span="15">
									<Input :disabled="$route.query.edit==1" v-model="ieltsData.remarks" placeholder="备注雅思考试要求"></Input>                 
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="ieltsLowScore" label="IELTS最低分">
										<Input :disabled="$route.query.edit==1" v-model="ieltsData.scoreRequire"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="ieltsLowScoreMark">
										<Input :disabled="$route.query.edit==1" v-model="ieltsData.scoreRemarks" placeholder="备注要求"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="6" v-for="(item,index) in ieltsData.ssScoreRequireList" :key="index">
									<FormItem :label="item.label">
										<Input :disabled="$route.query.edit==1" v-model="item.lowestScore" placeholder="最低分"></Input>
									</FormItem>
								</Col>
								<!-- <Col span="6">
									<FormItem prop="ieltsRead" label="阅读">
										<Input :disabled="$route.query.edit==1" v-model="ieltsData.readScore"></Input>
									</FormItem>
								</Col>
								<Col span="6">
									<FormItem prop="ieltsWrite" label="写作">
										<Input :disabled="$route.query.edit==1" v-model="ieltsData.writingSampleScore"></Input>
									</FormItem>
								</Col>
								<Col span="6">
									<FormItem prop="ieltsListen" label="听力">
										<Input :disabled="$route.query.edit==1" v-model="ieltsData.hearingScore"></Input>
									</FormItem>
								</Col>   -->
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="ieltsInstitutionCodes" label="送分代码">
										<Input :disabled="$route.query.edit==1" v-model="ieltsData.sendscoreCode"></Input>
									</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<!-- GRE -->
				<div class="test_contain" v-for="(item,index) in testType[2].show" :key="index"> 
					 <div class="close" @click="closeTab(2)">
						<Icon type="close" size="25"></Icon>
					</div>
					<div class="gre">
						<div class="left">
							<div class="top"><i>GRE</i></div>
							<div class="bottom">GRE</div>
								<!-- <FormItem prop="greSelect">
									<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.greSelect">
										<span>&nbsp;&nbsp;未来考试</span>
									</Checkbox>
								</FormItem>          -->
						</div>
						<div class="right">
							<Row type="flex">
								<Col span="9">
								<FormItem prop="requireGre" label="国际生是否要求GRE">
									<RadioGroup v-model="greData.isMust">
										<Row type="flex">
											<Col span="11">
												<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
											</Col>
											<Col>
												<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
											</Col>
										</Row>
									</RadioGroup>
								</FormItem>
								</Col>
								<Col span="15">
									<Input :disabled="$route.query.edit==1" v-model="greData.remarks" placeholder="备注GRE考试要求"></Input>                 
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="greAvgScore" label="GRE平均分">
										<Input :disabled="$route.query.edit==1" v-model="greData.scoreRequire"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="greAvgScoreMark">
										<Input :disabled="$route.query.edit==1" v-model="greData.scoreRemarks" placeholder="备注要求"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="6" v-for="(item,index) in greData.ssScoreRequireList" :key="index">
									<FormItem :label="item.label">
										<Input :disabled="$route.query.edit==1" v-model="item.lowestScore" placeholder="最低分"></Input>
									</FormItem>
								</Col>
								<!-- <Col span="9">
									<FormItem prop="greVerbalScore" label="Verbal Score">
										<Input :disabled="$route.query.edit==1" v-model="greData.verbalScore"></Input>
									</FormItem>
								</Col>
								<Col span="9" push="6">
									<FormItem prop="greWritingScore" label="Analytical Writing Score">
										<Input :disabled="$route.query.edit==1" v-model="greData.analyticalWritingScore"></Input>
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="greQuantitativeScore" label="Quantitative Score">
										<Input :disabled="$route.query.edit==1" v-model="greData.quantitativeScore"></Input>
									</FormItem>
								</Col>-->
							</Row> 
							<Row>
								<Col span="9">
									<FormItem prop="greInstitutionCodes" label="送分代码">
										<Input :disabled="$route.query.edit==1" v-model="greData.sendscoreCode" placeholder="备注要求"></Input>
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="greTestDate" label="考试时间">
										<Input :disabled="$route.query.edit==1" v-model="greData.examtimeRequire"></Input>
									</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>  
				<!-- GMAT -->
				<div class="test_contain" v-for="(item,index) in testType[3].show" :key="index"> 
					<div class="close" @click="closeTab(3)">
						<Icon type="close" size="25"></Icon>
					</div>
					<div class="gmat">
						<div class="left">
							<div class="top"><i>GMAT</i></div>
							<div class="bottom">GMAT</div>
								<!-- <FormItem prop="gmatSelect">
									<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.gmatSelect">
										<span>&nbsp;&nbsp;未来考试</span>
									</Checkbox>
								</FormItem>          -->
						</div>
						<div class="right">
							<Row type="flex">
								<Col span="9">
								<FormItem prop="requireGmat" label="国际生是否要求GMAT">
									<RadioGroup v-model="gmatData.isMust">
										<Row type="flex">
											<Col span="11">
												<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
											</Col>
											<Col>
												<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
											</Col>
										</Row>
									</RadioGroup>
								</FormItem>
								</Col>
								<Col span="15">
									<Input :disabled="$route.query.edit==1" v-model="gmatData.remarks" placeholder="备注GMAT考试要求"></Input>                 
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="gmatAvgScore" label="GMAT平均分">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.scoreRequire"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="gmatAvgScoreMark">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.scoreRemarks" placeholder="备注要求"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="6" v-for="(item,index) in gmatData.ssScoreRequireList" :key="index">
									<FormItem :label="item.label">
										<Input :disabled="$route.query.edit==1" v-model="item.lowestScore" placeholder="最低分"></Input>
									</FormItem>
								</Col>
								<!-- <Col span="9">
									<FormItem prop="gmatVerbalScore" label="Verbal Score">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.verbalScore"></Input>
									</FormItem>
								</Col>
								<Col span="9" push="6">
									<FormItem prop="gmatWritingScore" label="Analytical Writing Score">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.analyticalWritingScore"></Input>
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="gmatQuantitativeScore" label="Quantitative Score">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.quantitativeScore"></Input>
									</FormItem>
								</Col>
								<Col span="9" push="6">
									<FormItem prop="gmatReasoningScore" label="Integrated Reasoning Score">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.integratedReasoningScore"></Input>
									</FormItem>
								</Col> -->
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="gmatInstitutionCodes" label="送分代码">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.sendscoreCode" placeholder="备注要求"></Input>
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="gmatTestDate" label="考试时间">
										<Input :disabled="$route.query.edit==1" v-model="gmatData.gmatTestDate"></Input>
									</FormItem>
								</Col>
							</Row>
						</div>
					</div>
				</div>  
				<!-- MCAT -->
				<div class="test_contain" v-for="(item,index) in testType[4].show" :key="index"> 
					<div class="close" @click="closeTab(4)">
						<Icon type="close" size="25"></Icon>
					</div>
					<div class="mcat">
						<div class="left">
							<div class="top"><i>MCAT</i></div>
							<div class="bottom">MCAT</div>
								<!-- <FormItem prop="mcatSelect">
									<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.mcatSelect">
										<span>&nbsp;&nbsp;未来考试</span>
									</Checkbox>
								</FormItem>          -->
						</div>
						<div class="right">
							<Row type="flex">
								<Col span="9">
								<FormItem prop="requireMcat" label="国际生是否要求MCAT">
									<RadioGroup v-model="mcatData.isMust">
										<Row type="flex">
											<Col span="11">
												<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
											</Col>
											<Col>
												<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
											</Col>
										</Row>
									</RadioGroup>
								</FormItem>
								</Col>
								<Col span="15">
									<Input :disabled="$route.query.edit==1" v-model="mcatData.remarks" placeholder="备注MCAT考试要求"></Input>                 
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="mcatMinScore" label="MCAT最低分">
										<Input :disabled="$route.query.edit==1" v-model="mcatData.scoreRequire"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="mcatMinScoreMark">
										<Input :disabled="$route.query.edit==1" v-model="mcatData.scoreRemarks" placeholder="备注要求"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="6" v-for="(item,index) in mcatData.ssScoreRequireList" :key="index">
									<FormItem :label="item.label">
										<Input :disabled="$route.query.edit==1" v-model="item.lowestScore" placeholder="最低分"></Input>
									</FormItem>
								</Col>
								<!-- <Col span="9">
									<FormItem prop="mcatPhysicalScore" label="Physical Sciences Score">
										<Input :disabled="$route.query.edit==1" v-model="mcatData.physicalSciencesScore"></Input>
									</FormItem>
								</Col>
								<Col span="9" push="6">
									<FormItem prop="mcatReasoningScore" label="Verbal Reasoning Score">
										<Input :disabled="$route.query.edit==1" v-model="mcatData.verbalReasoningScore"></Input>
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="mcatWritingScore" label="Writing Sample Score">
										<Input :disabled="$route.query.edit==1" v-model="mcatData.writingSampleScore"></Input>
									</FormItem>
								</Col>
								<Col span="9" push="6">
									<FormItem prop="mcatBiologyScore" label="Biological Sciences Score">
										<Input :disabled="$route.query.edit==1" v-model="mcatData.biologicalSciencesScore"></Input>
									</FormItem>
								</Col> -->
							</Row>
						</div>
					</div>
				 </div> 
				<!-- LSAT -->
				<div class="test_contain" v-for="(item,index) in testType[5].show" :key="index"> 
					<div class="close" @click="closeTab(5)">
						<Icon type="close" size="25"></Icon>
					</div>
					<div class="lsat">
						<div class="left">
							<div class="top"><i>LSAT</i></div>
							<div class="bottom">LSAT</div>
								<!-- <FormItem prop="lsatSelect">
									<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.lsatSelect">
										<span>&nbsp;&nbsp;未来考试</span>
									</Checkbox>
								</FormItem>          -->
						</div>
						<div class="right">
							<Row type="flex">
								<Col span="9">
								<FormItem prop="requireLsat" label="国际生是否要求LSAT">
									<RadioGroup v-model="lsatData.isMust">
										<Row type="flex">
											<Col span="11">
												<Radio :disabled="$route.query.edit==1" label="1">是</Radio>
											</Col>
											<Col>
												<Radio :disabled="$route.query.edit==1" label="0">否</Radio>
											</Col>
										</Row>
									</RadioGroup>
								</FormItem>
								</Col>
								<Col span="15">
									<Input :disabled="$route.query.edit==1" v-model="lsatData.remarks" placeholder="备注LSAT考试要求"></Input>                 
								</Col>
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="lsatLowScore" label="LSAT最低分">
										<Input :disabled="$route.query.edit==1" v-model="lsatData.scoreRequire"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="9">
									<FormItem prop="lsatLowScoreMark">
										<Input :disabled="$route.query.edit==1" v-model="lsatData.scoreRemarks" placeholder="备注要求"></Input>
									</FormItem>
								</Col>  
							</Row>
							<Row>
								<Col span="6" v-for="(item,index) in lsatData.ssScoreRequireList" :key="index">
									<FormItem :label="item.label">
										<Input :disabled="$route.query.edit==1" v-model="item.lowestScore" placeholder="最低分"></Input>
									</FormItem>
								</Col>
							</Row>
							<Row type="flex">
								<Col span="6">
									<FormItem prop="lsatMinScore" label="分数区间">
										<Input :disabled="$route.query.edit==1" v-model="lsatMinScore"></Input>
									</FormItem>
								</Col>
								<Col style="margin:9px;">
									<div> - </div>
								</Col>
								<Col span="6" style="margin-left:-110px;">
									<FormItem prop="lsatMaxScore">
										<Input :disabled="$route.query.edit==1" v-model="lsatMaxScore"></Input>  
									</FormItem>
								</Col>  
							</Row>
						</div>
					</div>
				</div>  
				<!-- other -->
				<div class="test_contain" v-for="(item,index) in testType[6].show" :key="index"> 
					<div class="close" @click="closeTab1(index)">
						<Icon type="close" size="25"></Icon>
					</div>
					<div class="other">
						<div class="left">
							<div class="top">...</div>
							<div class="bottom">other</div>
								<!-- <FormItem prop="otherSelect">
									<Checkbox :disabled="$route.query.edit==1" v-model="addAcadme2.otherSelect">
										<span>&nbsp;&nbsp;未来考试</span>
									</Checkbox>
								</FormItem>          -->
						</div>
						<div class="right">
							<FormItem prop="otherTestName" label="考试名称">
								<Input :disabled="$route.query.edit==1" v-model="item.name"></Input>
							</FormItem>
							<Row>
								<Col span="9">
									<FormItem prop="otherScoreRequire" label="分数要求">
										<Input :disabled="$route.query.edit==1" v-model="item.scoreRequire"></Input>
									</FormItem>
								</Col>
								<Col span="9">
									<FormItem prop="otherTestDate" label="考试时间">
										<Input :disabled="$route.query.edit==1" v-model="item.examtimeRequire"></Input>
									</FormItem>
								</Col>
							</Row>
							<FormItem prop="otherRemarks" label="备注">
								<Input :disabled="$route.query.edit==1" v-model="item.remarks" type="textarea" :rows="4"></Input>
							</FormItem>
						</div>
					</div>
				</div>
			</div>
			<div class="btnSubmit">
				<FormItem>
					<Button type="primary" @click="handleSubmit('addAcadmeStep2')">保存并下一步</Button>
				</FormItem> 
			</div>
		</Form>
	</div>
</template>
<script>
import vTitle from "@public/modules/vTitle";
import majorBranchTable from "./component/majorBranchTable";
import valid, {
	errors,
	fillAcademeMajor,
	major,
	SchoolMajor,
	sysAcademeMajor
} from "../../../../libs/request";
import { mapMutations } from "vuex";
import { formatParams, parseResData } from "../../../../libs/util";
export default {
	name: "addMajor",
	data() {
		const reg = /[\u4e00-\u9fa5\w\.\s\&\-]{2,20}/;
		const runRule = (callback) => {
			// let flag = false;
			// if(this.addAcadme2.isMaster){
			//   if(reg.test(this.addAcadme2.masterProgram)){
			//     flag = true;
			//   } else {
			//     return callback(new Error("至少选择一个,并填写相应名称"));
			//   }
			// } else {
			//   this.addAcadme2.masterProgram = '';
			// } 
			// if (this.addAcadme2.isPhd) {
			//   if(reg.test(this.addAcadme2.phdProgram)){
			//     flag = true;
			//   } else {
			//     return callback(new Error("至少选择一个,并填写相应名称"));
			//   }
			// } else {
			//   this.addAcadme2.phdProgram = ''; 
			// }
			// if (!flag){
			//     return callback(new Error("至少选择一个"));
			// }
			if(!this.addAcadme2.isMaster&&!this.addAcadme2.isPhd){
				 return callback(new Error("至少选择一个学位类型"));
			}
			return callback([]);
		}

		

		const validateLevelType = (rule, value, callback) => {
			console.info(rule,value,callback);
			runRule(callback);
		}

		const myrule = [
			{ required:true, validator: validateLevelType, trigger: 'change' },
			{ required:true, validator: validateLevelType, trigger: 'blur' }
		];

		return {
			isOk: false,
			isChange:false,
			majorNameList: [],
			loading: false,
			degreeList: [],
			systemList: [],
			addAcadme2: {
				mytypes:[],
				gradeschoolId: this.$route.query.schoolId,
				// 基本信息
				majorId: "",
				name: "",
				enName: "",
				majorRank: "",
				isMaster: "",
				isPhd: "",
				masterProgram: "",
				phdProgram: "",
				majorLink: "",
				ssMajorBranchList: [],
				majorBranchLink: "",
				system: "",
				levelType: "",

				// 申请信息
				springDeadline: "",
				summerDeadline: "",
				autumnDeadline: "",
				winterDeadline: "",
				postAddress: "",
				checklistLink: "",
				remarks: "",

				//标准化考试要求
				ssEaxminfoRequireList: []
			},
			// "':<>,{}\\\r\n
			ruleAcademe2: {
				// 基本信息
				majorId: [
					{
						required: true,
						message: "请选择专业名称",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "change"
					}
				],
				name: [
					{
						required: true,
						message: "请填写学校中文名称",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "blur"
					}
				],
				enName: [
					{
						required: true,
						message: "请填写学校英文名称",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,50}/,
						trigger: "blur"
					}
				],
				collegeName: [
					{
						required: true,
						message: "请填写专业名称",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "blur"
					}
				],
				majorRank: [
					{ required: true, message: "请填写专业排名（最多7位数字）", trigger: "blur" },
					{ pattern: /^\d{0,7}$/, message: "请填写数字", trigger: "blur" }
				],
				levelType: [
					{
						required: true,
						type: "array",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{2,20}/,
						message: "请选择学位类型",
						trigger: "change"
					}
				],
				mytypes:myrule,
				system: [{ required: true, message: "请选择申请系统", trigger: "change" }],
				// isMaster: [{validator: validateLevelType, trigger: "change" }],
				// // isPhd: [{validator: validateLevelType,trigger: "change" }],
				majorLink: [
					{
						message: "特殊字符只能包含/,.,&,-",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-\/]{0,20}/,
						trigger: "blur"
					}
				],
				majorBranch: [
					{
						message: "特殊字符只能包含/,.,&,-",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-\/]{0,20}/,
						trigger: "blur"
					}
				],
				majorBranchLink: [
					{
						message: "特殊字符只能包含/,.,&,-",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-\/]{0,20}/,
						trigger: "blur"
					}
				],
				// 申请信息
				springDeadline: [
					{
						required: true,
						message: "请填写截止日期（含特殊字符/,.,&,-）",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "blur"
					}
				],
				summerDeadline: [
					{
						required: true,
						message: "请填写截止日期（含特殊字符/,.,&,-）",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "blur"
					}
				],
				autumnDeadline: [
					{
						required: true,
						message: "请填写截止日期（含特殊字符/,.,&,-）",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "blur"
					}
				],
				winterDeadline: [
					{
						required: true,
						message: "请填写截止日期（含特殊字符/,.,&,-）",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "blur"
					}
				],
				gpaScore: [{ message: "请填写数字", pattern: /^\d+$/, trigger: "blur" }],
				postAddress: [
					{
						message: "特殊字符只能包含/,.,&,-",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-]{0,20}/,
						trigger: "blur"
					}
				],
				checklistLink: [
					{
						message: "特殊字符只能包含/,.,&,-",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-\/]{0,20}/,
						trigger: "blur"
					}
				],
				remarks: [
					{
						message: "特殊字符只能包含/,.,&,-",
						pattern: /[\u4e00-\u9fa5\w\.\s\&\-\/]{0,20}/,
						trigger: "blur"
					}
				]
			},
			toeflData: {	
				examType: "tofel",
				isMust: "",
				remarks: "",
				scoreRequire: "",
				scoreRemarks: "",
				ssScoreRequireList:[],
				// verbalScore: "",
				// readScore: "",
				// writingSampleScore: "",
				// hearingScore: "",
				sendscoreCode: ""
			},
			ieltsData: {
				examType: "ielts",
				isMust: "",
				remarks: "",
				scoreRequire: "",
				scoreRemarks: "",
				ssScoreRequireList:[],
				// verbalScore: "",
				// readScore: "",
				// writingSampleScore: "",
				// hearingScore: "",
				sendscoreCode: ""
			},
			greData: {
				examType: "gre",
				isMust: "",
				remarks: "",
				scoreRequire: "",
				scoreRemarks: "",
				ssScoreRequireList:[],
				
				// verbalScore: "",
				// analyticalWritingScore: "",
				// quantitativeScore: "",
				examtimeRequire: "",
				sendscoreCode: ""
			},
			gmatData: {
				examType: "gmat",
				isMust: "",
				remarks: "",
				scoreRequire: "",
				scoreRemarks: "",
				ssScoreRequireList:[],
				
				// verbalScore: "",
				// analyticalWritingScore: "",
				// quantitativeScore: "",
				// integratedReasoningScore: "",
				sendscoreCode: "",
				examtimeRequire: ""
			},
			mcatData: {
				examType: "mcat",
				isMust: "",
				remarks: "",
				scoreRequire: "",
				scoreRemarks: "",
				ssScoreRequireList:[],
				
				// physicalSciencesScore: "",
				// verbalReasoningScore: "",
				// writingSampleScore: "",
				// biologicalSciencesScore: ""
			},
			lsatData: {
				examType: "lsat",
				isMust: "",
				remarks: "",
				ssScoreRequireList:[],
				
				scoreRequire: "",
				scoreRemarks: "",
				scoreScope: ""
			},
			lsatMinScore: "",
			lsatMaxScore: "",
			otherData: {
				examType: "other",
				name: "",
				scoreRequire: "",
				examtimeRequire: "",
				remarks: ""
			},
			ruleTest: [
				//TOFEL
				{
					requireTofel: [
						{ required: true, message: "请选择是否要求TOFEL", trigger: "change" }
					],
					tofelLowScore: [
						{ required: true, message: "请填写分数", trigger: "blur" }
					],
					tofelInstitutionCodes: [
						{ required: true, message: "请填写代码", trigger: "blur" }
					]
				},
				//IELTS
				{
					requireIelts: [
						{
							required: true,
							type: "array",
							min: 1,
							message: "请选择是否要求Ielts",
							trigger: "change"
						},
						{ type: "array", max: 1, message: "最多选择一个", trigger: "change" }
					],
					ieltsLowScore: [
						{ required: true, message: "请填写分数", trigger: "blur" }
					],
					ieltsInstitutionCodes: [
						{ required: true, message: "请填写代码", trigger: "blur" }
					]
				},
				//Gre
				{
					requireGre: [
						{
							required: true,
							type: "array",
							min: 1,
							message: "请选择是否要求Ielts",
							trigger: "change"
						},
						{ type: "array", max: 1, message: "最多选择一个", trigger: "change" }
					],
					greAvgScore: [{ required: true, message: "请填写分数", trigger: "blur" }],
					greInstitutionCodes: [
						{ required: true, message: "请填写代码", trigger: "blur" }
					],
					greTestDate: [{ required: true, message: "请填写考试时间", trigger: "blur" }]
				},
				//GMAT
				{
					requireGmat: [
						{
							required: true,
							type: "array",
							min: 1,
							message: "请选择是否要求Ielts",
							trigger: "change"
						},
						{ type: "array", max: 1, message: "最多选择一个", trigger: "change" }
					],
					gmatAvgScore: [{ required: true, message: "请填写分数", trigger: "blur" }],
					gmatInstitutionCodes: [
						{ required: true, message: "请填写代码", trigger: "blur" }
					],
					gmatTestDate: [
						{ required: true, message: "请填写考试时间", trigger: "blur" }
					]
				},
				//MCAT
				{
					requireMcat: [
						{
							required: true,
							type: "array",
							min: 1,
							message: "请选择是否要求Ielts",
							trigger: "change"
						},
						{ type: "array", max: 1, message: "最多选择一个", trigger: "change" }
					],
					mcatMinScore: [{ required: true, message: "请填写分数", trigger: "blur" }]
				},
				//LSAT
				{
					requireLsat: [
						{
							required: true,
							type: "array",
							min: 1,
							message: "请选择是否要求Ielts",
							trigger: "change"
						},
						{ type: "array", max: 1, message: "最多选择一个", trigger: "change" }
					],
					lsatMinScore: [{ required: true, message: "请填写分数", trigger: "blur" }],
					lsatMaxScore: [{ required: true, message: "请填写分数", trigger: "blur" }]
				}
			],
			testType: [
				{ id: 1, top: "<i>TOEFL</i>", bottom: "TOEFL", show: [] },
				{ id: 2, top: "<i>IELTS</i>", bottom: "IELTS", show: [] },
				{ id: 3, top: "<i>GRE</i>", bottom: "GRE", show: [] },
				{ id: 4, top: "<i>GMAT</i>", bottom: "GMAT", show: [] },
				{ id: 5, top: "<i>MCAT</i>", bottom: "MCAT", show: [] },
				{ id: 6, top: "<i>LSAT</i>", bottom: "LSAT", show: [] },
				{ id: 7, top: "...", bottom: "other", show: [] }
			]
		};
	},
	components: {
		vTitle,
		majorBranchTable
	},
	created() {
		this.fetchDegree();
		this.fetchSystem();
		this.fetchExamType();
		
		if(!this.$route.query.majorId){
			this.$watch('addAcadme2',function (val, oldVal) {this.isChange=true;},{deep: true});
		}
	},
	// 组件内导航钩子，处理未保存退出的情况
	beforeRouteLeave: function(to, from, next) {
		if (this.isOk == false && !!this.isChange) {
			next(false);
			this.$Modal.confirm({
				title: "提示",
				content: "页面未保存，是否离开？",
				onOk: () => {
					next();
				}
			});
		} else {
			next();
		}
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		// 专业名称联想
		remoteMethod(query) {
			this.loading = true;
			major
				.listThink(query)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.majorNameList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.loading = false;
				});
		},
		//获取学位类型
		fetchDegree() {
			this.updateLoadingStatus({ isLoading: true });
			sysAcademeMajor
				.fetchDictData({ type: "ss_school_major_level_type" })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.degreeList = res.data.data;
						console.log("this.degreeList", this.degreeList);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取申请系统
		fetchSystem() {
			this.updateLoadingStatus({ isLoading: true });
			sysAcademeMajor
				.fetchDictData({ type: "ss_apply_require_system" })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.systemList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		// 考试类型
		fetchExamType() {
			this.updateLoadingStatus({ isLoading: true });
			sysAcademeMajor
				.fetchTestType({ type: "xx_exam_type",pids:'0,1040'})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let arr = res.data.data.xx_exam_type;
						console.log('aee',arr);
						let promiseArr = [];
						this.testType.forEach(v => {
							arr.forEach(element => {	
								if (v.bottom == element.label) {
									Object.assign(v, element);
									sysAcademeMajor
										.fetchDictData({ type: 'xx_exam_score_type', parentId: element.id })
										.then(valid.call(this))
										.then(res => {
											if (res.ok) {
												// alert(`${v.bottom.toLowerCase()}Data`)
												this[`${v.bottom.toLowerCase()}Data`]['ssScoreRequireList'] = res.data.data.map(item=>{
													return {label:item.label,lowestScore:''};
												});
												console.log('==============',this[v.bottom.toLowerCase() + "Data"]);
												console.log('=====',this.toeflData);
												v.score = res.data.data;  
												console.log("heheheheheheheh", res.data);
												if (this.$route.params.currentTitle == 1) {
													this.fetchEditMajorData()
												}
											}
										});
								}
							});
						});
						
						console.log(this.testType);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		handleSubmit(name) {
			this.$refs[name].validate(validate => {
				if (validate) {
					this.updateLoadingStatus({ isLoading: true });
					//格式化请求参数
					let params = Object.assign({},this.addAcadme2)
					params.gradeschoolId = this.$route.query.schoolId;
					let arr = [];
					this.testType.forEach((v, i) => {
						if (v.show.length > 0) {
							if (v.show[0].examType == "other") {
								arr.push(...v.show);
							} else {
								arr.push(this[v.bottom.toLowerCase() + "Data"]);
							}
						}
					});
					params.ssEaxminfoRequireList = arr;
					params.isMaster = Number(params.isMaster);
					params.isPhd = Number(params.isPhd);
					delete params.isNewRecord;
					delete params.mytypes;
					SchoolMajor.editAcademeMajor(params)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.isOk = true;
								this.$router.push({
									name: "library.academeMajorProject",
									params: { currentTitle: this.$route.params.currentTitle },
									query: { schoolId: this.$route.query.schoolId }
								});
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.updateLoadingStatus({ isLoading: false });
						});
				} else {
					this.$Message.error("请填写必填信息!");
				}
			});
		},
		showTabContent(index) {
			if (index === 6) {
				this.testType[index].show.push({
					examType: "other",
					name: "",
					scoreRequire: "",
					examtimeRequire: "",
					remarks: ""
				});
			} else {
				this.testType[index].show = [1];
			}
		},
		closeTab(index) {
			this.testType[index].show = [];
		},
		closeTab1(index) {
			this.testType[6].show.splice(index, 1);
		},
		// merge form rule
		mergeRule() {
			this.testType.forEach((val, i) => {
				if (val.show.length) {
					Object.assign(this.ruleAcademe2, this.ruleTest[i]);
				}
			});
		},
		//获取专业名称中英文名
		getMajorName(item) { 
			this.addAcadme2.name = item.cnname;
			this.addAcadme2.enName = item.enname;
		},
		// 查看学院专业项目详情
		fetchEditMajorData() {
			if(!this.$route.query.majorId) return;
			SchoolMajor.fetchMajorDetail(this.$route.query.majorId)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						console.log(res);
							//修改的地方
						let obj = res.data.data;
						obj.isMaster = !!obj.isMaster;
						obj.isPhd = !!obj.isPhd;
						this.addAcadme2 = obj;
						console.log(this.addAcadme2);

						if (obj.ssEaxminfoRequireList.length > 0) {
							obj.ssEaxminfoRequireList.forEach(v => {
								if (v.examType == "other") {
									this.testType[6].show.push(v);
								} else if (v.examType == "tofel") {
									this.toeflData = v;
									this.testType[0].show = [1];
								} else if (v.examType == "ielts") {
									this.ieltsData = v;
									this.testType[1].show = [1];
								} else if (v.examType == "gre") {
									this.greData = v;
									this.testType[2].show = [1];
								} else if (v.examType == "gmat") {
									this.gmatData = v;
									this.testType[3].show = [1];
								} else if (v.examType == "mcat") {
									this.mcatData = v;
									this.testType[4].show = [1];
								} else if (v.examType == "lsat") {
									this.lsatData = v;
									this.testType[5].show = [1];
								}
							});
						}
							this.$watch('addAcadme2',function (val, oldVal) {this.isChange=true;},{deep: true});
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		validRule(){
			this.$refs.addAcadmeStep2.validateField('isMaster')
		}
	},
	watch: {
		lsatMinScore(val) {
			this.lsatData.scoreScope = val + "," + this.lsatMaxScore;
		},
		lsatMaxScore(val) {
			this.lsatData.scoreScope = val + "," + this.lsatMinScore;
		},
	},
};
</script>
