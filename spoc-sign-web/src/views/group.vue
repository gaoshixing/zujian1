<style>

</style>
<template>
	<router-view :menuId='menuId'>
	</router-view>
</template>
<script>
import {MENUIDS} from "@public/libs/config.js";
export default {
    data() {
		return {
            menuId: MENUIDS.SIGN
		}
	},
	methods:{
		
	},
	components:{
		
	}
};
</script>

