<style lang="less">
@borderColor: #73cdc9;
.right-tit {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #e0e0e0;
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
}
</style>

<template>
	<div class="right-tit">
	    <div class="t1">院校库</div>
	    <Icon type="chevron-right"></Icon>
	    <div class="t2" v-text="$route.meta.title"></div>
	    <div class="set" style="float: right;margin-right: 20px;"><i class="iconfont icon-shezhi"></i></div>
	</div>
</template>

<script>
    import valid, {
        errors,
        getFacInfo,
    } from '../libs/request';
    import {mapMutations} from 'vuex';
    export default {
			data(){
				return {
						
				}
			},
			methods:{
				
			},
			watch: {
				
			}
    }
</script>