<style lang="less">
.pdfview{
	width: 100%;
	height: 100vh;
	.pdf{
		width: 100%;
		height: 100%;
	}
	.pdf-converting{
		height: 20vh;
		box-shadow: 1px 1px 15px #ddd;
		font-size: 20px;
		display: flex;
		justify-content: center;
		background: rgba(1, 1, 1, 0.4);
		.text{
			align-self: center;
			color: #fff;
		}
	}
}
</style>
<template>
    <div class="pdfview">
        <div v-if="pdfok" class="pdf">
			<iframe class="pdfviewer" v-if="pdfurl" :src="pdfurl" width="100%" height="100%"></iframe>
        </div>
        <div v-else>
			<div class="pdf-converting">
				<p class="text">文件已失效</p>
			</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import valid,{errors,contract} from "../libs/request.js";
export default {
    data(){
        return {
            pdfok:false,
        };
    },
    computed:{
    	pdfurl(){
    		if(this.pdfok){
    			let params=this.$route.query;
    			let _url=window.location.href;
    			let num = _url.lastIndexOf('?');
    			let param=_url.substr(num+1);
    			return contract.pdfview(param)
    		}
    	}
    },
    created(){
        this.updateLoadingStatus({isLoading:true});
    	let params=this.$route.query;
		contract.urlCheck(params).then(valid.call(this)).then(res => {
    		if(res.ok){
					this.updateLoadingStatus({isLoading:false});
    			if(res.data.status=="success"){
    				this.pdfok=true;
    			}else{
    			
    			}
    		}else{
				this.updateLoadingStatus({isLoading:false});
			}
		}).catch(errors.call(this));
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
    }

}
</script>
