<style lang="less">
	.pact {
		width: 100%;
		.filter {
			font-size: 14px;
			li {
				list-style: none;
				margin-bottom: 5px;
				.analyseBarFilter .titleBar span:first-child {
					margin-right: 7px !important;
					width: 80px;
				}
			}
			.country {}
		}
		.compact_main {
			width: 100%;
			padding: 10px 0;
			margin-top: 82px;
			position: relative;
			overflow: visible;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			dl {
				dt {
					.card {
						width: 226px;
						height: 118px;
						display: inline-block;
						position: relative;
						margin: 10px;
						background: url(../../../assets/library/cardBg.png) no-repeat 166px 62px;
						border-radius: 5px;
						&.violet {
							background-color: #7583df;
						}
						&.blue {
							background-color: #428fdf;
						}
						&.orange {
							background-color: #e6892a;
						}
						&.green {
							background-color: #4ec289;
						}
						&.pink {
							background-color: #ec4763;
						}
						.ivu-card-body {
								background-color: initial;
							.card-cont {
								width: 150px;
								height:66px;
								line-height: 1.5em;
								position: relative;
								opacity: 1;
								padding: 4px 0px 0px 4px;
								font-size: 14px;
								color: #fff;
								display: -webkit-box;
								overflow: hidden;
								background-color: inherit;
							&.violet {
								background-color: #7583df;
							}
							&.blue {
								background-color: #428fdf;
							}
							&.orange {
								background-color: #e6892a;
							}
							&.green {
								background-color: #4ec289;
							}
							&.pink {
								background-color: #ec4763;
							}
								&::after {
									content: "...";
									font-weight: bold;
									position: absolute;
									bottom: 0;
									right: 0;
									padding-right: 4px;
									background-color: inherit;
								}
								.card-tit {
									margin-bottom: 12px;
								}
							}
						}
						.card-shade {
							display: none;
							position: absolute;
							top: 0;
							left: 0;
							border-radius: 5px;
							width: 226px;
							height: 118px;
							background: rgba(0, 0, 0, 0.6);
							line-height: 118px;
							text-align: center;
							.btn-box {
								line-height: 118px;
								text-align: center;
								button {
									margin: 0 8px;
								}
							}
							.btn-box1 {
								line-height: 118px;
								text-align: center;
								button {
									margin: 0 2px;
								}
							}
							button {
								font-size: 16px;
								span {
									vertical-align: middle;
								}
								&.create-compact {
									width: 114px;
								}
							}
						}
						&:hover .card-shade-active {
							display: block;
						}
					}
				}
				dd {
					padding-left: 24px;
					span {
						color: #44bcb7;
						&.red {
							color: #ff0000;
						}
					}
				}
			}
			.add {
				width: 100%;
				position: absolute;
				top: -82px;
				left: 0;
				line-height: 42px;
				text-align: left;
				.coad-num {
					padding: 0 0px;
					font-size: 14px;
					b {
						font-weight: normal;
						font-size: 18px;
						color: #44bcb7;
					}
				}
				button {
					float: right;
					margin-right: 10px;
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
	}
	
	.modal-add {
		.formModal {
			.analyseBarFilter .titleBar span:first-child {
				display: inline-block;
				text-align: right;
				color: #495060;
			}
			overflow: auto;
			padding: 10px 14px 10px 0px;
			.width330 {
				width: 330px;
			}
			.width380 {
				width: 380px;
			}
			.width266 {
				width: 266px;
			}
			.widthMax {
				width: 100%;
			}
			.ivu-form-item {
				.ivu-input {
					background: #fff;
					color: #212121;
					font-size: 14px;
				}
				.ivu-input:hover {
					background: #fff;
				}
				.ivu-select-placeholder {
					color: #b3b3b3;
				}
				.ivu-select-selection {
					background: #fff;
				}
			}
			.langlabel {
				.ivu-form-item-label {
					padding: 5px 12px 0 0px;
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
				label {
					line-height: 70px;
				}
				.uploadBox {
					position: relative;
					padding: 5px 0px;
					.tips {
						color: #999899;
						font-size: 12px;
						margin-top: 10px;
					}
					.inline {
						display: inline-block;
					}
					.error_tips {
						top: 85%;
					}
				}
			}
			.logo {
				.ivu-form .logoBox .uploadBox .tips {
					line-height: 1em;
					margin-top: 20px;
				}
				.ivu-form-item-content {
					line-height: 1em;
				}
			}
			.limit {
				margin-top: 14px;
				span {
					color: #999999;
				}
			}
			.fileName {
				position: relative;
				display: inline-block;
				span {
					position: absolute;
					bottom: -18px;
					right: 12px;
					line-height: 32px;
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
	}
	
	.del-modal {
		.tit {
			color: #222222;
		}
		.cont {
			font-size: 18px;
			height: 190px;
			padding-top: 34px;
			text-align: center;
			.name {
				color: #e8352c;
			}
			.button {
				margin-top: 45px;
				button {
					width: 122px;
					height: 34px;
				}
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
	/*.tally-modal {
		.filter {
			font-size: 14px;
			li {
				margin-bottom: 10px;
			}
			.country {}
		}
	}*/
	
	.modal-policy {
		.ivu-modal-footer {
			border: none;
		}
		.title {
			height: 40px;
			background-color: #fafafa;
			border-bottom: solid 1px #e0e0e0;
			font-size: 16px;
			text-align: center;
			line-height: 40px;
		}
		.policy-content {
			display: flex;
			justify-content: space-between;
			.right,
			.center,
			.left {
				width: 246px;
				height: 248px;
				border: solid 1px #e0e0e0;
				position: relative;
				.btn {
					width: 100%;
					padding: 8px;
					position: absolute;
					bottom: 0;
					text-align: right;
				}
			}
			.right_contnet {
				padding: 8px 0;
				position: absolute;
				top: 40px;
				bottom: 32px;
				overflow: auto;
				text-align: center;
				button {
					width: 106px;
					margin: 6px;
				}
			}
			.left_content {
				padding: 8px 0;
				text-align: center;
				position: absolute;
				top: 40px;
				bottom: 32px;
			}
		}
	}
</style>

<template>
	<div class="pact">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="输入合同名称" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<ul class="filter">
			<li v-if="isAdmin || isLawer||isHeaderOfficeLeader || isCeo">
				<v-search-options :data="carte.options" byKey="label" :searchTitle="carte.tit" titColor="#b8b8b8" @on-select-item="carteChange" labelWidth="80" style="margin-top: 10px;">
				</v-search-options>
				<v-search-options :data="genre.options" byKey="label" :searchTitle="genre.tit" titColor="#b8b8b8" @on-select-item="genreChange" labelWidth="80" style="margin-top: 10px;" v-show="genre.options.length">
				</v-search-options>
			</li>
			<li>
				<case-bar-filter :from="2" menuId="201" @tagListChange="tagListChange" modelName="合同管理" align="right" :width="70">
				</case-bar-filter>
			</li>
		</ul>
		<div class="compact_main">
			<p class="add">
				<span class="coad-num">当前总合同数<b>&nbsp;{{count}}&nbsp;</b>个</span>
				<Button type="primary" v-if="isAdmin || isLawer||isHeaderOfficeLeader" @click="redact('添加主合同')">添加主合同</Button>
				<btnlist :btn="btnItem">
					<span slot='url' style="margin-left: 12px;">合同库-列表</span>
				</btnlist>
			</p>
			<dl v-for="(item,index) in cardList" :key="index">
				<dt>
					<Card class="card" :style="{backgroundColor:item.color}">
				        <div class="card-cont">
				        	<!--<p class="card-tit">{{item.type}}</p>-->
				        	<p class="card-name">{{item.name}}</p>
				        </div>
				        <div class="card-shade card-shade-active">
				        	<div class="btn-box1" v-if="isAdmin || isLawer||isHeaderOfficeLeader">
				        		<Button type="primary" size="large" shape="circle" @click="redact('编辑主合同',item.id)">编辑</Button>
				        		<Button type="primary" size="large" shape="circle" @click="del(item.id,item.name)">删除</Button>
				        		<Button type="primary" size="large" shape="circle" @click="preview(item.id)">预览</Button>
				        	</div>
				        	<div class="btn-box" v-else>
				        		<Button type="primary" size="large" shape="circle" @click="gotoCreate(item)" v-if="item.companyIds.indexOf(company)!=-1">生成</Button>
				        		<Button type="primary" size="large" shape="circle" @click="preview(item.id)">预览</Button>
				        	</div>
				        </div>
				    </Card>
				</dt>
				<dd v-if="isAdmin || isLawer||isHeaderOfficeLeader">
					<p>生产<span>&nbsp;{{item.generatingCount}}&nbsp;</span>份&emsp;签约<span>{{item.signCount}}</span>份</p>
					<p>签约总金额 <span class="red">&nbsp;<b v-text="!!item.priceSum?parseFloat((Number(item.priceSum)/1e4).toFixed(4)):0"></b>&nbsp;</span>万元</p>
				</dd>
			</dl>
		</div>
		<Modal ref="addModal" v-model="addModal" :title="compactTit" width="730" class="modal-add" @on-ok="rulesSubmit('formModal')" @on-cancel="clearForm" :mask-closable="false">
			<div>
				<Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="112" class="formModal">
					<FormItem label="合同名称" prop='name' class="widthMax fl">
						<Input v-model="formModal.name" placeholder="" type="text" class="width266"></Input>
					</FormItem>
					<FormItem label="对外名称" prop='externalName' class="widthMax fl">
						<Input v-model="formModal.externalName" placeholder="" type="text" class="width266"></Input>
					</FormItem>
					<FormItem label="合同原价" prop='price' class="widthMax fl">
						<Input v-model="formModal.price" type="text" class="width266"></Input>&nbsp;万元
					</FormItem>
					<FormItem label="适用分公司" required prop='companyIds' class="fr widthMax">
						<Select multiple v-model="companyId" class="width266" @on-change="companyIdStr">
							<Option v-for="item in account" :value="item.id" :key="item.id" :disabled="disable.indexOf(item.id)>-1?true:false">{{ item.accountName }}</Option>
						</Select>
					</FormItem>
					<FormItem label="合同类型" prop='contractType' class="widthMax fl">
						<Cascader :data="moldData" v-model="formModal.contractType" class="width266"></Cascader>
					</FormItem>
					<FormItem label="合同标签" prop='htTagList' required class="fl ">
						<!--<p v-text="formModal.htTagList"></p>-->
						<!--<p style="padding-left: 38px;">-->
							<!--<span style="
								content: '*';
								display: inline-block;
								margin-right: 4px;
								line-height: 1;
								font-family: SimSun;
								font-size: 12px;
								color: #ed3f14;">*</span>-->
							<tag-module :hasSelected="tally" modelName="合同管理" pid="201" title="" :isPact="true" @getTagName="tallyOk" style="display: inline-block;" :style="{
                        color: '#b8b8b8',
                        display: 'inline-block',
                        textAlign: 'right',
                        width: '0px'
                    }">
							</tag-module>
						<!--</p>-->
						<!--<Select v-model="formModal.tally">
						<Button type="ghost" @click="selectTally">选择合同标签</Button>-->
					</FormItem>
					<Form-item label="样本合同" prop="contentFile" class="widthMax fl">
						<div class="infoList logoBox clearfix">
							<div>
								<i-input v-model="formModal.contentFile" v-show="false"></i-input>

								<p class="fileName" v-show="!!formModal.attachments.length" v-for="item in formModal.attachments" :key="item.id">
									<a href="javascript:void(0)" v-text="!!item.fileName?item.fileName.substr(item.fileName.lastIndexOf('/')+1):''"></a>
									<span @click="delFile(item.id)">
							              	删除
							        </span>
								</p>
								<p style="" v-show="!!!formModal.attachments.length">文件名</p>
							</div>
							<div class="uploadBox">
								<i-input v-model="formModal.contentFile" v-show="false"></i-input>
								<Upload ref="upload" name="files" :data="{'type':'ht_contract_tpl','dirName':'business','isOverride':1,'menuId':201}" :show-upload-list="false" :on-success="handleSuccess" :before-upload="upload" :format="['docx']" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadToPan">
									<Button type="primary">点击上传</Button>
								</Upload>
								<p>（请上传.docx格式）</p>
							</div>
						</div>
					</Form-item>
					<Form-item label="合同展示颜色" prop="color" class="logo fl">
						<ColorPicker v-model="formModal.color" recommend />
					</Form-item>
					<Form-item label="是否限定使用人" prop="limitScope" class="logo fl widthMax">
						<div style="line-height: 32px;">
							<RadioGroup v-model="formModal.isLimitScope" @on-change="peopleChoose(formModal.isLimitScope)">
								<Radio label="1">是</Radio>
								<Radio label="0">否</Radio>
							</RadioGroup>
						</div>
					</Form-item>
					<Form-item label="是否免审" prop="isAudit" class="logo fl widthMax">
						<div style="line-height: 32px;">
							<RadioGroup v-model="formModal.isAudit" @on-change="">
								<Radio label="1">是</Radio>
								<Radio label="0">否</Radio>
							</RadioGroup>
						</div>
					</Form-item>
					<Form-item label="是否限定优惠政策" prop="isPolicy" class="logo fl widthMax">
						<div style="line-height: 32px;">
							<RadioGroup v-model="formModal.isPolicy" @on-change="addDiscountsMoadl(formModal.isPolicy)">
								<Radio label="1">是</Radio>
								<Radio label="0">否</Radio>
							</RadioGroup>
						</div>
					</Form-item>
				</Form>
			</div>
		</Modal>
		<Modal v-model="delModal" width="740" class-name="del-modal">
			<p slot="header" class="tit">
				<span>删除合同</span>
			</p>
			<div class="cont">
				<p>您确定要删除 <span class="name">&nbsp;{{selectCard}}&nbsp;</span>吗？</p>
				<div class="button">
					<Button type="error" size="large" @click="delCard">确定</Button>
					<Button type="ghost" size="large" @click="offModal">取消</Button>
				</div>
			</div>
		</Modal>
		<!--<Modal v-model="tallyModal" width="730" class-name="tally-modal" @on-ok="tallyOk" @on-cancel="tallyClose">
			<p slot="header" class="tit">
				<span>选择合同标签</span>
			</p>
			<div>
				<ul class="filter">
					<li v-for="(item,index) in pactTags">
						<v-search-options multiple :toSelect="tally" :data="item.children" byKey="title" :parentId="item.id" :searchTitle="item.title" labelWidth="80" @on-select-item="pullTally"></v-search-options>
					</li>
				</ul>
			</div>
		</Modal>-->
		<Modal width="750" class-name="modal-policy" title="添加优惠政策" v-model="showAddDiscounts" @on-ok="addDiscounts" @on-cancel="offDiscounts">
			<div class="policy-content">
				<div class="right">
					<div class="title">
						优惠政策
					</div>
					<div class="right_contnet">
						<Button :type="btnActiveIndex.indexOf(item.id)!=-1? 'primary':'ghost'" v-for="(item,index) in policyList" :key="index" @click="showDiscountItem(item.id)">{{item.name}}</Button>
					</div>
				</div>
				<div class="center">
					<div class="title">
						待添加优惠项目
					</div>
					<div class="left_content">
						<CheckboxGroup v-model="checkAllGroup">
							<Checkbox :label="item.id" v-for="(item,index) in checkGroupList" :key="index" v-if="btnActiveIndex.indexOf(item.policyId)!=-1 && checkedAllGroup.indexOf(item.id)==-1">{{item.name}}</Checkbox>
						</CheckboxGroup>
					</div>
					<div class="btn">
						<Button type="ghost" @click="addGroup">添加 ></Button>
					</div>
				</div>
				<div class="left">
					<div class="title">
						已添加优惠项目
					</div>
					<div class="left_content">
						<CheckboxGroup v-model="checkedGroup" @on-change="checkedGroupChange">
							<Checkbox :label="item.id" v-for="(item,index) in checkedGroupList" :key="index">{{item.name}}</Checkbox>
						</CheckboxGroup>
					</div>
					<div class="btn">
						<Button type="ghost" @click="delGroup">< 移除</Button>
					</div>
				</div>
			</div>
		</Modal>
		<role-people ref="rolepeople" :selected="formModal.limitScope" @fresh="offrole"></role-people>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="20" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange" :page-size-opts="[20,50,80,100]"></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapMutations, mapGetters, mapState } from 'vuex';
	import vSearchOptions from "../../../modules/vSearchOptions";
	import vSelect from "../../../modules/vSelect.vue";
	import rolePeople from "../../../modules/rolePeople.vue";
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import tagModule from "@public/modules/tagModule.vue";
	import { toWan, waitUntil } from '../../../libs/util';
	import upToPan from '../../../modules/planUpToPan';
	import valid, {
		errors,
		common,
		htTag,
		htContractTpl,
		htPolicy
	} from "../../../libs/request.js";

	import btnlist from "../../receipt/btnlist.vue";
	//const route = 'sign.index'; // 签约的顶级路由
	export default {
		data() {
			const validateGrade = (rule, value, callback) => {
				if(!this.formModal.accounts.length) {
					callback(new Error('不能为空'));
				} else {
					callback();
				}
			};
			const validateTag = (rule, value, callback) => {
				if(!this.formModal.htTagList.length) {
					callback(new Error('不能为空'));
				} else {
					callback();
				}
			};
			return {
				page: 1,
				pageSize: 20,
				carteId:'',
				carte:{
					options:[{
						label:'全部',
						id:'',
					}],
					tit:'合同菜单'
				},
				genre:{
					options:[],
					tit:'合同类型'
				},
				moldData:[],
				genreId:'',
				btnItem: [{
						cont: ''
					},
					{
						cont: ''
					},
					{
						cont: ''
					},
					{
						cont: ''
					}
				],
				activeId: '',
				isEdit: false,
				compact: '',
				companyIds: '',
				tags: [],
				account: [],
				compactTit: '',
				addModal: false,
				delModal: false,
				disable: [],
				selectCard: '美国高中留学服务合同#2',
				count: 0,
				//				tallyModal: false,
				showAddDiscounts: false,
				checkedGroup: [],
				checkAllGroup: [],
				checkedAllGroup: [],
				checkedGroupList: [],
				policyList: [],
				checkGroupList: [],
				btnActiveIndex: [],
				companyId: [],
				formModal: {
					type: '',
					contractType:[],
					name: '',
					externalName:'',
					id: '',
					price: '',
					companyIds: '',
					contentFile: '',
					htTagList: [],
					color: '#F06292',
					accounts: [],
					limitScope: '',
					isLimitScope: 0,
					attachments: [],
					isAudit: 0,
					isPolicy: 0,
					htTplItemList: []
				},
				formModal1: {
					type: '',
					contractType:[],
					name: '',
					externalName:'',
					id: '',
					price: '',
					companyIds: '',
					htTagList: [],
					contentFile: '',
					color: '#F06292',
					accounts: [],
					limitScope: '',
					isLimitScope: 0,
					attachments: [],
					isAudit: 0,
					isPolicy: 0,
					htTplItemList: []
				},
				ruleModal: {
					companyIds: [{
						validator: validateGrade,
						trigger: 'click'
					}],
					htTagList: [{
						validator: validateTag,
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: "不能为空",
						trigger: 'blur'
					}],
					externalName: [{
						required: true,
						message: "不能为空",
						trigger: 'blur'
					}],
					price: [{
						required: true,
						pattern: /^\d+\.{0,1}\d*$/,
						max: 6,
						message: "必须为数字",
						trigger: 'blur'
					}, ],
					contractType:[{
						required: true,
						type:'array',
						message: "不能为空",
						trigger: 'change'
					}],
				},
				tally: [],
				cardList: [],
				compactType: [
					'咨询服务', '课程', '活动', '培训合同', '渠道合同', '采购合同', '校代合同'
				]
			}
		},
		computed: {
			...mapGetters('sign', ['isAdmin','isLawer', 'isCeo','isHeaderOfficeLeader']),
			...mapState(['userInfo', 'appMenuList']),
			uploadImg: function() {
				return common.uploadImg();
			},
			uploadToPan: function() {
				return common.uploadToPan();
			},
			company() {
				if(this.userInfo) {
					return this.userInfo.companyId || '';
				}
			},
		},
		components: {
			vSelect,
			vSearchOptions,
			rolePeople,
			btnlist,
			caseBarFilter,
			tagModule,
			upToPan
		},
		created() {
			let params={
				type:'contract_type',
			};
			common.listData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr=res.data.data;
					arr.forEach(v=>{
						v.id=v.value||'';
					})
					arr.unshift({label:'全部',id:''});
					this.carte.options = arr;
				}
			}).catch(errors.call(this));
			
			common.buildSimpleTree({type:'contract_type'}).then(valid.call(this)).then(res => {
				if(res.ok) {
					let arr=res.data.data.children;
					this.moldData = arr;
				}
			}).catch(errors.call(this));
			htContractTpl.listAccount().then(valid.call(this)).then(res => {
				if(res.ok) {
					this.account = res.data.data;
				}
			}).catch(errors.call(this));
			this.list();
			htPolicy.list().then(valid.call(this)).then(res => {
				if(res.ok) {
					this.policyList = res.data.data;
					let arr1 = [];
					this.policyList.forEach((v, k) => {
						arr1 = arr1.concat(v.htItemList);
					})
					this.checkGroupList = arr1;
				}
			}).catch(errors.call(this));
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			list() {
				this.updateLoadingStatus({isLoading:true});
				let arr = []
				this.tags.forEach((v, k) => {
					if(v.childTags.length) {
						arr.push(v);
					}
				});
				let params = {
					"tags": arr,
					"name": this.compact,
					"type": this.genreId,
					'pageNo': this.page,
					'pageSize': this.pageSize,
					'parentType':this.carteId
				};
				htContractTpl.list(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.count = res.data.data.count;
						this.cardList = res.data.data.list;
					}
				}).catch(errors.call(this)).finally(()=>{
					this.updateLoadingStatus({isLoading:false});
				});
			},
			offrole(val) {
				let arr = val.map(item => item.id);
				this.formModal.limitScope = arr.length ? arr.join(',') : '';
				console.log(this.formModal.limitScope)
			},
			redact(val, tit) {
				this.tally = [];
				this.addModal = true;
				this.compactTit = val;
				this.companyId = [];
				this.$refs.formModal.resetFields();
				for(let i in this.formModal) {
					for(let k in this.formModal1) {
						if(i == k) {
							this.formModal[i] = this.formModal1[k];
						}
					}
				}
				if(!!tit) {
					this.isEdit = true;
					let params = {
						id: tit
					}
					this.activeId = tit;
					htContractTpl.form(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							let list = res.data.data;
							if(!list.contractType){
								list.contractType=[];
							}
							for(var i in this.formModal) {
								for(var k in list) {
									if(i == k) {
										this.formModal[i] = list[k];
									}
								}
							}
							this.formModal.attachments = this.formModal.attachments.filter(item => item.type == 'ht_contract_tpl');
							this.formModal.contractType = [list.parentType];
							let arr = [];
							this.formModal.accounts.forEach((v, k) => {
								arr.push(v.id);
							});
							this.companyId = arr;
							this.companyIdStr();
							//							this.tally.forEach((v, k) => {
							let arr1 = [];
							//								this.formModal.htTagList.forEach((val, key) => {
							//									if(v.id == val.parentId) {
							//										arr1.push({
							//											id: val.id,
							//											title: val.name
							//										})
							//									}
							//								});
							//								v.childTags = arr1;
							//							})

							this.formModal.htTagList.forEach((val, key) => {
								arr1.push(val.id)
							});
							this.tally = arr1;
							let limitArr = [];
							this.formModal.limitScope.split(',').forEach((v, k) => {
								if(v != '') {
									limitArr.push(v)
								}
							});
							this.formModal.limitScope = limitArr.join(',');
							let GroupArr = [];
							this.checkGroupList.forEach((v, k) => {
								this.formModal.htTplItemList.forEach((val, key) => {
									//									if(v.id==val.itemId)	console.log(v.id+'|'+val.itemId)
									if(v.id == val.itemId) {
										GroupArr.push(v);
										this.checkAllGroup.push(v.id);
										this.checkedAllGroup.push(v.id);
									}
								});
							});
							this.checkedGroupList = GroupArr;
							this.formModal.price = parseFloat((this.formModal.price / 1e4).toFixed(4));
							console.log(this.formModal.htTagList)
							
						}
					}).catch(errors.call(this));
				} else {
					let arr = [];
					this.tally = arr;
					//					this.tally.forEach((v) => {
					//						v.childTags.forEach((val) => {
					//							arr.push({
					//								parentId: v.id,
					//								id: val.id,
					//								name: val.title
					//							})
					//						})
					//					});
					this.formModal.htTagList = arr;
				}

			},
			del(val, name) {
				this.delModal = true;
				this.activeId = val;
				this.selectCard = name;
			},
			gotoCreate(item) {
				//跳转
				const query = {
					id: item.id
				};
				if(this.$route.query.cusCode) {
					query.cusCode = this.$route.query.cusCode;
				}
				this.$router.push({
					name: 'sign.contractGeneration',
					query
				});
			},
			companyIdStr(val) {
				var officeId = [];
				let disable = [];
				let accounts = [];
				this.account.forEach((v, k) => {
					if(this.companyId.indexOf(v.id) > -1) {
						officeId.push(v.officeId);
						accounts.push(v);
					}
				})
				this.account.forEach((v, k) => {
					if(officeId.indexOf(v.officeId) > -1 && this.companyId.indexOf(v.id) == -1) {
						disable.push(v.id);
					}
				})
				this.formModal.accounts = accounts;
				this.disable = disable;
				//				this.$refs.formModal.validateField('companyIds')
				//				this.formModal.companyIds=this.companyId.map(item=>{return item}).join(',');
			},
			preview(id) {
				this.$emit("jump", 'sign.preview', 0, id)
			},
			pageChange(val) {
				this.page = val;
				this.list();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.list();
			},
			peopleChoose(item) {
				if(item == 1) {
					this.$nextTick(() => {
						this.$refs.rolepeople.show();
					});
				}
				console.log()
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			tallyOk(item) {
				if(item.length){
					console.log(item)
					this.formModal.htTagList = item;
					this.$refs.formModal.validateField('htTagList')
				}
			},
			//			tallyClose() {
			//				this.tally = this.tally2;
			//			},
			textChange: function(val) {
				this.$nextTick(() => {
					this.list();
				})
			},
			delFile(val) {
				console.log(val)
				if(val) {
					let params = {
						'id': val
					}
					common.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.formModal.attachments = [];
							this.formModal.contentFile = '';
						}
					}).catch(errors.call(this));
				}
			},
			handleSuccess: function(data) {
				if(data.status == "success") {
					this.$Message.success(data.message);
					this.formModal.attachments = [data.data];
					this.formModal.contentFile = data.data.filePath;
				} else {
					this.$Message.error(data.message);
				}
				this.updateLoadingStatus({isLoading:false});
			},
			handleFormatError: function() {
				this.$Message.error("需使用docx格式");
			},
			handleMaxSize: function() {},
			rulesSubmit: function(name) {
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						let money = (this.formModal.price * 1e4).toFixed(2);
						money = String(money);
						if(money.indexOf('.') != -1) {
							money.substring(0, money.indexOf('.'));
						}
						this.formModal.price = money;
						let params = this.formModal;
						params.parentType = this.formModal.contractType.length&&this.formModal.contractType[0];
						htContractTpl.save(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.addModal = false;
								this.disable = [];
								//								this.tally = this.tally2;
								this.list();
							} else {
								this.$refs.addModal.visible = true;
								this.addModal = true;
								this.formModal.price = parseFloat((money / 1e4).toFixed(2));
							}
						}).catch(errors.call(this));
					} else {
						this.$refs.addModal.visible = true;
						this.addModal = true;
					}
				})
			},
			clearForm() {
				this.isEdit = false;
				this.disable = [];
			},
			delCard() {
				let params = {
					id: this.activeId
				}
				htContractTpl.delete(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success('删除成功!');
						this.list();
					}
				}).catch(errors.call(this));
				this.delModal = false;
			},
			offModal() {
				this.delModal = false;
			},
			//			selectTally() {
			//				this.tallyModal = true;
			//			},
			addGroup() {
				let arr = [];
				let arr1 = [];
				this.checkGroupList.forEach((v, k) => {
					if(this.checkAllGroup.indexOf(v.id) != -1) {
						arr.splice(0, 0, v);
					}
				});
				this.checkAllGroup.forEach((v, k) => {
					arr1.splice(0, 0, v);
				});
				this.checkedAllGroup = arr1;
				this.checkedGroupList = arr;
			},
			delGroup() {
				let arr = [];
				let arr1 = [];
				let arr2 = [];
				this.checkedGroupList.forEach((v, k) => {
					if(this.checkedGroup.indexOf(v.id) == -1) {
						let leng = arr.length;
						arr.splice(leng, 0, v);
						arr1.splice(leng, 0, v.id);
					}
				});
				this.checkAllGroup.forEach((v, k) => {
					if(this.checkedGroup.indexOf(v) == -1) {
						let leng = arr2.length;
						arr2.splice(leng, 0, v);
					}
				});

				this.checkedGroup = [];
				this.checkedAllGroup = arr1;
				this.checkAllGroup = arr2;
				this.checkedGroupList = arr;
			},
			/*添加优惠政策*/
			addDiscounts() {
				//接口
				this.formModal.htTplItemList = this.checkedGroupList.map(item => {
					return {
						itemId: item.id,
						policyId: item.policyId
					}
				});
			},
			offDiscounts() {
				this.checkedGroup = [];
				this.checkedAllGroup = [];
				this.checkAllGroup = [];
				this.checkedGroupList = [];
			},
			addDiscountsMoadl(item) {
				if(item == 1) {
					this.showAddDiscounts = true;
				}
			},
			showDiscountItem(ind) {
				if(this.btnActiveIndex.indexOf(ind) != -1) {
					let index = this.btnActiveIndex.indexOf(ind);
					this.btnActiveIndex.splice(index, 1);
				} else {
					let length = this.btnActiveIndex.length;
					this.btnActiveIndex.splice(length - 1, 0, ind);
				}
			},
			checkedGroupChange() {

			},
			//筛选标签变化
			tagListChange(tags) {
				console.log(tags);
				this.tags = tags;
				this.pageNo = 1;
				this.list();
			},
			carteChange(val){
				this.carteId=val||'';
				if(val){
					let params={
						type:val,
					};
					common.listData(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							let arr=res.data.data;
							arr.forEach(v=>{
								v.id=v.value;
							});
							this.genre.options = arr;
						}
					}).catch(errors.call(this));
				}else{
					this.genreId='';
					this.genre.options=[];
				}
				this.list();
			},
			genreChange(val){
				this.genreId=val;
				this.list();
			},
			upload(){
				this.updateLoadingStatus({isLoading:true});
			}
		}
	}
</script>