<style lang="less">
	.plan_portal_left_menu {
		height: 100%;
		position: relative;
		.nav {
			background-color: #f2f2f2;
			height: 100%;
			width: 230px;
		}
		.chat-groups {
			.groups-wrap {
				max-height: ~"calc(100vh - 200px)";
				overflow: auto;
			}
			.s-box {
				padding: 15px 15px 0;
				.search-title {
					.ivu-icon {
						font-size: 18px;
						line-height: 32px;
						height: 32px;
						float: left;
						margin: 0 0 0 10px;
						cursor: pointer;
						&:hover {
							color: #888;
						}
					}
				}
			}
			.m-tools {
				padding: 15px;
				color: #aaa;
				.left-g {
					float: left;
				}
				.right-g {
					float: right;
					cursor: pointer;
					&:hover {
						color: #666;
					}
				}
			}
			.ml-title {
				float: left;
				font-weight: 500;
				font-size: 14px;
				padding-left: 15px;
			}
			.mr-icon {
				float: right;
				padding-right: 15px;
			}
			.group-item {
				height: 44px;
				line-height: 44px;
				text-indent: 15px;
				font-size: 14px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				&:hover,
				&.active {
					background-color: #fff;
				}
				svg {
					width: 24px;
					height: 24px;
					position: relative;
					top: 6px;
				}
				.unread {
					background-color: #f00;
					color: #fff;
					font-size: 12px;
					padding: 1px 6px;
					border-radius: 8px;
					position: absolute;
					right: 10px;
					top: 13px;
					line-height: normal;
					text-indent: 0;
				}
			}
		}
	}
</style>

<template>
	<div class="plan_portal_left_menu">
		<div class="nav nav-toggle">
			<user-banner :info="userInfo"></user-banner>
			<div class="chat-groups">
				<div class="clearfix">
					<div class="ml-title">工作台</div>
					<!--<div class="mr-icon">
						<span style="cursor: pointer;" @click="openGroupMd">
						<Icon type="ios-eye" :size="18"></Icon>
						</span>
					</div>-->
				</div>
				<div class="s-box">
					<div class="search-title">
						<Input v-model="search.text" icon="ios-search-strong" placeholder="搜索服务组" style="width: 200px"></Input>
					</div>
				</div>
				<div class="m-tools clearfix">
					<div class="left-g">
						<a @click="goMyTask">我的任务</a>
					</div>
					<div class="right-g" @click="$emit('addgroup')">添加组</div>
				</div>
				<div class="groups-wrap">
					<div class="groups">
						<div class="group-item" :class="{active:item.id==currItem.id}" v-for="item in currGroups" :key="item.id" @click="onGroupClick(item)">
							<svg aria-hidden="true" v-if="item.studentId">
								<use :xlink:href="'#icon-fuwuzu'"></use>
							</svg>
							<svg aria-hidden="true" v-else>
								<use :xlink:href="'#icon-taolunzu'"></use>
							</svg>
							<span>{{item.name}}</span>
							<span class="unread" v-if="readMap[item.id]" v-text="readMap[item.id]"></span>
						</div>
					</div>
				</div>

			</div>
		</div>
		<slide-toggle @status-change="statusChange"></slide-toggle>
		<group-people ref="GroupMd" @fresh="offrole"></group-people>
	</div>
</template>

<script>
	import slideToggle from '@/common/slideToggle';
	import userBanner from "@/common/userBanner";
	import groupPeople from "./groupPeople";
	import { mapState } from "vuex";
	export default {
		props: {
			groups: {
				type: Array,
				required: true
			},
			currItem: {
				type: Object,
				required: true,
			},
			readMap: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				search: {
					text: ''
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			currGroups() {
				if(this.search.text) {
					return this.groups.filter(item => {
						return item.name.indexOf(this.search.text) > -1;
					})
				}
				return this.groups;
			}
		},
		components: {
			userBanner,
			slideToggle,
			groupPeople
		},
		methods: {
			offrole() {
				this.$emit('update');
			},
			openGroupMd() {
				this.$nextTick(() => {
					this.$refs.GroupMd.show();
				});
			},
			initFirst() {
				this.$nextTick(() => {
					if(this.currItem.id) {
						let item = this.groups.find(item => item.id == this.currItem.id);
						if(!item && this.groups[0]) {
							item = this.groups[0];
						}
						if(item) {
							this.$emit('change', item, false);
						}
					} else if(this.groups[0]) {
						this.onGroupClick(this.groups[0]);
					}
				});
			},
			onGroupClick(item) {
				let name = this.$route.name.split('.').length == 3 ? this.$route.name : 'plan.portal.msg';
				console.log(this.$route.name)
				name=this.$route.name=='plan.myTask.msg'?'plan.portal.msg':name;
				name=this.$route.name=='plan.taskReview.msg'?'plan.portal.msg':name;
				console.log(name)
				this.$router.push({
					name,
					params: {
						gid: item.id,
					},
				});
				this.$emit('change', item, true);
			},
			statusChange(s) {
				this.$emit('status-change', s);
			},
			goMyTask() {
				this.$router.push({
					name: 'plan.myTask.msg',
					params: {
						gid: this.currItem.id,
					},
					query:{
						showHead:false
					}
				})
			}
		}
	}
</script>