<style lang='less'>
	.add-public-gsx {
		border-top: 1px solid #b8b8b8;
		.public-title {
			width: 80%;
			margin: 0 auto;
			text-align: center;
			.aro {
				font-size: 14px;
				margin-bottom: 32px;
				width: 615px;
				margin: 20px auto;
				.headImgErr{
					color: red;
				}
				// text-align: center;
				.aro-item {
					padding-left: 145px;
					text-align: left;
					list-style: none;
					position: relative;
					margin-bottom: 20px;
					.item-title {
						color: #b8b8b8;
						display: inline-block;
						width: 140px;
						text-align: right;
						left: 0;
						top: 5px;
						position: absolute;
						i {
							font-style: normal;
							color: red;
						}
						b {
							font-size: 10px;
							font-weight: 400;
						}
					}
					.upload_cont {
						width: 80px;
						height: 80px;
						line-height: 80px;
						text-align: center;
						background: #f8f8f8;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.upload_cont1 {
						width: 120px;
						height: 120px;
						line-height: 120px;
						text-align: center;
						background: #f8f8f8;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.item-top {
						top: 0;
						.upload_cont {
							width: 180px;
							height: 240px;
							line-height: 240px;
							text-align: center;
							background: #f8f8f8;
							img {
								width: 100%;
								height: 100%;
							}
						}
					}
					.notice {
						font-size: 10px;
						color: #b8b8b8;
						padding-top: 5px;
					}
				}
				.aro-item4 {
					text-align: center;
					list-style: none;
					position: relative;
					margin-bottom: 20px;
					.userSel {
						width: 370px;
						margin: 10px 0;
						.ivu-select-item {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							img {
								display: inline-block;
								width: 40px;
								height: 40px;
							}
							span {
								padding-left: 10px;
								font-size: 14px;
								color: rgb(38, 38, 38);
							}
						}
					}
					.warn {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						width: 382px;
						margin: auto;
						padding-bottom: 20px;
						.warnHint {
							font-size: 14px;
							color: #ffa034;
							padding-left: 10px;
							line-height: 20px;
							text-align: left;
						}
					}
					.qrcode {
						img {
							width: 120px;
							height: 120px;
						}
						p {
							padding-top: 10px;
							font-size: 14px;
							color: #999999;
						}
					}
					.qrHint {
						font-size: 16px;
						color: #333333;
						padding: 14px 0 20px;
						span {
							color: #1890ff;
						}
					}
				}
				.mb {
					margin-bottom: 10px;
				}
			}
			.config-public {
				padding-left: 80px;
				margin-bottom: 100px;
				width: 615px;
				margin: 20px auto;
				p {
					// position: relative;
					font-size: 14px;
					text-align: left;
					line-height: 33px;
					overflow: hidden;
				}
				.config-title {
					// position: absolute;
					float: left;
					color: #b8b8b8;
				}
			}
		}
	}
