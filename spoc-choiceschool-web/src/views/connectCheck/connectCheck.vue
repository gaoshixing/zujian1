
<template>
	<div class="connectPreview">
		<menubar>
            <span slot="menu" class="slotContent">
                <a href="javascript:void(0)" class="active">交接审批</a>
            </span>
        </menubar>
		<connect-check :menuId="menu.CHOICESCHOOL" :mod="'choiceschool'"></connect-check>
	</div>
</template>

<script>
	import connectCheck from "@public/modules/connectCheck.vue"
	import MenuBar from '../../modules/breadcrumb/menuBar';
	import {MENUIDS} from "@public/libs/config.js";
	export default{
		data(){
			return {
				menu:MENUIDS
			}
		},
		components:{
			connectCheck,
			'menubar':MenuBar
		}
	}
</script>