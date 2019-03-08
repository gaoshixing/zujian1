<style lang="less">
	@green: #44bcb7;
	.app {
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
	<div class="app">
		<div class="applist-content">
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
	</div>
</template>
<script>
	import valid, {
		errors,
		saveApp,
		saveQuickMenu,
	} from '../libs/request';
	import { mapMutations, mapState } from 'vuex';

	export default {
		data() {
			return {
			};
		},
		computed: {
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
		created() {},
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
				sessionStorage.clear('publicInfo')
				if(item.href.indexOf('http') == 0){
					window.open(item.href)
				} else if(item.href) {
					this.$router.push({
						name: item.href
					});
				}
			},
		}
	}
</script>