<style>
</style>

<template>
	<div class="connectList">
		<menubar>
            <span slot="menu" class="slotContent">
                <a href="javascript:void(0)" class="active">交接列表</a>
            </span>
        </menubar>
		<connect-list :menuId="menu.CHOICESCHOOL" :mod="'choiceschool'"></connect-list>
	</div>
</template>

<script>
	import connectList from "@public/modules/connectList.vue"
	import MenuBar from '../../modules/breadcrumb/menuBar';
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			connectList,
			'menubar':MenuBar
		}
	}
</script>