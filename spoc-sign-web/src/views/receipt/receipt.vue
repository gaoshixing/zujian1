<style lang="less">
	.receipt{
		.tabs{
			.ivu-tabs-tab{
				font-size: 14px;
			}
		}
		.ivu-table-wrapper{
			border: none;
		}
		.ivu-table:after{
			display: none;
		}
		.ivu-table-column-center{
			background: #fff;
		}
		.filterDw{
			.mb12{
				margin-bottom: 12px;
			}
			.form{
				.ivu-form-item-content{
					line-height: 22px;
				}
				.ivu-form-item{
					margin-bottom: 14px;
					.ivu-form-item-label{
						color: #999;
						font-size: 14px;
					}
				}
				.filter{
					.title{
						/*display: none;*/
					}
				}
			}
		}
		.page-box{
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
		.main{
			position: relative;
			margin-top: 30px;
			.info{
				position:absolute;
				top:-30px;
				left:0px;
				.green{
					color: #77cac7;
					font-size: 18px;
				}
				.red{
					color: #f00;
					font-size: 18px;
				}
			}
		}
	}
	.modalAcc{
		.imgBg{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.5);
			line-height: 180vh;
			z-index: 1999;
			text-align: center;
			&.hid{
				display: none;
			}
			img{
				height: 80vh;
			}
		}
		.formAcc{
			overflow:hidden;
			.attaImg{
				img{
					width: 60px;
					height: 45px;
					cursor: pointer;
				}
			}
		}
		.ivu-form-item{
			margin-bottom: 0px;
			width: 330px;
		}
		.ivu-modal-footer{
			display: none;
		}
	}
	.modalRcp{
		.formRcp{
			//height: 146px;
			.width204{
				width: 204px;
			}
			.width368{
				width: 368px;
			}
			.width336{
				width: 336px;
			}
			.widthMax{
				width: 100%;
			}
		}
	}
	.collRecord{
		.ivu-modal-body{
			height: 302px;
			overflow: auto;
		}
	}
	.closeRefund{
		/*.tit{
			width: 33%;
			display: inline-block;	
			line-height: 50px;
			padding-left: 40px;
		}*/
		.formRefund{
			height: 178px;
		}
	}
	.formStyle{
		.lf{
			float: left;
		}
		.gt{
			float:right;
		}
		.widthMax{
			width: 100%;
		}
		.logoBox{
		    .schoolLogoBox{
		        width: 70px;
		        height: 70px;
		        background-color: #f7f7f7;
		        border: 1px solid #e0e1e2;
		        img{
		            width:70px;
		            height:70px;
		        }
		    }
		    .scanBox{
		        line-height: 43px;
		        p{
		            width:70px;
		            color: #0d70b0;
		        }
		    }
		    label{
		        line-height:70px;
		    }
		    .uploadBox{
		        position: relative;
		        padding:5px 0px;
		        margin-left:20px;
		        .tips{
		            color:#999899;
		            font-size:12px;
		            margin-top:10px;
		        }
		        .error_tips{
		            top: 85%;
		        }
		    }
		}
		.logo{
			width:100%;
			 .ivu-form .logoBox .uploadBox .tips{
				line-height: 1em;
				margin-top: 20px;
			}
			.ivu-form-item-content{
				line-height: 1em;
			}
		}
		.fileName{
			position: relative;
			display: inline-block;
			span{
				position: absolute;
				line-height: 32px;
				bottom: -24px;
				right: 12px;
				color: red;
				cursor: pointer;
				display: none;
			}
		}
		.fileName:hover{
			span{
				display: inline-block;
			}
		}
	}	
</style>

