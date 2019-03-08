<style lang="less">
.plan_container{
    height: 100%;
	display: flex;
	.content{
		flex: 1;
		overflow-y: auto;
		padding: 0 15px;
	}
	.headbar {
		padding-left: 10px;margin-bottom: -1px;
		height: 55px;
		line-height: 55px;
		border-bottom: 1px solid #e0e0e0;
		.ivu-icon-chevron-right {
			margin: 0 7px;
		}
		.t1 {
			display: inline-block;
		}
		.t2 {
			display: inline-block;
			color: #73cdc9;
		}
		.set{
			float: right;
			margin-right: 20px;
		}
	}
}
</style>
<template>
    <div class="plan_container">
		<left-menu types="spoc-portal" @emptyLists="emptyLists" @upload="upload" @changTitle="changTitle" ref="leftmenu"></left-menu>
		<div class="content">
			<div class="headbar">
				<div class="t1">数据字典</div>
				<Icon type="chevron-right"></Icon>
				<div class="t2" v-text="title"></div>
			</div>
			<dictable ref="dict" @uploadTree="uploadTree"></dictable>
		</div>
	</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import valid,{errors, sys} from '../../libs/request.js';
import leftMenu from "../../modules/leftMenuDict";
import dictable from "./dictable"

let route ='portal.dictmanage';

export default {
    data(){
        return {
			title: '全局'
		};
    },
    computed:{
        ...mapState(['userInfo','appMenuList']),
        navList(){
			if(this.$route.params.titles){
				return this.$route.params.titles;
			}
            return this.$route.matched.filter(res=>res.meta.title).map(val=>{
				if(Array.isArray(val.meta.title)){
					return val.meta.title[this.$route.params.currentTitle];
				}
				return val.meta.title
			})
		},
    },
    components:{
        leftMenu,
		dictable,
    },
    created(){
		
		
    },
    methods:{
		emptyLists() {
			this.$refs.dict.emptyLists();
		},
		upload(item) {
			this.$refs.dict.needUpload(item);
		},

		uploadTree(callback, id) {
			this.$refs.leftmenu.getTree(callback, id);
		},

		changTitle(item) {
			// console.log(item);
			this.$refs.dict.changTitle(item);
			this.title = item.name;
		}
    }
}
</script>

