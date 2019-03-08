<style lang="less">
.dict_left_menu{
	.stree{
		.tree-level-1{
			&>.tree-item{
				&:hover{
					&>.img-caozuo{
						display: block;
					}
				}
			}
		}
		.tree-item{
			&:hover{
				.img-caozuo{
					display: none;
				}
			}
		} 	
	}
	height: 100%;
	position: relative;
	.nav{
		background-color: #f2f2f2;
		height: 100%;
		width: 230px;
		
	}
	h2{
		padding-left: 16px;line-height: 24px;
		font-size: 15px;
	}
	.search{
		height: 46px;padding-left: 10px;margin-top: 10px;
		position: relative;
		.v-select-wrap{
			width: 184px;
		}
	}
	.select-top{
		@h:30px;
		width: 36px;
		height: @h;line-height: @h;font-size: 16px;color: #999;text-align: center;
		&:hover{
			.iconSelect{
				color: #666;
			}
		}
	}
	.ivu-select,.select-top{
		position: absolute;right: 0;top: 0;
	}
	.select-top{
		.ivu-select-dropdown{
			width: 100px !important;
		}
		.ivu-select-selection{
			opacity: 0;
		}
	}
	.dictTree{
		height: ~"calc(100% - 160px)";
    	overflow: auto;background: #f2f2f2;
	}
	.v-select-wrap .select-able{
		.main-input{
			background: #fff;border-color: #fff;padding-right: 8px;padding-left: 32px;text-align: center;
		}
		.icon-right{
			right: auto;left: 15px;font-size: 16px;
		}
	}
	.popmenu{
        position: absolute;
        top: 0;
        right: -190px;
        width: 230px;
        background-color: #fff;
        box-shadow: 0 0 9px rgba(200, 200, 200, 0.5);
        padding: 1.8em 0;
        z-index: 80;
        ul{
            &>li{
                text-indent: 2em;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                &:hover{
                    background-color: #e6e6e6;
                }
            }
        }
	}
	.titleSelect{
		position: relative;height: 30px;width: 184px;
		.iconSearch{
			position: absolute;right: 2px;top: 2px;z-index: 9;font-size: 16px;
			width: 30px;bottom: 0;line-height: 29px;
			cursor: pointer;
			background: #fff;text-align: center;color: #999;
			&:hover{
				i{
					color: #000;
				}
			}
		}
	}
}
.editType{
	li{
		@w: 115px;
		height: 55px;line-height: 35px;position: relative;padding-left: @w;
		span{
			position: absolute;left: 0;top: 0;width: @w;text-align: right;
			font-size: 14px;color: #999;
		}
		input{
			width: 250px;height: 35px;
			font-size: 16px;
		}
	}
	.ivu-modal-body{
		padding: 0;padding-top: 20px;
	}
}
</style>

<template>
	<div class="dict_left_menu">
		<div class="nav nav-toggle">
			<user-banner :info="userInfo"></user-banner>
			<div class="item-wrapper dictwrapper" ref="scrollWrap">
				<h2>字典管理</h2>
				<div class="search">
					<div class="titleSelect">
						<span class="iconSearch" @click.stop="textChange">
							<Icon type="search"></Icon>
						</span>
						<Select v-model="compact" filterable ref="search" 
							@on-change="checkTitle" @on-query-change="textQueryChange">
							<Option v-for="item in orgDataBackups" :value="item.id" :key="item.id">{{ item.title }}</Option>
						</Select>
					</div>
					<span class="select-top">
						<span class="iconfont icon-shaixuanguolv iconSelect"></span>
						<Select v-model="model1" @on-change="choiceMenu">
							<Option v-for="item in menuList" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</span>
				</div>
			</div>
			<div class="dictTree">
				<stree :data="orgData" :curr="curr" :menu="org_edit" @item-click="itemClick" @menu-click="menuClick"></stree>
				<div class="popmenu" :style="{top:menu.top}" v-show="menu.show">
					<ul>
						<li @click.stop="modify">修改</li>
					</ul>
				</div>
			</div>
		</div>

		<Modal class="editType"
			v-model="editType" width="730"
			title="修改分类"
			@on-ok="editTreeType()">
			<ul>
				<li>
					<span>中文分类名称：</span>
					<Input v-model="editObj.description"/>
				</li>
				<li>
					<span>英文分类名称：</span>
					<Input v-model="editObj.type"/>
				</li>
			</ul>
		</Modal>
		<slide-toggle @status-change="statusChange"></slide-toggle>
	</div>
</template>

<script>
import slideToggle from '@/common/slideToggle';
import userBanner from "@/common/userBanner";
import { mapState } from "vuex";
import stree from './tree/tree';
import valid, { errors, sys } from "../libs/request";
import treeVue from './tree/tree.vue';


