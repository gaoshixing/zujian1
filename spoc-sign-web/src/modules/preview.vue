<style lang="less">
	.sign-preview {
		font-size: 14px;
		width: 960px;
		margin: 0 auto;
		padding-bottom: 100px;
		.pdfviewer {
			border: none;
			height: 90vh;
			box-shadow: 1px 1px 15px #ddd;
		}
		.pdf-converting {
			height: 20vh;
			box-shadow: 1px 1px 15px #ddd;
			font-size: 20px;
			display: flex;
			justify-content: center;
			background: rgba(1, 1, 1, 0.4);
			.text {
				align-self: center;
				color: #fff;
			}
		}
		.pdfBox{
			height: 1170px;
			overflow-y: auto;
			border: 6px solid #000;
			box-sizing: border-box;
		}
		.title {
			width: 960px;
			font-size: 16px;
			margin: 26px 0 16px;
			position: relative;
			height: 24px;
			.edit {
				width: 90px;
				height: 32px;
				float: right;
			}
			.fl {
				float: left;
			}
			.btnTop {
				margin: 0;
				float: right;
				text-align: left;
				.ivu-btn {
					line-height: 16px;
					font-size: 14px;
					margin: 0 10px;
					width: 90px;
					height: 30px;
				}
				span {
					cursor: pointer;
				}
				.dropdown {
					text-align: center;
					font-weight: normal;
				}
			}
			.dyinfo {
				&.hid {
					display: none;
				}
				width: 294px;
				height: 114px;
				font-weight: normal;
				position: absolute;
				top: 14px;
				right: 0;
				padding-top: 8px;
				.down {
					text-align: center;
					margin-top: 4px;
				}
				.close {
					color: #999899;
					font-size: 16px;
					position: absolute;
					top: 8px;
					right: 8px;
				}
			}
		}
		.info {
			width: 100%;
			border: 1px #e0e0e0 solid;
			padding: 10px 0;
			background: #fafafa;
			.list {
				width: 49%;
				display: inline-block;
				margin-bottom: 0px;
				.ivu-form-item-label {
					color: #999999;
				}
				p {
					display: inline-block;
					&.ec {
						color: #80cdc9;
					}
				}
			}
		}
		.subjoin {
			width: 960px;
			border: 1px #e0e0e0 solid;
			padding: 10px;
			background: #fafafa;
			.sm {
				width: 48%;
			}
			.mt30 {
				margin-top: 15px;
			}
			.long {
				width: 100%;
			}
			p {
				display: inline-block;
				line-height: 32px;
			}
			.cont {
				margin-top: 12px;
				p {
					line-height: 1.2em;
				}
			}
		}
		.btn {
			margin: 0;
			text-align: center;
			clear: both;
			padding-top: 40px;
			.ivu-btn {
				line-height: 16px;
				font-size: 16px;
				margin: 0 50px;
				width: 127px;
				height: 40px;
			}
		}
		.table{
			text-align: center;
			border: 1px #dddee1 solid;
			background: #dddee1;
			line-height: 32px;
			td{
				background: #FFFFFF;
			}
			th{
				background: #f7f7f7;
			}
		}
	}
</style>

