<style lang='less'>
	.add-auto-return-gsx {
		.add-aro,
		.item-name {
			margin: 0;
			padding: 0;
		}
		.add-aro {
			padding-left: 32px;
			.aro-item {
				color: #b8b8b8;
				padding-left: 118px;
				position: relative;
				line-height: 55px;
				min-height: 55px;
				margin-bottom: 5px;
				list-style: none;
				.item-name {
					position: absolute;
					left: 0;
					display: inline-block;
					width: 100px;
					text-align: right;
					top: 2px;
					i {
						font-style: normal;
						color: red;
					}
					.label {
						display: inline-block;
						line-height: 20px;
						padding-top: 6px;
						.red {
							color: #FF0000;
						}
					}
				}
				.promoter {
					font-size: 12px;
					line-height: 24px;
					padding-top: 4px;
				}
				.notice {
					color: red;
					font-size: 10px;
					line-height: 20px;
				}
			}
		}
		.handle {
			text-align: center;
			margin-top: 60px;
		}
	}
</style>
<template>
	<div class="add-auto-return-gsx">
		<ul class="add-aro">
			<li class="aro-item">
				<span class="item-name">
                    <i>*</i> 回复类型
                </span>
				<RadioGroup v-model="autoObj.welcomeType">
					<Radio label="default">自动回复</Radio>
					<Radio label="appWelcome">公众号欢迎语</Radio>
					<Radio label="saleWelcome" v-if="$route.query.type==4">推广员欢迎语</Radio>
				</RadioGroup>
			</li>
			<li class="aro-item" v-if="autoObj.welcomeType=='default'">
				<span class="item-name">
                    <i>*</i> 关键词
                </span>
				<Input v-model="autoObj.keyword" :maxlength=255 placeholder="" style="width: 100%" />
				<p class="notice">多个关键词,请用英文逗号隔开</p>
			</li>
			<li class="aro-item" v-if="autoObj.welcomeType!='saleWelcome'">
				<span class="item-name">
                    <i>*</i> 回复内容
                </span>
				<Button type="primary" @click="chooseFodder">选择{{arr[num1-1]}}</Button>
			</li>
			<li class="aro-item" v-if="autoObj.welcomeType!='saleWelcome'">
				<span class="item-name">
                    <i>*</i>素材
                </span>
				<div style="width: 242px;border: 1px solid #f0f2fa;z-index:888" @click="chooseFodder">
					<show-fodder v-if="(id&&autoObj.materialId)||!id" :num1='num1' ref="fodderModel" @fodderInfo='fodderInfo' :id='autoObj.materialId'>
					</show-fodder>
				</div>
			</li>
			<li class="aro-item" v-if="autoObj.welcomeType=='saleWelcome'">
				<span class="item-name">
                    <i>*</i> 开头文字
                </span>
				<Input v-model="welcomeObj.saleWelcomeHead" type="textarea" :rows="2" placeholder="" style="width: 100%" />
			</li>
			<li class="aro-item" v-if="autoObj.welcomeType=='saleWelcome'">
				<span class="item-name">
                     <div class="label"><span><i>*</i> 预置部分</span><br /><span class="red">（暂不能修改）</span></div>
	</span>
	<div class="promoter">
		<p>姓名：（推广员姓名）</p>
		<p>手机号：（推广员手机号）</p>
	</div>
	</li>
	<li class="aro-item" v-if="autoObj.welcomeType=='saleWelcome'">
		<span class="item-name">
                    <i>*</i> 结尾文字
                </span>
		<Input v-model="welcomeObj.saleWelcomeFoot" type="textarea" :rows="2" placeholder="" style="width: 100%" />
	</li>
	</ul>
	<p class="handle">
		<Button type="primary" class="primary_btn_new1" @click="save">确认保存</Button>
	</p>
	</div>
</template>

