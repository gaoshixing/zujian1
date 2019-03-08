<style lang="less">
	.newsList {
		padding: 12px 15px;
		.header {
			line-height: 42px;
			font-size: 14px;
			.point {
				cursor: pointer;
				overflow: hidden;
				i {
					float: left;
					line-height: 46px;
				}
			}
			.point:hover{
				color:#41b3ae !important;
			}
			.point:hover i{
				color:#41b3ae !important;
			}
		}
		.list {
			li {
				border-bottom: 1px #e0e0e0 solid;
				font-size: 14px;
				padding: 10px 0;
				.top {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 10px;
					.ivu-badge-dot {
						right: -20px;
					}
					.time {
						color: #999999;
					}
				}
				.down {
					color: #666666;
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 14px;
			padding-bottom: 150px;
		}
		.menu{
			position: absolute;
			right: 70px;
			top: 50px;
			line-height: 34px;
			.icon-shaixuanguolv{
				cursor: pointer;
			}
		}
	}
</style>

<template>
	<div class="newsList">
		<div class="menu">
			<span>
				应用模块：<span>{{menu}}</span>&emsp;
			</span>
			<filters @doFilter="doFilter" @createFilter="createFilter"></filters>
		</div>
		<p class="header">
			<span class="point" @click="markRead('')">
				<i class="iconfont icon-duanxinyidu" style="cursor: pointer;font-size: 18px;color: #999;margin-right: 6px;"></i>
				全部标记为已读
			</span>
		</p>
		<ul class="list">
			<li v-for="item in newsList" :key="item.id" @click="markRead(item.notifyId)">
				<div class="top">
					<Badge :count="item.readFlag==1?0:1" dot>
						<p style="cursor: pointer;">{{item.title}}</p>
					</Badge>
					<p class="time">{{item.sendTime}}</p>
				</div>
				<div class="down" style="cursor: pointer;padding-right: 140px;">{{item.description}}</div>
			</li>
		</ul>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :current="1" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import filters from "../../modules/filter.vue";
	import valid, {
		errors,
		news
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				count: 0,
				pageNo:1,
				pageSize:10,
				newsList:[],
				menu:'',
				filterId:''
			}
		},
		components: {
			filters
		},
		computed: {},
		created() {
		},
		methods: {
			createFilter(val){
				this.menu='全部应用';
				this.filterId='';
				this.getNews();
			},
			getNews(){
				let params={
					method:'web',
					menuId:this.filterId,
					pageNo:this.pageNo,
					pageSize:this.pageSize
				};
				news.listUserNotify(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.newsList=res.data.data.list;
						this.count=res.data.data.count;
					}
				}).catch(errors.call(this));
			},
			pageChange: function(num) {
						this.pageNo=num;
						this.getNews();
			},
			sizeChange: function(val) {
						this.pageSize=val;
						this.getNews();
			},
			doFilter(id,name){
				this.menu=name;
				this.filterId=id;
				this.getNews();
			},
			markRead(val){
				let params={
					method:'web',
					id:val
				};
				news.markRead(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let params={
							method:'web',
							pageNo:this.pageNo,
							pageSize:this.pageSize
						};
						news.listUserNotify(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.newsList=res.data.data.list;
								this.count=res.data.data.count;
								this.$emit('markRead');
							}
						}).catch(errors.call(this));
					}
				}).catch(errors.call(this));
			}

		}
	}
</script>