<template>
	<div class="sign-preview">
		<slot name="header"></slot>
		<h3 class="title" v-text="info.name"></h3>
		<div class="info">
			<Form ref="formModal" :label-width="112" class="formModal">
				<FormItem label="合同编号：" class=" list">
					<p v-text="info.no"></p>
				</FormItem>
				<FormItem label="合同标签：" class=" list">
					<p v-text="info.tags"></p>
				</FormItem>
				<FormItem label="合同原价：" class=" list">
					<p v-text="parseFloat((info.price/1e4).toFixed(4))"></p>&nbsp;万元
				</FormItem>
				<FormItem label="客户姓名：" class=" list">
					<p v-text="info.studentName"></p>
				</FormItem>
				<FormItem label="客户编号：" class=" list">
					<p class="ec" v-text="info.ecId?info.ecId:'暂无'"></p>
				</FormItem>
				<FormItem label="客户来源：" class=" list">
					<p v-text="info.sourceName"></p>
				</FormItem>
				<FormItem label="申请类别：" class=" list">
					<p v-text="info.applyName"></p>
				</FormItem>
				<FormItem label="入学年份：" class=" list">
					<p v-text="info.year?info.year:'暂无'"></p>
				</FormItem>
				<FormItem label="签约金额：" class=" list">
					<p v-text="parseFloat((info.htSign.signPrice/1e4).toFixed(4))"></p>&nbsp;万元
				</FormItem>
				<FormItem label="折扣金额：" class=" list">
					<p style="width: 128px;" v-text="parseFloat((info.htSign.deratePrice/1e4).toFixed(4))+' 万元'"></p>
					<FormItem label="赠送金额：" style="display: inline-block;width: 226px; ">
						<p v-text="parseFloat((info.htSign.presentPrice/1e4).toFixed(4))"></p>&nbsp;万元
					</FormItem>
				</FormItem>
				<FormItem label="签约人：" class=" list">
					<p v-text="info.htSign.sellerName"></p>
				</FormItem>
				<FormItem label="合作者：" class=" list" v-if="info.htPartnerList.length">
					<div v-for="(item,ind) in info.htPartnerList" :key="'cc'+ind">
						<p style="width: 128px;" v-text="item.partnerName">刘芳一</p>
						<FormItem label="分成比例：" class=" list">
							<p v-text="parseFloat((item.ratio*100).toFixed(2))+'%'">20%</p>
						</FormItem>
					</div>
				</FormItem>
				<FormItem label="合作者：" class=" list" v-if="!info.htPartnerList.length">
					<p>无</p>
				</FormItem>
			</Form>
		</div>
		<div class="mainview" v-if="hasAttac">
			<div>
				<h3 class="title">
					<div class="fl" v-if="hasMain">
						主合同
					</div>
					<div class="fl" v-else-if="hasProtocol">
						附加合同
					</div>
					<div class="btnTop">
						<slot name="middlebtn"></slot>
    				<Button type="primary" size="large" @click="goEdit" v-if="(preview || (info.auditStatus=='reject'||info.auditStatus=='nocheck'))&&(info.status=='committed'||info.status=='checked')&&info.receiptStatus!=1 && info.isProtocol != '1'&&sellerId==info.sellerId">编辑</Button>
					</div>
				</h3>
			</div>
			<div>
				<div v-if="!hasMain">暂无主合同</div>
				<!--<iframe class="pdfviewer" v-else-if="pdfurl" :src="pdfurl" width="960"></iframe>-->
				<div ref="cpdf" v-else-if="pdfurl" class="pdfBox">
					<canvas v-for="n in page_count" class="canvasstyle" :id="'canvas'+n" :ref="'canvas'+n"></canvas>
				</div>
				<div class="pdf-converting" v-else>
					<p class="text">文件转码中，请稍后...</p>
				</div>
			</div>
		</div>
		<h3 class="title" v-if="((info.auditStatus=='reject'||info.auditStatus=='nocheck')&&info.receiptStatus!=1)||fj">
			<span v-if="hasProtocol">附加合同</span> 
    		<Button type="primary" size="large" @click="goEdit" class="edit" v-if="(preview || (info.auditStatus=='reject'||info.auditStatus=='nocheck'))&&info.receiptStatus!=1&&hasProtocol&&sellerId==info.sellerId">编辑</Button>
		</h3>
		<div class="subjoin" v-if="hasProtocol">
			<p class="sm">甲 方：{{info.studentName}}</p>
			<!-- <p class="sm">乙 方：{{info.sellerCompanyName}}</p> -->
			<p class="sm">乙 方：{{info.htSign.htRecepitAccount.comanyName}}</p>
			<p class="long">身份证号：{{info.studentIdentity}}</p>
			<p class="sm">法定监护人/委托代理人：{{info.agentName}}</p>
			<p class="sm" v-if="info.htSign.htRecepitAccount">联系地址：{{info.htSign.htRecepitAccount.address}}</p>
			<p class="long">身份证件号：{{info.agentIdentity}}</p>
			<p class="sm">联系地址：{{info.address}}</p>
			<p class="sm">电子邮件：{{info.email}}</p>

			<p class="sm">联系电话：{{info.phone}} </p>
			<!-- <p class="sm">联系电话：{{info.htSign.sellerOffice.phone}} </p> -->
			<div class="cont">

				<p>
					基于甲乙双方{{signTime}}签署的《{{info.externalName||"xxx合同"}}》以下简称“主合同”，甲乙双方现就服务内容做如下补充约定：
				</p>
				<p v-if="tpl" style="display: block;">
					一、补充条款：
				</p>
				<div v-html="tpl">

				</div>

				<p>
					<span v-if="!tpl">一</span><span v-else>二</span>、协议生效及终止
				</p>
				<p>
					<span v-if="!tpl">1</span><span v-else>2</span>.1 本协议自甲方或其法定监护人/委托代理人、乙方或其代表签字、盖章之日起生效；若甲方在本合同签订之日未满18周岁的，因不具备完全民事行为能力，本协议须由其监护人代为签署方可有效。
				</p>
				<p>
					<span v-if="!tpl">1</span><span v-else>2</span>.2 甲乙双方认可以电子扫描件方式签署本协议，协议电子扫描件与原件具有同等法律效力。
				</p>
				<p>
					<span v-if="!tpl">1</span><span v-else>2</span>.3 本协议内容是甲乙双方在平等自愿的前提下，协商达成一致的，双方对本协议条款均已知悉并充分了解。
				</p>
				<p>
					<span v-if="!tpl">1</span><span v-else>2</span>.4 本协议条款全部打印，任何手写方式增添、删减或修订条款无效<span style="color: #999;">（日期填写除外）</span>。本协议一式两份，甲乙双方各执一份，具有同等法律效力。
				</p>
				<p>
					<span v-if="!tpl">1</span><span v-else>2</span>.5 本协议仅作为甲乙双方之间的服务合同，与任何第三方无关。
				</p><br />
				<p>
					<span v-if="!tpl">1</span><span v-else>2</span>.6 本协议约定相关事项履行完毕之日，协议自动终止。
				</p>
				<p>
					（以下无正文，为合同签字页）
				</p>
			</div>

			<p class="sm mt30">
				甲 方（签字）：
			</p>
			<p class="sm mt30">
				乙 方（盖章）：
			</p>
			<p class="sm mt30">
				法定监护人/委托代理人（签字）：
			</p>
			<p class="sm mt30">
				负责人（签章）：
			</p>
			<p class="sm mt30">
				签约日期： 年 月 日
			</p>
			<p class="sm mt30">
				签约日期： 年 月 日
			</p>
		</div>
	</div>
