<style lang="less">
	.my_pact {
		width: 100%;
		height: 100%;
		font-size: 14px;
		.tabs {
			.ivu-tabs-tab {
				font-size: 14px;
			}
		}
		.time {
			width: 118px;
			.ivu-input {
				height: 26px;
				width: 118px;
			}
			.ivu-input-icon {
				height: 26px;
				line-height: 26px;
				font-style: normal;
				color: #44bcb7;
				font-size: 16px;
			}
		}
		.filter {
			margin-top: 10px;
			.title {
				margin: 0;
				padding: 0;
			}
		}
		.filterDw {
			.mb12 {
				margin-bottom: 12px;
			}
		}
		.filter-two {
			overflow: hidden;
			.title {
				font-size: 12px;
				width: 70px;
				text-align: right;
				margin-right: 10px;
				box-sizing: border-box;
				padding: 3px 0px;
				color: #999;
				float: left;
			}
			.filter-date {
				float: left;
			}
		}
		.main {
			width: 100%;
			min-width: 960px;
			padding: 30px 0 30px 0;
			position: relative;
			.list-info {
				width: 100%;
				position: absolute;
				font-size: 12px;
				top: -34px;
				right: 0;
				z-index: -1;
				line-height: 42px;
				text-align: right;
				.red {
					color: #FF0000;
					font-size: 16px;
				}
			}
			.page-box {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
			.noList {
				width: 100%;
				text-align: center;
				span {
					background: url(http://localhost:8080/assets/tableDataEmptyd29c8f0.png);
					padding-bottom: 50px;
					display: inline-block;
					padding-top: 160px;
					color: #aaa;
					background-repeat: no-repeat;
					background-position: center 40px;
					min-width: 200px;
				}
			}
			.addPact {
				position: absolute;
				top: -60px;
				right: 0px;
			}
		}
	}
	
	.modal-form {
		.ivu-modal-header p,
		.ivu-modal-header-inner {
			font-size: 18px;
			font-weight: 600;
		}
		.ivu-checkbox-wrapper {
			font-size: 14px;
		}
	}
	
	.modal-form .ivu-form {
		font-size: 14px;
		.width200 {
			width: 200px;
		}
		.width204 {
			width: 204px;
		}
		.width316 {
			width: 316px;
		}
		.width244 {
			width: 244px;
		}
		.width136 {
			width: 136px;
		}
		.mr14 {
			margin-left: 12px;
		}
		.mr150 {
			margin-left: 150px;
		}
		.mr10 {
			margin-left: 10px;
		}
		.p90 {
			margin-left: 80px;
			color: #999999;
		}
		.fl {
			float: left;
		}
		.fr {
			float: right;
		}
		.inline {
			display: inline-block;
		}
		.ivu-form-item-label {
			font-size: 14px;
			color: #999999;
		}
		.ivu-input {
			background: #fafafa;
			color: #212121;
			font-size: 14px;
		}
		.ivu-input:hover {
			background: #fff;
		}
		.ivu-select-placeholder {
			color: #b3b3b3;
		}
		.ivu-form-item .ivu-input {
			background: #fafafa;
			color: #212121;
			font-size: 14px;
		}
		.ivu-select-selection {
			background: #FAFAFA;
		}
		.fileName {
			position: relative;
			display: inline-block;
			span {
				position: absolute;
				line-height: 32px;
				bottom: -24px;
				right: 12px;
				color: red;
				cursor: pointer;
				display: none;
			}
		}
		.fileName:hover {
			span {
				display: inline-block;
			}
		}
	}
	/*.ivu-modal-header-inner{
		font-size: 16px;
	}*/
	
	.modalOff {
		.cont {
			font-size: 18px;
			text-align: center;
			margin: 40px 0;
			font-weight: 600;
		}
		.modal-btn {
			text-align: center;
			padding-bottom: 34px;
			.ivu-btn {
				font-weight: 400;
				font-size: 14px;
				width: 120px;
				height: 36px;
				margin: 0 5px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
	
	.modalMake {
		.inp input {
			width: 270px;
		}
	}
	
	.modalAccount {
		.ivu-modal-body {
			padding: 16px 24px;
			height: 340px;
			overflow: auto;
		}
		.formAccount {
			/*overflow: hidden;*/
			.oldNews {
				margin-bottom: 10px;
				.ivu-form-item {
					margin-bottom: 4px;
					p {
						line-height: 34px;
					}
				}
			}
			.but_list {
				margin-left: 18px;
			}
		}
		.ivu-modal-body {
			padding: 16px;
		}
	}
	
	.modalFile {
		.formFile {
			.ivu-form-item {
				margin-bottom: 14px;
			}
			.pactId {
				.ivu-form-item-label {
					padding: 10px 12px 10px 0;
				}
			}
			.sacn {
				.ivu-form-item-label {
					padding: 14px 12px 10px 0;
				}
			}
			.fileBox {
				.copyFileName {
					position: relative;
					display: inline-block;
					span {
						position: absolute;
						line-height: 32px;
						bottom: 0px;
						right: -42px;
						color: red;
						cursor: pointer;
						display: none;
					}
				}
				.fileNameBox:hover .copyFileName {
					span {
						display: inline-block;
					}
				}
			}
		}
	}
	
	.modalJournal {
		.ivu-modal-footer {
			display: none;
		}
		.ivu-modal-body {}
	}
	
	.modal-form .logoBox {
		.schoolLogoBox {
			width: 70px;
			height: 70px;
			background-color: #f7f7f7;
			border: 1px solid #e0e1e2;
			img {
				width: 70px;
				height: 70px;
			}
		}
		.scanBox {
			line-height: 34px;
			.fileName {
				span {
					bottom: -10px;
					line-height: 24px;
				}
				span:hover {
					display: block;
				}
			}
			p {
				color: #0d70b0;
			}
		}
		label {
			line-height: 70px;
		}
		.uploadBox {
			position: relative;
			padding: 5px 0px;
			margin-left: 20px;
			.tips {
				color: #999899;
				font-size: 12px;
				margin-top: 10px;
			}
			.error_tips {
				top: 85%;
			}
		}
	}
	
	.logo {
		width: 100%;
		.ivu-form .logoBox .uploadBox .tips {
			line-height: 1em;
			margin-top: 20px;
		}
		.ivu-form-item-content {
			line-height: 1em;
		}
	}
	
	.promModal {
		.prom-form {
			/*height: 260px;
			overflow: auto;*/
		}
	}
</style>

<template>
	<div class="my_pact">
		<Tabs size="small" class="tabs" :animated="false" v-model="tabsNum" @on-click="tabCut(tabsNum)">
			<TabPane name="wait" label="待签约"></TabPane>
			<TabPane name="signed" label="已签约"></TabPane>
			<TabPane name="finished" label="已完成"></TabPane>
			<TabPane name="closed" label="已关闭"></TabPane>
			<TabPane name="collaborate" label="合作合同"></TabPane>
		</Tabs>
		<v-select style="width: 396px;margin: 15px 0;" placeholder="输入合同名称/合同编码/学生姓名/EC号" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div v-if="tabsNum=='wait'">
			<DatePicker v-model="beforeTime" format="yyyy年MM月dd日" type="date" placeholder="签约预约时间" style="width: 118px;height:26px;" class="time" @on-change="timeCharge"></DatePicker>
			<span style="background-color: rgb(54, 162, 158); display: inline-block; width: 12px; height: 2px;"></span>
			<DatePicker v-model="afterTime" format="yyyy年MM月dd日" type="date" placeholder="签约预约时间" class="time" style="width: 118px;height:26px;" @on-change="timeCharge"></DatePicker>

			<v-search-options :data="wait.countryList" byKey="label" :searchTitle="wait.searchName" labelWidth="0" @on-select-item="pullTags" style="margin-top: 10px;"></v-search-options>
		</div>
		<div class="filterDw" v-else-if="tabsNum!='wait'&&tabsNum!='collaborate'">
			<div class="filter-two">
				<div class="title">签约时间：</div>
				<div class="filter-date">
					<DatePicker v-model="beforeTime" format="yyyy年MM月dd日" class="time" type="date" placeholder="签约时间" style="width: 118px;height:26px;" @on-change="timeCharge"></DatePicker>
					——
					<DatePicker v-model="afterTime" format="yyyy年MM月dd日" class="time" type="date" placeholder="签约时间" style="width: 118px;height:26px;" @on-change="timeCharge"></DatePicker>
				</div>
			</div>
			<v-search-options :data="other.countryList" byKey="label" :searchTitle="other.searchName" labelWidth="80" @on-select-item="pullTags1" style="margin-top: 10px;"></v-search-options>
			<v-search-options :data="receiptStatusList.countryList" byKey="label" :searchTitle="receiptStatusList.searchName" labelWidth="80" @on-select-item="pullTagsReceiptStatus" style="margin-top: 10px;" v-if="tabsNum=='signed'"></v-search-options>
		</div>
		<div v-else>
			<v-search-options :data="teamwork.countryList" byKey="label" :searchTitle="teamwork.searchName" labelWidth="0" @on-select-item="pullTags2"></v-search-options>
		</div>
		<div class="main">
			<div v-for="item in list">
				<pact-card :list="item" :isClose="tabsNum=='closed'?true:false" :status="tabsNum" @off="offModal" @redact="redactModal" @make="makeModal" @account="accountModal" @file="fileModal" @journal="journalModal" @appointment="appointment" @promptly="promptly" @urgeAudit="urgeAudit" @accounting="accounting" @unClose="unClose" @goPreview="goPreview"></pact-card>
			</div>
			<div class="noList" v-if="!list.length">
				<span>暂无合同数据</span>
			</div>
			<div class="page-box" v-show="count>10">
				<div style="margin: auto;display: inline-block;">
					<Page :total="count" :page-size="10" :current="page" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
				</div>
			</div>
			<p class="list-info" v-if="info">共&nbsp;<span class="red" v-text="info.total"></span>&nbsp;份合同，总金额&nbsp;<span class="red" v-text="tabsNum!='collaborate'?(info.signPriceSum?parseFloat((Number(info.signPriceSum)/1e4).toFixed(4)):0):(info.totalMoney?parseFloat((Number(info.totalMoney)/1e4).toFixed(4)):0)"></span>&nbsp;万元<span v-if="tabsNum=='collaborate'">,分成总金额<span class="red" v-text="info.ratioMoney?parseFloat((Number(info.ratioMoney)/1e4).toFixed(4)):0"></span>&nbsp;万元</span>
			</p>
			<p class="addPact">
				<Button type="primary" @click="addPact">添加合同</Button>
			</p>
		</div>

		<Modal v-model="modalOff" title="关闭合同" width="730" class="modalOff modal-form">
			<div style="text-align:center">
				<p class="cont">被关闭合同将不能签约，取消关闭后恢复使用。</p>
				<div class="modal-btn">
					<Button type="ghost" @click="modalOff=false">取消</Button>
					<Button type="primary" @click="closePact">确定</Button>
				</div>
			</div>
		</Modal>
		<Modal v-model="close" title="取消关闭合同" width="730" class="modalOff modal-form">
			<div style="text-align:center">
				<p class="cont">确定取消关闭当前合同吗</p>
				<div class="modal-btn">
					<Button type="ghost" @click="close=false">取消</Button>
					<Button type="primary" @click="unCloseOk">确定</Button>
				</div>
			</div>
		</Modal>
		<Modal ref="xgModal" v-model="modalMake" title="修改签约" width="730" class="modalMake modal-form" @on-ok="makeOk('formMake')">
			<div>
				<Form ref="formMake" :rules="makeRule" :model="makeData" :label-width="116" class="formMake">
					<FormItem label="签约时间" class="inp" prop="signTime">
						<DatePicker v-model="makeData.signTime" format="yyyy/MM/dd HH:mm" type="datetime" placeholder="签约时间" style="width: 270px"></DatePicker>
					</FormItem>
					<FormItem label="合同编号" class="inp" style="margin-bottom: 14px;">
						<Input v-model="makeData.no" readonly type="text"></Input>
					</FormItem>
					<FormItem label="合作者：" style="margin-bottom: 0px;">
						<div v-for="(item,index) in makeData.partners" :key="index" style="margin-bottom: 10px;height:33px">
							<div style="float: left;">
								<v-select style="width: 150px;margin-right: 4px;" placeholder="选择合作者" :listIndex="index" icon="chevron-down" v-model="item.partnerName" k='name' :datafunc="searchDropList1" @selected="textChange1" @blur="unselect"></v-select>
							</div>
							<div style="float: left;">
								<Input v-model="item.ratio" placeholder="选择分成比例" style="width: 100px;">
								<span slot="append">%</span>
								</Input>
							</div>
							<Button type="primary" @click="addMake" v-if="index==makeData.partners.length-1" class="inline mr10">添加</Button>
							<Button type="ghost" @click="delMake(index)" class="inline mr10">删除</Button>
						</div>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<Modal v-model="modalAccount" :title="accountTite" width="1234" class-name="modalAccount modal-form vertical-center-modal">
			<div>
				<Form ref="formAccount" :rules="accountRule" :model="accountData" :label-width="114" class="formAccount">
					<div style="margin-bottom: 8px;">
						<div style="display:inline-block;width:114px;text-align: right;padding-right: 12px;">当前合同应收款</div><span style="display:inline-block;padding:0 8px;color: red;font-size: 16px;width: 80px;text-align: left;">{{this.cardPrice}}</span>&nbsp;&nbsp;元</div>
					<div v-for="(item,index) in htReceiptDetails" :key="item.id" style="overflow: hidden;" v-if="htReceiptDetails.length" class="oldNews">
						<FormItem :label="'第'+(index+1)+'次付款金额'" class="fl">
							<p class="width316"><span style="display:inline-block;padding:0 8px;width: 80px;text-align: left;">{{item.curReceipt}}</span>&emsp;元</p>
						</FormItem>
						<FormItem label="付款方式" class="fr">
							<p class="width316" style="padding-left: 8px;">{{item.typeLabel}}</p>
						</FormItem>
						<FormItem label="收款账号" class="fl">
							<p class="width316" style="padding-left: 8px;">{{item.accountLabel}}</p>
						</FormItem>
						<FormItem :label="'付款时间'" class="fr">
							<p class="width316" style="padding-left: 8px;">{{item.receiptTime}}</p>
						</FormItem>
					</div>
					<div class="">
						<FormItem :label="'第'+(htReceiptDetails.length+1)+'次付款金额'" class="inline" prop="curReceipt">
							<Input v-model="accountData.curReceipt" type="text" style="width: 80px;"></Input>&emsp;元
						</FormItem>
						<FormItem label="付款方式" class="inline" prop="type" :label-width="94">
							<Select v-model="accountData.type" style="width:136px;">
								<Option :value="item.value" v-for="item in payment" :key="item.id">{{item.label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="收款账号" class="inline" prop="account" :label-width="98" v-if="!htReceiptDetails.length">
							<Select v-model="accountData.account" style="width: 230px;" @on-change="accountChange">
								<Option :value="item.id" v-for="item in accId" :key="item.id">{{item.accountName}}</Option>
							</Select>
						</FormItem>
						<FormItem label="开户行" class="inline" prop="bank" :label-width="98" v-if="!htReceiptDetails.length">
							<Select v-model="accountData.bank" style="width: 230px;">
								<Option :value="item.id" v-for="(item,index) in bankList" :key="item.id">{{item.accountBank}}</Option>
							</Select>
						</FormItem>
						<Button type="primary" @click="addReceipt" v-if="accountData.receiptPlans.length==0" class="inline mr10">添加</Button>
					</div>
					<div v-for="(item,index) in accountData.receiptPlans" :key="item.id" class="">
						<FormItem :label="'第'+(index+htReceiptDetails.length+2)+'次收款金额'" class="inline">
							<Input v-model="item.planReceipt" type="text" style="width: 80px;"></Input>&emsp;元
						</FormItem>
						<FormItem label="收款时间" class="inline" :label-width="94" :rules="item.planReceipt?{required: true,type:'date', message: '第'+(index+htReceiptDetails.length+2)+'次收款时间不能为空', trigger: 'change'}:[]" :required="item.planReceipt?true:false" :prop="item.planReceipt?'receiptPlans.' + index + '.planReceiptTime':''">
							<DatePicker v-model="item.planReceiptTime" format="yyyy年MM月dd日" type="date" style="width: 136px"></DatePicker>
						</FormItem>
						<div class="inline but_list">
							<Button type="primary" @click="addReceipt" v-if="index==accountData.receiptPlans.length-1" class="inline mr10">添加</Button>
							<Button type="ghost" @click="delReceipt(index)" class="inline mr10">删除</Button>
						</div>
					</div>
					<Form-item label="甲方付款收据" class="logo" prop="receiptList">
						<div class="infoList logoBox clearfix">
							<div class="fl schoolLogoBox" v-for="(item,index) in accountData.receiptList" v-if="accountData.receiptList.length">
								<i-input v-model="item.filePath" v-show="false"></i-input>
								<p class="fileName">
									<img :src="displayUrl(item.id)" :class="{hide:!item.filePath}">
									<span @click="delFile(item.id,index)">
							               	删除
							        </span>
								</p>
							</div>
							<div class="fl schoolLogoBox" v-if="!accountData.receiptList.length">
							</div>
							<div class="fl uploadBox">
								<Upload ref="upload" name='files' :data="{'type':'ht_receipt','studentId':ecId,'dirName':'business','isOverride':0,'menuId':201}" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadToPan">
									<Button type="primary">点击上传</Button>
								</Upload>
								<p class="tips">* 文件最大为 2MB ( .png, .jpg )</p>
								<!--<div class="ivu-form-item-error-tip error_tips">{{imgErrorTips}}</div>-->
							</div>
						</div>
					</Form-item>
					<div style="margin-left: 114px;padding-bottom: 12px;">
						<Checkbox v-model="accountRemind" @on-change="accRemind">设置待收收款微信提醒。</Checkbox>
					</div>
					<Row v-if="accountData.rejectBy&&accountData.rejectDate">
						<Col span="8">
    						<FormItem prop="date" label="审批人" style="margin-bottom:12px;">
    							{{accountData.rejectBy}}
    						</FormItem>
						</Col>
						<Col span="11">
    						<FormItem prop="date" label="审批时间" style="margin-bottom:12px;margin-left:38px;">
    							{{new Date(accountData.rejectDate).toLocaleString()}}
    						</FormItem>
						</Col>
					</Row>
					<Row v-if="accountData.rejectReasons">
						<Col span="11">
						<FormItem label="驳回理由" style="margin-bottom:12px;">
							{{accountData.rejectReasons}}
						</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="modalAccount=false">取消</Button>
				<Button type="primary" @click="accOk" :disabled="okDisable">确定</Button>
			</div>
		</Modal>
		<Modal v-model="modalFile" ref="modalFile" :title="fileTit" width="730" class="modalFile modal-form" @on-ok="archive">
			<div>
				<Form ref="formFile" :label-width="150" class="formFile">
					<FormItem label="合同编号" class="pactId">
						<p>{{fileData.id}}</p>
					</FormItem>
					<FormItem label="正式签约合同扫描件" style="margin-bottom: 14px;" class="scan">
						<div class="fileBox">
							<div class="fileNameBox" v-for="(item,index) in fileData.scanlist" v-if="fileData.scanlist.length" :key="item.id">
								<p class="copyFileName">
									<a href="javascript:void(0)" v-text="!!item.fileName?item.fileName:''">
									</a>
									<span @click="delFile1(item.id,index)">
							           	删除
							        </span>
								</p>
							</div>
							<p style="float: left;" v-if="!fileData.scanlist.length">扫描件名称</p>
							<div class="fl uploadBox">
								<!--	<Upload ref="upload" name="files" :data="{'objectId':modalId,'type':'ht_contract_scan','dirName':fileData.type=='images'?'images':fileData.type=='files'?'files':'','isOverride':1}" :before-upload="fileUpload" :show-upload-list="false" :on-success="handleSuccess2" :format="['jpg','jpeg','png','pdf']" :max-size="2048" :on-format-error="handleFormatError2" :on-exceeded-size="handleMaxSize" :action="uploadToPan">-->
								<Button type="primary" @click="onUploadLocal">点击上传</Button>
							</div>
						</div>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<up-to-pan ref="uptopan1" :studentId="ecId" :object-id="modalId" :dir="''" type="ht_contract_scan" fileType="all" @uploadok="onUploadOk1" :detector="detector" :format="['jpg','jpeg','png','pdf']" dirName="business" />
		<Modal v-model="modalJournal" :title="jouTit" width="730" class="modalJournal modal-form">
			<Table border :columns="journalCol" :data="journalData"></Table>
		</Modal>
		<Modal ref="appoModal" v-model="appoModal" title="报待签" width="730" class="appoModal modal-form" @on-ok="appok('formTrans')">
			<div>
				<Form ref="formTrans" :label-width="120" :rules="formTransRule" :model="appoForm" class="formTrans">
					<FormItem label="签约待签时间：" prop="appoDate">
						<DatePicker v-model="appoForm.appoDate" format="yyyy/MM/dd HH:mm" type="datetime" placeholder="年/月/日     时：分：秒" style="width: 270px"></DatePicker>
						<Checkbox v-model="appoForm.remind" true-value="1" false-value="0">设置待签时间微信提醒。</Checkbox>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<Modal ref="promModal" v-model="promModal" title="立即签约" width="730" class="promModal modal-form" @on-ok="promOk('promValidate')">
			<div>
				<Form ref="promValidate" :rules="promFormRule" :model="promForm" :label-width="120" class="prom-form">
					<FormItem label="签约金额：">
						<Input v-model="promForm.signPrice" type="text" :disabled="!isCeo" class="width204"></Input>&emsp;（万元）
					</FormItem>
					<FormItem label="签约时间：" prop="signTime">
						<DatePicker transfer v-model="promForm.signTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="年/月/日     时：分：秒" style="width: 270px"></DatePicker>
					</FormItem>
					<!--<FormItem label="签约合同编号：" prop="no">
						<Input v-model="promForm.no" type="text" style="width: 270px;"></Input>
					</FormItem>-->
					<FormItem label="合作者：" style="margin-bottom: 0px;">
						<div v-for="(item,index) in promForm.partners" :key="index" style="margin-bottom: 10px;">
							<div style="float: left;">
								<v-select style="width: 150px;margin-right: 4px;display: inline-block;" placeholder="选择合作者" :listIndex="index" icon="chevron-down" v-model="item.partnerName" k='name' :datafunc="searchDropList1" @selected="textChange2" @blur="unselect2"></v-select>
							</div>
							<div style="float: left;">
								<Input v-model="item.ratio" placeholder="选择分成比例" style="width: 114px;">
								<span slot="append">%</span>
								</Input>
							</div>
							<Button type="primary" @click="addProm" v-if="index==promForm.partners.length-1" class="inline mr10">添加</Button>
							<Button type="ghost" @click="delProm(index)" class="inline mr10">删除</Button>
						</div>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	import vSearchOptions from "../../modules/vSearchOptions";
	import vSelect from "../../modules/vSelect.vue";
	import pactCard from "../../modules/pactCard.vue";
	import upToPan from '../../modules/planUpToPan';
	import valid, {
		errors,
		common,
		contract,
		choiceschool,
		account,
		htContractTpl,
		crmCustomerSale
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				ecId: '',
				okDisable: false,
				tabsNum: 'wait',
				close: false,
				fileTit: '立即存档',
				compact: '',
				auditStatus: '',
				payment: [],
				accId: [],
				accountTite: '立即报账',
				count: 10,
				page: 1,
				pageSize: 10,
				flag: 1,
				jouTit: '合同日志',
				detector: {
					type: 'name',
					condition: '',
					content: ''
				},
				isProtocol: '',
				receiptStatus: '',
				info: {},
				list: [],
				cardPrice: '',
				bankList: [],
				oldPrice: 0,
				wait: {
					searchName: '',
					countryList: [{
							id: 0,
							label: '全部'
						},
						{
							id: 6015,
							label: '等待审核'
						},
						{
							id: 6013,
							label: '审核通过'
						},
						{
							id: 6014,
							label: '已驳回'
						},
						{
							id: 6016,
							label: '免审核'
						},
					],
				},
				other: {
					searchName: '产品类型',
					countryList: [{
							id: 0,
							label: '全部'
						},
						{
							id: 1,
							label: '附加'
						},
						{
							id: 2,
							label: '常规'
						},
					],
				},
				receiptStatusList: {
					searchName: '收款状态',
					countryList: [{
							id: 0,
							label: '全部'
						},
						{
							id: 1,
							label: '待收款'
						},
						{
							id: 2,
							label: '收款中'
						},
						{
							id: 4,
							label: '已驳回'
						},
						{
							id: 3,
							label: '已完成'
						},
					],
				},
				teamwork: {
					searchName: '',
					countryList: [{
							id: 0,
							label: '合作签约'
						},
						{
							id: 1,
							label: '签约分成'
						},
					],
				},
				beforeTime: '',
				afterTime: '',
				modalId: '',
				modalOff: false,
				modalMake: false,
				makeData: {
					signTime: '',
					no: '',
					partners: [{
						partnerId: '',
						partnerName: '',
						ratio: ''
					}]
				},
				makeRule: {
					signTime: [{
						required: true,
						type: 'date',
						message: "时间不能为空",
						trigger: 'change'
					}],
				},
				modalAccount: false,
				accountData: {
					planId: '',
					curReceipt: '',
					type: '',
					id: '',
					account: '',
					bank: '',
					receiptPlans: [],
					receiptList: [],
					rejectBy: "",
					rejectDate:'',
					rejectReasons: ""
				},
				accountRule: {
					curReceipt: [
						//						{required:true, message:"金额不能为空", trigger: 'blur'},
						{
							required: true,
							pattern: /^\d+\.{0,1}\d*$/,
							message: "必须为数字",
							trigger: 'blur'
						},
					],
					type: [{
						required: true,
						message: "付款方式不能为空",
						trigger: 'change'
					}],
					account: [{
						required: true,
						message: "付款账号不能为空",
						trigger: 'change'
					}],
					bank: [{
						required: true,
						message: "开户行不能为空",
						trigger: 'change'
					}],
					receiptList: [{
						required: true,
						type: 'array',
						message: "付款收据不能为空",
						trigger: 'change'
					}],
				},
				htReceiptDetails: [],
				accountRemind: true,
				modalFile: false,
				fileData: {
					id: '2017BJ-G-VIP-001',
					scanUrl: '',
					scanlist: [],
					type: ''
				},
				modalJournal: false,
				appoModal: false,
				appoForm: {
					appoDate: '',
					remind: '1'
				},
				formTransRule: {
					appoDate: [{
						required: true,
						type: 'date',
						message: "时间不能为空",
						trigger: 'change'
					}],
				},
				promModal: false,
				promForm: {
					signPrice: '',
					signTime: '',
					no: '',
					partners: [{
						partnerId: '',
						partnerName: '',
						ratio: ''
					}]
				},
				promFormRule: {
					signTime: [{
						required: true,
						type: 'date',
						message: "时间不能为空",
						trigger: 'change'
					}],
					//					no: [{
					//						required: true,
					//						message: "编号不能为空",
					//						trigger: 'blur'
					//					}],
				},
				journalCol: [{
						title: '序号',
						type: 'index',
						align: 'center',
					},
					{
						title: '操作人',
						align: 'center',
						key: 'optUserName'
					},
					{
						title: '操作',
						align: 'center',
						key: 'content',
						render: (h, params) => {
							return h('div', {}, [
								h('p', {}, params.row.content),
								h('p', {}, !!params.row.reason ? '驳回理由:' + params.row.reason : '')
							])
						}
					},
					{
						title: '时间',
						align: 'center',
						key: 'optTime'
					}
				],
				journalData: []
			}
		},
		computed: {
			...mapGetters('sign', ['isCeo']),
			uploadToPan: function() {
				return common.uploadToPan();
			},
		},
		components: {
			vSelect,
			vSearchOptions,
			pactCard,
			upToPan
		},
		created() {
			let params = {
				name: this.compact,
				status: 'committed,checked',
				auditStatus: '',
				'from': 1,
				pageNo: this.page,
				pageSize: this.pageSize,

			}
			contract.list(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.list = res.data.data.list;
					this.info = res.data.data.attach;
					this.count = res.data.data.count;
				}
			}).catch(errors.call(this)).finally(() => {});
			let params1 = {
				type: 'ht_receipt_detail_type'
			}
			common.listData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.payment = res.data.data;
				}
			}).catch(errors.call(this)).finally(() => {});
			htContractTpl.listAccount().then(valid.call(this)).then(res => {
				if(res.ok) {
					this.accId = res.data.data;
				}
			}).catch(errors.call(this));

		},
		mounted() {
			this.$el.parentElement.scrollTop = 0
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			displayUrl(id) {
				return common.displayUrl(id);
			},
			getList() {
				let val, tType;
				if(this.tabsNum == "wait") {
					val = 'committed,checked';
					tType = 1;
				} else if(this.tabsNum == "closed") {
					val = 'closed,refund';
					tType = 1;
				} else if(this.tabsNum == "signed") {
					val = 'signed,accounted,collected';
					tType = 2;
				} else {
					val = this.tabsNum;
					tType = 2;
				}
				let params = {
					name: this.compact,
					status: val,
					auditStatus: this.auditStatus,
					isProtocol: this.isProtocol,
					receiptStatus: this.receiptStatus,
					'from': 1,
					pageNo: this.page,
					pageSize: this.pageSize,
				}
				if(!!this.beforeTime) {
					params.startTime = (new Date(this.beforeTime)).format('yyyy-MM-dd');
					params.timeType = tType;
				};
				if(!!this.afterTime) {
					params.endTime = (new Date(this.afterTime)).format('yyyy-MM-dd');
					params.timeType = tType;
				} else if(!!this.beforeTime && !this.afterTime) {
					params.endTime = (new Date()).format('yyyy-MM-dd');
				};
				contract.list(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.list = res.data.data.list;
						this.info = res.data.data.attach;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			getPartnerShip() {
				let params = {
					name: this.compact,
					pageNo: this.page,
					pageSize: this.pageSize,
					flag: this.flag
				}
				if(!!this.beforeTime) {
					params.startTime = (new Date(this.beforeTime)).format('yyyy-MM-dd');
					params.timeType = tType;
				};
				if(!!this.afterTime) {
					params.endTime = (new Date(this.afterTime)).format('yyyy-MM-dd');
					params.timeType = tType;
				} else if(!!this.beforeTime && !this.afterTime) {
					params.endTime = (new Date()).format('yyyy-MM-dd');
				};
				contract.listPartnerShip(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.list = res.data.data.list;
						this.info = res.data.data.attach;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			timeCharge() {
				//				timeCharge
				this.$nextTick(() => {
					this.getList();
				})
			},
			tabCut(val) {
				this.list = [];
				this.$nextTick(() => {
					this.auditStatus = '';
					this.isProtocol = '';
					this.receiptStatus = '';
					this.page = 1;
					if(this.tabsNum == 'collaborate') {
						this.getPartnerShip();
					} else {
						this.getList()
					}
				})
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			searchDropList1(word) {
				return new Promise((resolve, reject) => {
					let params = {
						name: word
					}
					choiceschool.listAllUserMap(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							resolve(res.data.data);
						} else {
							reject(res);
						}
					}).catch(err => {
						errors.call(this);
						reject(err);
					});
				});
			},
			textChange1: function(val, ind) {
				this.$nextTick(() => {
					this.makeData.partners[ind].partnerId = val.id;
				})
			},
			textChange2: function(val, ind, vid) {
				this.$nextTick(() => {
					this.promForm.partners[ind].partnerId = val.id;
				})
			},
			textChange: function(val) {
				this.$nextTick(() => {
					if(this.tabsNum == 'collaborate') {
						this.getPartnerShip();
					} else {
						this.getList()
					}
				})
			},
			nationalChange(item) {
				console.log(item);
			},
			pullTags(val) {
				console.log(val)
				if(val == 0) {
					this.auditStatus = '';
				} else if(val == 6015) {
					this.auditStatus = 'waiting';
				} else if(val == 6013) {
					this.auditStatus = 'agree';
				} else if(val == 6014) {
					this.auditStatus = 'reject';
				} else if(val == 6016) {
					this.auditStatus = 'nocheck';
				}
				if(this.tabsNum == 'collaborate') {

				} else {
					this.getList();
				}
			},
			pullTags1(val) {
				if(val == 0) {
					this.isProtocol = '';
				} else if(val == 1) {
					this.isProtocol = '1';
				} else if(val == 2) {
					this.isProtocol = '0';
				}
				if(this.tabsNum == 'collaborate') {

				} else {
					this.getList();
				}
			},
			pullTagsReceiptStatus(val) {
				if(val == 0) {
					this.receiptStatus = '';
				} else {
					this.receiptStatus = val - 1;
				}
				if(this.tabsNum == 'collaborate') {

				} else {
					this.getList();
				}
			},
			pullTags2(val) {
				if(val == 0) {
					this.flag = 1;
				} else if(val == 1) {
					this.flag = 2;
				}
				this.getPartnerShip();
			},
			offModal(val) {
				this.modalOff = true;
				this.modalId = val.id;
			},
			redactModal(val) {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						id: val.tplId,
						mid: val.id
					}
				})
			},
			makeModal(val) {
				this.modalMake = true;
				this.modalId = val.id;
				let params = {
					ctId: this.modalId
				}
				contract.formSign(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.makeData.signTime = res.data.data.signTime;
						this.makeData.no = res.data.data.no;
						if(res.data.data.partners.length) {
							let arr = [];
							res.data.data.partners.forEach((v, k) => {
								v.ratio = v.ratio * 1e2;
								arr.push(v);
							})
							this.makeData.partners = arr;
						} else {
							this.makeData.partners = [{
								partnerId: '',
								partnerName: '',
								ratio: ''
							}];
						}
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			unClose(val) {
				this.modalId = val.id;
				this.close = true;
			},
			unCloseOk() {
				let params = {
					id: this.modalId
				}
				contract.cancelCloseContract(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tabsNum = 'wait';
						this.getList();
						this.close = false;
					}
				}).catch(errors.call(this));
			},
			goPreview(val) {
				this.modalId = val.id;
				this.$router.push({
					name: 'sign.pactPreview',
					query: {
						id: val.id
					}
				})
			},
			getAcc() {
				let params = {
					ctId: this.modalId
				}
				account.formAccounted(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.htReceiptDetails = res.data.data.htReceiptDetails;
						let oldPrice = 0;
						if(this.htReceiptDetails.length) {
							this.account = this.htReceiptDetails[0].account
							this.htReceiptDetails.forEach((v, k) => {
								let num = (typeof v.factRecipot === 'number' && isFinite(v.factRecipot)) ? v.factRecipot : 0;
								num += v.expense;
								oldPrice += num;
							})
						}
						this.oldPrice = oldPrice;
						this.accountData.planId = res.data.data.htReceiptDetail.planId;
						if(res.data.data.htReceiptPlans.length) {
							this.accountData.receiptPlans = res.data.data.htReceiptPlans;
							let log = true;
							res.data.data.htReceiptPlans.map((v, k) => {
								if(v.isNotify == '0') {
									log = false;
								}
							})
							this.accountRemind = log;
							this.accRemind(log);
							///AAA
						} else {
							this.accountData.receiptPlans = []
						}
						if(res.data.data.htReceiptDetail.receiptList.length) {
							this.accountData.receiptList = res.data.data.htReceiptDetail.receiptList;
						} else {
							this.accountData.receiptList = [];
						}
						this.accountData.id = res.data.data.htReceiptDetail.id;
						this.accountData.curReceipt = res.data.data.htReceiptDetail.curReceipt;
						this.accountData.type = res.data.data.htReceiptDetail.type;
						this.accountData.rejectBy = res.data.data.htReceiptDetail.rejectBy;
						this.accountData.rejectDate = res.data.data.htReceiptDetail.rejectDate;
						this.accountData.rejectReasons = res.data.data.htReceiptDetail.rejectReasons;
						if(res.data.data.htReceiptDetails.length) {
							let length = res.data.data.htReceiptDetails.length;
							this.accountData.account = res.data.data.htReceiptDetails[length - 1].account;
						} else {
							this.accountData.account = res.data.data.htReceiptDetail.account;
						}
						//						this.$refs['formAccount'].validate();
						this.accountChange(this.accountData.account);
						this.modalAccount = true;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			delFile(id, ind) {
				// console.log(id)
				if(id) {
					let params = {
						'id': id
					}
					common.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.accountData.receiptList.splice(ind, 1);
						}
					}).catch(errors.call(this));
				}
			},
			delFile1(id, ind) {
				// console.log(id);
				//				return false;
				if(id) {
					let params = {
						'id': id
					}
					common.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							//							this.formArchive();
							this.fileData.scanlist.splice(ind, 1);
						}
					}).catch(errors.call(this));
				} else {
					//					this.formArchive();
					this.fileData.scanlist.splice(ind, 1);
					this.fileData.scanUrl = '';
				}
			},
			accRemind(val) {
				if(val) {
					this.accountData.receiptPlans.forEach((v, k) => {
						v.isNotify = '1';
					})
				} else {
					this.accountData.receiptPlans.forEach((v, k) => {
						v.isNotify = '0';
					})

				}
			},
			accOk() {
				this.$refs.formAccount.validate((ok) => {

					if(ok) {
						let sum = 0;
						this.accountData.receiptPlans.forEach((v, k) => {
							sum += Number(v.planReceipt) || 0;
							v.planReceiptTime = (new Date(v.planReceiptTime)).format('yyyy-MM-dd hh:mm:ss');
						})
						//						this.accountData.receiptPlans.forEach((v,k)=>{
						//						})
						//console.log(Number(this.cardPrice))
						//console.log(Number(this.oldPrice))
						//console.log(Number(this.accountData.curReceipt))
						//console.log(Number(sum))
						if(Number(this.cardPrice) == Number(this.oldPrice) + Number(this.accountData.curReceipt) + Number(sum)) {
							console.log(this.accountData, )
							let params = this.accountData;
							params.ctId = this.modalId;
							let arr = [];
							params.receiptPlans.forEach((v, k) => {
								if(v.planReceipt) {
									arr.push(v)
								}
							});
							params.receiptPlans = arr;
							this.okDisable = true;
							account.accounted(params).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.$Message.success(res.data.message);
									this.modalAccount = false;
									this.okDisable = false
									this.getList();
								} else {
									this.okDisable = false
								}
							}).catch(errors.call(this));
						} else if(Number(this.cardPrice) > Number(this.oldPrice) + Number(this.accountData.curReceipt) + Number(sum)) {
							this.$Modal.success({
								content: '请完善计划收款金额与计划收款时间后再提交！'
							});
						} else {
							this.$Modal.success({
								content: '报账与计划收款总金额超出签约金额，请修改后再提交！'
							});
						}
					}
				})
			},
			accountModal(val) {
				this.modalId = val.id;
				this.cardPrice = val.htSign.signPrice
				this.accountTite = '修改报账';
				this.$refs['formAccount'].resetFields();
				this.getAcc();
			},
			accounting(val) {
				this.modalId = val.id;
				this.ecId = val.ecId;
				if(val.rejectStatus==1){
			    	this.accountTite = '重新报账';
				}else{
			    	this.accountTite = '立即报账';
				}
				this.$refs['formAccount'].resetFields();
				this.cardPrice = val.htSign.signPrice
				if(!!this.accountData.curReceipt) {
					this.accountData.curReceipt = val.htSign.signPrice;
				}
				this.getAcc();
			},
			fileModal(val, tit) {
				this.modalFile = true;
				this.modalId = val.id;
				this.ecId = val.ecId;
				this.fileTit = tit;
				this.fileData.id = val.no;
				this.formArchive();
			},
			formArchive() {
				let params = {
					id: this.modalId
				}
				contract.formArchive(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						if(res.data.data.length) {
							this.fileData.scanlist = res.data.data;
						} else {
							this.fileData.scanlist = [];
						}
					}
				}).catch(errors.call(this));
			},
			archive() {
				let params = {
					id: this.modalId
				}
				contract.archive(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$refs.modalFile.visible = false;
						this.modalFile = false;
						this.getList();
					} else {
						this.$refs.modalFile.visible = true;
						this.modalFile = true;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			journalModal(val, tit) {
				this.modalJournal = true;
				this.jouTit = tit;
				this.modalId = val.id;
				let params = {
					ctId: this.modalId
				}
				contract.listOptLog(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.journalData = res.data.data;
					}
				}).catch(errors.call(this)).finally(() => {});

			},
			closePact() {
				let params = {
					id: this.modalId
				}
				contract.closeContract(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.modalOff = false;
						this.getList();
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			addReceipt() {
				let obj = {
					planReceipt: '',
					planReceiptTime: '',
					isNotify: '1',
					account: this.account
				};
				// console.log(this.account, '00')
				let leng = this.accountData.receiptPlans.length;
				this.accountData.receiptPlans.splice(leng, 0, obj)
			},
			delReceipt(ind) {
				if(this.accountData.receiptPlans.length > 0) {
					this.accountData.receiptPlans.splice(ind, 1);
				} else {
					//					let obj = {
					//						planReceipt: '',
					//						planReceiptTime: '',
					//						isNotify: '1'
					//					};
					//					this.accountData.receiptPlans.splice(0, 1, obj)
				}
			},
			//			addpartners(){
			//				let obj={partnerId:'',partnerName:'',ratio:''};
			//				let leng=this.promForm.partners.length;
			//				this.promForm.partners.splice(leng,0,obj)
			//			},
			addMake() {
				let obj = {
					partnerId: '',
					partnerName: '',
					ratio: ''
				};
				let leng = this.makeData.partners.length;
				this.makeData.partners.splice(leng, 0, obj)
			},
			delMake(ind) {
				this.makeData.partners.splice(ind, 1);
			},
			makeOk(name) {
				this.$refs[name].validate((ok) => {
					if(ok) {
						let arr = [];
						this.makeData.partners.forEach((v, k) => {
							if(v.partnerId != '') {
								arr.push(v);
							}
						});
						arr.forEach((v, k) => {
							v.ratio = v.ratio / 100
						});
						let params = {
							ctId: this.modalId,
							no: this.makeData.no,
							signTime: (new Date(this.makeData.signTime)).format('yyyy-MM-dd hh:mm:ss'),
							partners: this.makeData.partners
						}
						//							params.partners=this.makeData.partners.length?this.makeData.partners:[]
						params.partners = arr;
						contract.sign(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								if(this.ecId) {
									let params1 = {
										cusCode: this.ecId,
										status: 'sign'
									}
									crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
										if(res.ok) {}
									}).catch(errors.call(this));
								}
								this.modalMake = false;
								this.getList();
							}
						}).catch(errors.call(this)).finally(() => {});
					} else {
						this.$refs.xgModal.visible = true;
						this.modalMake = true;
					}
				})
			},
			handleSuccess: function(data) {
				if(data.status == "success") {
					this.$Message.success(data.message);
					let length = this.accountData.receiptList.length;
					this.accountData.receiptList.splice(length, 0, data.data);
					this.$refs.formAccount.validateField('receiptList')
				} else {
					this.$Message.error(data.message);
				}
			},
			handleFormatError: function() {
				this.$Message.error("需使用jpg、jpeg、png格式图片");
			},
			handleMaxSize: function() {
				this.$Message.error("图片大小不能超过2MB");
			},
			appointment(val) {
				this.modalId = val.id;
				this.ecId = val.ecId;
				this.appoModal = true;
				console.log(val)
				this.appoForm.appoDate = val.htSign.expectTime;
			},
			appok(name) {
				this.$refs[name].validate((ok) => {
					if(ok) {
						let params = {
							ctId: this.modalId,
							expectTime: (new Date(this.appoForm.appoDate)).format('yyyy-MM-dd hh:mm:ss'),
							isNotify: this.appoForm.remind
						}
						contract.expect(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								if(this.ecId) {
									let params1 = {
										cusCode: this.ecId,
										status: 'unsign'
									}
									crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
										if(res.ok) {
											this.appoModal = false;
											this.getList();
										} else {
											this.$refs.appoModal.visible = true;
											this.appoModal = true;
										}
									}).catch(errors.call(this));
								} else {
									this.appoModal = false;
									this.getList();
								}
							}
						}).catch(errors.call(this)).finally(() => {});
					} else {
						this.$refs.appoModal.visible = true;
						this.appoModal = true;
					}
				})
			},
			promptly(val) {
				this.promModal = true;
				this.modalId = val.id;
				this.ecId = val.ecId;
				let params = {
					ctId: this.modalId
				}
				contract.formSign(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.promForm.signTime = res.data.data.signTime;
						this.promForm.no = res.data.data.no;
						this.promForm.signPrice = parseFloat((res.data.data.signPrice / 1e4).toFixed(4));
						if(res.data.data.partners.length) {
							this.promForm.partners = res.data.data.partners;
						} else {
							this.promForm.partners = [{
								partnerId: '',
								partnerName: '',
								ratio: ''
							}];
						}
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			urgeAudit(val) {
				this.modalId = val.id;
				let params = {
					id: this.modalId
				}
				contract.urgeAudit(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Modal.success({
							content: '系统已提醒审批人尽快处理！'
						});
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			addProm() {
				let obj = {
					partnerId: '',
					partnerName: '',
					ratio: ''
				};
				let leng = this.promForm.partners.length;
				this.promForm.partners.splice(leng, 0, obj)
			},
			delProm(ind) {
				if(this.promForm.partners.length > 1) {
					this.promForm.partners.splice(ind, 1);
				} else {
					let obj = {
						partnerId: '',
						partnerName: '',
						ratio: ''
					};
					this.promForm.partners.splice(0, 1, obj)
				}
			},
			promOk(name) {
				this.$refs[name].validate((ok) => {
					if(ok) {
						this.updateLoadingStatus({
							isLoading: true
						});
						let arr = [];
						this.promForm.partners.forEach((v, k) => {
							arr.push(v);
						});
						arr.forEach((v, k) => {
							v.ratio = (v.ratio / 1e2).toFixed(2);
						});
						let params = {
							ctId: this.modalId,
							signPrice: (this.promForm.signPrice * 1e4).toFixed(4),
							no: this.promForm.no,
							signTime: (new Date(this.promForm.signTime)).format('yyyy-MM-dd hh:mm:ss'),
						}
						if(this.promForm.partners.length == 1 && this.promForm.partners[0].partnerId == '') {

						} else {
							//							params.partners=this.promForm.partners.length?this.promForm.partners:[]
							params.partners = arr;
						}
						contract.sign(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								if(this.ecId) {
									this.sendMarket(res.data.data)
									let params1 = {
										cusCode: this.ecId,
										status: 'sign'
									}
									crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
										if(res.ok) {}
									}).catch(errors.call(this));
								}
								this.$Message.success(res.data.message);
								this.getList();
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});
					} else {
						this.$refs.promModal.visible = true;
						this.promModal = true;
					}
				})
			},

			sendMarket(data) {
				let params = {
					"cusCode": this.ecId,
					"ctNo": data.no,
					"signPrice": data.signPrice
				}
//				account.sendMarket(params).then(valid.call(this)).then(res => {
//					if(res.ok) {
//						console.log(res.data, 9)
//					}
//				}).catch(errors.call(this));
			},

			pageChange(val) {
				this.page = val;
				if(this.tabsNum == 'collaborate') {
					this.getPartnerShip();
					this.$el.parentElement.scrollTop = 0
				} else {
					this.getList();
					this.$el.parentElement.scrollTop = 0
				}
			},
			sizeChange(val) {
				this.pageSize = val;
				if(this.tabsNum == 'collaborate') {
					this.getPartnerShip();
				} else {
					this.getList()
				}
			},
			addPact() {
				this.$router.push({
					name: 'sign.library',
					query: {}
				})
			},
			unselect(e, wind, ind) {
				if(!wind) {
					this.makeData.partners[ind].partnerName = '';
				}
			},
			unselect2(e, wind, ind) {
				if(!wind) {
					this.promForm.partners[ind].partnerName = '';
				}
			},
			onUploadLocal() {
				this.$refs.uptopan1.doUpload();
			},
			onUploadOk1(data) {
				if(data.status == "success") {
					//					this.attachmentList.push(data.data);
					this.fileData.scanlist.push(data.data);
				} else {
					this.$Message.error(data.message);
				}
			},
			accountChange(id) {
				this.accountData.bank = '';
				let arr = [];
				this.accId.forEach((v, k) => {
					if(id == v.id) {
						arr.push({
							accountBank: v.accountBank,
							id
						})
					}
				})
				this.bankList = arr;
				if(arr.length){
					this.accountData.bank=arr[0].id;
				}
			}
		}
	}
</script>