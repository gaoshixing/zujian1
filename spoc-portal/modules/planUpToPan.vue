
<template>
	<div class="up-hidden">
		<input type="file" class="uploadfile" @change="doUploadFile">
	</div>
</template>
<script>
import {MENUIDS} from "@public/libs/config.js";
import pan from "@public/modules/upToPan.vue";
export default {
    mixins:[pan],
    props:{
    	menuId:{
			type: String,
    		default:()=>{
    			let id='401';
    				id = MENUIDS.PLAN||'401'
    			return id;
			}
    	}
    },
}
</script>