<script>
	import resourceC from '../../modules/resourceC.vue'
	import showFodder from './showFodder.vue'
	import valid, {
		errors,
		sys,
		publicAction
	} from '../../libs/request';
	// import {mapState} from 'vuex'
	import { mapMutations } from 'vuex'

	export default {
		data() {
			return {
				id: this.$route.query.autoId || '',
				arr: ['图文素材', '图片素材', '语音素材', '视频素材', '文本素材', ],
				publicInfo: '',
				modal2: false,
				num1: this.$route.query.type / 1 + 1,
				items1: [],
				items1: [],
				items1: [],
				items1: [],
				items1: [],
				welcomeObj: {
					saleWelcomeHead: '',
					saleWelcomeFoot: '',
				},
				autoObj: {
					keyword: '',
					autoType: '',
					materialId: '',
					welcomeType: 'default'
				}
			}
		},

		components: {
			resourceC,
			showFodder
		},

		computed: {
			// ...mapState('market', ['publicInfo'])
		},

		watch: {
			num1: {
				handler(newName, oldName) {
					switch(this.num1) {
						case 1:
							this.autoObj.autoType = 'news';
							break;
						case 2:
							this.autoObj.autoType = 'image';
							break;
						case 3:
							this.autoObj.autoType = 'voice';
							break;
						case 4:
							this.autoObj.autoType = 'video';
							break;
						case 5:
							this.autoObj.autoType = 'text';
							break;
					}
				},
				immediate: true
			}
		},

		mounted() {
			this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
			if(this.id) this.getformDetail()
		},

		methods: {
			...mapMutations(['updateLoadingStatus']),

			getformDetail() {
				let obj = {
					id: this.id
				}
				publicAction.getDetail(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.autoObj = res.data.data
					}
				}).catch(errors.call(this));
				if(this.$route.query.type == 4) {
					publicAction.getWelcome({
						appId: this.$route.query.appId
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.welcomeObj = res.data.data
						}
					}).catch(errors.call(this));
				}
			},

			save() {
				if(this.autoObj.welcomeType == 'saleWelcome') {
					this.updateWelcome();
					return false;
				}
				if(this.autoObj.welcomeType == 'default' && !this.autoObj.keyword) {
					this.$Message.info('请输入关键字')
					return
				}
				if(!this.autoObj.materialId) {
					this.$Message.info('选择素材')
					return
				}
				if(!this.autoObj.welcomeType) {
					this.$Message.info('请选择回复类型')
					return
				}
				let obj = {}
				if(this.id) {
					obj = this.autoObj
				} else {
					obj = {
						keyword: this.autoObj.keyword,
						materialId: this.autoObj.materialId,
						msgType: this.autoObj.autoType,
						appId: this.publicInfo.id,
						welcomeType: this.autoObj.welcomeType,
					}
				}
				this.updateLoadingStatus({
					isLoading: true
				})
				publicAction.saveAuto(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.$router.replace({
							name: 'publicAction.index',
							query: {
								currentIndx: 2,
							}
						})
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					})

				});
			},

			fodderInfo(value) {
				this.autoObj.materialId = value.id
			},

			chooseFodder() {
				this.$refs.fodderModel.getListPage()
			},
			updateWelcome() {
				if(!this.welcomeObj.saleWelcomeHead) {
					this.$Message.info('请填写开头文字')
					return
				}
				if(!this.welcomeObj.saleWelcomeFoot) {
					this.$Message.info('请填写结尾文字')
					return
				}
				let obj = {}
				if(this.id) {
					obj = this.welcomeObj
				} else {
					obj = {
						keyword: "",
						appId: this.publicInfo.id,
						saleWelcomeHead: this.welcomeObj.saleWelcomeHead,
						saleWelcomeFoot: this.welcomeObj.saleWelcomeFoot
					}
				}
				this.updateLoadingStatus({
					isLoading: true
				})
				publicAction.updateWelcome(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.$router.replace({
							name: 'publicAction.index',
							query: {
								currentIndx: 2,
							}
						})
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					})

				});
			}
		}
	}
</script>