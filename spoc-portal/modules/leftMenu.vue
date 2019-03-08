<style lang="less">
	.plan_left_menu {
		height: 100%;
		position: relative;
		.reswrapper {
			&.scroll {
				overflow: auto;
				height: ~"calc(100vh - 82px)";
			}
		}
		.nav {
			background-color: #f2f2f2;
			height: 100%;
			width: 230px;
			.res-list {
				.res-item {
					height: 46px;
					line-height: 46px;
					cursor: pointer;
					overflow: hidden;
					&:hover,
					&.active {
						background-color: #fff;
					}
					&:hover {
						.img-caozuo {
							display: block;
						}
					}
					.icon {
						display: block;
						float: left;
						width: 50px;
						height: 46px;
						padding-left: 15px;
						&-img {
							width: 24px;
							height: 24px;
							display: inline-block;
							vertical-align: middle;
							padding: 3px;
						}
					}
					.name {
						display: block;
						float: left;
						font-size: 12px;
						width: 130px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="plan_left_menu">
		<div class="nav nav-toggle">
			<user-banner :info="userInfo"></user-banner>
			<div class="item-wrapper reswrapper" :class="{scroll:scroll}" ref="scrollWrap">
				<ul class="res-list">
					<li v-for="item in menus.menus" :key="item.id" class="res-item" :class="{active:$route.name==item.href || ($route.meta && ($route.meta.parentName ==item.href))}" @click="itemClick(item)">
						<i class="icon">
							<img v-if="item.icon" :src="item.icon" class="icon-img" :style="{backgroundColor:item.colour}">
						</i>
						<span class="name" v-text="item.name"></span>
						<i class="img-caozuo"></i>
					</li>
				</ul>
			</div>
		</div>
		<slide-toggle @status-change="statusChange"></slide-toggle>
	</div>
</template>

<script>
	import slideToggle from "@/common/slideToggle";
	import userBanner from "@/common/userBanner";
	import { mapState } from "vuex";
	export default {
		props: {
			types: {
				// 模块的名称
				type: String,
				default: "spoc-portal"
			},
			scroll: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				state: {
					item: {
						id: 0
					}
				}
			};
		},
		computed: {
			...mapState(['userInfo', 'appMenuList']),
			//		...mapState({
			//			userInfo: state => state.userInfo,
			//			portal: state => state.portal.menus,
			//			plan: state => state.plan.menus,
			//			library: state => state.library.menus,
			//			sign: state => state.sign.menus,
			//			docu: state => state.docu.menus,
			//			crm: state => state.crm.menus,
			//			apply: state => state.apply.menus
			//		}),
			menus() {
				switch(this.types) {
					case "spoc-portal":
						return this.$store.state.portal;
					case "spoc-plan":
						return this.$store.state.plan;
					case "spoc-library":
						return this.$store.state.library;
					case "spoc-sign":
						return this.$store.state.sign;
					case "spoc-docu":
						return this.$store.state.docu;
					case "spoc-crm":
						return this.$store.state.crm;
					case "spoc-apply":
						return this.$store.state.apply;
					case "spoc-workbrnch":
						return this.$store.state.workbrnch;
					case "spoc-market": 
            			return this.$store.state.market; 
					case "spoc-salary": 
            			return this.$store.state.salary; 
				}
			},
			curr() {
				if(this.state.item.id) {
					return this.state.item;
				}
				return {
					id: this.$route.query.id,
					href: this.$route.name
				};
			}
		},
		components: {
			userBanner,
			slideToggle
		},
		methods: {
			itemClick(item) {
				this.state.item = item;
				this.$router.push({
					name: item.href,
					query: {
						id: item.id
					}
				});
			},
			statusChange(status) {
				this.$emit("status-change", status);
			}
		}
	};
</script>