<template>
	<div class="receipt">
	    <Tabs size="small" class="tabs" :animated="false" v-model="tabsNum" @on-click="tabCut(tabsNum)">
	        <TabPane name="receipt" label="待收款"></TabPane>
	        <TabPane name="toDo" label="待完成"></TabPane>
	        <TabPane name="finish" label="已完成"></TabPane>
	    </Tabs>
		<v-select style="width: 396px;margin: 15px 0 10px;" placeholder="输入合同名称/合同编码/学生姓名/EC号" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div class="filterDw">
				<v-search-options :data="firm.countryList" company byKey="name" :searchTitle="firm.searchName" @on-select-item="firmChange" labelWidth="80" style="margin: 5px 0;"></v-search-options>
				<div>
					<v-search-options :label-width="80" byKey="label"  :searchTitle="signTime.searchName" :data="signTime.list" @on-select-item="timeCharge" labelWidth="80" valign="center">
						<DatePicker type="date" placeholder="报账时间" style="width: 200px" @on-change="onDataPickStart" v-model="beforeTime"></DatePicker>
						<span style="background-color: rgb(54, 162, 158); display: inline-block; width: 12px; height: 2px;"></span>
						<DatePicker type="date" placeholder="报账时间" style="width: 200px" @on-change="onDataPickEnd" v-model="afterTime"></DatePicker>
					</v-search-options>
				</div>
					<v-search-options :data="pay.countryList" byKey="label" :searchTitle="pay.searchName" @on-select-item="payChange" labelWidth="80" v-if="tabsNum=='receipt'" style="margin: 5px 0;"></v-search-options>
		</div>
		<div class="main">
			<p class="info">累计收到 <span class="green">{{count}}</span> 份<span v-text="tabsNum=='receipt'?'待收款':tabsNum=='toDo'?'待完成':'已完成'"></span>合同，<span v-text="tabsNum=='receipt'?'待收':tabsNum=='toDo'?'待收':'实付'"></span>总金额 <span class="red" v-text="tabsNum=='receipt'?curReceiptSum:tabsNum=='toDo'?sumPendingAmount:sumFactRecipot"></span> 万</p>
			<Btnlists title="合同收款-列表" :btnList="btninfo"></Btnlists>

			<wait-table :tableSelectedItem = "tableData" @check="checkAcc" @receipt="receiptAcc" @select="selection" @sort="sortCharge" @jumpView='jumpView' v-if="tabsNum=='receipt'" @reject="rejectSign"></wait-table>
			<pending :tableSelectedItem = "tableData" @record="record" @refund="refund" @select="selection" @sort="sortCharge"  @jumpView='jumpView' v-if="tabsNum=='toDo'"></pending>
			<finish :tableSelectedItem = "tableData" @record="record" @refund="refund" @select="selection" @sort="sortCharge"  @jumpView='jumpView' v-if="tabsNum=='finish'"></finish>
			
		</div>
	  	<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
		<form class="formexport" action=" " method="get" >
			<input type="hidden" name="companyIds"  :value="companyIds" />
			<input type="hidden" name="startTime"  :value="this.beforeTime?(new Date(this.beforeTime)).format('yyyy-MM-dd'):''" />
			<input type="hidden" name="endTime"  :value="this.afterTime?(new Date(this.afterTime)).format('yyyy-MM-dd'):''" />
			<input type="hidden" name="timeFlag"  :value="2" />
			<input type="hidden" name="months"  :value="months" />
			<input type="hidden" name="receiptDetailTypes"  :value="receiptDetailTypes" v-if="tabsNum=='receipt'"/>
			<input type="hidden" name="orderBy"  :value="orderBy" />
			<input type="hidden" name="name"  :value="compact" />
			<input type="hidden" name="status"  :value="this.tabsNum=='receipt'?'':this.tabsNum=='toDo'?'accounted':'collected,finished'" />
		</form>
		
		<Modal v-model="modalAcc" title="查看报账详情" :mask-closable="false" width="740" class="modalAcc" @on-visible-change="hidImg">
	        <div v-if="modalAcc">
	        	<Form ref="formAcc" :label-width="100" class="formStyle formAcc">
		        	<FormItem label="报账人" class="lf">
		        		<p>{{tableItem.sellerUser.name}}({{tableItem.sellerUser.companyName}})</p>
		        	</FormItem>
		        	<FormItem label="报账时间:" class="gt">
		        		<p>{{tableItem.receiptTime}}</p>
		        	</FormItem>
		        	<FormItem label="EC号:" class="lf">
		        		<p>{{tableItem.ecId}}</p>
		        	</FormItem>
		        	<FormItem label="学生姓名:" class="gt">
		        		<p>{{tableItem.studentName}}</p>
		        	</FormItem>
		        	<FormItem label="合同名称:" class="lf">
		        		<p>{{tableItem.ctName}}</p>
		        	</FormItem>
		        	<FormItem label="合同编号:" class="gt">
		        		<p>{{tableItem.ctNo}}</p>
		        	</FormItem>
		        	<FormItem label="合同类型:" class="lf widthMax">
		        		<p>{{tableItem.tags}}</p>
		        	</FormItem>
		        	<FormItem label="渠道来源:" class="lf">
		        		<p>{{tableItem.source}}</p>
		        	</FormItem>
		        	<FormItem label="合同到期时间:" class="lf widthMax">
		        		<p>{{tableItem.year}}</p>
		        	</FormItem>
		        	<FormItem label="合同原价:" class="gt">
		        		<p><span v-text="tableItem.ctPrice"></span>元</p>
		        	</FormItem>
		        	<FormItem label="合同签约金额:" class="lf">
		        		<p><span v-text="tableItem.signPrice"></span>元</p>
		        	</FormItem>
		        	<FormItem label="折扣金额" class="gt">
		        		<p>{{tableItem.deratePrice}}元</p>
		        	</FormItem>
		        	<FormItem label="赠送金额" class="lf">
		        		<p><span v-text="tableItem.presentPrice">元</span></p>
		        	</FormItem>
		        	<FormItem label="赠送成本:" class="lf widthMax">
		        		<p><span v-text="tableItem.presentPriceCost"> 万元</span></p>
		        	</FormItem>
		        	<FormItem label="赠送内容:" class="lf widthMax">
		        		<p v-if="tableItem.htContractItemList.length" v-for="item in tableItem.htContractItemList">{{item.name}}。（对外报价：{{item.publicPrice}}，内部成本价：{{item.costPrice}}）</p>
		        		<p v-if="!tableItem.htContractItemList.length">无</p>
		        	</FormItem>
		        	<FormItem label="赠送内容批准人:" class="lf widthMax" v-if="tableItem.htContractItemList.length">
		        		<p>{{tableItem.auditorUser.name}}</p>
		        	</FormItem>
		        	<FormItem label="本次报账金额:" class="lf">
		        		<p>{{tableItem.curReceipt}}</p>
		        	</FormItem>
		        	<FormItem label="甲方待付金额：" class="gt">
		        		<p><span v-text="tableItem.stayPrice"> 万元</span></p>
		        	</FormItem>
		        	<FormItem label="付款方式：" class="lf widthMax">
		        		<p>{{tableItem.receiptType}}</p>
		        	</FormItem>
		        	<FormItem label="付款账号:" class="lf widthMax">
		        		<p>{{tableItem.account}}</p>
		        	</FormItem>
		        	<FormItem label="合作者:" class="lf">
		        		<p>{{tableItem.partnerName}}</p>
		        	</FormItem>
		        	<FormItem label="分成比例:" class="gt">
		        		<p>{{tableItem.partnerRatio}}</p>
		        	</FormItem>
		        	<FormItem label="甲方收款收据:" class="lf widthMax">
		        		<p v-if="tableItem.attachmentList.length" class="attaImg">
		        			<img :src="displayUrl(item.id)" v-for="item in tableItem.attachmentList" @click="seeImg(item.id)"/>
		        		</p>
		        		<p v-else>无</p>
		        	</FormItem>
		        </Form>
				<div class="imgBg" :class="{hid:imgBgShow}" @click="hidImg">
					<img :src="displayUrl(imgId)"/>
				</div>
	        </div>
	    </Modal>
	    
	    <Modal ref="rcpModal" v-model="modalRcp" title="确认收款" width="740" class="modalRcp" @on-ok="rcpOk('rcpForm')" :loading="loading">
	        <div style="overflow:hidden">
	        	<Form ref="rcpForm" :model="formRcp" :label-width="120" class="formStyle formRcp">
		        	<FormItem label="签约金额" class="lf widthMax">
		        		<p>{{formRcp.signPrice}}元</p>
		        	</FormItem>
	        		<div v-for="(item,index) in formRcp.htReceiptDetailList" v-if="formRcp.htReceiptDetailList.length" :key="item.id">
			        	<FormItem :label="'第'+(index+1)+'次收款金额'" class="lf width368">
		        			<Input type="text" disabled v-model="item.curReceipt" class="width204"></Input>&nbsp;万元
			        	</FormItem>
			        	<FormItem :label="'第'+(index+1)+'次收款时间'" class="gt width336">
							<DatePicker disabled v-model="item.receiptTime" format="yyyy年MM月dd日" type="date" placeholder=""  class="width204"></DatePicker>
			        	</FormItem>
	        		</div>
		        	<FormItem label="本次收款金额" class="lf width368">
	        			<Input type="text" disabled v-model="formRcp.htReceiptDetail.curReceipt" class="width204"></Input>&nbsp;元
		        	</FormItem>
		        	<FormItem label="实收时间" class="gt width336" prop="htReceiptDetail.receiptTime" :rules="{required:true, type:'date',message:'实收时间不能为空',trigger:'change'}">
						<DatePicker v-model="formRcp.htReceiptDetail.receiptTime" format="yyyy年MM月dd日" type="date" placeholder=""  class="width204"></DatePicker>
		        	</FormItem>
		        	<FormItem label="本次实际到账金额" class="lf width368 long" prop="factRecipot" :rules="{required:true,type:'number',message:'实际到账金额不能为空',trigger:'blur'}">
	        			<Input type="text" number placeholder="输入数字" v-model="formRcp.factRecipot" class="width204" @on-change="actualCharge"></Input>&nbsp;元
		        	</FormItem>
		        	<FormItem label="手续费" class="gt width336">
	        			<Input type="text" disabled v-model="formRcp.htReceiptDetail.expense" style="width:190px"></Input>&nbsp;元
		        	</FormItem>
	        		<div v-for="(item,index) in formRcp.htReceiptPlanList" v-if="formRcp.htReceiptPlanList.length" :key="item.id">
			        	<FormItem :label="'第'+(index+formRcp.htReceiptDetailList.length+1)+'次收款金额'" class="lf width368">
		        			<Input type="text" disabled v-model="item.curReceipt" class="width204"></Input>&nbsp;万元
			        	</FormItem>
			        	<FormItem :label="'第'+(index+formRcp.htReceiptDetailList.length+1)+'次收款时间'" class="gt width336">
							<DatePicker v-model="item.receiptTime" format="yyyy年MM月dd日" type="date" placeholder=""  class="width204"></DatePicker>
			        	</FormItem>
	        		</div>
					<FormItem label="是否开具发票" class="lf widthMax">
						<RadioGroup v-model="formRcp.hasReceipt" @on-change="changeHasReceipt">
							<Radio label="1">是</Radio>
							<Radio label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<div v-if="formRcp.hasReceipt == 1 || formRcp.invoiceId || formRcp.invoiceUserName " class="lf widthMax" style="overflow:hidden">
						<FormItem label="发票号" class="lf width368"  prop="invoiceId" :rules="{required:true, message:'请输入发票号', trigger:'blur'}">
							<Input type="text"  placeholder="请输入发票号" v-model="formRcp.invoiceId" class="width204"></Input>
						</FormItem>
						<FormItem label="发票领用人" class="gt width336"  prop="invoiceUserName" :rules="{required:true, message:'请输入发票领用人', trigger:'blur'}">
							<Input type="text"  placeholder="请输入发票领用人" v-model="formRcp.invoiceUserName" class="width204"></Input>
						</FormItem>
					</div>
		        </Form>
	        </div>
	    </Modal>
	    <Modal v-model="collRecord" title="查看收款记录" width="980" class="collRecord">
			<div>
				<Table :columns="recordcol" :data="recordData">
				</Table>
			</div>
	        <div slot="footer">
	            <Button type="ghost" @click="collRecord=false">关闭</Button>
	        </div>
		</Modal>
		<Modal ref="refundModal" v-model="closeRefund" title="确认退款" width="740" class="closeRefund" @on-ok="refundOk('refundForm')">
        	<Form ref="refundForm" :rules="refundRule" :model="formRefund" :label-width="108" class="formStyle formRefund">
			    <div style="width: 100%;">
	        	<FormItem label="签约金额" class="lf width336" prop="outPrice">
			    	<p style="width:206px">{{formRefund.signPrice}}元</p>
	        	</FormItem>
	        	<FormItem label="实际到账金额" class="lf width336" prop="outPrice">
			    	<p style="width:206px">{{formRefund.signPrice}}元</p>
	        	</FormItem>
			    	<!--<p class="tit">签约金额：{{formRefund.signPrice}}元</p>
					<p class="tit">报账金额：{{formRefund.curReceipt}}元</p>
					<p class="tit">实际到账金额：{{formRefund.factRecipot}}元</p>-->
			    </div>
	        	<FormItem label="退款金额" class="lf width336" prop="outPrice">
        			<Input type="text" number v-model="formRefund.outPrice" style="width:190px"></Input>&nbsp;元
	        	</FormItem>
	        	<FormItem label="退款时间" class="lf width336" prop="receiptTime">
					<DatePicker v-model="formRefund.receiptTime" format="yyyy年MM月dd日" type="date" placeholder=""  class="width204"></DatePicker>
	        	</FormItem>
	        	<Form-item label="退款收据" class="logo lf" prop="receiptList">
	                <div class="infoList logoBox clearfix">
	                    <div class="fl schoolLogoBox" v-for="(item,index) in formRefund.receiptList" v-if="formRefund.receiptList.length">
	                        <i-input v-model="item.filePath" v-show="false"></i-input>
						    <p class="fileName">
	                        	<img :src="displayUrl(item.id)" :class="{hide:!item.filePath}">
						        <span @click="delFile(item.id,index)">
						            	删除
						        </span>
						    </p>
	                    </div>
	                    <div class="fl schoolLogoBox" v-if="!formRefund.receiptList.length">
	                    </div>
	                    <div class="fl uploadBox">
	                        <!--<Upload
	                            ref="upload"
	                            name='files'
	                            :data="{'type':'ht_receipt_refund','dirName':'images',isOverride:0}"
	                            :show-upload-list="false"
	                            :on-success="handleSuccess"
	                            :format="['jpg','jpeg','png']"
	                            :max-size="2048"
	                            :on-format-error="handleFormatError"
	                            :on-exceeded-size="handleMaxSize"
	                            :action="uploadToPan">
	                            <Button type="primary">点击上传</Button>
	                        </Upload>
	                        <p class="tips">* 文件最大为 2MB ( .png, .jpg )</p>-->
									<Button type="primary" @click="onUploadLocal">点击上传</Button>
	                    </div>
	                </div>
	            </Form-item>
			</Form>
		</Modal>
		<up-to-pan ref="uptopan1" :studentId="ecId" :object-id="formRefund.ctId" :dir="''" type="ht_receipt_refund" fileType="all" @uploadok="onUploadOk1" :detector="detector" :format="['jpg','jpeg','png']" dirName="business"/>
	</div>
