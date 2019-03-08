<style lang="less">
.common_navTitle {
	.right-tit {
		@borderColor: #73cdc9;
		padding-left: 10px;
		height: 55px;
		line-height: 55px;
		/*border-bottom: 1px solid #e0e0e0;*/
		position: relative;
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
			.icon-shezhi {
				margin-left: 10px;
			}
		}
	}
}
</style>
<template>
	<div class="common_navTitle">
		<div class="right-tit">
			<div class="navList">
				<div v-for="item in list" :key="item.id" :class="[list.length == item.id?'t2':'t1','nav-item']">
					{{item.title}}
					<Icon type="chevron-right"></Icon>
				</div>
			</div>
			<div class="r-set">
				<Button v-if="$route.meta.goback" type="ghost" @click.native.stop="goBack">返回</Button>
				<i v-if="$route.meta.setting" class="iconfont icon-shezhi"></i>
			</div>
			<div class="r-set">
				<Button v-if="$route.meta.gobackP" type="ghost" @click.native.stop="goBackPublic">返回公众号管理</Button>
				<i v-if="$route.meta.setting" class="iconfont icon-shezhi"></i>
			</div>
		</div>

	</div>
</template>
<script>
import valid,{errors,sys} from '../libs/request';

export default {
	props: {
		navList: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	computed: {
		navs() {
			if (this.$route.params.titles) {
				return this.$route.params.titles;
			}
			return this.$route.matched
				.filter(res => res.meta.title)
				.map(val => {
					if (Array.isArray(val.meta.title)) {
						return val.meta.title[this.$route.params.currentTitle];
					}
					return val.meta.title;
				});
		},
		list() {
			let nav = this.navList.length ? this.navList : this.navs;
			let id = 0;
			return nav.map((v, i) => {
				id++;
				return { id: id, title: v };
			});
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},

		goBackPublic() {
			let id = 1001
			sys.listGrantMenu({ id, }).then(valid.call(this)).then(res=>{
				sessionStorage.clear('publicInfo')
                this.$store.commit('market/updateMenu',{menu:res.data.data, isPush:false});
            }).catch(errors.call(this));
		}
	}
};
</script>


