
<template>
	<div class="up-hidden">
		<input type="file" class="uploadfile" @change="doUploadFile">
	</div>
</template>
<script>
import pan from "@public/modules/upToPan.vue";
import {MENUIDS} from "@public/libs/config.js";
export default {
    mixins:[pan],
    props:{
    	menuId:{
			type: String,
    		default:MENUIDS.CRM
    	}
    },
}
</script>