</template>

<script>
	import vSearchOptions from "@public/modules/vSearchOptions";
	import vSelect from "../../modules/vSelect.vue";
	import Btnlists from '@public/modules/btnlist';
	import waitTable from "./table/waitTable.vue";
	import pending from "./table/pending.vue";
	import finish from "./table/finish.vue";
	import valid,{errors,common,htTag,htContractTpl,htPolicy,account} from "../../libs/request.js";
	import upToPan from '../../modules/planUpToPan';
	export default{
		data(){
			return{
				ecId:'',
				loading: true,
				count:0,
				imgId:'',
				imgBgShow:true,
				curReceiptSum:'',
				sumFactRecipot:'',
				sumPendingAmount:'',
				modalAcc:false,
				detector:{
					type:'name',
					condition:'',
					content:''
				},
				tableItem:{
					htContractItemList:[],
					attachmentList:[]
				},
				tableData:[],
				exportData:'',
				pitchItem:[],
				btninfo: [
					{
						text: '导出',
						type: 'default',
						cls: 'bt2',
						children: [
							{
								text: '导出当前',
								event: this.deriveCurrent
							},
							{
								text: '导出所有',
								event: this.deriveAll
							},
						],
					},
				],
				tabsNum:'receipt',
				compact:'',
				beforeTime:'',
				afterTime:'',
				companyIds:'',
				months:'',
				orderBy:'',
				receiptDetailTypes:'',
				pageNo:1,
				pageSize:10,
				pay:{
					searchName:'支付方式',
					countryList:[
					]
				},
				firm:{
					searchName:'分公司',
					countryList:[
					],
				},
				signTime:{
					searchName:'报账时间',
					list:[
						{label:'不限',id:''},
						{label:'本月',id:1},
						{label:'近三个月',id:3},
						{label:'今年',id:12},
					]
				},
				modalRcp:false,
				formRcp:{
					factRecipot:'',
					signPrice:'',
					htReceiptDetail:{},
					htReceiptDetailList:[] ,
					htReceiptPlanList:[],
				},
				collRecord:false,
				closeRefund:false,
				formRefund:{
					signPrice:'',
					curReceipt:'',
					factRecipot :'',
					outPrice:'',
					receiptTime:'',
					ctId:'',
					receiptList:[]
				},
				refundRule:{
					outPrice:[
						{required:true,type:'number',message:"不能为空",trigger:'blur'},
					],
					receiptTime:[{required:true,type:'date', message:"退款时间不能为空", trigger: 'change'}],
					receiptList:[{required:true,type:'array', message:"退款收据不能为空", trigger: 'change'}],
				},
				recordData:[],
				recordcol:[
                    {
                        title: '收款金额',
                        key: 'curReceipt',
                        align: 'center'
                    },
                    {
                        title: '实际到账金额',
                        key: 'factRecipot',
                        align: 'center'
                    },
                    {
                        title: '手续费',
                        key: 'expense',
                        align: 'center'
                    },
                    {
                        title: '付款方式',
                        key: 'typeLabel',
                        align: 'center'
                    },
                    {
                        title: '收款账号',
                        key: 'accountLabel',
                        align: 'center'
                    },
                    {
                        title: '开户行',
                        key: 'accountBankLabel',
                        align: 'center'
                    },
                    {
                        title: '发票号',
                        key: 'invoiceId',
                        align: 'center'
                    },
                    {
                        title: '发票领用人',
                        key: 'invoiceUserName',
                        align: 'center'
                    },
                    {
                        title: '收款时间',
                        key: 'receiptTime',
                        align: 'center'
                    },
				],
				fileList:[],
			}
		},
		computed:{
			exportFile(){
				return account.exportFile();
			},
			exportFileStayReceipts(){
				return account.exportFileStayReceipts();
			},
			exportFileThenReceipts(){
				return account.exportFileThenReceipts();
			},
			uploadToPan:function(){
				return common.uploadToPan();
			},
		},
		components:{
			vSelect,
			vSearchOptions,
			Btnlists,
			waitTable,
			pending,
			finish,
			upToPan
		},
		created(){
			let params={
				grade:'2',
				types: '1,2,3'
			}
			common.officeList(params).then(valid.call(this)).then(res => {
		    	if(res.ok){
		    		this.firm.countryList=res.data.data.allCompany;
		    		this.firm.countryList.splice(0,0,{id:'',name:'全部 all'});
		    	}
		    }).catch(errors.call(this));
			let params1={
				type:'ht_receipt_detail_type'
			}
			common.listData(params1).then(valid.call(this)).then(res => {
				if(res.ok){
					this.pay.countryList=res.data.data;
					this.pay.countryList.splice(0,0,{label:'不限',id:''})
				}
			}).catch(errors.call(this));
			let params2={
				companyIds:'',
				startTime:'',
				endTime	:'',
				months:'',
				orderBy:'',
				name:'',
				receiptDetailTypes:'',
				timeFlag:2,
				pageNo:1,
				pageSize:10
			}
			account.stayReceiptList(params2).then(valid.call(this)).then(res => {
				if(res.ok){
					this.tableData=res.data.data.list;
					console.log(this.tableData)
					this.tableData.forEach((v,k)=>{
						v.curReceipt=parseFloat(v.curReceipt)||0;
					})
					this.curReceiptSum=parseFloat((res.data.data.attach.curReceiptSum/1e4).toFixed(4))||0;
					this.count=res.data.data.count;
					if(this.count>0){
						this.$Message.info('您收到'+this.count+'条签约合同报账申请');
					}
				}
			}).catch(errors.call(this));
		},
		mounted(){
		},
		methods:{
			changeHasReceipt(){
				if(this.formRcp.hasReceipt == 0){
					this.formRcp.invoiceId = ''
					this.formRcp.invoiceUserName = ''
				}
			},
			displayUrl(id){
				return common.displayUrl(id);
			},
			accSub(arg1,arg2){
			    var r1,r2,m,n;  
			    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
			    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
			    m=Math.pow(10,Math.max(r1,r2));
			    n=(r1>=r2)?r1:r2;  
			    return ((arg1*m-arg2*m)/m).toFixed(n);  
		    },
			getList(){
				let params={
					companyIds:this.companyIds,
					startTime:'',
					endTime	:'',
					months:this.months,
					orderBy:this.orderBy,
					name:this.compact,
					timeFlag:2,
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					receiptDetailTypes:this.receiptDetailTypes
				}
				if(!!this.beforeTime){
					params.startTime=(new Date(this.beforeTime)).format('yyyy-MM-dd');
				};
				if(!!this.afterTime){
					params.endTime=(new Date(this.afterTime)).format('yyyy-MM-dd');
				}else if(!!this.beforeTime && !this.afterTime){
					params.endTime=(new Date()).format('yyyy-MM-dd');
				};
				if(this.tabsNum=='receipt'){
					account.stayReceiptList(params).then(valid.call(this)).then(res => {
						if(res.ok){
							this.tableData=res.data.data.list;
							this.count=res.data.data.count;
							this.curReceiptSum=res.data.data.attach.curReceiptSum;
							this.tableData.forEach((v,k)=>{
								v.curReceipt=parseFloat(v.curReceipt)||0;
							})
						}
					}).catch(errors.call(this))
				}else{
		        	if(this.tabsNum=='toDo'){
		        		params.status='accounted';
		        	}else{
		        		params.status='collected,finished'
		        	}
					account.contractList(params).then(valid.call(this)).then(res => {
						if(res.ok){
							this.tableData=res.data.data.list;	
							this.tableData.forEach((v,k)=>{
								v.signPrice=parseFloat(v.signPrice)||0;
								v.factRecipotSum=parseFloat(v.factRecipotSum)||0;
								v.pendingAmount=parseFloat(v.pendingAmount)||0;
							})
							this.count=res.data.data.count;
							this.sumFactRecipot=parseFloat((res.data.data.attach.sumFactRecipot/1e4).toFixed(4));
							this.sumPendingAmount=parseFloat((res.data.data.attach.sumPendingAmount/1e4).toFixed(4));
						}
					}).catch(errors.call(this))
				}
			},
			actualCharge(val){
				let num = this.accSub(Number(this.formRcp.htReceiptDetail.curReceipt),Number(this.formRcp.factRecipot));
				this.formRcp.htReceiptDetail.expense=num;
			},
			tabCut(val){
				this.orderBy='';
				this.getList();
			},
			searchDropList(word){
				return new Promise((resolve,reject)=>{
				});
			},
		  	textChange:function(val){
				this.$nextTick(()=>{
					this.getList();
				})
		  	},
			firmChange(val){
				this.companyIds=val
				this.getList();
			},
			timeCharge(val){
				this.months=val
				console.log(val)
				this.getList();
			},
			payChange(val){
				let v='';
				this.pay.countryList.find((x)=>{
					if(x.id==val){
						v=x.value;
					}
				})
				this.receiptDetailTypes=v;
				this.getList();
			},
			onDataPickStart(){
				this.$nextTick(()=>{
					this.getList();
				})
			},
			onDataPickEnd(){
				this.$nextTick(()=>{
					this.getList();
				})
			},
			deriveCurrent:function(){
				if(!!!this.pitchItem.length){
					this.$Modal.warning({
						title: '',
						content: '请选择信息'
					});
				}else{
					if(this.tabsNum=='receipt'){
						let arr= this.pitchItem.map(item=>item.id);
						let ids = arr.join(',');
						window.open(account.exportSelected(ids))
					}else if(this.tabsNum=='toDo'){
						let arr= this.pitchItem.map(item=>item.ctId);
						let ids = arr.join(',');
						window.open(account.exportFileFindStayReceiptsByIds(ids))
					}else{
						let arr= this.pitchItem.map(item=>item.ctId);
						let ids = arr.join(',');
						window.open(account.exportFileFindThenReceiptsByIds(ids))
					}
				}
			},
			deriveAll:function(){
				let form = this.$el.querySelector('.formexport');
				if(this.tabsNum=='receipt'){
					form.action=this.exportFile;
				}else if(this.tabsNum=='toDo'){
					form.action=this.exportFileStayReceipts;
				}else{
					form.action=this.exportFileThenReceipts;
				}
				this.$nextTick(()=>{
					form.submit();
				});
			},
			pageChange:function(num){
				this.pageNo=num;
				this.getList();
			},
			sizeChange:function(val){
				this.pageSize=val;
				this.getList();
			},
			sortCharge(k,v){
				this.orderBy=k+' '+v;
				this.getList();
			},
			checkAcc(data){
//				this.tableItem=data;
				let params={
					id:data.id
				}
				account.accountDetail(params).then(valid.call(this)).then(res => {
					if(res.ok){
						this.tableItem=res.data.data;
						console.log('this.tableItem', this.tableItem)
						this.modalAcc=true;
					}
				}).catch(errors.call(this))
			},
			selection(data){
				this.pitchItem=data;
			},
			receiptAcc(data){
				let params={
					id:data.ctId,
				}
				account.confirmReceiptForm(params).then(valid.call(this)).then(res => {
					if(res.ok){
						this.formRcp =res.data.data;
						this.formRcp.htReceiptDetail.receiptTime=new Date();
						this.formRcp.factRecipot=this.formRcp.htReceiptDetail.curReceipt;
						this.formRcp.htReceiptDetail.expense=0;
						this.modalRcp=true;
					}
				}).catch(errors.call(this)).finally(()=>{
				});
			},
			record(data){
				let params={
					ctId:data.ctId
				}
				account.findDetailByCtId(params).then(valid.call(this)).then(res => {
					if(res.ok){
						this.recordData=res.data.data;
						this.collRecord=true;
					}
				}).catch(errors.call(this)).finally(()=>{
				});
				
			},
			rcpOk(name){
            	this.$refs.rcpModal.visible=true;
            	this.modalRcp=true;
                this.$refs[name].validate((ok) => {
                	if(ok){
						let params={
							"ctId":this.formRcp.htReceiptDetail.ctId,
							"factRecipot":this.formRcp.factRecipot,
							"expense":this.formRcp.htReceiptDetail.expense,
							"receiptTime":this.formRcp.htReceiptDetail.receiptTime?(new Date(this.formRcp.htReceiptDetail.receiptTime)).format('yyyy-MM-dd hh:mm:ss'):(new Date()).format('yyyy-MM-dd hh:mm:ss')
						}
						if(this.formRcp.invoiceId && this.formRcp.invoiceUserName){
							params.invoiceId =  this.formRcp.invoiceId
							params.invoiceUserName = this.formRcp.invoiceUserName
						}
						account.confirmReceipt(params).then(valid.call(this)).then(res => {
							if(res.ok){
								this.$Message.success(res.data.message);
								this.tableData=[];
								this.getList();
                    			this.modalRcp=false;
							}
						}).catch(errors.call(this)).finally(()=>{
						});
                	}else{
                    	this.$refs.rcpModal.visible=true;
						this.modalRcp=true;
						this.loading = false 
						let _this = this
						setTimeout(()=>{
							_this.loading = true
						},0)
                	}
                });
			},
			refundOk(name){
            	this.$refs.refundModal.visible=true;
            	this.closeRefund=true;
                this.$refs[name].validate((ok) => {
                	if(ok){
                		let params={
                			curReceipt:this.formRefund.outPrice,
							ctId:this.formRefund.ctId,
							receiptTime:(new Date(this.formRefund.receiptTime)).format('yyyy-MM-dd hh:mm:ss'),
							receiptList:this.formRefund.receiptList
                		};
						account.refund(params).then(valid.call(this)).then(res => {
							if(res.ok){
			    				this.$Message.success(res.data.message);
        						this.closeRefund=false;
        						this.getList();
							}
						}).catch(errors.call(this));
                	}else{
		            	this.$refs.refundModal.visible=true;
		            	this.closeRefund=true;
                	}
                });
			},
			refund(data){
				this.ecId=data.ecId;
				let params={
					ctId:data.ctId
				}
				account.refundForm(params).then(valid.call(this)).then(res => {
					if(res.ok){
						this.formRefund.signPrice=res.data.data.signPrice;
						this.formRefund.curReceipt=res.data.data.curReceipt;
						this.formRefund.factRecipot=res.data.data.factRecipot;
						this.formRefund.outPrice='';
						this.formRefund.receiptList=[];
						this.formRefund.ctId=data.ctId;
						this.closeRefund=true;
					}
				}).catch(errors.call(this));
			}, 
			seeImg(id){
				this.imgId=id;
				this.imgBgShow=false;
			},
			hidImg(){
				this.imgBgShow=true;
			},
			delFile(id,ind){
		  		if(id){
		  			let params={
		  				'id':id
		  			}
					common.delete(params).then(valid.call(this)).then(res => {
				    	if(res.ok){
				    		this.$Message.success(res.data.message);
				    		this.formRefund.receiptList.splice(ind,1);
				    	}
				    }).catch(errors.call(this));
		  		}
			},
			handleSuccess:function(data){
		      if (data.status == "success") {
		        this.$Message.success(data.message);
		        let length=this.formRefund.receiptList.length;
		        this.formRefund.receiptList.splice(length,0,data.data);
				this.$refs.refundForm.validateField('receiptList')
		      } else {
		        this.$Message.error(data.message);
		      }
			},
			handleFormatError:function(){
      			this.$Message.error("需使用jpg、jpeg、png格式图片");
			},
			handleMaxSize:function(){
      			this.$Message.error("图片大小不能超过2MB");
			},
			jumpView(params){
				this.$router.push({name:'sign.pactPreview',query:{id:params.ctId}})
			},
			onUploadLocal() {
				this.$refs.uptopan1.doUpload();
			},
			onUploadOk1(data) {
				if(data.status == "success") {
					//					this.attachmentList.push(data.data);
		        let length=this.formRefund.receiptList.length;
		        this.formRefund.receiptList.splice(length,0,data.data);
				this.$refs.refundForm.validateField('receiptList')
				} else {
					this.$Message.error(data.message);
				}
			},
			rejectSign(data){
					account.rejectReceipt(data).then(valid.call(this)).then(res => {
						if(res.ok){
				    		this.$Message.success(res.data.message);
    						this.getList();
						}
					}).catch(errors.call(this))
			}
		}
	}
</script>