</style>
<template>
	<div class="add-public-gsx">
		<div class="public-title">
			<title-c :newTitleList="newTitleList"></title-c>
			<ul class="aro" v-if="process==1">
				<li class="aro-item mb">
					<span class="item-title"><i>*</i> 选择公众号类型：</span>
					<Select v-model="publicObj.type" style="width:340px;">
						<Option v-for="item in publicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</br>
					<p class="notice">请正确选择,公众号类型对应的接口如果没有权限,相关的功能将不能操作</p>
				</li>
				<li class="aro-item">
					<span class="item-title"><i>*</i> 公众号名称：</span>
					<Input v-model="publicObj.publicName" placeholder="" style="width: 340px" />
				</li>
				<li class="aro-item mb">
					<span class="item-title"><i>*</i> 原始ID：</span>
					<Input v-model="publicObj.publicId" placeholder="" style="width: 340px" />
					</br>
					<p class="notice">请正确选择,保存后不能修改,且无法接收到微信的信息</p>
				</li>
				<!--  <li class="aro-item">
                    <span class="item-title"><i>*</i> 微信号：</span>
                    <Input v-model="publicObj.wxId" placeholder="" style="width: 340px" />
                </li> -->
				<!--<li class="aro-item">
					<span class="item-title"><i>*</i> 创建者微信昵称：</span>
					<Input v-model="publicObj.createNick" placeholder="" style="width: 340px" />
				</li>-->
				<li class="aro-item">
					<span class="item-title"><i>*</i> 公众号所属公司：</span>
					<Select v-model="publicObj.companyId" style="width: 340px" @on-change="companyChange">
						<Option v-for="item in companyIdList" :value="item.id" :key="item.id">{{ item.remarks }}</Option>
					</Select>
					<p class="notice" v-if="publicObj.companyId==15&&hasCore == 'false'">
						<Checkbox v-model="coreNum" @on-change="settingCore">设置为核心公众号</Checkbox>
					</p>
				</li>
			</ul>
			<div class="config-public" v-if="process==2">
				<p>请在公众平台开发者中心里的服务器配置录入以下参数</p>
				<p v-for="(item, index) in dataList" :key="index" :style="{color:index>1?'#000':'#44bcbc'}">
					<span class="config-title">{{item.name}}</span>
					<span style="display:block;float:left;width: 300px">{{baseObj[item.key]}}</span>
				</p>
			</div>
			<ul class="aro" v-if="process==3">
				<li class="aro-item">
					<span class="item-title item-top"><i>*</i> 头像：</br></span>
					<Upload ref="upload" :data="uploadData" name="files" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :action="uploadFileUrl" style="width: 80px;height:80px;">
						<div style="" class="upload_cont">
							<img :src="portObj.uploadFile" v-if="portObj.uploadFile" />
							<Icon type="plus-circled" :size="30" v-else></Icon>
						</div>
					</Upload>
					<div v-if="headImg" class="headImgErr">文件名不能为中文</div>
					<!-- <Input v-model="portObj.appid" placeholder="" style="width: 340px" /> -->
				</li>
				<li class="aro-item">
					<span class="item-title item-top"><i>*</i> 公众号二维码：</br></span>
					<Upload ref="upload1" :data="uploadData" name="files" :show-upload-list="false" :on-success="handleSuccess1" :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload1" type="drag" :action="uploadFileUrl" style="width: 120px;height:120px;">
						<div style="" class="upload_cont1">
							<img :src="portObj.uploadFile1" v-if="portObj.uploadFile1" />
							<Icon type="plus-circled" :size="30" v-else></Icon>
						</div>
					</Upload>
					<!-- <Input v-model="portObj.appid" placeholder="" style="width: 340px" /> -->
				</li>
				<li class="aro-item">
					<span class="item-title item-top"><i>*</i> APP ID：</br><b>(应用ID)　</b></span>
					<Input v-model="portObj.appid" placeholder="" style="width: 340px" />
				</li>
				<li class="aro-item">
					<span class="item-title item-top"><i>*</i> AppSecret：</br><b>(应用密钥)　</b></span>
					<Input v-model="portObj.secret" placeholder="" style="width: 340px" />
					</br>
				</li>
				<li class="aro-item">
					<span class="item-title item-top"><i>*</i> 消息加解密方式：</br></span>
					<Select v-model="way" style="width: 340px">
						<Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<!-- <Input v-model="portObj.secret" placeholder="" style="width: 340px" /></br> -->
				</li>
				<li class="aro-item" v-if="way=='aq'">
					<span class="item-title item-top"><i>*</i> EncodingAESKey：</br><b>(安全模式下必填)　</b></span>
					<Input v-model="portObj.encodingaeskey" placeholder="" style="width: 340px" />
				</li>
				<li class="aro-item">
					<span class="item-title item-top"><i>*</i> Biz URL：</span>
					<Input v-model="portObj.bizUrl" placeholder="" style="width: 340px" />
				</li>
			</ul>
			<ul class="aro" v-if="process==4">
				<li class="aro-item4">
					<div style="" class="qrcode">
						<img :src="qrcode" />
						<p>扫一扫，关注微信号</p>
					</div>
				</li>
				<li class="aro-item4">
					<p class="qrHint">关联微信管理员，请选择<span>本系统账号</span>所属人的微信号</p>
					<Select value="" filterable remote :remote-method="remoteMethod" placeholder="请选择关联账户" :loading="openIdLoading" class="userSel" @on-change="openIdChange" :label-in-value="true">
						<Option v-for="(item, index) in userList" :value="item.name" :label="item.openId" :key="index" style="text-align: left;">
							<img :src="item.avatarUrl" />
							<span>{{item.name}}</span>
						</Option>
					</Select>
				</li>
				<li class="aro-item4 ">
					<div class="warn">
						<Icon type="ios-information-outline" size="26" color="#ffaa49"></Icon>
						<p class="warnHint">如果选择错误，系统将无法正常收集您的市场营销数据，以防损害您的利益，请谨慎选择关联用户。</p>
					</div>
				</li>
			</ul>
			<p style="text-align:center">
				<Button type="primary" class="primary_btn_new1" @click="upPage" v-if="process==3">上一步</Button>
				<Button type="primary" class="primary_btn_new1" @click="revokeUp" v-if="process==2">上一步</Button>
				<Button type="primary" class="primary_btn_new1" @click="cancelAdd"> 取消 </Button>
				<Button type="primary" class="primary_btn_new1" @click="downPage">{{isFinish}}</Button>
			</p>
		</div>
		<!-- 对话框 -->
		<Modal
            v-model="modal2"
            title="提示"
            width=728
            @on-ok="ok"
            @on-cancel="cancel">
			<div style="text-align:center">
				<Icon type="ios-information-outline" size="75" color="#ffaa49"></Icon><br/><br/>
				<span>设置核心服务号的操作不能修改, 请慎重选择</span>
            </div>
        </Modal>
	</div>