</template>

<script>
	import { common, contract } from '../libs/request.js';
	import { mapGetters, mapState } from 'vuex';
	import PDFJS from 'pdfjs-dist';
	export default {
		props: {
			info: {
				type: Object,
				required: true,
			},
			pdfinfo: {
				type: Object,
				required: true,
			},
			preview: {
				type: Boolean,
				default: false,
			},
			detail: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				send: false,
				infoma: false,
				modalOff: false,
				reason: '',
				appoModal: false,
				appoForm: {
					appoDate: '',
					remind: false
				},
				promModal: false,
				promForm: {
					money: '',
					promDate: '',
					id: '',
					partner: [{
						people: '',
						shared: ''
					}]
				},
				r: 0,
				modalAccount: false,
				accountData: {
					sum: '',
					pay: '',
					receiptId: '',
					receipt: [{
						sum: '',
						time: ''
					}],
					fileUrl: '',
					remind: false,
				},
				modalFile: false,
				fileData: {
					pactId: '2017BJ-G-VIP-001',
					scanUrl: '',
				},
				send: false,
				sendForm: {
					disabledGroup: [],
					email: '',
					reason: '',
				},
				wid: 948, //刚进入页面中的pdf容器的宽度
				pdfDoc: null, //pdfjs 生成的对象
				pageNum: 1, //
				pageRendering: false,
				pageNumPending: null,
				scale: null, //放大倍数
				page_num: 0, //当前页数
				page_count: 0, //总页数
			}
		},
		computed: {
			...mapState(['userInfo', 'appMenuList']),
			sellerId() {
				if(this.userInfo) {
					return this.userInfo.id || '';
				}
			},
			pdfurl() {
				if(this.pdfinfo.status && this.pdfinfo.status == '1') {
					if(!this.detail) { // 生成合同 预览页
						return common.displayUrl(this.pdfinfo.id);
					}
					if(this.r) { // 详情页
						return contract.displayUrl(this.info.id) + '&r=' + this.r;
					}
					return contract.displayUrl(this.info.id);
				}
			},
			tpl() {
				if(this.info.protocolContent) {
					return '<p>' + this.info.protocolContent.split('\n').join('</p><p>') + '</p>';
				}
			},
			hasMain() { // 有主合同
				const k = 'ht_contract' + (this.preview ? '_preview' : '');
				return this.info.attachments && (this.info.attachments.findIndex(item => item.type == k) > -1);
			},
			hasAttac() {
				console.log(this.info.attachments)
				return this.info.attachments && this.info.attachments.length;
			},
			hasProtocol() {
				return this.info.isProtocol == '1';
			},
			fj() {
				if(this.hasAttac && this.hasMain) {
					return true;
				} else if(this.hasAttac && !this.hasMain && this.hasProtocol) {
					return false;
				} else if(this.hasAttac && !this.hasMain && !this.hasProtocol) {
					return true;
				} else {
					return true;
				}
				return this.hasMain
			},
			signTime(){
				let arr=new Date(this.info.signTime).toLocaleDateString().split('/');
				let maps=['年','月','日'];
				let str='';
				arr.forEach((v,k)=>{
					str+=v+maps[k];
				})
//				return str||'____年__月__日'
				return '____年__月__日'
			}
		},
		mounted() {
//			this.nextTick(()=>{
//				
//			})
		},
		methods: {
			goEdit() {
				this.$emit('go-edit', this.info);
			},
			reloadPdf() {
				this.r = Math.random();
			},
			renderPage(num) { //渲染pdf
				let vm = this
				this.pageRendering = true;
				let canvas = document.getElementById('canvas'+num); // Using promise to fetch the page
				vm.pdfDoc.getPage(num).then(function(page) {
					vm.scale = vm.wid / page.getViewport(1.0).width ;
					//vm.wid是在data中定义的一个变量，最初设置的pdf的宽度
					var viewport = page.getViewport(vm.scale);
					// var viewport = page.getViewport(vm.scale); //alert(vm.canvas.height)
					canvas.height = viewport.height;
					canvas.width = viewport.width; // Render PDF page into canvas context
					console.log(canvas)
					let ctx = canvas.getContext('2d');
					var renderContext = {
						canvasContext: ctx,
						viewport: viewport
					};
					var renderTask = page.render(renderContext); // Wait for rendering to finish
					renderTask.promise.then(function() {
						vm.pageRendering = false;
						if(vm.pageNumPending !== null) { // New page rendering is pending
							this.renderPage(vm.pageNumPending);
							vm.pageNumPending = null;
						}
					});
				});
				vm.page_num = vm.pageNum;
			},
			addscale() { //放大
				if(this.scale >= this.maxscale) {
					return
				}
				this.scale += 0.1;
				this.queueRenderPage(this.pageNum)
			},
			minus() { //缩小
				if(this.scale <= this.minscale) {
					return
				}
				this.scale -= 0.1;
				this.queueRenderPage(this.pageNum)
			},
			prev() { //上一页
				if(vm.pageNum <= 1) {
					return;
				}
				vm.pageNum--;
				vm.queueRenderPage(vm.pageNum);
			},
			next() { //下一页
				if(vm.pageNum >= vm.page_count) {
					return;
				}
				vm.pageNum++;
				vm.queueRenderPage(vm.pageNum);
			},
			closepdf() { //关闭PDF
				this.$emit('closepdf')
			},
			queueRenderPage(num) {
				if(this.pageRendering) {
					this.pageNumPending = num;
				} else {
					this.renderPage(num);
				}
			}
		},
		watch: {
			pdfurl: {
				handler: function(val, oldVal) {
					if(val) {
						let that = this;
						PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min');
						PDFJS.getDocument(that.pdfurl).then((pdfDoc_) => { //初始化pdf
							that.pageNum = 1
							that.pdfDoc = pdfDoc_;
							that.page_count = that.pdfDoc.numPages;
							console.log(that.page_count,that.pdfDoc)
							that.$nextTick(()=>{
								for(let i=1;i<=that.page_count;i++){
									that.renderPage(i);
								}
							})
						});
					}
				},
				deep: true
			},
		}
	}
</script>