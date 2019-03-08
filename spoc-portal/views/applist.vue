<style lang="less">
	@green: #44bcb7;
	.app-list-manage {
		.headerbar {
			@borderColor: #73cdc9;
			background-color: #f2f2f2;
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			color: #333;
			.right-tit {
				@borderColor: #73cdc9;
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #e0e0e0;
				position: relative;
				padding-left: 45px;
				.ivu-icon-chevron-right {
					margin: 0 7px;
				}
				&:after {
					content: "";
					display: block;
					clear: both;
				}
				.t1 {
					display: inline-block;
				}
				.t2 {
					display: inline-block;
					color: @borderColor;
				}
				.navList {
					display: inline-block;
					.nav-item {
						&:last-child i {
							display: none;
						}
					}
				}
				.r-set {
					position: absolute;
					right: 0;
					display: inline-block;
					padding-right: 2em;
					line-height: 50px;
					text-align: right;
					.set {
						margin-left: 24px;
					}
					.badge {
						height: 14px;
						line-height: 14px;
						min-width: 14px;
						padding: 0 2px;
					}
					.bub {
						width: 600px;
						position: absolute;
						z-index: 999;
						right: 0;
						top: 50px;
						background: #fff;
						&.hid {
							display: none;
						}
						.circle {
							border-radius: 6px;
							overflow: hidden;
							position: relative;
							ul {
								min-height: 210px;
								li {
									margin: 0 14px;
									padding: 0;
								}
							}
						}
						.triangle {
							width: 14px;
							height: 14px;
							background: #fff;
							transform: rotate(45deg) skew(10deg, 10deg);
							position: absolute;
							top: -8px;
							right: 30px;
							z-index: 1000;
							border-top: 1px solid #dad9d9;
							border-left: 1px solid #dad9d9;
						}
						.ivu-card-body {
							padding: 0;
						}
						.brim {
							padding: 0 14px;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;
							line-height: 50px;
							font-size: 14px;
							span {
								display: inline;
							}
							&.down {
								background: #f7f7f7;
								position: absolute;
								bottom: 0;
								width: 100%;
								.lookAll {
									color: #999999;
								}
							}
							.point {
								cursor: pointer;
								font-weight: normal;
								font-size: 12px;
								color: #999999;
							}
						}
						ul {
							border-top: 1px #dad9d9 solid;
							li {
								border-bottom: 1px #dad9d9 solid;
								padding: 0 14px;
								display: flex;
								flex-direction: row;
								align-items: center;
								justify-content: space-between;
								color: #666666;
								font-size: 14px;
								line-height: 40px;
								span {
									display: inline-block;
									&.info {
										flex: 1;
										text-align: left;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
									}
									&.time {
										width: 140px;
									}
								}
							}
						}
					}
					.ivu-card:hover .triangle {
						border-top: 2px solid #dad9d9;
						border-left: 2px solid #dad9d9;
					}
				}
			}
		}
		.applist-content {
			padding: 5px;
			min-width: 800px;
			height: ~"calc(100vh - 50px)";
			overflow: auto;
		}
		.section {
			margin: 40px 10px 40px 40px;
			&+.section {
				margin-top: 40px;
			}
			.section-title {
				font-size: 14px;
				color: #999;
				margin: 10px 0;
			}
			.appbox {
				margin: 15px 30px 15px 0;
				width: 270px;
				height: 76px;
				border: 1px solid #e6e6e6;
				box-sizing: border-box;
				border-radius: 10px;
				float: left;
				position: relative;
				padding-left: 14px;
				cursor: pointer;
				&.disabled {
					cursor: auto;
					.appicon {
						background-color: #999;
					}
					.name {
						color: #999;
					}
				}
				&:hover {
					border-color: @green;
				}
				.appicon {
					display: block;
					width: 40px;
					height: 40px;
					border-radius: 10px;
					background-color: #15c295;
					margin-right: 10px;
					margin-top: 18px;
					float: left;
					padding: 6px;
				}
				.name {
					font-size: 16px;
					color: #333;
					line-height: 74px;
					float: left;
				}
				.dropdown {
					position: absolute;
					z-index: 22;
					top: 18px;
					left: -70px;
					padding: 10px 4px;
					width: 120px;
					box-sizing: border-box;
					box-shadow: 0 0 18px 2px rgba(4, 0, 0, 0.2);
					border-radius: 4px;
					font-size: 14px;
					display: none;
					background-color: #fff;
					.litem {
						height: 32px;
						line-height: 32px;
						cursor: pointer;
						text-align: center;
						&:hover {
							color: @green;
							background-color: rgb(233, 247, 247);
						}
					}
				}
				.iconfont {
					position: absolute;
					right: 9px;
					top: 5px;
					cursor: pointer;
					&:hover {
						color: @green;
						.dropdown {
							display: block;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="app-list-manage">
		<div class="headerbar" @click.once="hidNews">
			<div class="right-tit">
				<div class="navList">
					<div v-for="item in list" :key="item.id" :class="[list.length == item.id?'t2':'t1','nav-item']">
						{{item.title}}
						<Icon type="chevron-right"></Icon>
					</div>
				</div>
				<div class="r-set">
					<div v-if="true">
						<Button v-if="$route.meta.goback" type="ghost" @click.native.stop="goBack">返回</Button>
						<i v-if="$route.meta.setting" class="iconfont icon-shezhi"></i>
					</div>
					<Badge :count="count" class-name="badge">
						<i class="iconfont icon-icon_notice" style="color:#44bcb7;font-size: 20px;cursor: pointer;" @click.stop="getNews"></i>
					</Badge>
					<!--<span style="cursor: pointer;font-size: 16px;" v-if="this.$route.path=='/newSet.html' && userInfo.admin" @click="jump('portal.infoSet')">
						<i class="iconfont icon-shezhi set"></i>
						通知设置
					</span>-->
					<!--<i class="iconfont icon-shezhi set" style="cursor: pointer;font-size: 16px;" v-else></i>-->
					<Card class="bub" :class="{hid:!isNews}">
						<div class="triangle">

						</div>
						<div class="circle">
							<h3 class="brim">
								<p style="font-size: 14px;">通知</p>
							</h3>
							<ul>
								<li v-for="item in newsList" :key="item.id" @click="markRead(item.notifyId)"><span class="info">{{item.description}}</span><span class="time">{{item.sendTime}}</span></li>
							</ul>
							<h3 class="brim down">
								<p>
									<span class="point" @click="jump('portal.newSet')">
										<i class="iconfont icon-shezhi" style="cursor: pointer;"></i>
										接收设置
									</span>
								</p>
								<p><span class="lookAll point" @click="jump('portal.newsList')">查看全部通知</span></p>
							</h3>
						</div>
					</Card>
				</div>
			</div>
		</div>
		<div class="applist-content" @click.stop="hidNews" v-if="false">
			<div class="section">
				<div class="section-title">基础应用</div>
				<div class="section-content clearfix">
					<div class="appbox" v-for="item in appBaseList" :key="item.id" @click.stop="gotoApp(item)">
						<img :src="item.icon" alt="" class="appicon" :style="{backgroundColor:item.colour}">
						<span class="name" v-text="item.name"></span>

						<template v-if="userInfo.admin || item.isQuick!=='1'">
							<i class="iconfont icon-xia">
                            <div class="dropdown">
                                <p class="litem" @click.stop="touse(item,'1')" v-if="userInfo.admin">停用</p>
                                <template v-if="item.isQuick!=='1'">
                                    <p class="litem" @click.stop="tofav(item,'1')">收藏</p>
                                </template>
                            </div>
                        </i>
						</template>

					</div>
				</div>
			</div>
			<div class="section">
				<div class="section-title">已收藏的应用</div>
				<div class="section-content clearfix">
					<div class="appbox" v-for="item in appFavedList" :key="item.id" @click.stop="gotoApp(item)">
						<img :src="item.icon" alt="" class="appicon" :style="{backgroundColor:item.colour}">
						<span class="name" v-text="item.name"></span>

						<i class="iconfont icon-xia">
                        <div class="dropdown">
                            <p class="litem" @click.stop="touse(item,'1')"  v-if="userInfo.admin">停用</p>
                            <p class="litem" @click.stop="tofav(item,'0')">取消收藏</p>
                        </div>
                    </i>

					</div>
				</div>
			</div>
			<div class="section">
				<div class="section-title">已停用的应用</div>
				<div class="section-content clearfix">
					<div class="appbox disabled" v-for="item in appDisabledList" :key="item.id" @click.stop="userInfo.admin&&gotoApp(item)">
						<img :src="item.icon" alt="" class="appicon">
						<span class="name" v-text="item.name"></span>

						<template v-if="userInfo.admin">
							<i class="iconfont icon-xia">
                            <div class="dropdown">
                                <p class="litem" @click.stop="touse(item,'0')" v-if="userInfo.admin">启用</p>
                            </div>
                        </i>
						</template>

					</div>
				</div>
			</div>
		</div>
		<div v-else @click.stop="hidNews">
			<router-view @markRead="onmarkRead"></router-view>
		</div>
	</div>
</template>
<script>
	import valid, {
		errors,
		saveApp,
		news,
		saveQuickMenu,
	} from '../libs/request';
	import { mapGetters, mapMutations, mapState } from 'vuex';

	export default {
		data() {
			return {
				isNews: false,
				newsList: [],
				count: 0,
			};
		},
		computed: {
			...mapGetters('portal', ['isAdmin', 'isCeo']),
			...mapState(['appMenuList', 'userInfo']),
			appBaseList() {
				return this.appMenuList.filter(item => {
					return item.isDisable != "1" && !item.isFav;
				});
			},
			appFavedList() {
				return this.appMenuList.filter(item => {
					return item.isFav;
				});
			},
			appDisabledList() {
				return this.appMenuList.filter(item => {
					return item.isDisable == "1";
				});
			},
			navList() {
				if(this.$route.params.titles) {
					return this.$route.params.titles;
				}
				return this.$route.matched.filter(res => res.meta.title).map(val => {
					if(Array.isArray(val.meta.title)) {
						return val.meta.title[this.$route.params.currentTitle];
					}
					return val.meta.title
				})
			},
			list() {
				let id = 0;
				return this.navList.map((v, i) => {
					id++;
					return {
						id: id,
						title: v
					}
				})
			}
		},
		created() {
			this.onmarkRead();
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			touse(item, isDisable) {
				let info = {
					id: item.id,
					isDisable: isDisable
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				saveApp(info).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$store.dispatch('portal/updateAppMenu');
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			tofav(item, isQuick) {
				this.updateLoadingStatus({
					isLoading: true
				});
				saveQuickMenu(item.id, isQuick).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$store.dispatch('portal/updateAppMenu');
						this.$store.dispatch('portal/updateAside');
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			gotoApp(item) {
				if(item.href) {
					this.$router.push({
						name: item.href
					});
				}
			},
			goBack() {
				this.$router.go(-1);
			},
			getNews() {
				this.isNews = !this.isNews;
			},
			hidNews() {
				this.isNews = false;
			},
			jump(val) {
				this.isNews = false;
				this.$router.push({
					name: 'portal.news',
					query: {
						name: val
					}
				})
			},
			markRead(val) {
				let params = {
					id: val
				};
				news.markRead(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.onmarkRead
					}
				}).catch(errors.call(this));
			},
			onmarkRead() {
				let params = {
					method:'web',
					readFlag: 0,
					pageNo: 1,
					pageSize: 5
				};
				news.listUserNotify(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.newsList = res.data.data.list;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this));
			}
		}
	}
</script>