<style lang="less">
	.leftclosed {
		.crm-fixed-page {
			left: 60px;
		}
	}
	
	.crm-fixed-page {
		position: fixed;
		top: 55px;
		bottom: 0;
		right: 0;
		left: 290px;
		border-top: 1px solid #ddd;
		.player {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			margin: 0;
		}
		.fixed-header {
			position: absolute;
			background: #fff;
			height: 40px;
			left: 0;
			right: 0;
			z-index: 377;
			box-shadow: 1px 1px 5px #eee;
			padding: 0 40px;
			.filter-types {
				width: 260px;
				float: right;
				margin-top: 4px;
			}
			.date-title {
				float: left;
				line-height: 40px;
				font-size: 14px;
			}
		}
	}
	
	.crm-user-detail {
		display: flex;
		.left-main {
			flex: 7;
			overflow: hidden;
			position: relative;
			.btn-list {
				float: right;
				margin: 10px 20px 20px;
				.library {
					box-shadow: 0 0 6px 1px #a4cb6d;
					margin: 0 10px
				}
			}
			.main-content {
				max-height: ~"calc(100vh - 55px)";
				overflow: auto;
				padding-left: 20px;
				padding-bottom: 30px;
			}
		}
		.aside-tags {
			flex: 2;
			box-sizing: border-box;
			border-left: 1px solid #e0e0e0;
			padding: 10px;
			max-height: ~"calc(100vh - 55px)";
			padding-bottom: 40px;
			overflow: auto;
		}
		.h3title {
			cursor: pointer;
			.ivu-icon {
				font-size: 14px;
			}
		}
	}