export default {
	data () {
		return {
			state:{
				item:{ id: 0 }
			},
			compact: '',
			orgData:[],
			orgDataBackups: [],
			model1: '',
			editType: false,
			initMenuID: '',
			notclick: false,
			queryValue: '',
			editObj: {
				menuId: '',
				id: '',
				description: '',
				type: ''
			},
			org_edit: true,
			menu:{
                top: '0px',
                show: false,
            },
			menuList: []
		}
	},
	computed:{
		...mapState(['userInfo']),
        curr(){
            if(this.$route.query.id){
                return {id:this.$route.query.id};
            }
            return this.state.item;
        }

	},
	components: {
		userBanner,
		slideToggle,
		stree
	},
	created() {
		this.getTree(this.resetInitFocus);
		
	},
	deactivated(){
        this.hideMenu();
    },
	mounted(){
		document.addEventListener('click',this.hideMenu,false);
		this.getMeunIndex();
    },
    beforeDestroy(){
        document.removeEventListener('click',this.hideMenu);
    },
	methods: {
		getMeunIndex() {
			// 获取根节点级菜单列表
			sys.menuListMenu().then(valid.call(this)).then(res => {
                if(res.ok) {
					this.menuList = res.data.data;
					this.menuList.unshift({
						name: '全局',
						id: -1
					});
                }
            }).catch(errors.call(this));
		},
		choiceMenu(id) {
			// 获取id
			// let meunId = id;
			this.initMenuID = id;
			if(id == -1){
				this.initMenuID = ''
			}
			this.getTree(this.resetInitFocus, this.initMenuID);
			let cump = this.menuList.filter((list) => { 
                return list.id == id; 
			})[0];
			// console.log(cump);
			this.$emit('changTitle',cump);
		},	
		modify() {
			this.hideMenu();
			this.editType = true;
		},
		nullCallBack() {

		},
		editTreeType() {
			// 修改树
			let params = this.editObj;
			// console.log(params)
			sys.DictCategoryEdit(params).then(valid.call(this)).then(res => {
                if(res.ok) {
					this.getTree(this.nullCallBack, this.initMenuID);
                }
            }).catch(errors.call(this));
		},
		autoInitFocus(){
            if (!this.$route.query.id && this.orgData[0]){
                this.itemClick(this.orgData[0]); 
            } else {
				this.$emit('emptyLists');
			}
		},
		resetInitFocus(){
			if(this.orgData[0]){
				this.itemClick(this.orgData[0]); 
			} else {
				this.$emit('emptyLists');
			}
		},
		getTree(callback,id) {
			let params = {
				
			}
			if(id) {
				params = {
					menuId: id
				}
			}
			// console.log(params)
			sys.DictBuildTreeNew(params).then(valid.call(this)).then(res => {
                if(res.ok) {
					let _data = res.data.data.children;
					if(Array.isArray(_data)){
                        this.$nextTick(()=>{
							this.orgData = _data;
							this.orgDataBackups = _data;
                            callback && callback();
                        });
                    }
                }
            }).catch(errors.call(this));
		},
		statusChange(status){
			this.$emit('status-change',status);
		},
		textChange() {
			// 点击search按钮
			if(this.queryValue) {
				this.notclick = true;
				// 开始过滤树一级节点
				this.compact = this.queryValue;
				let newTree = this.orgDataBackups.filter((item) => {
					return item.title.indexOf(this.compact) >= 0
				});
				this.orgData = newTree;
				this.compact = this.queryValue;
				setTimeout(()=>{
					this.notclick = false;
				},0);
			} else {
				// 空
				this.orgData = this.orgDataBackups;
				this.notclick = false;
			}
		},
		textQueryChange(item) {
			// 更改关键字
			this.notclick = false;
			this.queryValue = item;
		},
		checkTitle(id) {
			// 选择下拉菜单的某一项
			if(!this.notclick && id) {
				this.orgData = this.orgDataBackups;
				let cump = this.orgData.filter((list) => { 
					return list.id == id; 
				})[0];
				// this.itemClick(cump); //点击左侧树
				this.queryValue = cump.title;
				this.textChange();
			}
		},
		itemClick(item) {
            // console.log('itemClick---1')
			// console.log(item)
			this.hideMenu();
			this.$router.push({name:'portal.dictmanage',query: Object.assign({},this.$route.query,{id:item.id})});
			this.$emit('upload',item);
		},
		menuClick(e,item) {
			// console.log('menuClick')
			this.state.item=item;
			this.editObj.id = item.id;
			this.editObj.description = item.title;
			this.editObj.type = item.type;
			this.editObj.menuId = this.initMenuID;
            let top = e.pageY;
            if(document.body.offsetHeight - top < 120){
                top = top - 120;
            }
            this.menu= {
               top : `${top+15}px`,
               show:true
           };
		},
		hideMenu() {
            this.menu.show = false;
        }
	}
}
</script>
