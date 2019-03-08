<style lang="less">
.plan_portal_leftview{
	height: 100%;
	position: relative;
	.nav{
		height: 100%;
		width: 230px;
    }
    .xel-types-list{
        background-color: #fff;
    }
}

</style>

<template>
	<div class="plan_portal_leftview">
		<div class="nav nav-toggle">
			<div class="xel-types-list">
                <xeltypes/>
            </div>
		</div>
		<slide-toggle @status-change="statusChange"></slide-toggle>
	</div>
</template>

<script>
import slideToggle from '@/common/slideToggle';
import userBanner from "@/common/userBanner";
import { mapState } from "vuex";
import xeltypes from './xeltypes';

export default {
	data () {
		return {
		}
	},
	computed:{
		...mapState(['userInfo']),
	},
	components: {
        slideToggle,
        xeltypes
	},
	methods: {
        statusChange(s){
            this.$emit('status-change',s);
        }
	}
}
</script>
