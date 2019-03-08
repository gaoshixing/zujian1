<template>
	<div class="set-display-boss">
		<ListCard title="编号" :content="getedInfo && getedInfo.code" style="margin-bottom: 5px;"></ListCard>
		<ListCard title="邀请购买" :content="getedInfo && getedInfo.title" style="margin-bottom: 5px;"></ListCard>
		<ListCard title="展示有效期" style="margin-bottom: 5px;">
			<DatePicker v-model="deadline" :readonly=true disabled type="datetime" placeholder="请设置展示有效期" style="width: 200px" class="set-dis-date"></DatePicker>
		</ListCard>
		<div class="input-post-container">
			<p><i class="red-class">*</i> 设置海报及二维码</p>
			<div class="add-img-button" v-if="lastImage" @click="onclickToModify">
				<img v-if="!uploadImg || changed" :src="lastImage" id="poster" alt="">
				<img v-if="uploadImg" :src="uploadImg" id="poster" alt="">
				<div id="qrcodeDis" ref="qrcode" :style=" {left: initialLeft, top: initialTop, position: 'absolute', }" v-show="!changed"></div>
			</div>
			<div class="click-to-modify">
				<p @click="onclickToModify">修改</p>
				<span v-if="isShow"><Icon type="information-circled"></Icon>&nbsp;隐藏任务,才可以对其进行编辑</span>
			</div>
		</div>
		<div class="set-display-button-containers" v-if="isShow">
			<div class="common-button common-button-cancel common-button-large" @click="onClickBack">返回</div>
			<div class="common-button" @click="onclickisShow">隐藏</div>
		</div>
		<div class="set-display-button-container" v-if="!isShow">
			<div class="common-button common-button-cancel common-button-large" @click="onClickBack">返回</div>
			<div class="common-button" @click="onclickSave(1)">保存信息并展示</div>
			<div class="common-button common-button-large" @click="onclickSave(0)">保存</div>
		</div>
		<Modal v-model="addImg" width="730px" title="设置海报及二维码" class="add-img-modal" okText="保存设置" cancelText="取消" @on-ok="addImgOk" @on-cancel="addImgCancel">
			<div class="modal-img-container" id="imgContent" style="position: relative;">
				<img :src="lastImage || uploadImg" alt="">
				<div id="qrcode" ref="qrcode" :style=" {'left': lefts + 'px', 'top': tops + 'px'}"></div>
			</div>

			<div class="modal-right-container">
				<div class="modal-right-post">
					<p>自定义海报</p>
					<div>
						<div class="common-button" style="margin-bottom: 5px; position: relative; ">
							点击上传
							<input type="file" accept="image/jpeg, image/jpg, image/png" v-on:change="uploadImgChange" ref="uploadImgButton">
						</div> <br>
						<span>上传图片分辨率比例为9:16（推荐尺寸750x1344），<br/> jpg,png格式，图片不大于1M</span>
					</div>
				</div>
				<div class="modal-right-qr">
					<p>自定义二维码位置</p>
					<div>
						<p>鼠标拖动方块，可自定义二维码位置</p>
						<div class="common-button" style="margin-top: 5px;" @click="onclickToResetQrPosi">默认位置</div>
					</div>
				</div>
			</div>
		</Modal>
		<Upload ref="upload" :data="uploadData" name="files" :show-upload-list="false" :on-success="handleSuccess" type="drag" :action="uploadFileUrl" style="visibility: hidden;">
		</Upload>
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2';
	import html2canvas from 'html2canvas';
	import ListCard from '../../modules/listCard.vue';
	import valid, {
		errors,
		sys,
		common,
		wpTask,
		wpMarketCommon,
	} from '../../libs/request.js';
	import { waitUntil, } from '@public/libs/util';
	import { mapMutations, } from 'vuex';

	export default {
		name: 'modifyDisplay',
		components: {
			ListCard,
		},
		data() {
			return {
				initialLeft: null, // 用户已经设置的 x, y 坐标
				initialTop: null,
				getedInfo: null,
				lefts: 60, // 默认的 x, y 坐标
				tops: 260,
				isShow: false, // 隐藏 隐藏按钮
				deadline: null, // 截止日期
				addImg: false, // 添加 海报的 modal
				initImage: null, // 之前设置的 poster
				uploadImg: null, // 上传的图片
				lastImage: null, // 带 二维码的图片
				changed: false, // 是否修改过 修改过的话 使用的是 uploadImg
				file: null,
				uploadData: {
					type: 'wp_task_poster_image',
					dirName: 'all',
					meunId: '1001'
				},
			};
		},
		computed: {
			uploadFileUrl() {
				return wpMarketCommon.getUploadFileUrl();
			},
		},
		created() {},
		mounted() {
			this.isShow = this.$route.query.isShow === '0' ? false : true;
			this.getInfo();
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			/*
			 * 点击修改
			 */
			onclickToModify() {
				if(this.isShow) {
					this.$Message.error('隐藏任务，才可以对其进行编辑');
					return;
				}
				this.addImg = true;
				this.qrcodes('qrcode');
				this.dragDrop();
			},
			/*
			 * 点击隐藏
			 */
			onclickisShow() {
				this.onclickSave(0, 'isShow');
			},
			/*
			 * 点击返回
			 */
			onClickBack() {
				this.$router.go(-1);
			},
			/*
			 * 点击保存 or 展示
			 */
			onclickSave(type, from) {
				waitUntil(() => {
					if(from === 'isShow') return true;
					if(!this.changed) return true;
					this.updateLoadingStatus({
						isLoading: true
					});
					return !!this.imageId;
				}, () => {
					const data = {
						id: this.$route.query.id,
						code: this.getedInfo.code,
						title: this.getedInfo.title,
						objectId: this.getedInfo.objectId,
						objectType: this.getedInfo.objectType,
						objectCode: this.getedInfo.objectCode,
						clickNum: this.getedInfo.clickNum,
						successNum: this.getedInfo.successNum,
						isShow: type, // 展示状态
						isUse: this.getedInfo.isUse || 1,
						endTime: this.getedInfo.endTime,
						imageId: this.changed ? this.imageId : this.getedInfo.imageId,
						axisX: (Number(this.lefts) / 180 * 100).toFixed(2) + '%',
						axisY: (Number(this.tops) / 350 * 100).toFixed(2) + '%',
					};
					wpTask.save(data).then(valid.call(this)).then(res => {
						if(res.ok) {
							if(from === 'isShow') {
								this.isShow = false;
								this.$Message.info('设置隐藏成功');
							} else {
								this.$Message.info(res.data.message);
								this.$router.go(-1);
							}
						}
					}).catch(errors.call(this)).finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
				});
			},
			/*
			 * 添加海报 modal
			 */
			addImgOk() {
				this.changed = true;
				this.hmltToCanvas();
				this.updateLoadingStatus({
					isLoading: true
				});
				this.file && this.$refs.upload.post(this.file); // 上传 获取到的 最新的图片
			},
			handleSuccess(data) {
				if(data.status == "success") {
					this.imageId = data.data.id;
					waitUntil(() => {
						return !!this.imageId;
					}, () => this.updateLoadingStatus({
						isLoading: false
					}));
				} else {
					this.$Message.error(data.message);
					this.updateLoadingStatus({
						isLoading: false
					});
				}
			},
			addImgCancel() {
				document.getElementById('qrcode').innerHTML = '';
				document.getElementById('imgContent').getElementsByTagName('img')[0].setAttribute('src', this.lastImage);
			},
			/*
			 * 默认位置
			 */
			onclickToResetQrPosi() {
				this.lefts = 60;
				this.tops = 260;
			},
			/*
			 * 选择图片 
			 */
			uploadImgChange(data) {
				const imgContent = document.getElementById('imgContent'); // img container
				const qrcode = document.getElementById('qrcode'); // qrcode
				const file = data.target.files[0];
				if(!file.type.includes('png') && !file.type.includes('jpg') && !file.type.includes('jpeg')) {
					this.$Message.error('请上传jpg,png格式图片');
					return;
				}
				if(file) {
					// qrcode.innerHTML = '';
					imgContent.getElementsByTagName('img')[0].setAttribute('src', '');
				}
				const size = file.size / 1024 / 1024;
				if(size > 1) {
					this.$Message.error('图片大小不得超过1M');
					data.target.value = "";
					return;
				};
				this.uploadImg = file;
				this.getPoster(file);
			},
			/*
			 * 渲染图片
			 */
			getPoster(file) {
				const _this = this;
				var reader = new FileReader(); //新建FileReader对象
				reader.readAsDataURL(file); //读取为base64
				this.file = file;
				reader.onloadend = function(e) {
					var dataURL = reader.result;
					const Img = new Image();
					Img.src = dataURL;
					Img.onload = () => {
						const imgContent = document.getElementById('imgContent');
						const img = imgContent.getElementsByTagName('img')[0];
						imgContent.replaceChild(Img, img);
					};
				};
			},
			// 绘制二维码
			qrcodes(dom) {
				new QRCode(dom, {
					width: 60, // 设置宽度，单位像素
					height: 60, // 设置高度，单位像素
					text: '占位二维码' // 设置二维码内容或跳转地址
				});
			},
			// 二维码拖放
			dragDrop() {
				let ex = 0;
				let ey = 0;
				let dx = 0; // debounce x
				let dy = 0;
				let isDown = false;
				const qrcode = document.getElementById('qrcode');
				const imgContent = document.getElementById('imgContent');
				const bodys = document.getElementsByTagName('body')[0];
				qrcode.setAttribute('draggable', true);
				qrcode.addEventListener('mousedown', (e) => {
					e.preventDefault();
					isDown = true;
					ex = e.clientX;
					ey = e.clientY;
					dx = ex - qrcode.getBoundingClientRect().left; // 点击时 鼠标距离 qrcode 左上角的距离
					dy = ey - qrcode.getBoundingClientRect().top;

					qrcode.style.left = ex - dx - imgContent.getBoundingClientRect().left + 'px';
					qrcode.style.top = ey - dy - imgContent.getBoundingClientRect().top + 'px';

					bodys.addEventListener('mousemove', (e) => {
						if(!isDown) return;
						e.preventDefault();
						this.lefts = e.clientX - dx - imgContent.getBoundingClientRect().left;
						this.tops = e.clientY - dy - imgContent.getBoundingClientRect().top;
						this.lefts = this.lefts <= 0 ? 0 : this.lefts;
						this.lefts = this.lefts >= (imgContent.offsetWidth - qrcode.offsetWidth) ? (imgContent.offsetWidth - qrcode.offsetWidth) : this.lefts;
						this.tops = this.tops <= 0 ? 0 : this.tops;
						this.tops = this.tops >= (imgContent.offsetHeight - qrcode.offsetHeight) ? (imgContent.offsetHeight - qrcode.offsetHeight) : this.tops;
						qrcode.style.left = this.lefts + 'px';
						qrcode.style.top = this.tops + 'px';
					});
				});
				qrcode.addEventListener('mouseup', function(e) {
					isDown = false;
				});
			},
			hmltToCanvas() {
				this.updateLoadingStatus({
					isLoading: true
				});
				const _this = this;
				const imgContent = document.getElementById('imgContent');
				html2canvas(imgContent).then(function(canvas) {
					_this.lastImage = canvas.toDataURL("image/jpeg")
					document.getElementById('qrcode').innerHTML = '';
					_this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			/*
			 * 数据获取
			 */
			getInfo() {
				const data = {
					id: this.$route.query.id,
				};
				wpTask.form(data).then(valid.call(this)).then(res => {
					this.getedInfo = res.data.data;
					this.deadline = this.getedInfo.endTime;
					this.getPicture();
				}).catch(errors.call(this));
			},
			/*
			 * 获取图片
			 */
			getPicture() {
				const params = {
					id: this.getedInfo.imageId,
				}
				sys.getPathMarket(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.initImage = res.data.data.path;
						this.lastImage = res.data.data.path;
						this.$nextTick(() => {
							waitUntil(() => {
								return !!document.getElementById('poster');
							}, () => {
								document.getElementById('poster').onload = () => {
									this.initialLeft = this.getedInfo.axisX;
									this.initialTop = this.getedInfo.axisY;
									this.qrcodes('qrcodeDis');
								};
							});
						})
					}
				}).catch(errors.call(this));
			},
		},
	};
</script>

<style lang="less">
	@import url('../../less/common.less');
	.set-display-boss {
		.set-dis-date {
			position: absolute;
			left: 127px;
			top: 0;
		}
		.input-post-container {
			position: relative;
			width: 100%;
			height: 360px;
			margin-bottom: 100px;
			>p {
				display: inline-block;
				color: #999;
				float: left;
				width: 110px;
				height: 33px;
				line-height: 33px;
				text-align: right;
			}
			.add-img-button {
				position: absolute;
				left: 137px;
				top: 10px;
				width: 180px;
				height: 350px;
				cursor: pointer;
				border-radius: 5px;
				background-color: rgba(10, 10, 10, .05);
				.add-img-icon {
					width: 30px;
					height: 30px;
					border: solid 1px #999;
					position: absolute;
					border-radius: 5px;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					&:before {
						content: '';
						display: block;
						position: absolute;
						width: 12px;
						height: 3px;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						background-color: #999;
					}
					&:after {
						content: '';
						display: block;
						position: absolute;
						width: 3px;
						height: 12px;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						background-color: #999;
					}
				}
			}
		}
		.set-display-button-container {
			width: 410px;
			height: 36px;
			display: flex;
			margin-left: 322px;
			justify-content: space-between;
		}
		.set-display-button-containers {
			width: 210px;
			height: 36px;
			display: flex;
			margin-left: 322px;
			justify-content: space-between;
		}
	}
	
	.add-img-modal {
		.ivu-modal-body {
			overflow: hidden;
			.modal-img-container {
				width: 180px;
				height: 350px;
				position: relative;
				margin-right: 20px;
				float: left;
				margin-bottom: 20px;
				>img {
					display: block;
					width: 180px;
					height: 350px;
				}
				>img[src=""],
				img:not([src]) {
					opacity: 0;
				}
				&:after {
					content: '效果预览';
					display: block;
					color: #333;
					position: absolute;
					left: 50%;
					top: 100%;
					transform: translate(-50%);
					font-size: 14px;
					text-align: center;
					margin-top: 5px;
				}
			}
			.modal-right-container {
				float: left;
				width: 440px;
				>div {
					overflow: hidden;
					>p {
						color: #999;
						width: 120px;
						display: inline;
						margin-right: 20px;
						line-height: 36px;
						float: left;
						font-size: 14px;
					}
					>div {
						float: left;
						span {
							color: #a0a0a0;
							line-height: 20px;
						}
					}
				}
			}
			.modal-right-post {
				height: 100px;
				input {
					display: block;
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
				}
			}
			.modal-right-qr {
				>div {
					>p {
						font-size: 14px;
						line-height: 36px;
					}
				}
			}
		}
	}
	
	#qrcode {
		position: absolute;
		cursor: move;
		z-index: 9999;
	}
	
	.click-to-modify {
		width: 180px;
		height: 75px;
		position: absolute;
		left: 136px;
		bottom: -39px;
		padding-top: 50px;
		box-sizing: border-box;
		p {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			line-height: 35px;
			color: #fff;
			text-align: center;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
			background: rgba(0, 0, 0, 0.1);
			display: block;
			cursor: pointer;
		}
		span {
			width: 100%;
			color: #ff0000;
			font-size: 12px;
			line-height: 20px;
			text-align: center;
			display: inline-block;
		}
	}
	
	.red-class {
		color: red !important;
	}
	
	#poster {
		width: 180px;
		height: 350px;
		border-radius: 5px;
	}
</style>