</style>
<template>
	<div class="crm-fixed-page" v-if="pageok">
		<div class="crm-user-detail">
			<div class="left-main">
				<div class="fixed-header" v-if="scrollMonth">
					<div class="date-title">{{scrollMonth.time}}</div>
					<div class="filter-types">
						<Select v-model="typefilter" @on-change="onFilterChange">
							<Option value="">全部动态</Option>
							<Option :value="item.value" v-for="(item,index) in traceType" :key="'fi'+index">{{item.label}}</Option>
						</Select>
					</div>
				</div>
				<div class="main-content">
					<div class="btn-list clearfix" v-if="pageTMK&&info.status!='sign'" v-show="$route.query.isCheck!='isCheck'">
						<Button type="success" v-show="(info.status == 'valid' || info.status == '1star') && info.isAlloc == '0'" @click="showFenpei">分配客户</Button>
						<Button type="success" @click="draw" v-if="$route.query.from == 'public' &&  userInfo.companyIsUs != '1'">抢单</Button>
						<Button type="success" v-if="info.status!= 'invite' && info.status!= 'visit'" @click="transfer">转让客户</Button>
						<Dropdown>
							<Button type="primary">
								放弃客户
								<Icon type="arrow-down-b"></Icon>
							</Button>
							<DropdownMenu slot="list">
								<DropdownItem @click.native="giveup(1)" v-if="!pageTMK">有效但放弃</DropdownItem>
								<DropdownItem @click.native="giveup(0)">无效客户</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						<Button type="success" @click.stop="goSave" v-if="basedit">保存</Button>
						<Button type="success" @click.stop="goEdit" v-else>编辑</Button>
					</div>
					<div class="btn-list clearfix" v-else-if="editable&&info.status!='sign'" v-show="$route.query.isCheck!='isCheck'">
						<Button type="success" @click="movegroup" v-if="group">移动分组</Button>
						<Button type="success" @click="draw" v-if="$route.query.from == 'public'  &&  userInfo.companyIsUs != '1'">抢单</Button>
						<Button type="success" @click="shareuser">共享客户</Button>
						<Button type="success" @click="transfer">转让客户</Button>
						<Dropdown>
							<Button type="primary">
								放弃客户
								<Icon type="arrow-down-b"></Icon>
							</Button>
							<DropdownMenu slot="list">
								<DropdownItem @click.native="giveup(1)" v-if="!pageTMK">有效但放弃</DropdownItem>
								<DropdownItem @click.native="giveup(0)">无效客户</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						<Button v-if="isIntend" type="success" @click="goContract" class="library">合同库</Button>
						<Button type="success" @click.stop="goSave" v-if="basedit">保存</Button>
						<Button type="success" @click.stop="goEdit" v-else>编辑</Button>
					</div>
					<div class="btn-list clearfix" v-else-if="workerst&&info.status!='sign'" v-show="$route.query.isCheck!='isCheck'">
						<Button type="success" @click="draw" v-if="$route.query.from == 'public'  &&  userInfo.companyIsUs != '1'">抢单</Button>
						<Button type="success" @click="callshow=true">撤回</Button>
						<Modal title="Title" v-model="callshow" :closable="false">
							<p>是否撤销此客户？</p>
							<div slot="footer">
								<Button @click="callshow=false">取消</Button>
								<Button type="primary" @click="callback">确定</Button>
							</div>
						</Modal>
					</div>
					<div class="btn-list clearfix" v-else v-show="$route.query.isCheck!='isCheck'">
						<Button type="success" @click="draw" v-if="$route.query.from == 'public'  &&  userInfo.companyIsUs != '1'">抢单</Button>
					</div>
					<mctls ref="ctl" :group="group" :groupId="info.groupId" :flag="pageTMK?1:0" :share-list="info.crmCustomerShareList" :uid="uid" @share-ok="onShareOrTransOk" @transok="onShareOrTransOk" @invate-ok="onTMKInvateOk" />
					<step-bar :steps="statdata" :tmk="pageTMK" :uid="uid" :active="activeStep" :editable="editable" @need-update="needUpdate" @tmk-click="showTmkClick" :froze="froze" />
					<basic-info ref="info" :flag="pageTMK?1:0" :uid="uid" :info="info" :apply-lists="applyLists" @update-info="updateInfo" :editable="editable" />

					<follow-record ref="fl" :flag="pageTMK?1:0" :editable="editable" :info="info" :trace-types="traceType" :uid="uid" :fix-index="fixIndex" :typefilter.sync="typefilter" @scroll-month="setScrollMonth" @play="onPlay" />
					<chat-history :uid="uid" />
				</div>

			</div>
			<div class="aside-tags"><!-- {{editable}} -->
				<user-tags :actived="info.tagIds" :disabled-map="info.notChooseTags" :change-flag="editable||isWorker" :formSel="true" @ok="checkLabel" :showsave="showsavetag" :infoStatus="info.status" @do-save="dosaveTag" ref="filter" />
			</div>
		</div>
		<m-player ref="player" :closeable="true" v-if="player.visible" @on-close="onPlayerClose" class="player" :duration="duration" />
		<!-- 分配 -->
    	<tmk-fenpei ref="fenpeiModal" @getLists="onGetLists"></tmk-fenpei>
	</div>

