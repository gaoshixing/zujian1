<template>
	<div class="contentBox">
		<!--<menubar>
            <span slot="menu" class="slotContent">
                <a href="javascript:void(0)" class="active">{{$t('Common.addStudentMessage')}}</a>
            </span>
        </menubar>-->
		<div class="tipContent clearfix">
			<div class="iconBox tipIcon"></div>
			<div class="tipInfo" v-html="$t('Common.addStudentTitle')"></div>
		</div>
		<div class="stepContent">
			<div class="title" v-html="$t('Common.stepTips')"></div>
			<div class="progressBox" :class="{totalSixStep:chineseUser}">
				<div class="lineBox"></div>
				<div class="stepBox clearfix">
					<div class="stepList" v-for="(item,index) in stepHeadList" :key="index">
						<a class="stepInfo" @click="scrollToIndex('#step-'+index)" href="javascript:void(0)">{{index+1}}</a>
						<div class="tit">{{item.label}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mainContent">
			<div :id="'step-'+0" class="stepInfoList basicStep">
				<div class="headerInfo clearfix" @click="basicShow=!basicShow">
					<div class="iconBox nameIcon fl"></div>
					<div class="title fl">
						<p>{{$t("Common.GENERALINFORMATION")}}</p>
						<div class="tips">{{$t("Common.GENERALINFORMATIONTips")}}</div>
					</div>
					<div class="spreadBox fr" :class="{hide:!basicFinished}">
						<a href="javascript:void(0)" :class="{'close':basicShow,'open':!basicShow}">{{ basicShow?$t("Close"):$t("Open")}}</a>
					</div>
				</div>
				<div class="infoBox" v-show="basicShow">
					<Form ref="basicStepForm" :rules="basicFormValidate" :model="xxStudent" :label-width="120" inline>
						<Form-item :label="$t('XxStudent.lastName')" prop="lastName">
							<Input v-model="xxStudent.lastName" style="width:320px"></Input>
						</Form-item>

						<Form-item :label="$t('XxStudent.firstName')" prop="firstName">
							<Input v-model="xxStudent.firstName" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.lastNamePinYin')" prop="lastNamePinYin">
							<Input v-model="xxStudent.lastNamePinYin" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.firstNamePinYin')" prop="firstNamePinYin">
							<Input v-model="xxStudent.firstNamePinYin" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.enName')" prop="enName">
							<Input v-model="xxStudent.enName" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.gender')" prop="gender">
							<Select v-model="xxStudent.gender" style="width:320px">
								<Option value="m">{{$t("male")}}</Option>
								<Option value="f">{{$t("female")}}</Option>
							</Select>
						</Form-item>
						<Form-item :label="$t('XxStudent.skypeId')" prop="skypeId">
							<Input v-model="xxStudent.skypeId" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.email')" prop="email">
							<Input v-model="xxStudent.email" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.wechat')" prop="wechat">
							<Input v-model="xxStudent.wechat" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.country')" prop="country">
							<Select filterable v-model="xxStudent.country" @on-change="onCountryChange" style="width:320px">
								<Option v-for="c in cityTree.country" :key="c.name+c.id" :value="c.id">{{c.name}}</Option>
							</Select>
						</Form-item>
						<Form-item :label="$t('XxStudent.province')" prop="province">
							<Select v-if="cityTree.flag2" filterable v-model="xxStudent.province" @on-change="onProvinceChange" style="width:320px">
								<Option v-for="c in cityTree.province" :key="c.name+c.id" :value="c.id">{{c.name}}</Option>
							</Select>
						</Form-item>
						<Form-item :label="$t('XxStudent.city')" prop="city">
							<Select v-if="cityTree.flag3" filterable v-model="xxStudent.city" style="width:320px">
								<Option v-for="c  in cityTree.city" :key="c.name+c.id" :value="c.id">{{c.name}}</Option>
							</Select>
						</Form-item>
						<Form-item :label="$t('XxStudent.cellNumber')" prop="cellNumber">
							<Input v-model="xxStudent.cellNumber" style="width:320px"></Input>
						</Form-item>
						<Form-item label="手机号（备用）">
							<Input v-model="xxStudent.phone" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.parentContactNumber')" prop="parentContactNumber">
							<Input v-model="xxStudent.parentContactNumber" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.address')" prop="address">
							<Input v-model="xxStudent.address" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.postcode')" prop="postcode">
							<Input v-model="xxStudent.postcode" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.grade')" prop="grade">
							<Select v-model="xxStudent.grade" style="width:320px">
								<Option v-for="(item,index) in gradeTypeList" :key="'grade_'+index" :value="item.value">{{item.label}}</Option>
							</Select>
						</Form-item>
						<Form-item :label="$t('XxStudent.apply')" prop="apply">
							<Select v-model="xxStudent.apply" @on-change="changeApply" style="width:320px">
								<Option v-for="(item,index) in applyTypeList" :key="'apply_'+index" :value="item.value">{{item.label}}</Option>
							</Select>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.applyTime')" prop="applyTime">
							<Input v-model="xxStudent.applyTime" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.amount')" prop="amount">
							<Input :maxlength="4" v-model="xxStudent.amount" style="width:320px"></Input>
						</Form-item>
						<Form-item label="缴费加校数量" prop="moneyAmount">
							<Input :maxlength="4" v-model="xxStudent.moneyAmount" style="width:320px"></Input>
						</Form-item>
						<Form-item label="免费加校数量" prop="freeAmount">
							<Input :maxlength="4" v-model="xxStudent.freeAmount" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.fatherName')" prop="fatherName">
							<Input :maxlength="120" v-model="xxStudent.fatherName" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.fatherJob')" prop="fatherJob">
							<Input :maxlength="120" v-model="xxStudent.fatherJob" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.fatherPhone')" prop="fatherPhone">
							<Input :maxlength="40" v-model="xxStudent.fatherPhone" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.fatherEmail')" prop="fatherEmail">
							<Input :maxlength="40" v-model="xxStudent.fatherEmail" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.fatherWechat')" prop="fatherWechat">
							<Input :maxlength="40" v-model="xxStudent.fatherWechat" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.motherName')">
							<Input :maxlength="120" v-model="xxStudent.motherName" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.motherJob')">
							<Input :maxlength="120" v-model="xxStudent.motherJob" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.motherPhone')" prop="motherPhone">
							<Input :maxlength="40" v-model="xxStudent.motherPhone" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.motherEmail')" prop="motherEmail">
							<Input :maxlength="40" v-model="xxStudent.motherEmail" style="width:320px"></Input>
						</Form-item>
						<Form-item :label="$t('XxStudent.motherWechat')">
							<Input :maxlength="40" v-model="xxStudent.motherWechat" style="width:320px"></Input>
						</Form-item>

					</Form>
					<div class="btnBox">
						<Button type="primary" @click="basicInfoSave('basicStepForm')">{{$t("SaveAndNext")}}</Button>
					</div>
				</div>
			</div>
			<div :id="'step-'+1" ref="firstStep" class="stepInfoList firstStep" :class="{hide:!chineseUser}">
				<div class="headerInfo clearfix" @click="firstShow=!firstShow">
					<div class="iconBox boshiIcon fl"></div>
					<div class="title fl">
						<p>{{$t("Common.INNERINFORMATION")}}</p>
						<div class="tips"></div>
					</div>
					<div class="spreadBox fr" :class="{hide:!basicFinished}">
						<a href="javascript:void(0)" :class="{'close':firstShow,'open':!firstShow}">{{ firstShow?$t("Close"):$t("Open")}}</a>
					</div>
				</div>
				<div class="infoBox" v-show="firstShow">
					<Form ref="firStepForm" :model="xxInnerinfo" :label-width="120" inline :rules="xxInnerinfoRule">
						<Form-item :label="$t('XxInnerinfo.refundRatio')">
							<Input v-model="xxInnerinfo.refundRatio" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.rank')">
							<Input v-model="xxInnerinfo.rank" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.type')" prop="type">
							<Select v-model="xxInnerinfo.type" style="width:363px">
								<Option value="0" v-for="(item,index) in userTypeList" :key="'type_'+index" :value="item.value">{{item.label}}</Option>
							</Select>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.saler')">
							<Input v-model="xxInnerinfo.saler" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.teacher_sale')" prop="teacherSale">
							<Input v-model="xxInnerinfo.teacherSale" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.teacher_plan')" prop="teacherPlan">
							<Input v-model="xxInnerinfo.teacherPlan" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.teacher_flow')" prop="teacherFlow">
							<Input v-model="xxInnerinfo.teacherFlow" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.teacher_essay')" prop="teacherEssay">
							<Input v-model="xxInnerinfo.teacherEssay" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.teacher_apply')" prop="teacherApply">
							<Input v-model="xxInnerinfo.teacherApply" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.teacher_language')" prop="teacherLanguage">
							<Input v-model="xxInnerinfo.teacherLanguage" style="width:363px"></Input>
						</Form-item>
						<Form-item :label="$t('XxInnerinfo.teacher_other')">
							<Input v-model="xxInnerinfo.teacherOther" style="width:363px"></Input>
						</Form-item>
						<div>
							<Form-item :label="$t('XxInnerinfo.studentCharacter')">
								<Input type="textarea" v-model="xxInnerinfo.studentCharacter" style="width:600px"></Input>
							</Form-item>
							<Form-item :label="$t('XxInnerinfo.parentCharacter')">
								<Input type="textarea" v-model="xxInnerinfo.parentCharacter" style="width:600px"></Input>
							</Form-item>
						</div>
					</Form>
					<div class="btnBox">
						<Button type="primary" @click="firstStepInfoSave">{{$t("SaveAndNext")}}</Button>
					</div>
				</div>
			</div>
			<div :id="'step-'+2" ref="secStep" class="stepInfoList secStep">
				<div class="headerInfo clearfix" @click="secShow=!secShow">
					<div class="iconBox boshiIcon fl"></div>
					<div class="title fl">
						<p>{{$t("Common.ACADEMICINFORMATION")}}</p>
						<div class="tips">{{$t("Common.ACADEMICINFORMATIONTips")}}</div>
					</div>
					<div class="spreadBox fr" :class="{hide:!basicFinished}">
						<a href="javascript:void(0)" :class="{'close':secShow,'open':!secShow}">{{ secShow?$t("Close"):$t("Open")}}</a>
					</div>
				</div>
				<div class="infoBox" v-show="secShow">
					<div class="examineTypeBox studyInfoTypeBox clearfix">
						<div class="infoList" v-for="(item,index) in xxStudyInfoType" :key="'exam_'+index" @click.prevent.stop="addStudyInfo(item)">
							<div class="typeIcon" :class="item.remarks"></div>
							<div class="typeName">{{isEn?item.value:item.label}}</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
					</div>
					<Form ref="secStepForm" inline :label-width="150">
						<div class="examineBox studyInfoBox clearfix" v-scrollto="item" v-for="(item,index) in xxStudyinfoList" :key="'study_'+index">
							<div class="deleteBox" @click.stop.prevent="deleteStudyInfo(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon" :class="item.type"></div>
								<div class="typeName">{{$t('XxStudyinfo.'+item.type)}}</div>
							</div>
							<add-school-item :xx-study-info-level="xxStudyInfoLevel" :item="item" :is-en="isEn" :country-list="cityTree.country" :get-area-list-data="getAreaListData" :find-by-id="findById"></add-school-item>
						</div>
					</Form>
					<div class="btnBox" :class="{hide:!xxStudyinfoList.length}">
						<Button type="primary" @click="secStepInfoSave">{{$t("SaveAndNext")}}</Button>
					</div>
				</div>
			</div>
			<div :id="'step-'+3" ref="thirdStep" class="stepInfoList thirdStep">
				<div class="headerInfo clearfix" @click="thirdShow=!thirdShow">
					<div class="iconBox testIcon fl"></div>
					<div class="title fl">
						<p>{{$t("Common.STANDARDIZEDTESTS")}}</p>
						<div class="tips">{{$t("Common.STANDARDIZEDTESTSTips")}}</div>
					</div>
					<div class="spreadBox fr" :class="{hide:!basicFinished}">
						<a href="javascript:void(0)" :class="{'close':thirdShow,'open':!thirdShow}">{{ thirdShow?$t("Close"):$t("Open")}}</a>
					</div>
				</div>
				<div class="infoBox" v-show="thirdShow">
					<div class="examineTypeBox clearfix" v-if="isHigh">
						<div class="infoList" @click.prevent.stop="addTOEFLJunior">
							<div class="typeIcon TOEFLJunior"></div>
							<div class="typeName">TOEFLJunior</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addTOEFL">
							<div class="typeIcon TOEFL"></div>
							<div class="typeName">TOEFL</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addSSAT">
							<div class="typeIcon SSAT"></div>
							<div class="typeName">SSAT</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addElse">
							<div class="typeIcon others"></div>
							<div class="typeName">Other</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>

					</div>
					<div v-else class="examineTypeBox clearfix">
						<div class="infoList" @click.prevent.stop="addTOEFL">
							<div class="typeIcon TOEFL"></div>
							<div class="typeName">TOEFL</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addIELTS">
							<div class="typeIcon IELTS"></div>
							<div class="typeName">IELTS</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addSAT" :class="{hide:!isUnder}">
							<div class="typeIcon SAT"></div>
							<div class="typeName">SAT</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addACT" :class="{hide:!isUnder}">
							<div class="typeIcon ACT"></div>
							<div class="typeName">ACT</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addGRE" :class="{hide:isUnder}">
							<div class="typeIcon GRE"></div>
							<div class="typeName">GRE</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addGMAT" :class="{hide:isUnder}">
							<div class="typeIcon GMAT"></div>
							<div class="typeName">GMAT</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addLSAT" :class="{hide:isUnder}">
							<div class="typeIcon LSAT"></div>
							<div class="typeName">LSAT</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addSATII" :class="{hide:!isUnder}">
							<div class="typeIcon SATII"></div>
							<div class="typeName">SAT II</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addAP" :class="{hide:!isUnder}">
							<div class="typeIcon AP"></div>
							<div class="typeName">AP</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addElse">
							<div class="typeIcon others"></div>
							<div class="typeName">Other</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
					</div>
					<Form ref="examineForm" :label-width="100" inline style="padding-left:60px;">
						<!-- 托福 -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxTOEFLList" :key="'tf_'+index">
							<div class="deleteBox" @click="deleteTOEFL(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon TOEFL"></div>
								<div class="typeName">TOEFL</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'tf2_'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- 托福Junior -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxTOEFLJuniorList" :key="'jun_'+index">
							<div class="deleteBox" @click="deleteTOEFLJunior(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon TOEFLJunior"></div>
								<div class="typeName">TOEFLJunior</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'jun2_'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- 雅思 -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxIELTSList" :key="'ya_'+index">
							<div class="deleteBox" @click="deleteIELTS(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon IELTS"></div>
								<div class="typeName">IELTS</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'ya2_'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- SAT -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxSATList" :key="'sat_'+index">
							<div class="deleteBox" @click="deleteSAT(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon SAT"></div>
								<div class="typeName">SAT</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'sat__'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- ACT -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxACTList" :key="'act_'+index">
							<div class="deleteBox" @click="deleteACT(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon ACT"></div>
								<div class="typeName">ACT</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'act__'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- GRE -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxGREList" :key="'gre_'+index">
							<div class="deleteBox" @click="deleteGRE(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon GRE"></div>
								<div class="typeName">GRE</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'gre__'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- GMAT -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxGMATList" :key="'gmat_'+index">
							<div class="deleteBox" @click="deleteGMAT(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon GMAT"></div>
								<div class="typeName">GMAT</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'gmat__'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- LSAT -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxLSATList" :key="'lsat_'+index">
							<div class="deleteBox" @click="deleteLSAT(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon LSAT"></div>
								<div class="typeName">LSAT</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
							</div>
						</div>
						<!-- SATII -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxSATIIList" :key="'satii_'+index">
							<div class="deleteBox" @click="deleteSATII(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon SATII"></div>
								<div class="typeName">SAT II</div>
							</div>
							<div class="testDetail">
								<Form-item label="Subject">
									<Input v-model="item.subject" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- AP -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxAPList" :key="'ap_'+index">
							<div class="deleteBox" @click="deleteAP(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon AP"></div>
								<div class="typeName">AP</div>
							</div>
							<div class="testDetail">
								<Form-item label="Subject">
									<Input v-model="item.subject" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- ssat -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxSSATList" :key="'ssat_'+index">
							<div class="deleteBox" @click="deleteSSAT(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon SSAT"></div>
								<div class="typeName">SSAT</div>
								<div class="expectFlag">
									<Checkbox v-model="item.expectFlag">{{$t("XxExamScore.expectFlag")}}</Checkbox>
								</div>
							</div>
							<div class="testDetail">
								<Form-item label="Level">
									<Select v-model="item.level" style="width:200px">
										<Option v-for="(item,index) in xxInnerinfoCountry" :key="'ssat__'+index" :value="item.value">{{item.label}}</Option>
									</Select>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
								<Form-item v-for="(examScore,index) in item.xxExamScoreList" :key="'ssat___'+index" :label="examScore.label">
									<Input v-model="examScore.score" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
						<!-- 其他考试 -->
						<div class="examineBox clearfix" v-scrollto="item" v-for="(item,index) in xxOthersExamList" :key="'ot_'+index">
							<div class="deleteBox" @click="deleteOthers(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon others"></div>
								<div class="typeName">Others</div>
							</div>
							<div class="testDetail">
								<Form-item label="Test Name">
									<Input v-model="item.testName" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Subject">
									<Input v-model="item.subject" style="width:200px"></Input>
								</Form-item>
								<Form-item label="Date">
									<Date-picker v-model="item.examTime" style="width:200px"></Date-picker>
								</Form-item>
								<Form-item label="Total Score">
									<Input v-model="item.totalScore" style="width:200px"></Input>
								</Form-item>
							</div>
						</div>
					</Form>
					<div class="btnBox" :class="{hide:!xxTOEFLList.length&&!xxIELTSList.length&&!xxSATList.length&&!xxACTList.length&&!xxGREList.length&&!xxGMATList.length&&!xxLSATList.length&&!xxSATIIList.length&&!xxAPList.length&&!xxSSATList.length&&!xxTOEFLJuniorList.length&&!xxOthersExamList.length}">
						<Button type="primary" @click="thirdStepInfoSave">{{$t("SaveAndNext")}}</Button>
					</div>
				</div>
			</div>
			<div :id="'step-'+4" ref="fourStep" class="stepInfoList fourStep">
				<div class="headerInfo clearfix" @click="fourShow=!fourShow">
					<div class="iconBox acitivityIcon fl"></div>
					<div class="title fl">
						<p>{{$t("Common.EXTRACURRICULARACTIVITIES")}}</p>
						<div class="tips">{{$t("Common.EXTRACURRICULARACTIVITIESTips")}}</div>
					</div>
					<div class="spreadBox fr" :class="{hide:!basicFinished}">
						<a href="javascript:void(0)" :class="{'close':fourShow,'open':!fourShow}">{{ fourShow?$t("Close"):$t("Open")}}</a>
					</div>
				</div>
				<div class="infoBox" v-show="fourShow">
					<div class="examineTypeBox clearfix">
						<div class="infoList" @click.prevent.stop="addHonour">
							<div class="typeIcon honour"></div>
							<div class="typeName">{{$t('XxSkillinfo.honors')}}</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addExtraActivities">
							<div class="typeIcon kewai"></div>
							<div class="typeName">{{$t('XxSkillinfo.extraActivities')}}</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addInterExperience">
							<div class="typeIcon shixi"></div>
							<div class="typeName">{{$t('XxSkillinfo.interExperience')}}</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addResearchExperience">
							<div class="typeIcon yanjiu"></div>
							<div class="typeName">{{$t('XxSkillinfo.researchExperience')}}</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
						<div class="infoList" @click.prevent.stop="addSkillsHobbies">
							<div class="typeIcon jineng"></div>
							<div class="typeName">{{$t('XxSkillinfo.skillsHobbies')}}</div>
							<div class="addMask">
								<Icon type="android-add"></Icon>
							</div>
						</div>
					</div>
					<Form ref="fourStepForm" inline label-position="top" style="padding-left:60px;">
						<div class="examineBox skillBox clearfix" v-scrollto="item" v-for="(item,index) in honorsList" :key="'f1_'+index">
							<div class="deleteBox" @click="deleteHonour(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon honour"></div>
								<div class="typeName">{{$t('XxSkillinfo.honors')}}</div>
							</div>
							<div class="testDetail">
								<Input type="textarea" v-model="item.content" :autosize="{minRows:3,maxRows:8}"></Input>
							</div>
						</div>
						<div class="examineBox skillBox clearfix" v-scrollto="item" v-for="(item,index) in extraActivitiesList" :key="'f12_'+index">
							<div class="deleteBox" @click="deleteExtraActivities(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon kewai"></div>
								<div class="typeName">{{$t('XxSkillinfo.extraActivities')}}</div>
							</div>
							<div class="testDetail">
								<Input type="textarea" v-model="item.content" :autosize="{minRows:3,maxRows:8}"></Input>
							</div>
						</div>
						<div class="examineBox skillBox clearfix" v-scrollto="item" v-for="(item,index) in interExperienceList" :key="'f13_'+index">
							<div class="deleteBox" @click="deleteInterExperience(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon shixi"></div>
								<div class="typeName">{{$t('XxSkillinfo.interExperience')}}</div>
							</div>
							<div class="testDetail">
								<Input type="textarea" v-model="item.content" :autosize="{minRows:3,maxRows:8}"></Input>
							</div>
						</div>
						<div class="examineBox skillBox clearfix" v-scrollto="item" v-for="(item,index) in researchExperienceList" :key="'f14_'+index">
							<div class="deleteBox" @click="deleteResearchExperience(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon yanjiu"></div>
								<div class="typeName">{{$t('XxSkillinfo.researchExperience')}}</div>
							</div>
							<div class="testDetail">
								<Input type="textarea" v-model="item.content" :autosize="{minRows:3,maxRows:8}"></Input>
							</div>
						</div>
						<div class="examineBox skillBox clearfix" v-scrollto="item" v-for="(item,index) in skillsHobbiesList" :key="'f15_'+index">
							<div class="deleteBox" @click="deleteSkillsHobbies(index)">
								<Icon type="close-round"></Icon>
							</div>
							<div class="testTitle">
								<div class="typeIcon jineng"></div>
								<div class="typeName">{{$t('XxSkillinfo.skillsHobbies')}}</div>
							</div>
							<div class="testDetail">
								<Input type="textarea" v-model="item.content" :autosize="{minRows:3,maxRows:8}"></Input>
							</div>
						</div>
					</Form>
					<div class="btnBox" :class="{hide:!honorsList.length&&!extraActivitiesList.length&&!interExperienceList.length&&!researchExperienceList.length&&!skillsHobbiesList.length}">
						<Button type="primary" @click="fourStepInfoSave">{{$t("SaveAndNext")}}</Button>
					</div>
				</div>
			</div>
			<div :id="'step-'+5" ref="fiveStep" class="stepInfoList fiveStep">
				<!-- <div class="complete"></div> -->
				<div class="headerInfo clearfix" @click="fiveShow=!fiveShow">
					<div class="iconBox schoolIcon fl"></div>
					<div class="title fl">
						<p>{{$t("Common.SCHOOLSEARCH")}}</p>
						<div class="tips">{{$t("Common.SCHOOLSEARCHTips")}}</div>
					</div>
					<div class="spreadBox fr" :class="{hide:!basicFinished}">
						<a href="javascript:void(0)" :class="{'close':fiveShow,'open':!fiveShow}">{{ fiveShow?$t("Close"):$t("Open")}}</a>
					</div>
				</div>
				<div class="infoBox" v-show="fiveShow">
					<Form ref="fourStepForm" :model="xxApplyobject" label-position="top" style="padding-left:60px;">
						<Form-item :label="$t('XxApplyobject.intendedMajor')">
							<Input type="textarea" v-model="xxApplyobject.intendedMajor" style="width:600px"></Input>
						</Form-item>
						<Form-item :label="$t('XxApplyobject.preliminarySchool')">
							<Input type="textarea" v-model="xxApplyobject.preliminarySchool" style="width:600px"></Input>
						</Form-item>
						<!-- <Form-item :label="$t('XxApplyobject.schoolPreference')">
                            <Input type="textarea" v-model="xxApplyobject.schoolPreference" style="width:600px"></Input>
                        </Form-item> -->
						<Form-item :label="$t('XxApplyobject.hardestAdvantageous')">
							<Input type="textarea" v-model="xxApplyobject.hardestAdvantageous" style="width:600px"></Input>
						</Form-item>
						<Form-item :label="$t('XxApplyobject.help')">
							<Input type="textarea" v-model="xxApplyobject.help" style="width:600px"></Input>
						</Form-item>
						<Form-item :label="$t('XxApplyobject.otherQuestion')">
							<Input type="textarea" v-model="xxApplyobject.otherQuestion" style="width:600px"></Input>
						</Form-item>
					</Form>
					<div class="btnBox">
						<Button type="primary" @click="fiveStepInfoSave">{{$t('Save')}}</Button>
					</div>
				</div>
			</div>
		</div>
		<div class="scrolltop" v-show="showScroll" title="top" @click="scrollTop"></div>
	</div>
</template>
<script>
	import util from '../../spoc-choiceschool-web/src/libs/js/util.js';
	import nozzle from "../../spoc-choiceschool-web/src/libs/interface.js";
	//import MenuBar from '../../spoc-choiceschool-web/src/modules/breadcrumb/menuBar';
	import addSchoolItem from '../../spoc-choiceschool-web/src/views/student/addSchoolItem';
	import { mapMutations, mapState } from 'vuex';
	import { MENUIDS } from "@public/libs/config.js";

	const firstpleaeTip = '请先完善基本信息';
	const mailreg = [{
		required: true,
		type: 'email',
		message: '邮箱格式不正确',
		trigger: 'blur'
	}];
	const numberreg = [{
		required: true,
		type: 'string',
		message: '请输入正确的手机号',
		trigger: 'blur'
	}]
	const mailregnoreq = [{
		type: 'email',
		message: '邮箱格式不正确',
		trigger: 'blur'
	}];
	const numberregnoreq = [{
		type: 'string',
		message: '请输入正确的手机号',
		trigger: 'blur'
	}]
	const req = [{
		required: true,
		type: 'string',
		message: '此项为必填',
		trigger: 'blur'
	}];
	const requ = '此项为必填';
	export default {
		props: {
			menuCode: {
				type: String,
				required: true
			}
		},
		data() {
			const isPlan = this.menuCode == MENUIDS.PLAN;
			const isPlanMust = isPlan ? [] : [{
				required: true,
				message: requ,
				trigger: 'blur'
			}];
			return {
				isEn: document.cookie.indexOf('lang=en') > 0,
				showScroll: false,
				studentId: "", //学生id
				chineseUser: "", //中方用户
				stepHeadList: [], //步骤列表
				basicFinished: true, //基础部分是否完成
				basicShow: true,
				firstShow: false,
				secShow: false,
				thirdShow: false,
				fourShow: false,
				fiveShow: false,
				userTypeList: [],
				gradeTypeList: [], // 就读年级
				applyTypeList: [], // 申请类别
				xxStudyInfoType: [],
				xxStudyInfoLevel: [],
				xxInnerinfoCountry: [],
				cityTree: {
					country: [],
					province: [],
					city: [],
					flag1: true,
					flag2: true,
					flag3: true,
				},
				xxStudent: { //基本信息
					id: "",
					firstName: "",
					lastName: "",
					firstNamePinYin: "",
					lastNamePinYin: "",
					enName: "",
					gender: "",
					skypeId: "",
					email: "",
					cellNumber: "",
					phone: '',
					parentContactNumber: "",
					address: "",
					postcode: "",
					applyTime: '',
					grade: "",
					apply: "",
					amount: "",
					freeAmount: '',
					moneyAmount: '',
					wechat: '',
					country: '',
					province: '',
					city: '',
					fatherName: '',
					fatherJob: '',
					fatherPhone: '',
					fatherEmail: '',
					fatherWechat: '',
					motherName: '',
					motherJob: '',
					motherPhone: '',
					motherEmail: '',
					motherWechat: '',
					menuId: this.menuCode
				},
				xxInnerinfo: { //内部信息
					id: "",
					isNewRecord: false,
					refundRatio: "",
					rank: "",
					type: "",
					saler: "",
					studentCharacter: "",
					parentCharacter: "",
					studentId: "",
					teacherSale: '',
					teacherPlan: '',
					teacherFlow: '',
					teacherEssay: '',
					teacherApply: '',
					teacherLanguage: '',
					teacherOther: ''
				},
				xxInnerinfoRule: { // 规划模块部分字段不必填 http://project.ivygate.cn:10081/zentao/bug-view-461.html
					type: [{
						required: true,
						message: '客户类型必选',
						trigger: 'blur'
					}],
					teacherSale: [{
						required: true,
						message: requ,
						trigger: 'blur'
					}],
					teacherPlan: [{
						required: true,
						message: requ,
						trigger: 'blur'
					}],
					teacherFlow: isPlanMust,
					teacherEssay: isPlanMust,
					teacherApply: isPlanMust,
					teacherLanguage: isPlanMust,
				},
				xxStudyinfoList: [], //学习经历
				xxTOEFLList: [], //托福考试
				TOTFLInfo: {
					type: 101, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "Reading",
							examId: "",
							score: ""
						},
						{
							label: "Speaking",
							examId: "",
							score: ""
						},
						{
							label: "Listening",
							examId: "",
							score: ""
						},
						{
							label: "Writing",
							examId: "",
							score: ""
						}
					]
				},
				xxIELTSList: [], //雅思
				IELTSInfo: {
					type: 102, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT；1023：SSAT； 1024：TOEFL Junior）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "Reading",
							examId: "",
							score: ""
						},
						{
							label: "Speaking",
							examId: "",
							score: ""
						},
						{
							label: "Listening",
							examId: "",
							score: ""
						},
						{
							label: "Writing",
							examId: "",
							score: ""
						}
					]
				},
				xxSATList: [], //SAT
				SATInfo: {
					type: 104, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "EBR+Grammer",
							examId: "",
							score: ""
						},
						{
							label: "Math",
							examId: "",
							score: ""
						},
						{
							label: "Essay",
							examId: "",
							score: ""
						}
					]
				},
				xxACTList: [], //ACT
				ACTInfo: {
					type: 103, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "Reading",
							examId: "",
							score: ""
						},
						{
							label: "English",
							examId: "",
							score: ""
						},
						{
							label: "Science",
							examId: "",
							score: ""
						},
						{
							label: "Math",
							examId: "",
							score: ""
						},
						{
							label: "Writting",
							examId: "",
							score: ""
						}
					]
				},
				xxGREList: [], //GRE
				GREInfo: {
					type: 107, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "Verbal",
							examId: "",
							score: ""
						},
						{
							label: "Quantitative",
							examId: "",
							score: ""
						},
						{
							label: "AW",
							examId: "",
							score: ""
						}
					]
				},
				xxGMATList: [], //GMAT
				GMATInfo: {
					type: 108, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "Verbal",
							examId: "",
							score: ""
						},
						{
							label: "Quantitative",
							examId: "",
							score: ""
						},
						{
							label: "AWA",
							examId: "",
							score: ""
						},
						{
							label: "IR",
							examId: "",
							score: ""
						}
					]
				},
				xxLSATList: [], //LSAT
				LSATInfo: {
					type: 109, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 
					examTime: "", //考试时间 
				},
				xxSATIIList: [],
				SATIIInfo: {
					type: 105, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					edited: false,
					subject: "", //考试名称
					totalScore: "", //总成绩 
					examTime: "", //考试时间 
				},
				xxAPList: [],
				APInfo: {
					type: 106, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					edited: false,
					subject: "", //考试名称
					totalScore: "", //总成绩 
					examTime: "", //考试时间 
				},

				xxSSATList: [],
				SSATInfo: {
					type: 1023, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "Percentitle",
							examId: "",
							score: ""

						},
						{
							label: "Gender percentitle",
							examId: "",
							score: ""
						},
						{
							label: "Reading",
							examId: "",
							score: ""
						},
						{
							label: "Reading Percentile",
							examId: "",
							score: ""
						},
						{
							label: "Reading Gender Percentile",
							examId: "",
							score: ""
						},
						{
							label: "Verbal",
							examId: "",
							score: ""
						},
						{
							label: "Verbal Percentile",
							examId: "",
							score: ""
						},
						{
							label: "Verbal Gender Percentile",
							examId: "",
							score: ""
						},
						{
							label: "Math",
							examId: "",
							score: ""
						},
						{
							label: "Math Percentile",
							examId: "",
							score: ""
						},
						{
							label: "Math Gender Percentile",
							examId: "",
							score: ""
						},
						{
							label: "Essay",
							examId: "",
							score: ""
						},
					]
				},
				xxTOEFLJuniorList: [],
				TOEFLJuniorInfo: {
					type: 1024, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					expectFlag: false,
					edited: false,
					totalScore: "", //总成绩 ,
					examTime: "", //考试时间 ,
					xxExamScoreList: [ //考试成绩列表
						{
							label: "Listening",
							examId: "",
							score: ""
						},
						{
							label: "Verbal",
							examId: "",
							score: ""
						},
						{
							label: "Reading",
							examId: "",
							score: ""
						},
					]
				},

				xxOthersExamList: [], //其他考试
				OthersInfo: {
					type: 100, //考试类型（101：TOEFL；102：IELTS；103：ACT；104：SAT；105：SAT2；106：AP；107：GRE；108：GMAT；:109：LSAT）
					edited: false,
					testName: "", //考试名称
					subject: "", //考试名称
					totalScore: "", //总成绩 
					examTime: "", //考试时间 
				},
				honorsList: [],
				extraActivitiesList: [],
				interExperienceList: [],
				researchExperienceList: [],
				skillsHobbiesList: [],
				xxApplyobject: {
					id: "",
					intendedMajor: "",
					preliminarySchool: "",
					schoolPreference: "",
					hardestAdvantageous: "",
					help: "",
					otherQuestion: "",
					studentId: ""
				},
				basicFormValidate: {
					firstName: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							type: 'string',
							pattern: /^[\u4e00-\u9fa5·.\w\-]{1,120}$/,
							message: '须输入汉字、字母、连字符等,长度不大于120',
							trigger: 'blur'
						}
					],
					lastName: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							type: 'string',
							pattern: /^[\u4e00-\u9fa5·.\w\-]{1,120}$/,
							message: '须输入汉字、字母、连字符等,长度不大于120',
							trigger: 'blur'
						}
					],
					firstNamePinYin: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							type: 'string',
							pattern: /^[\u4e00-\u9fa5·.\w\-]{1,120}$/,
							message: '须输入拼音字母长度不大于120',
							trigger: 'blur'
						}
					],
					lastNamePinYin: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							type: 'string',
							pattern: /^[\u4e00-\u9fa5·.\w\-]{1,120}$/,
							message: '须输入拼音字母长度不大于120',
							trigger: 'blur'
						}
					],
					enName: [{
						type: 'string',
						pattern: /^[·.\w\-\s]{1,120}$/,
						message: '须输入英文、连字符,长度不大于120',
						trigger: 'blur'
					}],
					gender: [{
						required: true,
						message: requ,
						trigger: 'change'
					}],
					skypeId: [{
						required: true,
						message: requ,
						trigger: 'blur'
					}],
					email: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '邮箱格式不正确',
							trigger: 'blur'
						}
					],
					cellNumber: [{
						required: true,
						message: requ,
						trigger: 'blur'
					}, ],
					parentContactNumber: [{
						required: true,
						message: requ,
						trigger: 'blur'
					}, ],
					address: [{
						required: true,
						message: requ,
						trigger: 'blur'
					}],
					postcode: [{
						required: true,
						message: requ,
						trigger: 'blur'
					}],
					country: [{
						required: true,
						message: requ,
						trigger: 'change'
					}],
					province: [{
						required: true,
						message: requ,
						trigger: 'change'
					}],
					city: [{
						required: true,
						message: requ,
						trigger: 'change'
					}],
					applyTime: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							type: 'string',
							pattern: /^20\d{2}\/[a-zA-Z]{1,9}$/,
							message: '格式需为2019/F',
							trigger: 'blur'
						}
					],
					grade: [{
						required: true,
						message: requ,
						trigger: 'change'
					}],
					apply: [{
						required: true,
						message: requ,
						trigger: 'change'
					}],
					wechat: [{
						required: true,
						message: '微信号是必填项',
						trigger: 'blur'
					}],
					amount: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							pattern: /^[1-9](\d*)$/,
							message: '请填写正整数',
							trigger: 'blur'
						}
					],
					freeAmount: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							pattern: /^\d+$/,
							message: '请填写正整数',
							trigger: 'blur'
						}
					],
					moneyAmount: [{
							required: true,
							message: requ,
							trigger: 'blur'
						},
						{
							pattern: /^\d+$/,
							message: '请填写正整数',
							trigger: 'blur'
						}
					],
					fatherEmail: mailreg,
					motherEmail: mailregnoreq,
					fatherPhone: numberreg,
					motherPhone: numberregnoreq,
					fatherName: req,
					fatherJob: req,
					fatherWechat: req,
				}
			}
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			inRoleArray(id) {
				return this.roleIds.indexOf(id) > -1;
			},
			onScroll() {
				let parentNode = this.$el.parentNode;
				if(!parentNode) {
					return;
				}
				var scrolled = parentNode.scrollTop;
				if(scrolled >= 500) {
					this.showScroll = true;
				} else {
					this.showScroll = false;
				}
			},
			scrollTop() { //返回顶部
				var parentNode = this.$el.parentNode;
				if(!parentNode) {
					return;
				}
				var distance = parentNode.scrollTop;
				var step = distance / 50;
				(function smoothUp() {
					if(distance > 0) {
						distance -= step;
						parentNode.scrollTop = distance;
						setTimeout(smoothUp, 10); // 设定每一次跳动的时间间隔为10ms
					} else {
						parentNode.scrollTop = 0; // 限制滚动停止时的距离
					}
				})();
			},
			scrollToIndex(selector) { //锚点跳转
				var total = this.$el.querySelector(selector).offsetTop;
				var parentNode = this.$el.parentNode;
				var distance = parentNode.scrollTop;
				var step = total / 50;
				(function smoothDown() {
					if(distance < total) {
						distance += step;
						parentNode.scrollTop = distance;
						setTimeout(smoothDown, 10); // 设定每一次跳动的时间间隔为10ms
					} else {
						parentNode.scrollTop = total; // 限制滚动停止时的距离
					}
				})();
			},
			getStudentInfo(_data) { //获取学生信息
				var _this = this;
				this.updateLoadingStatus({
					isLoading: true
				});
				util.ajax.get(nozzle.xxStudent.form, {
					params: _data
				}).then(function(res) {
					util.checkAjaxJson(res).thenSuccess(function(json) {
						if(json.data.country) {
							_this.initCountryCity(json.data.country, json.data.province, json.data.city);
						}
						for(let item in json.data) {
							if(item in _this.xxStudent) {
								if(typeof json.data[item] != 'undefined') {
									_this.xxStudent[item] = json.data[item] ? typeof json.data[item]=="number"? json.data[item].toString():json.data[item] : typeof json.data[item]=="number"? json.data[item].toString() : '';
								} else {
									_this.xxStudent[item] = json.data[item];
								}
							}
						}
						for(let item in json.data.xxInnerinfo) {
							if(item in _this.xxInnerinfo) {
								if(json.data.xxInnerinfo[item] && !isNaN(json.data.xxInnerinfo[item])) {
									_this.xxInnerinfo[item] = json.data.xxInnerinfo[item].toString();
								} else {
									_this.xxInnerinfo[item] = json.data.xxInnerinfo[item];
								}
							}
						}
						_this.xxStudyinfoList = json.data.xxStudyinfoList.map(item => {
							item.country = item.country.toString();
							item.province = item.province.toString();
							item.city = item.city.toString();
							return item;
						}); //学习经历
						//考试经历
						var xxEaxminfoList = json.data.xxEaxminfoList;
						for(var i = 0; i < xxEaxminfoList.length; i++) {
							switch(xxEaxminfoList[i].type) {
								case "101":
									_this.xxTOEFLList.push(xxEaxminfoList[i]);
									break;
								case "102":
									_this.xxIELTSList.push(xxEaxminfoList[i]);
									break;
								case "103":
									_this.xxACTList.push(xxEaxminfoList[i]);
									break;
								case "104":
									_this.xxSATList.push(xxEaxminfoList[i]);
									break;
								case "105":
									_this.xxSATIIList.push(xxEaxminfoList[i]);
									break;
								case "106":
									_this.xxAPList.push(xxEaxminfoList[i]);
									break;
								case "107":
									_this.xxGREList.push(xxEaxminfoList[i]);
									break;
								case "108":
									_this.xxGMATList.push(xxEaxminfoList[i]);
									break;
								case "109":
									_this.xxLSATList.push(xxEaxminfoList[i]);
									break;
								case "1023":
									_this.xxSSATList.push(xxEaxminfoList[i]);
									break;
								case "1024":
									_this.xxTOEFLJuniorList.push(xxEaxminfoList[i]);
									break;
								default:
									_this.xxOthersExamList.push(xxEaxminfoList[i]);
									break;
							}
						}
						var xxSkillinfoList = json.data.xxSkillinfoList;
						for(var i = 0; i < xxSkillinfoList.length; i++) {
							switch(xxSkillinfoList[i].type) {
								case "1":
									_this.honorsList.push(xxSkillinfoList[i]);
									break;
								case "2":
									_this.extraActivitiesList.push(xxSkillinfoList[i]);
									break;
								case "3":
									_this.interExperienceList.push(xxSkillinfoList[i]);
									break;
								case "4":
									_this.researchExperienceList.push(xxSkillinfoList[i]);
									break;
								case "5":
									_this.skillsHobbiesList.push(xxSkillinfoList[i]);
									break;
							}
						}
						for(var item in json.data.xxApplyobject) { //申请信息
							if(json.data.xxApplyobject[item] && !isNaN(json.data.xxApplyobject[item])) {
								_this.xxApplyobject[item] = json.data.xxApplyobject[item].toString();
							} else {
								_this.xxApplyobject[item] = json.data.xxApplyobject[item];
							}
						}
					}).autoRun("login", "error");
					_this.updateLoadingStatus({
						isLoading: false
					});
				}).catch(function(error) {
					_this.updateLoadingStatus({
						isLoading: false
					});
					util.checkAjaxError(error);
				});
			},
			getCountryInfo(cid) {
				console.warn(cid);
			},
			start() { //开始
				this.firstShow = false;
				this.secShow = false;
				this.thirdShow = false;
				this.fourShow = false;
				this.fiveShow = false;
			},
			addStudyInfo(item) {
				this.xxStudyinfoList.push({
					type: item.value,
					typeItem: item,
					edited: false,
				});
			},
			initCountryCity(country, province, city) {
				this.onCountryChange(country, () => {
					this.onProvinceChange(province);
				});
			},
			onCountryChange(id, cb) {
				this.cityTree.province = [];
				this.cityTree.city = [];
				this.xxStudent.province = '';
				this.xxStudent.city = '';
				this.getAreaListData(id, data => {
					if(data.data.length) {
						this.cityTree.province = data.data;
					} else {
						const item = this.findById(this.cityTree.country, id);
						if(item) {
							const itemarr = [Object.assign({}, item, {
								id: '-1'
							})];
							this.cityTree.province = itemarr;
							this.cityTree.city = itemarr;
							this.xxStudent.province = '-1';
							this.xxStudent.city = '-1';
							setTimeout(() => {
								this.$refs.basicStepForm.validateField('province');
								this.$refs.basicStepForm.validateField('city');
							}, 50);
						}
					}
					cb && cb();
					// fix iview bug
					this.cityTree.flag2 = false;
					this.$nextTick(() => {
						this.cityTree.flag2 = true;
					});
				});
			},
			onProvinceChange(id, cb) {
				this.city = '';
				this.cityTree.city = [];
				if(!id) {
					return;
				}
				this.getAreaListData(id, data => {
					if(data.data.length) {
						this.cityTree.city = data.data;
					} else {
						const item = this.findById(this.cityTree.province, id);
						this.cityTree.city = [Object.assign({}, item, {
							id: '-1'
						})];
						this.xxStudent.city = '-1';
						setTimeout(() => {
							this.$refs.basicStepForm.validateField('city');
						}, 50);
					}
					cb && cb();
					// fix iview bug
					this.cityTree.flag3 = false;
					this.$nextTick(() => {
						this.cityTree.flag3 = true;
					});
				});
			},
			getAreaListData(id, cb) {
				const data = {
					params: {
						id
					}
				};
				util.ajax.get(nozzle.basicData.listLocation, data).then(res => {
					util.checkAjaxJson(res).thenSuccess(json => {
						cb(json);
					}).autoRun("login", "error");
				}).catch(error => {
					console.error(error);
					util.checkAjaxError(error);
				});
			},
			changeApply() { //改变申请级别
				if(this.isUnder) { //本科新生,本科转学
					this.xxGREList = [];
					this.xxGMATList = [];
					this.xxLSATList = [];
				} else {
					this.xxSATList = [];
					this.xxACTList = [];
					this.xxSATIIList = [];
					this.xxAPList = [];
				}
			},
			basicInfoSave(name) { //保存基本信息
				this.$refs[name].validate((valid) => {
					if(valid) {
						var _this = this;
						this.updateLoadingStatus({
							isLoading: true
						});
						this.xxStudent.id = this.studentId;
						util.ajax.post(nozzle.xxStudent.save, this.xxStudent).then(function(res) {
							util.checkAjaxJson(res).thenSuccess(function(json) {
								_this.basicFinished = true;
								if(_this.chineseUser) {
									_this.firstShow = true;
								} else {
									_this.secShow = true;
								}
								_this.studentId = json.data;
								_this.$Message.success('保存成功!');
							}).autoRun("login", "error");
							_this.updateLoadingStatus({
								isLoading: false
							});
						}).catch(function(error) {
							_this.updateLoadingStatus({
								isLoading: false
							});
							util.checkAjaxError(error);
						});
					}
				})
			},
			firstStepInfoSave() { //保存内部信息
				if(!this.studentId) {
					return this.$Message.warning(firstpleaeTip);
				}
				var _this = this;
				this.$refs.firStepForm.validate((va) => {
					if(!va) {
						return;
					}
					this.updateLoadingStatus({
						isLoading: true
					});
					this.xxInnerinfo.studentId = this.studentId;
					util.ajax.post(nozzle.xxStudent.saveXxInnerinfo, this.xxInnerinfo).then(function(res) {
						util.checkAjaxJson(res).thenSuccess(function(json) {
							_this.secShow = true;
							_this.firstShow = false;
							_this.$Message.success('保存成功!');
							_this.xxInnerinfo.id = json.data;
						}).autoRun("login", "error");
						_this.updateLoadingStatus({
							isLoading: false
						});
					}).catch(function(error) {
						_this.updateLoadingStatus({
							isLoading: false
						});
						util.checkAjaxError(error);
					});
				});

			},

			secStepInfoSave() { //保存学习经历
				if(!this.studentId) {
					return this.$Message.warning(firstpleaeTip);
				}
				var _this = this;
				this.updateLoadingStatus({
					isLoading: true
				});
				var submitData = {};
				submitData.studentId = this.studentId;
				const copyed = (JSON.parse(JSON.stringify(this.xxStudyinfoList))).map(v => {
					delete v.typeItem;
					delete v.edited;
					return v;
				});
				submitData.xxStudyinfoList = JSON.stringify(copyed);
				util.ajax.post(nozzle.xxStudent.saveXxStudyinfoList, submitData).then(function(res) {
					util.checkAjaxJson(res).thenSuccess(function(json) {
						_this.secShow = false;
						_this.thirdShow = true;
						_this.$Message.success('保存成功!');
					}).autoRun("login", "error");
					_this.updateLoadingStatus({
						isLoading: false
					});
				}).catch(function(error) {
					_this.updateLoadingStatus({
						isLoading: false
					});
					util.checkAjaxError(error);
				});
			},
			deleteStudyInfo(_index) {
				this.xxStudyinfoList.splice(_index, 1);
			},
			addTOEFL() { //添加托福
				this.xxTOEFLList.push(JSON.parse(JSON.stringify(this.TOTFLInfo)));
			},
			deleteTOEFL(_index) { //删除考试
				this.xxTOEFLList.splice(_index, 1);
			},
			addIELTS() { //添加雅思
				this.xxIELTSList.push(JSON.parse(JSON.stringify(this.IELTSInfo)));
			},
			deleteIELTS(_index) { //删除考试
				this.xxIELTSList.splice(_index, 1);
			},
			addSAT() { //添加SAT
				this.xxSATList.push(JSON.parse(JSON.stringify(this.SATInfo)));
			},
			deleteSAT(_index) { //删除考试
				this.xxSATList.splice(_index, 1);
			},
			addACT() { //添加ACT
				this.xxACTList.push(JSON.parse(JSON.stringify(this.ACTInfo)));
			},
			deleteACT(_index) { //删除考试
				this.xxACTList.splice(_index, 1);
			},
			addGRE() { //添加GRE
				this.xxGREList.push(JSON.parse(JSON.stringify(this.GREInfo)));
			},
			deleteGRE(_index) { //删除考试
				this.xxGREList.splice(_index, 1);
			},
			addGMAT() { //添加GMAT
				this.xxGMATList.push(JSON.parse(JSON.stringify(this.GMATInfo)));
			},
			deleteGMAT(_index) { //删除考试
				this.xxGMATList.splice(_index, 1);
			},
			addLSAT() { //添加LSAT
				this.xxLSATList.push(JSON.parse(JSON.stringify(this.LSATInfo)));
			},
			addSATII() {
				this.xxSATIIList.push(JSON.parse(JSON.stringify(this.SATIIInfo)));
			},
			deleteSATII(index) {
				this.xxSATIIList.splice(index, 1);
			},
			addAP() {
				this.xxAPList.push(JSON.parse(JSON.stringify(this.APInfo)));
			},
			deleteAP(index) {
				this.xxAPList.splice(index, 1);
			},
			addSSAT() {
				this.xxSSATList.push(JSON.parse(JSON.stringify(this.SSATInfo)));
			},
			deleteSSAT(index) {
				this.xxSSATList.splice(index, 1);
			},
			addTOEFLJunior() {
				this.xxTOEFLJuniorList.push(JSON.parse(JSON.stringify(this.TOEFLJuniorInfo)));
			},
			deleteTOEFLJunior(index) {
				this.xxTOEFLJuniorList.splice(index, 1);
			},
			deleteLSAT(_index) { //删除考试
				this.xxLSATList.splice(_index, 1);
			},
			addElse() { //添加其他考试
				this.xxOthersExamList.push(JSON.parse(JSON.stringify(this.OthersInfo)));
			},
			deleteOthers(_index) { //删除考试
				this.xxOthersExamList.splice(_index, 1);
			},
			thirdStepInfoSave() { //保存考试经历
				if(!this.studentId) {
					return this.$Message.warning(firstpleaeTip);
				}
				var _this = this;
				var submitData = {};
				submitData.studentId = this.studentId;
				var xxEaxminfoList = [];
				if(this.isHigh) {
					xxEaxminfoList = this.xxTOEFLList.concat(this.xxTOEFLJuniorList, this.xxOthersExamList, this.xxSSATList);
				} else if(this.isUnder) {
					xxEaxminfoList = this.xxTOEFLList.concat(this.xxIELTSList, this.xxOthersExamList, this.xxSATList, this.xxACTList, this.xxSATIIList, this.xxAPList);
				} else { //研究生、博士
					xxEaxminfoList = this.xxTOEFLList.concat(this.xxIELTSList, this.xxOthersExamList, this.xxGREList, this.xxGMATList, this.xxLSATList);
				}
				for(var i = 0; i < xxEaxminfoList.length; i++) {
					if(xxEaxminfoList[i].examTime) {
						xxEaxminfoList[i].examTime = new Date(xxEaxminfoList[i].examTime).format("yyyy-MM-dd hh:mm:ss");
					}
				}
				submitData.xxEaxminfoList = JSON.stringify(xxEaxminfoList);
				this.updateLoadingStatus({
					isLoading: true
				});
				util.ajax.post(nozzle.xxStudent.saveXxEaxminfoList, submitData).then(function(res) {
					util.checkAjaxJson(res).thenSuccess(function(json) {
						_this.thirdShow = false;
						_this.fourShow = true;
						_this.$Message.success('保存成功!');
					}).autoRun("login", "error");
					_this.updateLoadingStatus({
						isLoading: false
					});
				}).catch(function(error) {
					util.checkAjaxError(error);
					_this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			addHonour() { //添加荣誉奖项
				this.honorsList.push({
					content: "",
					type: 1,
					edited: false
				});
			},
			deleteHonour(_index) { //删除考试
				this.honorsList.splice(_index, 1);
			},
			addExtraActivities() { //添加课外活动
				this.extraActivitiesList.push({
					content: "",
					type: 2,
					edited: false
				});
			},
			deleteExtraActivities(_index) {
				this.extraActivitiesList.splice(_index, 1);
			},
			addInterExperience() { //添加实习经历
				this.interExperienceList.push({
					content: "",
					type: 3,
					edited: false
				});
			},
			deleteInterExperience(_index) {
				this.interExperienceList.splice(_index, 1);
			},
			addResearchExperience() { //添加研究经历
				this.researchExperienceList.push({
					content: "",
					type: 4,
					edited: false
				});
			},
			deleteResearchExperience(_index) {
				this.researchExperienceList.splice(_index, 1);
			},
			addSkillsHobbies() { //添加技能爱好
				this.skillsHobbiesList.push({
					content: "",
					type: 5,
					edited: false
				});
			},
			deleteSkillsHobbies(_index) {
				this.skillsHobbiesList.splice(_index, 1);
			},
			fourStepInfoSave() { //保存实践经历
				if(!this.studentId) {
					return this.$Message.warning(firstpleaeTip);
				}
				var _this = this;
				this.updateLoadingStatus({
					isLoading: true
				});
				var submitData = {};
				var xxSkillinfoList = [];
				xxSkillinfoList = this.honorsList.concat(this.extraActivitiesList, this.interExperienceList, this.researchExperienceList, this.skillsHobbiesList);
				submitData.studentId = this.studentId;
				submitData.xxSkillinfoList = JSON.stringify(xxSkillinfoList);
				util.ajax.post(nozzle.xxStudent.saveXxSkillinfoList, submitData).then(function(res) {
					util.checkAjaxJson(res).thenSuccess(function(json) {
						_this.fourShow = false;
						_this.fiveShow = true;
						_this.$Message.success('保存成功!');
					}).autoRun("login", "error");
					_this.updateLoadingStatus({
						isLoading: false
					});
				}).catch(function(error) {
					_this.updateLoadingStatus({
						isLoading: false
					});
					util.checkAjaxError(error);
				});
			},
			fiveStepInfoSave() { //保存
				if(!this.studentId) {
					return this.$Message.warning(firstpleaeTip);
				}
				var _this = this;
				this.updateLoadingStatus({
					isLoading: true
				});
				this.xxApplyobject.studentId = this.studentId;
				util.ajax.post(nozzle.xxStudent.saveXxApplyobject, this.xxApplyobject).then(function(res) {
					util.checkAjaxJson(res).thenSuccess(function(json) {
						// _this.fiveShow=false;
						// _this.$Message.success('保存成功!');
						_this.xxApplyobject.id = json.data;
						if(_this.inRoleArray('7') || _this.inRoleArray('9')) {
//							_this.$router.push({
//								name: "choiceschool.schoolApproval"
//							});
							_this.$router.go(-1);
						} else {
//							_this.$router.push({
//								name: "choiceschool.studentList"
//							});
							_this.$router.go(-1);
						}
					}).autoRun("login", "error");
					_this.updateLoadingStatus({
						isLoading: false
					});
				}).catch(function(error) {
					_this.updateLoadingStatus({
						isLoading: false
					});
					util.checkAjaxError(error);
				});
			},
			getDictList(_data, _callback) {
				var _this = this;
				this.updateLoadingStatus({
					isLoading: true
				});
				util.ajax.get(nozzle.basicData.dictListData, {
					params: _data
				}).then(function(res) {
					util.checkAjaxJson(res).thenSuccess(function(json) {
						if(typeof(_callback) == "function") {
							_callback(json.data);
						}
					}).autoRun("login", "error");
					_this.updateLoadingStatus({
						isLoading: false
					});
				}).catch(function(error) {
					_this.updateLoadingStatus({
						isLoading: false
					});
					util.checkAjaxError(error);
				});
			},
			findById(arr, id) {
				for(let i in arr) {
					const item = arr[i];
					if(item.id == id) {
						return Object.assign({}, item);
					}
				}
				return null;
			},
			searchCountry(text, cb) {
				var _this = this;
				const _data = {
					name: text,
					level: 2
				};
				util.ajax.get(nozzle.basicData.findByName, {
					params: _data
				}).then(function(res) {
					util.checkAjaxJson(res).thenSuccess(function(json) {
						cb(json);
					}).autoRun("login", "error");
				}).catch(function(error) {
					util.checkAjaxError(error);
				});
			}
		},
		watch: {

		},
		components: {
			//      'menubar':MenuBar,
			addSchoolItem
		},
		directives: {
			scrollto: {
				inserted: function(el, building) {
					if(building.value.edited == false) {
						var parentBody = el.parentNode;
						while(parentBody && parentBody.className !== "webMainBody") {
							parentBody = parentBody.parentNode;
						}
						if(parentBody.className == "webMainBody") {
							function getTop(elm) {
								var val = elm.offsetTop;
								if(elm.offsetParent) {
									return val + getTop(elm.offsetParent);
								}
								return val;
							}
							var top = getTop(el);
							parentBody.scrollTop = (top);
						}
					}
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			roleIds() {
				return this.userInfo.roleId.split(',');
			},
			isUnder() {
				return ['Undergradnew', 'Undergradtransfer'].indexOf(this.xxStudent.apply) >= 0;
			},
			isHigh() {
				return ['Highschool'].indexOf(this.xxStudent.apply) >= 0;
			}
		},
		mounted() {
			var _this = this;
			if(this.inRoleArray('8') || this.inRoleArray('9')) {
				this.chineseUser = false;
			} else {
				this.chineseUser = true;
			}
			if(this.chineseUser) {
				this.stepHeadList = [{
						label: this.$t("Common.GENERALINFORMATION")
					},
					{
						label: this.$t("Common.INNERINFORMATION")
					},
					{
						label: this.$t("Common.ACADEMICINFORMATION")
					},
					{
						label: this.$t("Common.STANDARDIZEDTESTS")
					},
					{
						label: this.$t("Common.EXTRACURRICULARACTIVITIES")
					},
					{
						label: this.$t("Common.SCHOOLSEARCH")
					}
				];
				this.getDictList({
					type: "xx_innerinfo_type"
				}, function(_data) {
					_this.userTypeList = _data;
				});
			} else {
				this.stepHeadList = [{
						label: this.$t("Common.GENERALINFORMATION")
					},
					{
						label: this.$t("Common.ACADEMICINFORMATION")
					},
					{
						label: this.$t("Common.STANDARDIZEDTESTS")
					},
					{
						label: this.$t("Common.EXTRACURRICULARACTIVITIES")
					},
					{
						label: this.$t("Common.SCHOOLSEARCH")
					}
				]
			}
			if(this.studentId) {
				//获取学生数据
				this.getStudentInfo({
					id: this.studentId
				});
			}
			this.getDictList({
				type: 'xx_student_grade'
			}, data => {
				this.gradeTypeList = data;
			});
			this.getDictList({
				type: 'xx_student_apply'
			}, data => {
				this.applyTypeList = data;
			});
			this.getDictList({
				type: 'xx_studyinfo_type'
			}, data => {
				this.xxStudyInfoType = data;
			});
			this.getDictList({
				type: 'xx_studyinfo_level'
			}, data => {
				this.xxStudyInfoLevel = data;
			});
			this.getDictList({
				type: 'xx_innerinfo_country'
			}, data => {
				this.xxInnerinfoCountry = data;
			});

			this.$nextTick(function() {
				this.$el.parentNode.addEventListener('scroll', this.onScroll)
			});
		},
		created() {
			this.studentId = this.$route.query.studentId;
			this.searchCountry('', json => {
				this.cityTree.country = json.data;
			});
		}
	}
</script>
<style scoped lang="less">
	.tipContent {
		padding: 10px 0px;
		position: relative;
		.tipInfo {
			position: absolute;
			top: 10px;
			left: 80px;
			right: 0px;
			color: #505050;
			span {
				color: #e71f1d;
			}
		}
	}
	
	.iconBox {
		width: 50px;
		height: 50px;
		background: #3b9ad1;
		background-repeat: no-repeat;
		background-position: center;
		border-radius: 4px;
	}
	
	.stepInfoList {
		.nameIcon {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_name.png");
		}
		.boshiIcon {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_boshi.png");
		}
		.testIcon {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_test.png");
		}
		.acitivityIcon {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_activity.png");
		}
		.schoolIcon {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_school.png");
		}
	}
	
	.stepInfoList:nth-child(1) .iconBox {
		background-color: #f6d987;
	}
	
	.stepInfoList:nth-child(2) .iconBox {
		background-color: #f09393;
	}
	
	.stepInfoList:nth-child(3) .iconBox {
		background-color: #7bc9c9;
	}
	
	.stepInfoList:nth-child(4) .iconBox {
		background-color: #7781be;
	}
	
	.stepInfoList:nth-child(5) .iconBox {
		background-color: #ab78b2;
	}
	
	.stepInfoList:nth-child(6) .iconBox {
		background-color: #aed08b;
	}
	
	.tipIcon {
		background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_tipInfo.png");
	}
	
	.stepContent {
		margin: 10px 0px 20px;
		background: #f7f7f7;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		padding: 15px;
		.title {
			text-align: center;
			font-size: 20px;
			line-height: 40px;
			span {
				color: #e71f1d;
			}
		}
		.progressBox {
			position: relative;
			margin-top: 10px;
			.lineBox {
				position: absolute;
				top: 22px;
				z-index: 1;
				width: 100%;
				height: 10px;
				border-radius: 10px;
				background: linear-gradient(to right, #f6d987, #f09393, #7bc9c9, #8eadd7, #ab78b2);
			}
			.stepBox {
				position: relative;
				z-index: 10;
				.stepList {
					float: left;
					width: 20%;
					.stepInfo {
						cursor: pointer;
						display: block;
						margin: 0px auto;
						width: 55px;
						height: 55px;
						text-align: center;
						line-height: 45px;
						border-width: 5px;
						border-style: solid;
						border-radius: 100%;
						font-size: 20px;
						color: #343535;
						background: #fff;
						box-sizing: border-box;
					}
					.tit {
						width: 100%;
						height: 30px;
						text-align: center;
						font-size: 12px;
						line-height: 30px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
				.stepList:nth-child(1) .stepInfo {
					border-color: #f6d987;
				}
				.stepList:nth-child(2) .stepInfo {
					border-color: #f09393;
				}
				.stepList:nth-child(3) .stepInfo {
					border-color: #7bc9c9;
				}
				.stepList:nth-child(4) .stepInfo {
					border-color: #8eadd7;
				}
				.stepList:nth-child(5) .stepInfo {
					border-color: #ab78b2;
				}
				.stepList:nth-child(6) .stepInfo {
					border-color: #aed08b;
				}
				.stepList:first-child,
				.stepList:last-child {
					width: 15%;
				}
				.stepList:nth-child(2n) {
					width: 25%;
				}
			}
		}
		.totalSixStep {
			.lineBox {
				background: linear-gradient(to right, #f6d987, #f09393, #7bc9c9, #8eadd7, #ab78b2, #aed08b);
			}
			.stepBox {
				.stepList {
					width: 16.6%;
				}
				.stepList:first-child,
				.stepList:last-child {
					width: 15%;
				}
				.stepList:nth-child(2n) {
					width: 17%;
				}
			}
		}
	}
	
	.btnBox {
		text-align: center;
		.ivu-btn {
			width: 210px;
			height: 45px;
			line-height: 33px;
			font-size: 18px;
		}
	}
	
	.mainContent {
		padding: 0px 0px 20px;
		.stepInfoList {
			position: relative;
			padding: 20px 0px;
			border-top: 1px solid #e0e0e0;
			.headerInfo {
				cursor: pointer;
				.title {
					margin-left: 10px;
					p {
						color: #343535;
						font-size: 16px;
						line-height: 30px;
					}
					.tips {
						max-width: 800px;
						height: 20px;
						color: #8c8c8c;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
				.spreadBox {
					line-height: 50px;
					a {
						font-size: 16px;
						text-decoration: underline;
					}
					.close {
						color: #f10000;
					}
					.open {
						color: #0d70b0;
					}
				}
			}
			.infoBox {
				margin-top: 20px;
				.ivu-form .ivu-form-item-label {
					color: #999899;
				}
			}
			.complete {
				position: absolute;
				width: 100px;
				height: 100px;
				top: 0px;
				background-position-y: -35px;
				right: 50px;
				opacity: 0.5;
				background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_complete.png");
				background-repeat: no-repeat;
			}
		}
		.basicStep {
			border-top: 0px;
		}
		.typeIcon {
			width: 60px;
			height: 40px;
			margin: 0px auto;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 60px;
		}
		.TOEFL {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/TOEFL.png");
		}
		.IELTS {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/IELTS.png");
		}
		.SAT {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/SAT.png");
		}
		.ACT {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/ACT.png");
		}
		.GRE {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/GRE.png");
		}
		.GMAT {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/GMAT.png");
		}
		.LSAT {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/LSAT.png");
		}
		.SSAT {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/SSAT.png");
		}
		.SATII {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/SATII.png");
		}
		.AP {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/AP.png");
		}
		.TOEFLJunior {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/TOEFLJunior.png");
		}
		.else {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/icon_add.png");
			background-size: 25px;
		}
		.others {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/others.png");
			background-size: 25px;
		}
		.Elementaryschool {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/middle.png");
			background-size: 33px;
		}
		.Highschool {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/college.png");
			background-size: 29px;
		}
		.University {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/college.png");
			background-size: 29px;
		}
		.Summerschool {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/summerSchool.png");
			background-size: 32px;
		}
		.honour {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/honour.png");
			background-size: 31px;
		}
		.kewai {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/kewai.png");
			background-size: 25px;
		}
		.shixi {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/shixi.png");
			background-size: 25px;
		}
		.yanjiu {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/yanjiu.png");
			background-size: 25px;
		}
		.jineng {
			background-image: url("../../spoc-choiceschool-web/src/assets/images/addStudent/jineng.png");
			background-size: 29px;
		}
		.typeName {
			text-align: center;
			font-size: 12px;
			margin: 0 -5px;
		}
		.examineTypeBox {
			padding-left: 60px;
			margin-bottom: 20px;
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
					background: rgba(68, 188, 183, .8);
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
		}
		.studyInfoTypeBox {
			.infoList {
				width: 100px;
				height: 100px;
				padding: 20px 10px;
				.addMask {
					line-height: 100px;
				}
			}
		}
		.examineBox {
			position: relative;
			border: 1px solid #e0e1e2;
			margin-bottom: 20px;
			transition: all ease 200ms;
			.testTitle {
				float: left;
				padding: 20px 0px 0px 20px;
				width: 135px;
				.expectFlag {
					margin-top: 10px;
					margin-left: 5px;
					text-align: center;
				}
			}
			.testDetail {
				float: left;
				width: 700px;
				min-height: 105px;
				margin-top: 20px;
				.ivu-form-item {
					width: auto;
				}
			}
			.deleteBox {
				position: absolute;
				right: 20px;
				top: 20px;
				display: none;
				color: #999;
				font-size: 16px;
				cursor: pointer;
				&:hover {
					color: #44bcb7;
				}
			}
			&:hover {
				border-color: #44bcb7;
				.deleteBox {
					display: block;
				}
			}
		}
		.studyInfoBox {
			.testTitle {
				padding: 20px 0px 0px 0px;
			}
			.testDetail {
				width: 730px;
			}
		}
		.skillBox {
			.testDetail {
				min-height: auto;
				margin-bottom: 20px;
			}
		}
		.skillInfoList {
			position: relative;
			border: 1px solid #e0e1e2;
			margin-bottom: 20px;
			padding: 20px 20px 0px 20px;
			.index {
				position: absolute;
				top: 20px;
				left: 20px;
				width: 30px;
				height: 30px;
				text-align: center;
				line-height: 28px;
				border-radius: 100%;
				background: #f0f0f0;
				border: 1px solid #e0e1e2;
			}
			.skillInfo {
				position: relative;
				padding-left: 50px;
			}
			.deleteBox {
				position: absolute;
				z-index: 2;
				right: 20px;
				top: 20px;
				display: none;
				color: #999;
				font-size: 16px;
				cursor: pointer;
				&:hover {
					color: #44bcb7;
				}
			}
			&:hover {
				border-color: #44bcb7;
				.deleteBox {
					display: block;
				}
			}
		}
	}
	
	.warningBox {
		padding: 10px 0px;
		.ivu-alert {
			font-size: 12px;
			padding-left: 20px;
			border: 1px solid #e0e0e0;
			background-color: #f7f7f7;
			border-left: 5px solid #f29b76;
			.tipTitle {
				color: #b21e23;
				.ivu-icon {
					font-size: 15px;
					font-weight: bold;
					margin-right: 5px;
				}
			}
		}
	}
	
	.scrolltop {
		position: fixed;
		cursor: pointer;
		bottom: 15px;
		right: 10px;
		width: 40px;
		height: 40px;
		border-radius: 100%;
		z-index: 10001;
		background: url("../../spoc-choiceschool-web/src/assets/images/public/scrollTop.png") no-repeat center center #e6e6e6;
		background-size: 20px;
		transition: all ease-in 200ms;
		&:hover {
			background-color: #ccc;
		}
	}
</style>