</template>

<script>
	import titleC from './titleC'
	import valid, {
		errors,
		sys,
		publicNumM,
		wpMarketCommon,
		useM
	} from '../../libs/request';
	import { mapState, mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				modal2: false,
				hasCore: this.$route.query.isHasCore,
				openId: '',
				coreNum: false,
				openIdLoading: false,
				userList: [],
				newPubId: '',
				companyIdList: [],
				uploadData: {
					type: 'wp_inviting_page_image',
					dirName: 'all',
					meunId: '1001'
				},
				publicObj: {
					publicName: '',
					publicId: '',
					type: '',
					companyId: ''
				},
				portObj: {
					appid: '',
					secret: '',
					encodingaeskey: '',
					uploadFile: '',
					uploadFile1: '',
					bizUrl: ''
				},
				publicList: [],
				process: 1,
				value: '',
				isFinish: '下一步',
				dataList: [{
						name: 'URL(服务器地址)：',
						key: 'url'
					},
					{
						name: 'Token(令牌)：',
						key: 'token'
					},
					// {name: 'EncodingAESKey(消息加解密密钥)：', key: 'token'},
					 {name: 'IP白名单：', key: 'whiteListIp'},
				],
				baseObj: {
					url: '',
					token: ''
				},
				newTitleList: [{
						name: '基本信息',
						num: '1',
						isAct: true
					},
					{
						name: '配置公共平台',
						num: '2',
						isAct: false
					},
					{
						name: '保存接口配置',
						num: '3',
						isAct: false
					},
					{
						name: '关联微信管理员',
						num: '4',
						isAct: false
					},
				],
				way: '',
				wayList: [{
						value: 'mw',
						label: '明文模式'
					},
					{
						value: 'jr',
						label: '兼容模式'
					},
					{
						value: 'aq',
						label: '安全模式（推荐）'
					}
				],
				qrcode: '',
				attachmentId: '',
				headImg:false,
			}
		},

		components: {
			titleC,
		},

		computed: {
			uploadFileUrl() {
				return wpMarketCommon.getUploadFileUrl();
			}
		},

		watch: {
			process() {
				if(this.process != 4) {
					this.isFinish = '下一步'
				}
				if(this.process == 1) {
					this.newTitleList = [{
							name: '基本信息',
							num: '1',
							isAct: true
						},
						{
							name: '配置公共平台',
							num: '2',
							isAct: false
						},
						{
							name: '保存接口配置',
							num: '3',
							isAct: false
						},
						{
							name: '关联微信管理员',
							num: '4',
							isAct: false
						},
					]
					return
				}
				if(this.process == 2) {
					this.newTitleList = [{
							name: '基本信息',
							num: '1',
							isAct: true
						},
						{
							name: '配置公共平台',
							num: '2',
							isAct: true
						},
						{
							name: '保存接口配置',
							num: '3',
							isAct: false
						},
						{
							name: '关联微信管理员',
							num: '4',
							isAct: false
						},
					]
					return
				}
				if(this.process == 3) {
					this.newTitleList = [{
							name: '基本信息',
							num: '1',
							isAct: true
						},
						{
							name: '配置公共平台',
							num: '2',
							isAct: true
						},
						{
							name: '保存接口配置',
							num: '3',
							isAct: true
						},
						{
							name: '关联微信管理员',
							num: '4',
							isAct: false
						},
					]
					return
				}
				if(this.process == 4) {
					this.isFinish = '进入公众号'
					this.newTitleList = [{
							name: '基本信息',
							num: '1',
							isAct: true
						},
						{
							name: '配置公共平台',
							num: '2',
							isAct: true
						},
						{
							name: '保存接口配置',
							num: '3',
							isAct: true
						},
						{
							name: '关联微信管理员',
							num: '4',
							isAct: true
						},
					]
					return
				}
			},
		},

		mounted() {
			this.loadCompany()
			this.getBatchList()
		},

		methods: {
			...mapMutations(["updateLoadingStatus"]),
			settingCore() {
				this.modal2 = true
			},

			ok() {
			},

			cancel() {
				this.coreNum = false
			},

			companyChange(val) {
				console.log(val)
			},

			loadCompany() {
				let data = {
					grade: 2,
					types: '1,2'
				}
				wpMarketCommon.officeList(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.companyIdList = res.data.data.allCompany
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			getBatchList() {
				let obj = {
					types: 'wp_apps_type'
				}
				sys.batchListData(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.publicList = res.data.data.wp_apps_type
					}
				}).catch(errors.call(this));
			},

			upPage() {
				this.process--
					this.process <= 0 ? this.process = 1 : this.process
			},

			downPage() {
				if(this.process == 1) {
					let onOff = false
					Object.values(this.publicObj).forEach(item => {
						if(!item) {
							onOff = true
						}
					})
					if(onOff) {
						this.$Message.info('请填写必填项')
						return
					}
					this.saveStep1()
				} else if(this.process == 3) {
					this.saveStep3()
				} else if(this.process == 2) {
					this.upDataFoot()
				} else {
					this.saveStep4()
				}

			},

			upDataFoot() {
				this.process++
					this.process > 4 ? this.process = 4 : this.process
			},

			saveStep1() {
				let obj = {
					type: this.publicObj.type,
					publicId: this.publicObj.publicId,
					publicName: this.publicObj.publicName,
					//wxId: this.publicObj.wxId,
//					createNick: this.publicObj.createNick,
					companyId: this.publicObj.companyId,
				}
				if (this.coreNum) {
					obj = Object.assign(obj, {
						isCore: 1
					})
				}
				publicNumM.saveStep1(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.upDataFoot()
						this.baseObj = res.data.data
						this.$Message.info(res.data.message)
					}
				}).catch(errors.call(this));
			},

			revoke() {
				let obj = {
					id: this.baseObj.id
				}
				publicNumM.revoke(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$router.go(-1)
					}
				}).catch(errors.call(this));
			},

			revokeUp() {
				let obj = {
					id: this.baseObj.id
				}
				publicNumM.revoke(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.process--
							this.process <= 0 ? this.process = 1 : this.process
					}
				}).catch(errors.call(this));
			},

			saveStep3() {
				if(!this.portObj.appid) {
					this.$Message.info('请填写appid')
					return
				}
				if(!this.portObj.secret) {
					this.$Message.info('请填写密钥')
					return
				}
				if(!this.way) {
					this.$Message.info('请选择模式')
					return
				}
				if(!this.portObj.encodingaeskey && this.way == 'aq') {
					this.$Message.info('请选择加密方式')
					return
				}
				if(!this.portObj.bizUrl) {
					this.$Message.info('请选择Biz URL')
					return
				}
				if(!this.uploadList) {
					this.$Message.error('请选择文件')
					return
				}
				if(!this.uploadList1) {
					this.$Message.error('请选择二维码')
					return
				}
				if(this.headImg){
					this.$Message.error('头像文件名不能为中文')
					return
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				let item = this.uploadList;
				this.$refs.upload.post(item);
			},

			handleBeforeUpload(file) {
				if(file.name.match(/[\u4e00-\u9fa5]/g)){
					this.headImg=true;
				}else{
					this.headImg=false;
				}
				let reader = new FileReader();
				// readAsDataURL 方法用于读取指定 Blob 或 File 的内容
				// 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
				// 读取文件作为 URL 可访问地址
				reader.readAsDataURL(file);
				const _this = this;
				reader.onloadend = function(e) {
					_this.portObj.uploadFile = reader.result;
				};
				this.uploadList = file;
				// this.isUploadImg = true;
				// 返回 falsa 停止自动上传 我们需要手动上传
				return false
			},

			handleBeforeUpload1(file) {
				let reader = new FileReader();
				// readAsDataURL 方法用于读取指定 Blob 或 File 的内容
				// 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
				// 读取文件作为 URL 可访问地址
				reader.readAsDataURL(file);
				const _this = this;
				reader.onloadend = function(e) {
					_this.portObj.uploadFile1 = reader.result;
				};
				this.uploadList1 = file;
				// this.isUploadImg = true;
				// 返回 falsa 停止自动上传 我们需要手动上传
				return false
			},

			handleSuccess(data) {
				if(data.status == "success") {
					let item1 = this.uploadList1;
					this.attachmentId = data.data.id;
					this.$refs.upload1.post(item1);
				} else {
					this.updateLoadingStatus({
						isLoading: false
					});
					this.$Message.error(data.message);
				}
			},

			handleSuccess1(data) {
				if(data.status == "success") {
					this.qrcode = data.data.filePath;
					let obj = {
						appid: this.portObj.appid,
						secret: this.portObj.secret,
						encodingaeskey: this.way == 'aq' ? this.portObj.encodingaeskey : '',
						id: this.baseObj.id,
						attachmentId: this.attachmentId,
						qrcodeUrl: data.data.filePath,
						bizUrl: this.portObj.bizUrl
					}
					publicNumM.saveStep3(obj).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.upDataFoot()
							this.$Message.info(res.data.message)
//							this.$router.go(-1)
						}
					}).catch(errors.call(this)).finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
				} else {
					this.updateLoadingStatus({
						isLoading: false
					});
					this.$Message.error(data.message);
				}
			},

			handleFormatError() {
				this.$Message.error("需使用'jpg','jpeg','png','gif'格式");
			},

			handleMaxSize() {
				this.$Message.error("图片不得大于4M");
			},

			cancelAdd() {
				if(this.process == 1) {
					this.$router.go(-1)
					return
				}
				this.revoke()
			},
			remoteMethod(item) {
				this.openIdLoading = true;
				let obj = {
					name: item,
					tagName: '',
					appId: this.baseObj.id,
					pageSize: '',
					pageNo: -1,
				}
				useM.getDataList(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.userList = res.data.data.list;
					}else{
						this.userList = []
					}
				}).catch(errors.call(this)).finally(() => {
					this.openIdLoading = false;
				});
			},
			saveStep4() {
				let obj = {
					id: this.baseObj.id,
					openId: this.openId
				}
				publicNumM.saveStep4(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						let objx={
							id:this.baseObj.id,
							publicName:this.publicObj.publicName
						}
						this.updateMenu(objx)
						this.$Message.success(res.data.message)
					}
				}).catch(errors.call(this));
			},
			updateMenu(item) {
//				let obj2 = {
//					appId: item.id,
//				}
//				publicNumM.sendM(obj2).then(valid.call(this)).then(res => {
//					if(res.ok) {
						this.goMenu(item)
//					}
//				}).catch(errors.call(this));

			},

			goMenu(item) {
				let id = 1023
				sys.listGrantMenu({
					id,
				}).then(valid.call(this)).then(res => {
					sessionStorage.setItem('publicInfo', JSON.stringify({
						id: item.id,
						publicName: item.publicName
					}))
					let menus = res.data.data
					menus = menus.map(item1 => {
						if(item1.name == '不能改自动换菜单名字') {
							item1.name = item.publicName
						}
						return item1
					})
					this.$store.commit('market/updateMenu', {
						menu: menus,
						isPush: true,
						name: item.publicName
					});
				}).catch(errors.call(this));
			},
			openIdChange(v){
				this.openId=v.label;
			},
		}
	}
</script>