</template>
<script>
	import stepBar from "./components/stepBar";
	import basicInfo from "./components/basicInfo";
	import followRecord from "./components/followRecord";
	import chatHistory from "./components/chatHistory";
	import mctls from "./components/mctls";

	import userTags from "../../modules/userTags";
	import mPlayer from "../../modules/mPlayer";
	import tmkFenpei from "../../modules/modal/tmkFenpei";

	import valid, {
		errors,
		crmTrace,
		sys,
		crmCustomer,
		crmCustomerSale,
		crmAllocResult,
		crmCustomerPub
	} from "../../libs/request.js";
	import { mapMutations, mapState, mapGetters, } from "vuex";
	import { throttle, waitUntil } from '@public/libs/util';

	export default {
		data() {
			return {
				fixIndex: -1,
				statusCode: -1,
				info: {},
				traceType: [],
				applyLists: [],
				statdata: [],
				monthData: {},
				player: {
					visible: false,
				},
				form: {
					sourTags: '', //客户来源
					tagIds: [], ///标签id
				},
				basedit: false,
				leftdiv: null,
				scrollMonth: null,
				typefilter: '',
				showsavetag: false,
				duration: 0,
			};
		},
		computed: {
			...mapGetters('crm', ['isCeo', 'isWorker', 'isTMK', 'isTMKLeader', 'isMarket', 'isMarketLeader', 'isSaler', 'isSalerLeader', 'isSupervisor', 'isBranchOfficeLeader', 'isHeaderOfficeLeader']),
			...mapState(['userInfo']),
			pageok() {
				return this.uid && this.statusCode != -1 && this.info;
			},
			uid() {
				return this.$route.query.id;
			},
			group() {
				return this.$route.query.group;
			},
			activeStep() {
				return this.statdata.findIndex(item => item.value == this.info.status);
			},
			isIntend() { // 确定意向,合同库按钮应再确认意向状态下才出现
				return this.info.status == 'intend';
			},
			salerss() {
				return this.isSaler;
			},
			saleleaderss() {
				return this.isSalerLeader || this.isBranchOfficeLeader || this.isHeaderOfficeLeader || this.isCeo || this.isSupervisor;
			},
			workerss() {
				return this.isWorker;
			},
			tmkerss() {
				return this.isTMK || this.isTMKLeader ;
			},
			editable() {
				if(this.tmkerss) {
					return true;
					/* if(this.$route.query.noEdit === true) {
						return true;
					}
					return false; */
				}
				if(this.$route.query.from == 'public') { // 从公共库页面过来
					return false;
				}
				if(this.$route.query.from == 'assets') { // 从资源管理（客服）
					return false;
				}
				if(this.$route.query.from == 'pond') { // 从分单池
					return false;
				}
				if(this.$route.query.from == 'usermanage') { // 从分单池
					return false;
				}
				if(this.info.status == 'init') { // 客户是新入库阶段在本页不可操作
					return false;
				}
				if(this.isWorker) { // 是分单员，分单员最多有撤回,撤回操作在另一逻辑中
					if(this.$route.query.noEdit == true) {
						return true;
					}
					return false;
				}
				// 营销中心、销售总监
				let roleLists = this.userInfo.roleId.split(',');
				// console.log(roleLists)
				if(roleLists.indexOf('907') != -1 || roleLists.indexOf('917') != -1) {
					return true;
				}
				if(roleLists.indexOf('916') != -1 ||
					roleLists.indexOf('919') != -1 //广州市场经理
				) {
					return false;
				}
				return true;
			},
			workerst() { // 分单员的权限判断
				if(this.isWorker && this.$route.query.from == 'worker') {
					if(this.info.status == 'init') {
						// 待接单 未分配 
						return true
					}
					// else 已接单 不可编辑
				}
				return false;
			},
			froze() { // 从公共库进来进度条不显示进度，不可操作 
				if(this.$route.query.from == 'public') {
					return true
				}
				if(this.info.status == 'init') { // 客户是新入库阶段在本页不可操作
					return true;
				}
			},
			pageTMK() { // 是要展示TMK页面
				return this.$route.query.tmk == 1;
			}

		},
		components: {
			stepBar,
			basicInfo,
			userTags,
			followRecord,
			chatHistory,
			mPlayer,
			mctls,
			tmkFenpei
		},
		created() {
			if(this.uid) {
				this.loadStatBar();
				this.getUserInfo();
			}
		},
		mounted() {
			waitUntil(() => {
				if(this.$el && this.$el.querySelector) {
					const el = this.$el.querySelector('.main-content');
					if(el) {
						this.leftdiv = el;
						return true
					}
				}
			}, () => {
				this.leftdiv.addEventListener('scroll', throttle(this.onscroll, 200), false);
			}, () => {
				console.error('timeout')
			}, 500, 20);
		},
		methods: {
			onGetLists() {
				this.loadStatBar();
				this.getUserInfo();
			},
			loadStatBar() {
				sys.batchListData({
					types: 'crm_trace_type,crm_customer_apply'
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.traceType = res.data.data.crm_trace_type;
						this.applyLists = res.data.data.crm_customer_apply;
					}
				}).catch(errors.call(this));
				crmCustomer.showDictStatus({
					flag: this.pageTMK ? 1 : 0,
					cusId: this.uid
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.statdata = res.data.data;
					}
				}).catch(errors.call(this));
			},
			draw() {
				crmCustomerPub.lock({
						cusId: this.info.id,
						id: this.info.pubId
					}).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							if(res.data.message == '抢单成功') {
								this.instance('success', res.data.message)
							} else {
								this.instance('error', res.data.message)
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			instance(type, content) {
				this.$Modal[type]({
					title: '抢单结果',
					content: '<p>' + content + '</p>',
					onOk: this.ok,
					width: 300,
				});
			},
			goEdit() {
				this.basedit = true;
				this.$refs.info.goEdit();
			},
			goSave() {
				this.$refs.info.goSave();
			},
			transfer() {
				this.$refs.ctl.showTrans();
			},
			giveup(status) {
				this.$refs.ctl.doGiveUp(status);
			},
			shareuser() {
				this.$refs.ctl.showShare();
			},
			showFenpei() {
				// isFall   (info.crmSafeBoxList && info.crmSafeBoxList.length > 0) ? '1' : '0'
				this.$refs.fenpeiModal.showFenpei(this.info.id, (this.info.crmSafeBoxList && this.info.crmSafeBoxList.length > 0) ? '1' : '0');
			},
			movegroup() {
				this.$refs.ctl.showMoveGroup();
			},
			showTmkClick() {
				this.$refs.ctl.showInvate();
			},
			updateInfo() {
				this.basedit = false;
				this.getUserInfo();
				this.$refs.fl.loadData();
			},
			getUserInfo() {
				const id = this.uid;
				crmCustomer.details({
					id,
					flag: this.pageTMK ? 1 : 0
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.info = res.data.data;
						this.statusCode = res.data.statusCode;
						if(this.statusCode == -1) {
							this.$Message.error(res.data.message);
						}
					}
				}).catch(errors.call(this));
			},
			needUpdate() {
				this.getUserInfo();
				this.loadStatBar();
				this.$refs.fl.loadData();
			},
			onPlay(url, t) {
				this.player.visible = true;
				this.$nextTick(() => {
					this.duration = Number(t);
					this.$refs.player.changePlay(url);
				})
			},
			onPlayerClose() {
				this.$refs.player.stop();
				this.player.visible = false;
			},
			checkLabel(item, sourTags) {
				this.info.tagIds = item;
				this.info.sourTags = sourTags;
				this.showsavetag = true;
			},
			dosaveTag() {
				if(this.showsavetag) {
					const item = this.info.tagIds;
					crmCustomer.saveTag(item.join(','), this.uid, this.pageTMK ? 1 : 0).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.$refs.fl.loadData();
							this.needUpdate();
							this.showsavetag = false;
						}
					}).catch(errors.call(this));
				}
			},
			onscroll(e) {
				const top = 55;
				let m = -1;
				const months = this.$el.querySelectorAll('.month-name');
				for(let i = 0, j = months.length; i < j; i++) {
					const item = months[i];
					const pos = item.getBoundingClientRect();
					if(pos.top < 55) {
						m = i;
					}
				}
				this.fixIndex = m;
			},
			setScrollMonth(v) {
				this.scrollMonth = v;
			},
			onFilterChange(v) {
				this.$refs.fl.onFilterChange(v);
			},
			callback() { // 撤回
				crmAllocResult.withdraw({
					cusId: this.uid
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message)
					}
				}).catch(errors.call(this));
			},
			onShareOrTransOk() {
				this.getUserInfo();
				this.$refs.fl.loadData();
			},
			onTMKInvateOk() {
				this.getUserInfo();
				this.$refs.fl.loadData();
			},
			goContract() {
				const query = {
					cusCode: this.info.cusCode
				};
				this.$router.push({
					name: 'crm.pact',
					query
				});
			}
		}
	};
</script>