<style lang="less">
	.wrap {
		.my-preview {
			padding-bottom: 120px;
			.sealbox {
				position: relative;
				display: inline-block;
				.disSeal {
					position: absolute;
					font-size: 14px;
					font-weight: normal;
					top: -26px;
					left: 10px;
					line-height: 28px;
					text-align: center;
					display: inline-block;
					color: #0050BE;
					display: none;
					cursor: default;
					width: 84px;
				}
			}
			.btn {
				width: 960px;
				margin: 0 auto;
				text-align: center;
				clear: both;
				.ivu-btn {
					line-height: 1.4em;
					font-size: 16px;
					margin: 0 50px;
					width: 127px;
					height: 40px;
				}
			}
		}
	}
	
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
	
	.promModal {
		.ivu-modal-body {
			/*max-height: 396px;
			overflow: auto;*/
		}
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
	
	.modal-form .ivu-form {
		font-size: 14px;
		.width200 {
			width: 200px;
		}
		.width204 {
			width: 204px;
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
	
	.modalAccount {
		.ivu-modal-body {
			padding: 16px;
			height: 396px;
			overflow: auto;
		}
		.formAccount {
			.history {
				p {
					width: 230px;
					&.width204 {
						width: 204px;
					}
				}
			}
			.logoBox {
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
					width: 70px;
					line-height: 43px;
					p {
						/*width:70px;*/
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
		}
		.modalFile {
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
			/*.fileName {
				position: relative;
				display: inline-block;
				span {
					position: absolute;
					bottom: -18px;
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
			}*/
		}
	}
</style>

<template>
	<div class="wrap">
		<div class="my-preview">
			<plan-box :info="info"></plan-box>
			<preview :detail="true" :info="info" :pdfinfo="pdfInfo" @go-edit="goEdit" ref="pdfview">
				<div slot="middlebtn" v-if="info.status!='committed'&&sellerId==info.sellerId" style="display: inline-block;">
					<!--<Button type="primary" @click="dlOk" :disabled="info.isSendParent==1 || info.htSign.isSignedSeller==1 || isDisable">下载预览</Button>
					<div class="sealbox">-->
						<!--<Button type="primary" @click="seal(1)" v-if="info.htSign.isSignedSeller!=1 || !isDisable" :disabled="info.status!='checked'">电子盖章</Button>
						<Button type="primary" @click="seal(0)" :disabled="info.status!='checked'" v-else>取消盖章</Button>-->
					<!--</div>
					<Button type="primary" @click="downLoad">下载正式</Button>-->
					<Button type="primary" @click="dlOk">下载合同</Button>
					<span v-if="0" @click="infoma=true"><Icon type="information-circled" color="#d79401" :size="24" style="vertical-align: middle;"></Icon></span>
					<Card class="dyinfo" :class="{hid:!infoma}" v-if="0">
						<p>打印失败？点击下方按钮下载PDF。<br/>（提示：您的下载记录将发送给管理员）</p>
						<p class="down">
							<Button type="primary" @click="">下载PDF</Button>
						</p>
						<span @click="infoma=false"><Icon type="close" class="close"></Icon></span>
					</Card>
				</div>
			</preview>
			<div class="btn" v-if="sellerId==info.sellerId">
				<Button type="primary" @click="promptly" v-if="info.status=='checked' ">立即签约</Button>
				<Button type="primary" @click="appointment" v-if="(info.status=='checked'|| info.status=='committed')" v-text="info.htSign.expectTime?'修改待签':'报待签'">报待签</Button>
				<Button type="primary" @click="accounting" v-if="(info.receiptStatus==0||info.rejectStatus==1) && (info.status=='signed'||info.status=='accounted')">{{info.rejectStatus=='1'?'重新报账':'立即报账'}}</Button>
				<Button type="primary" @click="fileModal" v-if="info.status!='committed'||info.status!='checked'" v-text="info.isArchived!=1?'立即存档':'修改存档'"></Button>
				<Button type="ghost" @click="offModal" v-if="info.status=='committed'||info.status=='checked'">关闭合同</Button>
			</div>

			<!--<Modal ref="sendModal" v-model="send" title="发送家长" width="730" class="send" @on-ok="sendAudit">
				<div>
					<Form>
						<FormItem label="家长邮箱" :label-width="86">
							<Input type="text" v-model="sendForm.email" class="widthMax">
							</Input>
						</FormItem>
						<FormItem label="发送理由" :label-width="86">
							<Input type="textarea" v-model="sendForm.reason" :rows="3" class="widthMax">
							</Input>
						</FormItem>
					</Form>
				</div>
			</Modal>-->
			<Modal ref="promModal" v-model="promModal" title="立即签约" width="730" class="promModal modal-form" @on-ok="promOk('promValidate')">
				<div>
					<Form ref="promValidate" :rules="promFormRule" :model="promForm" :label-width="120" class="formTrans">
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
								<v-select style="width: 150px;margin-right: 4px;display: inline-block;" placeholder="选择合作者" :listIndex="index" icon="chevron-down" v-model="item.partnerName" k='name' :datafunc="searchDropList1" @selected="textChange2"></v-select>
								<Input v-model="item.ratio" placeholder="选择分成比例" style="width: 114px;display: inline-block;">%
								</Input>
								<Button type="primary" @click="addProm" v-if="index==promForm.partners.length-1" class="inline mr10">添加</Button>
								<Button type="ghost" @click="delProm(index)" class="inline mr10">删除</Button>
							</div>
						</FormItem>
					</Form>
				</div>
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
			<Modal v-model="modalAccount" :title="info.rejectStatus=='1'?'重新报账':'立即报账'" width="1234" class-name="modalAccount modal-form vertical-center-modal">
				<div>
					<Form ref="formAccount" :rules="accountRule" :model="accountData" :label-width="114" class="formAccount">
						<div style="margin-bottom: 8px;">当前合同应收款 <span style="color: red;font-size: 16px;">{{this.cardPrice}}</span> 元。</div>
						<div v-for="(item,index) in htReceiptDetails" :key="item.id" style="overflow: hidden;" v-if="htReceiptDetails.length" class="oldNews">
							<FormItem :label="'第'+(index+1)+'次付款金额'" class="fl">
								<p class="width316">{{item.curReceipt}}&emsp;元</p>
							</FormItem>
							<FormItem label="付款方式" class="fr">
								<p class="width316">{{item.typeLabel}}</p>
							</FormItem>
							<FormItem label="收款账号" class="fl">
								<p class="width316">{{item.accountLabel}}</p>
							</FormItem>
							<FormItem :label="'付款时间'" class="fr">
								<p class="width316">{{item.receiptTime}}</p>
							</FormItem>
						</div>
						<div class="">
							<FormItem :label="'第'+(htReceiptDetails.length+1)+'次付款金额'" class="inline" prop="curReceipt">
								<Input v-model="accountData.curReceipt" type="text" style="width: 80px;"></Input>&emsp;元
							</FormItem>
							<FormItem label="付款方式" class="inline" prop="type" :label-width="84">
								<Select v-model="accountData.type" style="width:136px;">
									<Option :value="item.value" v-for="item in payment" :key="item.id">{{item.label}}</Option>
								</Select>
							</FormItem>
							<FormItem label="收款账号" class="inline" prop="account" :label-width="84">
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
							<FormItem label="收款时间" class="inline" :rules="item.planReceipt?{required: true,type:'date', message: '第'+(index+htReceiptDetails.length+2)+'次收款时间不能为空', trigger: 'change'}:[]" :required="item.planReceipt?true:false" :prop="item.planReceipt?'receiptPlans.' + index + '.planReceiptTime':''">
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
									<Upload ref="upload" name='files' :data="{'type':'ht_receipt','studentId':info.ecId,'dirName':'business','isOverride':0,'menuId':201}" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadToPan">
										<Button type="primary">点击上传</Button>
									</Upload>
									<p class="tips">* 文件最大为 2MB ( .png, .jpg )</p>
									<!--<div class="ivu-form-item-error-tip error_tips">{{imgErrorTips}}</div>-->
								</div>
							</div>
						</Form-item>
						<div class="p90">
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
					<Button type="primary" @click="accOk">确定</Button>
				</div>
			</Modal>
			<Modal v-model="modalFile" ref="modalFile" :title="info.isArchived!=1?'立即存档':'修改存档'" width="730" class="modalFile modal-form" @on-ok="archive">
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
										<span @click="delFile1(item.id,index)" style="color: #FF0000;cursor: pointer;margin-left: 24px;">
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
			<Modal v-model="modalOff" title="关闭合同" width="730" class="modalOff modal-form">
				<div style="text-align:center">
					<p class="cont">被关闭合同将不能签约，取消关闭后恢复使用。</p>
					<div class="modal-btn">
						<Button type="ghost" @click="modalOff=false">取消</Button>
						<Button type="primary" @click="closePact">确定</Button>
					</div>
				</div>
			</Modal>
			<Modal v-model="download" width="530" class="" @on-ok="dlOk">
				<div style="text-align:center;padding-top: 30px;">
					<h2>当前合同<span v-if="info.htSign.isSignedSeller==1 || isDisable">已</span><span v-else>未进行</span>电子盖章，确定下载<span v-if="info.htSign.isSignedSeller==1 || isDisable">有</span><span v-else>无</span>电子盖章的合同？</h2>
					<p style="font-size: 14px;">（如需下载<span v-if="info.htSign.isSignedSeller==1 || isDisable">无</span><span v-else>有</span>电子盖章的合同，请先<span v-if="info.htSign.isSignedSeller==1 || isDisable">取消</span><span v-else>对合同进行</span>电子盖章）</p>
					<!--<div class="modal-btn" style="margin-top: 30px;">
						<Button type="ghost" @click="download=false">取消</Button>
						<Button type="primary" @click="">确定</Button>
					</div>-->
				</div>
			</Modal>
		</div>
		<up-to-pan ref="uptopan1" :studentId="info.ecId" :object-id="info.id" :dir="''" type="ht_contract_scan" fileType="all" @uploadok="onUploadOk1" :detector="detector" :format="['jpg','jpeg','png','pdf']" dirName="business" v-if="info.id" />
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex';
	import preview from '../../../modules/preview.vue';
	import planBox from '../../../modules/planBox';
	import vSelect from "../../../modules/vSelect.vue";
	import upToPan from '../../../modules/planUpToPan';
	import valid, {
		errors,
		common,
		contract,
		choiceschool,
		htContractTpl,
		account,
		crmCustomerSale
	} from "../../../libs/request.js";
	let t;
	export default {
		data() {
			return {
				detector: {
					type: 'name',
					condition: '',
					content: ''
				},
				download: false,
				info: {
					htOptLogList: [],
					htPartnerList: [],
					htSign: {
						sellerOffice: {}
					},
					htContractItemList: [],
					attachments: []
				},
				modalFile: false,
				isUpload: true,
				isDisable: false,
				pdfInfo: {},
				accId: [],
				payment: [],
				infoma: false,
				modalOff: false,
				reason: '',
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
				modalAccount: false,
				bankList:[],
				accountData: {
					planId: '',
					curReceipt: '',
					type: '',
					id: '',
					account: '',
					bank:'',
					receiptPlans: [{
						planReceipt: '',
						planReceiptTime: '',
						isNotify: '1'
					}],
					receiptList: [],
					rejectBy: "",
					rejectDate:'',
					rejectReasons: ""
				},
				accountRule: {
					curReceipt: [{
						required: true,
						pattern: /^\d+\.{0,1}\d*$/,
						message: "必须为数字",
						trigger: 'blur'
					}, ],
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
				modalFile: false,
				fileData: {
					id: '2017BJ-G-VIP-001',
					scanUrl: '',
					scanlist: [],
					type: ''
				},
				send: false,
				sendForm: {
					disabledGroup: [],
					email: '',
					reason: '',
				},
				cardPrice: '',
				htReceiptDetails: [],
				oldPrice: 0,
				accountRemind: true,
			}
		},
		computed: {
			...mapGetters('sign', ['isCeo']),
			...mapState(['userInfo', 'appMenuList']),
			uploadToPan: function() {
				return common.uploadToPan();
			},
			sellerId() {
				if(this.userInfo) {
					return this.userInfo.id || '';
				}
			},
		},
		components: {
			preview,
			planBox,
			vSelect,
			upToPan
		},
		created() {
			let params = {
				id: this.$route.query.id
			}
			contract.form(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.info = res.data.data;
					this.sendForm.email = res.data.data.email;
					const ht = this.info.attachments.find(item => item.type == 'ht_contract');
					if(ht) {
						if(ht.status == '1') {
							this.pdfInfo = ht;
						} else {
							this.startPolling(ht.id);
						}
					}
				}
			}).catch(errors.call(this));
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
//			let params2 = {
//				type: 'ht_receipt_detail_account'
//			}
//			common.listData(params2).then(valid.call(this)).then(res => {
//				if(res.ok) {
//					this.accId = res.data.data;
//				}
//			}).catch(errors.call(this)).finally(() => {});

		},
		beforeDestroy() {
			this.stopPolling();
		},
		methods: {
			displayUrl(id) {
				return common.displayUrl(id);
			},
			getForm() {
				let params = {
					id: this.$route.query.id
				}
				contract.form(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.info = res.data.data;
						this.sendForm.email = res.data.data.email;
						//						const ht = this.info.attachments.find(item=>item.type=='ht_contract');
						//						if(ht){
						//							if(ht.status=='1'){
						//								this.pdfInfo = ht;
						//							} else{
						//								this.startPolling(ht.id);
						//							}
						//						}
					}
				}).catch(errors.call(this));

			},
			goEdit() {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						id: this.info.tplId,
						mid: this.info.id
					}
				})
			},
			startPolling(id) {
				t = setInterval(() => {
					common.convertForm(id).then(valid.call(this)).then(res => {
						if(res.ok && res.data.data) {
							this.pdfInfo = res.data.data;
							if(res.data.data.status == '1') {
								this.stopPolling();
							}
						}
					}).catch(errors.call(this));
				}, 5000)
			},
			stopPolling() {
				clearInterval(t)
			},
			downLoad() {
				this.download = true;
			},
			dlOk() {
				if(this.pdfInfo.objectId) {
					const durl = contract.downloadUrl(this.pdfInfo.objectId);
					this.download = false;
					window.open(durl);
				}
			},
			addpartner() {
				let obj = {
					people: '',
					shared: ''
				};
				let leng = this.promForm.partner.length;
				this.promForm.partner.splice(leng, 0, obj)
			},
			addReceipt() {
				let obj = {
					sum: '',
					time: ''
				};
				let leng = this.accountData.receipt.length;
				this.accountData.receipt.splice(leng, 0, obj)
			},
			handleFormatError: function() {
				this.$Message.error("需使用jpg、jpeg、png格式图片");
			},
			handleMaxSize: function() {
				this.$Message.error("图片大小不能超过2MB");
			},
			sendAudit() {
				this.$refs.sendModal.visible = true;
				this.send = true;
				let params = {
					ctId: this.info.id,
					email: this.sendForm.email,
					reason: this.sendForm.reason
				}
				contract.sendEmailAudit(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.send = false;
						this.info.isSendParent = 1;
					} else {
						this.$refs.sendModal.visible = true;
						this.send = true;
					}
				}).catch(errors.call(this));
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
			textChange2: function(val, ind) {
				this.$nextTick(() => {
					this.promForm.partners[ind].partnerId = val.id;
				})
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
						let arr = [];
						this.promForm.partners.forEach((v, k) => {
							arr.push(v);
						});
						arr.forEach((v, k) => {
							v.ratio = (v.ratio / 1e2).toFixed(2)
						});
						let params = {
							ctId: this.info.id,
							signPrice: (this.promForm.signPrice * 1e4).toFixed(4),
							no: this.promForm.no,
							signTime: (new Date(this.promForm.signTime)).format('yyyy-MM-dd hh:mm:ss'),
						}
						if(this.promForm.partners.length == 1 && this.promForm.partners[0].partnerId == '') {

						} else {
							params.partners = this.promForm.partners.length ? this.promForm.partners : []
						}
						contract.sign(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success({
									content: res.message
								});
								this.getForm();
							}
						}).catch(errors.call(this)).finally(() => {});
					} else {
						this.$refs.promModal.visible = true;
						this.promModal = true;
					}
				})
			},
			promptly() {
				this.promModal = true;
				let params = {
					ctId: this.info.id
				}
				contract.formSign(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.promForm.signTime = res.data.data.signTime;
						this.promForm.no = res.data.data.no;
						this.promForm.signPrice = parseFloat((res.data.data.signPrice / 1e4).toFixed(4));
						let params1 = {
							cusCode: this.info.ecId,
							status: 'sign'
						}
						if(this.info.ecId){
							crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
								if(res.ok) {}
							}).catch(errors.call(this));
						}
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
			appointment() {
				this.appoModal = true;
			},
			appok(name) {
				this.$refs[name].validate((ok) => {
					console.log(11111)
					if(ok) {
						let params = {
							ctId: this.info.id,
							expectTime: (new Date(this.appoForm.appoDate)).format('yyyy-MM-dd hh:mm:ss'),
							isNotify: this.appoForm.remind
						}
						contract.expect(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								let params1 = {
									cusCode: this.info.ecId,
									status: 'unsign'
								}
								if(this.info.ecId){
									crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
										if(res.ok) {
											this.appoModal = false;
											this.getForm();
										} else {
											this.$refs.appoModal.visible = true;
											this.appoModal = true;
										}
									}).catch(errors.call(this));
								}
							}
						}).catch(errors.call(this)).finally(() => {});
					} else {
						this.$refs.appoModal.visible = true;
						this.appoModal = true;
					}
				})
			},
			getAcc() {
				let params = {
					ctId: this.info.id
				}
				account.formAccounted(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.htReceiptDetails = res.data.data.htReceiptDetails;
						let oldPrice = 0;
						if(this.htReceiptDetails.length) {
							this.htReceiptDetails.forEach((v, k) => {
								let num;
								if(typeof v.factRecipot === 'number' && isFinite(v.factRecipot)) {
									num = v.factRecipot;
								} else {
									num = 0;
								}
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
						} else {
							this.accountData.receiptPlans = []
						}
						if(res.data.data.htReceiptDetail.receiptList.length) {
							this.accountData.receiptList = res.data.data.htReceiptDetail.receiptList;
						}
						this.accountData.id = res.data.data.htReceiptDetail.id;
						this.accountData.curReceipt = res.data.data.htReceiptDetail.curReceipt;
						this.accountData.rejectBy = res.data.data.htReceiptDetail.rejectBy;
						this.accountData.rejectDate = res.data.data.htReceiptDetail.rejectDate;
						this.accountData.rejectReasons = res.data.data.htReceiptDetail.rejectReasons;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			accOk() {
				this.$refs.formAccount.validate((ok) => {
					if(ok) {
						let sum = 0;
						this.accountData.receiptPlans.forEach((v, k) => {
							sum += Number(v.planReceipt) || 0;
							v.planReceiptTime = (new Date(v.planReceiptTime)).format('yyyy-MM-dd hh:mm:ss');
						})
						if(Number(this.cardPrice) == Number(this.oldPrice) + Number(this.accountData.curReceipt) + Number(sum)) {

							let params = this.accountData;
							params.ctId = this.info.id;
							let arr = [];
							params.receiptPlans.forEach((v, k) => {
								if(v.planReceipt) {
									arr.push(v)
								}
							});
							params.receiptPlans = arr;
							account.accounted(params).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.$Message.success(res.data.message);
									this.modalAccount = false;
									this.getForm();
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
			accounting() {
				this.modalAccount = true;
				this.cardPrice = this.info.htSign.signPrice
				if(!!this.accountData.curReceipt) {
					this.accountData.curReceipt = val.htSign.signPrice;
				}
				this.getAcc();
			},
			delFile(id, ind) {
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
			addReceipt() {
				let obj = {
					planReceipt: '',
					planReceiptTime: '',
					isNotify: '0'
				};
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
					//						isNotify: '0'
					//					};
					//					this.accountData.receiptPlans.splice(0, 1, obj)
				}
			},
			handleSuccess: function(data) {
				if(data.status == "success") {
					this.$Message.success(data.message);
					let length = this.accountData.receiptList.length;
					this.accountData.receiptList.splice(length, 0, data.data);
					this.$refs.formAccount.validateField('receiptList')
					console.log(this.accountData)
				} else {
					this.$Message.error(data.message);
				}
			},
			handleFormatError2: function() {
				this.$Message.error("需使用'jpg','jpeg','png','pdf'格式");
			},
			handleMaxSize: function() {
				this.$Message.error("图片大小不能超过2MB");
			},
			fileModal(val) {
				this.modalFile = true;
				this.fileData.id = this.info.no;
				this.formArchive();
			},
			formArchive() {
				let params = {
					id: this.info.id
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
			delFile1(id) {
				if(id) {
					let params = {
						'id': id
					}
					common.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.formArchive();
						}
					}).catch(errors.call(this));
				} else {
					this.formArchive();
					this.fileData.scanUrl = '';
					this.isUpload = false;
				}
			},
			archive() {
				let params={
					id:this.info.id
				}
				contract.archive(params).then(valid.call(this)).then(res => {
					if(res.ok) {
							this.$refs.modalFile.visible = false;
							this.modalFile = false;
					}else{
							this.$refs.modalFile.visible = true;
							this.modalFile = true;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			offModal() {
				this.modalOff = true;
			},
			closePact() {
				let params = {
					id: this.info.id
				}
				contract.closeContract(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.modalOff = false;
						let params = {
							id: this.$route.query.id
						}
						contract.form(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.info = res.data.data;
								this.sendForm.email = res.data.data.email;
								const ht = this.info.attachments.find(item => item.type == 'ht_contract');
								if(ht) {
									if(ht.status == '1') {
										this.pdfInfo = ht;
									} else {
										this.startPolling(ht.id);
									}
								}
							}
						}).catch(errors.call(this));
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			seal(val) {
				let params = {
					id: this.$route.query.id,
					htSign: {
						isSignedSeller: val
					}
				}
				contract.seal(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$refs.pdfview.reloadPdf();
						this.$Message.success(res.data.message);
						this.isDisable = val == 1 ? true : false;
						let params = {
							id: this.$route.query.id
						}
						contract.form(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.info = res.data.data;
								this.sendForm.email = res.data.data.email;
								const ht = this.info.attachments.find(item => item.type == 'ht_contract');
								if(ht) {
									if(ht.status == '1') {
										this.pdfInfo = ht;
									} else {
										this.startPolling(ht.id);
									}
								}
							}
						}).catch(errors.call(this));
					}
				}).catch(errors.call(this));
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
			accountChange(id){
				this.accountData.bank='';
				let arr=[];
				this.accId.forEach((v,k)=>{
					if(id==v.id){
						arr.push({accountBank:v.accountBank,id})
					}
				})
				this.bankList=arr;
			}
		}
	}
</script>